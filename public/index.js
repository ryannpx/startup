document.addEventListener('DOMContentLoaded', function() {
    // Function to handle login form submission
    document.querySelector('.login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the username and password fields
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Create an object with the username and password
        const data = {
            username: username,
            password: password
        };

        // Send a POST request to the server for authentication
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                // Assuming successful authentication, redirect to the home page
                window.location.href = 'home.html';
            } else {
                // Handle authentication failure (e.g., display error message)
                console.error('Login failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Function to handle click event on login button
    document.getElementById('login-button').addEventListener('click', function() {
        // Redirect to the home page
        console.log('Login button clicked');
        window.location.href = 'home.html';
    });
});
