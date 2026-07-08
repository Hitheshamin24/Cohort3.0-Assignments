// dom selectors
const $ = (selector) => document.querySelector(selector);

const dashboardImg = $("#dashboard-img");
const time = $("#timer");
const weather = $("#weather");
const featureView = $(".feature-view");

// motivation card
const motivationCard = $("#motivation-card");
const motivationCardPopup = $(".motivation-card-view");
const closeMotivationPopup = $("#close-motivation-card");

const todoListCard = $("#todo-list");
const todoCardPopup = $(".todolist-card-view");
const todoContainer = $(".todo-container");
const closeTaskPopup = $("#close-todo-card");
const taskContainer = $(".tasks");
const addTaskBtn = $("#add-task");

const plannerCard = $("#daily-planner");
const plannerCardPopup = $(".daily-planner-view");
const closePlannerPopup = $("#close-planner");
const plannerContainer = $(".planner-container");
const addPlanBtn = $("#save-plan");
const plannerList = $(".planner-list");

const pomodoroCardPopup = $(".pomodoro-view");
const closePomodoroPopup = $("#close-pomodoro");
const pomodoroCard = $("#pomodoro-card");
const pomodoroTimer = $("#pomodoro-timer");
const pomodoroStart = $("#start-timer");
const pomodoroPause = $("#pause-timer");
const pomodoroReset = $("#reset-timer");
const sessionCount = $("#session-count");
const completedCount = $("#completed-count");
// variables
let timer;
let updateIndex = null;
const morningImg =
  "https://images.unsplash.com/photo-1514241516423-6c0a5e031aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9ybmluZ2ltYWdlfGVufDB8fDB8fHww";
const nightImg =
  "https://plus.unsplash.com/premium_photo-1671336757490-1249b2ccb020?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmlnaHQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D";
let currentPage = getLocalStorage("currentPage") || "";

const defaultTime = 25 * 60;
let remainingTime = defaultTime;
let session = getLocalStorage("sessionCount") || 0;
let completed = getLocalStorage("completedCount") || 0;
const tasks = getLocalStorage("todoList") || [];
const dailyPlans = getLocalStorage("dailyPlans") || [];

function setToLocalStorage(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}
function getLocalStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

// display fun

function displayUI() {
  displayBackground();

  setInterval(displayBackground, 60000);
  displayTimer();
  displayWeather();
}
function restoreCurrentPage() {
  if (currentPage == "motivationCard") showMotivationCardPopup();
  else if (currentPage === "todoCard") showTodoCardPopup();
  else if (currentPage === "plannerCard") showPlannerCardPopup();
  else if (currentPage === "pomodoroCard") showPomodoroCardPopup();
  else {
    hidePopup(motivationCardPopup);
    hidePopup(todoCardPopup);
    hidePopup(plannerCardPopup);
    hidePopup(pomodoroCardPopup);
  }
}

function initializeApp() {
  restoreCurrentPage();
  displayUI();
}
// ui functions
function displayBackground() {
  dashboardImg.setAttribute("src", getBackground());
}

function displayTimer() {
  time.textContent = `Time-${getTimer()}`;
  clearInterval(timer);

  timer = setInterval(() => {
    time.textContent = `Time-${getTimer()}`;
  }, 1000);
}

