
var dataCallback = null;
var onSessionData = function(callback) {
	dataCallback = callback;
}

$(function() {
	$.get('/data/session' + keyString(), function(response) {
		if (dataCallback) {
			dataCallback(response);
		}
		onSessionData = function(callback) {
			callback(response);
		}
		if (response) {
			$('#loginlogout').text('Logout (' + response.username + ')');
			//$('#loginlogout').attr('href', removeParam(location.pathname + location.search, 'key'));
			$('#loginlogout').attr('href', 'javascript:logout()');
			$('ul.nav.navbar-nav').append('<li><a href="/users/edit/' + response.username + '">Edit Profile</a></li>');
		}
		else {
			$('#loginlogout').text('Login');
			$('#loginlogout').attr('href', '/login?path=' + location.pathname);
			if (keyString()) {
				document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
			}
		}

		//$('body').append('<img class="img-circle hvr-grow-rotate" src="/images/11989105_883896211686452_401753163_n.gif" style="position: absolute; top: 30px; left: 30px; width: 100px; height: 100px; margin-bottom: 32px;"></img>');
		$('ul.nav.navbar-nav').append('<li><a href="javascript:turndownforwhat()"></a></li>');
	});
	
	$.get('/data/theme' + keyString(), function(response) {
		if (response) {
			customize(response.theme);
		}
	});
});

function logout() {
	/*alert(document.cookie);
	document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
	alert(document.cookie);
	location.href = location.pathname;*/
	location.href = '/logout?path=' + location.pathname;
}

function login(username, password, callback) {
	var query = getQueryVars();
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
			if (callback) {
				callback(json.error);
			}
		}
	});
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

function setTheme(theme) {
	$.post('/data/theme' + keyString(), { theme: theme }, function(response) {
		location.href = '/';
	});
}

function customize(theme) {
	var themes = {
			halloween: {
				backgroundImage: '/images/ghosts.gif',
				backgroundSize: '',
				navbarColor: '#F89A29',
				navbarActiveColor: '#D87A00',
				navbarLinkColor: '#FFFFFF',
				titleColor: '#F89A29',
				subtitleColor: '',
				linkColor: '#F89A29',
				textColor: '#FFFFFF',
				buttonColor: '#F89A29',
				buttonHoverColor: '#D87A00',
				dividerColor: '#F89A29',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			},
			thanksgiving: {
				backgroundImage: '/images/leaves.png',
				backgroundSize: '',
				navbarColor: '#6D411E',
				navbarActiveColor: '#4D2100',
				navbarLinkColor: '#FFFE7F',
				titleColor: '#FFFFFF',
				subtitleColor: '#FFFE7F',
				linkColor: '#FFFE7F',
				textColor: '#FFFFFF',
				buttonColor: '#6D411E',
				buttonHoverColor: '#4D2100',
				dividerColor: '#FFFFFF',
				announcementsBackground: 'rgba(1, 1, 1, 0.2)'
			},
			christmas: {
				backgroundImage: '/images/christmas.jpg',
				backgroundSize: '',
				navbarColor: '#DF3227',
				navbarActiveColor: '#BF1207',
				navbarLinkColor: '#21E025',
				titleColor: '#FFFFFF',
				subtitleColor: '#FFFFFF',
				linkColor: '#61F065',
				textColor: '#FFFFFF',
				buttonColor: '#DF3227',
				buttonHoverColor: '#BF1207',
				dividerColor: '#FFFFFF',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			},
			snow: {
				backgroundImage: '/images/snow.gif',
				backgroundSize: '',
				navbarColor: '#F89A29',
				navbarActiveColor: '#D87A00',
				navbarLinkColor: '#FFFFFF',
				titleColor: '#F89A29',
				subtitleColor: '',
				linkColor: '#F89A29',
				textColor: '#FFFFFF',
				buttonColor: '#F89A29',
				buttonHoverColor: '#D87A00',
				dividerColor: '#F89A29',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			},
			stars: {
				backgroundImage: '/images/stars.gif',
				backgroundSize: '',
				navbarColor: '#F89A29',
				navbarActiveColor: '#D87A00',
				navbarLinkColor: '#FFFFFF',
				titleColor: '#F89A29',
				subtitleColor: '',
				linkColor: '#F89A29',
				textColor: '#FFFFFF',
				buttonColor: '#F89A29',
				buttonHoverColor: '#D87A00',
				dividerColor: '#F89A29',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			},
			rain: {
				backgroundImage: '/images/rain.gif',
				backgroundSize: '',
				navbarColor: '#F89A29',
				navbarActiveColor: '#D87A00',
				navbarLinkColor: '#FFFFFF',
				titleColor: '#F89A29',
				subtitleColor: '',
				linkColor: '#F89A29',
				textColor: '#FFFFFF',
				buttonColor: '#F89A29',
				buttonHoverColor: '#D87A00',
				dividerColor: '#F89A29',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			},
			matrix: {
				backgroundImage: '/images/matrix.gif',
				backgroundSize: '400px',
				navbarColor: '#F89A29',
				navbarActiveColor: '#D87A00',
				navbarLinkColor: '#FFFFFF',
				titleColor: '#F89A29',
				subtitleColor: '',
				linkColor: '#F89A29',
				textColor: '#FFFFFF',
				buttonColor: '#F89A29',
				buttonHoverColor: '#D87A00',
				dividerColor: '#F89A29',
				announcementsBackground: 'rgba(1, 1, 1, 0.5)'
			}
	};
	useStyle(themes[theme]);
}

function useStyle(style) {
	if (style) {
		var css = '<style>';
		css += 'body {background-color: #6D411E; background-image: url(' + style.backgroundImage + '); background-size: ' + style.backgroundSize + '}';
		css += '.navbar-inverse {background-color: ' + style.navbarColor + '}';
		css += '.active > a {background-color: ' + style.navbarActiveColor + '!important}';
		css += '.navbar a {color:' + style.navbarLinkColor + '!important}'
		css += '.navbar-brand p {color:' + style.navbarLinkColor + '}'
		css += '#title {color: ' + style.titleColor + '!important}';
		css += '#subtitle {color: ' + style.subtitleColor + '}';
		css += 'a, a:hover, #title {color: ' + style.linkColor + '}';
		css += 'div, p, h2 {color: ' + style.textColor + '}';
		css += '.btn-default {background-color: ' + style.buttonColor + '}';
		css += '.btn-default:hover {background-color: ' + style.buttonHoverColor + '}';
		css += '.featurette-divider {border-top: 1px solid ' + style.dividerColor + '!important}';
		css += '.well {background: ' + style.announcementsBackground + '}';
		css += 'input {background-color: #ffffff; color: #000000} '
			+ '#chatDisplay {background-color: #ffffff}'
			+ '#chatDisplay div {color: #000000}'
			+ 'input {background-color: #ffffff}';
		css += '</style>';
		$('body').append(css);
	}
}

