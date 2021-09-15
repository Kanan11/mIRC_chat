const { create } = require("domain");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.emit("chat-message", "Hello World!");
});

const users = {};

server.listen(3037);

connections = [];

io.sockets.on("connection", function (socket) {
  console.log("Connected");
  let userName = null;
  // --------- Broadcast - Ta emot data från klient och skicka till alla användare vem som anslutit ------------
  socket.on("new-user", (name) => {
    userName = name;
    // users[socket.id] = userName;
    socket.broadcast.emit("user-connected", userName);
    //console.log(users);
  });

  //---------------TEST------------------
  io.sockets.on("connection", function (socket) {
    socket.emit("message", "You are connected!" + socket.id);
  });
  //---------------TEST------------------

  // lägga till ny connection
  socket.on("createUser", function (data) {
    connections.push({ id: socket.id, data: data.name, typing: false });
  });
  socket.on("disconnect", function (data) {
    console.log(connections);
    io.sockets.emit("user-disconnected", userName);
    /* 		socket.broadcast.emit('user-connected', userName); */
    // Ta bort USER

    connections.splice(socket.id.indexOf(socket), 1);
    console.log("Disconnected");
  });

  // Ta mot meddelande
  socket.on("send mess", function (data) {
    // inne func vi skickar ny data 'add mess',
    // det data ska synas i varie user
    console.log(data.name);
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: userName,
      className: data.className,
    });
  });

  socket.on("typing", (data) => {
    userName = data.name;
    console.log("ontyping", data);
    io.emit("display", data);
  });
});

app.use(express.static("public"));
