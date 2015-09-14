
$(function() {
	var str = location.href;
	var index = str.indexOf('?');
	if (index !== -1) {
		str = str.substring(0, index);
	}
	var user = str.slice(str.lastIndexOf('/') + 1);
    $('#userPicture').append('<img class="img-circle hvr-grow-rotate" src="/profilepic/' + user + location.search + '" style="width: 300px; height: 300px; margin-bottom: 32px;"></img>');
	var uploadPath = '/profilepic/' + user + location.search;
	$('#profilePicForm').attr('action', uploadPath);
	$('#profilePicForm').attr('action', uploadPath);
	$('#subtitle').text(user);
	$.get('/data/users/edit/' + user + location.search, function(json) {
		if (json.username) {
			$('#firstName').val(json.firstName);
			$('#lastName').val(json.lastName);
			$('#nickname').val(json.nickname);
			$('#email').val(json.email);
			$('#phone').val(json.phone);
			$('#room').val(json.room);
			$('#year').val(json.year);
			$('#homepage').val(json.homepage);
			$('#city').val(json.city);
			$('#state').val(json.state);
			$('#country').val(json.country);
			$('#extra').val(json.extra);
		}
		else {
			$('#editUserPage').hide();
			$('#errorMessage').html('<p style="color:red">' + (json.error || 'An error has occurred') + '</p>');
		}
	});
	
	$('#editUserForm').submit(function(event) {
		event.preventDefault();
		var userData = {
				username: user,
				firstName: $('#firstName').val(),
				lastName: $('#lastName').val(),
				nickname: $('#nickname').val(),
				email: $('#email').val(),
				phone: $('#phone').val(),
				room: $('#room').val(),
				year: $('#year').val(),
				homepage: $('#homepage').val(),
				city: $('#city').val(),
				state: $('#state').val(),
				country: $('#country').val(),
				extra: $('#extra').val()
		}
		$.post('/data/users/edit/' + user + location.search, userData, function(json) {
			if(json.error) {
				$('#errorMessage').html('<p style="color:red">' + (json.error || 'An error has occurred') + '</p>');
			}
			else {
				location.href = '/users/' + user + location.search;
			}
		});
	});

	$('#changePasswordForm').submit(function(event) {
		event.preventDefault();
		var password = $('#password').val();
		var newPassword = $('#newPassword').val();
		var confirmNewPassword = $('#confirmNewPassword').val();
		if (newPassword !== confirmNewPassword) {
			$('#passwordErrorMessage').html('<p style="color:red">Passwords do not match</p>');
		}
		else {
			$.post('/data/users/changePassword/' + user + location.search, { password: password, newPassword: newPassword }, function(json) {
				if (json.error) {
					$('#passwordErrorMessage').html('<p style="color:red">' + (json.error || 'An error has occurred') + '</p>');
				}
				else {
					location.href = '/users/' + user + location.search;
				}
			});
		}
	});
});