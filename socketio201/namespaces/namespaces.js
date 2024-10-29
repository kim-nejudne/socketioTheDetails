const express = require("express");
const app = express();
// require('socket.io') = Server in the docs
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8001);
// io = the server object in the docs!
const io = socketio(expressServer);

// io = server in the docs
io.of("/").on("connection", (socket) => {
  socket.join("chat");
  io.of("/")
    .to("chat")
    .to("chat2")
    .to("chat3")
    .emit("chatRoomWelcome", { stuff: "some stuff" });
  console.log(socket.id, "has connected");
  //in ws we use "send" method, and it socket.io we use the "emit" method
  // socket.emit('messageFromServer',{data:"Welcome to the socket server!"})
  socket.on("newMessageToServer", (dataFromClient) => {
    console.log("Data:", dataFromClient);
    io.emit("newMessageToClients", { text: dataFromClient.text });
  });
});

io.of("/admin").on("connection", (socket) => {
  socket.join("adminChat");
  io.of("/admin").to("adminChat").emit("adminChatWelcome", "Welcome to the admin chat!");

  console.log("Someone connected to the admin namespace!");
  io.of("/admin").emit(
    "admin-welcome",
    "Welcome to the admin channel, INFIDELS!"
  );
});
