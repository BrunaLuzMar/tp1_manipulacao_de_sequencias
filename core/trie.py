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

    def imprimir(self) -> None:
        """Imprime recursivamente a estrutura da Trie com os prefixos comprimidos."""
        def _imprimir_no(node: TrieNode, indent: str) -> None:
            etiqueta = node.prefixo if node.prefixo else "<raiz>"
            marcador = "*" if node.eh_terminal else ""
            print(f"{indent}{etiqueta}{marcador}")
            for chave in sorted(node.filhos.keys()):
                _imprimir_no(node.filhos[chave], indent + "  ")

        _imprimir_no(self.root, "")

# Acho que tá tudo funcionando ok
