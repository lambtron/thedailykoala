module.exports = {
	createImage: function( fn ) {
		// resizeImage();
		getText(makeImage);
		fn();
	}
};

var gm = require('gm')
  , imageMagick = gm.subClass({ imageMagick: true })
  , fs = require('fs')
  , dir = __dirname + '/resources';

var email = require('emailjs/email');
var server = email.server.connect({
	user: 		"andyjiang",
	password: 	"Yahong8*",
	host:  		"smtp.gmail.com",
	ssl: 		true 
});

var outputPath = '/output.jpg';

// Get a random image from resources folder.
// Read random line of text from text file.
// Add line of text to it.
// Save image in new folder.
// Send email to tumblr.

function resizeImage( image ) {
	var fontPt = 48;
	var width = 600;
	var charPerLine = 20;

	image.size(function (err, size) {
			 if (err) console.log(err);
			 if (size.width < 600) {
			 	 fontPt = Math.floor((size.width / 600) * 48);
				 width = size.width;
			 };
		 })
		 .resize(600, 10000);

	return image;
}

// Read random line of text from text file.
function getText( textHandler ) {
	var text = '';
	fs.readFile(dir + '/lines.txt', 'utf8', function(err, data) {
		if (err) console.log(err);
		var arr = data.split(/\n/);
		text = arr[Math.floor(Math.random() * arr.length)];
		// console.log('Random line: ' + text);
		// return text;
		textHandler(text);
	});
}

// Add line of text to image and saves it.
var makeImage = function addText(text) {
	// Set the pathname for the input.
	var inputPath = '/mike wei ' + (Math.floor(Math.random() * 59) + 1) + '.jpeg';

	// Set the pathname for the output.
	var outputPath = '/output.jpg';

	// Set font point size.
	var fontPt = 48;

	var width = 600;
	var charPerLine = 20;

	// Adjust font size accordingly to width.
	// var newImage = resizeImage(gm(dir + inputPath));
	var newImage = imageMagick(dir + inputPath)
				   .size(function (err, size) {
					   if (err) {
					      console.log(err);
					   } else if (size.width < 600) {
						  // Adjust font size.
					      fontPt = Math.floor((size.width / 600) * 48);
					      width = size.width;
					   };
				   })
				   .resize(600, 10000); 

	var x = Math.floor(width / charPerLine);
	var y = x * 2;
	var lines = Math.floor(text.length / charPerLine) + 1;
	var offset = 0;
	newImage.stroke('#ffffff')
			.fill('#ffffff')
			.font('Helvetica.ttf', fontPt);
	console.log('lines: ' + lines);
	for (var j = 0; j < lines + 1; j++) {
		var start = (j * charPerLine - offset);
		var end = ((j+1) * charPerLine - offset);
		var linetext = text.slice(start, end);
		if ( linetext.length >= charPerLine ) {
			var lastSpace = linetext.lastIndexOf(' ');
			linetext = text.slice(start, start+lastSpace);
			offset = ((j+1) * charPerLine) - (start + lastSpace);
			console.log('went inside the if statement');
		}
		console.log(linetext);
		console.log('start: ' + start + ', end: ' + end);
		console.log('lastSpace: ' + lastSpace);
		console.log('offset: ' + offset);
		newImage.drawText(x, y + (fontPt * 1.5 * j), linetext);
	};
	newImage.write(dir + outputPath, function(err) {
		if (err) console.log('Add text to image error: ' + err);
		console.log('saved to: ' + dir + outputPath);
		// sendImage(dir + outputPath);
	});
}

// Send image to tumblr.
function sendImage(path) {
	// pcx5nmddnzuws@tumblr.com
	server.send({
		text: 	"the daily koala",
		from: 	"Andy <andyjiang@gmail.com>",
		to: 	"<pcx5nmddnzuws@tumblr.com>",
		subject: "your daily lulz",
		attachment:
		[
			{
				path: dir + path,
				type: "image/jpeg",
				name: "lulz.jpg"
			}
		]
	}, function(err, message) {
		console.log(err || message);
	});
}