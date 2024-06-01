const taskKey = '@tasks'

// Função para adicionar tarefa
function addTask(event) {
  event.preventDefault() // Evita o recarregamento da página
  const taskId = new Date().getTime()
  const taskList = document.querySelector('#taskList')

  const form = document.querySelector('#taskForm')
  const formData = new FormData(form)

  const taskTitle = formData.get('title')
  const taskDescription = formData.get('description')

  const li = document.createElement('li')

  li.id = taskId
  li.innerHTML = `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `

  taskList.appendChild(li)

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  tasks.push({ title: taskTitle, description: taskDescription })
  localStorage.setItem(taskKey, JSON.stringify(tasks))

  form.reset()
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
  const taskList = document.querySelector('#taskList')
  taskList.innerHTML = tasks
    .map((task) => `<li><h2>${task.title}</h2><p>${task.description}</p></li>`)
    .join('')
})

// Função para deletar tarefa
function deleteTask(taskId) {
    const taskList = document.querySelector('#taskList')
    const taskElement = document.getElementById(taskId)
    
    // Remover tarefa do localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    localStorage.setItem(taskKey, JSON.stringify(updatedTasks))
    
    // Remover tarefa da lista
    taskList.removeChild(taskElement)
}

// Função para adicionar tarefa
function addTask(event) {
    event.preventDefault() // Evita o recarregamento da página
    const taskId = new Date().getTime()
    const taskList = document.querySelector('#taskList')

    const form = document.querySelector('#taskForm')
    const formData = new FormData(form)

    const taskTitle = formData.get('title')
    const taskDescription = formData.get('description')

    const li = document.createElement('li')

    li.id = taskId
    li.innerHTML = `
            <h2>${taskTitle}</h2>
            <p>${taskDescription}</p>
            <button onclick="deleteTask(${taskId})">Delete</button>
    `

    taskList.appendChild(li)

    // Salvar tarefas no localStorage
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    tasks.push({ id: taskId, title: taskTitle, description: taskDescription })
    localStorage.setItem(taskKey, JSON.stringify(tasks))

    form.reset()
}

// Carregar tarefas do localStorage ao recarregar a página
window.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem(taskKey)) || []
    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = tasks
        .map((task) => `
            <li id="${task.id}">
                <h2>${task.title}</h2>
                <p>${task.description}</p>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </li>
        `)
        .join('')
})


