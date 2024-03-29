const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const http = require('http'); // Import the HTTP module
const WebSocket = require('ws'); // Import the WebSocket module
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


// Endpoint to save tasks for a user
app.post('/tasks', async (req, res) => {
    const { userEmail, tasks } = req.body;
    try {
        await DB.saveTasksForUser(userEmail, tasks);
        res.json({ message: 'Tasks saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save tasks' });
    }
});

// Endpoint to retrieve tasks for a user
app.get('/tasks', async (req, res) => {
    const userEmail = req.query.userEmail;
    try {
        const tasks = await DB.getTasksForUser(userEmail);
        if (tasks !== null) {
            res.json({ tasks: tasks });
        } else {
            res.status(404).json({ message: 'User tasks not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tasks' });
    }
});


// Create HTTP server using Express app
const server = http.createServer(app);

// WebSocket server setup
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', function connection(ws) {
    console.log('WebSocket connection established');

    // Event listener for receiving messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received:', message);
        
        // Broadcast the message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Event listener for WebSocket disconnection
    ws.on('close', function close() {
        console.log('WebSocket connection closed');
    });
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

module.exports = app;




