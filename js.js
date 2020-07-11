// -neka ima color var u css-u
// -mora da ima mesec za nocni mod
// -ubaci da ima loading icon
// -neka kod bude modularan
// -ubaci nekoliko gradova
// -moze i dva jezika(srpski i engleski)
// -moze i pozadina da se menja kao na windowsu (dan i noc sa aktuelnim vremenom, moze u vise leyera)
// -pogledaj historic i data na gov.rs pa ubaci chart.js
// key je 1d2c0da00ec0d5a4ef8955bc8da0fbdf

async function getWeatherData() {
  const apiKey = "1d2c0da00ec0d5a4ef8955bc8da0fbdf";
  const cityId = "789128";

  let jsonObject;
  let jsonObjectFormat;

  try {
    jsonObject = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId}&APPID=${apiKey}&units=metric`);
    jsonObjectFormat = await jsonObject.json();
  } catch (err) {
    console.log("greska je " + err);
  }
  return jsonObjectFormat;
}

getWeatherData()
.then(mess => console.log(mess))
.catch(err => err);

//// Promises.all

// let promises = [getWeatherData(789128)];

// <img src="loadingImg.gif" alt="">

// Promise.all(promises)
//   .then((results) => {
//     console.log(results);
//     // for (var i = 0; i < results.length; i++) {
//     //   document.getElementById("demo").innerHTML += `<li>${results[i]}</li>`;
//     // }
//     // document.getElementsByClassName("loader")[0].classList.remove("loader");
//   })
//   .catch((err) => console.log(err));





























//
