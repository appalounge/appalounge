$(function() {
	$.get('/data/users/' + keyString(), function(users) {
		for (var i = 0; i < users.length; i++) {
            $('#userList').append('<div style="margin-top: 16px;" class="col-lg-4 col-md-6" style="text-align:center;"><a href="/users/' + users[i].username + location.search + '"><img class="img-circle hvr-grow-rotate" src="/profilepic/' + users[i].username + location.search + '" style="width: 200px; height: 200px;"></img></a><br /><br /><a href="/users/' + users[i].username + location.search + '">' + (users[i].firstName && users[i].firstName.content ? users[i].firstName.content + ' ' : '') + (users[i].nickname && users[i].nickname.content ? '"' + users[i].nickname.content + '" ' : '') + (users[i].lastName && users[i].lastName.content ? users[i].lastName.content + ' ' : '') + '(' + users[i].username + ')</h2></div><!-- /.col-lg-4 -->')
		}
	});
});