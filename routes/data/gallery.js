var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		var pics = [];
		var contents = fs.readdirSync('./public/images/gallery/public');
		for (var i = 0; i < contents.length; i++) {
			if (contents[i].match(/^.*.jpg$/)) {
				pics.push('/images/gallery/public/' + contents[i]);
			}
		}
		if (req.authentication) {
			contents = fs.readdirSync('./public/images/gallery/private');
			for (var i = 0; i < contents.length; i++) {
				if (contents[i].match(/^.*.jpg$/)) {
					pics.push('/images/gallery/private/' + contents[i]);
				}
			}
		}
		res.json(pics);
	});
	
	return router;
}
