//date & time
let currentTime = new Date();
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

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //let currentDay = days[date.getDay()];
  //let currentDate = date.getDate();
  //if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
  //  currentDate = `${currentDate}st`;
  //} else if (currentDate === 2 || currentDate === 22) {
  //  currentDate = `${currentDate}nd`;
  //} else if (currentDate === 3 || currentDate === 23) {
  //  currentDate = `${currentDate}rd`;
  //} else {
  //  currentDate = `${currentDate}th`;
  //}
  //let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = currentTime.getSeconds();
  if (seconds < 10) {
    seconds = `0${minutes}`;
  }

  let formattedDate = `Local time: ${currentYear}-${
    date.getMonth() + 1
  }-${date.getDate()} ${hours}:${minutes}:${seconds},<br />Greenwich Mean Time`;

  let localTime = document.querySelector(".localTime");
  localTime.innerHTML = formattedDate;
}
// call date and time function
formatDate(currentTime);

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:00`;
}

//temperature & location heading
function showTime(response) {
  console.log(response.data);
  let dateTime = response.data.datetime;
  let timezone = response.data.timezone_name;
  let localTime = document.querySelector(".localTime");
  localTime.innerHTML = `Local time: ${dateTime},<br />${timezone}`;
}
homepageWeather("newcastle,%20GB");
function homepageWeather(response) {
  let location = "newcastle,%20GB";
  console.log(response);
  let units = "metric";
  let apiKey = "0fd53f7affdf277c9962be552ec9b405";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response);
  let location = response.data.name;
  console.log(location);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let country = response.data.sys.country;
  console.log(temperature);
  let message = `${location}, ${country}`;
  let h1 = document.querySelector("#city");
  h1.innerHTML = message;
  let h2 = document.querySelector("#main-temp");
  h2.innerHTML = temperature;
  // description
  let h4 = document.querySelector("#description");
  h4.innerHTML = response.data.weather[0].description;
  // pressure
  let pressure = document.querySelector("#pressure");
  let descriptionPressure = Math.round(response.data.main.pressure);
  pressure.innerHTML = `Pressure = ${descriptionPressure}`;
  // humidity
  let humidity = document.querySelector("#humidity");
  let descriptionHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity = ${descriptionHumidity}%`;
  // wind
  let wind = document.querySelector("#wind");
  let descriptionWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind = ${descriptionWind}km/h`;

  apiKey = "80a09bbbf0b0476eb94c1986f95476f6";
  apiUrl = `https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${location}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTime);

  if (temperature > 10) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`;
  } else if (temperature < 0) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="far fa-snowflake"></i>`;
  } else {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  }
  if (descriptionWind > 10) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-wind"></i>`;
  }
  if (
    h4.innerHTML === "overcast clouds" ||
    h4.innerHTML === "broken clouds" ||
    h4.innerHTML === "partly cloudy"
  ) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-cloud"></i></i>`;
  } else if (
    h4.innerHTML === "light rain" ||
    h4.innerHTML === "moderate rain"
  ) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  } else if (h4.innerHTML === "clear sky") {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`;
  } else if (
    h4.innerHTML === "mist" ||
    h4.innerHTML === "fog" ||
    h4.innerHTML === "haze"
  ) {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="fas fa-cloud-moon"></i>`;
  } else if (h4.innerHTML === "light shower snow") {
    let weatherIcon = document.querySelector(".mainWeatherIcon");
    weatherIcon.innerHTML = `<i class="far fa-snowflake"></i>`;
  }
}
//current location on link click
function showPosition(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
  let units = "metric";
  let apiKey = "0fd53f7affdf277c9962be552ec9b405";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let useCurrentLocation = document.querySelector("#current-location-link");
useCurrentLocation.addEventListener("click", currentLocation);

//fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  fahrenheitLink.removeEventListener("click", displayFahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

//celsius
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  celsiusLink.removeEventListener("click", displayCelsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayForecast(response) {
  let forecast = response.data.list[0];
  let forecastElement = document.querySelector("#dayOne");
  temp = Math.round(response.data.list[0].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconOne">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  forecast = response.data.list[1];
  forecastElement = document.querySelector("#dayTwo");
  temp = Math.round(response.data.list[1].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconTwo">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  forecast = response.data.list[2];
  forecastElement = document.querySelector("#dayThree");
  temp = Math.round(response.data.list[2].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconThree">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  forecast = response.data.list[3];
  forecastElement = document.querySelector("#dayFour");
  temp = Math.round(response.data.list[3].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconFour">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  forecast = response.data.list[4];
  forecastElement = document.querySelector("#dayFive");
  temp = Math.round(response.data.list[4].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconFive">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  forecast = response.data.list[5];
  forecastElement = document.querySelector("#daySix");
  temp = Math.round(response.data.list[5].main.temp);
  forecastElement.innerHTML = `
    <h1 class="weatherIconSix">
              <i class="fas fa-cloud-showers-heavy"></i></h1>
       <h2><strong>${temp}℃</strong></h2>
         <h5>${formatHours(forecast.dt * 1000)}</h5>
  </div>`;

  let days = {
    dayOne: response.data.list[0].weather[0].main,
    dayTwo: response.data.list[1].weather[0].main,
    dayThree: response.data.list[2].weather[0].main,
    dayFour: response.data.list[3].weather[0].main,
    dayFive: response.data.list[4].weather[0].main,
    daySix: response.data.list[5].weather[0].main,
  };
  console.log(days);

  if (response.data.list[0].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconOne");
    weatherIcon.innerHTML = `<h1 class="weatherIconOne">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconOne");
    weatherIcon.innerHTML = `<h1 class="weatherIconOne">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconOne");
    weatherIcon.innerHTML = `<h1 class="weatherIconOne">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconOne");
    weatherIcon.innerHTML = `<h1 class="weatherIconOne">
    <i class="far fa-snowflake"></i>`;
  }

  if (response.data.list[1].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconTwo");
    weatherIcon.innerHTML = `<h1 class="weatherIconTwo">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[1].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconTwo");
    weatherIcon.innerHTML = `<h1 class="weatherIconTwo">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[1].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconTwo");
    weatherIcon.innerHTML = `<h1 class="weatherIconTwo">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconTwo");
    weatherIcon.innerHTML = `<h1 class="weatherIconTwo">
    <i class="far fa-snowflake"></i>`;
  }

  if (response.data.list[2].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconThree");
    weatherIcon.innerHTML = `<h1 class="weatherIconThree">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[2].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconThree");
    weatherIcon.innerHTML = `<h1 class="weatherIconThree">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[2].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconThree");
    weatherIcon.innerHTML = `<h1 class="weatherIconThree">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconThree");
    weatherIcon.innerHTML = `<h1 class="weatherIconThree">
    <i class="far fa-snowflake"></i>`;
  }

  if (response.data.list[3].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconFour");
    weatherIcon.innerHTML = `<h1 class="weatherIconFour">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[3].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconFour");
    weatherIcon.innerHTML = `<h1 class="weatherIconFour">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[3].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconFour");
    weatherIcon.innerHTML = `<h1 class="weatherIconFour">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconFour");
    weatherIcon.innerHTML = `<h1 class="weatherIconFour">
    <i class="far fa-snowflake"></i>`;
  }

  if (response.data.list[4].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconFive");
    weatherIcon.innerHTML = `<h1 class="weatherIconFive">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[4].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconFive");
    weatherIcon.innerHTML = `<h1 class="weatherIconFive">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[4].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconFive");
    weatherIcon.innerHTML = `<h1 class="weatherIconFive">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconFive");
    weatherIcon.innerHTML = `<h1 class="weatherIconFive">
    <i class="far fa-snowflake"></i>`;
  }

  if (response.data.list[5].weather[0].main === "Rain") {
    let weatherIcon = document.querySelector(".weatherIconSix");
    weatherIcon.innerHTML = `<h1 class="weatherIconSix">
      <i class="fas fa-cloud-showers-heavy"></i></h1>`;
  } else if (response.data.list[5].weather[0].main === "Clouds") {
    let weatherIcon = document.querySelector(".weatherIconSix");
    weatherIcon.innerHTML = `<h1 class="weatherIconSix">
    <i class="fas fa-cloud"></i></h1>`;
  } else if (response.data.list[5].weather[0].main === "Clear") {
    let weatherIcon = document.querySelector(".weatherIconSix");
    weatherIcon.innerHTML = `<h1 class="weatherIconSix">
    <i class="fas fa-sun"></i></h1>`;
  } else if (response.data.list[0].weather[0].main === "Snow") {
    let weatherIcon = document.querySelector(".weatherIconSix");
    weatherIcon.innerHTML = `<h1 class="weatherIconSix">
    <i class="far fa-snowflake"></i>`;
  }
}

//search form
function searchCity(event) {
  event.preventDefault();
  let searchTextInput = document.querySelector("#searchTextInput");

  console.log(searchTextInput.value);
  let searchCity = document.querySelector("#city");
  if (searchTextInput.value) {
    searchCity.innerHTML = `${searchTextInput.value}`;
  } else {
    alert("Please enter a city");
  }
  let units = "metric";
  let apiKey = "0fd53f7affdf277c9962be552ec9b405";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTextInput.value}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTextInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

  apiKey = "80a09bbbf0b0476eb94c1986f95476f6";
  apiUrl = `https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${searchTextInput.value}`;
  axios.get(apiUrl).then(showTime);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity, showTemperature);

//change city button
function changeCityButton(event) {
  let changeCity = prompt("Please enter a city");
  console.log(changeCity);

  let searchCity = document.querySelector("#city");
  if (changeCity) {
    searchCity.innerHTML = `${changeCity}`;
  } else {
    alert("Please enter a city");
  }
  let units = "metric";
  let apiKey = "0fd53f7affdf277c9962be552ec9b405";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${changeCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

  apiKey = "80a09bbbf0b0476eb94c1986f95476f6";
  apiUrl = `https://timezone.abstractapi.com/v1/current_time?api_key=${apiKey}&location=${changeCity}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTime);
}
