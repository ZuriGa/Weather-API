import './css/styles.css';

// Business Logic
function getWeather(city, zip) {
  let request = new XMLHttpRequest();
  let url;

  if (city && zip) {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  } else if (city) {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
  } else if (zip) {
    url =`http://api.openweathermap.org/data/2.5/weather?q=${zip}&appid=${process.env.API_KEY}`;
  }
  else {
    printError(null, { error: "invalid text"}, city || zip);
    return;
  }


  request.addEventListener("loadend", function () {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, city, zip);
    } else {
      printError(this, response, city, zip);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function convertKelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9 / 5 + 32).toFixed(2);
}

function convertEpoch(epoch) {
  const epochMilliseconds = epoch * 1000;
  const date = new Date(epochMilliseconds)
  return date
}

// UI Logic

function printElements(apiResponse, city) {
  const kelvinTemp = apiResponse.main.temp
  const fahrenheitTemp = convertKelvinToFahrenheit(kelvinTemp)
  const epochTime = apiResponse.sys.sunset
  const standardTime = convertEpoch(epochTime)
  document.querySelector('#showResponse').innerText = `The humidity in ${city} is ${apiResponse.main.humidity}%. 
    The temperature in Kelvins is ${apiResponse.main.temp} degrees.
    The temperature in Fahrenheit is ${fahrenheitTemp} degrees. 
    The wind speed will be ${apiResponse.wind.speed}.
    The sunset will be ${standardTime}`;
}

function printError(request, apiResponse, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: ${request.status} ${request.statusText}: ${apiResponse.message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});

