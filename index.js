var express = require('express'),
	http = require('http');

global.intervals = [];

// app parameters
var app = express();
app.set('port', 8080);

//Express routes
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// HTTP server
var server = http.createServer(app);
server.listen(app.get('port'), function() {
	console.log('HTTP server listening on port ' + app.get('port'));
});

// WebSocket server
var io = require('socket.io')(server);
io.on('connection', function(socket) {
	console.log('CLIENT CONNECT : ', socket.id);

	let tick = require('./lib/video_capture_socket')(socket);
	intervals[socket.id] = tick;

	socket.on('disconnect', function() {
		console.log("CLIENT DISCONNECT : ", socket.id);
		clearInterval(intervals[socket.id]);
	});
});


module.exports.app = app;