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
        Usada para autocomplete.
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
            indice += tam
            if tam < len(node.prefixo):
                return []

        dfs(node, prefixo)
        return resultados

    def imprimir(self) -> None:
        """Imprime a estrutura da Trie compacta em formato hierárquico, com prefixos e marcadores."""

        def _imprimir_no(node: TrieNode, prefixo_visual: str = "", eh_ultimo: bool = True) -> None:
            conector = "└── " if eh_ultimo else "├── "
            etiqueta = node.prefixo if node.prefixo else "<raiz>"
            marcador = " *" if node.eh_terminal else ""
            print(prefixo_visual + conector + etiqueta + marcador)

            proximo_prefixo = prefixo_visual + ("    " if eh_ultimo else "│   ")
            filhos = list(node.filhos.items())
            for i, (chave, filho) in enumerate(filhos):
                _imprimir_no(filho, proximo_prefixo, i == len(filhos) - 1)

        print("Estrutura da Trie Compacta:")
        _imprimir_no(self.root)


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
