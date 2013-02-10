var gm = require('gm');

for (i = 5; i < 60; i++ ) {
	var name = "mike wei ";
	var newImage = gm('resources/' + name + i + '.jpeg').write('resources/koala ' + i + '.jpeg', function() {
		console.log('renamed ' + name + i + ' to koala ' + i);
	});
}