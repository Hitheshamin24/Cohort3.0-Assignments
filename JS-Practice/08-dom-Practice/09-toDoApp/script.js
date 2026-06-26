const ul = document.querySelector("ul");
let btn = document.querySelector("button");
let input = document.querySelector("input");

btn.addEventListener("click", () => {
  let li = document.createElement("li");
  li.textContent = input.value;
  ul.appendChild(li);
  input.value = "";
});
