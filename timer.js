let minutes = 25;
let seconds = 0;
let timer;
let isRunning = false;

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('pauseButton').style.display = 'inline-block';
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'none';
}

// Function to update the timer display
function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Event listeners for start and pause buttons
document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
