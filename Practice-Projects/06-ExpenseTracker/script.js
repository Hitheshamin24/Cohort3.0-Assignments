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

let registeredUsers = getStorage("registeredUsers") || [];
let user = getStorage("user");

function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function displayUI() {
  if (user) {
    main.innerHTML = `Hello ${user.username} <button onclick="logout()">Logout</button>
`;
    loginCard.style.display = "none";
    registerCard.style.display = "none";
    main.style.display = "flex";
  } else {
    main.style.display = "none";
    loginCard.style.display = "flex";
  }
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
  form.reset;
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
