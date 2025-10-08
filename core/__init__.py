"""Pacote central que irá orquestrar os componentes de indexação e recuperação do trabalho prático.
Mantém as importações simbólicas que facilitam o acesso às estruturas principais sem expor detalhes internos."""

# Importações simbólicas ilustrativas para facilitar o reuso em outras partes do projeto.
from .trie import TrieNode  # noqa: F401
# O noqa evita avisos da ferramenta de lint, já que este arquivo só exemplifica a estrutura.
