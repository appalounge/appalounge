
$(function() {
	$.get('/data/session' + keyString(), function(response) {
		if (response) {
			$('#loginlogout').text('Logout (' + response.username + ')');
			//$('#loginlogout').attr('href', removeParam(location.pathname + location.search, 'key'));
			$('#loginlogout').attr('href', 'javascript:logout()');
			$('ul.nav.navbar-nav').append('<li><a href="/users/edit/' + response.username + location.search + '">Edit Profile</a></li>');
		}
		else {
			$('#loginlogout').text('Login');
			$('#loginlogout').attr('href', '/login?path=' + location.pathname);
			if (keyString()) {
				document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			}
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

		if (location.pathname.match('^/gallery')) {
			if (!response) {
				$('#galleryFooterMessage').append('<hr class="featurette-divider"/>');
				$('#galleryFooterMessage').append('<div style="text-align:center"><a href="/login?path=' + location.pathname + '">Login</a> to view more</div>');
			}
		}

		$('ul.nav.navbar-nav').append('<li><a href="javascript:turndownforwhat()"></a></li>');
	});
});

function logout() {
	document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	location.href = location.pathname;
}

function keyString() {
	var map = cookieMap();
	return map.key ? '?key=' + cookieMap().key : '';
}

function cookieMap() {
	var cookies = document.cookie.split('; ');
	var map = {};
	for (var i = 0; i < cookies.length; i++) {
		var temp = cookies[i].split('=');
		map[temp[0]] = temp[1];
	}
	//console.log(map);
	return map;
}

function turndownforwhat() {
	$('body').append('<script src="/turndownforwhat.js"></script>')
}

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

