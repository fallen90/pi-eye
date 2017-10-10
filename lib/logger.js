var winston = require('winston');
require('winston-papertrail').Papertrail;

var winstonPapertrail = new winston.transports.Papertrail({
	host: 'logs5.papertrailapp.com',
	port: 26438
});

winstonPapertrail.on('error', function(err) {});

var logger = new winston.Logger({
	transports: [winstonPapertrail]
});

module.exports = logger;