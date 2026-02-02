alert("Some changes might be made.");

let focusTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60;  // 5 minutes

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

// ✅ NEW: Add time button
const addTimeBtn = document.getElementById("addTimeBtn");

// show time on screen
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// switch between focus and break
function switchMode() {
  if (isFocus) {
    // finished focus
    sessions++;
    sessionDisplay.textContent = sessions;
    isFocus = false;
    timeLeft = breakTime;
    modeDisplay.textContent = "Break";
  } else {
    // finished break
    isFocus = true;
    timeLeft = focusTime;
    modeDisplay.textContent = "Focus";
  }
}

// start timer
function startTimer() {
  if (timerInterval) return; // prevent multiple timers

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

// pause timer
function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// reset timer
function resetTimer() {
  pauseTimer();
  isFocus = true;
  timeLeft = focusTime;
  modeDisplay.textContent = "Focus";
  updateDisplay();
}

// ✅ NEW: Add +1 minute to the timer
function addOneMinute() {
  timeLeft += 60; // add 60 seconds
  updateDisplay();
}

// button events
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

// ✅ NEW event
addTimeBtn.addEventListener("click", addOneMinute);

// initial display
updateDisplay();
