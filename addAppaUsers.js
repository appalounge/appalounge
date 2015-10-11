
var users = require('./users');
var userList = [
                'amowayed',
                'jhbell',
                'chauhans',
                'jcorona',
                'hdiehl',
                'lilydove',
                'ignacioe',
                'mfeffer',
                'cierag',
                'rgulland',
                'asheidt',
                'yji',
                'nkogan',
                'jacqliu',
                'pnoyola',
                'dypark',
                'rprice',
                'regirock',
                'jerios',
                'jspileck',
                'emistan4',
                'edstiles',
                'loctrinh',
                'snvd',
                'vontell',
                'ewadkins'
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