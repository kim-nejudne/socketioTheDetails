const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
const Room = require("./classes/Room");

// serves the files in the public folder
app.use(express.static(__dirname + "/public"));

// this handles https traffic
const expressServer = app.listen(3000);

// this handles websocket traffic
const io = socketio(expressServer);

app.get("/updateNs", (req, res) => {
  const newRoom = new Room({
    roomId: 3,
    roomTitle: "Added Room",
    namespaceId: 0,
    privateRoom: false,
  });

  namespaces[0].addRoom(newRoom);

  io.of(namespaces[0].endpoint).emit("nsRoomsLoad", namespaces[0].rooms);

  res.send(namespaces[0]);
});

// listen for connection on entire socket server
// on the server, we say io.on('connection') to listen for a connection
io.on("connection", (socket) => {
  socket.emit("welcome", "welcome to the socket server");

  socket.on("clientConnect", (data) => {
    // console.log(data);
  });

  // send nsList data to the client
  // this sends the namespaces array to all clients
  socket.emit("nsList", namespaces);
});

namespaces.forEach((namespace) => {
  const nsEndpoint = namespace.endpoint;

  // over here, we're just console logging the connection for each namespace
  io.of(nsEndpoint).on('connection', (nsSocket) => {
    nsSocket.on("joinRoom", async (data, callback) => {
      const { roomTitle } = data;

      // leave all rooms before joining
      nsSocket.rooms.forEach((room, i) => {
        if (i !== 0) {
          nsSocket.leave(room);
        }
      });

      nsSocket.join(roomTitle);

      const socketCount = await io.of(nsEndpoint).in(roomTitle).fetchSockets();

      callback({
        status: "ok",
        message: `You have joined ${roomTitle}`,
        userCount: socketCount.length,
      });
    });
  });
});
