import unittest
import zipfile
from pathlib import Path
from core.indexer import DATA_ZIP, Indexador, tokenizar_texto

BASE_PATH = Path(__file__).resolve().parent.parent


class TestIndexador(unittest.TestCase):
    def test_indexa_todos_os_arquivos_do_zip(self):
        """Testa o indexador em todos os documentos do corpus BBC."""
        indexador = Indexador()
        total_docs = 0

        with zipfile.ZipFile(DATA_ZIP) as zf:
            for caminho in sorted(zf.namelist()):
                # pula diretórios
                if caminho.endswith("/"):
                    continue

                # queremos apenas arquivos dentro de 'bbc/.../*.txt'
                partes = caminho.split("/")
                if len(partes) >= 3 and partes[0] == "bbc" and caminho.endswith(".txt"):
                    categoria = partes[1]
                    nome_arquivo = partes[-1]
                    doc_id = f"{categoria}/{nome_arquivo}"

                    with zf.open(caminho) as fp:
                        conteudo = fp.read().decode("utf-8", errors="ignore")

                    tokens = tokenizar_texto(conteudo)
                    indexador.indexar_documento(doc_id, tokens)
                    total_docs += 1

        # Confirma que pelo menos um documento foi indexado
        self.assertGreater(total_docs, 0, "Nenhum documento foi indexado!")

        # Confirma que há termos e documentos no índice
        self.assertGreater(len(indexador.indice_invertido), 0, "O índice invertido está vazio!")

        # Salva o índice gerado para inspeção
        arquivo_saida = BASE_PATH / "indice_invertido.txt"
        indexador.salvar_indice(arquivo_saida)
        print(f"{total_docs} documentos indexados.")
        print(f"Índice salvo em: {arquivo_saida}")


if __name__ == "__main__":
    unittest.main()
