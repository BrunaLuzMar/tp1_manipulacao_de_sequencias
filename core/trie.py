"""Módulo destinado a abrigar a implementação da Trie compacta responsável por armazenar e recuperar termos indexados.
A versão final incluirá estruturas de nós comprimidas, manipulação de sufixos compartilhados e métodos eficientes de busca."""

class TrieNode:

    def __init__(self, prefixo: str = "") -> None:
        self.prefixo = prefixo
        self.filhos = {} # filhos: dict[str, Trie]
        self.eh_terminal = False

class CompressedTrie:

    def __init__(self):
        self.root = TrieNode()

    def commonPrefixLenght(self, a: str, b: str) -> int:
        tam = 0
        while (tam < len(a) and tam < len(b) and a[tam] == b[tam]):
            tam += 1

        return tam
    
    def insert(self, termo: str):
        # Analisa caractere por caractere do termo, se o caractere existir, ele chama a função novamente para analisar só o restante do termo. POr exemplo, se em "abacate", "a" já estiver na arovre, ele chama a função novamente para analisar "bacate" na subárvore de "a".

        node = self.root
        indice = 0

        while (indice < len(termo)):
            letra = termo[indice]
            filhoExiste = letra in node.filhos

            if not filhoExiste:
                #[indice:] pega o sufixo do termo a partir do índice atual quando encontra a primeira letra que não existe na árvore
                novoNo = TrieNode(termo[indice:])
                novoNo.eh_terminal = True
                node.filhos[letra] = novoNo
                return
            
            node = node.filhos[letra]
            tamPrefixo = self.commonPrefixLenght(termo[indice:], node.prefixo)

            indice += tamPrefixo

            # Exemplo de caso batata x batalha, apenas "bata" fica no prefixo, "ta" e "lha" viram folhas
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

            # Esse if existe porque ou o termo tem o prefixo igual - está todo contido no nó - ou ele é maior - e nesse caso a função commonPrefixLenght trata isso convertendo os sufixos em folhas
            indice += tamPrefixo

            # Não sei porque o if abaixo não consegue dar conta desse caso, mas esse aqui trata quando a palavra está dentro do prefixo. Exemplo: buscar por "ba" em uma árvore que tem "batata" e "batalha"
            if tamPrefixo < len(node.prefixo):
                return indice == len(termo)

            # Exemplo de uso desse if. Se na árvore houver 0 -> comput -> er e o termo de busca for "computer", tamPrefixo será 6, quando indice = 0, porque "c" vai dar match na árvore. O novo indice será 6. termo[6] = "e", vai dar match e tamPrefixo será 2. O novo indice será 8. Como indice == len(termo), o termo "computer" está na árvore. 
            if indice == len(termo):
                return node.eh_terminal

        return False
    
    def sugestoes(self, prefixo: str):
        """
        Retorna todas as palavras na Trie que começam com o prefixo dado.
        Pode ser usada para autocomplete.
        """
        resultados = []

        def dfs(node, caminho):
            if node.eh_terminal:
                resultados.append(caminho + node.prefixo)
            for filho in node.filhos.values():
                dfs(filho, caminho + node.prefixo)

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
            # Monta os conectores visuais (semelhantes ao tree do Linux)
            conector = "└── " if eh_ultimo else "├── "
            
            # Define etiqueta e marcador de nó terminal
            etiqueta = node.prefixo if node.prefixo else "<raiz>"
            marcador = " *" if node.eh_terminal else ""
            
            # Mostra o nó atual
            print(prefixo_visual + conector + etiqueta + marcador)

            # Gera o prefixo visual para os próximos filhos
            proximo_prefixo = prefixo_visual + ("    " if eh_ultimo else "│   ")
            
            # Ordena os filhos para manter a saída estável
            filhos = list(node.filhos.items())
            for i, (chave, filho) in enumerate(filhos):
                _imprimir_no(filho, proximo_prefixo, i == len(filhos) - 1)

        print("Estrutura da Trie Compacta:")
        _imprimir_no(self.root)


def main():
    trie = CompressedTrie()
    termos = ["batata", "batalha", "carro", "comput", "computer"]

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

if __name__ == "__main__":
    main()
