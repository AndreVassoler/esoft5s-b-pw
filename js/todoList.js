const form = document.getElementById("form-todo");
const input = document.getElementById("input-todo");
const inputDescription = document.getElementById("input-description");
const list = document.getElementById("list-todo");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => addTaskToList(task));

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = input.value.trim();
  const description = inputDescription.value.trim();

  if (title !== "") {
    const task = { title, description };
    addTaskToList(task);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    inputDescription.value = "";
    input.focus();
  }
});

function addTaskToList(task) {
  const li = document.createElement("li");

  const taskTitle = document.createElement("p");
  taskTitle.textContent = task.title;
  li.appendChild(taskTitle);

  if (task.description) {
    const taskDescription = document.createElement("p");
    taskDescription.textContent = task.description;
    li.appendChild(taskDescription);
  }

  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", function () {
    list.removeChild(li);
    const index = tasks.findIndex(t => t.title === task.title && t.description === task.description);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });

  li.appendChild(button);
  list.appendChild(li);
}
