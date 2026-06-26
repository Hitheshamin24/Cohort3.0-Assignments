const textArea = document.querySelector("textarea");
let p = document.querySelector("p");
let count = 0;
textArea.addEventListener("input", () => {
  let value = textArea.value;
  p.innerHTML = `Character count - ${value.length}`;
});
