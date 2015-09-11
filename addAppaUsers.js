
var users = require('./users');
var userList = [
            'amowayed',
            'asheidt',
            'bwxu',
            'chauhans',
            'edstiles',
            'ewadkins',
            'ignacioe',
            'jacqliu',
            'jcorona',
            'jerios',
            'jhbell',
            'jspileck',
            'lilydove',
            'loctrinh',
            'mfeffer',
            'pnoyola',
            'regirock',
            'rgulland',
            'rprice',
            'ruili',
            'snvd',
            'vontell',
            'yji'
            ];

var i = 0;
next();
function next() {
	if (i < userList.length) {
		users.add(userList[i], function() {
			i++;
			next();
		});
	}
}