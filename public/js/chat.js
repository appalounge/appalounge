
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
			var messageCount = -1;
			var interval = setInterval(function() {
				$.get(path, function(response) {
					var messages = response.newMessages;
					var autoscroll = (messages.length !== messageCount);
					messageCount = messages.length;
					if (messages) {
						$('#chatDisplay').empty();
						for (var m = 0; m < messages.length; m++) {
							display(messages[m], autoscroll);
						}
					}
					var onlineList = response.onlineList;
					if (onlineList) {
						$('#onlineList').empty();
						for (var o = 0; o < onlineList.length; o++) {
							$('#onlineList').append('<li>' + onlineList[o] + '</li>');
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
	
	function display(message, autoscroll) {
		var dateFormat = {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
		};
		if (message.sender) {
			$('#chatDisplay').append('<div><span style="color:#0000ff">[' + new Date(message.date).toLocaleTimeString('en-US', dateFormat) + ']</span> <span style="color:#00aaaa">' + message.sender + '</span>: &nbsp;' + message.message + '</div>');
		}
		else {
			$('#chatDisplay').append('<div><span style="color:#0000ff">[' + new Date(message.date).toLocaleTimeString('en-US', dateFormat) + ']</span> <span style="color:#00aaaa">' + message.message + '</span></div>');
		}
		if (autoscroll) {
			var div = document.getElementById('chatDisplay');
			div.scrollTop = div.scrollHeight;
		}
	}
});