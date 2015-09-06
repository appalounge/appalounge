var config = require('../../config');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		var username = req.query.username;
		var password = req.query.password;
		if (username && password) {
			console.log(username);
			console.log(password);
			db.collection(config.db.collections.users).findOne({ username: username }, function(err, result) {
				if (err) {
					console.error(err.toString());
					res.json({ error: 'Database query failed' });
				}
				else {
					if(bcrypt.compareSync(password, result.password)) {
						var key1 = Math.random().toString(36).slice(2);
						var key2 = Math.random().toString(36).slice(2);
						var key = key1 + key2;
						var expiration = new Date(new Date().getTime() + 1000 * 60 * config.server.loginExpirationMinutes);
						var doc = { key: key, username: username, loginDate: new Date(), ip: req.ip, expiration: expiration };
						db.collection(config.db.collections.sessions).insert(doc, function(err) {
							if (err) {
								console.error(err.toString());
								res.json({ error: 'Failed to create active session' });
							}
							else {
								res.json({ key: key });
							}
						});
					}
					else {
						res.json({ error: 'Incorrect username or password' });
					}
				}
			});
		}
		else {
			res.json({ error: 'Missing necessary information' });
		}
	});
	
	return router;
}
