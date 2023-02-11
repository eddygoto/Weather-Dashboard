const apiKey = "a5830e97a03510fcdb8d20f7a0bbd55c";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const clearButton = document.querySelector("#clear-btn");
const currentCity = document.querySelector("#current-city");
const currentTemperature = document.querySelector("#temperature");
const currentHumidity = document.querySelector("#humidity");
const currentWindSpeed = document.querySelector("#wind-speed");
const currentUVIndex = document.querySelector("#uv-index");

const formSubmitHandler = function (event) {
  event.preventDefault();

  let city = cityInput.value.trim();

  if (city) {
    getWeather(city);

    cityInput.value = " ";
  } else {
    alert("Please enter a city to search");
  }
};

const getWeather = function (city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`

  fetch(url).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        let date = new Date(data.dt*1000);
        date = date.toLocaleDateString();

        currentCity.textContent = `${data.name} (${date})`;
        currentTemperature.textContent = `${data.main.temp} F`;
        currentHumidity.textContent = `${data.main.humidity} %`;
        currentWindSpeed.textContent = `${data.wind.speed} MPH`;
      });
    } else {
      alert("Error: " + response.statusText + " when making a request to Open Weather Map.");
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Open Weather Map");
  });
}

searchButton.addEventListener("click", formSubmitHandler);

