let button = document.querySelector("button");
let output = document.querySelector("#output");
let input = document.querySelector("#userName");
button.addEventListener("click", () => {
  if (input.value.trim() === "") return;
  output.innerHTML = `${input.value}`;
});
