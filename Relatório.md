# Relatório — Trabalho Prático 1
## 1. Introdução
O trabalho propõe a construção de uma máquina de busca compacta sobre o corpus BBC News. O trabalho entregue integra uma API em Flask, responsável pela indexação e consulta dos documentos, a uma interface web apelidada de Bubble, produzindo uma experiência única de autocomplete, paginação e destaque de termos. O objetivo principal é aplicar os conhecimentos acerca de árvores de prefixo para construção de índices invertidos, além de fixar o conteúdo ensinado em sala de aula e mostrar sau aplicabilidade em contextos práticos mais realistas. O trabalho também se propõe a instigar o aluno a entrar em contato com linguagens e ferramentas que não são usualmente cobradas ou discutidas no percurso curricular vigente.

O sistema foi dividido em três módulos principais: o módulo de estrutura de dados, responsável pela implementação da Trie compacta; o módulo de indexação, encarregado da leitura e processamento dos documentos e da construção do índice invertido; e o módulo de recuperação, responsável por interpretar consultas booleanas e calcular a relevância dos documentos retornados. Por fim, a aplicação web construída em Flask e HTML fornece uma interface de busca simples, que simula o comportamento de uma máquina de busca tradicional. A união desses componentes permitiu a construção de um sistema capaz de indexar diversos textos e responder consultas compostas por operadores lógicos com resultados relevantes e contextualizados.

Com a evolução do projeto, passou-se a persistir o índice invertido logo após a primeira leitura integral do corpus, gerando o arquivo `indice_invertido.txt` em formato JSON. Nas inicializações seguintes, o backend carrega esse arquivo e reconstrói a trie compacta em memória sem precisar reler o ZIP, o que reduz o tempo de start do Flask e mantém as sugestões ativas imediatamente após o servidor entrar no ar.

## 2. Metodologia
A metodologia adotada para o desenvolvimento do trabalho seguiu uma abordagem modular, em que cada componente foi construído, testado e validado de forma independente antes da integração final. Inicialmente, foi projetada a estrutura de dados Trie, na forma de uma árvore de prefixos compactada. Sendo essa a estrutura requisitada pelo enunciado do trabalho, cujas capacidades envolvem: eficiência na representação e recuperação de cadeias de caracteres, permitindo economizar memória ao compartilhar prefixos comuns entre palavras. A Trie compacta é composta por nós que armazenam prefixos e mantêm referências para seus filhos, possibilitando buscas, inserções e sugestões de autocompletar de forma rápida.

A etapa seguinte consistiu na construção do módulo de indexação, responsável por percorrer o corpus de documentos, tokenizar o conteúdo de cada arquivo e inserir os termos obtidos tanto na Trie quanto em um índice invertido mantido em memória. Esse índice associa cada termo aos documentos nos quais ele aparece, armazenando também a frequência relativa do termo em cada documento. Ao término da indexação, foram calculadas estatísticas descritivas de cada termo, como a média e o desvio padrão das frequências, valores posteriormente utilizados para o cálculo dos z-scores durante a fase de busca.

Para evitar a reindexação completa a cada execução, o processo de indexação passou a encerrar-se com a serialização do dicionário invertido e das estatísticas em `indice_invertido.txt`. Assim que o Flask é iniciado, o módulo de indexação tenta carregar esse arquivo: se ele existir e estiver íntegro, a trie é reconstruída diretamente; caso contrário, o corpus é lido novamente, a estrutura é recalculada e o JSON é regenerado.

Em seguida, foi desenvolvido o módulo de recuperação de informação, que recebe uma consulta textual e interpreta sua estrutura lógica. As consultas podem conter operadores booleanos AND, OR e parênteses, além de suportar a ausência explícita de operadores, caso em que o sistema interpreta implicitamente como conjunções AND. Após a análise sintática da consulta, o módulo recupera os documentos correspondentes a cada termo e combina os resultados conforme a expressão lógica definida. Finalmente, para determinar a relevância dos resultados, o sistema calcula a média dos z-scores dos termos da consulta, permitindo ordenar os documentos de modo que os mais significativos apareçam primeiro.

