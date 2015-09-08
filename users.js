var config = require('./config');
var mongodb = require('mongodb');
var bcrypt = require('bcrypt');

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
					run(db);
				}
			});
		}
		else {
			run(db);
		}
	}
});

function run(db) {
	
	if (process.argv[2] && process.argv[2].toLowerCase() === 'add' && process.argv[3]) {
		add(process.argv[3], function() {
			console.log('Added user ' + process.argv[3]);
			db.close();
		});
	}
	else if (process.argv[2] && process.argv[2].toLowerCase() === 'remove' && process.argv[3]) {
		remove(process.argv[3], function() {
			console.log('Removed user ' + process.argv[3]);
			db.close();
		});
	}
	else if (process.argv[2] && process.argv[2].toLowerCase() === 'removeall') {
		removeAll(function() {
			console.log('Removed all users');
			db.close();
		});
	}
	else {
		console.log('\'node users add <user>\' - creates a new user');
		console.log('\'node users remove <user>\' - removes a user');
		console.log('\'node users removeAll\' - removes all users');
		db.close();
	}
	
	function remove(user, callback) {
		db.collection(config.db.collections.users).remove({ username: user }, function(err) {
			if (err) {
				console.error(err.toString());
			}
			else if (callback) {
				callback();
			}
		});
	}

	function removeAll(callback) {
		db.collection(config.db.collections.users).remove({}, function(err) {
			if (err) {
				console.error(err.toString());
			}
			else if (callback) {
				callback();
			}
		});
	}

	function add(user, callback) {
		var userData = new UserData(user, 'password');
		db.collection(config.db.collections.users).insert(userData, function(err) {
			if (err) {
				console.error(err.toString());
			}
			else if (callback) {
				callback();
			}
		});
	}
}

function UserData(username, password) {
	var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
	this.username = username;
	this.password = hash;
	this.firstName = null;
	this.lastName = null;
	this.nickname = null;
	this.email = null;
	this.phone = null;
	this.room = null;
	this.year = null;
	this.homepage = null;
	this.city = null;
	this.state = null;
	this.country = null;
	this.profilePic = null;
}
