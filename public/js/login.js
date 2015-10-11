
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
		$.post('/data/login', { username: username, password: password }, function(json) {
			if (json.key) {
				var path = '/';
				if (query.path) {
					path = query.path;
				}
				document.cookie = 'key=' + json.key;
				location.href = path + (query.required && query.required == 1 ? keyString() : '');
			}
			else {
				$('#errorMessage').html('<p style="color:red">' + (json.error || 'An error has occurred') + '</p>');
			}
		});
	});
});

function getQueryVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}