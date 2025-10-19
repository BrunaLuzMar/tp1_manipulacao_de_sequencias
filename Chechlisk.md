# Objetivo Geral
## Implementar, em Python (3.9+), um sistema de busca de textos que:
1. Indexa documentos (cria um índice invertido usando uma Trie compacta);
2. Processa consultas com conectores lógicos AND, OR e parênteses;
3. Retorna resultados ordenados por relevância, com snippets e paginação;
4. Oferece uma interface web feita com Flask.

# Módulo a serem implementados
## 1. Módulo da Trie compacta
* É a estrutura de dados principal do trabalho.
* Deve armazenar palavras e associá-las aos documentos em que aparecem.
** Optei por não associar os nós da árvore aos documenos, quero tentar fazer isso apenas pela lógica do indexador
* Você não pode usar implementações prontas — precisa criar a sua.
* Ela será usada pelo índice invertido para mapear termo → lista de documentos.

## 2. Módulo de Indexação
* Lê os textos do corpus da BBC News (link do dataset).
* Cria o índice invertido e o mantém em memória.
* Se o índice já existir salvo em disco, carregue-o; se não, crie um novo.
* Ao finalizar, salve o índice (você escolhe o formato — texto ou binário, mas deve documentar sua escolha).

⚠️ Não pode usar pickle ou serializações automáticas de objetos.

## 3. Módulo de Recuperação de Informação (RI)
Processa consultas do tipo:
´´´
    (casa AND piscina) OR praia.
´´´

Usa operadores lógicos AND e OR (em letras maiúsculas).
Deve:
* Interpretar e avaliar a expressão lógica;
* Recuperar os documentos correspondentes;
* Calcular a relevância de cada documento pela média dos z-scores das frequências dos termos.

A saída:
* Lista ordenada por relevância;
* Cada item exibe:
** Um trecho de 160 caracteres (80 antes e 80 depois) do termo mais relevante;
**O termo destacado;

Paginação com 10 resultados por página.