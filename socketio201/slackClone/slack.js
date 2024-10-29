const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");

// serves the files in the public folder
app.use(express.static(__dirname + "/public"));

// this handles https traffic
const expressServer = app.listen(3000);

// this handles websocket traffic
const io = socketio(expressServer);

// listen for connection on entire socket server
// on the server, we say io.on('connection') to listen for a connection
io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to the socket server");

  socket.on("clientConnect", (data) => {
    console.log(data);
  });

  // send nsList data to the client
  // this sends the namespaces array to all clients
  socket.emit("nsList", namespaces);
});

namespaces.forEach((namespace) => {
  const nsEndpoint = namespace.endpoint;

  // over here, we're just console logging the connection for each namespace
  io.of(nsEndpoint).on('connection', (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${nsEndpoint}`);
  });
});