

(async () => {
    const username = localStorage.getItem('username');
    if (username) {
      document.querySelector('#playerName').textContent = username;
      setDisplay('loginControls', 'none');
      setDisplay('playControls', 'block');
    } else {
      setDisplay('loginControls', 'block');
      setDisplay('playControls', 'none');
    }
  })();
  
  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }
  
  // async function loginOrCreate(endpoint) {


  async function loginOrCreate(endpoint) {
    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch(`http://localhost:4000${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        // Handle successful login or user creation
        try {
            const data = await response.json();
            const username = data.username; // Assuming the response contains the username
            localStorage.setItem('username', username);
            window.location.href = 'home.html';
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            // Handle the case where JSON parsing fails
            // Display a generic error message or take appropriate action
        }
    } else {
        const body = await response.json();
        if (response.status === 401) {
            // User unauthorized
            const errorMsg = document.getElementById('error-message');
            if (errorMsg) {
                errorMsg.textContent = 'User does not exist or invalid credentials';
            }
        } else if (response.status === 409) {
            // User already exists (conflict)
            const errorMsg = document.getElementById('error-message');
            if (errorMsg) {
                errorMsg.textContent = 'User already exists';
            }
        } else {
            // Show error message from the server response
            const modalEl = document.querySelector('#msgModal');
            modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
            const msgModal = new bootstrap.Modal(modalEl, {});
            msgModal.show();
        }
    }
}




async function loginUser() {
  await loginOrCreate('/api/auth/login'); // Pass the login endpoint
}

async function createUser() {
  await loginOrCreate('/api/auth/create'); // Pass the create endpoint
}

  
  function play() {
    window.location.href = 'play.html';
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    const logoutLink = document.getElementById('logoutLink');
    if (username) {
        // User is logged in, show logout link
        logoutLink.style.display = 'block';
    } else {
        // User is not logged in, hide logout link
        logoutLink.style.display = 'none';
    }
});

function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
        method: 'DELETE',
    })
    .then(() => {
        // Redirect to the login page after logout
        window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error logging out:', error);
        // Handle logout error if needed
    });
}

  
  async function getUser(email) {
    let scores = [];
    // See if we have a user with the given email.
    const response = await fetch(`/api/user/${email}`);
    if (response.status === 200) {
      return response.json();
    }
  
    return null;
  }
  
  function setDisplay(controlId, display) {
    const playControlEl = document.querySelector(`#${controlId}`);
    if (playControlEl) {
      playControlEl.style.display = display;
    }
  }
  