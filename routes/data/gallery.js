var config = require('../../config');
var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		var contents = fs.readdirSync('./public/images/gallery');
		var memes = [];
		for (var i = 0; i < contents.length; i++) {
			if (contents[i].match(/^.*.jpg$/)) {
				memes.push(contents[i]);
			}
		}
		res.json(memes);
	});
	
	return router;
}
