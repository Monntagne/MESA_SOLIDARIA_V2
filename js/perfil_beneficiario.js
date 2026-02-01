document.addEventListener("DOMContentLoaded", () => {
  const $ = (s, p = document) => p.querySelector(s);

  const botaoEditarInfo = $("#botaoEditarInfo");
  const botaoSalvarInfo = $("#botaoSalvarInfo");
  const listaInfo = $("#listaInfo");

  const toggleEdicaoInfo = (forcar) => {
    const editando =
      typeof forcar === "boolean"
        ? forcar
        : !listaInfo.classList.contains("editando");

    listaInfo.classList.toggle("editando", editando);
    botaoEditarInfo.textContent = editando ? "✕" : "✎";
    botaoSalvarInfo.disabled = !editando;
    botaoSalvarInfo.style.opacity = editando ? "1" : ".55";
  };

  const salvarInfo = () => {
    listaInfo.querySelectorAll(".linha-info").forEach((linha) => {
      const valor = linha.querySelector("[data-valor]");
      const entrada = linha.querySelector(".entrada");
      valor.textContent = entrada.value.trim() || valor.textContent;
    });
    toggleEdicaoInfo(false);
  };

  botaoEditarInfo?.addEventListener("click", () => toggleEdicaoInfo());
  botaoSalvarInfo?.addEventListener("click", salvarInfo);
  toggleEdicaoInfo(false);

  const criarGraficoLinha = () => {
    const canvas = $("#graficoLinha");
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Retiradas",
            data: [5, 8, 4, 10, 7, 12],
            tension: 0.35,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
      }
    });
  };

  const criarGraficoPizza = () => {
    const canvas = $("#graficoPizza");
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Grãos", "Verduras", "Proteínas", "Outros"],
        datasets: [{ data: [40, 25, 20, 15], borderWidth: 2, hoverOffset: 6 }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top" } },
        cutout: "58%"
      }
    });
  };

  criarGraficoLinha();
  criarGraficoPizza();

  const listaDependentes = $("#listaDependentes");
  const botaoAdicionarDependente = $("#botaoAdicionarDependente");

  const criarLinhaDependente = ({ nome = "", doc = "", idade = "" } = {}) => {
    const linha = document.createElement("div");
    linha.className = "dependente";
    linha.innerHTML = `
      <img src="imagens/image.png" alt="Dependente" />
      <div class="dependente-campos">
        <input type="text" value="${nome}" disabled />
        <input type="text" value="${doc}" disabled />
        <input type="text" value="${idade}" disabled />
      </div>
      <div class="dependente-acoes">
        <button class="icone-botao" type="button" data-acao="editar" aria-label="Editar dependente">✎</button>
        <button class="icone-botao perigo" type="button" data-acao="excluir" aria-label="Excluir dependente">🗑️</button>
      </div>
    `.trim();
    return linha;
  };

  const alternarEdicaoDependente = (linha) => {
    const inputs = Array.from(linha.querySelectorAll(".dependente-campos input"));
    const editando = inputs[0].disabled;
    inputs.forEach((i) => (i.disabled = !editando));
    const botao = linha.querySelector('[data-acao="editar"]');
    botao.textContent = editando ? "✓" : "✎";
    if (!editando) inputs[0].focus();
  };

  listaDependentes?.addEventListener("click", (e) => {
    const botao = e.target.closest("button[data-acao]");
    if (!botao) return;

    const linha = botao.closest(".dependente");
    if (!linha) return;

    const acao = botao.dataset.acao;
    if (acao === "excluir") {
      linha.remove();
      return;
    }
    if (acao === "editar") {
      alternarEdicaoDependente(linha);
    }
  });

  botaoAdicionarDependente?.addEventListener("click", () => {
    if (!listaDependentes) return;
    const nova = criarLinhaDependente({
      nome: "Novo dependente",
      doc: "Documento",
      idade: "Idade"
    });
    listaDependentes.appendChild(nova);
    alternarEdicaoDependente(nova);
  });

  const togglePreciso = $("#togglePrecisoAlimentos");
  togglePreciso?.addEventListener("change", () => {
    togglePreciso.setAttribute("aria-checked", String(togglePreciso.checked));
  });
});
