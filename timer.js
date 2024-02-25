// timer.js

// Timer variables
let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Function to update the timer display
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            // Timer has ended, you can add any additional actions here
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Export functions for external use
export { startTimer, pauseTimer };
