// Defino las constantes que voy a utilizar

const inputSearch = document.getElementById("Search");
const sendButton = document.getElementById("Submit")
const API_KEY = `806faf2e798488fe66c9f96152909da5`;

const getData = async (city) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=sp`;
    // Añadí los parametros de units=metric para que automátimacente me pase los valores al sistema metrico, y el lenguaje a español.
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

const getWeatherInfo = () => {
    const container = document.getElementById("container");
    getData(inputSearch.value)
        .then((data) => {
            container.innerHTML = cardTemplate(data);
        })
        .catch(() => {
            container.innerHTML = errorTemplate();
        })
    setTimeout( () => {
        inputSearch.value = "";
    }, 1000) // Con esto reseteo el valor del input a su valor vacio inicial, 1 segundo luego de realizada la búsqueda.
};

const cardTemplate = (data) => {
    return `
    <div class="cards bg-gray-700 text-white shadow-2xl animate__animated animate__zoomInDown">
      <div class="principal">
        <span class="text-4xl">${Math.round(data.main.temp)}°C</span>
        <img class="weather-image" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="partly_cloudy">
        <h3 class="text-lg">${data.name}</h3>
      </div>
      <div class="details text-gray-300 font-bold">
        <span>País: ${data.sys.country}</span>
        <span>Sensación Térmica: ${Math.round(data.main.feels_like)}°C</span>
        <span>Estado: ${data.weather[0].description}</span>
        <span>Presion: ${data.main.pressure}</span>
        <span>Humedad: ${data.main.humidity}%</span>
      </div>
      <div class="min-max font-black">
        <span class="min">Min: ${Math.round(data.main.temp_min)}°C</span>
        <span class="max">Max: ${Math.round(data.main.temp_max)}°C</span>
      </div>
    </div>
    `;
}

const errorTemplate = () => {
  return `
  <div class="cards-initial bg-gray-700 text-white shadow-2xl animate__animated animate__zoomInDown">
    <h3>Trata con una ciudad real...por favor</h3>
  </div>
  `
}
document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      getWeatherInfo();
    }
})
sendButton.addEventListener("click", getWeatherInfo);

