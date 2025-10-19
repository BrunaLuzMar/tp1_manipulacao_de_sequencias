"""Responsável pela leitura dos documentos do corpus, pela construção do índice invertido e pela integração com a Trie compacta.
Aqui ficarão as funções de pré-processamento de texto, normalização e registro de estatísticas para uso na busca."""

import re
import sys
from pathlib import Path
from typing import Iterable, List, TextIO
from zipfile import ZipFile

BASE_PATH = Path(__file__).resolve().parent.parent
if __package__ is None or __package__ == "":
    sys.path.append(str(BASE_PATH))
    from core.trie import CompressedTrie
else:
    from .trie import CompressedTrie


DATA_ZIP = BASE_PATH / "data" / "bbc-fulltext.zip"
TOKEN_REGEX = re.compile(r"[^\W\d_]+", re.UNICODE)


def acessar_pasta_zip(indexador: "Indexador", arquivo_zip: Path | None = None, limite: int | None = None) -> None:
    """Lê bbc/<categoria>/<arquivo>.txt no zip, tokeniza e envia para o indexador.
        
       arg-> limite: Número máximo de documentos a processar (None para todos).
    """
    zip_path = Path(arquivo_zip) if arquivo_zip else DATA_ZIP

    processados = 0
    with ZipFile(zip_path) as zf:
        for caminho in sorted(zf.namelist()):
            if caminho.endswith("/"):
                continue

            partes = caminho.split("/")

            if len(partes) >= 3 and partes[0] == "bbc" and caminho.endswith(".txt"):
                categoria = partes[1]
                nome_arquivo = partes[-1]
                with zf.open(caminho) as fp:
                    conteudo = fp.read().decode("utf-8", errors="ignore")
                tokens = tokenizar_texto(conteudo)
                doc_id = f"{categoria}/{nome_arquivo}"
                indexador.indexar_documento(doc_id, tokens)

                processados += 1
                if limite is not None and processados >= limite:
                    break


def tokenizar_texto(texto: str) -> List[str]:
    texto = texto.lower() # Normalização básica para minúsculas
    palavra_set = texto.split() # Divisão simples por espaços

    # Com essa lógica palavras como "co-operativa" viram dois tokens "co" e "operativa" separados -> Precisamos ver se isso é aceitável
    tokens_limpos = []
    for palavra in palavra_set:
        fragmentos = TOKEN_REGEX.findall(palavra)
        for fragmento in fragmentos:
            if fragmento:
                tokens_limpos.append(fragmento)

    return tokens_limpos

class Indexador:
    def __init__(self):
        self.trie = CompressedTrie()
        self.indice_invertido = {} # dict[str, set[str]] = dict[termo, conjunto de documentos]

    def indexar_documento(self, doc_id: str, tokens: List[str]):
        # Importante!!!: O doc_id está sendo passado como string no formato "categoria/nome_arquivo.txt"
        for termo in tokens:
            self.trie.insert(termo)

            if termo not in self.indice_invertido:
                self.indice_invertido[termo] = set()
            self.indice_invertido[termo].add(doc_id)

    def buscar_termo(self, termo: str):
        # Retorna os documentos associados ao termo
        if self.trie.busca(termo):
            return self.indice_invertido.get(termo, set())
        return set()

    def imprimir_indice(self, destino: TextIO | None = None) -> None:
        """Mostra o índice invertido (termo -> doc_ids)."""
        saida = destino if destino is not None else sys.stdout
        for termo in sorted(self.indice_invertido.keys()):
            docs = sorted(self.indice_invertido[termo])
            docs_str = ", ".join(docs)
            print(f"{termo}: {docs_str}", file=saida)

    def salvar_indice(self, caminho: Path | str) -> None:
        destino = Path(caminho)
        with destino.open("w", encoding="utf-8") as fp:
            self.imprimir_indice(destino=fp)

