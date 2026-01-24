document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form-contato");
  if (!formulario) return;

  const botoesPerfil = document.querySelectorAll(".botao-perfil");
  const textoPerfilSelecionado = document.getElementById("texto-perfil-selecionado");
  const inputPerfil = document.getElementById("perfil-contato");

  const mensagemErro = document.getElementById("mensagem-erro-formulario");
  const mensagemSucesso = document.getElementById("mensagem-sucesso-formulario");

  const botaoMenu = document.querySelector(".botao-menu");
  const menu = document.querySelector(".menu");

  const setMsg = (el, txt) => el && (el.textContent = txt || "");

  const atualizarPerfil = (perfil) => {
    if (textoPerfilSelecionado) textoPerfilSelecionado.textContent = perfil;
    if (inputPerfil) inputPerfil.value = perfil;
  };

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const initPerfil = () => {
    if (!botoesPerfil.length) return;
    const ativo = document.querySelector(".botao-perfil.botao-perfil-ativo") || botoesPerfil[0];
    const perfil = ativo?.getAttribute("data-perfil") || ativo?.textContent.trim() || "Beneficiário";
    botoesPerfil.forEach((b) => b.classList.toggle("botao-perfil-ativo", b === ativo));
    atualizarPerfil(perfil);
  };

  if (botoesPerfil.length) {
    botoesPerfil.forEach((botao) => {
      botao.addEventListener("click", () => {
        botoesPerfil.forEach((b) => b.classList.remove("botao-perfil-ativo"));
        botao.classList.add("botao-perfil-ativo");
        atualizarPerfil(botao.getAttribute("data-perfil") || botao.textContent.trim());
      });
    });
  }

  initPerfil();

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
      const ativo = menu.classList.toggle("ativo");
      botaoMenu.setAttribute("aria-expanded", ativo ? "true" : "false");
    });

    menu.querySelectorAll(".item-menu").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
      });
    });
  }

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    setMsg(mensagemErro, "");
    setMsg(mensagemSucesso, "");

    const nome = (document.getElementById("nome-contato")?.value || "").trim();
    const email = (document.getElementById("email-contato")?.value || "").trim();
    const telefone = (document.getElementById("telefone-contato")?.value || "").trim();
    const assunto = document.getElementById("assunto-contato")?.value || "";
    const mensagem = (document.getElementById("mensagem-contato")?.value || "").trim();
    const aceite = !!document.getElementById("aceite-contato")?.checked;
    const perfil = inputPerfil?.value || "";

    const erros = [];
    if (!nome) erros.push("Informe seu nome completo.");
    if (!email) erros.push("Informe um e-mail para contato.");
    else if (!validarEmail(email)) erros.push("Informe um e-mail válido.");
    if (!assunto) erros.push("Selecione um assunto.");
    if (!mensagem) erros.push("Escreva uma mensagem para a equipe.");
    if (!perfil) erros.push("Selecione se você é beneficiário, doador, voluntário ou ponto de coleta.");
    if (!aceite) erros.push("Confirme a autorização de contato para continuar.");

    if (erros.length) return setMsg(mensagemErro, erros.join(" "));

    setMsg(
      mensagemSucesso,
      "Mensagem enviada com sucesso! Nossa equipe do Mesa Solidária retornará em breve."
    );

    formulario.reset();
    initPerfil();
  });
});
