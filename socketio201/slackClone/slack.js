const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
const Room = require("./classes/Room");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(3000);

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

io.on("connection", (socket) => {
  socket.emit("nsList", namespaces);
});

namespaces.forEach((namespace) => {
  const nsEndpoint = namespace.endpoint;

  io.of(nsEndpoint).on('connection', (nsSocket) => {
    nsSocket.on("joinRoom", async (data, callback) => {
      const { roomTitle } = data;

      // leave all rooms before joining
      [...nsSocket.rooms].forEach((room, i) => {
        if (i > 0) {
          nsSocket.leave(room);
        }
      });

      nsSocket.join(roomTitle);

      const socketCount = await io.of(nsEndpoint).in(roomTitle).fetchSockets();
      const room = namespace.rooms.find((room) => room.roomTitle === roomTitle);

      callback({
        status: "ok",
        message: `You have joined ${roomTitle}`,
        userCount: socketCount.length,
        history: room.history,
      });
    });

    nsSocket.on("newMessageToRoom", (data) => {
      const rooms = nsSocket.rooms;
      const roomTitle = [...rooms][1];

      const room = namespace.rooms.find((room) => room.roomTitle === roomTitle);
      room.addMessage(data);

      io.of(nsEndpoint).to(roomTitle).emit("messageToRoom", data);
    });
  });
});
