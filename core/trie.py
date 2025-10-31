"""
Esse módulo implementa a Trie compacta usada pra armazenar e buscar os termos indexados.
A ideia é comprimir nós que compartilham prefixos e otimizar a busca e o autocomplete.

- Cada nó guarda um prefixo que pode ter várias letras, não só uma.
- Quando dois termos compartilham o mesmo começo, eles dividem parte do caminho.
- A Trie também armazena uma referência pro índice invertido, usada na busca principal.
"""

class TrieNode:
    """Nó da Trie compacta: guarda um prefixo, os filhos e se é o fim de uma palavra."""
    def __init__(self, prefixo: str = "") -> None:
        self.prefixo = prefixo
        self.filhos = {}  # chave: letra inicial → nó filho
        self.eh_terminal = False  # indica se o nó representa o fim de uma palavra
        self.referencia_indice = None  # ponteiro pro índice invertido (dados do termo)


class CompressedTrie:
    """Implementa a Trie compacta com inserção, busca e sugestões."""
    def __init__(self):
        self.root = TrieNode()

    def commonPrefixLenght(self, a: str, b: str) -> int:
        """Calcula o tamanho do prefixo em comum entre duas strings."""
        tam = 0
        while tam < len(a) and tam < len(b) and a[tam] == b[tam]:
            tam += 1
        return tam

    def insert(self, termo: str):
        """
        Insere um termo na Trie.
        Divide os nós quando há diferença de prefixo e cria novos nós se necessário.
        """
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            filhoExiste = letra in node.filhos

            # Se não existe filho com essa letra, cria um novo nó direto
            if not filhoExiste:
                novoNo = TrieNode(termo[indice:])
                novoNo.eh_terminal = True
                node.filhos[letra] = novoNo
                return

            # Se já existe um prefixo, avança por ele
            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tamPrefixo

            # Se há uma diferença dentro do prefixo, divide o nó
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
        """Verifica se um termo completo existe na Trie."""
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            if letra not in node.filhos:
                return False

            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tamPrefixo

            # Se o termo para no meio do prefixo e ainda tem letras faltando, não existe
            if tamPrefixo < len(node.prefixo):
                return indice == len(termo)

            if indice == len(termo):
                return node.eh_terminal

        return False

    def sugestoes(self, prefixo: str):
        """
        Retorna todas as palavras que começam com o prefixo informado.
        Lida com casos em que o prefixo termina no meio de um nó compactado.
        """
        resultados = []

        def dfs(node, caminho):
            """Percorre a Trie em profundidade pra coletar as palavras."""
            if node.eh_terminal:
                resultados.append(caminho)
            for filho in node.filhos.values():
                dfs(filho, caminho + filho.prefixo)

        node = self.root
        indice = 0

        # Navega até o ponto onde o prefixo termina
        while indice < len(prefixo):
            letra = prefixo[indice]
            if letra not in node.filhos:
                return []

            node = node.filhos[letra]
            tam = self.commonPrefixLenght(prefixo[indice:], node.prefixo)

            # Se o prefixo termina no meio de um nó
            if tam < len(node.prefixo):
                if indice + tam == len(prefixo):
                    if node.eh_terminal:
                        resultados.append(prefixo)
                    for filho in node.filhos.values():
                        dfs(filho, prefixo + node.prefixo[tam:] + filho.prefixo)
                    return resultados
                else:
                    return []

            indice += tam

        dfs(node, prefixo)
        return resultados

    def _navegar_ate_termo(self, termo: str):
        """Encontra o nó terminal correspondente ao termo, se existir."""
        node = self.root
        indice = 0

        while indice < len(termo):
            letra = termo[indice]
            if letra not in node.filhos:
                return None

            node = node.filhos[letra]
            tam = self.commonPrefixLenght(termo[indice:], node.prefixo)
            indice += tam

            # Se o termo para no meio do prefixo e ainda tem sobra, não é terminal
            if tam < len(node.prefixo):
                return node if indice == len(termo) and node.eh_terminal else None

        return node if node.eh_terminal else None

    def registrar_indice(self, termo: str, referencia):
        """Associa um termo ao seu registro no índice invertido."""
        node = self._navegar_ate_termo(termo)
        if node is None:
            return False
        node.referencia_indice = referencia
        node.eh_terminal = True
        return True

    def obter_indice(self, termo: str):
        """Retorna a referência pro índice invertido de um termo."""
        node = self._navegar_ate_termo(termo)
        return node.referencia_indice if node else None


def main():
    """
    Teste simples da Trie.
    Insere alguns termos, testa a busca e mostra sugestões por prefixo.
    """
    trie = CompressedTrie()
    termos = ["batata", "batalha", "carro", "comput", "computer", "love"]

    for termo in termos:
        trie.insert(termo)

    print("Estrutura da Trie construída.\n")

    testes = ["batata", "batalha", "computador", "carro", "ba", "car", "bala", "computer"]
    print("Testes de busca:")
    for termo in testes:
        encontrado = trie.busca(termo)
        status = "encontrado" if encontrado else "não encontrado"
        print(f"{termo}: {status}")

    print("\nSugestões para prefixos:")
    for p in ["l", "lo", "lov", "bat", "comp"]:
        print(f"{p} -> {trie.sugestoes(p)}")


if __name__ == "__main__":
    main()
