// document.addEventListener('DOMContentLoaded', function() {
//     // Function to handle login form submission
//     document.querySelector('.login-form').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the values from the username and password fields
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Create an object with the username and password
//         const data = {
//             username: username,
//             password: password
//         };

//         // Send a POST request to the server for authentication
//         fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Assuming successful authentication, redirect to the home page
//                 window.location.href = 'home.html';
//             } else {
//                 // Handle authentication failure (e.g., display error message)
//                 console.error('Login failed');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });

//     // Function to handle click event on login button
//     document.getElementById('login-button').addEventListener('click', function() {
//         // Redirect to the home page
//         console.log('Login button clicked');
//         window.location.href = 'home.html';
//     });
// });


// document.addEventListener('DOMContentLoaded', function() {
//     // Function to handle login form submission
//     document.querySelector('.login-form').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the values from the username and password fields
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Create an object with the username and password
//         const data = {
//             username: username,
//             password: password
//         };

//         // Send a POST request to the server for authentication
//         fetch('/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Redirect to the home page if authentication is successful
//                 window.location.href = 'home.html';
//             } else {
//                 // Handle authentication failure (e.g., display error message)
//                 console.error('Login failed');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });

//     // Function to handle click event on login button
//     document.getElementById('login-button').addEventListener('click', function() {
//         // Redirect to the home page
//         console.log('Login button clicked');
//         window.location.href = 'home.html';
//     });

//     // Function to handle user creation form submission
//     document.querySelector('.create-user-form').addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Get the values from the username and password fields
//         const username = document.getElementById('create-username').value;
//         const password = document.getElementById('create-password').value;

//         // Create an object with the username and password
//         const data = {
//             username: username,
//             password: password
//         };

//         // Send a POST request to the server to create a new user
//         fetch('/signup', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => {
//             if (response.ok) {
//                 // Redirect to the home page if user creation is successful
//                 window.location.href = 'home.html';
//             } else {
//                 // Handle user creation failure (e.g., display error message)
//                 console.error('User creation failed');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     });
// });


(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
      document.querySelector('#playerName').textContent = userName;
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
  })();
  
  async function loginUser() {
    loginOrCreate(`/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/signup`);
  }
  
  async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#userName')?.value;
    const password = document.querySelector('#userPassword')?.value;
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ username: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  
    if (response.ok) {
      localStorage.setItem('userName', userName);
      window.location.href = 'home.html';
    } else {
      const body = await response.json();
      const modalEl = document.querySelector('#msgModal');
      modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.message}`;
      const msgModal = new bootstrap.Modal(modalEl, {});
      msgModal.show();
    }
  }
  
  function play() {
    window.location.href = 'home.html';
  }
  
  function logout() {
    localStorage.removeItem('userName');
    // Assuming you have an endpoint for logout
    fetch(`/logout`, {
      method: 'POST',
    }).then(() => (window.location.href = '/'));
  }
  
  async function getUser(username) {
    // Assuming you have an endpoint to fetch user details
    const response = await fetch(`/user?username=${username}`);
    if (response.status === 200) {
      return response.json();
    }
    return null;
  }
  
  function setDisplay(controlId, display) {
    const controlEl = document.querySelector(`#${controlId}`);
    if (controlEl) {
      controlEl.style.display = display;
    }
  }
  