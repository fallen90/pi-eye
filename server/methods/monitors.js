var Monitor = require('../models/monitor.js');
var log = require('../../lib/logger.js')('pi-eye-server');
var _ = require('underscore');

var MonitorHub = function() {
	var self = this;

	self.addMonitor = function(name, index, camera, socket_id, done) {
		let monitor = new Monitor({
			name: name,
			index: index,
			camera: camera,
			socket_id: socket_id
		});

		try {
			monitor.save(function(err) {
				if (err) {
					if (err.code == 11000) {
						self.getMonitorBySocket(monitor.socket_id, function(err, monitor) {
							if (err) {
								log.error(err);
								done(true, null);
							} else {
								done(false, monitor._id);
							}
						});
					} else {
						log.error(JSON.stringify(err, null, 4));
						done(true, null);
					}
				} else {
					done(false, monitor._id);
				}
			});
		} catch (ex) {
			log.error(JSON.stringify(ex, null, 4));
			done(true, null);
		}
	};

	self.getMonitor = function(id, cb) {
		Monitor.findById(id, function(err, monitor) {
			cb(err, monitor);
		});
	};

	self.getMonitorBySocket = function(socket_id, cb) {
		Monitor.find({ socket_id: socket_id }, cb);
	};

	self.monitorConnected = function(id, cb) {
		if(id == null) cb(false);

		console.log('monitorConnected', id);
		Monitor.findById(id, function(err, monitor) {
			console.log('monitorConnected', monitor);

			monitor.connected_at = new Date();
			monitor.connection_state = 'connected';

			monitor.save(err => {
				cb(err, monitor);
			});
		});
	}
}

mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:3001/pieye', { useMongoClient: true });
var monitorHub = new MonitorHub();
monitorHub.addMonitor('sample', '0', 'camera', 'socket_id', function(monitor) {
	console.log(monitor);
	monitorHub.monitorConnected(monitor, () => {
		console.log('connected', monitor);
		monitorHub.getMonitor(monitor, ex => {
			console.log('ex', ex);
		})
	});
});