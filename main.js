const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const timeLeft = document.querySelector(".time-left");

let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      playSound();
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

function playSound() {
  const sound = new Audio('sound.ogg');
  sound.play();
}

startButton.addEventListener("click", () => {
  timer(25 * 60);
});

resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  timeLeft.textContent = "25:00";
  document.title = "Pomodoro Timer";
});

