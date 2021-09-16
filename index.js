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
	  //userName = name;
    connections.push({ id: socket.id, userName: name, typing: false }) 
	  users[socket.id] = userName;
    //connections.forEach(element => console.log(element));
 
    socket.broadcast.emit("user-connected", name);

   //console.log(connections.valueOf(userName))
    //console.log(connections[0].userName)
    /* if(name === connections[0].userName){
      
      console.log('bingo')
    }else{
    } */
    /* connections.forEach((userName) => {
      console.log(userName);
    }); */
    //console.log(users + " users1");
	  //console.log(users, ' users2');
	  
    
	  /* console.log(userName, ' userName');
	  console.log(name, ' name'); */
	  //console.log(connections, ' connections');
	  //console.log(Object.keys(connections), connections[0].userName);
	  //console.log(socket, ' socket');
	});

 
 
  socket.on("disconnect", function (data) {
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
    //console.log('he is sending message now '+ data.name);
    io.sockets.emit("add mess", {
      mess: data.mess,
      name: userName,
      className: data.className,
    });
  });

  socket.on("typing", (data) => {
    userName = data.name;
    //console.log("ontyping", data);
    io.emit("display", data);
  });
});

