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

  const botaoEntrar = document.getElementById("botao-entrar-login");
  const entradaIdentificador = document.getElementById("entrada-identificador");
  const entradaSenha = document.getElementById("entrada-senha");
  const mensagemLogin = document.getElementById("mensagem-login");

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

  const credEmail = "teste@teste";
  const credSenha = "1234";
  let alertaMostrado = false;

  colunaFormulario.classList.add("oculto");

  let tipoAtivo = "";

  const limparSelecao = () => cards.forEach((c) => c.classList.remove("selecionado"));

  const setMsg = (txt) => {
    if (!mensagemLogin) return;
    if (!txt) {
      mensagemLogin.textContent = "";
      mensagemLogin.classList.remove("ativa");
      return;
    }
    mensagemLogin.textContent = txt;
    mensagemLogin.classList.add("ativa");
  };

  const aplicarTipo = (tipo) => {
    if (inputTipo) inputTipo.value = tipo || "";
    if (linkCadastro) linkCadastro.href = rotasCadastro[tipo] || "cadastro_beneficiario.html";
  };

  const redirecionarPerfil = () => {
    const destino = rotasPerfil[tipoAtivo] || "perfil_beneficiario.html";
    window.location.href = destino;
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const tipo = card.dataset.tipo || "";

      if (!colunaFormulario.classList.contains("oculto") && tipoAtivo === tipo) {
        colunaFormulario.classList.add("oculto");
        limparSelecao();
        tipoAtivo = "";
        aplicarTipo("");
        setMsg("");
        return;
      }

      colunaFormulario.classList.remove("oculto");
      limparSelecao();
      card.classList.add("selecionado");
      tipoAtivo = tipo;
      aplicarTipo(tipo);
      setMsg("");

      colunaFormulario.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  if (botaoEntrar) {
    botaoEntrar.addEventListener("click", () => {
      setMsg("");

      if (!tipoAtivo) {
        setMsg("Escolha um perfil acima para continuar.");
        return;
      }

      const email = (entradaIdentificador?.value || "").trim();
      const senha = (entradaSenha?.value || "").trim();

      if (!email || !senha) {
        setMsg("Preencha o E-mail/CPF e a senha para entrar.");
        return;
      }

      if (email === credEmail && senha === credSenha) {
        redirecionarPerfil();
        return;
      }

      setMsg(`Acesso de teste: usuário ${credEmail} e senha ${credSenha}.`);

      if (!alertaMostrado) {
        alert("⚠️ Aviso: esse login é APENAS de teste. Isso só vai aparecer na versão de teste. Use teste@teste senha:1234");
        alertaMostrado = true;
      }
    });
  }
});
