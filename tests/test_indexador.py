import unittest
import zipfile
from pathlib import Path

from core.indexer import DATA_ZIP, Indexador, tokenizar_texto

BASE_PATH = Path(__file__).resolve().parent.parent

class TestIndexador(unittest.TestCase):
    def test_indexa_um_business_e_um_entertainment(self):
        indexador = Indexador()
        doc_paths = {
            "business/001.txt": "bbc/business/001.txt",
            "entertainment/001.txt": "bbc/entertainment/001.txt",
        }

        with zipfile.ZipFile(DATA_ZIP) as zf:
            for doc_id, zip_path in doc_paths.items():
                with zf.open(zip_path) as fp:
                    conteudo = fp.read().decode("utf-8", errors="ignore")
                tokens = tokenizar_texto(conteudo)
                indexador.indexar_documento(doc_id, tokens)

        for doc_id in doc_paths:
            self.assertTrue(
                any(doc_id in docs for docs in indexador.indice_invertido.values()),
                f"{doc_id} não foi encontrado no índice invertido",
            )

        arquivo_saida = BASE_PATH / "indice_invertido.txt"
        indexador.salvar_indice(arquivo_saida)
        print(f"Resultados salvos em: {arquivo_saida}")


if __name__ == "__main__":
    unittest.main()
