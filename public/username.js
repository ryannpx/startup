document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the username from local storage
    const username = localStorage.getItem('username');

    // Display the username on the page
    const usernameDisplay = document.getElementById('usernameDisplay');
    if (username) {
        usernameDisplay.textContent = `Welcome, ${username}!`;
    } else {
        usernameDisplay.textContent = 'Welcome!'; // If username is not found
    }
});
