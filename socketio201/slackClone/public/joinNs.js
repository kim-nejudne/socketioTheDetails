const joinNs = (element, nsData) => {
  const roomList = document.querySelector(".room-list");
  const nsEndpoint = element.getAttribute("ns");
  const clickedNs = nsData.find((e) => e.endpoint === nsEndpoint);
  const rooms = clickedNs.rooms;

  roomList.innerHTML = "";
  rooms.forEach((room) => {
    roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });

  localStorage.setItem('lastNs', nsEndpoint);
};
