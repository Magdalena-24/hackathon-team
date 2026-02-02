/* =========================
   AUTHENTICATION
========================= */

// SIGN UP
function signup() {
  const user = document.getElementById("suUser").value.trim();
  const pass = document.getElementById("suPass").value.trim();

  if (!user || !pass) {
    alert("Please fill all fields");
    return;
  }

  // password rules
  if (pass.length < 6 || !/\d/.test(pass)) {
    alert("Password must be at least 6 characters and contain a number");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user]) {
    alert("User already exists");
    return;
  }

  users[user] = pass;
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created 💗 Please login");
  window.location.href = "login.html";
}


// LOGIN
function login() {
  const user = document.getElementById("liUser").value.trim();
  const pass = document.getElementById("liPass").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[user] && users[user] === pass) {
    localStorage.setItem("currentUser", user);
    window.location.href = "tasks.html";
  } else {
    alert("Incorrect username or password");
  }
}


// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}


/* =========================
   TASK MANAGEMENT
========================= */

const currentUser = localStorage.getItem("currentUser");

// protect tasks page
if (window.location.pathname.includes("tasks.html") && !currentUser) {
  window.location.href = "login.html";
}

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
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}


// DELETE TASK
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
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
      <button onclick="toggleTask(${task.id})">✔</button>
      <button onclick="deleteTask(${task.id})">🗑</button>
    `;
    list.appendChild(li);
  });
}

renderTasks();

