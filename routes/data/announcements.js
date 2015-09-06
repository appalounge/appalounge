var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		var lines = fs.readFileSync(path.join('./', config.server.announcementsFile)).toString().split('\n');
		var announcements = [];
		for (var i = 0; i < lines.length; i++) {
			if (lines[i]) {
				announcements.push(lines[i]);
			}
		}
		res.json(announcements);
	});
	
	return router;
}
