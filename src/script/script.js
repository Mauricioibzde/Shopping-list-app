// Default items (only on first load)
const DEFAULT_TASKS = [
  { text: "Milk", completed: false },
  { text: "Bread", completed: false },
  { text: "Eggs", completed: false }
];

// DOM elements
const form = document.querySelector(".hero-form");
const input = document.querySelector(".user-task-input");
const list = document.getElementById("list");
const btnAdd = document.getElementById("btn-add");
const errorDiv = document.querySelector(".error");

/* -------------------------
   Helpers: LocalStorage
--------------------------*/
const getTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];
const saveTasks = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));

/* -------------------------
   UI Feedback
--------------------------*/
function showError(message) {
  errorDiv.innerHTML = `
    <li>
      <span><img src="./src/icons/Icon error.svg" alt=""></span>
      <span class="task-name">${message}</span>
      <span><img src="./src/icons/Icon x.svg" alt=""></span>
    </li>
  `;

  setTimeout(() => (errorDiv.innerHTML = ""), 3000);
}

/* -------------------------
   Task DOM Element
--------------------------*/
function createTaskElement(task) {
  const li = document.createElement("li");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = task.completed;

  // Text
  const span = document.createElement("span");
  span.classList.add("task-name");
  span.textContent = task.text;

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = `<img src="./src/icons/trash.svg" alt="Delete">`;

  // Apply completed style
  applyCompletedStyle(span, task.completed);

  // Events
  checkbox.addEventListener("change", () => toggleTask(task.text, span, checkbox.checked));
  deleteBtn.addEventListener("click", () => removeTask(task.text, li));

  // Add to DOM
  li.append(checkbox, span, deleteBtn);
  list.appendChild(li);
}

/* -------------------------
   Logic
--------------------------*/
function applyCompletedStyle(element, isCompleted) {
  element.style.textDecoration = isCompleted ? "line-through" : "none";
  element.style.opacity = isCompleted ? "0.6" : "1";
}

function toggleTask(text, span, completed) {
  const tasks = getTasks();
  const task = tasks.find((t) => t.text === text);
  if (!task) return;

  task.completed = completed;
  saveTasks(tasks);
  applyCompletedStyle(span, completed);
}

function removeTask(text, li) {
  const tasks = getTasks().filter((t) => t.text !== text);
  saveTasks(tasks);

  li.remove();
  showError("Item removed successfully!");
}

function addNewTask(taskText) {
  if (!taskText) {
    showError("The field cannot be empty!");
    return;
  }

  const tasks = getTasks();
  const newTask = { text: taskText, completed: false };

  tasks.push(newTask);
  saveTasks(tasks);

  createTaskElement(newTask);
  input.value = "";
}

/* -------------------------
   Initialization
--------------------------*/
function loadTasks() {
  let tasks = getTasks();

  if (tasks.length === 0) {
    saveTasks(DEFAULT_TASKS);
    tasks = DEFAULT_TASKS;
  }

  tasks.forEach(createTaskElement);
}

/* -------------------------
   Event Listeners
--------------------------*/
btnAdd.addEventListener("click", () => addNewTask(input.value.trim()));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask(input.value.trim());
});
window.addEventListener("DOMContentLoaded", loadTasks);
