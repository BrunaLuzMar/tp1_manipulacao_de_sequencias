import re
import math
from typing import List, Set, Any


def parse_query(query: str) -> List[str]:
    # Separa a busca em pedaços: palavras, AND, OR e parênteses.
    # Exemplo: "gato AND (cachorro OR periquito)" → ["GATO", "AND", "(", "CACHORRO", "OR", "PERIQUITO", ")"]
    tokens = re.findall(r"AND|OR|\(|\)|[^\W\d_]+", query.upper())
    return tokens


def evaluate_query(tokens: List[str], trie: Any) -> Set[str]:
    # Lê os tokens e aplica a lógica booleana , respeitando a ordem certa dos operadores.
    if trie is None:
        return set()

    operandos = []   # pilha com conjuntos de documentos
    operadores = []  # pilha com AND/OR
    precedencia = {"AND": 2, "OR": 1}

    def aplicar_operador():
        # Aplica o operador do topo da pilha (AND ou OR) nos dois últimos conjuntos de docs.
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
            # resolve tudo até achar o "(" correspondente
            while operadores and operadores[-1] != "(":
                aplicar_operador()
            if operadores and operadores[-1] == "(":
                operadores.pop()
        elif token in {"AND", "OR"}:
            # respeita a prioridade: AND vem antes de OR
            while (operadores and operadores[-1] in precedencia and
                   precedencia[operadores[-1]] > precedencia[token]):
                aplicar_operador()
            operadores.append(token)
        else:
            # é uma palavra normal → busca no índice (trie)
            termo = token.lower()
            referencia = trie.obter_indice(termo) if trie else None
            docs_map = referencia["docs"] if referencia and "docs" in referencia else {}
            operandos.append(set(docs_map.keys()))

    while operadores:
        aplicar_operador()

    return operandos[0] if operandos else set()


def search_docs(query: str, trie: Any) -> List[tuple]:
    # Faz a busca completa e retorna uma lista com (documento, relevância)
    if trie is None:
        return []

    tokens = parse_query(query)

    # Adiciona "AND" automaticamente quando o usuário não coloca operador entre duas palavras.
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
    tem_or = "OR" in tokens

    scores = {}  # guarda a relevância de cada termo em cada documento

    for termo in termos:
        referencia = trie.obter_indice(termo)
        if not referencia:
            continue

        media = referencia.get("media", 0)
        desvio = referencia.get("desvio", 1e-6)
        if desvio < 1e-3:
            desvio = 1

        for doc in docs_validos:
            # frequência do termo no documento (ou zero se não existir)
            freq = referencia["docs"].get(doc, 0)
            # normaliza a frequência (z-score) e aplica log pra suavizar
            z = max(0, (freq - media) / desvio)
            z = math.log1p(z)
            scores.setdefault(doc, {})[termo] = z

    final_scores = {}
    for doc, termos_scores in scores.items():
        if tem_or:
            # no caso de OR: tira a média (quem não tem o termo conta como zero)
            valores = [termos_scores.get(t, 0) for t in termos]
            final_scores[doc] = sum(valores) / len(termos)
        else:
            # no caso de AND: soma direta das relevâncias
            final_scores[doc] = sum(termos_scores.values())

    # ordena pelo score final (maior primeiro)
    return sorted(final_scores.items(), key=lambda x: x[1], reverse=True)
