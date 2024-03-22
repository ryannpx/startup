const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');
const mongoose = require("mongoose");
const url = `mongodb+srv://cs260:Mge23545%21mongo@ryann.tqxoeol.mongodb.net`; 
//const db = client.db('startup');//
//
// const userCollection = db.collection('users');
// const taskCollection = db.collection('tasks');
//
// const connect = mongoose.connect("mongodb://localhost:27017/startup");
//

const connectionString = 'mongodb+srv://cs260:Mge23545%21mongo@ryann.tqxoeol.mongodb.net/?retryWrites=true&w=majority&appName=Ryann';

mongoose.connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


// connect.then(() =>{
//     console.log("databse connected successfully");
// })

// .catch(() =>{
//     console.log("databse cannot be connected");
// });

//create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true
    }
});
//collection part
const collection= new mongoose.model("user", LoginSchema);
module.exports = collection;








// // Connect to the MongoDB server and initialize collections
// async function connectDatabase() {
//     try {
//         await client.connect();
//         db = client.db(config.database);
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         process.exit(1);
//     }
// }

// // Initialize collections
// function initializeCollections() {
//     if (!db) {
//         console.error('Database is not connected');
//         process.exit(1);
//     }
//     db.createCollection('users');
//     db.createCollection('tasks');
//     console.log('Collections initialized');
// }

// // Function to create a new user in the database
// async function createUser(username, password) {
//     const user = {
//         username: username,
//         password: password
//     };
//     try {
//         const result = await db.collection('users').insertOne(user);
//         console.log('User created:', result.insertedId);
//         return result.insertedId;
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw error;
//     }
// }

// // Function to retrieve a user from the database by username
// async function getUser(username) {
//     try {
//         const user = await db.collection('users').findOne({ username: username });
//         return user;
//     } catch (error) {
//         console.error('Error retrieving user:', error);
//         throw error;
//     }
// }

// // Function to create or update tasks for a user
// async function updateTasks(username, tasks) {
//     try {
//         const result = await db.collection('tasks').updateOne(
//             { username: username },
//             { $set: { tasks: tasks } },
//             { upsert: true }
//         );
//         console.log('Tasks updated:', result.modifiedCount);
//         return result.modifiedCount;
//     } catch (error) {
//         console.error('Error updating tasks:', error);
//         throw error;
//     }
// }

// // Function to retrieve tasks for a user
// async function getTasks(username) {
//     try {
//         const userTasks = await db.collection('tasks').findOne({ username: username });
//         return userTasks ? userTasks.tasks : null;
//     } catch (error) {
//         console.error('Error retrieving tasks:', error);
//         throw error;
//     }
// }

// module.exports = {
//     connectDatabase,
//     initializeCollections,
//     createUser,
//     getUser,
//     updateTasks,
//     getTasks
// };

