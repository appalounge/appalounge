
var config = require('./config');
var users = require('./users');
var send = require('./send');

var userList = config.users;
userList = ['ewadkins'];

var i = 0;
nextUser();
function nextUser() {
	if (i < userList.length) {
		var newPassword = Math.random().toString(26).slice(2, 9);
		console.log(userList[i] + ':  ' + newPassword);
		users.setPassword(userList[i], newPassword, function() {
			var msg = '<p>Appalounge.com passwords have been reset because a lot of people know other peoples\' passwords, and we may be using the website for Secret Santa this year. Please login and change your password to something only you know!</p><p>For future reference, if you forget your password, let me know and I\'ll reset it for you.</p><p>Your password has been reset to <b>' + newPassword + '</b></p><p>Thanks!</p>--</br>Eric</br>--';
			send(userList[i] + '@mit.edu', 'Password Reset', msg, true, function() {
				i++;
				nextUser();
			});
		})
	}
	else {
		console.log('Done!');
	}
}