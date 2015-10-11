
var dateOptions = {
		year: '2-digit', month: '2-digit',
		day: 'numeric', hour: '2-digit', minute: '2-digit'
};

$(function() {
	$.get('/data/announcements/' + keyString(), function(announcements) {
		onSessionData(function(response) {
			if (announcements.length) {
				for (var i = 0; i < announcements.length; i++) {
		            $('#announcements').append('<div style="' + (i < announcements.length - 1 ? 'padding-bottom:10px;' : '') + 'text-align:center"><span style="font-size:18px">' + announcements[i].message + '</span><div style="color:#909090">- ' + announcements[i].creator + ' ' + new Date(announcements[i].created).toLocaleTimeString('en-US', dateOptions) 
		            		+ (response && (response.admin || response.username === announcements[i].creator) ? ' &nbsp;<a href="javascript:deleteAnnouncement(\'' + announcements[i]._id + '\')">Delete</a>' : '') + '</div>'
		            		+ '</div>');
				}
			}
			else {
				$('#announcements').append('<div style="text-align: center; font-size: 18px;">There are no announcements at this time</div>');
			}
			if (response) {
				$('#announcements').append('<div style="padding-top:10px;text-align:center"><a style="text-align:center" href="javascript:addAnnouncement()">Add</a></div>');
			}
		});
	});
});

function addAnnouncement() {
	var message = prompt('Announcement message: ', '');
	if (message) {
		$.post('/data/announcements/add/' + keyString(), { message: message }, function(json) {
			location.href = '/';
		});
	}
}

function deleteAnnouncement(id) {
	$.post('/data/announcements/delete/' + keyString(), { id: id }, function(json) {
		location.href = '/';
	});
}
