"""
Módulo dedicado a interpretar consultas booleanas e retornar documentos relevantes
com destaque para os termos buscados.

Incluirá a análise dos operadores AND, OR e parênteses,
além da paginação amigável dos resultados.
"""

from typing import List, Dict, Set
import re



# 1. Quebrar a consulta em tokens


def parse_query(query: str) -> List[str]:
    """
    Quebra a string da consulta em tokens.
    Exemplo:
        "(casa AND piscina) OR praia"
    Retorna:
        ['(', 'CASA', 'AND', 'PISCINA', ')', 'OR', 'PRAIA']
    """
    # Corrigido: \w+ em vez de \w (pra capturar palavras inteiras)
    # e casefold() pra evitar erro com letras maiúsculas/minúsculas
    tokens = re.findall(r'\w+|AND|OR|\(|\)', query.upper())
    return tokens



# 2. Avaliar a expressão booleana


def evaluate_query(tokens: List[str], indice_invertido: Dict[str, Set[str]]) -> Set[str]:
    operandos = []   # pilha de conjuntos de documentos
    operadores = []  # pilha de operadores lógicos

    def aplicar_operador():
        """Aplica o operador lógico no topo da pilha."""
        op = operadores.pop()
        direita = operandos.pop()
        esquerda = operandos.pop()

        if op == "AND":
            operandos.append(esquerda & direita)  # interseção
        elif op == "OR":
            operandos.append(esquerda | direita)  # união

    for token in tokens:
        if token == "(":
            operadores.append(token)

        elif token == ")":
            while operadores and operadores[-1] != "(":
                aplicar_operador()
            operadores.pop()  # remove "("

        elif token in {"AND", "OR"}:
            # Garante precedência: AND antes de OR
            while operadores and operadores[-1] == "AND" and token == "OR":
                aplicar_operador()
            operadores.append(token)

        else:
            # Termo normal → conjunto de documentos
            operandos.append(indice_invertido.get(token.lower(), set()))

    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()



# 3. Função principal


def search_docs(query: str, indice_invertido: Dict[str, Set[str]]) -> List[str]:
    """Recebe uma consulta booleana e retorna a lista de documentos relevantes."""
    tokens = parse_query(query)
    result = evaluate_query(tokens, indice_invertido)
    return sorted(result)
