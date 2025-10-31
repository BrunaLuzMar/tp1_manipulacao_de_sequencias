"""
Módulo responsável pela lógica de busca booleana.
Aqui a consulta do usuário é lida, interpretada e usada pra encontrar os documentos no índice.

1. `parse_query` quebra o texto da consulta em partes (termos e operadores AND/OR).
2. `evaluate_query` executa a expressão booleana usando os dados do índice (trie),
   devolvendo o conjunto de documentos que atendem à lógica da busca.
3. `search_docs` chama as duas funções acima, calcula a relevância de cada documento
   (com base na frequência dos termos) e devolve uma lista ordenada de resultados.
"""

import re
import math
from typing import List, Set, Any


def parse_query(query: str) -> List[str]:
    """
    Divide a consulta digitada pelo usuário em partes.
    Extrai os operadores lógicos  e os parênteses.
    Mantém a ordem e transforma tudo em maiúsculo pra simplificar o parser.
    Exemplo: "gato AND (cachorro OR periquito)" → ["GATO", "AND", "(", "CACHORRO", "OR", "PERIQUITO", ")"]
    """
    tokens = re.findall(r"AND|OR|\(|\)|[^\W\d_]+", query.upper())
    return tokens


def evaluate_query(tokens: List[str], trie: Any) -> Set[str]:
    """
    Interpreta e executa a expressão booleana.
    Usa pilhas pra aplicar a precedência dos operadores (AND antes de OR).
    Retorna o conjunto de documentos que satisfazem a condição lógica.
    """
    if trie is None:
        return set()

    operandos = []   # pilha com conjuntos de documentos (um conjunto pra cada termo)
    operadores = []  # pilha com operadores 
    precedencia = {"AND": 2, "OR": 1}

    def aplicar_operador():
        # aplica o último operador entre os dois operandos mais recentes
        if len(operandos) < 2:
            return
        op = operadores.pop()
        direita = operandos.pop()
        esquerda = operandos.pop()
        if op == "AND":
            operandos.append(esquerda & direita)
        elif op == "OR":
            operandos.append(esquerda | direita)

    # percorre cada token e trata conforme o tipo
    for token in tokens:
        if token == "(":
            operadores.append(token)
        elif token == ")":
            # fecha parênteses executando o que estiver dentro
            while operadores and operadores[-1] != "(":
                aplicar_operador()
            if operadores and operadores[-1] == "(":
                operadores.pop()
        elif token in {"AND", "OR"}:
            # aplica operadores de maior precedência antes de empilhar o novo
            while (operadores and operadores[-1] in precedencia and
                   precedencia[operadores[-1]] >= precedencia[token]):
                aplicar_operador()
            operadores.append(token)
        else:
            # recupera os documentos associados ao termo
            termo = token.lower()
            referencia = trie.obter_indice(termo) if trie is not None else None
            docs_map = referencia["docs"] if referencia and "docs" in referencia else {}
            operandos.append(set(docs_map.keys()))

    # aplica operadores restantes no fim
    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()


def search_docs(query: str, trie: Any) -> List[tuple]:
    """
    Executa a busca completa.
    - Faz o parse da consulta.
    - Aplica a lógica booleana (evaluate_query).
    - Calcula um score de relevância pra cada documento.
    O resultado final é uma lista de tuplas (documento, score) ordenada por relevância.
    """
    if trie is None:
        return []

    # transforma a consulta em tokens
    tokens = parse_query(query)

    # adiciona "AND" implícito entre termos consecutivos (ex: "agua solo" → "agua AND solo")
    tokens_com_and = []
    for i, token in enumerate(tokens):
        tokens_com_and.append(token)
        if (
            i + 1 < len(tokens)
            and token not in {"AND", "OR", "(", ")"}
            and tokens[i + 1] not in {"AND", "OR", ")", "("}
        ):
            tokens_com_and.append("AND")

    # executa a expressão booleana e pega os documentos válidos
    docs_validos = evaluate_query(tokens_com_and, trie)

    # extrai apenas os termos (remove operadores e parênteses)
    termos = [t.lower() for t in tokens if t not in {"AND", "OR", "(", ")"}]

    scores = {}  # dicionário: doc_id → lista de scores parciais

    # percorre cada termo e calcula o peso de cada documento
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

            # calcula z-score do termo (frequência padronizada)
            z = (freq - media) / desvio
            if z < 0:
                z = 0

            # aplica log pra reduzir impacto de valores muito altos
            z = math.log1p(z)

            # acumula score por documento
            scores.setdefault(doc, []).append(z)

    # faz a média dos scores parciais de cada documento
    media_scores = {doc: sum(v) / len(v) for doc, v in scores.items() if v}

    # retorna lista ordenada (maior score primeiro)
    return sorted(media_scores.items(), key=lambda x: x[1], reverse=True)
