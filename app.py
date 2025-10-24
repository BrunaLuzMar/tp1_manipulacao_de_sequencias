"""Este arquivo atua como porta de entrada do servidor Flask, conectando as camadas de backend e frontend do protótipo de máquina de busca.
Aqui fica as configurações iniciais do app, o registro das rotas principais e eventuais ganchos para acionar os serviços de indexação e recuperação de documentos."""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from core.indexer import Indexador, acessar_pasta_zip
from core.retriever import search_docs
from zipfile import ZipFile
from pathlib import Path
import os

DATA_ZIP = Path("data/bbc-fulltext.zip")

# 1. Instância principal do Flask
app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# 2. Inicialização global do índice
indexador = Indexador()
acessar_pasta_zip(indexador, limite=200)

# ------------------------- ROTAS ANGULAR -------------------------

@app.route("/")
def serve_angular():
    """Serve o index.html do Angular."""
    return render_template("index.html")

@app.route("/<path:path>")
def serve_static_files(path):
    """Permite que o Angular controle o roteamento."""
    file_path = os.path.join(app.static_folder, path)
    if os.path.isfile(file_path):
        return send_from_directory(app.static_folder, path)
    return render_template("index.html")

# ------------------------- ROTAS API -------------------------

@app.route("/api/resultados")
def api_resultados():
    consulta = request.args.get("q", "")
    resultados = []

    if consulta:
        doc_ids = search_docs(consulta, indexador.indice_invertido)
        with ZipFile(DATA_ZIP) as zf:
            for doc_id in doc_ids:
                try:
                    with zf.open(f"bbc/{doc_id}") as arquivo:
                        conteudo = arquivo.read().decode("utf-8", errors="ignore").strip()
                        linhas = [l.strip() for l in conteudo.split("\n") if l.strip()]
                        titulo = linhas[0] if linhas else doc_id
                        trecho = " ".join(linhas[1:])[:100] + "..." if len(linhas) > 1 else ""
                        resultados.append({
                            "id": doc_id,
                            "titulo": titulo,
                            "trecho": trecho
                        })
                except KeyError:
                    pass

    return jsonify(resultados)

@app.route("/api/documento/<path:doc_id>")
def api_documento(doc_id):
    """Retorna o conteúdo e o título de um documento em formato JSON."""
    with ZipFile(DATA_ZIP) as zf:
        try:
            with zf.open(f"bbc/{doc_id}") as arquivo:
                conteudo = arquivo.read().decode("utf-8", errors="ignore")
        except KeyError:
            return jsonify({"erro": f"Documento '{doc_id}' não encontrado."}), 404

    linhas = conteudo.splitlines()
    titulo = linhas[0].strip() if linhas else "(Sem título)"
    conteudo_sem_titulo = "\n".join(linhas[1:]).strip()

    return jsonify({
        "id": doc_id,
        "titulo": titulo,
        "conteudo": conteudo_sem_titulo
    })

@app.route("/api/autocomplete")
def api_autocomplete():
    termo = request.args.get("q", "").lower().strip()
    if not termo:
        return jsonify([])

    sugestoes = indexador.trie.sugestoes(termo)
    return jsonify(sugestoes[:10])

# ------------------------- MAIN -------------------------

if __name__ == "__main__":
    app.run(debug=True)
