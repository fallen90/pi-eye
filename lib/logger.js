var winston = require('winston');
require('winston-papertrail').Papertrail;

module.exports = function(hostname) {
	var winstonPapertrail = new winston.transports.Papertrail({
		host: 'logs5.papertrailapp.com',
		port: 26438,
		hostname : hostname || 'pi-eye'
	});

	winstonPapertrail.on('error', function(err) {});

	var logger = new winston.Logger({
		transports: [winstonPapertrail, new(winston.transports.Console)()]
	});
	return logger;
};