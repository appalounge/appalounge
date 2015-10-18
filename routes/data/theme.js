var config = require('../../config');
var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function(db) {

	router.get('/', function(req, res, next) {
		if (!fs.existsSync('theme.txt')) {
			fs.writeFileSync('theme.txt', '');
		}
		var theme = fs.readFileSync('theme.txt').toString();
		res.json({ theme: theme });
	});

	router.post('/', function(req, res, next) {
		var theme = req.body.theme;
		if (req.authentication) {
			var admins = config.server.admins;
			var admin = false;
			for (var a = 0; a < admins.length; a++) {
				if (req.authentication.username === admins[a]) {
					admin = true;
				}
			}
			if (admin) {
				fs.writeFile('theme.txt', theme, function(err) {
					if (err) {
						console.log(err);
					}
				});
			}
		}
		res.json({});
	});
	
	return router;
}
