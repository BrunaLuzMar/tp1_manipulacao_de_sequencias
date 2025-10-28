# Manipulação de Sequências (Trabalho Prático 1)

Nesse trabalho, serão abordados aspectos práticos dos algoritmos vistos em aula para manipulação de sequências. Especificamente, serão explorados aspectos de implementação de árvores de prefixo para construção de índices invertidos. O objetivo secundário é fixar o conteúdo e mostra sua aplicabilidade em contextos práticos mais realistas. Entende-se que ao implementar a estrutura o aluno conseguirá compreender melhor os conceitos explorados. Dessa forma, o conteúdo teórico será melhor absorvido e fixado. Além disso, os alunos terão a oportunidade de ver conceitos não abordados na disciplina, no caso específico, bibliotecas para construção de aplicações web e conceitos relacionados a recuperação de informação e máquina de busca.

## Como executar

As instruções abaixo ajudam a rodar o protótipo sem risco de inconsistências.

1. **Criar ambiente virtual**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate  # No Windows use: .venv\Scripts\activate
   ```
2. **Instalar dependências mínimas**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```
3. **Definir variáveis de ambiente padrão**
   ```bash
   export FLASK_APP=app.py
   export FLASK_ENV=development  # Opcional: deixa logs mais verbosos
   ```
4. **Executar o servidor**
   ```bash
   flask run
   ```
5. **Encerrar e limpar**
   - Use `Ctrl+C` para parar o servidor com segurança.
   - Desative o ambiente virtual: `deactivate`.
