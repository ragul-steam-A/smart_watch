let weatherApiKey = "L7hWQsguVPFfTDccP7xDDYk7RHOximno";

document.getElementById("message").style.display = "none";
document.getElementById("spotify").style.display = "none";
document.getElementById("timer").style.display = "none";
document.getElementById("display_message").style.display = "none";

var city = "ohio";
var weatherData;
async function getWeather() {
  const data = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=87cfbc9449359a5449b017e2d4c55013`);

  weatherData = await data.json();
  const iconId = weatherData.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${iconId}.png`;
  document.querySelector(".weatherIcon").src = iconUrl;
}

getWeather();
function padWithZero(number) {
  return String(number).padStart(2, "0");
}

function display(value) {
  document.getElementById("home").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("spotify").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("display_message").style.display = "none";
  document.getElementById(value).style.display = "flex";
  document.getElementById(value).style.flexDirection = "column";
  document.getElementById(value).style.alignItems = "center";
  if (value == "timer") {
    document.getElementById(value).style.justifyContent = "space-around";
  }
  if (value == "spotify") {
    document.getElementById(value).style.display = "block";
  }
}
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let ms = document.getElementById("ms");

let m = 0;
let s = 0;
let ml = 0;
let interval;
let flag = true;
function start() {
  if (flag) {
    interval = setInterval(() => {
      ml++;
      if (ml > 100) {
        s++;
        ml = 0;
      }
      if (s > 60) {
        m++;
        s = 0;
      }
      min.innerHTML = padWithZero(m);
      sec.innerHTML = padWithZero(s);
      ms.innerHTML = padWithZero(ml);
    }, 10);
    flag = !flag;
  } else {
    m = padWithZero(m);
    s = padWithZero(s);
    ml = padWithZero(ml);
    clearInterval(interval);
    document.getElementById("lap").innerHTML = m + ":" + s + ":" + ml;
    flag = !flag;
  }
}

function stop() {
  if (flag != false) {
    return;
  }
  clearInterval(interval);
  flag = !flag;
}

function reset() {
  m = "00";
  s = "00";
  ml = "00";
  min.innerHTML = m;
  sec.innerHTML = s;
  ms.innerHTML = ml;
  document.getElementById("lap").innerHTML = m + ":" + s + ":" + ml;
}

const now = new Date();

setInterval(() => {
  let time;
  if (now.getMinutes() > 9) {
    time = now.getHours() + ":" + now.getMinutes();
  } else {
    time = now.getHours() + ":0" + now.getMinutes();
  }

  document.getElementById("timenow").innerHTML = time;
  document.getElementById("timemain").innerHTML = time;
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  document.getElementById("day").innerHTML = week[now.getDay()];
}, 10);

function messageDisplay() {
  document.getElementById("home").style.display = "none";
  document.getElementById("message").style.display = "none";
  document.getElementById("spotify").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById("display_message").style.display = "block";
}
