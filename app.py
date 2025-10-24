"""
Este arquivo atua como porta de entrada do servidor Flask, conectando as camadas de backend e frontend do protótipo de máquina de busca.
Aqui ficam as configurações iniciais do app, o registro das rotas principais e eventuais ganchos para acionar os serviços de indexação e recuperação de documentos.
"""

from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from core.indexer import Indexador, acessar_pasta_zip
from core.retriever import search_docs
from zipfile import ZipFile
from pathlib import Path
import os

DATA_ZIP = Path("data/bbc-fulltext.zip")

# ------------------------- CONFIGURAÇÃO FLASK -------------------------
app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(app)

# ------------------------- INDEXADOR GLOBAL -------------------------
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
    consulta = request.args.get("q", "").strip()
    resultados = []

    if consulta:
        termo = consulta.lower()
        docs = search_docs(termo, indexador.indice_invertido)

        # 🔹 Compatibilidade: aceita tanto lista de strings quanto de tuplas
        if docs and isinstance(docs[0], tuple):
            docs_scores = docs
        else:
            docs_scores = [(doc, 0) for doc in docs]

        # 🔸 mostra só os 10 primeiros
        docs_scores = docs_scores[:15]

        with ZipFile(DATA_ZIP) as zf:
            for doc_id, score in docs_scores:
                try:
                    with zf.open(f"bbc/{doc_id}") as arquivo:
                        conteudo = arquivo.read().decode("utf-8", errors="ignore")
                        linhas = [l.strip() for l in conteudo.split("\n") if l.strip()]
                        titulo = linhas[0] if linhas else doc_id
                        texto = " ".join(linhas[1:])

                        pos = texto.lower().find(termo)
                        if pos == -1:
                            continue

                        inicio = max(0, pos - 80)
                        fim = min(len(texto), pos + len(termo) + 80)
                        trecho = texto[inicio:fim]

                        trecho_realcado = (
                            trecho[:pos - inicio]
                            + f"<mark style='background-color:orange; color:black;'>{texto[pos:pos+len(termo)]}</mark>"
                            + trecho[pos - inicio + len(termo):]
                        )

                        prefixo = "..." if inicio > 0 else ""
                        sufixo = "..." if fim < len(texto) else ""
                        trecho_realcado = f"{prefixo}{trecho_realcado}{sufixo}"

                        resultados.append({
                            "id": doc_id,
                            "titulo": titulo,
                            "trecho": trecho_realcado.replace("\n", " "),
                            "score": round(score, 3)
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
