const createBtn = document.querySelector("#create");
const formDiv = document.querySelector(".form");
const close = document.querySelector(".close");
const form = document.querySelector("form");
const task = document.querySelector(".task");

const taskArray = [];
let updateIndex = null;
function displayForm() {
  formDiv.style.display = "flex";
}
function closeForm() {
  formDiv.style.display = "none";
}
function createTask() {
  title = form[0].value;
  category = form[1].value;
  status = form[2].value;

  if (title.trim() === "" || category.trim() === "" || status.trim() === "")
    return;
  // console.log(title);
  // console.log(category);
  // console.log(status);

  let obj = {
    id: taskArray.length,
    title,
    category,
    status,
  };
  if (updateIndex !== null) {
    obj.id = updateIndex;
    taskArray[updateIndex] = obj;
  } else taskArray.push(obj);
  form.reset();
  closeForm();
  displayTasks();
}
function displayTasks() {
  task.innerHTML = "";
  taskArray.forEach((elem, index) => {
    task.innerHTML += `<div class="taskCard">
          <div class="taskStatus">
            <h3>${elem.title}</h3>
            <button onclick="updateStatus(${index})">${elem.status}</button>
          </div>
          <p>Category-${elem.category}</p>
          <div class="btns">
            <button onclick="updateTask(${index})" class="btn" id="update">Update</button>
            <button onclick="deleteTask(${index})" class="btn" id="delete">Delete</button>
          </div>
        </div>`;
  });
}

// Update status
function updateStatus(index) {
  // console.log(taskArray[index]);
  // console.log(taskArray[index].status);
  if (taskArray[index].status === "Pending") {
    taskArray[index].status = "Completed";
  } else {
    taskArray[index].status = "Pending";
  }
  displayTasks();
}
function updateTask(index) {
  updateIndex = index;
  let task = taskArray[index];
  // console.log(task);
  form[0].value = task.title;
  form[1].value = task.category;
  form[2].value = task.status;
  displayForm();
}
function deleteTask(index) {
  taskArray.splice(index, 1);
  displayTasks();
}

displayTasks();
createBtn.addEventListener("click", () => {
  displayForm();
});

close.addEventListener("click", () => {
  closeForm();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  createTask();
});
