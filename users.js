var config = require('./config');
var mongodb = require('mongodb');
var bcrypt = require('bcryptjs');

if (process.argv[1].indexOf(__filename.substr(0, __filename.indexOf('.'))) === -1) {
	// Required from another file
}
else {
	if (process.argv[2] && process.argv[2].toLowerCase() === 'add' && process.argv[3]) {
		add(process.argv[3]);
	}
	else if (process.argv[2] && process.argv[2].toLowerCase() === 'remove' && process.argv[3]) {
		remove(process.argv[3]);
	}
	else if (process.argv[2] && process.argv[2].toLowerCase() === 'removeall') {
		removeAll();
	}
	else if (process.argv[2] && process.argv[2].toLowerCase() === 'setpassword' && process.argv[3] && process.argv[4]) {
		setPassword(process.argv[3], process.argv[4]);
	}
	else {
		console.log('\'node users add <user>\' - creates a new user');
		console.log('\'node users remove <user>\' - removes a user');
		console.log('\'node users removeAll\' - removes all users');
		console.log('\'node users setPassword <user> <password>\' - resets a user\'s password');
	}
}

function connect(callback) {
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

function add(user, callback) {
	connect(function(db) {
		var userData = new UserData(user, 'password');
		db.collection(config.db.collections.users).findOne({ username: user }, function(err, result) {
			if (!result) {
				db.collection(config.db.collections.users).insert(userData, function(err) {
					db.close();
					if (err) {
						console.error(err.toString());
					}
					else {
						console.log('Added user ' + user);
					}
					if (callback) {
						callback();
					}
				});
			} else {
				db.close();
				console.error('User ' + user + ' already exists');
				if (callback) {
					callback();
				}
			}
		});
	});
}

function remove(user, callback) {
	connect(function(db) {
		db.collection(config.db.collections.users).findOne({ username: user }, function(err, result) {
			if (result) {
				db.collection(config.db.collections.users).remove({ username: user }, function(err) {
					db.close();
					if (err) {
						console.error(err.toString());
					}
					else {
						console.log('Removed user ' + user);
					}
					if (callback) {
						callback();
					}
				});
			}
			else {
				db.close();
				console.error('User ' + user + ' doesn\'t exist');
				if (callback) {
					callback();
				}
			}
		});
	});
}

function removeAll(callback) {
	connect(function(db) {
		db.collection(config.db.collections.users).remove({}, function(err) {
			db.close();
			if (err) {
				console.error(err.toString());
			}
			else {
				console.log('Removed all users');
			}
			if (callback) {
				callback();
			}
		});
	});
}

function setPassword(user, password, callback) {
	connect(function(db) {
		var salt = bcrypt.genSaltSync(10);
	    var hash = bcrypt.hashSync(password, salt);
		db.collection(config.db.collections.users).update({ username: user }, { $set: { password: hash } }, function(err) {
			db.close();
			if (err) {
				console.error(err.toString());
			}
			else {
				console.log('Password set');
			}
			if (callback) {
				callback();
			}
		});
	});
}

function UserData(username, password) {
	var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
	this.username = username;
	this.password = hash;
	/*this.firstName = null;
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
	this.extra = null;*/
	this.firstName = { content: null, publicView: true };
	this.lastName = { content: null, publicView: true };
	this.nickname = { content: null, publicView: false };
	this.email = { content: null, publicView: true };
	this.phone = { content: null, publicView: false };
	this.room = { content: null, publicView: false };
	this.year = { content: null, publicView: false };
	this.homepage = { content: null, publicView: false };
	this.city = { content: null, publicView: false };
	this.state = { content: null, publicView: false };
	this.country = { content: null, publicView: false };
	this.extra = { content: null, publicView: false };
}

module.exports = {
		add: add,
		remove: remove,
		removeAll: removeAll,
		setPassword: setPassword
}
