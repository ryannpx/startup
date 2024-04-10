
function displayQuote() {
  fetch('https://api.quotable.io/random')
      .then((response) => {
          if (!response.ok) {
              throw new Error('Failed to fetch quote');
          }
          return response.json();
      })
      .then((data) => {
          const quoteContainer = document.querySelector('.motivation p');
          quoteContainer.textContent = data.content; // Assuming the API returns the quote content in the 'content' field
      })
      .catch((error) => {
          console.error('Error fetching quote:', error);
          const quoteContainer = document.querySelector('.motivation p');
          quoteContainer.textContent = 'Failed to fetch quote';
      });
}

// Call the displayQuote function when the page loads
document.addEventListener('DOMContentLoaded', displayQuote);
// Function to handle click event on cat image
document.getElementById('cat-image').addEventListener('click', displayQuote);


// Function to change cat image on mouseover
function changeCatImage() {
  const catImage = document.getElementById('cat-image');
  catImage.src = 'Untitled_Artwork (2).png';
}

// Function to restore cat image on mouseout
function restoreCatImage() {
  const catImage = document.getElementById('cat-image');
  catImage.src = 'Untitled_Artwork (3).png';
}

// Add event listener for mouseover to change cat image
document.getElementById('cat-image').addEventListener('mouseover', changeCatImage);

// Add event listener for mouseout to restore cat image
document.getElementById('cat-image').addEventListener('mouseout', restoreCatImage);


  