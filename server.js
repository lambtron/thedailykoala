var express = require('express');
var app = express();
var image = require('./image');
var cronJob = require('cron').CronJob;

// Configuration
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
	var body = 'Hello World';

	res.setHeader('Content-Type', 'text/plain');
	res.setHeader('Content-Length', body.length);
	res.end(body);
});

app.listen(port);
console.log('listening on port 3000');

job = new cronJob({
	cronTime: '00 30 11 * * 1-5',
	onTick: function() {
		image.createImage();
	},
	start: true,
	timeZone: 'America/Los_Angeles'
});
job.start();