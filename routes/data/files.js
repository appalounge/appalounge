var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var path = decodeURI(req.path);
        if (!fs.existsSync('./public/files')) {
            fs.mkdirSync('./public/files');
        }
		var contents = fs.readdirSync('./public/files' + path);
		var files = [];
		for (var i = 0; i < contents.length; i++) {
			var stats = fs.lstatSync('./public/files' + path + '/' + contents[i]);
			if (stats.isDirectory()) {
				files.push({ fileName: contents[i], isDirectory: true, stats: stats });	
			}
		}
		for (var i = 0; i < contents.length; i++) {
			var stats = fs.lstatSync('./public/files' + path + '/' + contents[i]);
			if (!stats.isDirectory()) {
				files.push({ fileName: contents[i], isDirectory: false, stats: stats });	
			}
		}
		res.json(files);
	});
	
	return router;
}
