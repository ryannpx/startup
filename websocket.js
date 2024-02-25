// Mocked WebSocket messages
const mockedMessages = [
    "Ryann has started a study session!",
    "Elise finished a study session!",
    "Ryann: Good job elise! :3"
];

// Function to display messages from mocked WebSocket
function displayMockedMessages() {
    const websocketPlaceholder = document.getElementById('websocket-placeholder');
    mockedMessages.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        websocketPlaceholder.appendChild(messageElement);
    });
}

// Function to send user input to mocked database data
function sendMessage() {
    const messageInput = document.getElementById('message-input').value.trim();
    if (messageInput !== '') {
        // Add message to mocked database data
        mockedMessages.push(messageInput);
        // Display the new message
        displayMessage(messageInput);
        // Clear input field
        document.getElementById('message-input').value = '';
    }
}

// Event listener for the send button
document.getElementById('sendButton').addEventListener('click', sendMessage);


// Function to display a message in the chat
function displayMessage(message) {
    const websocketPlaceholder = document.getElementById('websocket-placeholder');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    websocketPlaceholder.appendChild(messageElement);
}

// Display mocked messages initially
displayMockedMessages();
