const socket = io("/");
const peer = new Peer(undefined, {
  host: "/",
  port: "3001",
});

const sendBtn = document.querySelector("#send-btn");
const msgInp = document.querySelector("#msg-inp");

let connections = [];

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
  connections.push(peer.connect(id));
});

socket.on("user-connected", (userId) => {
  ConnectToUsr(userId);
  console.log("User Connected: " + userId);
});

function ConnectToUsr(userId) {
  let conn = peer.connect(userId);

  connections.push(conn);

  sendBtn.addEventListener("click", () => {
    broadcast("aa");
  });
}

peer.on("connection", function (conn) {
  connections.push(conn);

  connections.forEach((connection) => {
    connection.on("data", function (data) {
      console.log(data);

      sendBtn.addEventListener("click", () => {
        broadcast("aa");
      });
    });
  });
});

function broadcast(msg) {
  connections.forEach((connection) => {
    connection.send(msg);
  });
}
