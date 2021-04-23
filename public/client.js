const socket = io("/");
const peer = new Peer(undefined, {
  host: "/",
  port: "3001",
});


peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

socket.on("user-connected", userId => {
    console.log("User COnnected " + userId);
})