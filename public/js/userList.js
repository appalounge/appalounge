$(function() {
	$.get('/data/users/', function(users) {
		for (var i = 0; i < users.length; i++) {
            console.log(users[i]);
            var profileSrc = users[i].profilePic ? users[i].profilePic : '/images/profileDefault.jpg';
            $('#userList').append('<div style="margin-top: 16px;" class="col-lg-4 col-md-6" style="text-align:center;"><a href="/users/' + users[i].username + '"><img class="img-circle hvr-grow-rotate" src="' + profileSrc + '" style="width: 200px; height: 200px;"></img></a><br /><br /><a href="/users/' + users[i].username + '">' + users[i].firstName + ' ' + users[i].lastName + ' &nbsp;(' + users[i].username + ')</h2></div><!-- /.col-lg-4 -->')
		}
	});
});