// document.addEventListener('DOMContentLoaded', function() {
//     // Fetch the username from the backend service
//     fetch('/user', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         } else {
//             throw new Error('Failed to fetch username');
//         }
//     })
//     .then(data => {
//         // Display the username on the page
//         const usernameDisplay = document.getElementById('usernameDisplay');
//         usernameDisplay.textContent = `Welcome, ${data.username}!`;
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Display a generic welcome message if fetching username fails
//         const usernameDisplay = document.getElementById('usernameDisplay');
//         usernameDisplay.textContent = 'Welcome!';
//     });
// });
// username.js

// Retrieve the username from local storage
const username = localStorage.getItem('username');

// Check if the username exists
if (username) {
    // Update the content of the #usernameDisplay element with the username
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = `Welcome, ${username}!`;
    }
} else {
    // Handle the case where the username is not found (optional)
    console.log('Username not found in local storage');
}

