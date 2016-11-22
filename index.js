var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	var numberReq = req.query.test;
	
	res.send(JSON.stringify({ number: numberReq * 2 }));
     
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this
			.address().port, app.settings.env);
});