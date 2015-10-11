
$(function() {
	$.get('/data/announcements/' + keyString(), function(announcements) {
		if (announcements.length) {
			for (var i = 0; i < announcements.length; i++) {
	            $('#announcements').append('<p style="text-align: center; font-size: 18px;">' + announcements[i] + '</p>');
			}
		}
		else {
			$('#announcements').append('<p style="text-align: center; font-size: 18px;">There are no announcements at this time</p>');
		}
	});
});