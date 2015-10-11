var config = require('./config');
var mongodb = require('mongodb');

connect(function (db) {
	db.collection(config.db.collections.users).find({}).toArray(function (err, results) {
		if (err) {
			console.log(err.toString());
		}
		else {
			var i = 0;
			nextUser();
			function nextUser() {
				if (i < results.length) {
					var updated = update(results[i]);
					console.log(updated);
					db.collection(config.db.collections.users).update(results[i], updated, function (err) {
						if (err) {
							console.log(err.toString());
						}
						else {
							console.log('Updated ' + results[i].username);
							i++;
							nextUser();
						}
					});
				}
				else {
					db.close();
					console.log('Done!');
				}
			}
		}
	});
});

function update(obj) {
	var result = {};
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			result[key] = obj[key];
		}
	}
	
	var updates = [
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
	for (var i = 0; i < updates.length; i++) {
		var content = result[updates[i]];
		if (!content || content.content === undefined) {
			result[updates[i]] = { content: content, publicView: false };
			console.log(updates[i]);
		}
	}
	return result;
}

function connect(callback) {
	var MongoClient = mongodb.MongoClient;
	var dburi = 'mongodb://' + config.db.hostname + ':' + config.db.port + '/' + config.db.mainDb;
	MongoClient.connect(dburi, { server: { ssl: config.db.useSSL, sslValidate: false } }, function (err, db) {
		if (err) {
			console.error(err.toString());
		}
		else {
			if (config.db.authenticate) {
				db.authenticate(config.db.authentication.username, config.db.authentication.password, function (err) {
					if (err) {
						db.close();
						console.error(err.toString());
					}
					else {
						callback(db);
					}
				});
			}
			else {
				callback(db);
			}
		}
	});
}