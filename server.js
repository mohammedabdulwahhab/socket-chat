const express = require('express')
const app = express()
const WebSocket = require('ws').Server

// Set middleware on the app

// Serve statics including index.html
app.use(express.static('public'))

// Start the server listening on 2000 and get the server
const httpServer = app.listen(2000)

// Create a new web socket server from our existing http server
const wsServer = new WebSocket({
    server: httpServer
})

// Maintain an active list of all connected users
clients = []

wsServer.on('connection', (wsClient) => {
    console.log('New client just connected!', wsClient.origin)
    // Push connected client to list of clients
    clients.push(wsClient)
    // Broadcast message that client send to all clients
    client.on('message', forwardMessagetoClients)
})

function forwardMessagetoClients(message){
    // Forward message to all clients inclduing sender
    clients.forEach(client => {
        client.send(message)
    });
}





