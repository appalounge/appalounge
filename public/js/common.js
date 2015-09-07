
$(function() {
	$.get('/data/session' + location.search, function(response) {
		if (response) {
			document.appaData = {
					username: response.username
			};
			
			$('#loginlogout').text('Logout (' + response.username + ')');
			$('#loginlogout').attr('href', removeParam(location.pathname + location.search, 'key'));
		}
		else {
			$('#loginlogout').text('Login');
			$('#loginlogout').attr('href', '/login?path=' + location.pathname);
			
			// Exists on some pages
			$('#loginMessage').append('<hr class="featurette-divider"/>');
			$('#loginMessage').append('<div style="text-align:center"><a href="/login?path=' + location.pathname + '">Login</a> to view more</div>');
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

