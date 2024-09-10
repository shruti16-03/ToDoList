let tasks = []


const addTask = () => {
    const taskInput = document.getElementById('taskInput')
    const text = taskInput.value.trim();

    if(text){
      tasks.push({text : text, completed : false});
      taskInput.value = ""
      updateTaskList();
      updateStates()
    }
}

const deleteTask = (index) => {
  tasks.splice(index,1)
  updateTaskList();
  updateStates()
}


const editTask = (index) => {
  const taskInput = document.getElementById('taskInput')
  taskInput.value = tasks[index].text

  tasks.splice(index,1)
  updateTaskList()
  updateStates()
}

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStates();
}


const updateStates = () => {
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100

  const progressBar = document.getElementById('progress')
  progressBar.style.width = `${progress}%`

  const numbers = document.getElementById('numbers');
  numbers.textContent = `${completedTasks} / ${totalTasks}`;
}


const updateTaskList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''

  tasks.forEach((task, index) => {
    const listItems = document.createElement('li')

    listItems.innerHTML = `
    <div class="taskItems">
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${
          task.completed ? "checked" : ""
        } onchange="toggleTaskComplete(${index})" />
        <p>${task.text}</p>
      </div>
      <div class="icons">
        <i class="fa-regular fa-pen-to-square" onclick="editTask(${index})"></i>
        <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
      </div>
    </div>
  `;
    taskList.append(listItems);
  });
}


document.getElementById('newTask').addEventListener('click', function(e){
  e.preventDefault();
  addTask();
})


updateStates();