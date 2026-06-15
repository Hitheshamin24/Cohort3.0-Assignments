const form = document.querySelector("form");
const nameInp = document.querySelector("#name");
const emailInp = document.querySelector("#email");
const users = document.querySelector(".users");
const url = document.querySelector("#url");
let arr = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    dob: "1998-05-14",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    dob: "2000-11-22",
  },
  {
    id: 3,
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    dob: "1997-08-09",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    dob: "2001-02-17",
  },
  {
    id: 5,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    dob: "1999-12-30",
  },
];

const ui = () => {
  users.innerHTML = "";
  arr.forEach((elem, index) => {
    users.innerHTML += `<div class="user-card">
        <div class="img">
          <img src="${elem.image}" alt="" />
        </div>
        <div class="text">
          <h2>Name:-${elem.name}</h2>
          <h3>Email:-${elem.email}</h3>
        </div>
        <div class="actions">
            <button onclick="editCard(${index})" id="edit">Edit</button>
            <button onclick="deleteCard(${index})"id="del">Delete</button>
        </div>
      </div>`;
  });
};

ui();
let editIndex = -1;
form.addEventListener("submit", (events) => {
  events.preventDefault();
  
  let name = nameInp.value;
  let email = emailInp.value;
  let image = url.value;
  if (editIndex === -1) {
    arr.push({ name, email, image });
  } else {
    arr[editIndex].name = name;
    arr[editIndex].email = email;
    arr[editIndex].image = image;
    editIndex = -1;
  }
  if (name.trim() == "" || email.trim() == "") return;

  ui();

  form.reset(); //to reset the input values
  
});



// delete
function deleteCard(index) {
  arr.splice(index, 1);
  ui();
}

// /edit
let editCard = (index) => {
  console.log(arr[index]);
  let name = arr[index].name;
  let email = arr[index].email;
  let image = arr[index].image;
  nameInp.value = name;
  emailInp.value = email;
  url.value = image;
  editIndex = index;
};
