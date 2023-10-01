const apiKey = "5981348cae4ccd9b30746c2c2f73ca3f";
const urlPhotos = "https://source.unsplash.com/2000x1200/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const weatherContainer = document.querySelector("#weather-data");
const backgroundWeather = document.querySelector("#background-weather");

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  if (parseInt(res.status) == 200) {
    const data = await res.json();
    return data;
  } else {
    const data = "Erro";
    return data;
  }
};

const getPhotos = async (city) => {
  const photoUrl = urlPhotos + city;
  const res = await fetch(photoUrl);

  const data = res;
  backgroundWeather.setAttribute("background", data.url);
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  if (data == "Erro") {
    weatherContainer.classList.add("hide");
    const photo = await getPhotos(city);
  } else {
    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;

    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

    countryElement.setAttribute(
      "src",
      `https://flagsapi.com/${data.sys.country}/shiny/32.png`
    );

    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
    const photo = await getPhotos(city);
  }
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});
