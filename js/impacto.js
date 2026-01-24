document.addEventListener("DOMContentLoaded", () => {
  const numeros = document.querySelectorAll(
    ".numero-indicador-impacto, .numero-kpi-hero, .porcentagem-central"
  );

  const barras = document.querySelectorAll(".barra-mes");
  const blocoBarras = document.querySelector(".bloco-grafico-barras");

  const animados = document.querySelectorAll(".impacto-animado");
  const secaoIndicadores = document.querySelector(".secao-indicadores-impacto");
  const secaoGraficos = document.querySelector(".secao-graficos-impacto");

  let numerosRodou = false;
  let barrasRodou = false;

  const maxValor = [...barras].reduce(
    (m, b) => Math.max(m, Number(b.dataset.valor || 0)),
    0
  );

  const animarNumeros = () => {
    if (numerosRodou) return;
    numerosRodou = true;

    numeros.forEach((el) => {
      const raw = (el.dataset.contador ?? el.textContent ?? "").trim();
      const alvo = Number(raw.replace(/[^\d]/g, "")) || 0;
      if (!alvo) return;

      const sufixo = raw.includes("%") || el.classList.contains("porcentagem-central") ? "%" : "";
      const duracao = 1200;
      const intervalo = 30;
      const passos = Math.max((duracao / intervalo) | 0, 1);
      const inc = alvo / passos;

      let atual = 0;

      const render = () => (el.textContent = `${Math.round(atual).toLocaleString("pt-BR")}${sufixo}`);
      render();

      const t = setInterval(() => {
        atual += inc;
        if (atual >= alvo) {
          atual = alvo;
          clearInterval(t);
        }
        render();
      }, intervalo);
    });
  };

  const animarBarras = () => {
    if (barrasRodou || !maxValor) return;
    barrasRodou = true;

    barras.forEach((b) => {
      const v = Number(b.dataset.valor || 0);
      b.style.height = `${Math.min((v / maxValor) * 100, 100)}%`;
    });
  };

  const ativarTudo = () => {
    animados.forEach((el) => el.classList.add("visivel"));
    animarNumeros();
    animarBarras();
  };

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entradas, o) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;

          const el = e.target;

          if (el.classList.contains("impacto-animado")) el.classList.add("visivel");
          if (el === secaoIndicadores || el === secaoGraficos) {
            animarNumeros();
            animarBarras();
          }
          if (el === blocoBarras) animarBarras();

          o.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );

    animados.forEach((el) => obs.observe(el));
    if (secaoIndicadores) obs.observe(secaoIndicadores);
    if (secaoGraficos) obs.observe(secaoGraficos);
    if (blocoBarras && !blocoBarras.classList.contains("impacto-animado")) obs.observe(blocoBarras);
  } else {
    ativarTudo();
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
