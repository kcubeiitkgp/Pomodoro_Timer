const startButton = document.querySelector(".start-button");
const timeLeft = document.querySelector(".time-left");
const timerContainer = document.querySelector(".timer-container");
const sound = new Audio("sound.mp3");

let countdown;
let isBreak = false;
let remainingTime;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  remainingTime = seconds;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      sound.currentTime = 0;
      sound.play();
      isBreak = !isBreak;
      updateUI();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  timeLeft.textContent = display;
  document.title = display;
}

function updateUI() {
  if (isBreak) {
    timeLeft.textContent = "5:00";
    document.title = "Break Time!";
    timerContainer.classList.add("is-break-time");
    startButton.textContent = "Start";
  } else {
    timeLeft.textContent = "25:00";
    document.title = "Pomodoro Timer";
    timerContainer.classList.remove("is-break-time");
    startButton.textContent = "Start";
  }
}

function startOrReset() {
  if (startButton.textContent === "Start") {
    timer(isBreak ? 5 * 60 : 25 * 60);
    startButton.textContent = "Reset";
  } else {
    clearInterval(countdown);
    updateUI();
    startButton.textContent = "Start";
  }
}

if (startButton && timeLeft && timerContainer && sound) {
  startButton.addEventListener("click", startOrReset);
} else {
  console.error('One or more required elements not found.');
  alert('There was an issue finding one or more required elements. Please refresh the page and try again.');
}
