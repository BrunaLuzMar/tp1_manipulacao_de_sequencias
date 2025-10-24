"""
Módulo dedicado a interpretar consultas booleanas e retornar documentos relevantes,
ordenados por relevância (média dos z-scores).

Suporta operadores AND, OR e parênteses, e consultas simples (como "legal amount"),
tratando a ausência de operadores como AND implícito.
"""

from typing import List, Dict, Set
import re
import math


# Tokenização da consulta
def parse_query(query: str) -> List[str]:
    """Quebra a consulta em tokens (palavras e operadores)."""
    tokens = re.findall(r'\w+|AND|OR|\(|\)', query.upper())
    return tokens


# Avaliação booleana da expressão
def evaluate_query(tokens: List[str], indice_invertido: Dict[str, Dict]) -> Set[str]:
    operandos = []   # pilha de conjuntos de documentos
    operadores = []  # pilha de operadores lógicos

    def aplicar_operador():
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
            operadores.pop()
        elif token in {"AND", "OR"}:
            # precedência: AND antes de OR
            while operadores and operadores[-1] == "AND" and token == "OR":
                aplicar_operador()
            operadores.append(token)
        else:
            termo = token.lower()
            if termo in indice_invertido:
                operandos.append(set(indice_invertido[termo]["docs"].keys()))
            else:
                operandos.append(set())

    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()


# Função principal — busca e cálculo de relevância
def search_docs(query: str, indice_invertido: Dict[str, Dict]) -> List[tuple]:
    """
    Recebe uma consulta booleana ou simples e retorna os documentos
    ordenados por relevância (média dos z-scores).
    Retorna lista de tuplas (doc_id, score).
    """
    tokens = parse_query(query)

    # AND implícito entre termos (caso o usuário não use operadores)
    tokens_com_and = []
    for i, token in enumerate(tokens):
        tokens_com_and.append(token)
        if (
            i + 1 < len(tokens)
            and token not in {"AND", "OR", "(", ")"}
            and tokens[i + 1] not in {"AND", "OR", ")", "("}
        ):
            tokens_com_and.append("AND")

    # resolve a expressão booleana
    docs_validos = evaluate_query(tokens_com_and, indice_invertido)

    # extrai apenas os termos "reais" da consulta
    termos = [
        t.lower() for t in tokens
        if re.match(r"^[A-Z]+$", t) and t not in {"AND", "OR"}
    ]

    # calcula relevância (média dos z-scores)
    scores = {}
    for termo in termos:
        if termo not in indice_invertido:
            continue

        dados = indice_invertido[termo]
        media = dados.get("media", 0)
        desvio = dados.get("desvio", 1e-6)

        # evita divisões por valores muito pequenos
        if desvio < 1e-3:
            desvio = 1

        for doc, freq in dados["docs"].items():
            if doc not in docs_validos:
                continue

            z = (freq - media) / desvio
            if z < 0:
                z = 0
            z = math.log1p(z)  # ← log natural de (1 + z), suaviza sem igualar tudo
            scores.setdefault(doc, []).append(z)

    # média dos z-scores por documento
    media_scores = {
        doc: sum(zs) / len(zs)
        for doc, zs in scores.items() if zs
    }

    # ordena por relevância (maior primeiro)
    resultados_ordenados = sorted(
        media_scores.items(), key=lambda x: x[1], reverse=True
    )

    #  Retorna pares (doc_id, score)
    return resultados_ordenados