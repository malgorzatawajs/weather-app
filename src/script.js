function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

let now = new Date();
let date = document.querySelector("#date");

date.innerHTML = formatDate(now);

// search button

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#temp-description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = "08d9972d890a9581fcef3b5378c8d3d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "08d9972d890a9581fcef3b5378c8d3d6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

// function convertCelsius(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temp");
//   let celsiusTemperature = Math.round(((54 - 32) * 5) / 9);
//   currentTemp.innerHTML = celsiusTemperature;
// }

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", convertCelsius);

// function convertFahrenheit(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temp");
//   let fahrenheitTemperature = Math.round((12 * 9) / 5 + 32);
//   currentTemp.innerHTML = fahrenheitTemperature;
// }

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", convertFahrenheit);
