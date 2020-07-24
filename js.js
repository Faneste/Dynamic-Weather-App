// -ubaci nekoliko gradova
// -pogledaj historic i data na gov.rs pa ubaci chart.js
// spoj funkcije za mapu ako moze

const temp = document.getElementById("temperature__big-number__temp");
let day; let hr; let imageTypeCode;

const apiKey = "1d2c0da00ec0d5a4ef8955bc8da0fbdf";
const apiKeyAir = "9c386690b150c81a8898d31a0cbbaeec22bcbf53";
const climaCellApiKey = "6uXksevnHg9SOtjq2VdvoCda9EKGn1CX";

// change day/night theme
if (day) {
  document.documentElement.style.setProperty('--backgroundTheme',
  'url("background/clouds.svg"), url("background/stars.svg"), linear-gradient(#a3e3f5, #ffffff)');
} else {
  document.documentElement.style.setProperty('--backgroundTheme',
  'url("background/clouds.svg"), url("background/stars.svg"), linear-gradient(#2c2e45, #525d75)');
}

// city select menu
document.getElementById("temperature__city__select").addEventListener("change", function () {
    const e = document.getElementById("temperature__city__select");
    const value = e.options[e.selectedIndex].value;
    getWeatherDataDay(value);
});

// metric/imperial units change
document.querySelectorAll(".unitsButton").forEach(function(elem) {
    elem.addEventListener("click", function(e) {
      selectedUnit = e.target.value;
      selectedCity = document.getElementById("temperature__city__select").value;
      getWeatherDataDay(selectedCity, selectedUnit);
    });
});

////////////////////////////////////////////////
//////////////////////// get main weather data
////////////////////////////////////////////////
async function getWeatherDataDay(cityId = "789128", units = "M") {

  //////////// loading animation
  document.getElementById("temperature__big-icon__image").src = "loading.gif";
  Array.from(document.getElementsByClassName("day__image")).map(elem => { elem.src = "loading.gif"; })
  //////////// get current day
  let jsonObject;
  let jsonObjectFormat;
  try {
    jsonObject = await fetch(`https://api.weatherbit.io/v2.0/current?,NC&units=${units}&key=3e81d1090bdd43b8893df1cee86fc34b&city_id=${cityId}`);
    jsonObjectFormat = await jsonObject.json();
  } catch (err) { console.log("greska je " + err); }
  //////////// get entire week
  let jsonObject2;
  let jsonObjectFormat2;
  try {
    jsonObject2 = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?NC&units=${units}&key=3e81d1090bdd43b8893df1cee86fc34b&city_id=${cityId}&days=7`);
    jsonObjectFormat2 = await jsonObject2.json();
  } catch (err) { console.log("greska je " + err); }

  // build current day
  temp.innerHTML = Math.ceil(jsonObjectFormat.data[0].temp);
  document.getElementById("temperature__info").innerHTML =
  `<p>
    grad: <span class="temperature__info__span">${jsonObjectFormat.data[0].city_name}</span><br>
    pokrivenost oblaka: <span class="temperature__info__span">${jsonObjectFormat.data[0].clouds}%</span><br>
    oseća se kao: <span class="temperature__info__span">${jsonObjectFormat.data[0].app_temp}°</span><br>
    vlažnost: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].rh, 2)}%</span><br>
    pritisak: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].pres, 3)}mb</span><br>
    pravac vetra: <span class="temperature__info__span">${jsonObjectFormat.data[0].wind_cdir}°</span><br>
    brzina vetra: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].wind_spd, 3)}${changeUnits(units)}</span>
    vidljivost: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].vis, 3)}${changeUnits(units)}</span>
  </p>`;

  // console.log(jsonObjectFormat.data);

  // build current week
  let mainImage2 = document.getElementById("temperature__big-icon__image");
  mainImage2.src = `icons/${getImage(jsonObjectFormat2.data[0].weather.code)}`;
  let dayImage = document.getElementsByClassName("day__image");
  let dayName = document.getElementsByClassName("day-name");
  let dayTemp = document.getElementsByClassName("day__temp");
  for (var i = 0; i < 7; i++) {
    dayImage[i].src = `icons/${getImage(jsonObjectFormat2.data[i].weather.code)}`;
    dayImage[i].alt = `${getImage(jsonObjectFormat2.data[i].weather.code)}`;
    dayName[i].innerHTML = `${getDay(i)}`;
    dayTemp[i].innerHTML = `${shortenStr(jsonObjectFormat2.data[i].temp, 2)}°
      <span class="day__temp__small">${shortenStr(jsonObjectFormat2.data[i].low_temp, 2)}°</span>`;
  };
  // return jsonObjectFormat;
}

getWeatherDataDay()
.then()
.catch(err => err);

////////////////////////////////////////////////
//////////////////////// get main map data
////////////////////////////////////////////////
function getMapDataPollution() {
  // pollution map
  const  OSM_URL2  =  'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const  OSM_ATTRIB2  =  '&copy;  <a  href="http://openstreetmap.org/copyright">OpenStreetMap</a>  contributors';
  const  osmLayer2  =  L.tileLayer(OSM_URL2,  {attribution:  OSM_ATTRIB2});

  const  WAQI_URL   =  `https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=${apiKeyAir}`;
  const  WAQI_ATTR  =  'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';
  const  waqiLayer  =  L.tileLayer(WAQI_URL,  {attribution:  WAQI_ATTR});

  const  map2  =  L.map('pollution-map__map-container__map').setView([44.016521,  21.005859],  7);
  map2.addLayer(osmLayer2).addLayer(waqiLayer);
}
getMapDataPollution();

function getMapDataWeather() {
  // temperature map
  const CC_DATA_FIELD = '<your selected data field name here>';
  const SELECTED_FIELD = 'no2';

  var map = L.map('temperature-map__map-container__map', {
      minZoom: 1,
      maxZoom: 12
  }).setView([44.016521, 21.005859], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.tileLayer(`https://api.climacell.co/v3/weather/layers/${SELECTED_FIELD}/now/7/44/21.png?apikey=${climaCellApiKey}`, {
      attribution: '&copy; <a href="https://www.climacell.co/weather-api">Powered by ClimaCell</a>',
  }).addTo(map);

  // console.log(`https://api.climacell.co/v3/weather/layers/${SELECTED_FIELD}/now/7/44/21.png?apikey=${climaCellApiKey}`);
}
getMapDataWeather();







































//
