

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
        const username = await response.json(); // Assuming backend sends username upon successful login/creation
        localStorage.setItem('username', username);
        window.location.href = 'home.html';
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
  
  function logout() {
    localStorage.removeItem('username');
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => (window.location.href = '/'));
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
  