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

  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  if (currentDate === 1 || currentDate === 21 || currentDate === 31) {
    currentDate = `${currentDate}st`;
  } else if (currentDate === 2 || currentDate === 22) {
    currentDate = `${currentDate}nd`;
  } else if (currentDate === 3 || currentDate === 23) {
    currentDate = `${currentDate}rd`;
  } else {
    currentDate = `${currentDate}th`;
  }
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${hours}:${minutes}`;

  let localTime = document.querySelector(".localTime");
  localTime.innerHTML = formattedDate;
}
// call date and time function
formatDate(currentTime);

//temperature & location heading
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
  wind.innerHTML = `Wind = ${descriptionWind}mph`;
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
}
