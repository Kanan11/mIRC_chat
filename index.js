var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(3007);

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/public/index.html');
});

connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Connected");
	// lägga till ny connection
	connections.push(socket);

	socket.on('disconnect', function(data) {
		// Ta bort USER
		connections.splice(connections.indexOf(socket), 1);
		console.log("Disconnected");
	});

	// To mot meddelande
	socket.on('send mess', function(data) {
		// inne func vi skickar ny data 'add mess',
		// det data ska synas i varie user 
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});

	
	socket.on('typing', (data)=>{
		if(data.typing==true)
		   io.emit('display', data)
		else
		   io.emit('display', data)
	  })

});