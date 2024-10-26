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
  console.log("nsData", nsData);

  // when client receives nsList data from server,
  // render the nsList data to the DOM
  const namespacesDiv = document.getElementById("namespaces");
  nsData.forEach(({ endpoint, img }) => {
    namespacesDiv.innerHTML += `<div class="namespace" ns="${endpoint}"><img src="${img}" /></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (nsElement) => {
      const roomList = document.querySelector(".room-list");

      const nsEndpoint = nsElement.getAttribute("ns");

      console.log("nsEndpoint", nsEndpoint);

      nsElement.addEventListener("click", (event) => {
        event.preventDefault();

        const clickedNs = nsData.find((e) => e.endpoint === nsEndpoint);
        const rooms = clickedNs.rooms;

        roomList.innerHTML = "";
        rooms.forEach((room) => {
          roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
        });
      });
    }
  );
});
