
$(function() {
	var user = location.href.slice(location.href.lastIndexOf('/') + 1);
	$.get('/data/users/' + user, function(data) {
		for (var field in data) {
			if (data.hasOwnProperty(field) && data[field]) {
				if (field === 'homepage') {
					$('#userData').append('<div>' + field + ': <a target="blank" href="' + data[field] + '">' + data[field] + '</a></div>');
				}
				else {
					$('#userData').append('<div>' + field + ': ' + data[field] + '</div>');
				}
			}
		}
	});
});