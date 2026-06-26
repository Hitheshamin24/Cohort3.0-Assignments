let darkMode = document.querySelector(".dark");
let btns = document.querySelectorAll("button");

let card = document.querySelector(".card");
darkMode.addEventListener("click", () => {
  card.classList.toggle("darkMode");
  document.body.classList.toggle("darkMode");
  btns.forEach((btn) => {
    btn.classList.toggle("btnDark");
  });
  darkMode.textContent =
    darkMode.textContent === "Dark mode" ? "Light Mode " : "Dark";
});
