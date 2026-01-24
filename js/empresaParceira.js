document.addEventListener("DOMContentLoaded", () => {
  const elementosAnimados = document.querySelectorAll(
    ".cartao-motivo-empresa, .cartao-passo-empresa, .cartao-beneficio-empresa"
  );

  if (elementosAnimados.length && "IntersectionObserver" in window) {
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

    elementosAnimados.forEach((el) => obs.observe(el));
  } else {
    elementosAnimados.forEach((el) => el.classList.add("visivel"));
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const id = link.getAttribute("href");
      const alvo = id && id !== "#" ? document.querySelector(id) : null;
      if (!alvo) return;

      evento.preventDefault();
      window.scrollTo({
        top: alvo.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    });
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
