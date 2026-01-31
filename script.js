/* -------------------------
   USER AUTH SECTION
--------------------------*/

// SIGN UP
function signup() {
  const user = document.getElementById("suUser").value;
  const pass = document.getElementById("suPass").value;

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user]) {
    alert("User already exists");
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created! Please login.");
  window.location.href = "login.html";
}


// LOGIN
function login() {
  const user = document.getElementById("liUser").value;
  const pass = document.getElementById("liPass").value;

  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user] === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "tasks.html";
  } else {
    alert("Invalid login");
  }
}


// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}



/* -------------------------
   TASK SECTION
--------------------------*/

// check login on task page
const currentUser = localStorage.getItem("currentUser");

if (window.location.pathname.includes("tasks.html") && !currentUser) {
  window.location.href = "login.html";
}

// load tasks per user
let tasks = JSON.parse(localStorage.getItem(currentUser + "_tasks")) || [];


// ADD TASK
function addTask() {
  const name = document.getElementById("taskName").value;
  const category = document.getElementById("category").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("dueDate").value;

  if (!name) {
    alert("Please enter a task name");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    category,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  clearForm();
  renderTasks();
}


// SAVE TASKS
function saveTasks() {
  localStorage.setItem(currentUser + "_tasks", JSON.stringify(tasks));
}


// CLEAR FORM
function clearForm() {
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";
}


// TOGGLE COMPLETE
function toggleTask(id) {
  tasks = tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  saveTasks();
  renderTasks();
}


// DELETE TASK
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}


// RENDER TASKS
function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? 'done' : ''}">
        🌸 ${task.name} | ${task.category} | ${task.priority} | ${task.dueDate}
      </span>
      <button onclick="toggleTask(${task.id})">✓</button>
      <button onclick="deleteTask(${task.id})">🗑</button>
    `;

    list.appendChild(li);
  });
}


// auto render when page loads
renderTasks();
