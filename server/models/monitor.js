var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var monitorSchema = new Schema({
	name: String,
	index: Number,
	camera: String,
	socket_id: {
		type: String,
		unique: true,
		index: true
	},
	connection_state: String,
	connected_at: Date,
	announced_at: Date
}, { collection: 'monitors' });

module.exports = mongoose.model('Monitor', monitorSchema);