const { create } = require('domain');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3037);



connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Connected");
	// lägga till ny connection
	socket.on('createUser', function(data) {
		connections.push({id:socket.id, data:data.name, typing:false});
		
	})
	socket.on('disconnect', function(data) {
		console.log(connections);
		// Ta bort USER
		
		connections.splice(socket.id.indexOf(socket), 1);
		console.log("Disconnected");
	});
	
	// Ta mot meddelande
	socket.on('send mess', function(data) {
		// inne func vi skickar ny data 'add mess',
		// det data ska synas i varie user 
		io.sockets.emit('add mess', {id: data.id, mess: data.mess, name: data.name, className: data.className});
	});
	
	
	socket.on('typing', (data)=>{
		console.log("typing");
		if(data.typing==true)
		io.emit('display', data)
		else
		io.emit('display', data)
	})
	
});

app.use(express.static("public"))