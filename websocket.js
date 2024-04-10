// let webSocket;
// let configure = false;


// // Establish WebSocket connection
// //const socket = new WebSocket('ws://localhost:3000');
// function configureWebSocket() {
//     if (!configure ){
//     const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss'; // added 
//     console.log('Websocket Configured');
//     webSocket = new WebSocket(`${protocol}://${window.location.host}/ws`); // added 
//     configure = true;
// }
//     // webSocket.onopen = (event) => {
//     //    displayStoredMessages('system', 'game', 'connected'); // when someone connects
//     //   };
//     // webSocket.onclose = (event) => {
//     //     displayMsg('system', 'game', 'disconnected'); // when someone disconnects
//     //   };
//     webSocket.onmessage = async (event) => {
//         const msg = JSON.parse(await event.data.text());
//         const message = event.data;
//         displayMessage(message); //
//         // if (msg.type === GameEndEvent) {
//         //   this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
//         // } else if (msg.type === GameStartEvent) {
//         //   this.displayMsg('player', msg.from, `started a new game`);
//         // }
//       };
    
// };
// // // Event listener for WebSocket open
// // socket.addEventListener('open', function (event) {
// //     console.log('WebSocket connection established');
// // });

// // // Event listener for WebSocket messages
// // socket.addEventListener('message', function (event) {
// //     const message = event.data;
// //     storeMessageLocally(message); // Store the received message locally
// //     displayMessage(message); // Display the received message
// // });

// // Function to store a new message locally
// function storeMessageLocally(message) {
//     const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
//     storedMessages.push(message);
//     localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
    
// }

// // Function to send message to server
// function sendMessageToServer(message) {
//     if (webSocket && webSocket.readyState === WebSocket.OPEN) {
//         webSocket.send(message);
//     } else {
//         console.error('WebSocket connection not open.');
//     }
// }

// // Event listener for the send button
// document.getElementById('sendButton').addEventListener('click', function() {
//     const messageInput = document.getElementById('message-input').value.trim();
//     const fullMessage = `${username}: ${messageInput}`;
//     sendMessageToServer(fullMessage); // Send message to server
//     document.getElementById('message-input').value = ''; // Clear input field
// });

// // Function to display a message in the chat
// function displayMessage(message) {
//     const websocketPlaceholder = document.getElementById('websocket-placeholder');
//     const messageElement = document.createElement('p');
//     messageElement.textContent = message;
//     websocketPlaceholder.appendChild(messageElement);
// }

// document.addEventListener('DOMContentLoaded', function() {
//     configureWebSocket(); // This line is sufficient, no need to call it again outside of the event listener
//     //displayStoredMessages();
// });


let webSocket;
let configure = false;

function configureWebSocket() {
    if (!configure) {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        console.log('Websocket Configured');
        webSocket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        configure = true;
    }

    webSocket.onmessage = function(event) {
        const message = JSON.parse(event.data);
        displayMessage(message);
    };
}

function storeMessageLocally(message) {
    const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    storedMessages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(storedMessages));
}

// Function to send message to server
function sendMessageToServer(message) {
    if (webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(message);
    } else {
        console.error('WebSocket connection not open.');
    }
}

document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('message-input').value.trim();
    const fullMessage = `${username}: ${messageInput}`;
    sendMessageToServer(fullMessage);
    document.getElementById('message-input').value = '';
    displayMessage(fullMessage);
});

function displayMessage(message) {
    console.log('Displaying message');
    const websocketPlaceholder = document.getElementById('websocket-placeholder');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    websocketPlaceholder.appendChild(messageElement);
}

document.addEventListener('DOMContentLoaded', function() {
    configureWebSocket();
});


