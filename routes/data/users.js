var config = require('../../config');
var express = require('express');
var router = express.Router();

module.exports = function(db) {

	/* GET user list. */
	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { password: 0 }).sort({ firstName: 1 }).toArray(function(err, result) {
			res.json(result);
		});
	});

	/* GET user data. */
	router.get('/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		db.collection(config.db.collections.users).findOne({ username: user }, { _id: 0, password: 0 }, function(err, result) {
			res.json(result);
		});
	});
	
	return router;
}
