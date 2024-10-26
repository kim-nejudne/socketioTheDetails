// const username = prompt("What is your username?");

const username = "kim";

const socket = io("http://localhost:3000");

// on the client, we say socket.on('connect') to listen for a connection
socket.on("connect", () => {
  console.log("Connected!");

  // this line emits an event to the server
  socket.emit("clientConnect", { message: "I am connected", id: socket.id });

  socket.emit("clientLogin", { username });
});

socket.on("welcome", (data) => {
  console.log("welcome data", data);
});

socket.on("rules", (data) => {
  console.log("rules data", data);
});

// listen for the nsList event from the server
socket.on("nsList", (nsData) => {
  // when client receives nsList data from server,
  // render the nsList data to the DOM
  const namespacesDiv = document.getElementById("namespaces");
  namespacesDiv.innerHTML = '';
  nsData.forEach(({ endpoint, img }) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${endpoint}"><img src="${img}" /></div>`;
  });

  const lastNs = localStorage.getItem('lastNs');
  const lastNsId = nsData.find((e) => e.endpoint === lastNs).id;

  const namespaces = document.getElementsByClassName("namespace");

  Array.from(namespaces).forEach((nsElement) => {
    nsElement.addEventListener("click", (event) => {
      event.preventDefault();
      joinNs(nsElement, nsData);
    });
  });

  joinNs(namespaces[lastNsId] || namespaces[0], nsData);
});
