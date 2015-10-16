
$(function() {
	var chatKey = '';
	$.get('/data/chat' + keyString(), function(json) {
		if (json.key) {
			chatKey = json.key;
			var path = '/data/chat/' + keyString();
			if (path.indexOf('?') !== -1) {
				path += '&chatKey=' + chatKey;
			}
			else {
				path += '?chatKey=' + chatKey;
			}
			//var messageCount = -1;
			var interval = setInterval(function() {
				$.get(path, function(response) {
					var messages = response.newMessages;
					//var autoscroll = (messages.length !== messageCount);
					//messageCount = messages.length;
					if (messages) {
						//$('#chatDisplay').empty();
						if (messages.length) {
							display(messages);
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
		$.post('/data/chat' + keyString(), { key: chatKey, message: message }, function(response) {
		});
	});
	
	function display(messages) {
		var div = $('#chatDisplay');
		var inner = $('#chatDisplay > .inner');
		console.log(Math.abs(inner.offset().top) + ' + ' + div.height() + ' + ' + div.offset().top + ' = ' + (Math.abs(inner.offset().top) + div.height() + div.offset().top) + ' >= ' + (inner.outerHeight() - 1));
		var atBottom = Math.abs(inner.offset().top) + div.height() + div.offset().top >= inner.outerHeight() - 1;
		var dateFormat = {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
		};
		for (var i = 0; i < messages.length; i++) {
			var message = messages[i];
			if (message.sender) {
				$('#chatDisplay > .inner').append('<div><span style="color:#0000ff">[' + new Date(message.date).toLocaleTimeString('en-US', dateFormat) + ']</span> <span style="color:#00aaaa">' + message.sender + '</span>: &nbsp;' + message.message + '</div>');
			}
			else {
				$('#chatDisplay > .inner').append('<div><span style="color:#0000ff">[' + new Date(message.date).toLocaleTimeString('en-US', dateFormat) + ']</span> <span style="color:#00aaaa">' + message.message + '</span></div>');
			}
		}
		if (atBottom) {
			$('#chatDisplay').animate({scrollTop: $('#chatDisplay > .inner').outerHeight()});
		}
	}
});