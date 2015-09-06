var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db){

	/* GET home page. */
	router.get('/*', function(req, res, next) {
		var reqpath = decodeURI(req.path);
		if (fs.lstatSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath))).isDirectory()) {
			res.render('files');
		}
		else {
			res.sendFile(decodeURI(path.join(config.server.appDirectory, config.server.fileDirectory, reqpath)));
		}
	});
	
	return router;
}
