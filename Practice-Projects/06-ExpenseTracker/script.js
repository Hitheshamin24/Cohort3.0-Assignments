const $ = (selector) => document.querySelector(selector);

let loginCard = $(".login-card");
let registerCard = $(".register-card");
let gotToLogin = $("#gotoLogin");
let gotToRegister = $("#gotoRegister");
let registerBtn = $("#register-btn");
let loginBtn = $("#login-btn");
let registerForm = $("#register-form");
let loginForm = $("#login-form");
let main = $(".main");

let sideBtns = document.querySelectorAll(".side-btn");
let dashboardBtn = $("#dashboard-btn");
let settingBtn = $("#setting-btn");

let mode = $(".toggle");
let toggleKey = mode.querySelector(".round");
let dashboardPage = $(".dashboard-page");
let settingPage = $(".setting-page");
let mainColumn = $(".main-columns");

let transactionBtn = $("#transaction-btn");
let transactionModal = $(".transaction-modal");
let closeBtn = $("#close-btn");
let theme = localStorage.getItem("theme") || "light";

// transaction form and btn
let transactionForm = $("#add-transaction");
let saveTransactionBtn = $("#save-transaction");
let transactionArr = [];

// stat card budget allocate karne keliye
let statCard = document.querySelectorAll(".card");

function showTransactionCalculation() {
  const result = calculateTransactionDetails();
  statCard.forEach((card, index) => {
    let h1 = card.querySelector("h1");
    h1.textContent = result[index];
  });
}

function displayTransactionModal() {
  transactionModal.style.display = "flex";
}
function closeTransactionModal() {
  transactionModal.style.display = "none";
}

// add transaction
function addTransaction(obj) {
  transactionArr.push(obj);
}
function generateId() {
  let id = 0;
  return () => {
    id++;
    return id;
  };
}
let id = generateId();

function applyTheme(theme) {
  if (theme === "dark") {
    mode.classList.add("active");
    toggleKey.classList.add("active");
    document.body.classList.add("dark");
  } else {
    mode.classList.remove("active");
    toggleKey.classList.remove("active");
    document.body.classList.remove("dark");
  }
}
applyTheme(theme);
let registeredUsers = getStorage("registeredUsers") || [];
let user = getStorage("user");

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function calculateTransactionDetails() {
  let currentBalance = transactionArr.reduce((acc, curr) => {
    return curr.type === "Income" ? acc + curr.amount : acc - curr.amount;
  }, 0);
  let totalIncome = transactionArr
    .filter((e) => e.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  let totalExpense = transactionArr
    .filter((e) => e.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  let totalTransaction = transactionArr.length;
  return [currentBalance, totalIncome, totalExpense, totalTransaction];
}
let cashFlow=null
function cashFlowAnalysis() {
  let chart = $("#cashflow");

  if(cashFlow) cashFlow.destroy()

  let result = calculateTransactionDetails();
 cashFlow= new Chart(chart, {
    type: "bar",
    data: {
      labels: ["Income vs Expense"],
      datasets: [
        {
          label: "income ",
          data: [result[1]],
          backgroundColor: "#277243",
        },
        {
          label: "expense",
          data: [result[2]],
          backgroundColor: "#9d2323",
        },
      ],
    },
  });
}

function displayUI() {
  if (user) {
    loginCard.style.display = "none";
    registerCard.style.display = "none";
    document.querySelector("#dashboard-view").style.display = "flex";
  } else {
    loginCard.style.display = "flex";
    document.querySelector("#dashboard-view").style.display = "none";
  }
  showTransactionCalculation();
  cashFlowAnalysis();
}
// handling login registration and logout
function register(username, password) {
  if (username.trim() === "" || password.trim() === "") return;
  const exists = registeredUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
  if (exists) {
    alert("Username already exists");
    return;
  }
  let currency = "₹";
  let obj = { username, password, currency };
  registeredUsers.push(obj);
  setToLocalStorage("registeredUsers", registeredUsers);
  registerCard.style.display = "none";
  loginCard.style.display = "flex";

  alert("Registration Successful ");
}
function login(username, password) {
  if (username.trim() === "" || password.trim() === "") return;

  const currentUser = registeredUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
  if (!currentUser) {
    alert(`Username ${username}  is not found`);
    return;
  }
  if (currentUser.password !== password) {
    alert("Incorrect Password");
    return;
  }

  user = currentUser;
  setToLocalStorage("user", user);
  displayUI();
  alert("Login successful");
  return;
}
function logout() {
  if (!user) return;

  const isConfirmed = confirm(
    `${user.username}, are you sure you want to logout?`,
  );

  if (!isConfirmed) return;

  removeFromLocaleStorage("user");
  user = null;
  displayUI();
}

// functions to set get remove from the localStorage
function removeFromLocaleStorage(key) {
  localStorage.removeItem(key);
}
function setToLocalStorage(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}
function getFormValues(form) {
  return {
    username: form.username.value.trim(),
    password: form.password.value.trim(),
  };
}

// function to clear form
function clearForm(form) {
  form.reset();
}
// event listener functions
gotToRegister.addEventListener("click", () => {
  registerCard.style.display = "flex";
  loginCard.style.display = "none";
});
gotToLogin.addEventListener("click", () => {
  loginCard.style.display = "flex";
  registerCard.style.display = "none";
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { username, password } = getFormValues(registerForm);
  register(username, password);
  clearForm(registerForm);
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { username, password } = getFormValues(loginForm);
  login(username, password);
  clearForm(loginForm);
});

displayUI();

// sideButton active functions
sideBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sideBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

settingBtn.addEventListener("click", () => {
  dashboardPage.style.display = "none";
  mainColumn.style.display = "none";
  settingPage.style.display = "block";
});
dashboardBtn.addEventListener("click", () => {
  dashboardPage.style.display = "block";
  mainColumn.style.display = "grid";
  settingPage.style.display = "none";
});

mode.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

transactionBtn.addEventListener("click", () => {
  displayTransactionModal();
});
closeBtn.addEventListener("click", () => {
  closeTransactionModal();
});

saveTransactionBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let type = transactionForm[0].value;
  let description = transactionForm[1].value;
  let amount = parseFloat(transactionForm[2].value);
  let date = transactionForm[3].value;
  let category = transactionForm[4].value;

  let obj = { id: id(), type, description, amount, date, category };
  addTransaction(obj);
  console.log(transactionArr);
  displayUI()
  showTransactionCalculation();
  transactionForm.reset();
  closeTransactionModal();
});
