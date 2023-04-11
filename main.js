const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const timeLeft = document.querySelector(".time-left");
const timerContainer = document.querySelector(".timer-container");

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
      playSound();
      if (isBreak) {
        isBreak = false;
        timer(25 * 60);
      } else {
        isBreak = true;
        timer(5 * 60);
        timerContainer.classList.add("is-break-time");
        timeLeft.textContent = "Take a break!";
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

function playSound() {
  const sound = new Audio('sound.mp3');
  if (sound.canPlayType('audio/mpeg')) {
    sound.play()
      .catch(error => {
        console.error('Error playing sound:', error);
        alert('There was an issue playing the sound. Please check your audio settings.');
      });
  } else {
    console.error('Unsupported audio format: sound.mp3');
    alert('This browser does not support the audio format of the sound file. Please use a different browser or update your browser settings.');
  }
}

if (startButton && resetButton && timeLeft) {
  startButton.addEventListener("click", () => {
    timer(25 * 60);
  });

  resetButton.addEventListener("click", () => {
    clearInterval(countdown);
    timeLeft.textContent = "25:00";
    document.title = "Pomodoro Timer";
    timerContainer.classList.remove("is-break-time");
    isBreak = false;
  });
} else {
  console.error('One or more required elements not found.');
  alert('There was an issue finding one or more required elements. Please refresh the page and try again.');
}
