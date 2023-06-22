function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${hours}:${minutes}`;
}

// forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-md-2 col-sm-6 col-xs-6 py-2 text-center">
                <div class="forecast-date">
                  <h3>${formatDay(forecastDay.dt)}</h3>
                </div>
                <img src="img/${
                  forecastDay.weather[0].icon
                }.png"class="img-forecast-sm" 
                    alt="weather" />
                <div class="forecast-temperature">
                  <p>
                    <span class="forecast-max-temperature">
                    ${Math.round(forecastDay.temp.max)}° 
                    </span>
                    <span class="p-soft">|</span> 
                    <span class="p-soft forecast-min-temperature">  
                    ${Math.round(forecastDay.temp.min)}°
                    </span>
                  </p>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "9a65fb392bfa37dbdd85d1066857575d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function showCityWeather(response) {
  let cityElement = document.querySelector("#searched-city");
  let dateElement = document.querySelector("#time-date");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("#degrees");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");

  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  descriptionElement.innerHTML = response.data.weather[0].description;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  iconElement.setAttribute(
    "src",
    // enhancement to icons using consume icons, leaving pure API call here for reference
    // `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png
    `img/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "9a65fb392bfa37dbdd85d1066857575d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCityWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// call search - city on load
searchCity("Bristol");
