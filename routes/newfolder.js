var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var path = decodeURI(req.path);
        if (!fs.existsSync('./public/files' + path)) {
            fs.mkdirSync('./public/files' + path);
        }
		res.json({ redirect: '/files' + path.substr(0, path.lastIndexOf('/'))} );
	});
	
	return router;
}

