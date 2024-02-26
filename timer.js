// Export functions for external use
//  export { startTimer, pauseTimer }; when gone this makes the timer not work

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

// Rest of your JavaScript code...

// Export functions for external use
export { startTimer, pauseTimer };
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here
    // Event listeners for start and pause buttons
    document.getElementById('startButton').addEventListener('click', startTimer);
    document.getElementById('pauseButton').addEventListener('click', pauseTimer);

    // Event listener for the send button
    document.getElementById('sendButton').addEventListener('click', sendMessage);

    // Display mocked messages initially
    displayMockedMessages();
});

