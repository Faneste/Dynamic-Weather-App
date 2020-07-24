// get day/night for theme change
(function () {
  hr = (new Date()).getHours();
  if (hr > 6 && hr < 20 ) { day = true; }
  else { day = false }
})();

// get day and order them
function getDay(day) {
  const today = new Date().getDay();
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

// shorten units
let shortenStr = (slStr, slNum) => { return slStr.toString().slice(0, slNum); }

// return coresponding weather image
function getImage(count) {
  if (day) { timeOfDay = "Day"} else { timeOfDay = "Night"}
  if (count >= 200 && count < 522) { return `rain${timeOfDay}.svg` }
  else if (count >= 600 && count < 623) { return `snow${timeOfDay}.svg` }
  else if (count >= 700 && count < 751) { return `fog${timeOfDay}.svg` }
  else if (count === 800) { return `clear${timeOfDay}.svg` }
  else if (count >= 801 && count < 900) { return `clouds${timeOfDay}.svg` }
  else {return "missing image"}
}

// change metric/imperial units
function changeUnits(units) {
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
