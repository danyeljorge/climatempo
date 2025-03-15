document.querySelector("#pesquisar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const localizacao = document.querySelector("#localizacao").value;

  if (!localizacao) {
    return visualizarAlerta("Preencha o campo com o nome da cidade.");
  }

  console.log(localizacao);

  const apiKey = "f3568bfe59c204844c216d9fec3eb661";

  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    localizacao
  )}&appid=${apiKey}&lang=pt_br&units=metric`;

  const resultado = await fetch(apiurl);
  const dados = await resultado.json();

  if (dados.cod === 200) {
    mostrarInformacao({
      cidade: dados.name,
      pais: dados.sys.country,
      temperatura: dados.main.temp,
      tempMax: dados.main.temp_max,
      tempMin: dados.main.temp_min,
      descricao: dados.weather[0].description,
      icone: dados.weather[0].icon,
      humidade: dados.main.humidity,
      vento: dados.wind.speed,
    });
  } else {
    visualizarAlerta("Não foi possivel lozalizar a cidade.");
  }

  console.log(dados);
});

function mostrarInformacao(dados) {
  visualizarAlerta("");

  document.querySelector(
    ".TituloCidade"
  ).innerHTML = `${dados.cidade}, ${dados.pais}`;

  document.querySelector("#tempValor").innerHTML = `${dados.temperatura
    .toFixed(1)
    .toString()
    .replace(".", ",")},<sup>°C</sup>`;

  document.querySelector("#tempDescricao").innerHTML = `${dados.descricao}`;

  document
    .querySelector("#tempImg")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dados.icone}@2x.png`
    );

  document.querySelector("#tempMax").innerHTML = `${dados.tempMax
    .toFixed(1)
    .toString()
    .replace(".", ",")},<spu>°C</sup>`;

  document.querySelector("#tempMin").innerHTML = `${dados.tempMin
    .toFixed(1)
    .toString()
    .replace(".", ",")},<spu>°C</sup>`;

  document.querySelector("#humidade").innerHTML = `${dados.humidade},%`;

  document.querySelector("#vento").innerHTML = `${dados.vento},km/h`;

  document.querySelector("#clima").classList.add("visualizar");
}

function visualizarAlerta(menssagem) {
  document.querySelector("#alerta").innerHTML = menssagem;
}
