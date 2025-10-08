"""Este arquivo atuará como porta de entrada do servidor Flask, conectando as camadas de backend e frontend do protótipo de máquina de busca. Aqui ficarão as configurações iniciais do app, o registro das rotas principais e eventuais ganchos para acionar os serviços de indexação e recuperação de documentos."""

from flask import Flask, render_template

# Instância principal do Flask; em produção, parâmetros extras poderiam ser configurados aqui.
app = Flask(__name__)


@app.route("/")
def homepage():
    """Rota ilustrativa que, futuramente, acionará o fluxo real de busca."""
    return render_template("index.html", mensagem_boas_vindas="Protótipo fofo de busca 🌸")


if __name__ == "__main__":
    # Execução local apenas para demonstração; configurações reais virão depois.
    app.run(debug=True)
