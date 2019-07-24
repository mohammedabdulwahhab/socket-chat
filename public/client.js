console.log('Starting client')

// Begin connection to wsServer
let connection = new WebSocket('ws://localhost:2000')

connection.onopen = function (event){
    console.log('Connection to wsServer opened', event)
}

connection.onmessage = function (event){
    console.log('Message received', event)
    // Add message to list of messages
    document.getElementById('messages').innerHTML += '<li>' +  event.data + '</li>'
}

function sendMessage(message){
    console.log('Sending message to wsServer', message)
    connection.send(message)
}