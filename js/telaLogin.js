document.addEventListener("DOMContentLoaded", () => {
  const formulario =
    document.getElementById("form-cadastro-beneficiario") ||
    document.querySelector(".formulario-cadastro-beneficiario");
  if (!formulario) return;

  const botaoPrincipal =
    document.getElementById("botao-principal-cadastro") ||
    formulario.querySelector(".botao-principal-cadastro");

  const overlay = document.getElementById("overlay-confirmacao");
  const botaoOk = document.getElementById("botao-confirmacao");

  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const cep = document.getElementById("cep");
  const email = document.getElementById("email");
  const dataNascimento = document.getElementById("data-nascimento");
  const senha = document.getElementById("senha-acesso");
  const confirmacao = document.getElementById("confirmacao-senha");

  const erroEmail = document.getElementById("erro-email");
  const erroData = document.getElementById("erro-data-nascimento");
  const erroSenha = document.getElementById("erro-senha");
  const erroConfirmacao = document.getElementById("erro-confirmacao-senha");

  const blocos = [
    document.getElementById("bloco-endereco"),
    document.getElementById("bloco-situacao-familiar"),
    document.getElementById("bloco-saude-alimentacao"),
    document.getElementById("bloco-acesso-plataforma"),
  ].filter(Boolean);

  let etapa = 0;

  const destinoLogin = () => formulario.dataset.redirecionar || "login.html";
  const digitos = (v) => (v || "").replace(/\D/g, "");
  const setOverlay = (on) => overlay && overlay.classList.toggle("ativo", !!on);

  const setErro = (input, span, msg = "") => {
    input && input.classList.toggle("campo-invalido", !!msg);
    span && (span.textContent = msg);
  };

  const mask = (el, max, fmt) => {
    if (!el) return;
    el.addEventListener("input", (e) => {
      const v = digitos(e.target.value).slice(0, max);
      e.target.value = fmt(v);
    });
  };

  mask(cpf, 11, (v) => {
    if (v.length > 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    if (v.length > 6) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    if (v.length > 3) return `${v.slice(0, 3)}.${v.slice(3)}`;
    return v;
  });

  mask(telefone, 11, (v) => {
    if (!v) return "";
    const ddd = v.slice(0, 2);
    if (v.length <= 2) return `(${ddd}`;
    if (v.length <= 10) {
      const p2 = v.slice(2, 6);
      const p3 = v.slice(6, 10);
      return v.length > 6 ? `(${ddd}) ${p2}-${p3}` : `(${ddd}) ${v.slice(2)}`;
    }
    return `(${ddd}) ${v.slice(2, 7)}-${v.slice(7, 11)}`;
  });

  mask(cep, 8, (v) => (v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v));

  const validarEmail = () => {
    if (!email) return true;
    const v = email.value.trim();
    const ok = v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    setErro(email, erroEmail, ok ? "" : v ? "E-mail inválido." : "");
    return !!ok;
  };

  const validarData = () => {
    if (!dataNascimento) return true;
    const v = dataNascimento.value;
    if (!v) return false;

    const d = new Date(`${v}T00:00:00`);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const ok = d <= hoje;
    setErro(dataNascimento, erroData, ok ? "" : "Data de nascimento não pode ser futura.");
    return ok;
  };

  const validarSenha = () => {
    if (!senha) return true;
    const v = senha.value || "";
    const ok = v && /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(v);
    setErro(
      senha,
      erroSenha,
      ok ? "" : v ? "A senha deve ter 8+ caracteres, 1 maiúscula, números e 1 caractere especial." : ""
    );
    return !!ok;
  };

  const validarConfirmacao = () => {
    if (!confirmacao || !senha) return true;
    const ok = confirmacao.value && confirmacao.value === (senha.value || "");
    setErro(confirmacao, erroConfirmacao, ok ? "" : confirmacao.value ? "As senhas não coincidem." : "");
    return !!ok;
  };

  const validarMinimos = () => {
    const cpfOk = !cpf || digitos(cpf.value).length === 11;
    const telOk = !telefone || digitos(telefone.value).length >= 10;
    const cepOk = !cep || digitos(cep.value).length === 8;
    return cpfOk && telOk && cepOk;
  };

  const blocosVisiveis = () =>
    [...formulario.querySelectorAll(".bloco-formulario")].filter(
      (b) => getComputedStyle(b).display !== "none"
    );

  const validarVisiveis = () => {
    for (const b of blocosVisiveis()) {
      for (const c of b.querySelectorAll("input, select, textarea")) {
        if (c.hasAttribute("required") && !c.checkValidity()) {
          c.reportValidity();
          return false;
        }
      }
    }
    if (!validarEmail()) return (email?.focus(), false);
    if (!validarData()) return (dataNascimento?.focus(), false);
    return true;
  };

  const validarFinal = () => {
    if (!formulario.checkValidity()) return (formulario.reportValidity(), false);
    if (!validarEmail() || !validarData() || !validarSenha() || !validarConfirmacao()) return false;
    if (!validarMinimos()) return false;
    return true;
  };

  const esconderEtapas = () => blocos.forEach((b) => (b.style.display = "none"));

  const mostrarEtapa = (i) => {
    const b = blocos[i];
    if (!b) return;
    b.style.display = "block";
    b.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const textoBotao = () => {
    if (!botaoPrincipal) return;
    botaoPrincipal.textContent = etapa < blocos.length ? "Continuar" : "Concluir cadastro";
  };

  esconderEtapas();
  textoBotao();

  email?.addEventListener("blur", validarEmail);
  dataNascimento?.addEventListener("blur", validarData);
  senha?.addEventListener("input", () => (validarSenha(), validarConfirmacao()));
  confirmacao?.addEventListener("input", validarConfirmacao);

  botaoOk?.addEventListener("click", () => {
    setOverlay(false);
    window.location.href = destinoLogin();
  });

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    if (etapa < blocos.length) {
      if (!validarVisiveis()) return;
      mostrarEtapa(etapa);
      etapa += 1;
      textoBotao();
      return;
    }

    if (!validarFinal()) return;

    setOverlay(true);
    setTimeout(() => (window.location.href = destinoLogin()), 2000);
  });

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
});
