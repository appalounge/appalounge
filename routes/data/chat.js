var config = require('../../config');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

module.exports = function(db) {
	
	var chatSessions = {};
	var messageList = [];
	
	// Remove dead sessions
	setInterval(function() {
		for (var key in chatSessions) {
			if (chatSessions.hasOwnProperty(key)) {
				if (new Date().getTime() - chatSessions[key].lastRequest.getTime() > config.server.chatTimeout) {
					var session = chatSessions[key];
					sendMessage({
						date: new Date(),
						sender: null,
						message: session.sender + ' left the chat.'
					});
					delete chatSessions[key];
				}
			}
		}
	}, 1000);

	function sendMessage(message) {
		for (var key in chatSessions) {
			if (chatSessions.hasOwnProperty(key)) {
				chatSessions[key].newMessages.push(message);
			}
		}
		messageList.push(message);
	}
	
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
					sender: (req.authentication ? req.authentication.username : req.ip),
			};
			var session = chatSessions[chatKey];
			for (var i = 0; i < messageList.length; i++) {
				session.newMessages.push(messageList[i]);
			}
			res.json({ key: chatKey });
			sendMessage({
				date: new Date(),
				sender: null,
				message: session.sender + ' joined the chat.'
			});
		}
		else {
			var session = chatSessions[chatKey];
			if (session) {
				session.lastRequest = new Date();
				var onlineList = [];
				for (var key in chatSessions) {
					if (chatSessions.hasOwnProperty(key)) {
						onlineList.push(chatSessions[key].sender);
					}
				}
				res.json({ newMessages: session.newMessages, onlineList: onlineList }).end();;
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
		var injection = false;
		var original = message;
		if (!req.authentication) {
			//message = message.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
			message = message.replace(/</g, '&lt;');
			message = message.replace(/>/g, '&gt;');
			if (message !== original) {
				injection = true;
			}
		}
		if (chatKey && message) {
			var session = chatSessions[chatKey];
			if (session) {
				sendMessage({
					date: new Date(),
					sender: session.sender,
					message: message
				});
				if (injection) {
					sendMessage({
						date: new Date(),
						sender: 'appalounge.com',
						message: 'Nice try noob <img height="20px" width="20px" src="/images/troll.png"></img>'
					});
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
