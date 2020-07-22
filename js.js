// -stavi tamnije boje kocki za nocni mod - mnogo je svetlo
// -ubaci da ima loading icon
// -neka kod bude modularan
// -ubaci nekoliko gradova
// -moze i dva jezika(srpski i engleski)
// -pogledaj historic i data na gov.rs pa ubaci chart.js
// key je 1d2c0da00ec0d5a4ef8955bc8da0fbdf
// optimizuj high i low u string literal za dane
// ima pod u json za night i day, namesti temu da se menja na tome
// sredi fahrenheit dugme u responsive css


// (function() {
//   let day;
//   let hr = (new Date()).getHours();
//   if (hr > 6 && hr < 20 ) { day = true; }
//   else { day = false }
// }());


// temperature main
const temp = document.getElementById("temperature__big-number__temp");
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
// get main weather data
const apiKey = "1d2c0da00ec0d5a4ef8955bc8da0fbdf";
async function getWeatherDataDay(cityId = "789128", units = "M") {

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
  //////////// get hour for theme change
  let day; let hr = (new Date()).getHours();
  if (hr > 6 && hr < 20 ) { day = true; }
  else { day = false }

  // build current day
  temp.innerHTML = Math.ceil(jsonObjectFormat.data[0].temp);
  document.getElementById("temperature__info").innerHTML =
  `<p>
    pokrivenost oblaka: <span class="temperature__info__span">${jsonObjectFormat.data[0].clouds}%</span><br>
    oseća se kao: <span class="temperature__info__span">${jsonObjectFormat.data[0].app_temp}°</span><br>
    vlažnost: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].rh, 2)}%</span><br>
    pritisak: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].pres, 3)}mb</span><br>
    stepen vetra: <span class="temperature__info__span">${jsonObjectFormat.data[0].wind_cdir}°</span><br>
    brzina vetra: <span class="temperature__info__span">${shortenStr(jsonObjectFormat.data[0].wind_spd, 3)}${changeUnits()}</span>
  </p>`;

  // build current week
  let dayImage = document.getElementsByClassName("day__image");
  let dayName = document.getElementsByClassName("day-name");
  let dayTemp = document.getElementsByClassName("day__temp");
  let count = 0;
  for (var i = 0; i < 7; i++) {
    dayImage[i].src = `icons/${getImage(count)}`;
    dayImage[i].alt = `${getImage(count)}`;
    dayName[i].innerHTML = `${getDay(count)}`;
    dayTemp[i].innerHTML = `${shortenStr(jsonObjectFormat2.data[count].temp, 2)}°
      <span class="day__temp__small">${shortenStr(jsonObjectFormat2.data[count].low_temp, 2)}°</span>`;
    count++;
  };

  let mainImage = document.getElementById("temperature__big-icon__image");
  mainImage.src = `icons/${getImageBig()}`;
  // return coresponding main weather image // sredi bug i spoj funkcije
  function getImageBig() {
    let timeOfDay;
    if (day) { timeOfDay = "Day"} else { timeOfDay = "Night"}
    let code2 = parseInt(jsonObjectFormat.data[0].weather.code);
    if (code2 >= 200 && code2 < 522) { return `rain${timeOfDay}.svg` }
    else if (code2 >= 600 && code2 < 623) { return `snow${timeOfDay}.svg` }
    else if (code2 >= 700 && code2 < 751) { return `fog${timeOfDay}.svg` }
    else if (code2 === 800) { return `clear${timeOfDay}.svg` }
    else if (code2 >= 801 && code2 < 900) { return `clouds${timeOfDay}.svg` }
    else {return "missing image1"}
  }
  // return coresponding weather image // sredi bug i spoj funkcije
  function getImage(count) {
    if (day) { timeOfDay = "Day"} else { timeOfDay = "Night"}
    let code = jsonObjectFormat2.data[count].weather.code;
    if (code >= 200 && code < 522) { return `rain${timeOfDay}.svg` }
    else if (code >= 600 && code < 623) { return `snow${timeOfDay}.svg` }
    else if (code >= 700 && code < 751) { return `fog${timeOfDay}.svg` }
    else if (code === 800) { return `clear${timeOfDay}.svg` }
    else if (code >= 801 && code < 900) { return `clouds${timeOfDay}.svg` }
    else {return "missing image"}
  }

  // change metric/imperial units
  function changeUnits() {
    if (units === "M") { // toggling button color and units text
      document.getElementById("metric").style.backgroundColor = "#d63447";
      document.getElementById("imperial").style.backgroundColor = "#f6eedf";
      return "km/h";
    } else {
      document.getElementById("imperial").style.backgroundColor = "#d63447";
      document.getElementById("metric").style.backgroundColor = "#f6eedf";
      return `mp/h`;
    }
  }
  // shorten units // stavi arrow function
  function shortenStr(slStr, slNum) {
    let newStr = slStr.toString().slice(0, slNum);
    return newStr;
  }
  // get day
  function getDay(day) {
    const today = new Date().getDay();
    // building days from today // nadji bolje resenje
    var week = [
      { name: 'ned', day: 0 },
      { name: 'pon', day: 1 },
      { name: 'uto', day: 2 },
      { name: 'sre', day: 3 },
      { name: 'čet', day: 4 },
      { name: 'pet', day: 5 },
      { name: 'sub', day: 6 },
      { name: 'ned', day: 7 },
      { name: 'pon', day: 8 },
      { name: 'uto', day: 9 },
      { name: 'sre', day: 10 },
      { name: 'čet', day: 11 },
      { name: 'pet', day: 12 },
      { name: 'sub', day: 13 }
    ];
    return week[today + day].name
  }

  return jsonObjectFormat;
}

getWeatherDataDay()
.then()
.catch(err => err);

// ovde mora city id da se prosledi u funkciju
async function getWeatherDataWeek() {

  let jsonObject;
  let jsonObjectFormat;
  try {
    // jsonObject = await fetch(`https://api.weatherbit.io/v2.0/current?,NC&units=${units}&key=3e81d1090bdd43b8893df1cee86fc34b&city_id=${cityId}`);
    // jsonObject = await fetch('test.json');
    jsonObject = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY`);
    jsonObjectFormat = await jsonObject.json();
  } catch (err) { console.log("greska je " + err); }
}

getWeatherDataWeek();



























//
