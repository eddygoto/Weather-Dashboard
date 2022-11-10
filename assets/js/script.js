const apiKey = "a5830e97a03510fcdb8d20f7a0bbd55c";

var cityEl = document.querySelector("#city");
var dateEl = document.querySelector("#date");
var weatherIconEl = document.querySelector("#weather-icon");
var temperatureEl = document.querySelector("#temperature");
var humidityEl = document.querySelector("#humidity");
var windEl = document.querySelector("#wind");
var uvIndexEl = document.querySelector("#uv-index");

var cityList = document.querySelector("#recent-searches");
var cityInput = document.querySelector("#city-input");

var listed = [];

function loadCities() {
    var storedCities = JSON.parse(localStorage.getItem("listed"));
    if (storedCities) {
        listed = storedCities
    }
}

function storeCities() {
    localStorage.setItem("listed", JSON.stringify(listed));
}

