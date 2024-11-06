const joinRoom = (roomTitle, nsId) => {
  nameSpaceSockets[nsId].emit("joinRoom", { roomTitle }, (ackRes) => {
    document.querySelector(".curr-room-num-users").innerHTML = `${ackRes.userCount} <span class="fa-solid fa-user"></span>`;
    document.querySelector(".curr-room-text").innerText = roomTitle;
  });
}
