
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const taskList: Task[] = [];
let nextTaskId = 1;

const newTaskInput = document.getElementById("new-task-input") as HTMLInputElement;
const addTaskButton = document.getElementById("add-task-button") as HTMLButtonElement;
const taskListElement = document.getElementById("task-list") as HTMLUListElement;

addTaskButton.addEventListener("click", () => {
    const newTaskText = newTaskInput.value.trim();
    if (newTaskText !== "") {
        const newTask: Task = {
            id: nextTaskId++,
            text: newTaskText,
            completed: false
        };
        taskList.push(newTask);
        renderTasks(); 
        newTaskInput.value = ""; 
    }
});

function renderTasks() {
    taskListElement.innerHTML = ""; 
    taskList.forEach(task => {
        const taskItem = document.createElement("li");
        
taskItem.innerHTML = `
            <input type="checkbox" data-task-id="${task.id}" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button data-task-id="${task.id}">Delete</button>
        `;
        taskListElement.appendChild(taskItem);

        // Add event listeners for checkbox and delete button
        const checkbox = taskItem.querySelector("input[type='checkbox']") as HTMLInputElement;
        const deleteButton = taskItem.querySelector("button") as HTMLButtonElement;

        checkbox.addEventListener("change", () => {
            const taskId = parseInt(checkbox.dataset.taskId || "0", 10);
            const taskToUpdate = taskList.find(t => t.id === taskId);
            if (taskToUpdate) {
                taskToUpdate.completed = checkbox.checked;
            }
        });

        deleteButton.addEventListener("click", () => {
            const taskId = parseInt(deleteButton.dataset.taskId || "0", 10);
            const taskIndex = taskList.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                taskList.splice(taskIndex, 1);
                renderTasks();
            }
        });
    });
}
