const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const scoreCollection = db.collection('task');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addTask(task) {
  scoreCollection.insertOne(task);
}

// function getHighScores() {
//   const query = { score: { $gt: 0, $lt: 900 } };
//   const options = {
//     sort: { score: -1 },
//     limit: 10,
//   };
//   const cursor = scoreCollection.find(query, options);
//   return cursor.toArray();
// }

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addTask,
  //getHighScores,
};









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

