document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector(".botao-menu");
  const menu = document.querySelector(".menu");

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
      const ativo = menu.classList.toggle("ativo");
      botaoMenu.setAttribute("aria-expanded", ativo ? "true" : "false");
    });

    menu.querySelectorAll(".item-menu").forEach((item) => {
      item.addEventListener("click", () => {
        menu.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
      });
    });
  }

  const cards = document.querySelectorAll(".cartao-perfil");
  const colunaFormulario = document.querySelector(".coluna-formulario");
  const inputTipo = document.getElementById("tipo-usuario");
  const linkCadastro = document.getElementById("link-cadastro");
  const botaoEntrarLogin = document.getElementById("botao-entrar-login");

  if (!cards.length || !colunaFormulario) return;

  const rotasCadastro = {
    beneficiario: "cadastro_beneficiario.html",
    voluntario: "cadastro_voluntario.html",
    doador: "cadastro_doador.html",
    ponto_de_coleta: "cadastro_ponto_de_coleta.html",
  };

  const rotasPerfil = {
    beneficiario: "perfil_beneficiario.html",
    voluntario: "perfil_voluntario.html",
    doador: "perfil_doador.html",
    ponto_de_coleta: "perfil_ponto_de_coleta.html",
  };

  colunaFormulario.classList.add("oculto");

  let tipoAtivo = "";

  const limparSelecao = () => {
    cards.forEach((c) => c.classList.remove("selecionado"));
  };

  const aplicarTipo = (tipo) => {
    if (inputTipo) inputTipo.value = tipo || "";
    if (linkCadastro) linkCadastro.href = rotasCadastro[tipo] || "cadastro_beneficiario.html";
    if (botaoEntrarLogin) botaoEntrarLogin.href = rotasPerfil[tipo] || "perfil_beneficiario.html";
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const tipo = card.dataset.tipo || "";

      if (!colunaFormulario.classList.contains("oculto") && tipoAtivo === tipo) {
        colunaFormulario.classList.add("oculto");
        limparSelecao();
        tipoAtivo = "";
        aplicarTipo("");
        return;
      }

      colunaFormulario.classList.remove("oculto");
      limparSelecao();
      card.classList.add("selecionado");
      tipoAtivo = tipo;
      aplicarTipo(tipo);

      colunaFormulario.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});
