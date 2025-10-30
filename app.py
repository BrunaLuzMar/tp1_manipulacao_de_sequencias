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
import re

DATA_ZIP = Path("data/bbc-fulltext.zip")
OPERADOR_SPLIT_REGEX = re.compile(r"\b(?:and|or)\b", re.IGNORECASE)
TOKEN_SUFFIX_REGEX = re.compile(r"[^\W\d_]+$")

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
        docs_scores = search_docs(consulta, indexador.indice_invertido)
        if docs_scores and isinstance(docs_scores[0], tuple):
            docs_scores = docs_scores
        else:
            docs_scores = [(doc, 0) for doc in docs_scores]

        docs_scores = docs_scores[:15]

        termos = [
            t.lower()
            for t in re.findall(r"[^\W\d_]+", consulta)
            if t.upper() not in {"AND", "OR"}
        ]

        with ZipFile(DATA_ZIP) as zf:
            for doc_id, score in docs_scores:
                try:
                    with zf.open(f"bbc/{doc_id}") as arquivo:
                        conteudo = arquivo.read().decode("utf-8", errors="ignore")
                        linhas = [l.strip() for l in conteudo.split("\n") if l.strip()]
                        titulo = linhas[0] if linhas else doc_id
                        texto = " ".join(linhas[1:])
                        texto_lower = texto.lower()

                        # Localiza a primeira ocorrência de cada termo
                        posicoes = []
                        for termo in termos:
                            match = re.search(re.escape(termo), texto_lower, re.IGNORECASE)
                            if match:
                                posicoes.append((termo, match.start(), match.end()))

                        if not posicoes:
                            trecho_realcado = texto[:160] + "..."
                        else:
                            posicoes.sort(key=lambda x: x[1])
                            primeiro_inicio = posicoes[0][1]
                            ultimo_fim = posicoes[-1][2]

                            # Caso tenha apenas 1 termo → garantir mínimo de 160 caracteres
                            if len(posicoes) == 1:
                                match = posicoes[0]
                                centro = (match[1] + match[2]) // 2
                                inicio = max(0, centro - 80)
                                fim = min(len(texto), centro + 80)
                                trecho = texto[inicio:fim]

                                # se for menor que 160, tentar expandir
                                while len(trecho) < 160 and inicio > 0 and fim < len(texto):
                                    inicio = max(0, inicio - 10)
                                    fim = min(len(texto), fim + 10)
                                    trecho = texto[inicio:fim]

                                for termo, _, _ in posicoes:
                                    trecho = re.sub(
                                        re.escape(termo),
                                        lambda m: f"<mark style='background-color:orange; color:black;'>{m.group(0)}</mark>",
                                        trecho,
                                        flags=re.IGNORECASE
                                    )
                                prefixo = "..." if inicio > 0 else ""
                                sufixo = "..." if fim < len(texto) else ""
                                trecho_realcado = f"{prefixo}{trecho.strip()}{sufixo}"

                            # Caso tenha mais de um termo
                            else:
                                dist = ultimo_fim - primeiro_inicio
                                if dist <= 160:
                                    inicio = max(0, primeiro_inicio - 20)
                                    fim = min(len(texto), ultimo_fim + 20)
                                    trecho = texto[inicio:fim]
                                else:
                                    # Exibir início e fim separados por "..."
                                    primeiro_trecho = texto[
                                        max(0, primeiro_inicio - 40):min(len(texto), primeiro_inicio + 40)
                                    ]
                                    ultimo_trecho = texto[
                                        max(0, ultimo_fim - 40):min(len(texto), ultimo_fim + 40)
                                    ]
                                    trecho = f"{primeiro_trecho.strip()} ... {ultimo_trecho.strip()}"
                                    if len(trecho) > 160:
                                        trecho = trecho[:157] + "..."

                                # Marca os termos
                                for termo, _, _ in posicoes:
                                    trecho = re.sub(
                                        re.escape(termo),
                                        lambda m: f"<mark style='background-color:orange; color:black;'>{m.group(0)}</mark>",
                                        trecho,
                                        flags=re.IGNORECASE
                                    )

                                prefixo = "..." if primeiro_inicio > 0 else ""
                                sufixo = "..." if ultimo_fim < len(texto) else ""
                                trecho_realcado = f"{prefixo}{trecho.strip()}{sufixo}"

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
    consulta = request.args.get("q", "")
    if not consulta or not consulta.strip():
        return jsonify([])

    segmento_final = OPERADOR_SPLIT_REGEX.split(consulta.lower())[-1]
    segmento_final = segmento_final.strip()

    match_prefixo = TOKEN_SUFFIX_REGEX.search(segmento_final)
    if not match_prefixo:
        return jsonify([])

    termo = match_prefixo.group(0)
    if not termo:
        return jsonify([])

    sugestoes = indexador.trie.sugestoes(termo)
    return jsonify(sugestoes[:10])


# ------------------------- MAIN -------------------------
if __name__ == "__main__":
    app.run(debug=True)
