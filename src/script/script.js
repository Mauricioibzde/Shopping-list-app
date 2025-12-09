// Default items that will appear only on first load
const defaultTasks = [
  { text: "Milk", completed: false },
  { text: "Bread", completed: false },
  { text: "Eggs", completed: false }
];

// Selecting elements
const form = document.querySelector(".hero-form");
const input = document.querySelector(".user-task-input");
const list = document.getElementById("list");
const btnAdd = document.getElementById("btn-add");
const errorDiv = document.querySelector(".error");

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Create task item in DOM
function createTask(taskText, isCompleted = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  checkbox.checked = isCompleted;

  const span = document.createElement("span");
  span.classList.add("task-name");
  span.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  const imgTrash = document.createElement("img");
  imgTrash.src = "./src/icons/trash.svg";
  imgTrash.alt = "Delete";

  deleteBtn.appendChild(imgTrash);

  if (isCompleted) {
    span.style.textDecoration = "line-through";
    span.style.opacity = "0.6";
  }

  checkbox.addEventListener("change", () => {
    const tasks = getTasks();
    const task = tasks.find((t) => t.text === taskText);

    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
      task.completed = true;
    } else {
      span.style.textDecoration = "none";
      span.style.opacity = "1";
      task.completed = false;
    }

    saveTasks(tasks);
  });

  deleteBtn.addEventListener("click", () => {
    const tasks = getTasks().filter((t) => t.text !== taskText);
    saveTasks(tasks);

    li.remove();
    showError("Item removed successfully!");
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Error message
function showError(message) {
  errorDiv.innerHTML = `
    <li>
      <span><img src="./src/icons/Icon error.svg" alt=""></span>
      <span class="task-name">${message}</span>
      <span><img src="./src/icons/Icon x.svg" alt=""></span>
    </li>
  `;

  setTimeout(() => {
    errorDiv.innerHTML = "";
  }, 3000);
}

// Add new item
btnAdd.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText === "") {
    showError("The field cannot be empty!");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  saveTasks(tasks);

  createTask(taskText);
  input.value = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  btnAdd.click();
});

// Load tasks on start
window.addEventListener("DOMContentLoaded", () => {
  let tasks = getTasks();

  // If it's the first time, load default tasks
  if (tasks.length === 0) {
    saveTasks(defaultTasks);
    tasks = defaultTasks;
  }

  tasks.forEach((task) => createTask(task.text, task.completed));
});
