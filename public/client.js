const socket = io("/");
const peer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const sendBtn = document.querySelector("#send-btn");
const msgInp = document.querySelector("#msg-inp");

let peers = [];

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
  peers.push(id);
});

socket.on("user-connected", (userId) => {
  ConnectToUsr(userId);
  console.log("User Connected: " + userId);
});

function ConnectToUsr(userId) {
  let conn = peer.connect(userId);

  peers.push(conn.peer);

  sendBtn.addEventListener("click", () => {
    Broadcast(msgInp.value);
  });
}

peer.on("connection", function (conn) {
  peers.push(conn.peer);

  conn.on("data", function (data) {
    console.log(data);

    sendBtn.addEventListener("click", () => {
      Broadcast(msgInp.value);
    });
  });
});

function Broadcast(msg) {
  for (let i = 0; i < peers.length; i++) {
    let conn = peer.connect(peers[i]);
    console.log("Created new connection for peer: " + conn.peer)
    conn.send(msg);
  }
}
