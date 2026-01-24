document.addEventListener("DOMContentLoaded", () => {
  const elementos = document.querySelectorAll(
    ".conteiner-banner-sobre, .cartao-mvv, .etapa-linha-tempo, .cartao-pilar-sobre, .card-membro-sobre, .conteiner-ods-sobre"
  );

  if (!elementos.length) return;

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entradas, o) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("visivel");
          o.unobserve(e.target);
        });
      },
      { threshold: 0.2 }
    );

    elementos.forEach((el) => obs.observe(el));
  } else {
    elementos.forEach((el) => el.classList.add("visivel"));
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
