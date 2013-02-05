var express = require('express');
var fs = require('fs');
var app = express();
var image = require('./image');
var cronJob = require('cron').CronJob;

// Configuration
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
	image.createImage( function() {
	  	var image = fs.readFileSync('resources/output.jpg');
		res.setHeader('Content-Type', 'image/jpg');
		// res.setHeader('Content-Length', body.length);
		res.end(image, 'binary');	
	});
});

app.listen(port);
console.log('listening on port 3000');

job = new cronJob({
	cronTime: '00 00 00 * * 1-5',
	onTick: function() {
		image.createImage();
	},
	start: true
});
job.start();