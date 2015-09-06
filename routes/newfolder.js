var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var reqpath = decodeURI(req.path);
        if (!fs.existsSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath)))) {
            fs.mkdirSync(decodeURI(path.join('./', config.server.fileDirectory, reqpath)));
        }
		res.json({ redirect: decodeURI(path.join('/files', reqpath.substr(0, reqpath.lastIndexOf('/'))) + queryString(req.query))} );
	});
	
	return router;
}

function queryString(query) {
    var str = '';
    for (var key in query) {
        if (query.hasOwnProperty(key)) {
            if (str === '') {
                str += '?';
            }
            else {
                str += '&';
            }
            str += key + '=' + query[key];
        }
    }
    return str;
}

