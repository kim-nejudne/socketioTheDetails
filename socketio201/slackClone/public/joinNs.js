const joinNs = (element, nsData) => {
  const roomList = document.querySelector(".room-list");
  const nsEndpoint = element.getAttribute("ns");
  const clickedNs = nsData.find((e) => e.endpoint === nsEndpoint);
  selectedNsId = clickedNs.id;
  const rooms = clickedNs.rooms;

  roomList.innerHTML = "";
  rooms.forEach(({ namespaceId, privateRoom, roomTitle}) => {
    roomList.innerHTML += `<li class="room" nsId="${namespaceId}"><span class="fa-solid fa-${privateRoom ? 'lock' : 'globe'}"></span>${roomTitle}</li>`;
  });

  const roomNodes = document.querySelectorAll(".room");
  Array.from(roomNodes).forEach((elem) => {
    elem.addEventListener("click", (event) => {
      console.log("Someone clicked on a room node", event.target.innerText);
      joinRoom(event.target.innerText, selectedNsId);
    });
  });

  joinRoom(rooms[0].roomTitle, selectedNsId);

  localStorage.setItem('lastNs', nsEndpoint);
};
