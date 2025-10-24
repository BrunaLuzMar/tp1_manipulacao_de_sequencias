"""Módulo destinado a abrigar a implementação da Trie compacta responsável por armazenar e recuperar termos indexados.
A versão final incluirá estruturas de nós comprimidas, manipulação de sufixos compartilhados e métodos eficientes de busca."""

class TrieNode:

    def __init__(self, prefixo: str = "") -> None:
        self.prefixo = prefixo
        self.filhos = {}  # filhos: dict[str, TrieNode]
        self.eh_terminal = False


class CompressedTrie:

    def __init__(self):
        self.root = TrieNode()

    def commonPrefixLenght(self, a: str, b: str) -> int:
        tam = 0
        while tam < len(a) and tam < len(b) and a[tam] == b[tam]:
            tam += 1
        return tam

    def insert(self, termo: str):
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            filhoExiste = letra in node.filhos

            if not filhoExiste:
                novoNo = TrieNode(termo[indice:])
                novoNo.eh_terminal = True
                node.filhos[letra] = novoNo
                return

            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tamPrefixo

            if tamPrefixo < len(node.prefixo):
                novoFilho = TrieNode(node.prefixo[tamPrefixo:])
                novoFilho.eh_terminal = node.eh_terminal
                novoFilho.filhos = node.filhos

                node.prefixo = node.prefixo[:tamPrefixo]
                node.filhos = {novoFilho.prefixo[0]: novoFilho}
                node.eh_terminal = indice == len(termo)

    def busca(self, termo: str) -> bool:
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            if letra not in node.filhos:
                return False

            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tamPrefixo

            if tamPrefixo < len(node.prefixo):
                return indice == len(termo)

            if indice == len(termo):
                return node.eh_terminal

        return False

    def sugestoes(self, prefixo: str):
        """
        Retorna todas as palavras na Trie que começam com o prefixo dado.
        Corrige o caso em que o prefixo termina no meio de um nó compactado.
        """
        resultados = []

        def dfs(node, caminho):
            if node.eh_terminal:
                resultados.append(caminho)
            for filho in node.filhos.values():
                dfs(filho, caminho + filho.prefixo)

        node = self.root
        indice = 0

        while indice < len(prefixo):
            letra = prefixo[indice]
            if letra not in node.filhos:
                return []

            node = node.filhos[letra]
            tam = self.commonPrefixLenght(prefixo[indice:], node.prefixo)

            # Se o prefixo termina no meio do node.prefixo
            if tam < len(node.prefixo):
                # Se o prefixo realmente terminou aqui (ex: "conn" dentro de "connection")
                if indice + tam == len(prefixo):
                    # Caminho é só o prefixo digitado (não inventa o resto do node)
                    resto = node.prefixo[tam:]  # o que vem depois de "conn" dentro de "connection"
                    # Explora os filhos normalmente a partir daqui
                    if node.eh_terminal:
                        resultados.append(prefixo)
                    for filho in node.filhos.values():
                        dfs(filho, prefixo + resto + filho.prefixo)
                    return resultados
                else:
                    return []

            indice += tam

        dfs(node, prefixo)
        return resultados


def main():
    trie = CompressedTrie()
    termos = ["batata", "batalha", "carro", "comput", "computer", "love"]

    for termo in termos:
        trie.insert(termo)

    print("Estrutura da Trie:")
    trie.imprimir()

    testes = [
        "batata",
        "batalha",
        "computador",
        "carro",
        "ba",
        "car",
        "bala",
        "computer",
    ]

    print("Resultados da busca na Trie:")
    for termo in testes:
        encontrado = trie.busca(termo)
        status = "encontrado" if encontrado else "não encontrado"
        print(f" - {termo}: {status}")

    print("\nSugestões para 'l', 'lo', 'lov':")
    for p in ["l", "lo", "lov"]:
        print(f"{p} -> {trie.sugestoes(p)}")


if __name__ == "__main__":
    main()
