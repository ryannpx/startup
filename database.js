const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const taskCollection = db.collection('usertasks');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(user) {
  return userCollection.findOne({ user: user });
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

async function saveTasksForUser(username, tasks) {
    try {
        // Update or insert tasks for the user in the database
        const result = await userCollection.updateOne(
            { username: username }, // Filter by user's username
            { $set: { tasks: tasks } }, // Set or update the tasks
            { upsert: true } // Create a new document if it doesn't exist
        );
        console.log('Tasks saved for user:', username);
        return result.modifiedCount; // Return the number of modified documents
    } catch (error) {
        console.error('Error saving tasks for user:', username, error);
        throw error; // Throw the error for handling in the calling function
    }
}

async function getTasksForUser(username) {
    try {
        // Find tasks for the user in the database
        const userTasks = await userCollection.findOne({ username: username });
        return userTasks ? userTasks.tasks : null; // Return the tasks if found, otherwise return null
    } catch (error) {
        console.error('Error retrieving tasks for user:', username, error);
        throw error; // Throw the error for handling in the calling function
    }
}



module.exports = {
  getUser,
  getUserByToken,
  createUser,
  saveTasksForUser,
  getTasksForUser,
};











