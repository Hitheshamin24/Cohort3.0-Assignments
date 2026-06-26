let name = document.querySelector("#name");
let course = document.querySelector("#course");
let add = document.querySelector("button");
let container = document.querySelector("#students");
let count = document.querySelector("#count");
let students = [];

add.addEventListener("click", () => {
  let nameV = name.value.trim();
  let courseV = course.value.trim();
  if (nameV === "" || courseV === "") return;
  students.push({
    name: nameV,
    course: courseV,
  });
  renderStudents();
  name.value = "";
  course.value = "";
});

function renderStudents() {

  container.innerHTML = "";
  students.forEach((student, idx) => {
    const card = document.createElement("div");
    card.classList = "card";
    const h1 = document.createElement("h1");
    h1.textContent = ` ${student.name}`;
    const p = document.createElement("p");
    p.textContent = ` ${student.course}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = `Delete`;

    card.append(h1, p, deleteBtn);
    container.append(card);
    deleteBtn.addEventListener("click", () => {
      students.splice(idx, 1);
      renderStudents()
    });

  });
  count.textContent=students.length

}
