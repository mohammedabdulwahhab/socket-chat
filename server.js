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

wsServer.on('connection', (wsClient, req) => {
    console.log('New client just connected!')
    forwardMessagetoClients('New member in chat')
    // Broadcast message that client send to all clients
    wsClient.on('message', forwardMessagetoClients)
    wsClient.on('close', () => {forwardMessagetoClients('A client left the chat')})
})

function forwardMessagetoClients(message){
    // Forward message to all clients inclduing sender - wsServer keeps a list of active clients
    wsServer.clients.forEach((client) => {
        client.send(message)
    });
}





