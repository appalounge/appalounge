var config = require('../config');
var express = require('express');
var router = express.Router();

module.exports = function(db) {

	/* GET user list. */
	router.get('/list', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { username: 1 }).toArray(function(err, result) {
			return res.json(result);
		});
	});

	/* GET user data. */
	router.get('/data', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { _id: 0, password: 0 }).toArray(function(err, result) {
			return res.json(result);
		});
	});
	
	return router;
}
