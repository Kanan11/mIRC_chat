var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


server.listen(3037);
app.use(express.static("public"));

const users = {};
connections = [];

io.sockets.on("connection", function (socket) {
  console.log("Connected");
  let userName = null;

  // -------- Ta emot data från klient och skicka till alla användare vem som anslutit ------------
  socket.on("new-user", (name) => {
    connections.push({ id: socket.id, userName: name, typing: false })
    users[socket.id] = userName;
    socket.broadcast.emit("user-connected", name);
  });


  socket.on("disconnect", function (data) {
    io.sockets.emit("user-disconnected", userName);

    // Ta bort USER
    connections.splice(socket.id.indexOf(socket), 1);
    console.log("Disconnected");
  });

  // Ta mot meddelande
  socket.on("send mess", function (data) {
    // inne func vi skickar ny data 'add mess',
    // det data ska synas i varie user
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: userName,
      className: data.className,
    });
  });

  socket.on("typing", (data) => {
    userName = data.name;
    io.emit("display", data);
  });

});

