const socket = io('http://localhost:3000');

// on the client, we say socket.on('connect') to listen for a connection
socket.on('connect', (data) => {
    console.log('Connected!');

    // this line emits an event to the server
    socket.emit('clientConnect', { message: 'I am connected', id: socket.id });
});

socket.on('welcome', (data) => {
    console.log('welcome data', data);
});
