var config = require('../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		var contents = fs.readdirSync(path.join('./', config.server.profilePicDirectory));
		var pics = [];
		for (var i = 0; i < contents.length; i++) {
			if (contents[i].match('^' + user + '.*$') || contents[i].match('^' + user + '$')) {
				res.sendFile(path.join(config.server.appDirectory, config.server.profilePicDirectory, contents[i]));
				return;
			}
		}
		res.sendFile(path.join(config.server.appDirectory, config.server.profilePicDefault));
	});

	router.post('/*', function(req, res, next) {
		uploadFiles(req, res);
	});
	
	return router;
}

function uploadFiles (req, res) {
	var user = req.path.slice(req.path.lastIndexOf('/') + 1);
	var reqpath = decodeURI(req.path);
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
    	if (filename) {
            if (!fs.existsSync('./' + config.server.profilePicDirectory)) {
                fs.mkdirSync('./' + config.server.profilePicDirectory);
            }
    		var contents = fs.readdirSync(path.join('./', config.server.profilePicDirectory));
    		for (var i = 0; i < contents.length; i++) {
    			if (contents[i].match('^' + user + '\..*$') || contents[i].match('^' + user + '$')) {
    				fs.unlinkSync(path.join('./', config.server.profilePicDirectory, contents[i]));
    			}
    		}
            var extension = '';
            var index = filename.lastIndexOf('.');
            if (index !== -1) {
            	extension = filename.slice(index);
            }
            filename = user + extension;
            fstream = fs.createWriteStream('./' + config.server.profilePicDirectory + '/' + filename);
            file.pipe(fstream);
            //console.log('Upload complete! Saved to ' + filename);
    	}
    	else {
            res.redirect('/users' + reqpath);
    	}
    });
    req.busboy.on('finish', function () {
        res.redirect('/users' + decodeURI(req.path + queryString(req.query)));
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

