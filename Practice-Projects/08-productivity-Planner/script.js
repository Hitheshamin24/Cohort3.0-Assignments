const $ = (selector) => document.querySelector(selector);

const dashboardImg = $("#dashboard-img");
const time = $("#timer");
const weather = $("#weather");
let timer;
const morningImg =
  "https://images.unsplash.com/photo-1514241516423-6c0a5e031aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9ybmluZ2ltYWdlfGVufDB8fDB8fHww";
const nightImg =
  "https://plus.unsplash.com/premium_photo-1671336757490-1249b2ccb020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D";

function displayUI() {
    displayBackground()
  displayTimer();
  displayWeather();
}
displayUI();

async function displayWeather() {
  const data = await getWeather("Mangalore");

  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weather.innerHTML = `
    <img src="${iconUrl}" alt="Weather Icon" width="40">
    ${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}
  `;
}

async function getWeather(city) {
  const apiKey = "70c4d22dc812a64e9a3b0b48bb887de3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
}

function displayBackground() {
  dashboardImg.setAttribute("src", getBackground());
}

function displayTimer() {
  time.textContent = `Time-${getTimer()}`;

  timer = setInterval(() => {
    time.textContent = `Time-${getTimer()}`;
  }, 1000);
}
function closeTimer() {
  setTimeout(() => {
    clearInterval(timer);
  }, 5000);
}

function getTimer() {
  let time = new Date();

  return time.toTimeString().split(" ")[0];
}

function getBackground() {
  const timer = new Date().getHours();
  if (timer >= 19) {
    return nightImg;
  }
  return morningImg;
}
