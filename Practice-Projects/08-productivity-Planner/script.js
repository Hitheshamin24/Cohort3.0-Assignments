// dom selectors
const $ = (selector) => document.querySelector(selector);

const dashboardImg = $("#dashboard-img");
const time = $("#timer");
const weather = $("#weather");
const featureView = $(".feature-view");
const motivationCard = $("#motivation-card");
const motivationCardPopup = $(".motivation-card-view");
const closeMotivationPopup = $("#close-motivation-card");

// variables
let timer;
const morningImg =
  "https://images.unsplash.com/photo-1514241516423-6c0a5e031aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9ybmluZ2ltYWdlfGVufDB8fDB8fHww";
const nightImg =
  "https://plus.unsplash.com/premium_photo-1671336757490-1249b2ccb020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D";

// display fun
function displayUI() {
  displayBackground();
  displayTimer();
  displayWeather();
}

// ui functions
function displayBackground() {
  dashboardImg.setAttribute("src", getBackground());
}

function displayTimer() {
  time.textContent = `Time-${getTimer()}`;

  timer = setInterval(() => {
    time.textContent = `Time-${getTimer()}`;
  }, 1000);
}

async function displayWeather() {
  const data = await getWeather("Mangalore");

  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  if (data.cod !== 200 || data.cod === "404") {
    weather.innerHTML = `
    Unable to fetch weather data `;
    return;
  }
  weather.innerHTML = `
    <img src="${iconUrl}" alt="Weather Icon" width="40">
    ${data.name}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}
  `;
}
async function showMotivationCardPopup() {
  featureView.style.display = "none";
  const quote = motivationCardPopup.querySelector("#quote");
  const author = motivationCardPopup.querySelector("#author");

  motivationCardPopup.style.display = "flex";
  quote.textContent = "Loading...";
  author.textContent = "";
  try {
    const data = await getQuotes();
    if (!data[0] || !data.length) {
      quote.textContent = "Unable to fetch quote.";
      author.textContent = "";
      return;
    }
    quote.textContent = data[0].quote;
    author.textContent = data[0].author;
  } catch (err) {
    quote.textContent = "Failed to load quote.";
  }
}
function hideMotivationCardPopup() {
  motivationCardPopup.style.display = "none";
  featureView.style.display = "flex";
}

// api functions
async function getWeather(city) {
  const apiKey = "70c4d22dc812a64e9a3b0b48bb887de3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getQuotes() {
  const apiKey = "l5Y3as4DVyGPVQIm5eT8BISMatxGoHhUMbuRGBKh";
  const url = "https://api.api-ninjas.com/v2/quoteoftheday";
  const response = await fetch(url, {
    headers: {
      "X-Api-Key": apiKey,
    },
  });
  const data = await response.json();
  return data;
}


// helper functions
function getTimer() {
  let time = new Date();

  return time.toTimeString().split(" ")[0];
}

function getBackground() {
  const hour = new Date().getHours();
  if (hour >= 19) {
    return nightImg;
  }
  return morningImg;
}

// event listeners
motivationCard.addEventListener("click", () => {
  showMotivationCardPopup();
});
closeMotivationPopup.addEventListener("click", () => {
  hideMotivationCardPopup();
});

displayUI();
