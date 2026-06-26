let btn = document.querySelector("#btn");
let changed = false;
btn.addEventListener("click", () => {
  if (!changed) {
    document.body.style.backgroundColor = "lightblue";
    changed = true;
  } else {
    document.body.style.backgroundColor = "white";
    changed = false;
  }
});
