document.addEventListener("DOMContentLoaded", () => {
  const elementosAnimados = document.querySelectorAll(".faq-animado");

  if (elementosAnimados.length && "IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entradas, o) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visivel");
          o.unobserve(e.target);
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    elementosAnimados.forEach((el) => obs.observe(el));
  } else {
    elementosAnimados.forEach((el) => el.classList.add("visivel"));
  }

  const itens = [...document.querySelectorAll(".item-pergunta-faq")];

  itens.forEach((item) => {
    const cabecalho = item.querySelector(".cabecalho-pergunta-faq");
    const corpo = item.querySelector(".corpo-pergunta-faq");
    if (!cabecalho || !corpo) return;

    corpo.style.maxHeight = "0px";

    cabecalho.addEventListener("click", () => {
      const aberta = item.classList.contains("aberta");

      itens.forEach((outro) => {
        const c = outro.querySelector(".corpo-pergunta-faq");
        if (!c) return;
        outro.classList.remove("aberta");
        c.style.maxHeight = "0px";
      });

      if (!aberta) {
        item.classList.add("aberta");
        corpo.style.maxHeight = `${corpo.scrollHeight}px`;
      }
    });
  });

  const botoes = [...document.querySelectorAll(".botao-filtro-faq")];

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const filtro = botao.dataset.filtro || "todos";

      botoes.forEach((b) => b.classList.toggle("ativo", b === botao));

      itens.forEach((item) => {
        const categoria = item.dataset.categoria || "geral";
        const mostrar = filtro === "todos" || categoria === filtro || categoria === "geral";
        item.style.display = mostrar ? "block" : "none";
      });
    });
  });

  document
    .querySelector('.botao-filtro-faq[data-filtro="todos"]')
    ?.click();

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
