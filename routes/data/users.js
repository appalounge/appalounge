var config = require('../../config');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

module.exports = function(db) {

	/* GET user list. */
	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { password: 0 }).sort({ username: 1 }).toArray(function(err, result) {
			res.json(result);
		});
	});

	/* GET user data. */
	router.get('/edit/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		if (req.authentication) {
			var admins = config.server.admins;
			var admin = false;
			for (var a = 0; a < admins.length; a++) {
				if (req.authentication.user === admins[a]) {
					admin = true;
				}
			}
			if (req.authentication.username === user || admin) {
				db.collection(config.db.collections.users).findOne({ username: user }, { _id: 0, password: 0 }, function(err, result) {
					res.json(result);
				});	
			}
			else {
				res.json({ error: 'You are not permitted to make changes to this user' });
			}
		}
		else {
			res.json({ error: 'You are not permitted to make changes to this user' });
		}
	});

	/* GET user data. */
	router.post('/edit/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		var userData = req.body;
		if (req.authentication) {
			var admins = config.server.admins;
			var admin = false;
			for (var a = 0; a < admins.length; a++) {
				if (req.authentication.user === admins[a]) {
					admin = true;
				}
			}
			if (req.authentication.username === user || admin) {
				var changeable = [
				                  'firstName',
				                  'lastName',
				                  'nickname',
				                  'email',
				                  'phone',
				                  'room',
				                  'year',
				                  'homepage',
				                  'city',
				                  'state',
				                  'country'
				                  ];
				var updated = {};
				for (var field in userData) {
					if (userData.hasOwnProperty(field)) {
						var permitted = false;
						for (var c = 0; c < changeable.length; c++) {
							if (field === changeable[c]) {
								permitted = true;
							}
						}
						if (permitted) {
							updated[field] = userData[field];
						}
					}
				}
				db.collection(config.db.collections.users).update({ username: userData.username }, { $set: updated }, function(err) {
					if (err) {
						logger.error(err.toString());
					}
				});
				res.json({});
			}
			else {
				res.json({ error: 'You are not permitted to make changes to this user' });
			}
		}
		else {
			res.json({ error: 'You are not permitted to make changes to this user' });
		}
	});

	/* GET user data. */
	router.post('/changePassword/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		var password = req.body.password;
		var newPassword = req.body.newPassword;
		if (req.authentication) {
			var admins = config.server.admins;
			var admin = false;
			for (var a = 0; a < admins.length; a++) {
				if (req.authentication.user === admins[a]) {
					admin = true;
				}
			}
			if (req.authentication.username === user || admin) {
				if (password && newPassword) {
					db.collection(config.db.collections.users).findOne({ username: user }, function(err, result) {
						if (err) {
							console.error(err.toString());
							res.json({ error: 'Database query failed' });
						}
						else if (result) {
							if(bcrypt.compareSync(password, result.password)) {
								var salt = bcrypt.genSaltSync(10);
							    var hash = bcrypt.hashSync(newPassword, salt);
								db.collection(config.db.collections.users).update({ username: user }, { $set: { password: hash } }, function(err) {
									if (err) {
										logger.error(err.toString());
									}
									res.json({});
								});
							}
							else {
								res.json({ error: 'Incorrect password' });
							}
						}
						else {
							res.json({ error: 'Incorrect password' });
						}
					});
				}
				else {
					res.json({ error: 'Missing necessary information' });
				}
			}
			else {
				res.json({ error: 'You are not permitted to make changes to this user' });
			}
		}
		else {
			res.json({ error: 'You are not permitted to make changes to this user' });
		}
	});

	/* GET user data. */
	router.get('/*', function(req, res, next) {
		var user = req.path.slice(req.path.lastIndexOf('/') + 1);
		var admins = config.server.admins;
		var admin = false;
		for (var a = 0; a < admins.length; a++) {
			if (user === admins[a]) {
				admin = true;
			}
		}
		if (req.authentication) {
			db.collection(config.db.collections.users).findOne({ username: user }, { _id: 0, password: 0 }, function(err, result) {
				result.admin = admin;
				res.json(result);
			});
		}
		else {
			db.collection(config.db.collections.users).findOne({ username: user }, { _id: 0, password: 0, nickname: 0, phone: 0, room: 0, year: 0, city: 0, state: 0, country: 0 }, function(err, result) {
				result.admin = admin;
				res.json(result);
			});
		}
	});
	
	return router;
}
