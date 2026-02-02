alert("Some changes might be made.");

let focusTime = 25 * 60; 
let breakTime = 5 * 60;  

let timeLeft = focusTime;
let timerInterval = null;

let isFocus = true;
let sessions = 0;

const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const sessionDisplay = document.getElementById("sessions");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");


const addTimeBtn = document.getElementById("addTimeBtn");


function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}


function switchMode() {
  if (isFocus) {
    
    sessions++;
    sessionDisplay.textContent = sessions;
    isFocus = false;
    timeLeft = breakTime;
    modeDisplay.textContent = "Break";
  } else {
    
    isFocus = true;
    timeLeft = focusTime;
    modeDisplay.textContent = "Focus";
  }
}


function startTimer() {
  if (timerInterval) return; 

  timerInterval = setInterval(() => {
    timeLeft--;

    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;

      alert("Time is up! 🎉");
      switchMode();
      updateDisplay();
    }
  }, 1000);
}


function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  isFocus = true;
  timeLeft = focusTime;
  modeDisplay.textContent = "Focus";
  updateDisplay();
}

function addOneMinute() {
  timeLeft += 60; 
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

addTimeBtn.addEventListener("click", addOneMinute);

updateDisplay();
