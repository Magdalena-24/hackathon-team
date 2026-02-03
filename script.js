/* =========================
   TASK LOGIC
========================= */

let tasks = [];
let currentFilter = "all";
let currentCategory = "all";
let currentPriority = "all";

// ADD TASK
function addTask() {
  const name = document.getElementById("taskName").value;
  const category = document.getElementById("category").value;
  const priority = Number(document.getElementById("priority").value);
  const dueDate = document.getElementById("dueDate").value;

  if (!name) {
    alert("Please enter a task name");
    return;
  }

  tasks.push({
    id: Date.now(),
    name,
    category,
    priority,
    dueDate,
    completed: false
  });

  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";

  renderTasks();
  updateStats();
}

// RENDER TASKS
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let filteredTasks = [...tasks];

  if (currentFilter === "active") {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  }

  if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter(t => t.completed);
  }

  if (currentCategory !== "all") {
    filteredTasks = filteredTasks.filter(t => t.category === currentCategory);
  }

  if (currentPriority !== "all") {
    filteredTasks = filteredTasks.filter(
      t => t.priority === Number(currentPriority)
    );
  }

  filteredTasks.forEach(task => {
    const div = document.createElement("div");
    div.className =
      "d-flex justify-content-between align-items-center p-3 mb-2 rounded bg-light";

    div.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <i class="fa-regular ${
          task.completed ? "fa-circle-check" : "fa-circle"
        }"
           style="cursor:pointer"
           onclick="toggleTask(${task.id})"></i>

        <span style="${
          task.completed ? "text-decoration: line-through;" : ""
        }">
          ${task.name}
        </span>
      </div>

      <div class="d-flex gap-2 align-items-center">
        <span class="badge bg-secondary">${task.category}</span>
        <span class="badge bg-dark">P${task.priority}</span>

        <button class="btn btn-outline-success btn-sm"
                onclick="selectTask(${task.id})">
          ▶ Start
        </button>

        <i class="fa-solid fa-trash-can"
           style="cursor:pointer"
           onclick="deleteTask(${task.id})"></i>
      </div>
    `;

    taskList.appendChild(div);
  });
}

// TOGGLE COMPLETE
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

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

// FILTERS
function setFilter(filter) {
  currentFilter = filter;

  if (filter === "all") {
    currentCategory = "all";
    currentPriority = "all";

    document.querySelector(
      'select[onchange="setCategory(this.value)"]'
    ).value = "all";

    document.querySelector(
      'select[onchange="sortByPriority(this.value)"]'
    ).value = "";
  }

  renderTasks();
}

function setCategory(category) {
  currentCategory = category;
  renderTasks();
}

function sortByPriority(priority) {
  currentPriority = priority || "all";
  renderTasks();
}

// STATS
function updateStats() {
  document.getElementById("completedCount").textContent =
    `${tasks.filter(t => t.completed).length}/${tasks.length}`;

  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueTodayCount").textContent =
    tasks.filter(t => t.dueDate === today).length;

  document.getElementById("highPriorityCount").textContent =
    tasks.filter(t => t.priority === 1 && !t.completed).length;
}

/* =========================
   POMODORO TIMER
========================= */

let focusTime = 20 * 60; // 20 minutes
let timeLeft = focusTime;
let timerInterval = null;
let activeTaskId = null;

const timerDisplay = document.getElementById("timer");
const activeTaskDisplay = document.getElementById("activeTask");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// UPDATE TIMER UI
function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

// SELECT TASK FOR POMODORO
function selectTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  activeTaskId = taskId;
  activeTaskDisplay.textContent = `Working on: ${task.name}`;
  resetTimer();
}

// START TIMER
function startTimer() {
  if (!activeTaskId) {
    alert("Please select a task first 😊");
    return;
  }

  if (timerInterval) return;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Pomodoro complete! 🎉");
      resetTimer();
    }
  }, 1000);
}

// PAUSE TIMER
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// RESET TIMER
function resetTimer() {
  pauseTimer();
  timeLeft = focusTime;
  updateTimerDisplay();
}

// BUTTON EVENTS
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// INIT
updateTimerDisplay();
