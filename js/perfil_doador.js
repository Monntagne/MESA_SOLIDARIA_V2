
/* PERFIL EDITÁVEL */
const btnEditar = document.getElementById("btnEditar");
const btnSalvar = document.getElementById("btnSalvar");
const inputs = document.querySelectorAll(".info-card input");
const nomeComercio = document.getElementById("nomeComercio");
const inputNome = document.getElementById("inputNome");

btnEditar.addEventListener("click", () => {
  inputs.forEach(i => i.disabled = false);
  btnSalvar.disabled = false;
  btnEditar.disabled = true;
});

btnSalvar.addEventListener("click", () => {
  inputs.forEach(i => i.disabled = true);
  nomeComercio.textContent = inputNome.value;
  btnSalvar.disabled = true;
  btnEditar.disabled = false;
  alert("Informações salvas com sucesso!");
});

/* GRÁFICOS */
new Chart(graficoBarras, {
  type: 'bar',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
    datasets: [{ data: [100, 75, 95, 25], backgroundColor: '#9b5de5' }]
  },
  options: { plugins: { legend: { display: false } } }
});

new Chart(graficoPizza, {
  type: 'pie',
  data: {
    labels: ['Grãos', 'Massas', 'Proteínas', 'Verduras'],
    datasets: [{
      data: [45, 25, 15, 15],
      backgroundColor: ['#9b5de5', '#f15bb5', '#fee440', '#00bbf9']
    }]
  }
});

new Chart(graficoLinha, {
  type: 'line',
  data: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio'],
    datasets: [{
      data: [5, 15, 20, 18, 25],
      borderColor: '#4cc9f0',
      backgroundColor: 'rgba(76,201,240,0.2)',
      fill: true,
      tension: 0.4
    }]
  },
  options: { plugins: { legend: { display: false } } }
});
