// Define an array of motivation phrases
const motivationPhrases = [
    "You got this!",
    "Keep going, you're doing great!",
    "Stay focused and motivated!",
    "Believe in yourself, you can do it!",
    "Success is just around the corner!"
];

// Get references to the cat image and motivation div
const catImage = document.getElementById('cat-image');
const motivationDiv = document.querySelector('.motivation');

// Variable to track the current image state (2 or 3)
let currentImageState = 3; // Start with image 3

// Event listener for clicking on the cat image
catImage.addEventListener('click', function() {
    // Alternate between images 2 and 3
    if (currentImageState === 3) {
        catImage.src = 'Untitled_Artwork (2).png';
        currentImageState = 2;
    } else {
        catImage.src = 'Untitled_Artwork (3).png';
        currentImageState = 3;
    }

    // Select a random motivation phrase from the array
    const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
    const randomPhrase = motivationPhrases[randomIndex];

    // Update the text content of the motivation div with the random phrase
    motivationDiv.querySelector('p').textContent = randomPhrase;
});

