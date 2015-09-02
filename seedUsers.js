var config = require('./config');
var mongodb = require('mongodb');

/* Loads test user data into database.
 * This file is only for testing.
 */

var MongoClient = mongodb.MongoClient;
var dburi = 'mongodb://' + config.db.hostname + ':' + config.db.port + '/' + config.db.mainDb;
MongoClient.connect(dburi, { server: { ssl: config.db.useSSL, sslValidate: false } }, function (err1, db) {
	if (err1) {
		console.error(err1.toString());
	}
	else {
		if (config.db.authenticate) {
			db.authenticate(config.db.authentication.username, config.db.authentication.password, function (err2) {
				if (err2) {
					db.close();
					console.error(err2.toString());
				}
				else {
					seedUsers(db);
				}
			});
		}
		else {
			seedUsers(db);
		}
	}
});

function seedUsers(db, userData) {
	var userData;
	try {
		userData = require('./testUsersConfidential').userData; // not included in public repo
	} catch(err) {
		userData = require('./testUsers').userData;
	}
	
	removeUsers(db, function() {
		insertUsers(db, userData, function() {
			console.log('Success!');
			db.close();
		});
	});
}

function removeUsers(db, callback) {
	db.collection(config.db.collections.users).remove({}, function(err) {
		if (err) {
			console.error(err.toString());
		}
		else {
			callback();
		}
	});
}

function insertUsers(db, userData, callback) {
	db.collection(config.db.collections.users).insert(userData, function(err) {
		if (err) {
			console.error(err.toString());
		}
		else {
			callback();
		}
	});
}
