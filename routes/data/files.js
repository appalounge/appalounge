var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var contents = fs.readdirSync('./public/uploads' + req.path);
		var files = [];
		for (var i = 0; i < contents.length; i++) {
			var stats = fs.lstatSync('./public/uploads' + req.path + '/' + contents[i]);
			if (stats.isDirectory()) {
				files.push({ fileName: contents[i], isDirectory: true, stats: stats });	
			}
		}
		for (var i = 0; i < contents.length; i++) {
			var stats = fs.lstatSync('./public/uploads' + req.path + '/' + contents[i]);
			if (!stats.isDirectory()) {
				files.push({ fileName: contents[i], isDirectory: false, stats: stats });	
			}
		}
		res.json(files);
	});
	
	return router;
}
