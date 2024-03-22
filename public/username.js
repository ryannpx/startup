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
document.addEventListener('DOMContentLoaded', function() {
    // Fetch the username from the backend service
    fetch('/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch username');
        }
    })
    .then(data => {
        // Display the username on the page
        const usernameDisplay = document.getElementById('usernameDisplay');
        if (data.username) {
            usernameDisplay.textContent = `Welcome, ${data.username}!`;
        } else {
            usernameDisplay.textContent = 'Welcome!';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Display a generic welcome message if fetching username fails
        const usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.textContent = 'Welcome!';
    });
});

