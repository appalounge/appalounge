
module.exports = send;

var fs = require('fs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'no.reply.appa.lounge@gmail.com',
		pass: fs.readFileSync('./password.txt').toString()
	}
});

function send(to, subject, message, isHtml, callback) {
	if (Array.isArray(to)) {
		var i = 0;
		next();
		function next() {
			if (i < to.length) {
				send(to[i], subject, message, isHtml, function(successful) {
					if (successful) {
						i++;
					}
					next();
				});
			}
			else {
				if (callback) {
					callback();
				}
			}
		}
	}
	else {
		var mailOptions = {
				to: to,
				subject: subject,
				text: message,
		};
		if (isHtml) {
			mailOptions.html = message;
		}
		transporter.sendMail(mailOptions, function(error, info){
			var successful = true;
			if (error) {
				console.log(error);
				successful = false;
			}
			else {
				console.log('Message sent: ' + info.response);
			}
			if (callback) {
				callback(successful);
			}
		});
	}
}
