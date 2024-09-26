var taskList = [];
var nextTaskId = 1;
var newTaskInput = document.getElementById("new-task-input");
var addTaskButton = document.getElementById("add-task-button");
var taskListElement = document.getElementById("task-list");
addTaskButton.addEventListener("click", function () {
    var newTaskText = newTaskInput.value.trim();
    if (newTaskText !== "") {
        var newTask = {
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
    taskList.forEach(function (task) {
        var taskItem = document.createElement("li");
        taskItem.innerHTML = "\n            <input type=\"checkbox\" data-task-id=\"".concat(task.id, "\" ").concat(task.completed ? "checked" : "", ">\n            <span>").concat(task.text, "</span>\n            <button data-task-id=\"").concat(task.id, "\">Delete</button>\n        ");
        taskListElement.appendChild(taskItem);
        // Add event listeners for checkbox and delete button
        var checkbox = taskItem.querySelector("input[type='checkbox']");
        var deleteButton = taskItem.querySelector("button");
        checkbox.addEventListener("change", function () {
            var taskId = parseInt(checkbox.dataset.taskId || "0", 10);
            var taskToUpdate = taskList.find(function (t) { return t.id === taskId; });
            if (taskToUpdate) {
                taskToUpdate.completed = checkbox.checked;
            }
        });
        deleteButton.addEventListener("click", function () {
            var taskId = parseInt(deleteButton.dataset.taskId || "0", 10);
            var taskIndex = taskList.findIndex(function (t) { return t.id === taskId; });
            if (taskIndex !== -1) {
                taskList.splice(taskIndex, 1);
                renderTasks();
            }
        });
    });
}
