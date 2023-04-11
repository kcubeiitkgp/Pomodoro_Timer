const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const skipButton = document.querySelector(".skip-button");
const timeLeft = document.querySelector(".time-left");
const timerContainer = document.querySelector(".timer-container");
const sound = new Audio("sound.mp3");

let countdown;
let isBreak = false;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      sound.currentTime = 0;
      sound.play();
      if (isBreak) {
        isBreak = false;
        timeLeft.textContent = "25:00";
        document.title = "Pomodoro Timer";
        timerContainer.classList.remove("is-break-time");
        skipButton.style.display = "none";
      } else {
        isBreak = true;
        timeLeft.textContent = "5:00";
        document.title = "Break Time!";
        timerContainer.classList.add("is-break-time");
        skipButton.style.display = "block";
        sound.currentTime = 0;
        sound.play();
      }
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

function pomodoro() {
  timer(25 * 60);
  timerContainer.classList.remove("is-break-time");
  skipButton.style.display = "none";
}

function skipBreak() {
  if (isBreak) {
    clearInterval(countdown);
    isBreak = false;
    timeLeft.textContent = "25:00";
    document.title = "Pomodoro Timer";
    timerContainer.classList.remove("is-break-time");
    skipButton.style.display = "none";
  }
}

if (startButton && resetButton && skipButton && timeLeft && timerContainer && sound) {
  startButton.addEventListener("click", pomodoro);

  resetButton.addEventListener("click", () => {
    clearInterval(countdown);
    isBreak = false;
    timeLeft.textContent = "25:00";
    document.title = "Pomodoro Timer";
    timerContainer.classList.remove("is-break-time");
    skipButton.style.display = "none";
  });

  skipButton.addEventListener("click", skipBreak);
} else {
  console.error('One or more required elements not found.');
  alert('There was an issue finding one or more required elements. Please refresh the page and try again.');
}
