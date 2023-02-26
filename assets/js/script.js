const apiKey = "a5830e97a03510fcdb8d20f7a0bbd55c";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-btn");
const clearButton = document.querySelector("#clear-btn");
const currentCity = document.querySelector("#current-city");
const currentTemperature = document.querySelector("#temperature");
const currentHumidity = document.querySelector("#humidity");
const currentWindSpeed = document.querySelector("#wind-speed");
const cityList = document.querySelector("#city-list");
const date0 = document.querySelector("#f-date0");
const img0 = document.querySelector("#f-img0");
const temp0 = document.querySelector("#f-temperature0");
const hum0 = document.querySelector("#f-humidity0");
const container = document.querySelector("#cards-container");

const time = [8, 16, 24, 32, 40];
let listedCities = [];

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

        updateListedCities(data.name)
        getFiveDayWeather(data.coord.lat, data.coord.lon);
      });
    } else {
      alert("Error: " + response.statusText + " when making a request to Open Weather Map.");
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Open Weather Map");
  });
}

const getFiveDayWeather = function(lat, lon) {
  let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

  fetch(url).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        time.forEach(function(i) {
          let date = new Date(data.list[i].dt*1000);
          let day = date.toLocaleDateString();
          let icon = data.list[i].weather[0].icon;
          let temp = data.list[i].main.temp;
          let wind = data.list[i].wind.speed;
          let humidity = data.list[i].main.humidity;

          let card = `
            <div class="card">
              <h3>${day}</h3>
              <img src="https://openweathermap.org/img/w/${icon}.png">
              <p>${temp}°F</p>
              <p>${wind}MPH</p>
              <p>${humidity}%</p>
            </div>
          `;
          container.insertAdjacentHTML("beforeend", card);
        });
      });
    } else {
      console.log("Error: " + response.statusText + " when making a request to Open Weather Map.");
    }
  }).catch(function(error) {
    alert("Unable to connect to Open Weather Map");
  });
}


const updateListedCities = function(city) {
  if (city.length) {
    let cityCheck = false;
    for (let i = 0; i < listedCities.length; i++) {
      if (listedCities[i] === city) {
        cityCheck = true;
      }
    }
    if (!cityCheck) {
      listedCities.push(city);
      localStorage.setItem("listedCities", JSON.stringify(listedCities)); addButton(city);
    }
  } else {
    listedCities.push(city);
    localStorage.setItem("listedCities", JSON.stringify(city));
    renderListedCities();
  }
}

function init () {
  const storedCities = JSON.parse(localStorage.getItem("listedCities"));
  if (storedCities !== null) {
    listedCities = storedCities;
    renderListedCities();
  }
}

function addButton(text) {
  const newButton = document.createElement("btn");
  const newList = document.createElement("li");

  newButton.textContent = text;
  newButton.addEventListener("click", newButtonClickHandler);
  newList.appendChild(newButton);
  cityList.appendChild(newList);
}

const newButtonClickHandler = function(event) {
  event.preventDefault();
  getWeather(event.srcElement.textContent);
}

function renderListedCities() {
  for (let i = 0; i < listedCities.length; i++) {
    addButton(listedCities[i]);
  }
}

const clearHistoryButtonHandler = function(event) {
  event.preventDefault();
  localStorage.clear();
  cityList.textContent = "";
}

searchButton.addEventListener("click", formSubmitHandler);
cityList.addEventListener("click", newButtonClickHandler);
clearButton.addEventListener("click", clearHistoryButtonHandler);
init();