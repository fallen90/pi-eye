var sio = require('socket.io'),
	server = require('http').createServer(),
	io = sio.listen(server);

// set socket.io debugging

io.set('origins', '*:*');

server.listen(9090, '0.0.0.0', () => {
	console.log('SOCKET SERVER STARTED on port 9090');
});

io.on('connection', function(socket) {
	socket.on('frame', data => {
		io.sockets.emit('frame', data);
	});
});