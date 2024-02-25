// index.js

// Function to handle login form submission
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the username and password fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Here, you would typically send the username and password to the server for authentication
    // For now, let's just log them to the console
    console.log('Username:', username);
    console.log('Password:', password);

    // Assuming successful authentication, redirect to the home page
    window.location.href = 'home.html';
});

// Function to display the username in the navbar
document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in (you can use localStorage or a more secure method)
    const isLoggedIn = true; // For demonstration purposes, assuming the user is logged in

    if (isLoggedIn) {
        // Get the username from wherever it's stored (localStorage, session storage, etc.)
        const username = 'JohnDoe'; // Replace this with actual username

        // Update the navbar with the logged-in user's name
        const navbarUsername = document.getElementById('navbarUsername');
        navbarUsername.innerHTML = `<p class="navbar-item">Welcome, ${username}</p>`;
    }
});