Nessa fase o índice em disco torna-se indispensável, pois cada nó terminal da trie mantém uma referência ao dicionário de documentos restaurado do JSON. O motor booleano opera exclusivamente sobre essas referências, sem consultar o arquivo de forma direta, o que garante consistência entre a persistência e a estrutura em memória.

Por fim, o sistema foi integrado a uma interface web simples, composta pelo arquivo index.html, que carrega um ambiente Angular responsável pela renderização dinâmica dos resultados de busca. O backend Flask conecta os módulos de indexação e recuperação ao front-end, possibilitando a interação do usuário com o mecanismo de busca por meio de uma interface gráfica responsiva.

## 3. Decisões de Projeto
Durante o desenvolvimento, diversas decisões de projeto foram tomadas visando a clareza estrutural e a eficiência de execução. Sendo a primeira delas a leitura direta do corpus via ZipFile, com a intensão de reduzir o consumo de disco. Também foi implementado um dicionário em python para representação do índice invertido, em que cada chave é um termo e o valor é um outro dicionário contendo os documentos associados e suas frequências. Essa estrutura permitiu realizar operações de interseção e união entre conjuntos de documentos de forma rápida, o que é essencial para a avaliação de consultas booleanas. Optou-se ainda por incluir no índice os parâmetros estatísticos de média e desvio padrão para cada termo, viabilizando o cálculo de relevância por meio de normalização z-score. Essa técnica assegura que termos muito frequentes não dominem o ranking de resultados, equilibrando a importância relativa entre documentos longos e curtos.

Outra escolha importante foi transformar o arquivo `indice_invertido.txt` em contrato oficial de persistência. A API Flask tenta carregá-lo já na inicialização, e os testes automatizados passaram a garantir que salvar e restaurar o JSON produz uma trie funcionalmente equivalente à construída diretamente do corpus. Isso simplificou o fluxo de desenvolvimento e tornou o comportamento do sistema previsível mesmo após desligamentos abruptos.

No processamento das consultas, foi escolhida uma abordagem baseada em pilhas para a avaliação das expressões booleanas. Essa escolha simplifica a implementação e garante a correta precedência entre os operadores AND e OR, além de permitir o uso de parênteses aninhados. Para o cálculo da relevância, empregou-se uma média logarítmica dos z-scores, suavizando diferenças extremas entre documentos e evitando a concentração de pontuações elevadas em textos que contenham repetições intensas de um mesmo termo.

Em relação à interface, priorizou-se a compatibilidade e o carregamento eficiente. O arquivo index.html inclui apenas um CSS global mínimo e carrega o bundle principal de JavaScript, onde estão contidos os estilos e scripts específicos do componente. Essa decisão evita sobrecarga de recursos estáticos e torna a aplicação mais leve, ao custo de exigir que o bundle seja carregado corretamente para que o design completo seja exibido. Além de que o frontend foi concebido como um build Angular desacoplado que consome rotas JSON, exibe o campo de busca com estética neomórfica, executa animações com Three.js e administra a paginação. Para permitir evoluções futuras com clientes hospedados em domínios distintos, o servidor ativa CORS por meio de flask-cors.

