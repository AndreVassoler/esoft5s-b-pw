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
  li.style.border = "1px solid black"; // Adicionando uma borda preta de 1px

  const taskTitle = document.createElement("p");
  taskTitle.textContent = task.title;
  li.appendChild(taskTitle);

  if (task.description) {
    const taskDescription = document.createElement("p");
    const descriptionText = task.description.replace(/\n/g, "<br>"); // Substituindo quebras de linha por elementos <br>
    taskDescription.innerHTML = descriptionText; // Usando innerHTML para interpretar as quebras de linha como HTML
    li.appendChild(taskDescription);
  }

  list.appendChild(li);

  const lineBreak = document.createElement("br"); // Adicionando uma quebra de linha após cada tarefa
  list.appendChild(lineBreak);
}
