var express = require('express'),
	http = require('http'),
	app = express(),
	log = require('./lib/logger.js');

global.intervals = [];

// Express
app.set('port', 8080);
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('HTTP server listening on port ' + app.get('port'));
});

// WebSocket Client connection to Socket Server
var socket = require('socket.io-client')(process.env.SOCKET_SERVER_URL);
socket.on('connect', function() {
	log.info('Connected to ' + process.env.SOCKET_SERVER_URL);
});
socket.on('disconnect', function() {
	log.info('Connected to ' + process.env.SOCKET_SERVER_URL);
});

// io.on('connection', function(socket) {
// 	console.log('CLIENT CONNECT : ', socket.id);

// 	let tick = require('./video_capture_socket')(socket);
// 	intervals[socket.id] = tick;

// 	socket.on('disconnect', function() {
// 		console.log("CLIENT DISCONNECT : ", socket.id);
// 		clearInterval(intervals[socket.id]);
// 	});
// });


module.exports.app = app;