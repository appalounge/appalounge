
$(function() {
	var str = location.href;
	var index = str.indexOf('?');
	if (index !== -1) {
		str = str.substring(0, index);
	}
	var user = str.slice(str.lastIndexOf('/') + 1);
	$.get('/data/users/' + user + keyString(), function(data) {
		$('#fullName').html((data.firstName && data.firstName.content ? data.firstName.content + ' ' : '') + (data.nickname && data.nickname.content ? '"' + data.nickname.content + '" ' : '') + (data.lastName && data.lastName.content ? data.lastName.content : ''));
        $('#username').html(data.username + (data.admin ? ' <span style="color:red">(admin)</span>' : ''));
        $('#userPicture').append('<img class="img-circle hvr-grow-rotate" src="/profilepic/' + user + location.search + '" style="width: 300px; height: 300px; margin-bottom: 32px;"></img>');
        if(data.email && data.email.content){ $('#userData').append('<div>Email: <a href="mailto:' + data.email.content + '">' + data.email.content + '</a></div>'); }
        if(data.phone && data.phone.content){ $('#userData').append('<div>Phone: <a href="tel:' + data.phone.content + '">' + data.phone.content + '</a></div>'); }
        if(data.room && data.room.content) { $('#userData').append('<div>Room: ' + data.room.content + '</div>'); }
        if(data.year && data.year.content) { $('#userData').append('<div>Year: ' + data.year.content + '</div>'); }
        if(data.city && data.city.content) { $('#userData').append('<div>City: ' + data.city.content + '</div>'); }
        if(data.state && data.state.content) { $('#userData').append('<div>State/Province: ' + data.state.content + '</div>'); }
        if(data.country && data.country.content) { $('#userData').append('<div>Country: ' + data.country.content + '</div>'); }
        if(data.homepage && data.homepage.content) { $('#userData').append('<div>Homepage: <a target="blank" href="' + data.homepage.content + '">' + data.homepage.content + '</a></div>'); }
        if(data.extra && data.extra.content) { $('#userData').append('<br><div>' + data.extra.content + '</div>'); }
	});
	
	onSessionData(function(response) {
		var str = location.href;
		var index = str.indexOf('?');
		if (index !== -1) {
			str = str.substring(0, index);
		}
		var user = str.slice(str.lastIndexOf('/') + 1);
		if (response) {
			if (user === response.username || response.admin) {
				$('#footerMessage').append('<hr class="featurette-divider"/>');
				$('#footerMessage').append('<div style="text-align:center"><a href="' + location.pathname.replace('users', 'users/edit') + '">Edit</a> this user</div>');
			}
		}
		else {
			$('#footerMessage').append('<hr class="featurette-divider"/>');
			$('#footerMessage').append('<div style="text-align:center"><a href="/login?path=' + location.pathname + '">Login</a> to view more</div>');
		}
	});
});