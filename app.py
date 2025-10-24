"""Este arquivo atuará como porta de entrada do servidor Flask, conectando as camadas de backend e frontend do protótipo de máquina de busca. Aqui ficarão as configurações iniciais do app, o registro das rotas principais e eventuais ganchos para acionar os serviços de indexação e recuperação de documentos."""

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from core.indexer import Indexador, acessar_pasta_zip
from core.retriever import search_docs
from zipfile import ZipFile
from pathlib import Path



DATA_ZIP = Path("data/bbc-fulltext.zip")


#1-> Instância principal do Flask; em produção, parâmetros extras poderiam ser configurados aqui.
app = Flask(__name__)
CORS(app) #evita bloqueio entre localhost 5000 e 4200


#2- inicializacap global do indice
indexador = Indexador()
acessar_pasta_zip(indexador, limite=200) #montar o indice na inicializacao



@app.route("/")
def homepage():
    """Rota ilustrativa que, futuramente, acionará o fluxo real de busca."""
    return render_template("index.html", mensagem_boas_vindas="Protótipo fofo de busca 🌸")

# Rota que renderiza HTML com os resultados
@app.route("/resultados")
def pagina_resultados():
    """Renderiza a página de resultados com título e pequeno trecho."""
    consulta = request.args.get("q", "")
    resultados = []

    if consulta:
        doc_ids = search_docs(consulta, indexador.indice_invertido)

        # Lê títulos e trechos diretamente do ZIP
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
                    resultados.append({
                        "id": doc_id,
                        "titulo": f"[Arquivo não encontrado: {doc_id}]",
                        "trecho": ""
                    })

    return render_template(
        "results.html",
        consulta=consulta,
        resultados=resultados,
        total=len(resultados)
    )


#Rota  autocomplete inteligente



# Rota que exibe o conteúdo de um documento
@app.route("/documento/<path:doc_id>")
def exibir_documento(doc_id):
    with ZipFile(DATA_ZIP) as zf:
        try:
            with zf.open(f"bbc/{doc_id}") as arquivo:
                conteudo = arquivo.read().decode("utf-8", errors="ignore")
        except KeyError:
            return f"Documento '{doc_id}' não encontrado.", 404

    return render_template(
        "documents.html",
        doc_id=doc_id,
        conteudo=conteudo
    )


#angular
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

#auto-complete


@app.route("/api/autocomplete")
def api_autocomplete():
    termo = request.args.get("q", "").lower().strip()
    if not termo:
        return jsonify([])

    sugestoes = indexador.trie.sugestoes(termo)
    return jsonify(sugestoes[:10])

# ------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)