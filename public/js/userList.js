
$(function() {
	$.get('/data/users/', function(users) {
		for (var i = 0; i < users.length; i++) {
			$('#userList').append('<a href="/users/' + users[i] + '">' + users[i] + '</a><br>');
		}
	});
});