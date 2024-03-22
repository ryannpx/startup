const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./database'); // Assuming your schema is defined in database.js
const app = express();
const db = client.db('startup');
const collection = db.collection('user');

//const port = 4000; // Changed port to 4000

app.use(express.json());

const connectionString = 'mongodb+srv://cs260:Mge23545%21mongo@ryann.tqxoeol.mongodb.net/?retryWrites=true&w=majority&appName=Ryann';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Endpoint to create a new user account
// Endpoint to create a new user account
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if username already exists
        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = { username, password: hashedPassword };
        await collection.insertOne(newUser); // Insert the new user into the collection

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


//Serve static files from the 'public' directory


app.use(express.static('public'));

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

// // Endpoint to fetch inspirational quote
// app.get('/quote', async (req, res) => {
//     try {
//         // Fetch quote from a third-party API
//         const response = await fetch('https://api.quotable.io/random');
//         const data = await response.json();
//         console.log('Response from API:', data); // Log the response
        
//         // Extract the quote content
//         const quoteContent = data.content;

//         // Check if the quote content has 35 characters or fewer
//         if (quoteContent.length <= 35) {
//             // Send the quote in the response if it meets the character limit
//             res.json({ quote: quoteContent });
//         } else {
//             // Send an empty quote in the response if the quote exceeds the character limit
//             res.json({ quote: '' });
//         }
//     } catch (error) {
//         console.error('Error fetching quote:', error);
//         res.status(500).json({ error: 'Failed to fetch quote' });
//     }
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

