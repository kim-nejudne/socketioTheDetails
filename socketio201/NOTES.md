# NOTES

## Slack Clone

So there's the socketIO server, namespaces, and rooms

SocketIO Server
    |--- namespace 1
            |-- room 1.1
            |-- room 1.2
            |-- room 1.3
    |--- namespace 2
            |-- room 2.1
            |-- room 2.2
            |-- room 2.3
    |--- namespace 3
            |-- room 3.1
            |-- room 3.2
            |-- room 3.3

The socket server is the big boss
The individual socket is a single connection to the big boss
if I have ten clients connected to the socket server,
    that means I have ten open sockets or connected sockets

to send a message from the server to an individual socket:

```
io.on('connection', (socket) => {
    // this sends a message from the server to the individual connected socket
    socket.emit('hello there socket');
    socket.send('hello there socket');

    // send an event from a socket to a room
    socket.to(roomName).emit();
    socket.in(roomName).emit();

    // a socket can send a message to another socket
    socket.to(anotherSocketId).emit();
    socket.in(anotherSocketId).emit();

    // a namespace can send a message to any room
    // this probably allows for more control
    // you can manually put in the namespace and the roomName
    io.of(aNamespace).to(roomName).emit();
    io.of(aNamespace).in(roomName).emit();

    // a namespace can send a message to an entire namespace
    // the `io` object is the server instance
    // when you emit directly from the `io` object, you're broadcasting
    io.emit();
    io.of('/').emit();
    io.of('/admin').emit();
})
```

Alright. Sounds cool.

```
const io = require('socket.io')(server);

// Default namespace
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Send to everyone in the default namespace
  });
});

// Admin namespace
const adminNamespace = io.of('/admin'); 
adminNamespace.on('connection', (socket) => {
  socket.on('ban user', (userId) => {
    // ... logic to ban a user ...
    adminNamespace.emit('user banned', userId); // Send to admins only
  });
});
```

So there's a default namespace, the root "/"
And you can create new namespaces with:
const newNamespace = io.of('/newNamespace');