const cv = require('opencv');
const camera = new cv.VideoCapture(0);
const recorder = require('./recorder');
// Set camera resolution (250x250)
module.exports = function(socket) {
	const camInterval = 100;
	camera.setWidth(1024);
	camera.setHeight(768);
	return setInterval(() => {
		// Read image from camera
		camera.read(function(err, im) {
			// Verify that image is present (larger than 0px height and width)
			if (im.size()[0] > 0 && im.size()[1] > 0) {
				let imageBuffer = im.toBuffer();
				let imageBase64 = imageBuffer.toString('base64');
				
				socket.emit('frame', { buffer: imageBase64, feed : 0 });

				setTimeout(function(){
					recorder('feed_0', imageBuffer);
				},0);
			}
		});
	}, camInterval);
}