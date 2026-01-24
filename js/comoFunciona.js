document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-ativo");

  const elementos = [...document.querySelectorAll("[data-animar-grupo]")].flatMap(
    (grupo) =>
      [...grupo.querySelectorAll(".animar-entrada")].map((el, i) => {
        el.style.transitionDelay = `${(i * 0.08).toFixed(2)}s`;
        return el;
      })
  );

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

  if (!elementos.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target);
        });
      },
      { threshold: 0.22, rootMargin: "0px 0px -10% 0px" }
    );

    elementos.forEach((el) => observer.observe(el));
  } else {
    elementos.forEach((el) => el.classList.add("visivel"));
  }
});
