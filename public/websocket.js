// // Mocked WebSocket messages
// const mockedMessages = [
//     "Ryann has started a study session!",
//     "Elise finished a study session!",
//     "Ryann: Good job elise! :3"
// ];

// // Function to display messages from mocked WebSocket
// function displayMockedMessages() {
//     const websocketPlaceholder = document.getElementById('websocket-placeholder');
//     mockedMessages.forEach(message => {
//         const messageElement = document.createElement('p');
//         messageElement.textContent = message;
//         websocketPlaceholder.appendChild(messageElement);
//     });
// }

// // Function to send user input to mocked database data
// function sendMessage() {
//     const messageInput = document.getElementById('message-input').value.trim();
//     if (messageInput !== '') {
//         // Get the user's name (you can replace this with your actual user authentication mechanism)
//         const userName = "User"; // Replace "User" with the actual user's name
//         // Combine the user's name and message
//         const fullMessage = `${username}: ${messageInput}`;
//         // Add message to mocked database data
//         mockedMessages.push(fullMessage);
//         // Display the new message
//         displayMessage(fullMessage);
//         // Clear input field
//         document.getElementById('message-input').value = '';
//     }
// }

// // Event listener for the send button
// document.getElementById('sendButton').addEventListener('click', sendMessage);

// // Event listener for pressing Enter key in the input field
// document.getElementById('message-input').addEventListener('keypress', function(event) {
//     // Check if the pressed key is Enter (keyCode 13)
//     if (event.keyCode === 13) {
//         // Prevent the default action (form submission)
//         event.preventDefault();
//         // Call the sendMessage function
//         sendMessage();
//     }
// });

// // Function to display a message in the chat
// function displayMessage(message) {
//     const websocketPlaceholder = document.getElementById('websocket-placeholder');
//     const messageElement = document.createElement('p');
//     messageElement.textContent = message;

//     // Check if there are already 4 messages displayed
//     if (websocketPlaceholder.children.length >= 4) {
//         // Remove the top (oldest) message
//         websocketPlaceholder.removeChild(websocketPlaceholder.children[0]);
//     }

//     // Append the new message to the bottom
//     websocketPlaceholder.appendChild(messageElement);
// }

// // Display mocked messages initially
// displayMockedMessages();

// websocket.js

// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

// Event listener for WebSocket open
socket.addEventListener('open', function (event) {
    console.log('WebSocket connection established');
});

// Event listener for WebSocket messages
socket.addEventListener('message', function (event) {
    const message = event.data;
    displayMessage(message);
});

// Function to send message to server
function sendMessage() {
    const messageInput = document.getElementById('message-input').value.trim();
    if (messageInput !== '') {
        const userName = "User"; // Replace "User" with actual user's name
        const fullMessage = `${userName}: ${messageInput}`;
        socket.send(fullMessage);
        // Clear input field
        document.getElementById('message-input').value = '';
    }
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);

// Event listener for pressing Enter key in the input field
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }
});

// Function to display a message in the chat
function displayMessage(message) {
    const websocketPlaceholder = document.getElementById('websocket-placeholder');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;

    // Check if there are already 4 messages displayed
    if (websocketPlaceholder.children.length >= 4) {
        websocketPlaceholder.removeChild(websocketPlaceholder.children[0]);
    }

    websocketPlaceholder.appendChild(messageElement);
}



