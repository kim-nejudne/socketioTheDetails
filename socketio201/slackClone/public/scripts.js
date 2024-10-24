const username = prompt("What is your username?");

const socket = io('http://localhost:3000');

// on the client, we say socket.on('connect') to listen for a connection
socket.on('connect', () => {
    console.log('Connected!');

    // this line emits an event to the server
    socket.emit('clientConnect', { message: 'I am connected', id: socket.id });

    socket.emit('clientLogin', { username });
});

socket.on('welcome', (data) => {
    console.log('welcome data', data);
});

socket.on('rules', (data) => {
    console.log('rules data', data);
});

// listen for the nsList event from the server
socket.on('nsList', (nsData) => {
    console.log('nsData', nsData);

    // when client receives nsList data from server,
    // render the nsList data to the DOM
    const namespacesDiv = document.getElementById('namespaces');
    nsData.forEach(({ name, image }) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns="${name}"><img src="${image}" /></div>`;
    });
});