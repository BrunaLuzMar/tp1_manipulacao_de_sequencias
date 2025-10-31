"""Módulo que implementa a Trie compacta, estrutura de dados responsável por armazenar o índice invertido do sistema. 
Cada nó armazena prefixos compartilhados entre termos, permitindo buscas, inserções e sugestões de autocompletar de forma eficiente."""

class TrieNode:

    def __init__(self, prefixo: str = "") -> None:
        self.prefixo = prefixo
        self.filhos = {}  # filhos: dict[str, TrieNode]
        self.eh_terminal = False
        self.referencia_indice = None  # ponteiro para dados do índice invertido


class CompressedTrie:

    def __init__(self):
        self.root = TrieNode()

    def commonPrefixLenght(self, a: str, b: str) -> int:
        # Tamanho do prefixo comnum entre a e b
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
                # novo termo completo, referência será atribuída posteriormente
                node.filhos[letra] = novoNo
                return

            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tamPrefixo

            if tamPrefixo < len(node.prefixo):
                novoFilho = TrieNode(node.prefixo[tamPrefixo:])
                novoFilho.eh_terminal = node.eh_terminal
                novoFilho.filhos = node.filhos
                novoFilho.referencia_indice = node.referencia_indice

                node.prefixo = node.prefixo[:tamPrefixo]
                node.filhos = {novoFilho.prefixo[0]: novoFilho}
                node.eh_terminal = indice == len(termo)
                if not node.eh_terminal:
                    node.referencia_indice = None

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

    def _navegar_ate_termo(self, termo: str):
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            if letra not in node.filhos:
                return None

            node = node.filhos[letra]
            tam = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tam

            if tam < len(node.prefixo):
                return node if indice == len(termo) and node.eh_terminal else None

        return node if node.eh_terminal else None

    def registrar_indice(self, termo: str, referencia):
        """
        Associa a estrutura do índice invertido ao nó terminal do termo.
        """
        node = self._navegar_ate_termo(termo)
        if node is None:
            return False
        node.referencia_indice = referencia
        node.eh_terminal = True
        return True

    def obter_indice(self, termo: str):
        """
        Retorna a referência para o índice invertido armazenado no termo.
        """
        node = self._navegar_ate_termo(termo)
        return node.referencia_indice if node else None


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
