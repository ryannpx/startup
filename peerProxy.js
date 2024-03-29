



const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

// Event listener for WebSocket connections
wss.on('connection', function connection(ws) {
    console.log('WebSocket connection established');

    // Event listener for receiving messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received:', message.toString()); // Convert the buffer to a string
        
        // Broadcast the message to all connected clients
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Convert the buffer to a string before sending
            }
        });
    });

    // Event listener for WebSocket disconnection
    ws.on('close', function close() {
        console.log('WebSocket connection closed');
    });
});

