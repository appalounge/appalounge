
$(function() {
	$('#login').click(function() {
		var username = $('#username').val();
		var password = $('#password').val();
		$.get('/data/login?username=' + username + '&password=' + password, function(json) {
			if (json.key) {
				var query = getQueryVars();
				var path = '/';
				if (query.path) {
					path = query.path;
				}
				location.href = path + '?key=' + json.key;
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