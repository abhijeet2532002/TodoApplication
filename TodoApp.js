// All task variable
let alltask = [];

// Document variable create
const taskList = document.getElementById("lists");
const addTaskInput = document.getElementById("add");
const taskCounter = document.getElementById("tasks-counter");
const typeTask = document.getElementById("total-tasks");

// Fetch type variable
const allOption = document.getElementById("all");
const completeOption = document.getElementById("completed");
const uncompleteOption = document.getElementById("uncomplete");

// Add List
function addList(tasks) {
    let li = document.createElement('li');
    if (tasks.done) {
        li.innerHTML = `
            <input type="checkbox" id="${tasks.id}" checked class="custom-checkbox">
            <label for="${tasks.id}">${tasks.text} </label>
            <img src="bin.png" class="delete" id="${tasks.id}" data-id="${tasks.id}" />
        `;
    } else {
        li.innerHTML = `
            <input type="checkbox" id="${tasks.id}" class="custom-checkbox">
            <label for="${tasks.id}">${tasks.text} </label>
            <img src="bin.png" class="delete" id="${tasks.id}" data-id="${tasks.id}" />
        `;
    }
    taskList.appendChild(li);
}

// Fetch All Type Of Task
function renderList() {
    taskList.innerHTML = "";
    for (let i = 0; i < alltask.length; i++) {
        addList(alltask[i]);
    }
    taskCounter.innerHTML = '' + alltask.length;

    completeOption.style.color = 'gray';
    allOption.style.color = 'black';
    uncompleteOption.style.color = 'gray';
}

// Fetch Completed Task
function renderComplete() {
    const newTask = alltask.filter(function (tasks) {
        return tasks.done == true;
    });

    let completeTask = newTask;

    taskList.innerHTML = "";
    for (let i = 0; i < completeTask.length; i++) {
        addList(completeTask[i]);
    }
    taskCounter.innerHTML = '' + completeTask.length;
    completeOption.style.color = 'black';
    allOption.style.color = 'gray';
    uncompleteOption.style.color = 'gray';
}

// Fetch UnCompleted Task
function renderUnComplete() {
    const newTask = alltask.filter(function (tasks) {
        return tasks.done != true;
    });

    let UnCompleteTask = newTask;

    taskList.innerHTML = "";
    for (let i = 0; i < UnCompleteTask.length; i++) {
        addList(UnCompleteTask[i]);
    }
    taskCounter.innerHTML = '' + UnCompleteTask.length;
    completeOption.style.color = 'gray';
    allOption.style.color = 'gray';
    uncompleteOption.style.color = 'black';
}

// Mark As Complete
function markTaskAsComplete(taskId) {
    const newTask = alltask.filter(function (tasks) {
        return tasks.id == taskId;
    });

    if (newTask.length > 0) {
        const currentTask = newTask[0];
        currentTask.done = !currentTask.done;
        renderList();
    }
}

// Mark As Completed All Task
function markTaskAsCompleteAll(text) {
    if (text === "Complete") {
        for (let i = 0; i < alltask.length; i++) {
            alltask[i].done = true;
        }
        document.getElementById("completes").innerHTML = "Uncomplete";
    } else {
        for (let i = 0; i < alltask.length; i++) {
            alltask[i].done = false;
        }
        document.getElementById("completes").innerHTML = "Complete";
    }

    renderList();
}

// Delete Task
function deleteTask(taskId) {
    const newTask = alltask.filter(function (tasks) {
        return tasks.id != taskId;
    });

    alltask = newTask;
    renderList();
}

// Remove All Completed Task
function removeComplete() {
    const newTask = alltask.filter(function (tasks) {
        return tasks.done != true;
    });

    alltask = newTask;
    renderList();
}

// Add Task
function addTask(tasks) {
    if (tasks) {
        alltask.push(tasks);
        renderList();
        return;
    } else {
        showNotification("pls entered the text into the input feild .....");
    }
}

// Handle key press
function handleInputKeypress(e) {
    if (e.key === 'Enter') {
        const text = e.target.value;

        if (!text) {
            showNotification('Input feild is empty .....');
            return;
        }

        const tasks = {
            text: text,
            id: alltask.length + 1,
            done: false
        }

        e.target.value = '';
        addTask(tasks);
    }
}

// Handle Clicked event
function handleClickedEvent(e) {
    const target = e.target;
    if (target.className === "custom-checkbox") {
        markTaskAsComplete(target.id);
    } else if (target.className === "delete") {
        deleteTask(target.id);
    } else if (target.id === "completes") {
        let complete = document.getElementById("completes").innerText;
        markTaskAsCompleteAll(complete);
    }
    else if (target.id === "all") {
        renderList();
    } else if (target.id === "completed") {
        renderComplete();
    } else if (target.id === "uncomplete") {
        renderUnComplete();
    } else if (target.id === "clearComplete") {
        removeComplete();
    }
}

// Event Listener
// // KeyListener(keyUp)
addTaskInput.addEventListener('keyup', handleInputKeypress);
// // Clicked Listerner
document.addEventListener('click', handleClickedEvent);