const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

let tasks = [];

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskName = taskInput.value;
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;
    
    if (taskName === '') {
        alert('Please enter a task.');
        return;
    }
    
    const task = {
        id: Date.now(),
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    dueDateInput.value = '';
});

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskItem.innerHTML = `
            <div>
                <label>${task.name}</label> <br>
                Due: ${task.dueDate || 'No date'} <br>
                Priority: ${task.priority}
            </div>
            <div>
                <button style="border:0px; marging:5px; border-radius:10px; padding:10px; background-color:#C96868;color:white;" onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button style="border:0px; marging:5px; border-radius:10px; padding:10px; background-color:#C96868;color:white;" onclick="editTask(${task.id})">Edit</button>
                <button style="border:0px; marging:5px; border-radius:10px; padding:10px; background-color:#C96868;color:white;" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    taskInput.value = task.name;
    dueDateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    deleteTask(id);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}
