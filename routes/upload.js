var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.post('/*', function(req, res, next) {
		uploadFiles(req, res);
	});
	
	return router;
}

function uploadFiles (req, res) {
	var reqpath = decodeURI(req.path);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	if (filename) {
            if (!fs.existsSync('./' + config.server.fileDirectory)) {
                fs.mkdirSync('./' + config.server.fileDirectory);
            }
            //console.log('Uploading ' + filename);
            fstream = fs.createWriteStream('./' + config.server.fileDirectory + reqpath + '/' + filename);
            file.pipe(fstream);
            //console.log('Upload complete! Saved to ' + filename);
    	}
    	else {
            res.redirect('/files' + decodeURI(req.path + queryString(req.query)));
    	}
    });
    req.busboy.on('finish', function () {
        res.redirect('/files' + decodeURI(req.path + queryString(req.query)));
        //console.log('Done uploading!');
    });
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

