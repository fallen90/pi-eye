var sio = require('socket.io'),
	server = require('http').createServer(),
	log = require('../lib/logger.js')('pi-eye-server');
	io = sio.listen(server),
	mongoose = require('mongoose');

//db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:3001/pieye');

// set socket.io debugging
io.set('origins', '*:*');

server.listen(9090, '0.0.0.0', () => {
	log.info('SOCKET SERVER STARTED on port 9090');
});

io.on('connection', function(socket) {
	
	feeds[socket.id] = {};

	socket.on('announce', data =>{
		feeds[socket.id] = data;
		log.info(feeds);
		io.sockets.emit('feed-list', data);
	});

	socket.on('update-feed-list',() => {
		io.sockets.emit('feed-list', feeds);
	});

	socket.on('frame', data => {
		io.sockets.emit('frame', data);
	});
});