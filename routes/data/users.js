var config = require('../../config');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

module.exports = function(db) {

	/* GET user list. */
	router.get('/', function(req, res, next) {
		db.collection(config.db.collections.users).find({}, { password: 0 }).sort({ username: 1 }).toArray(function(err, result) {
			if (!req.authentication) {
				for (var i = 0; i < result.length; i++) {
					for (var key in result[i]) {
						if (result[i].hasOwnProperty(key)) {
							if (result[i][key] instanceof Object && !result[i][key].publicView) {
								delete result[i][key];
							}
						}
					}
				}
			}
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
				if (req.authentication.username === admins[a]) {
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
				if (req.authentication.username === admins[a]) {
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
				                  'country',
				                  'extra'
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
							updated[field] = userData[field] || null;
						}
					}
				}
				clean(updated);
				console.log(updated);
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
				if (req.authentication.username === admins[a]) {
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
		db.collection(config.db.collections.users).findOne({ username: user }, { _id: 0, password: 0 }, function(err, result) {
			result.admin = admin;
			if (!req.authentication) {
				for (var key in result) {
					if (result.hasOwnProperty(key)) {
						if (result[key] instanceof Object && !result[key].publicView) {
							delete result[key];
						}
					}
				}
			}
			res.json(result);
		});
	});
	
	return router;
}

function clean(obj) {
	nullifyDeep(obj);
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key] && !!obj[key].publicView) {
				obj[key].publicView = obj[key].publicView === 'true';
			}
		}
	}
}

function nullifyDeep(obj) {
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (!obj[key]) {
				obj[key] = null;
			}
			else if (obj[key] instanceof Object) {
				nullifyDeep(obj[key]);
			}
		}
	}
}
