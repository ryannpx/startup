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
  
function displayPicture() {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');
  
        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
  
        const imgUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        const imgEl = document.createElement('img');
        imgEl.setAttribute('src', imgUrl);
        containerEl.appendChild(imgEl);
      });
  }
  
  function displayQuote(data) {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('p');
        quoteEl.classList.add('quote');
        const authorEl = document.createElement('p');
        authorEl.classList.add('author');
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }
  
  displayPicture();
  displayQuote();
  