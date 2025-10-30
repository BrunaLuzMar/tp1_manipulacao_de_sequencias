import unittest

from core.indexer import Indexador
from core.retriever import search_docs


class TestTrieIndiceSincronizado(unittest.TestCase):
    def test_trie_retorna_referencia_do_indice(self):
        indexador = Indexador()
        tokens = ["economy", "market", "economy"]

        indexador.indexar_documento("business/001.txt", tokens)

        referencia = indexador.trie.obter_indice("economy")
        self.assertIsNotNone(referencia, "Trie não armazenou a referência do termo.")
        self.assertIn("docs", referencia)
        self.assertIn("business/001.txt", referencia["docs"])
        self.assertEqual(referencia["docs"]["business/001.txt"], 2)

    def test_search_docs_utiliza_trie_para_documentos(self):
        indexador = Indexador()
        indexador.indexar_documento("business/002.txt", ["sports", "sports"])

        resultados = search_docs("sports", indexador.trie)
        self.assertTrue(
            any(doc == "business/002.txt" for doc, _ in resultados),
            "A busca não retornou o documento presente apenas na trie.",
        )


if __name__ == "__main__":
    unittest.main()
