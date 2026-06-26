let message = document.querySelector("#message");
let button = document.querySelector("button");
let showing = true;

// button.addEventListener("click", () => {
//   if (showing) {
//     message.style.display = "none";
//     showing = false;
//   } else {
//     message.style.display = "block";
//     showing = true;
//   }
// });

button.addEventListener('click',()=>{
    message.classList.toggle('hide')
})