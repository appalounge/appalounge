
$(function() {
	var chatKey = '';
	$.get('/data/chat' + location.search, function(json) {
		if (json.key) {
			chatKey = json.key;
			var path = '/data/chat/' + location.search;
			if (path.indexOf('?') !== -1) {
				path += '&chatKey=' + chatKey;
			}
			else {
				path += '?chatKey=' + chatKey;
			}
			var interval = setInterval(function() {
				$.get(path, function(response) {
					var messages = response.newMessages;
					if (messages) {
						for (var m = 0; m < messages.length; m++) {
							display(messages[m]);
						}
					}
					else {
						clearInterval(interval);
					}
				});
			}, 500);
		}
		else {
			//$('#errorMessage').html('<p style="color:red">' + (json.error || 'An error has occurred') + '</p>');
			console.log('Failed to connect to chat');
		}
	});

	$('#chatForm').submit(function(event) {
		event.preventDefault();
		var message = $('#chatMessage').val();
		$('#chatMessage').val('');
		$.post('/data/chat' + location.search, { key: chatKey, message: message }, function(response) {
		});
	});
	
	function display(message) {
		var dateFormat = {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
		};
		$('#chatDisplay').append('<div><span style="color:#0000ff">[' + new Date(message.date).toLocaleTimeString('en-US', dateFormat) + ']</span> <span style="color:#ff0000">' + message.sender + '</span>: &nbsp;' + message.message + '</div>');
		var div = document.getElementById('chatDisplay');
		div.scrollTop = div.scrollHeight;
	}
});