var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		if (req.authentication) {
			var reqpath = decodeURI(req.path);
	        if (!fs.existsSync(decodeURI(path.join('./', config.server.fileDirectory)))) {
	            fs.mkdirSync(decodeURI(path.join('./', config.server.fileDirectory)));
	        }
			var contents = fs.readdirSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath)));
			var files = [];
			for (var i = 0; i < contents.length; i++) {
				var stats = fs.lstatSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath, contents[i])));
				if (stats.isDirectory()) {
					files.push({ fileName: contents[i], isDirectory: stats.isDirectory(), size: stats.size });	
				}
			}
			for (var i = 0; i < contents.length; i++) {
				var stats = fs.lstatSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath, contents[i])));
				if (!stats.isDirectory()) {
					files.push({ fileName: contents[i], isDirectory: stats.isDirectory(), size: stats.size });	
				}
			}
			res.json(files);
		}
		else {
			res.json([])
		}
	});
	
	return router;
}
