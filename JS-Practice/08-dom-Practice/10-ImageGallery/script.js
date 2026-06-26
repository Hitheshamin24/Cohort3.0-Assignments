let img = document.querySelector("#image");
let next = document.querySelector("#next");
let prev = document.querySelector("#prev");
let imgArray = [
  "https://plus.unsplash.com/premium_photo-1782407332324-2ec04e3b9233?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1782153577845-d4acd4a39de8?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1782177386264-9b952d2440ec?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1782214643273-ede7e4ceed16?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
];
let index = 0;

next.addEventListener("click", () => {
  if (index === imgArray.length) index = 0;
  if (index < imgArray.length) {
    img.setAttribute('src',`${imgArray[index++]}`)
  }
});
prev.addEventListener("click", () => {
  if (index <0) index = imgArray.length;
  if (index < imgArray.length) {
    img.setAttribute('src',`${imgArray[index--]}`)
  }
});
