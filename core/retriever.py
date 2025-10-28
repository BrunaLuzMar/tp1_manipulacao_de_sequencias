import re
import math
from typing import List, Dict, Set


def parse_query(query: str) -> List[str]:
    """Tokeniza a consulta, separando operadores e termos."""
    # A ordem importa: AND/OR primeiro
    tokens = re.findall(r'AND|OR|\(|\)|[^\W\d_]+', query.upper())
    return tokens


def evaluate_query(tokens: List[str], indice_invertido: Dict[str, Dict]) -> Set[str]:
    """Avalia a expressão booleana e retorna os documentos válidos."""
    operandos = []
    operadores = []
    precedencia = {"AND": 2, "OR": 1}

    def aplicar_operador():
        if len(operandos) < 2:
            return
        op = operadores.pop()
        direita = operandos.pop()
        esquerda = operandos.pop()
        if op == "AND":
            operandos.append(esquerda & direita)
        elif op == "OR":
            operandos.append(esquerda | direita)

    for token in tokens:
        if token == "(":
            operadores.append(token)
        elif token == ")":
            while operadores and operadores[-1] != "(":
                aplicar_operador()
            if operadores and operadores[-1] == "(":
                operadores.pop()
        elif token in {"AND", "OR"}:
            while (operadores and operadores[-1] in precedencia and
                   precedencia[operadores[-1]] >= precedencia[token]):
                aplicar_operador()
            operadores.append(token)
        else:
            termo = token.lower()
            operandos.append(set(indice_invertido.get(termo, {}).get("docs", {}).keys()))

    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()


def search_docs(query: str, indice_invertido: Dict[str, Dict]) -> List[tuple]:
    """Executa a busca booleana e ordena os documentos por relevância."""
    tokens = parse_query(query)

    # Adiciona AND implícito
    tokens_com_and = []
    for i, token in enumerate(tokens):
        tokens_com_and.append(token)
        if (
            i + 1 < len(tokens)
            and token not in {"AND", "OR", "(", ")"}
            and tokens[i + 1] not in {"AND", "OR", ")", "("}
        ):
            tokens_com_and.append("AND")

    docs_validos = evaluate_query(tokens_com_and, indice_invertido)
    termos = [t.lower() for t in tokens if t not in {"AND", "OR", "(", ")"}]

    scores = {}
    for termo in termos:
        if termo not in indice_invertido:
            continue
        dados = indice_invertido[termo]
        media = dados.get("media", 0)
        desvio = dados.get("desvio", 1e-6)
        if desvio < 1e-3:
            desvio = 1

        for doc, freq in dados["docs"].items():
            if doc not in docs_validos:
                continue
            z = (freq - media) / desvio
            if z < 0:
                z = 0
            z = math.log1p(z)
            scores.setdefault(doc, []).append(z)

    media_scores = {doc: sum(v) / len(v) for doc, v in scores.items() if v}
    return sorted(media_scores.items(), key=lambda x: x[1], reverse=True)
