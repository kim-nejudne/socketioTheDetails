const joinRoom = async (roomTitle, nsId) => {

  const ackRes = await nameSpaceSockets[nsId].emitWithAck("joinRoom", { roomTitle })
  document.querySelector(".curr-room-num-users").innerHTML = `${ackRes.userCount} <span class="fa-solid fa-user"></span>`;
  document.querySelector(".curr-room-text").innerText = roomTitle;
  document.querySelector("#messages").innerHTML = ackRes.history.map(buildMessageHTML).join("");
}
