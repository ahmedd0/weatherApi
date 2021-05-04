let menu = document.getElementById("menu");
let closeIcon = document.getElementById("close");
let navbar = document.getElementById("nav");
let searchInput = document.getElementById("searchInput");
let loca = document.getElementsByClassName("location");
let dayElements = document.getElementsByClassName("day");
let dateElements = document.getElementsByClassName("date");
let temElements = document.getElementsByClassName("temperature");
let forcastIconElements = document.getElementsByClassName("forcast-icon");
let conditionTextElements = document.getElementsByClassName("condition-text");
let humidityElements = document.getElementsByClassName("humidity");
let windSpeedElments = document.getElementsByClassName("wind-speed");

// -------------------------- OPEN AND CLOSE NAVBAR
function openNavbar() {
  navbar.style.cssText = "left:0 !important";
}
function closeNavbar() {
  navbar.style.cssText = "left:-100% !important";
}
menu.addEventListener("click", openNavbar);
closeIcon.addEventListener("click", closeNavbar);
navbar.addEventListener("click", function (e) {
  if (e.target == navbar) {
    closeNavbar();
  }
});
document.addEventListener("keyup", function (e) {
  if (e.code == "Escape") {
    closeNavbar();
  }
});
//---------------------------------- Get Weather Data
async function getCityWeather(cityName) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=02d3dae044e54dd4b75204625210105&q=${cityName}&days=3`;
  let data = await fetch(url);
  let response = await data.json();
  let cityLocation;
  //-------- Set Data To HTML Elements
  displayResult(cityLocation, response);
}

//---------------- Display all Required Data
function displayResult(cityLocation, response) {
  let forecastArr = [];
  cityLocation = response.location.name;
  forecastArr.push(...response.forecast.forecastday);

  for (let i = 0; i < forecastArr.length; i++) {
    loca[i].innerHTML = cityLocation;
    dayElements[i].innerHTML = getDayName(forecastArr[i].date);
    dateElements[i].innerHTML =
      new Date(forecastArr[i].date).getDate() +
      " " +
      new Date(forecastArr[i].date).toLocaleString("default", {
        month: "long",
      });
    temElements[i].innerHTML = forecastArr[i].day.maxtemp_c + " <sup>o</sup>C";
    forcastIconElements[i].src = forecastArr[i].day.condition.icon;
    conditionTextElements[i].innerHTML = forecastArr[i].day.condition.text;
    humidityElements[i].innerHTML = forecastArr[i].day.avghumidity + " %";
    windSpeedElments[i].innerHTML = forecastArr[i].day.avgvis_km + " km/hr";
  }
}
function getDayName(dateFormat) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(dateFormat);
  return days[date.getDay()];
}
//-----------------------------------------------------
getCityWeather("qena");
searchInput.addEventListener("keyup", function () {
  getCityWeather(this.value);
});
