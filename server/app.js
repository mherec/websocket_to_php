// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new connections to the WebSocket server
wss.on('connection', function connection(ws) {
    console.log('A new client has connected.');

    // Event listener for messages from clients
    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
        // Check if the received message is 'test'
        if (message == 'test') {
            // Send a 'test-ok' message back to the client
            ws.send('test-ok');
        }
    });

    // Send a welcome message to the client upon connection
    ws.send('Welcome to the WebSocket server! Type "test" to get a predefined response from the server.');

    // Send a 'Connection OK!' message to the client every 10 seconds
    setInterval(() => {
        ws.send('Connection OK!');
    }, 10000);
});

// Log that the WebSocket server is running
console.log('WebSocket server is running on port 8080.');
