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

function showCityWeather(response) {
  console.log(response.data);

  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#wind"
  ).innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#time-date").innerHTML = formatDate(
    response.data.dt * 1000
  );

  // icon
  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    // enhancement to icons using consume icons, leaving pure API call here for reference
    // `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png

    `img/${response.data.weather[0].icon}.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
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

// city on load
searchCity("Zurich");
