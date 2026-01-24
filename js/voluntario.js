const qs = (s, c = document) => c.querySelector(s);
const qsa = (s, c = document) => [...c.querySelectorAll(s)];

const ativarRevelacao = () => {
  document.body.classList.add("js-ativo");

  const elementos = qsa(".animar-entrada");
  if (!elementos.length) return;

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("visivel"));
    return;
  }

  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("visivel");
        obs.unobserve(e.target);
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
  );

  elementos.forEach((el) => obs.observe(el));
};

const criarCarrosselBeneficios = () => {
  const grade = qs(".secao-beneficios-voluntariado-nova .grade-beneficios");
  if (!grade) return;

  const originais = qsa(".cartao-beneficio", grade);
  const total = originais.length;
  if (total < 2) return;

  const wrapper = document.createElement("div");
  wrapper.className = "carrossel-beneficios";

  const janela = document.createElement("div");
  janela.className = "carrossel-janela";

  const trilha = document.createElement("div");
  trilha.className = "carrossel-trilha";

  grade.parentNode.insertBefore(wrapper, grade);
  wrapper.appendChild(janela);
  janela.appendChild(trilha);

  originais.forEach((c) => {
    c.classList.add("carrossel-item");
    trilha.appendChild(c);
  });

  grade.remove();

  const duplicados = [...originais, ...originais].map((c) => {
    const clone = c.cloneNode(true);
    clone.classList.add("carrossel-item");
    return clone;
  });

  duplicados.forEach((c) => trilha.appendChild(c));

  const controles = document.createElement("div");
  controles.className = "carrossel-controles";

  const botao = (txt, ativo = false) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `botao-carrossel${ativo ? " ativo" : ""}`;
    b.textContent = txt;
    return b;
  };

  const btnPrev = botao("Voltar");
  const btnPlay = botao("Pausar", true);
  const btnNext = botao("Avançar");

  controles.append(btnPrev, btnPlay, btnNext);
  wrapper.appendChild(controles);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let index = total;
  let tocando = !reduce;
  let timer = null;

  const passo = () => {
    const item = trilha.firstElementChild;
    if (!item) return 0;
    const gap = parseFloat(getComputedStyle(trilha).gap || "0");
    return item.getBoundingClientRect().width + gap;
  };

  const atualizar = (animar = true) => {
    const p = passo();
    if (!p) return;
    trilha.style.transition = animar ? "transform .45s ease" : "none";
    trilha.style.transform = `translateX(-${p * index}px)`;
  };

  const normalizar = () => {
    if (index >= total * 2) index -= total;
    else if (index < total) index += total;
    atualizar(false);
  };

  const proximo = () => (index++, atualizar(true));
  const anterior = () => (index--, atualizar(true));

  const pausar = () => (clearInterval(timer), (timer = null));
  const iniciar = () => {
    if (!tocando) return;
    pausar();
    timer = setInterval(proximo, 3200);
  };

  const clique = (fn) => () => {
    pausar();
    fn();
    if (tocando) iniciar();
  };

  btnPrev.addEventListener("click", clique(anterior));
  btnNext.addEventListener("click", clique(proximo));

  btnPlay.addEventListener("click", () => {
    tocando = !tocando;
    btnPlay.textContent = tocando ? "Pausar" : "Play";
    btnPlay.classList.toggle("ativo", tocando);
    tocando ? iniciar() : pausar();
  });

  trilha.addEventListener("transitionend", normalizar);
  trilha.addEventListener("mouseenter", () => tocando && pausar());
  trilha.addEventListener("mouseleave", () => tocando && iniciar());
  window.addEventListener("resize", () => atualizar(false));

  requestAnimationFrame(() => {
    atualizar(false);
    iniciar();
  });
};

const ativarMenu = () => {
  const botaoMenu = qs(".botao-menu");
  const menu = qs(".menu");
  if (!botaoMenu || !menu) return;

  botaoMenu.addEventListener("click", () => {
    const ativo = menu.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", ativo ? "true" : "false");
  });

  qsa(".item-menu", menu).forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("ativo");
      botaoMenu.setAttribute("aria-expanded", "false");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  ativarRevelacao();
  criarCarrosselBeneficios();
  ativarMenu();
});
