const form = document.getElementById("form-todo");
const input = document.getElementById("input-todo");
const list = document.getElementById("list-todo");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => addTaskToList(task));

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text !== "") {
    addTaskToList(text);
    tasks.push(text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    input.focus();
  }
});

function addTaskToList(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}
