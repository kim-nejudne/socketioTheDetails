const joinRoom = (roomTitle, nsId) => {
  console.log("roomTitle", roomTitle);
  console.log("nsId", nsId);

  nameSpaceSockets[nsId].emit("joinRoom", { roomTitle });
}