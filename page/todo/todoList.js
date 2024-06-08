const taskKey = '@tasks';

// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault(); // Evita o recarregamento da página
    const taskId = new Date().getTime();
    const taskList = document.querySelector('#taskList');

    const form = document.querySelector('#taskForm');
    const formData = new FormData(form);

    const taskTitle = formData.get('title');
    const taskDescription = formData.get('description');

    const li = document.createElement('li');
    li.id = taskId;
    li.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDescription}</p>
        <button onclick="editTask(${taskId})">✏️</button>
        <button onclick="deleteTask(${taskId})">❌</button>
    `;

    taskList.appendChild(li);

    // Salvar tarefas no localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
    localStorage.setItem(taskKey, JSON.stringify(tasks));

    form.reset();
}

// Função para editar tarefa
function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const taskElement = document.getElementById(taskId);
        taskElement.innerHTML = `
            <input type="text" id="editTitle${taskId}" value="${task.title}">
            <input type="text" id="editDescription${taskId}" value="${task.description}">
            <button onclick="saveTask(${taskId})">Salvar</button>
            <button onclick="cancelEdit(${taskId})">Cancelar</button>
        `;
    }
}

// Função para salvar tarefa editada
function saveTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const newTitle = document.getElementById(`editTitle${taskId}`).value;
        const newDescription = document.getElementById(`editDescription${taskId}`).value;

        task.title = newTitle;
        task.description = newDescription;

        // Atualizar localStorage
        localStorage.setItem(taskKey, JSON.stringify(tasks));

        // Atualizar a tarefa na UI
        const taskElement = document.getElementById(taskId);
        taskElement.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button onclick="editTask(${taskId})">✏️</button>
            <button onclick="deleteTask(${taskId})">❌</button>
        `;
    }
}

// Função para cancelar edição
function cancelEdit(taskId) {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        const taskElement = document.getElementById(taskId);
        taskElement.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <button onclick="editTask(${taskId})">✏️</button>
            <button onclick="deleteTask(${taskId})">❌</button>
        `;
    }
}

// Função para deletar tarefa
function deleteTask(taskId) {
    const taskList = document.querySelector('#taskList');
    const taskElement = document.getElementById(taskId);

    // Remover tarefa do localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks));

    // Remover tarefa da lista
    taskList.removeChild(taskElement);
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];
    const taskList = document.querySelector('#taskList');
    taskList.innerHTML = tasks
        .map(task => `
            <li id="${task.id}">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button onclick="editTask(${task.id})">✏️</button>
                <button onclick="deleteTask(${task.id})">❌</button>
            </li>
        `)
        .join('');
});
