$(function() {
	$.get('/data/users/' + location.search, function(users) {
		for (var i = 0; i < users.length; i++) {
            var profileSrc = users[i].profilePic ? users[i].profilePic : '/images/profileDefault.jpg';
            $('#userList').append('<div style="margin-top: 16px;" class="col-lg-4 col-md-6" style="text-align:center;"><a href="/users/' + users[i].username + location.search + '"><img class="img-circle hvr-grow-rotate" src="' + profileSrc + '" style="width: 200px; height: 200px;"></img></a><br /><br /><a href="/users/' + users[i].username + location.search + '">' + users[i].firstName + ' ' + users[i].lastName + ' &nbsp;(' + users[i].username + ')</h2></div><!-- /.col-lg-4 -->')
		}
	});
});