
$(function() {
	var str = location.href;
	var index = str.indexOf('?');
	if (index !== -1) {
		str = str.substring(0, index);
	}
	var user = str.slice(str.lastIndexOf('/') + 1);
	$.get('/data/users/' + user + location.search, function(data) {
		$('#fullName').html((data.firstName ? data.firstName + ' ' : '') + (data.nickname ? '"' + data.nickname + '" ' : '') + (data.lastName || ''));
        $('#username').html(data.username + (data.admin ? ' <span style="color:red">(admin)</span>' : ''));
        $('#userPicture').append('<img class="img-circle hvr-grow-rotate" src="/profilepic/' + user + location.search + '" style="width: 300px; height: 300px; margin-bottom: 32px;"></img>');
        if(data.email){ $('#userData').append('<div>Email: <a href="mailto:' + data.email + '">' + data.email + '</a></div>'); }
        if(data.phone){ $('#userData').append('<div>Phone: <a href="tel:' + data.phone + '">' + data.phone + '</a></div>'); }
        if(data.room) { $('#userData').append('<div>Room: ' + data.room + '</div>'); }
        if(data.year) { $('#userData').append('<div>Year: ' + data.year + '</div>'); }
        if(data.city) { $('#userData').append('<div>City: ' + data.city + '</div>'); }
        if(data.state) { $('#userData').append('<div>State/Province: ' + data.state + '</div>'); }
        if(data.country) { $('#userData').append('<div>Country: ' + data.country + '</div>'); }
        if(data.homepage) { $('#userData').append('<div>Homepage: <a target="blank" href="' + data.homepage + '">' + data.homepage + '</a></div>'); }
        if(data.extra) { $('#userData').append('<br><div>' + data.extra + '</div>'); }
	});
});