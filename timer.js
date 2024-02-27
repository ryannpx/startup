let minutes = 25; // Changed to 1 minute
let seconds = 0;
let timer;
let isRunning = false;

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            // Play sound when timer reaches 0
            playSound();
            // Switch between 25-minute and 5-minute intervals
            if (seconds === 0) {
                if (minutes === 25) {
                    minutes = 5;
                } else {
                    minutes = 25;
                }
                seconds = 0;
            }
            // Restart timer with new interval
            timer = setInterval(updateTimer, 1000);
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('pauseButton').style.display = 'inline-block';
        // Stop sound if it's playing
        stopSound();
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'none';
    // Stop sound if it's playing
    stopSound();
}

function stopSound() {
    // Get the audio element
    const sound = document.getElementById('timerSound');
    // Pause and reset the audio playback
    sound.pause();
    sound.currentTime = 0;
}

function playSound() {
    // Play sound here
    const sound = new Audio('ringtone.mp3'); // Replace 'path/to/sound.mp3' with the actual path to your sound file
    sound.play();
}