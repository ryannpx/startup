// Define an array of motivation phrases
const motivationPhrases = [
    "You've got this!", 
    "Keep going!", 
    "Stay strong.", 
    "One step at a time.", 
    "You're unstoppable.", 
    "Believe in yourself.", 
    "You're capable.", 
    "Make it happen.", 
    "Dream big.", 
    "Never give up.", 
    "Stay focused.", 
    "Embrace the journey.", 
    "You're a winner.", 
    "Keep pushing forward.", 
    "You can do it.", 
    "Stay positive.", 
    "Chase your dreams.", 
    "Rise and grind.", 
    "Push yourself.", 
    "Be brave."
];

// Get references to the cat image and motivation div
const catImage = document.getElementById('cat-image');
const motivationDiv = document.querySelector('.motivation');

// Variable to track the current image state (2 or 3)
let currentImageState = 3; // Start with image 3

// Event listener for clicking on the cat image
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners for changing the image on hover
    catImage.addEventListener('mouseover', function() {
        // Change to the second picture when the mouse is over the image
        catImage.src = 'resized.png';
    });

    catImage.addEventListener('mouseout', function() {
        // Change back to the original picture when the mouse moves away from the image
        catImage.src = 'Untitled_Artwork (3).png';
    });

    // Event listener for clicking on the motivation div
    catImage.addEventListener('click', function() {
        // Select a new random motivation phrase from the array
        const randomIndex = Math.floor(Math.random() * motivationPhrases.length);
        const randomPhrase = motivationPhrases[randomIndex];

        // Update the text content of the motivation div with the new random phrase
        motivationDiv.querySelector('p').textContent = randomPhrase;
    });
});
