const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line


// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    const existingUser = await DB.getUser(req.body.email);
    if (existingUser) {
      res.status(409).send({ msg: 'User already exists' });
    } else {
      const user = await DB.createUser(req.body.email, req.body.password);
  
      // Set the cookie
      setAuthCookie(res, user.token);
  
      res.send({
        id: user._id,
      });
    }
  });
  

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/api/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });
  
// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});
// Endpoint to fetch inspirational quote
app.get('/quote', async (req, res) => {
    try {
        // Fetch quote from a third-party API
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        console.log('Response from API:', data); // Log the response
        
        // Extract the quote content
        const quoteContent = data.content;

        // Check if the quote content has 35 characters or fewer
        if (quoteContent.length <= 35) {
            // Send the quote in the response if it meets the character limit
            res.json({ quote: quoteContent });
        } else {
            // Send an empty quote in the response if the quote exceeds the character limit
            res.json({ quote: '' });
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});
// GetScores
secureApiRouter.get('/tasks', async (req, res) => {
  const scores = await DB.getHighScores();
  res.send(scores);
});

// SubmitScore
secureApiRouter.post('/task', async (req, res) => {
  const score = { ...req.body, ip: req.ip };
  await DB.addScore(score);
  const scores = await DB.getHighScores();
  res.send(scores);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}


//app.use(express.static('public'));

// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


























// ///BACKEND
// const express = require('express');
// const path = require('path');
// const bycrpt = require("bcrypt");
// const bodyParser = require('body-parser');
// const app = express();
// const DB = require('./database.js');
// const collection = require('./database');
// // Middleware to parse JSON body

// //convert data into json format
// app.use(express.json());
// app.use(express.urlencoded({extended:false}));


// app.use(express.static('public'));
// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));







// //endpoints



// //app.use(bodyParser.json());
// app.use(express.json());
// // In-memory database for simplicity (replace this with a real database in production)
// let users = [];

// // Endpoint to create a new user account
// app.post('/signup', (req, res) => {
//     const { username, password } = req.body;
//     // Check if username already exists
//     if (users.some(user => user.username === username)) {
//         return res.status(400).json({ message: 'Username already exists' });
//     }
//     // Create new user
//     const newUser = { username, password };
//     users.push(newUser);
//     res.status(201).json({ message: 'User created successfully' });
// });

// // Endpoint to authenticate user login
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = users.find(user => user.username === username && user.password === password);
//     if (!user) {
//         return res.status(401).json({ message: 'Invalid username or password' });
//     }
//     res.json({ message: 'Login successful' });
// });

// // Endpoint to logout user (clear session)
// app.post('/logout', (req, res) => {
//     // Perform logout actions here (e.g., clear session, remove token, etc.)
//     res.json({ message: 'Logout successful' });
// });

// // Endpoint to get user details
// app.get('/user', (req, res) => {
//     // Retrieve user details based on authentication (e.g., session, token)
//     const username = req.query.username; // Assuming username is sent as a query parameter
//     const user = users.find(user => user.username === username);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ username: user.username }); // Return user details
// });


// // Endpoint to save tasks for a user
// app.post('/tasks', (req, res) => {
//     const { username, tasks } = req.body;
//     const user = users.find(user => user.username === username);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     user.tasks = tasks; // Replace user's tasks with the provided tasks
//     res.json({ message: 'Tasks saved successfully' });
// });

// // Endpoint to retrieve tasks for a user
// app.get('/tasks', (req, res) => {
//     const username = req.query.username;
//     const user = users.find(user => user.username === username);
//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ tasks: user.tasks });
// });

// //Serve static files from the 'public' directory


// app.use(express.static('public'));

// // Start the server
// const port = 4000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });



























// // Define your routes
// app.get("/", (req, res) => {
//     // Since index.html is in the 'public' directory, it will be served automatically
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// //register user
// app.post("/signup", async (req, res) => {
//     try {
//         const userData = {
//             name: req.body.username,
//             password: req.body.password
//         };
        
//         const newUser = await collection.create(userData);
//         console.log("User created:", newUser);
        
//         res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//         console.error("Error creating user:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

//video stuff ^^

