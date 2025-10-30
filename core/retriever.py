import re
import math
from typing import List, Set, Any


def parse_query(query: str) -> List[str]:
    """Tokeniza a consulta, separando operadores e termos."""
    # A ordem importa: AND/OR primeiro
    tokens = re.findall(r"AND|OR|\(|\)|[^\W\d_]+", query.upper())
    return tokens


def evaluate_query(tokens: List[str], trie: Any) -> Set[str]:
    """Avalia a expressão booleana e retorna os documentos válidos."""
    if trie is None:
        return set()
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
            referencia = trie.obter_indice(termo) if trie is not None else None
            docs_map = referencia["docs"] if referencia and "docs" in referencia else {}
            operandos.append(set(docs_map.keys()))

    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()


def search_docs(query: str, trie: Any) -> List[tuple]:
    """Executa a busca booleana e ordena os documentos por relevância."""
    if trie is None:
        return []
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

    docs_validos = evaluate_query(tokens_com_and, trie)
    termos = [t.lower() for t in tokens if t not in {"AND", "OR", "(", ")"}]

    scores = {}
    for termo in termos:
        referencia = trie.obter_indice(termo) if trie is not None else None
        dados = referencia if referencia else None
        if not dados:
            continue
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
