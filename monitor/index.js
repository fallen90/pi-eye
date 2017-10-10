var express = require('express'),
	http = require('http'),
	app = express(),
	log = require('../lib/logger.js')('pi-eye-monitor'),
	identifier = { feed_name: 'TABLE', feed_index: 0, feed_camera: 'Logitech' };
	
global.intervals = [];

// Express
app.set('port', 8080);
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/socket.io', (req, res) => {
	res.sendFile(require('path').join(process.cwd(), '/node_modules/socket.io-client/dist/socket.io.js'));
});

// HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	log.info('HTTP server listening on port ' + app.get('port'));
});

// WebSocket Client connection to Socket Server
var socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);
socket.on('connect', function() {
	log.info('Connected to ' + process.env.SOCKET_SERVER_URL);
	socket.emit('announce', identifier);
});

socket.on('disconnect', function() {
	log.info('Disconnected from ' + process.env.SOCKET_SERVER_URL);
});

socket.on('client-connect', socket_id => {
	// data = { socket.id }
	//on Client connect init
	log('CLIENT CONNECT : ', socket_id);
	intervals[socket_id] = require('../lib/video_capture_socket')(socket);
});

socket.on('client-disconnect', socket_id => {
	log("CLIENT DISCONNECT : ", socket_id);
	clearInterval(intervals[socket_id]);
});

module.exports.app = app;