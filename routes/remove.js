var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var path = decodeURI(req.path);
		console.log('test');
		remove('./public/files' + path);
		console.log('test');
		res.redirect('/files' + path.substr(0, path.lastIndexOf('/')));
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

