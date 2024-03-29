// // Import necessary modules
// const WebSocket = require('ws');

// // Create a WebSocket server
// const ws = new WebSocket('ws://localhost:4000');
//  // Change the port if needed

// // Define a function to broadcast messages to all connected clients
// function broadcast(message) {
//   wss.clients.forEach(function each(client) {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// }

// // Event listener for when a client connects to the server
// wss.on('connection', function connection(ws) {
//   // Event listener for when a client sends a message
//   ws.on('message', function incoming(message) {
//     // Broadcast the message to all clients
//     broadcast(message);
//   });
// });

// console.log('WebSocket server is running...');










// Import necessary modules
//const WebSocket = require('ws');

// // Create a WebSocket server
// const wss = new WebSocket.Server({ port: 4000 }); // Assuming WebSocket server listens on port 4000

// // Event listener for when a client connects to the server
// wss.on('connection', function connection(ws) {
//   // Event listener for when a client sends a message
//   ws.on('message', function incoming(message) {
//     // Broadcast the message to all clients, including the username
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

// console.log('WebSocket server is running...');

// const { WebSocketServer } = require('ws');
// const uuid = require('uuid');

// function peerProxy(httpServer) {
//   // Create a websocket object
//   const wss = new WebSocketServer({ noServer: true });

//   // Handle the protocol upgrade from HTTP to WebSocket
//   httpServer.on('upgrade', (request, socket, head) => {
//     wss.handleUpgrade(request, socket, head, function done(ws) {
//       wss.emit('connection', ws, request);
//     });
//   });

//   // Keep track of all the connections so we can forward messages
//   let connections = [];

//   wss.on('connection', (ws) => {
//     const connection = { id: uuid.v4(), alive: true, ws: ws };
//     connections.push(connection);

//     // Forward messages to everyone except the sender
//     ws.on('message', function message(data) {
//       connections.forEach((c) => {
//         if (c.id !== connection.id) {
//           c.ws.send(data);
//         }
//       });
//     });

//     // Remove the closed connection so we don't try to forward anymore
//     ws.on('close', () => {
//       const pos = connections.findIndex((o, i) => o.id === connection.id);

//       if (pos >= 0) {
//         connections.splice(pos, 1);
//       }
//     });

//     // Respond to pong messages by marking the connection alive
//     ws.on('pong', () => {
//       connection.alive = true;
//     });
//   });

//   // Keep active connections alive
//   setInterval(() => {
//     connections.forEach((c) => {
//       // Kill any connection that didn't respond to the ping last time
//       if (!c.alive) {
//         c.ws.terminate();
//       } else {
//         c.alive = false;
//         c.ws.ping();
//       }
//     });
//   }, 10000);
// }

// module.exports = { peerProxy };


// peerProxy.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

// Event listener for WebSocket connections
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


