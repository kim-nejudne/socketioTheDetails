// const username = prompt("What is your username?");

const username = "kim";

const socket = io("http://localhost:3000");
// const wikiSocket = io("http://localhost:3000/wiki");
// const mozillaSocket = io("http://localhost:3000/mozilla");
// const linuxSocket = io("http://localhost:3000/linux");

// sockets will be put in this array in the index of their ns.id
const nameSpaceSockets = [];
const listeners = {
  nsChange: [],
}

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on("nsRoomsLoad", (rooms) => {
      console.log("rooms", rooms);
    });

    listeners.nsChange[nsId] = true;
  }
}

// on the client, we say socket.on('connect') to listen for a connection
socket.on("connect", () => {
  // this line emits an event to the server
  socket.emit("clientConnect", { message: `${socket.id} has connected` });

  socket.emit("clientLogin", { username });
});

socket.on("nsRoomsLoad", (rooms) => {
  console.log("rooms", rooms);
});

// listen for the nsList event from the server
socket.on("nsList", (nsData) => {
  // when client receives nsList data from server,
  // render the nsList data to the DOM
  const namespacesDiv = document.getElementById("namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(({ id, endpoint, img }) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${endpoint}"><img src="${img}" /></div>`;


    // create a new socket for each namespace only if it doesn't exist in the nameSpaceSockets array
    if (!nameSpaceSockets[id]) {
      nameSpaceSockets[id] = io(`http://localhost:3000${endpoint}`);
    }

    addListeners(id);

  });

  const lastNs = localStorage.getItem("lastNs");
  const lastNsId = lastNs ? nsData.find((e) => e.endpoint === lastNs).id : 0;

  const namespaces = document.getElementsByClassName("namespace");

  Array.from(namespaces).forEach((nsElement) => {
    nsElement.addEventListener("click", (event) => {
      event.preventDefault();
      joinNs(nsElement, nsData);
    });
  });

  joinNs(namespaces[lastNsId] || namespaces[0], nsData);
});
