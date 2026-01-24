document.addEventListener("DOMContentLoaded", () => {
  const botaoDoar = document.getElementById("botao-doar-agora");
  let redirecionando = false;

  const criarConfete = (x, y) => {
    const cores = ["#FF7A00", "#FFD54F", "#2E8B57", "#00123B", "#FFFFFF"];

    for (let i = 0; i < 100; i++) {
      const confete = document.createElement("span");
      confete.className = "confete";
      confete.style.left = `${x}px`;
      confete.style.top = `${y}px`;
      confete.style.setProperty("--confete-x", `${(Math.random() - 0.5) * 200}px`);
      confete.style.setProperty("--confete-y", `${-(Math.random() * 200 + 80)}px`);
      confete.style.setProperty(
        "--confete-rotacao",
        `${(Math.random() - 0.5) * 360}deg`
      );
      confete.style.backgroundColor = cores[(Math.random() * cores.length) | 0];

      document.body.appendChild(confete);
      setTimeout(() => confete.remove(), 800);
    }
  };

  if (botaoDoar) {
    botaoDoar.addEventListener("click", (e) => {
      e.preventDefault();
      if (redirecionando) return;
      redirecionando = true;

      criarConfete(e.clientX + window.scrollX, e.clientY + window.scrollY);

      setTimeout(() => {
        window.location.href = "doador.html";
      }, 1500);
    });
  }

  const elementosAnimados = document.querySelectorAll(
    [
      ".cartao-ajuda",
      ".cartao-publico",
      ".cartao-passo-funcionamento",
      ".cartao-seguranca",
      ".cartao-ods",
      ".cartao-empresa",
    ].join(", ")
  );

  if (elementosAnimados.length) {
    const observador = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("visivel");
          obs.unobserve(entrada.target);
        });
      },
      { threshold: 0.2 }
    );

    elementosAnimados.forEach((el) => observador.observe(el));
  }

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
});
