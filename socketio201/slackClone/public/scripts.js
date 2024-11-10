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
  messageToRoom: [],
}

// global variable we can update when a user clicks on a namespace
// we will use it to broadcast across the app
let selectedNsId = 0;

document.querySelector(".message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const userMessageElement = document.getElementById("user-message");
  const newMessage = userMessageElement.value;
  // socket.emit("newMessageToServer", { text: newMessage });

  userMessageElement.value = "";

  nameSpaceSockets[selectedNsId].emit("newMessageToRoom", {
    text: newMessage,
    date: Date.now(),
    username,
  });
});

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on("nsRoomsLoad", (rooms) => {
    });

    listeners.nsChange[nsId] = true;
  }

  if (!listeners.messageToRoom[nsId]) {
    nameSpaceSockets[nsId].on("messageToRoom", (data) => {
      // const newMessage = buildHTML(data);
      // const messages = document.querySelector(".message-history");
      // messages.innerHTML += newMessage;
      // messages.scrollTo(0, messages.scrollHeight);


      document.querySelector("#messages").innerHTML += buildMessageHTML(data);

    });

    listeners.messageToRoom[nsId] = true;
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

const buildMessageHTML = ({ text, date, username }) => {
  const dateObj = new Date(date);
  const time = dateObj.toLocaleTimeString();
  return `
    <li>
      <div class="user-message">
        <div class="user-name-time">${username} <span>${time}</span></div>
        <div class="message-text">${text}</div>
      </div>
    </li>
  `
};