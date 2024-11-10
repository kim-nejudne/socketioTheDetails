// const username = prompt("What is your username?");

const username = "kim";

const socket = io("http://localhost:3000");
const nameSpaceSockets = [];

let selectedNsId = 0;

const listeners = {
  nsChange: [],
  messageToRoom: [],
}

const addListeners = (nsId) => {
  if (!listeners.nsChange[nsId]) {
    nameSpaceSockets[nsId].on("nsRoomsLoad", (rooms) => {
    });

    listeners.nsChange[nsId] = true;
  }

  if (!listeners.messageToRoom[nsId]) {
    nameSpaceSockets[nsId].on("messageToRoom", (data) => {
      document.querySelector("#messages").innerHTML += buildMessageHTML(data);

    });

    listeners.messageToRoom[nsId] = true;
  }
}


document.querySelector(".message-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const userMessageElement = document.getElementById("user-message");
  const newMessage = userMessageElement.value;

  userMessageElement.value = "";

  nameSpaceSockets[selectedNsId].emit("newMessageToRoom", {
    text: newMessage,
    date: Date.now(),
    username,
  });
});

socket.on("connect", () => {
  socket.emit("clientConnect", { message: `${socket.id} has connected` });
  socket.emit("clientLogin", { username });
});

socket.on("nsList", (nsData) => {
  const namespacesDiv = document.getElementById("namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(({ id, endpoint, img }) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${endpoint}"><img src="${img}" /></div>`;

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
