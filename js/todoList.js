function callDialog(taskIndex, task, description) {
  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
      <form id="edit-form">
          <input type="text" id="edit-task" name="task" value="${task}">
          <br>
          <textarea id="edit-description" name="description">${description}</textarea>
          <menu>
              <button type="submit" id="edit-dialog">Editar Tarefa</button>
              <button type="button" id="cancel-dialog">Cancelar</button>
          </menu>
      </form>
  `;
  document.body.appendChild(dialog);

  document.getElementById('cancel-dialog').addEventListener('click', function () {
      dialog.close();
      dialog.remove();
  });

  document.getElementById('edit-form').addEventListener('submit', function (e) {
      e.preventDefault();
      const updatedTask = document.getElementById('edit-task').value.trim();
      const updatedDescription = document.getElementById('edit-description').value.trim();
      if (updatedTask !== '' && updatedDescription !== '') {
          updateTask(taskIndex, updatedTask, updatedDescription);
          dialog.close();
          dialog.remove();
      }
  });

  dialog.showModal();
}

function callTask(event) {
  event.preventDefault();

  var taskInput = document.getElementById('todo-name');
  var descriptionInput = document.getElementById('todo-description');
  var taskText = taskInput.value.trim();
  var descriptionText = descriptionInput.value.trim();

  if (taskText !== '' && descriptionText !== '') {
      var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

      var newTask = {
          task: taskText,
          description: descriptionText
      };

      tasks.push(newTask);

      localStorage.setItem('tasks', JSON.stringify(tasks));

      taskInput.value = '';
      descriptionInput.value = '';

      displayTasks();
  }
}

function updateTask(taskIndex, updatedTask, updatedDescription) {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks[taskIndex] = {
      task: updatedTask,
      description: updatedDescription
  };
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function displayTasks() {
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  var taskList = document.getElementById('task-list');

  taskList.innerHTML = '';

  tasks.forEach(function (task, index) {
      var listItem = document.createElement('li');
      var taskTitle = document.createElement('span');
      var descriptionText = document.createTextNode(task.description);
      var buttonTask = document.createElement('button');

      buttonTask.classList.add('buttonClass');
      buttonTask.textContent = '✏️';
      buttonTask.title = 'Editar tarefa';
      buttonTask.onclick = () => {
          callDialog(index, task.task, task.description);
      };

      taskTitle.textContent = task.task + ':';
      taskTitle.className = 'title-bold';
      listItem.appendChild(taskTitle);
      listItem.appendChild(document.createElement('br'));
      listItem.appendChild(descriptionText);
      listItem.appendChild(buttonTask);
      taskList.appendChild(listItem);
  });
}

window.onload = function () {
  displayTasks();
};
