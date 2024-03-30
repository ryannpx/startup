let webSocket;
let configure = false;


// Establish WebSocket connection
//const socket = new WebSocket('ws://localhost:3000');
function configureWebSocket() {
    if (!configure ){
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'; // added 
    console.log('Websocket Configured');
    webSocket = new WebSocket(`${protocol}://${window.location.host}/ws`); // added 
    configure = true;
}
    // webSocket.onopen = (event) => {
    //    displayStoredMessages('system', 'game', 'connected'); // when someone connects
    //   };
    // webSocket.onclose = (event) => {
    //     displayMsg('system', 'game', 'disconnected'); // when someone disconnects
    //   };
    webSocket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        // if (msg.type === GameEndEvent) {
        //   this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
        // } else if (msg.type === GameStartEvent) {
        //   this.displayMsg('player', msg.from, `started a new game`);
        // }
      };
    
};
// // Event listener for WebSocket open
// socket.addEventListener('open', function (event) {
//     console.log('WebSocket connection established');
// });

// // Event listener for WebSocket messages
// socket.addEventListener('message', function (event) {
//     const message = event.data;
//     storeMessageLocally(message); // Store the received message locally
//     displayMessage(message); // Display the received message
// });

// Function to store a new message locally
function storeMessageLocally(message) {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    storedMessages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
}

// Function to send message to server
// function sendMessageToServer(message) {
//     if (message !== '') {
//         webSocket.send(message);
//     }
// }
function sendMessageToServer(message) {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(message);
        displayMessage(message); // Call displayMessage after sending the message

    } else {
        console.error('WebSocket connection not open.');
    }
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input').value.trim();
    // const username = "User"; // Replace "User" with actual user's name
    const fullMessage = `${username}: ${messageInput}`;
    sendMessageToServer(fullMessage); // Send message to server
    document.getElementById('message-input').value = ''; // Clear input field
});

// Event listener for pressing Enter key in the input field
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById('sendButton').click(); // Trigger click event on send button
    }
});

// Function to display a message in the chat, limited to a maximum of four messages
function displayMessage(message) {
    const websocketPlaceholder = document.getElementById('websocket-placeholder');

    // Check if there are already four messages displayed
    if (websocketPlaceholder.children.length >= 4) {
        // Remove the top (oldest) message
        websocketPlaceholder.removeChild(websocketPlaceholder.children[0]);
    }

    // Create a new message element and append it to the bottom
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    websocketPlaceholder.appendChild(messageElement);
}


// Function to retrieve messages from local storage and display the last four messages
function displayStoredMessages() {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const websocketPlaceholder = document.getElementById('websocket-placeholder');
    websocketPlaceholder.innerHTML = ''; // Clear existing messages

    // Determine the starting index for displaying messages
    const startIndex = Math.max(0, storedMessages.length - 4);

    // Iterate over the last four messages and display them
    for (let i = startIndex; i < storedMessages.length; i++) {
        const messageElement = document.createElement('p');
        messageElement.textContent = storedMessages[i];
        websocketPlaceholder.appendChild(messageElement);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    configureWebSocket(); // This line is sufficient, no need to call it again outside of the event listener
    displayStoredMessages();
});




