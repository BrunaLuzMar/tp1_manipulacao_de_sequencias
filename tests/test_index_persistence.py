import tempfile
import unittest
from pathlib import Path

from core.indexer import Indexador
from core.retriever import search_docs


class TestIndexPersistence(unittest.TestCase):
    def test_salvar_e_carregar_indice(self):
        indexador = Indexador()
        indexador.indexar_documento("business/123.txt", ["economy", "economy"])
        with tempfile.TemporaryDirectory() as tmpdir:
            caminho = Path(tmpdir) / "indice_invertido.txt"
            indexador.salvar_indice(caminho)

            novo_indexador = Indexador()
            novo_indexador.carregar_indice(caminho)

            referencia = novo_indexador.trie.obter_indice("economy")
            self.assertIsNotNone(referencia)
            self.assertIn("business/123.txt", referencia["docs"])
            self.assertEqual(referencia["docs"]["business/123.txt"], 2)

            resultados = search_docs("economy", novo_indexador.trie)
            self.assertTrue(any(doc == "business/123.txt" for doc, _ in resultados))


if __name__ == "__main__":
    unittest.main()
