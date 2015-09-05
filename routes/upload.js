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
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	if (filename) {
            if (!fs.existsSync('./public/files')) {
                fs.mkdirSync('./public/files');
            }
            //console.log('Uploading ' + filename);
            fstream = fs.createWriteStream('./public/files' + req.path + '/' + filename);
            file.pipe(fstream);
            //console.log('Upload complete! Saved to ' + filename);
    	}
    	else {
            res.redirect('/files' + req.path);
    	}
    });
    req.busboy.on('finish', function () {
        res.redirect('/files' + req.path);
        //console.log('Done uploading!');
    });
}

