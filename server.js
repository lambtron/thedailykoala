var express = require('express');
var fs = require('fs');
var app = express();
var image = require('./image');

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use('/resources', express.static(__dirname + '/resources'));
app.use(express.bodyParser());

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening on port 3000');

app.get('/', function(req, res){
	// Change filename from output.jpg to tumblr.jpg
	image.createImage( function() {
	  	res.render('index.jade', {output: 'resources/output.jpg'});
	  	// var image = fs.readFileSync('resources/output.jpg');
		// res.setHeaƒder('Content-Type', 'image/jpg');
		// // res.setHeader('Content-Length', body.length);
		// res.end(image, 'binary');
	});
});

// Posting to tumblr.
app.post('/post-to-tumblr', function(req, res) {
	console.log(req.body.name);
	image.postToTumblr( req.body.name, function() {
		console.log('done');
	});
	res.send(req.body);
});