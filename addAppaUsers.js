module.exports = function() {
    
    var config = require('./config');
    var users = require('./users');
    var userList = config.users;

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
    
}