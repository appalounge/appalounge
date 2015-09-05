var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var reqpath = decodeURI(req.path);
		remove(decodeURI(path.join('./', config.server.fileDirectory, reqpath)));
		res.redirect(decodeURI(path.join('/files', reqpath.substr(0, reqpath.lastIndexOf('/')))));
	});
	
	return router;
}

function remove(path) {
	if (fs.lstatSync(path).isFile()) {
		fs.unlinkSync(path);
	}
	else {
		var contents = fs.readdirSync(path);
		for (var i = 0; i < contents.length; i++) {
			remove(path + '/' + contents[i]);
		}
		fs.rmdirSync(path);
	}
}

