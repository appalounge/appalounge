var config = require('../../config');
var express = require('express');
var router = express.Router();

module.exports = function(db) {

	/* GET user list. */
	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { password: 0 }).sort({ firstName: 1 }).toArray(function(err, result) {
			var list = [];
			for (var r = 0; r < result.length; r++) {
				list.push({ username: result[r].username, firstName: result[r].firstName, lastName: result[r].lastName, nickname: result[r].nickname });
			}
			res.json(list);
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