async function displayWeather() {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await getWeather(latitude, longitude);
      showWeather(data);
    },

    async () => {
      const data = await getWeatherByCity("Bhopal");
      showWeather(data);
    },
  );
}
function showWeather(data) {
  if (!data || data.cod !== 200) {
    weather.textContent = "Unable to fetch weather";
    return;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const cityName = data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  weather.innerHTML = `
        <img src="${iconUrl}" alt="Weather Icon" width="40">
        ${cityName}: ${Math.round(data.main.temp)}°C, ${data.weather[0].main}
      `;
}
async function showMotivationCardPopup() {
  showPopup(motivationCardPopup, "motivationCard");
  const quote = motivationCardPopup.querySelector("#quote");
  const author = motivationCardPopup.querySelector("#author");

  motivationCardPopup.style.display = "flex";
  quote.textContent = "Loading...";
  author.textContent = "";
  try {
    const data = await getQuotes();
    if (!data || !data.length) {
      quote.textContent = "Unable to fetch quote.";
      author.textContent = "";
      return;
    }
    quote.textContent = data[0].quote;
    author.textContent = data[0].author;
  } catch (err) {
    quote.textContent = "Failed to load quote.";
  }
  currentPage = "motivationCard";
  setToLocalStorage("currentPage", currentPage);
}

function showTodoCardPopup() {
  showPopup(todoCardPopup, "todoCard");
  displayTasks();
}

function showPlannerCardPopup() {
  showPopup(plannerCardPopup, "plannerCard");
  displayDailyPlans();
}

function showPomodoroCardPopup() {
  sessionCount.textContent = session;
  completedCount.textContent = completed;
  showPopup(pomodoroCardPopup, "pomodoroCard");
}

function showPopup(popup, pageName) {
  popup.style.display = "flex";
  featureView.style.display = "none";

  currentPage = pageName;
  setToLocalStorage("currentPage", currentPage);
}
function hidePopup(popup) {
  popup.style.display = "none";
  featureView.style.display = "flex";
  currentPage = "featureView";
  setToLocalStorage("currentPage", currentPage);
}

function addTasks(obj) {
  if (!obj.title.trim()) {
    alert("Task cannot be empty");
    return;
  }
  const exists = tasks.some(
    (task) =>
      task.title.trim().toLowerCase() === obj.title.trim().toLowerCase(),
  );

  if (exists) {
    alert("Task already exists");
    return;
  }
  tasks.push(obj);
  setToLocalStorage("todoList", tasks);
  displayTasks();
}

function displayTasks() {
  taskContainer.innerHTML = tasks
    .map(
      (elem, idx) =>
        `    
            <div class="task-card">
            <div class="task-info">
              <h1>
                ${elem.title}
               ${elem.isImp ? '<sup class="important-badge">IMP</sup>' : ""}
              </h1>
            </div>
            <span onclick="updateStatus(${idx})" style="background:${elem.status === "Completed" ? "#4c9b02" : "#b40505"} " class="status">${elem.status}</span>
            <button onclick="updateImportance(${idx})" class="important-btn">Important</button>
            <button onclick="deleteTask(${idx})" class="delete-btn">Delete</button>
          </div>`,
    )
    .join("");
}
function updateStatus(idx) {
  let task = tasks[idx];
  if (task.status == "Pending") {
    task.status = "Completed";
  } else {
    task.status = "Pending";
  }
  setToLocalStorage("todoList", tasks);

  displayTasks();
}
function updateImportance(idx) {
  let task = tasks[idx];
  task.isImp = task.isImp ? false : true;
  setToLocalStorage("todoList", tasks);

  displayTasks();
}
function deleteTask(idx) {
  tasks.splice(idx, 1);
  setToLocalStorage("todoList", tasks);
  displayTasks();
}

function displayDailyPlans() {
  sortDailyPlans();
  plannerList.innerHTML = dailyPlans
    .map(
      (elem, idx) =>
        `<div class="planner-card">
            <div class="planner-details">
              <h3>${elem.time}</h3>
              <p>${elem.plan}</p>
            </div>

            <div class="planner-actions">
              <button onclick="editPlans(${idx})">Edit</button>
              <button onclick="deletePlans(${idx})">Delete</button>
            </div>
          </div>`,
    )
    .join("");
}
function editPlans(idx) {
  let planToEdit = dailyPlans[idx];

  let [clock, period] = planToEdit.time.split(" ");
  let [hour, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  let time = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  plannerContainer.querySelector("#task-name").value = planToEdit.plan;
  plannerContainer.querySelector("#task-time").value = time;
  updateIndex = idx;
}

function addDailyPlans(obj) {
  const exists = dailyPlans.some((plans, index) => {
    if (index === updateIndex) return false;
    return (
      plans.plan.toLowerCase().trim() === obj.plan.toLowerCase().trim() &&
      plans.time === obj.time
    );
  });
  if (exists) {
    alert("Plan already exists");
    return;
  }
  if (!obj.plan.trim()) {
    alert("Plan cannot be empty");
    return;
  }
  updateIndex !== null ? (dailyPlans[updateIndex] = obj) : dailyPlans.push(obj);
  updateIndex = null;
  setToLocalStorage("dailyPlans", dailyPlans);
  displayDailyPlans();
}
function sortDailyPlans() {
  dailyPlans.sort((a, b) => {
    const toMinutes = (time) => {
      let [clock, period] = time.split(" ");
      let [hour, minutes] = clock.split(":").map(Number);
      if (period === "PM" && hour !== 12) {
        hour += 12;
      }
      if (period === "AM" && hour === 12) {
        hour = 0;
      }
      return hour * 60 + minutes;
    };
    return toMinutes(a.time) - toMinutes(b.time);
  });
}
function deletePlans(idx) {
  dailyPlans.splice(idx, 1);
  setToLocalStorage("dailyPlans", dailyPlans);
  displayDailyPlans();
}

let interval = null;

function displayPomodoroTimer() {
  if (interval) return;
  if (remainingTime === defaultTime) session++;
  setToLocalStorage("sessionCount", session);
  sessionCount.textContent = session;

  const endTime = Date.now() + remainingTime * 1000;

  interval = setInterval(() => {
    remainingTime = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));

    const [minutes, seconds] = getPomodoroTimer(remainingTime);

    pomodoroTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (remainingTime <= 0) {
      completed++;
      setToLocalStorage("completedCount", completed);
      completedCount.textContent = completed;
      clearInterval(interval);
      interval = null;
      pomodoroStart.disabled = false;
      alert("Pomodoro Completed!");
    }
  }, 1000);
}

