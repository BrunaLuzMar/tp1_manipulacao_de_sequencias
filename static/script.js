// Este script reunirá as interações do frontend, como limpeza do formulário, destaques dinâmicos e paginação suave sem recarregar a página inteira.

document.addEventListener("DOMContentLoaded", () => {
  // Exemplo ilustrativo: limpar o campo de busca quando o usuário desejar recomeçar a consulta.
  const botaoLimpar = document.querySelector("#btn-limpar");
  const campoConsulta = document.querySelector("#consulta");

  if (botaoLimpar && campoConsulta) {
    botaoLimpar.addEventListener("click", () => {
      campoConsulta.value = "";
      campoConsulta.focus();
    });
  }
});

//criar o conteiner de sugestoes

