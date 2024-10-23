const express = require('express');
const app = express();
const socketio = require('socket.io')

// serves the files in the public folder
app.use(express.static(__dirname + '/public'));

// this handles https traffic
const expressServer = app.listen(3000);

// this handles websocket traffic
const io = socketio(expressServer)

// listen for connection on entire socket server
io.on('connection',(socket)=>{
    console.log(socket.id,"has connected")
    socket.emit('welcome', 'welcome to the socket server');
})

