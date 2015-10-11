
var query = getQueryVars();
if (keyString() && !query.key) {
	location.href = (query.path || '/') + (query.required && query.required == 1 ? keyString() : '');
}

$(function() {
	if (query.required && query.required == 1) {
		$('#subtitle').text('You must login to access this page');
	}
	$('#loginForm').submit(function(event) {
		event.preventDefault();
		var username = $('#username').val();
		var password = $('#password').val();
		login(username, password, function(error) {
			$('#errorMessage').html('<p style="color:red">' + (error || 'An error has occurred') + '</p>');
		});
	});
});