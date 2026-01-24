document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-ativo");

  const elementos = [...document.querySelectorAll(".familia-animado")];

  const revelar = (el) => el.classList.add("familia-visivel");

  if (elementos.length) {
    elementos.forEach((el, i) => {
      const atraso = Number(el.getAttribute("data-atraso"));
      el.style.transitionDelay = Number.isFinite(atraso)
        ? `${atraso}s`
        : `${(i * 0.08).toFixed(2)}s`;
    });

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entradas, o) => {
          entradas.forEach((e) => {
            if (!e.isIntersecting) return;
            revelar(e.target);
            o.unobserve(e.target);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
      );

      elementos.forEach((el) => obs.observe(el));
    } else {
      elementos.forEach(revelar);
    }
  }

  const rolarAte = (alvo) => {
    if (!alvo) return;
    window.scrollTo({
      top: alvo.getBoundingClientRect().top + window.scrollY - 80,
      behavior: "smooth",
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;

      const alvo = document.querySelector(id);
      if (!alvo) return;

      e.preventDefault();
      rolarAte(alvo);
    });
  });

  const botaoIniciar = document.querySelector(".botao-iniciar-cadastro-familia");
  const secaoCadastro = document.getElementById("cadastro-familia");

  if (botaoIniciar && secaoCadastro) {
    botaoIniciar.addEventListener("click", (e) => {
      e.preventDefault();
      rolarAte(secaoCadastro);
    });
  }

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
