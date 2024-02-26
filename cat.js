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
"Be brave.",

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
        catImage.src = 'resized.png';
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

