const { WebSocketServer } = require('ws');
const uuid = require('uuid');
//const wss = new WebSocket.Server({ port: 3000 });



function peerProxy(httpServer) {
    const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });
  // Event listener for WebSocket connections
let connections = []
wss.on('connection', function connection(ws) { 
    console.log('WebSocket connection established');
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);
    // Event listener for receiving messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received:', message.toString()); // Convert the buffer to a string
        
        // Broadcast the message to all connected clients
    //    wss.clients.forEach(function each(client) {
    //         if (client !== ws && client.readyState === WebSocket.OPEN) {
    //             client.send(message.toString()); // Convert the buffer to a string before sending
    //         }
    //     });
    // }); 
    ws.on('message', function message(data) {
        connections.forEach((c) => {
          if (c.id !== connection.id) {
            c.ws.send(data);
          }
        });
      });
  
      // Remove the closed connection so we don't try to forward anymore
      ws.on('close', () => {
        const pos = connections.findIndex((o, i) => o.id === connection.id);
  
        if (pos >= 0) {
          connections.splice(pos, 1);
        }
      });
  
      // Respond to pong messages by marking the connection alive
      ws.on('pong', () => {
        connection.alive = true;
      });
    });
// Keep active connections alive
    setInterval(() => {
        connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
        if (!c.alive) {
            c.ws.terminate();
            console.log('Connection Killed')
        } else {
            c.alive = false;
            c.ws.ping();
        }
    });
  }, 10000);
    // Event listener for WebSocket disconnection
    ws.on('close', function close() {
        console.log('WebSocket connection closed');
    });
});
}

module.exports = { peerProxy };

