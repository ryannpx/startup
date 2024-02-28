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

    // Assuming successful authentication, store the username in local storage
    localStorage.setItem('username', username);

    // Redirect to the home page
    window.location.href = 'home.html';
});

