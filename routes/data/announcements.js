var config = require('../../config');
var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.announcements).find({}).toArray(function (err, result) {
			if (err) {
				console.log(err);
			}
			var dateOptions = {
					year: '2-digit', month: '2-digit',
					day: 'numeric', hour: '2-digit', minute: '2-digit'
			};
			result.created = new Date(result.created).toLocaleTimeString('en-US', dateOptions);
			res.json(result);
		});
	});

	router.get('/2', function(req, res, next) {
		db.collection(config.db.collections.announcements).find({}).toArray(function (err, result) {
			if (err) {
				console.log(err);
			}
			result
			res.json(result);
		});
	});

	router.post('/add', function(req, res, next) {
		var announcement = req.body;
		if (req.authentication) {
			/*var admins = config.server.admins;
			var admin = false;
			for (var a = 0; a < admins.length; a++) {
				if (req.authentication.username === admins[a]) {
					admin = true;
				}
			}
			if (req.authentication.username === user || admin) {*/
			var doc = { message: announcement.message, creator: req.authentication.username, created: new Date() };
			db.collection(config.db.collections.announcements).insert(doc, function(err) {
				if (err) {
					console.log(err);
				}
				res.json({});
			});
		}
		else {
			res.json({ error: 'You are not permitted to create announcements' });
		}
	});

	router.post('/delete', function(req, res, next) {
		var announcement = req.body;
		if (req.authentication) {
			db.collection(config.db.collections.announcements).findOne({ _id: ObjectID.createFromHexString(announcement.id) }, function(err, result) {
				if (err) {
					console.log(err);
					res.json({});
				}
				else {
					if (result) {
						var user = result.creator;
						var admins = config.server.admins;
						var admin = false;
						for (var a = 0; a < admins.length; a++) {
							if (req.authentication.username === admins[a]) {
								admin = true;
							}
						}
						if (req.authentication.username === user || admin) {
							db.collection(config.db.collections.announcements).remove(result, function(err) {
								if (err) {
									console.log(err);
								}
								res.json({});
							});
						}
						else {
							res.json({ error: 'You are not permitted to delete announcements' });
						}
					}
					else {
						res.json({});
					}
				}
			});
		}
		else {
			res.json({ error: 'You are not permitted to delete announcements' });
		}
	});
	
	return router;
}
