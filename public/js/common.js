
$(function() {
	$.get('/data/session' + location.search, function(response) {
		if (response) {
			$('#loginlogout').text('Logout (' + response.username + ')');
			$('#loginlogout').attr('href', removeParam(location.pathname + location.search, 'key'));
		}
		else {
			$('#loginlogout').text('Login');
			$('#loginlogout').attr('href', '/login?path=' + location.pathname);
		}

		if (location.pathname.match('^/users/[a-zA-Z0-9]+')) {
			var str = location.href;
			var index = str.indexOf('?');
			if (index !== -1) {
				str = str.substring(0, index);
			}
			var user = str.slice(str.lastIndexOf('/') + 1);
			if (response) {
				if (user === response.username || response.admin) {
					$('#userPageFooterMessage').append('<hr class="featurette-divider"/>');
					$('#userPageFooterMessage').append('<div style="text-align:center"><a href="' + location.pathname.replace('users', 'users/edit') + location.search + '">Edit</a> this user</div>');
				}
			}
			else {
				$('#userPageFooterMessage').append('<hr class="featurette-divider"/>');
				$('#userPageFooterMessage').append('<div style="text-align:center"><a href="/login?path=' + location.pathname + '">Login</a> to view more</div>');
			}
		}
	});
});

function removeParam(sourceURL, key) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}

