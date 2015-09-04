var config = require('../../config');
var express = require('express');
var router = express.Router();

module.exports = function(db) {

	/* GET user list. */
	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.users).find({}).toArray(function(err, result) {
			res.render('userList');
		});
	});

	/* GET user data. */
	router.get('/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		db.collection(config.db.collections.users).findOne({ username: user }, { username: 1 }, function(err, result) {
			if (result) {
				res.render('userPage', result);
			}
			else {
				var err = new Error('Not Found');
				err.status = 404;
			    res.render('error', {
			    	message: err.message,
			    	error: err
			    });
			}
		});
	});
	
	return router;
}
