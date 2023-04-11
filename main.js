const title = document.getElementById("title");
const timer = document.getElementById("timer");
const startResetButton = document.getElementById("startResetButton");

let countdown;
let isPomodoro = true;
let timerRunning = false;

startResetButton.addEventListener("click", () => {
    if (timerRunning) {
        resetTimer();
    } else {
        startTimer();
    }
});

function startTimer() {
    const duration = isPomodoro ? 25 * 60 : 5 * 60;
    const end = Date.now() + duration * 1000;

    timerRunning = true;
    startResetButton.textContent = "Reset";

    countdown = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft < 0) {
            clearInterval(countdown);
            timerRunning = false;
            startResetButton.textContent = "Start";
            isPomodoro = !isPomodoro;
            title.textContent = isPomodoro ? "Pomodoro Timer" : "Break Time!";
            timer.textContent = isPomodoro ? "25:00" : "05:00";
            return;
        }

        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;

        timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timerRunning = false;
    startResetButton.textContent = "Start";
    timer.textContent = isPomodoro ? "25:00" : "05:00";
}
