var config = require('../../config');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

module.exports = function(db) {
	
	var chatSessions = {};
	
	// Remove dead sessions
	setInterval(function() {
		for (var key in chatSessions) {
			if (chatSessions.hasOwnProperty(key)) {
				if (new Date().getTime() - chatSessions[key].lastRequest.getTime() > config.server.chatTimeout) {
					delete chatSessions[key];
				}
			}
		}
	}, 10000);
	
	router.get('/', function(req, res, next) {
		var chatKey = req.query.chatKey;
		if (!chatKey) {
			var chatKey;
			var unique = false;
			while(!(chatKey && unique)) {
				chatKey = Math.random().toString(36).slice(2);
				unique = true;
				for (var key in chatSessions) {
					if (chatSessions.hasOwnProperty(key)) {
						if (chatKey === key) {
							unique = false;
						}
					}
				}
			}
			chatSessions[chatKey] = {
					lastRequest: new Date(),
					newMessages: [],
			};
			res.json({ key: chatKey });
		}
		else {
			var session = chatSessions[chatKey];
			if (session) {
				session.lastRequest = new Date();
				res.json({ newMessages: session.newMessages }).end();;
				session.newMessages = [];
			}
			else {
				res.json({});
			}
		}
	});
	router.post('/', function(req, res, next) {
		var chatKey = req.body.key;
		var message = req.body.message;
		if (chatKey && message) {
			var session = chatSessions[chatKey];
			if (session) {
				for (var key in chatSessions) {
					if (chatSessions.hasOwnProperty(key)) {
						/*var dateFormat = {
							    hour: '2-digit',
							    minute: '2-digit',
							    second: '2-digit',
							};
						chatSessions[key].newMessages.push('[' + new Date().toLocaleTimeString('en-US', dateFormat) + '] ' + (req.authentication ? req.authentication.username : req.ip) + ': ' + message);*/
						chatSessions[key].newMessages.push({
							date: new Date(),
							sender: (req.authentication ? req.authentication.username : '(' + req.ip + ')'),
							message: message
						});
					}
				}
				res.json({ success: true });
			}
			else {
				res.json({ success: false });
			}
		}
		else {
			res.json({ success: false });
		}
	});
	
	return router;
}
