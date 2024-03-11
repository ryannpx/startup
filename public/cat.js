// document.addEventListener('DOMContentLoaded', function () {
//     // Get references to the cat image and motivation div
//     const catImage = document.getElementById('cat-image');
//     const motivationDiv = document.querySelector('.motivation');

//     // Event listener for clicking on the cat image
//     catImage.addEventListener('click', function () {
//         fetch('https://type.fit/api/quotes')
//             .then(response => response.json())
//             .then(data => {
//                 // Extract the quote from the response data
//                 const quote = data[0].q;

//                 // Update the text content of the motivation div with the received quote
//                 motivationDiv.querySelector('p').textContent = quote;
//             })
//             .catch(error => {
//                 // Handle any errors that occur during the fetch request
//                 console.error('Error fetching quote:', error);
//             });
//     });
// });
// function displayQuote() {
//     fetch('https://type.fit/api/quotes')
//       .then((response) => response.json())
//       .then((data) => {
//         const containerEl = document.querySelector('#quote');
  
//         const quoteEl = document.createElement('p');
//         quoteEl.classList.add('quote');
//         const authorEl = document.createElement('p');
//         authorEl.classList.add('author');
  
//         quoteEl.textContent = data[0].q; // Extract quote from response data
//         authorEl.textContent = data[0].a; // Extract author from response data
  
//         containerEl.appendChild(quoteEl);
//         containerEl.appendChild(authorEl);
//       });
//   }
  
//   displayQuote(); // Invoke function to display a random quote when the page loads
  
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


  