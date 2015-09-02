var bcrypt = require('bcrypt');

var userData = [
                new UserData('vontell', 'password', 'Aaron', 'Vontell', 'Bitch', 'vontell@mit.edu', '8608050050', '371', 2, 'http://avontell.com', 'Bristol', 'CT', 'USA'),
                new UserData('ewadkins', 'password', 'Eric Wadkins', null, 'ewadkins@mit.edu', '6178395035', '371', 2, null, 'Winthrop', 'MA', 'USA')
                ];

function UserData(username, password, firstName, lastName, nickname, email, phone, room, year, homepage, city, state, country) {
	var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
	this.username = username;
	this.password = hash;
	this.firstName = firstName
	this.lastName = lastName;
	this.nickname = nickname;
	this.email = email;
	this.phone = phone;
	this.room = room;
	this.year = year;
	this.homepage = homepage;
	this.city = city;
	this.state = state;
	this.country = country;
}

module.exports = {
		userData: userData
}