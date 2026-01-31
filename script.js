let tasks = [];

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
  clearForm();
  renderTasks();
}

function clearForm() {
  document.getElementById("taskName").value = "";
  document.getElementById("dueDate").value = "";
}
