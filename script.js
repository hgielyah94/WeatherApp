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

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  console.log(currentTime.getTimezoneOffset);

  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  let formattedDate = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${hours}:${minutes}`;

  let h4 = document.querySelector("h4");
  h4.innerHTML = formattedDate;
}
console.log(formatDate(currentTime));

//temperature & location
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
  let h2 = document.querySelector("#mainTemp");
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
navigator.geolocation.getCurrentPosition(showPosition);
