let tasks = [];
let currentFilter = "all";
let currentCategory = "all";
let currentPriority = "all";

// ADD TASK
function addTask() {
  const name = document.getElementById("taskName").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!name) return alert("Please enter a task name");

  tasks.push({
    id: Date.now(),
    name,
    category,
    priority: Number(priority),
    dueDate,
    completed: false
  });

  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  renderTasks();
  updateStats();
}


function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  if (currentFilter === "active")
    filteredTasks = filteredTasks.filter(t => !t.completed);

  if (currentFilter === "completed")
    filteredTasks = filteredTasks.filter(t => t.completed);

  if (currentCategory !== "all")
    filteredTasks = filteredTasks.filter(t => t.category === currentCategory);

  if (currentPriority !== "all")
    filteredTasks = filteredTasks.filter(t => t.priority === Number(currentPriority));

  filteredTasks.forEach(task => {
    const div = document.createElement("div");
    div.className =
      "d-flex justify-content-between align-items-center p-3 mb-2 rounded bg-light";

    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i class="fa-regular ${task.completed ? "fa-circle-check" : "fa-circle"}"
           style="cursor:pointer"
           onclick="toggleTask(${task.id})"></i>
        <span style="${task.completed ? "text-decoration: line-through;" : ""}">
          ${task.name}
        </span>
      </div>

      <div class="d-flex gap-3">
        <span class="badge bg-secondary">${task.category}</span>
        <span class="badge bg-dark">P${task.priority}</span>
        <i class="fa-solid fa-trash-can"
           style="cursor:pointer"
           onclick="deleteTask(${task.id})"></i>
      </div>
    `;

    taskList.appendChild(div);
  });
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  renderTasks();
  updateStats();
}

// DELETE TASK
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
  updateStats();
}

// STATUS FILTER
function setFilter(filter) {
  currentFilter = filter;

  if (filter === "all") {
    currentCategory = "all";
    currentPriority = "all";

    document.querySelector('select[onchange="setCategory(this.value)"]').value = "all";
    document.querySelector('select[onchange="sortByPriority(this.value)"]').value = "";
  }

  renderTasks();
}

function setCategory(category) {
  currentCategory = category;
  renderTasks();
}

// PRIORITY FILTER
function sortByPriority(priority) {
  currentPriority = priority || "all";
  renderTasks();
}

function updateStats() {
  document.getElementById("completedCount").textContent =
    `${tasks.filter(t => t.completed).length}/${tasks.length}`;

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueTodayCount").textContent =
    tasks.filter(t => t.dueDate === today).length;

  document.getElementById("highPriorityCount").textContent =
    tasks.filter(t => t.priority === 1 && !t.completed).length;
}
