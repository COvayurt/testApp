var cool = require('cool-ascii-faces');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var globalDB;
// parse application/json
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/test';

var insertOrganization = function(record) {
	var collection = globalDB.collection('organization');

	collection.insert(record, function(err, result) {
		console.log("Inserted documents into the document collection");
	});
}

var updateOrganizationForVehicle = function(record) {
	var collection = globalDB.collection('organization');
	var jsonRecord = record.record;
	var vehiclesRec = jsonRecord.vehicles[0];
	var valuableRecord = JSON.stringify(record.record);
	valuableRecord = valuableRecord.substring(2, valuableRecord.length);
	valuableRecord = valuableRecord.substring(0, valuableRecord.length - 1);
	
	collection.update({
		'_id' : record.query.id
	}, {
		$set : valuableRecord
	},
	function(err, result) {
		if (err)
			throw err;
		console.log(result);
	});

}

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	globalDB = db;
	console.log("Connected correctly to server");
});

app.use('/saveOrganization', function(req, res, next) {
	console.log(req.body);  
	insertOrganization(req.body);
	res.end("Thats it Organization!");
});

app.use('/saveVehicle', function(req, res, next) {
	console.log(req.body); 
	updateOrganizationForVehicle(req.body);
	res.end("Thats it Vehicle!");
});

app.get('/cool', function(request, response) {
	response.send(cool());
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Express server listening on port %d in %s mode", this
			.address().port, app.settings.env);
});
