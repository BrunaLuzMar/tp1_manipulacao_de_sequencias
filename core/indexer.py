"""Responsável pela leitura dos documentos do corpus, pela construção do índice invertido e pela integração com a Trie compacta.
Aqui ficarão as funções de pré-processamento de texto, normalização e registro de estatísticas para uso na busca."""

import json
import re
import sys
import math
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
    texto = texto.lower()
    palavra_set = texto.split()

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
        # Agora: termo -> {"docs": {doc_id: freq}, "media": float, "desvio": float}
        self.indice_invertido = {}

    def indexar_documento(self, doc_id: str, tokens: List[str]):
        """Registra cada termo do documento no índice invertido e na Trie."""
        contagem = {}
        for termo in tokens:
            contagem[termo] = contagem.get(termo, 0) + 1

        for termo, freq in contagem.items():
            self.trie.insert(termo)
            if termo not in self.indice_invertido:
                self.indice_invertido[termo] = {"docs": {}}

            dados_termo = self.indice_invertido[termo]
            dados_termo["docs"][doc_id] = freq
            # mantém a trie sincronizada com o índice invertido em memória
            self.trie.registrar_indice(termo, dados_termo)

    def calcular_estatisticas(self):
        """Calcula média e desvio padrão de frequência por termo."""
        for termo, dados in self.indice_invertido.items():
            freqs = list(dados["docs"].values())

            if not freqs:
                dados["media"] = 0.0
                dados["desvio"] = 1.0
                continue

            media = sum(freqs) / len(freqs)
            variancia = sum((f - media) ** 2 for f in freqs) / len(freqs)
            desvio = math.sqrt(variancia)

            # 🔸 Impede desvio muito pequeno (evita score alto)
            if desvio < 1.0:
                desvio = 1.0

            dados["media"] = media
            dados["desvio"] = desvio



    def buscar_termo(self, termo: str):
        if termo in self.indice_invertido:
            return set(self.indice_invertido[termo]["docs"].keys())
        return set()

    def imprimir_indice(self, destino: TextIO | None = None) -> None:
        saida = destino if destino is not None else sys.stdout
        for termo, dados in sorted(self.indice_invertido.items()):
            docs = ", ".join(f"{doc}:{freq}" for doc, freq in sorted(dados["docs"].items()))
            print(f"{termo} → {docs} | μ={dados.get('media', 0):.2f}, σ={dados.get('desvio', 0):.2f}", file=saida)

    def salvar_indice(self, caminho: Path | str) -> None:
        destino = Path(caminho)
        self.calcular_estatisticas()
        dados_serializados = {}
        for termo, dados in self.indice_invertido.items():
            dados_serializados[termo] = {
                "docs": dados.get("docs", {}),
                "media": dados.get("media", 0.0),
                "desvio": dados.get("desvio", 1.0),
            }
        with destino.open("w", encoding="utf-8") as fp:
            json.dump(dados_serializados, fp)

    def carregar_indice(self, caminho: Path | str) -> None:
        origem = Path(caminho)
        with origem.open("r", encoding="utf-8") as fp:
            try:
                dados_serializados = json.load(fp)
            except json.JSONDecodeError as exc:
                raise ValueError("Arquivo de índice inválido ou corrompido.") from exc

        if not isinstance(dados_serializados, dict):
            raise ValueError("Formato de índice inesperado.")

        self.trie = CompressedTrie()
        self.indice_invertido = {}

        for termo, dados in dados_serializados.items():
            if not isinstance(dados, dict):
                continue
            docs = dados.get("docs", {})
            if not isinstance(docs, dict):
                docs = {}

            media = dados.get("media")
            desvio = dados.get("desvio")
            if media is None or desvio is None:
                freqs = list(docs.values())
                if freqs:
                    media = sum(freqs) / len(freqs)
                    variancia = sum((f - media) ** 2 for f in freqs) / len(freqs)
                    desvio = math.sqrt(variancia) or 1.0
                else:
                    media, desvio = 0.0, 1.0

            estrutura = {"docs": docs, "media": media, "desvio": desvio}
            self.indice_invertido[termo] = estrutura
            self.trie.insert(termo)
            self.trie.registrar_indice(termo, estrutura)