## 4. Implementação
O arquivo `app.py` inicializa o Flask, habilita CORS, expõe as rotas do frontend e dos serviços de API e dispara a indexação quando o módulo é carregado, limitada por padrão a duzentos documentos ajustáveis pelo parâmetro limite. A classe Indexador, localizada em `core/indexer.py`, registra frequências, calcula estatísticas e coordena a comunicação com a Trie, oferecendo utilitários para impressão e persistência do índice. O módulo `core/retriever.py` opera o parser booleano, avalia a expressão por pilha e produz scores finais. A Trie compacta é implementada em `core/trie.py`, com métodos de inserção, busca e geração de sugestões que consideram prefixos interrompidos. O frontend é servido por `templates/index.html`, responsável por carregar os bundles `main-3KS6SDDN.js` e `styles-3MDLF4BX.css`; o JavaScript resultante mistura animações de `Three.js` com a lógica do componente de busca. A suíte mínima de testes encontra-se em `tests/test_indexador.py`, que percorre todo o corpus, verifica a criação de entradas no índice e salva um relatório em `indice_invertido.txt`. As dependências essenciais — Flask, Werkzeug e `flask-cors` — estão declaradas em `requirements.txt` e foram validadas no ambiente Python 3.12 descrito em `.venv/pyvenv.cfg`.

## 5. Exemplos de Uso
Para verificar o funcionamento do sistema, foram realizados diversos testes com o corpus da BBC. Inicialmente, após a indexação, a Trie compacta foi inspecionada por meio de inserções de teste, confirmando que prefixos comuns eram devidamente agrupados. Por exemplo, a inserção das palavras “batata” e “batalha” resultou em um nó compartilhado com prefixo “bata”, demonstrando a eficácia da compactação. Consultas de autocompletar, como “ba”, retornaram corretamente sugestões de termos como “batata” e “batalha”, validando o funcionamento do método sugestoes.

I.`(sport AND technology)`
![](assets/ex1.png)
---
II. `(sport OR technology)`
![](assets/ex2.png)
---
III. `(economy AND government) OR sports`

---
IV. `finance market`
![](assets/ex4.png)
---
V. `(economy AND (market OR inflation)) OR (economy AND government)`
![Parte 1](assets/ex5.1.png)
![Parte 2](assets/ex5.2.png)


Os resultados foram ordenados por relevância, exibindo em primeiro lugar os textos com maior densidade relativa dos termos pesquisados. No navegador, a interface de busca permitiu digitar consultas e visualizar os resultados paginados, com dez documentos por página. Cada resultado apresentava um trecho de 160 caracteres do texto original, contendo o termo de busca destacado. Essa funcionalidade foi implementada de forma a reproduzir a experiência típica de um mecanismo de busca, permitindo ao usuário avaliar rapidamente o contexto da ocorrência.

## 6. Conclusões
O desenvolvimento do Trabalho Prático 1 permitiu compreender de forma prática como estruturas de dados clássicas podem ser aplicadas em sistemas reais de recuperação de informação. A implementação da Trie compacta demonstrou a importância de otimizar a representação de strings em memória, reduzindo redundâncias e melhorando o tempo de busca. O índice invertido mostrou-se eficiente para relacionar termos e documentos, e o cálculo de relevância com base em z-scores forneceu uma métrica estatística consistente para a ordenação dos resultados.

Em suma, o trabalho alcançou seu objetivo principal de aplicar conceitos teóricos de algoritmos e estruturas de dados à construção de uma aplicação completa, consolidando o aprendizado sobre manipulação de sequências, árvores de prefixo e recuperação de informação, ao mesmo tempo em que proporcionou uma experiência prática de integração entre backend e front-end em um ambiente de desenvolvimento web moderno.

## Referências
Radix tree. Disponível em: <https://en.wikipedia.org/wiki/Radix_tree>.

JAMIEGO. Data Structures in Golang - The trie data structure. Disponível em: <https://www.youtube.com/watch?v=H-6-8_p88r0>. Acesso em: 19 out. 2025.
‌
INSIDE CODE. Trie data structure - Inside code. Disponível em: <https://www.youtube.com/watch?v=qA8l8TAMyig>. Acesso em: 19 out. 2025.

Compressed Tries. Disponível em: <https://www.tutorialspoint.com/data_structures_algorithms/compressed_tries.htm>. Acesso em: 19 out. 2025.

‌COMPUTERBREAD. Compressed trie. Disponível em: <https://www.youtube.com/watch?v=qakGXuOW1S8>. Acesso em: 19 out. 2025.
