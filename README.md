# Protótipo de Máquina de Busca (Trabalho Prático 1 - DCC207)

Este repositório apresenta a estrutura inicial de um protótipo de máquina de busca baseado em Flask, pensado para indexar documentos com uma Trie compacta e oferecer consultas booleanas com interface web fofa e acolhedora. O objetivo é servir como guia para implementação futura, destacando onde cada componente será desenvolvido.

```python
# Exemplo ilustrativo de como a aplicação poderá ser iniciada durante o desenvolvimento.
from app import app

if __name__ == "__main__":
    app.run()
```

> Estruture seu ambiente virtual, instale as dependências e complete cada módulo seguindo as diretrizes do trabalho prático.

## Como executar com segurança

As instruções abaixo ajudam a rodar o protótipo sem risco de inconsistências, mantendo o ambiente isolado e previsível (mesmo que o código ainda seja apenas ilustrativo).

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

> Enquanto as funcionalidades reais não forem implementadas, o servidor apenas renderizará as páginas de exemplo. Estas etapas garantem que futuras adições rodem em um ambiente controlado e fácil de depurar.
