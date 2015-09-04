
$(function() {
	var user = location.href.slice(location.href.lastIndexOf('/') + 1);
	$.get('/data/users/' + user, function(data) {
		$('#fullName').html(data.firstName + ' ' + (data.nickname ? '"' + data.nickname + '" ' : '') + data.lastName);
        $('#username').html(data.username);
        var profileSrc = data.profilePic ? data.profilePic : '/images/profileDefault.jpg';
        $('#userPicture').append('<img class="img-circle hvr-grow-rotate" src="' + profileSrc + '" style="width: 300px; height: 300px; margin-bottom: 32px;"></img>');
        if(data.email){ $('#userData').append('<div>Email: <a href="mailto:' + data.email + '">' + data.email + '</a></div>'); }
        if(data.phone){ $('#userData').append('<div>Phone: <a href="tel:' + data.phone + '">' + data.phone + '</a></div>'); }
        if(data.room) { $('#userData').append('<div>Room: ' + data.room + '</div>'); }
        if(data.year) { $('#userData').append('<div>Year: ' + data.year + '</div>'); }
        if(data.homepage) { $('#userData').append('<div>Homepage: <a href="' + data.homepage + '">' + data.homepage + '</a></div>'); }
        if(data.country) { $('#userData').append('<div>Country: ' + data.country + '</div>'); }
        if(data.state) { $('#userData').append('<div>State: ' + data.state + '</div>'); }
        if(data.city) { $('#userData').append('<div>City: ' + data.city + '</div>'); }
	});
});