document.addEventListener("DOMContentLoaded", () => {
  const botaoMenu = document.querySelector(".botao-menu");
  const menu = document.querySelector(".menu");

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

  const pagina = document.querySelector(".pagina-cadastro-beneficiario");
  if (!pagina) return;

  const formulario = pagina.querySelector(".formulario-cadastro-beneficiario");
  if (!formulario) return;

  const $ = (id) => document.getElementById(id);

  const campos = {
    nome: $("nome-completo"),
    cpf: $("cpf"),
    telefone: $("telefone"),
    email: $("email"),
    dataNascimento: $("data-nascimento"),
    cep: $("cep"),
    cidade: $("cidade"),
    estado: $("estado"),
    bairro: $("bairro"),
    logradouro: $("logradouro"),
    numero: $("numero"),
    moradores: $("quantidade-moradores"),
    renda: $("renda-familiar"),
    restricoes: $("restricoes-alimentares"),
    observacoes: $("observacoes"),
    senha: $("senha-acesso"),
    confirmacao: $("confirmacao-senha"),
  };

  const blocos = {
    endereco: $("bloco-endereco"),
    situacao: $("bloco-situacao-familiar"),
    saude: $("bloco-saude-alimentacao"),
    acesso: $("bloco-acesso-plataforma"),
  };

  const erros = {
    email: $("erro-email"),
    senha: $("erro-senha"),
    confirmacao: $("erro-confirmacao-senha"),
    dataNascimento: $("erro-data-nascimento"),
  };

  const botaoPrincipal = document.querySelector(".botao-principal-cadastro");

  let enderecoLiberado = false;
  let situacaoLiberada = false;
  let saudeLiberada = false;

  const esconder = (el) => el && (el.style.display = "none");
  const mostrar = (el) => el && (el.style.display = "block");

  esconder(blocos.endereco);
  esconder(blocos.situacao);
  esconder(blocos.saude);
  esconder(blocos.acesso);

  const setTextoBotao = () => {
    if (!botaoPrincipal) return;
    const acessoVisivel = blocos.acesso && blocos.acesso.style.display !== "none";
    botaoPrincipal.textContent = acessoVisivel ? "Concluir cadastro" : "Continuar";
  };

  const setErro = (el, msg) => el && (el.textContent = msg || "");
  const invalido = (el, on) => el && el.classList.toggle("campo-invalido", !!on);

  const limparErros = () => {
    setErro(erros.email, "");
    setErro(erros.senha, "");
    setErro(erros.confirmacao, "");
    setErro(erros.dataNascimento, "");

    [
      campos.email,
      campos.senha,
      campos.confirmacao,
      campos.dataNascimento,
      campos.nome,
      campos.cpf,
      campos.telefone,
    ].forEach((c) => invalido(c, false));
  };

  let dataMinima = null;
  let dataMaxima = null;

  const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
  };

  if (campos.dataNascimento) {
    const hoje = new Date();
    dataMaxima = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    dataMinima = new Date(hoje.getFullYear() - 100, hoje.getMonth(), hoje.getDate());
    campos.dataNascimento.max = formatarData(dataMaxima);
    campos.dataNascimento.min = formatarData(dataMinima);
  }

  const validarEmail = () => {
    if (!campos.email || !erros.email) return true;

    const valor = campos.email.value.trim().toLowerCase();
    campos.email.value = valor;

    setErro(erros.email, "");
    invalido(campos.email, false);

    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!valor) {
      setErro(erros.email, "Informe um e-mail.");
      invalido(campos.email, true);
      return false;
    }

    if (!regex.test(valor)) {
      setErro(erros.email, "Digite um e-mail válido, ex: seuemail@exemplo.com.");
      invalido(campos.email, true);
      return false;
    }

    return true;
  };

  const validarSenha = () => {
    if (!campos.senha || !erros.senha) return true;

    setErro(erros.senha, "");
    invalido(campos.senha, false);

    const v = campos.senha.value;
    if (!v) {
      setErro(erros.senha, "Crie uma senha.");
      invalido(campos.senha, true);
      return false;
    }

    const faltando = [];
    if (v.length < 8) faltando.push("no mínimo 8 caracteres");
    if (!/[A-Z]/.test(v)) faltando.push("uma letra maiúscula");
    if (!/[a-z]/.test(v)) faltando.push("uma letra minúscula");
    if (!/\d/.test(v)) faltando.push("um número");
    if (!/[^A-Za-z0-9]/.test(v)) faltando.push("um caractere especial");

    if (faltando.length) {
      setErro(erros.senha, `A senha deve conter: ${faltando.join(", ")}.`);
      invalido(campos.senha, true);
      return false;
    }

    return true;
  };

  const validarConfirmacao = () => {
    if (!campos.senha || !campos.confirmacao || !erros.confirmacao) return true;

    setErro(erros.confirmacao, "");
    invalido(campos.confirmacao, false);

    if (!campos.confirmacao.value) {
      setErro(erros.confirmacao, "Confirme a senha.");
      invalido(campos.confirmacao, true);
      return false;
    }

    if (campos.senha.value !== campos.confirmacao.value) {
      setErro(erros.confirmacao, "A confirmação precisa ser igual à senha.");
      invalido(campos.confirmacao, true);
      return false;
    }

    return true;
  };

  const validarDataNascimento = () => {
    if (!campos.dataNascimento || !erros.dataNascimento) return true;

    setErro(erros.dataNascimento, "");
    invalido(campos.dataNascimento, false);

    const valor = campos.dataNascimento.value;
    if (!valor) {
      setErro(erros.dataNascimento, "Informe a data de nascimento.");
      invalido(campos.dataNascimento, true);
      return false;
    }

    const data = new Date(valor);

    if (dataMinima && data < dataMinima) {
      setErro(erros.dataNascimento, "Idade máxima para cadastro é de 100 anos.");
      invalido(campos.dataNascimento, true);
      return false;
    }

    if (dataMaxima && data > dataMaxima) {
      setErro(erros.dataNascimento, "Você precisa ter pelo menos 18 anos para se cadastrar.");
      invalido(campos.dataNascimento, true);
      return false;
    }

    return true;
  };

  const validarDadosPessoais = () => {
    const { nome, cpf, telefone, dataNascimento, email } = campos;
    if (!nome || !cpf || !telefone || !dataNascimento || !email) return false;

    let ok = true;

    const nomeV = nome.value.trim();
    const telNum = telefone.value.replace(/\D/g, "");
    const cpfNum = cpf.value.replace(/\D/g, "");

    [nome, cpf, telefone].forEach((c) => invalido(c, false));

    if (!nomeV) (invalido(nome, true), (ok = false));
    if (cpfNum.length !== 11) (invalido(cpf, true), (ok = false));
    if (telNum.length !== 11) (invalido(telefone, true), (ok = false));
    if (!validarEmail()) ok = false;
    if (!validarDataNascimento()) ok = false;

    return ok;
  };

  const validarEndereco = () => {
    const { cep, cidade, estado, bairro, logradouro, numero } = campos;
    if (!cep || !cidade || !estado || !bairro || !logradouro || !numero) return false;

    const cepNum = cep.value.replace(/\D/g, "");
    if (cepNum.length !== 8) return false;

    return (
      !!cidade.value.trim() &&
      !!estado.value.trim() &&
      !!bairro.value.trim() &&
      !!logradouro.value.trim() &&
      !!numero.value.trim()
    );
  };

  const validarSituacao = () => {
    const { moradores, renda } = campos;
    if (!moradores || !renda) return false;

    const m = parseInt(moradores.value, 10);
    if (Number.isNaN(m) || m < 1) return false;
    return !!renda.value;
  };

  const tentarLiberarEndereco = () => {
    if (enderecoLiberado || !blocos.endereco) return;
    if (validarDadosPessoais()) {
      mostrar(blocos.endereco);
      enderecoLiberado = true;
      setTextoBotao();
    }
  };

  const tentarLiberarSituacao = () => {
    if (!enderecoLiberado || situacaoLiberada || !blocos.situacao) return;
    if (validarEndereco()) {
      mostrar(blocos.situacao);
      situacaoLiberada = true;
      setTextoBotao();
    }
  };

  const tentarLiberarSaude = () => {
    if (!situacaoLiberada || saudeLiberada || !blocos.saude) return;
    if (validarSituacao()) {
      mostrar(blocos.saude);
      saudeLiberada = true;
      setTextoBotao();
    }
  };

  const tentarLiberarAcesso = () => {
    if (!saudeLiberada || !blocos.acesso) return;
    mostrar(blocos.acesso);
    setTextoBotao();
  };

  const mask = (el, max, fmt) => {
    if (!el) return;
    el.addEventListener("input", () => {
      invalido(el, false);
      let v = el.value.replace(/\D/g, "").slice(0, max);
      el.value = fmt(v);
    });
  };

  mask(campos.cep, 8, (v) => (v.length > 5 ? `${v.slice(0, 5)}-${v.slice(5)}` : v));

  mask(campos.cpf, 11, (v) => {
    if (v.length > 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    if (v.length > 6) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    if (v.length > 3) return `${v.slice(0, 3)}.${v.slice(3)}`;
    return v;
  });

  mask(campos.telefone, 11, (v) => {
    if (!v) return "";
    if (v.length <= 2) return `(${v}`;
    if (v.length <= 7) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
    return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  });

  if (campos.nome) campos.nome.addEventListener("input", () => invalido(campos.nome, false));

  if (campos.email) {
    campos.email.addEventListener("input", () => {
      campos.email.value = campos.email.value.toLowerCase();
      setErro(erros.email, "");
      invalido(campos.email, false);
    });
  }

  if (campos.senha) {
    campos.senha.addEventListener("input", () => {
      setErro(erros.senha, "");
      invalido(campos.senha, false);
      validarSenha();
    });
  }

  if (campos.confirmacao) {
    campos.confirmacao.addEventListener("input", () => {
      setErro(erros.confirmacao, "");
      invalido(campos.confirmacao, false);
      validarConfirmacao();
    });
  }

  if (campos.dataNascimento) {
    campos.dataNascimento.addEventListener("change", () => {
      setErro(erros.dataNascimento, "");
      invalido(campos.dataNascimento, false);
      validarDataNascimento();
    });
  }

  [campos.nome, campos.cpf, campos.telefone, campos.email, campos.dataNascimento].forEach(
    (c) => c && c.addEventListener("blur", tentarLiberarEndereco)
  );

  [campos.cep, campos.cidade, campos.estado, campos.bairro, campos.logradouro, campos.numero].forEach(
    (c) => c && c.addEventListener("blur", tentarLiberarSituacao)
  );

  [campos.moradores, campos.renda].forEach((c) => c && c.addEventListener("blur", tentarLiberarSaude));
  [campos.restricoes, campos.observacoes].forEach((c) => c && c.addEventListener("blur", tentarLiberarAcesso));

  setTextoBotao();

  formulario.addEventListener("submit", (event) => {
    limparErros();

    let valido = true;
    if (!validarDadosPessoais()) valido = false;
    if (!validarEmail()) valido = false;
    if (!validarSenha()) valido = false;
    if (!validarConfirmacao()) valido = false;
    if (!validarDataNascimento()) valido = false;

    if (!valido) event.preventDefault();
  });
});
