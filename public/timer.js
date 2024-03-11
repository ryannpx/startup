// let minutes = 25; // Initial timer value set to 1 minute
// let seconds = 0;
// let timer;
// let isRunning = false;
// let sound;
// let currentInterval = 1; // Variable to track the current timer interval

// function updateTimer() {
//     if (seconds === 0) {
//         if (minutes === 0) {
//             clearInterval(timer);
//             isRunning = false;
//             // Play sound when timer reaches 0
//             playSound();
//             // Switch between 1 and 2 minutes interval
//             currentInterval = (currentInterval === 25) ? 5 : 25;
//             // Reset timer to the current interval
//             minutes = currentInterval;
//             seconds = 0;
//             document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//             // Update display
//             document.getElementById('startButton').style.display = 'inline-block';
//             document.getElementById('pauseButton').style.display = 'none';
//         } else {
//             minutes--;
//             seconds = 59;
//         }
//     } else {
//         seconds--;
//     }
//     document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// document.getElementById('startButton').addEventListener('click', startTimer);
// document.getElementById('pauseButton').addEventListener('click', pauseTimer);

// function startTimer() {
//     if (!isRunning) {
//         isRunning = true;
//         timer = setInterval(updateTimer, 1000);
//         document.getElementById('startButton').style.display = 'none';
//         document.getElementById('pauseButton').style.display = 'inline-block';
//         // Stop sound if it's playing
//         stopSound();
//     }
// }

// function pauseTimer() {
//     clearInterval(timer);
//     isRunning = false;
//     document.getElementById('startButton').style.display = 'inline-block';
//     document.getElementById('pauseButton').style.display = 'none';
//     // Stop sound if it's playing
//     stopSound();
// }

// function stopSound() {
//     if (sound) {
//         // Pause and reset the audio playback
//         sound.pause();
//         sound.currentTime = 0;
//     }
// }

// function playSound() {
//     // Play sound here
//     sound = new Audio('ringtone.mp3'); // Replace 'ringtone.mp3' with the actual path to your sound file
//     sound.play();
// }


let minutes = 25; // Initial timer value set to 1 minute
let seconds = 0;
let timer;
let isRunning = false;
let sound;

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            // Play sound when timer reaches 0
            playSound();
            // Reset timer to the current interval
            minutes = 5; // Change to 5 minutes for break time
            seconds = 0;
            document.getElementById('countdown').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            // Update display
            document.getElementById('startButton').style.display = 'none';
            document.getElementById('pauseButton').style.display = 'none';
            document.getElementById('startBreakButton').style.display = 'inline-block';
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
document.getElementById('startBreakButton').addEventListener('click', startBreak);

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

function startBreak() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startButton').style.display = 'inline-block';
    document.getElementById('pauseButton').style.display = 'none';
    document.getElementById('startBreakButton').style.display = 'none';
    // Stop sound if it's playing
    stopSound();
}

function stopSound() {
    if (sound) {
        // Pause and reset the audio playback
        sound.pause();
        sound.currentTime = 0;
    }
}

function playSound() {
    // Play sound here
    sound = new Audio('ringtone.mp3'); // Replace 'ringtone.mp3' with the actual path to your sound file
    sound.play();
}

