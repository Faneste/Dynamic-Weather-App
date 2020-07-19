// -stavi tamnije boje kocki za nocni mod - mnogo je svetlo
// -ubaci da ima loading icon
// -neka kod bude modularan
// -ubaci nekoliko gradova
// -moze i dva jezika(srpski i engleski)
// -pogledaj historic i data na gov.rs pa ubaci chart.js
// key je 1d2c0da00ec0d5a4ef8955bc8da0fbdf
// zaokruzi temp, baguje kad se prebaci sa c na f

// temperature main
const temp = document.getElementById("temperature__big-number__temp");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const windDeg = document.getElementById("windDeg");
const windSpeed = document.getElementById("windSpeed");
// temperature days
const tempMonMax = document.getElementById("tempMonMax");
const tempMonLow = document.getElementById("tempMonLow");
const tempTueMax = document.getElementById("tempTueMax");
const tempTueLow = document.getElementById("tempTueLow");
const tempWedMax = document.getElementById("tempWedMax");
const tempWedLow = document.getElementById("tempWedLow");
const tempThuMax = document.getElementById("tempThuMax");
const tempThuLow = document.getElementById("tempThuLow");
const tempFriMax = document.getElementById("tempFriMax");
const tempFriLow = document.getElementById("tempFriLow");
const tempSatMax = document.getElementById("tempSatMax");
const tempSatLow = document.getElementById("tempSatLow");
const tempSunMax = document.getElementById("tempSunMax");
const tempSunLow = document.getElementById("tempSunLow");
// city select menu
document.getElementById("temperature__city__select").addEventListener("change", function () {
    const e = document.getElementById("temperature__city__select");
    const value = e.options[e.selectedIndex].value;
    getWeatherData(value);
});
// metric/imperial units change
let elementsArray = document.querySelectorAll(".unitsButton");
elementsArray.forEach(function(elem) {
    elem.addEventListener("click", function(e) {
      selectedUnit = e.target.value;
      selectedCity = document.getElementById("temperature__city__select").value;
      getWeatherData(selectedCity, selectedUnit);
    });
});
// get main weather data
async function getWeatherData(cityId = "789128", units = "metric") {
  const apiKey = "1d2c0da00ec0d5a4ef8955bc8da0fbdf";

  let jsonObject;
  let jsonObjectFormat;

  // toggle unit buttons
  if (units === "metric") {
    document.getElementById("metric").style.backgroundColor = "#d63447";
    document.getElementById("imperial").style.backgroundColor = "#f6eedf";
  } else {
    document.getElementById("imperial").style.backgroundColor = "#d63447";
    document.getElementById("metric").style.backgroundColor = "#f6eedf";
  }

  try {
    jsonObject = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}&units=${units}`);
    jsonObjectFormat = await jsonObject.json();
  } catch (err) { console.log("greska je " + err); }

  // console.log(jsonObjectFormat.main.temp);
  temp.innerHTML = Math.ceil(jsonObjectFormat.main.temp);
  tempMax.innerHTML = ` ${jsonObjectFormat.main.temp_max}°`;
  tempMin.innerHTML = ` ${jsonObjectFormat.main.temp_min}°`;
  feelsLike.innerHTML = ` ${jsonObjectFormat.main.feels_like}°`;
  humidity.innerHTML = ` ${jsonObjectFormat.main.humidity}%`;
  pressure.innerHTML = ` ${jsonObjectFormat.main.pressure}mb`;
  windDeg.innerHTML = jsonObjectFormat.wind.deg;
  windSpeed.innerHTML = ` ${jsonObjectFormat.wind.speed}km/h`;

  // console.log(jsonObjectFormat);
  return jsonObjectFormat;
}

getWeatherData()
.then()
.catch(err => err);






























//
