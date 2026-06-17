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
  let title = form[0].value;
  let category = form[1].value;
  let status = form[2].value;

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
    updateIndex=null
    
  } else taskArray.push(obj);
  form.reset();
  closeForm();
  displayTasks();
}
function displayTasks() {
  task.innerHTML = "";
  taskArray.forEach((elem, index) => {
    let taskCard = document.createElement("div");
    let taskStatus = document.createElement("div");
    let h3 = document.createElement("h3");
    let title = document.createTextNode(elem.title);
    let updateStatusBtn = document.createElement("button");
    let statusText = document.createTextNode(elem.status);
    h3.append(title);
    updateStatusBtn.append(elem.status);
    taskCard.classList.add("taskCard");
    taskStatus.classList.add("taskStatus");
    taskStatus.append(h3, updateStatusBtn);
    taskCard.append(taskStatus);

    let p = document.createElement("p");
    let category = document.createTextNode(elem.category);
    p.append(category);
    taskCard.append(p);

    let btns = document.createElement("div");
    btns.classList.add("btns");
    let updateBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    updateBtn.classList.add("btn");
    deleteBtn.classList.add("btn");
    updateBtn.setAttribute("id", "update");
    let updateText = document.createTextNode("Update");
    let deleteText = document.createTextNode("Delete");
    deleteBtn.setAttribute("id", "delete");
    updateBtn.append(updateText);
    deleteBtn.append(deleteText);
    btns.append(updateBtn, deleteBtn);
    taskCard.append(btns);

    // add data value
    taskCard.dataset.id = elem.id;
    taskCard.dataset.status = elem.status;
    taskCard.dataset.category = elem.category;

    updateStatusBtn.dataset.action = "status";
    updateBtn.dataset.action = "update";
    deleteBtn.dataset.action = "delete";
    updateStatusBtn.dataset.index = index;
    updateBtn.dataset.index = index;
    deleteBtn.dataset.index = index;
    task.append(taskCard);
    
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

task.addEventListener("click", (e) => {
  let action = e.target.dataset.action;
  let index = e.target.dataset.index;
  console.log(action, index);
  if (action == "status") updateStatus(index);
  else if (action == "update") updateTask(index);
  else if (action == "delete") deleteTask(index);
});

const attributeDemo =
  document.querySelector("#attributeDemo");

attributeDemo.addEventListener("click", () => {
  const div = document.createElement("div");

  div.setAttribute("data-role", "student");

  console.log(
    "getAttribute:",
    div.getAttribute("data-role")
  );

  console.log(
    "hasAttribute:",
    div.hasAttribute("data-role")
  );

  div.removeAttribute("data-role");

  console.log(
    "After remove:",
    div.hasAttribute("data-role")
  );

  div.setAttribute("data-role", "developer");

  console.log(
    "After set:",
    div.getAttribute("data-role")
  );
});
const propertyDemo =
  document.querySelector("#propertyDemo");

const demoInput =
  document.querySelector("#demoInput");

propertyDemo.addEventListener("click", () => {
  console.log(
    "Attribute:",
    demoInput.getAttribute("value")
  );

  console.log(
    "Property:",
    demoInput.value
  );
});