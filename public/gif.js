var gifUrls = [
    'cafe.gif',
    'cat.gif',
    'city.png',
    'puter.gif',
    'japan.gif',
    'water.gif',
    // Add more GIF URLs as needed
];

var currentIndex = 0; // Keep track of the current GIF index

// Function to change the background image
function changeBackground() {
    document.body.style.backgroundImage = 'url("' + gifUrls[currentIndex] + '")';
    currentIndex = (currentIndex + 1) % gifUrls.length; // Cycle through the array
}

// Add click event listener to the button
document.getElementById('gifButton').addEventListener('click', changeBackground);

// Call changeBackground initially to set the first GIF
changeBackground();