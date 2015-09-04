var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		console.log(path.join(__dirname, config.server.publicDirectory, 'images/gallery'));
		var contents = fs.readdirSync(path.join(__dirname, config.server.publicDirectory, 'images/gallery'));
		var pics = [];
		for (var i = 0; i < contents.length; i++) {
			if (contents[i].match(/^.*.jpg$/)) {
				pics.push('/images/gallery/' + contents[i]);
			}
		}
		res.json(pics);
	});
	
	return router;
}
