var moment = require('moment'),
	fs = require('fs'),
	path = require('path');

recorder = function(feed_name, feed_buffer) {
	var timestamp = moment().format('YYYY-DD-MM-hhmmss');
	var date = moment().format('YYYY-DD-MM');

	var filepath = path.join(process.cwd(), 'recording', feed_name, date);
	var filename = timestamp + '.jpg';

	if (!fs.existsSync(filepath))
		require('mkdirp').sync(filepath, '0777');

	fs.writeFile(path.join(filepath, filename), feed_buffer, function(err) {
		if(err) console.log('ERROR SAVING', err);
	});
}

module.exports = recorder;