function pausePomodoroTimer() {
  clearInterval(interval);
  interval = null;
  pomodoroStart.disabled = false;
}
function getPomodoroTimer(remainingTime) {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;
  return [minutes, seconds];
}
function resetPomodoroTimer() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
  remainingTime = defaultTime;
  pomodoroStart.disabled = false;
  const [minutes, seconds] = getPomodoroTimer(remainingTime);
  pomodoroTimer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
// api functions
async function getWeather(lat, lon) {
  const apiKey = "70c4d22dc812a64e9a3b0b48bb887de3";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch weather");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function getWeatherByCity(city) {
  const apiKey = "70c4d22dc812a64e9a3b0b48bb887de3";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch weather");
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getQuotes() {
  const apiKey = "l5Y3as4DVyGPVQIm5eT8BISMatxGoHhUMbuRGBKh";
  const url = "https://api.api-ninjas.com/v2/quoteoftheday";
  try {
    const response = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    if (!response.ok) {
      throw new Error("Unable to fetch");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
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
  hidePopup(motivationCardPopup);
});

todoListCard.addEventListener("click", () => {
  showTodoCardPopup();
});
closeTaskPopup.addEventListener("click", () => {
  hidePopup(todoCardPopup);
});
plannerCard.addEventListener("click", () => {
  showPlannerCardPopup();
});
closePlannerPopup.addEventListener("click", () => {
  hidePopup(plannerCardPopup);
});

pomodoroCard.addEventListener("click", () => {
  showPomodoroCardPopup();
});
closePomodoroPopup.addEventListener("click", () => {
  hidePopup(pomodoroCardPopup);
});

addTaskBtn.addEventListener("click", () => {
  const input = todoContainer.querySelector("input");
  let title = input.value;
  let status = "Pending";
  let isImp = false;
  let obj = {
    title,
    status,
    isImp,
  };
  addTasks(obj);
  input.value = "";
});

addPlanBtn.addEventListener("click", () => {
  let plan = plannerContainer.querySelector("#task-name").value;
  let planTime = plannerContainer.querySelector("#task-time").value;

  let hour, minutes;

  if (planTime.trim()) {
    [hour, minutes] = planTime.split(":").map(Number);
  } else {
    const now = new Date();
    hour = now.getHours();
    minutes = now.getMinutes();
  }

  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  const time = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${suffix}`;

  const planObj = {
    time,
    plan,
  };
  plannerContainer.querySelector("#task-name").value = "";
  plannerContainer.querySelector("#task-time").value = "";
  addDailyPlans(planObj);
});

pomodoroStart.addEventListener("click", () => {
  pomodoroStart.disabled = true;

  displayPomodoroTimer();
});
pomodoroPause.addEventListener("click", () => pausePomodoroTimer());
pomodoroReset.addEventListener("click", () => resetPomodoroTimer());
initializeApp();
