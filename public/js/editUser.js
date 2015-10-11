
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
			$('#firstName').val(json.firstName.content);
			$('#lastName').val(json.lastName.content);
			$('#nickname').val(json.nickname.content);
			$('#email').val(json.email.content);
			$('#phone').val(json.phone.content);
			$('#room').val(json.room.content);
			$('#year').val(json.year.content);
			$('#homepage').val(json.homepage.content);
			$('#city').val(json.city.content);
			$('#state').val(json.state.content);
			$('#country').val(json.country.content);
			$('#extra').val(json.extra.content);

			$('#firstNamePublic').attr('checked', json.firstName.publicView);
			$('#lastNamePublic').attr('checked', json.lastName.publicView);
			$('#nicknamePublic').attr('checked', json.nickname.publicView);
			$('#emailPublic').attr('checked', json.email.publicView);
			$('#phonePublic').attr('checked', json.phone.publicView);
			$('#roomPublic').attr('checked', json.room.publicView);
			$('#yearPublic').attr('checked', json.year.publicView);
			$('#homepagePublic').attr('checked', json.homepage.publicView);
			$('#cityPublic').attr('checked', json.city.publicView);
			$('#statePublic').attr('checked', json.state.publicView);
			$('#countryPublic').attr('checked', json.country.publicView);
			$('#extraPublic').attr('checked', json.extra.publicView);
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
				firstName: { content: $('#firstName').val() || null, publicView: $('#firstNamePublic').prop('checked') },
				lastName: { content: $('#lastName').val() || null, publicView: $('#lastNamePublic').prop('checked') },
				nickname: { content: $('#nickname').val() || null, publicView: $('#nicknamePublic').prop('checked') },
				email: { content: $('#email').val() || null, publicView: $('#emailPublic').prop('checked') },
				phone: { content: $('#phone').val() || null, publicView: $('#phonePublic').prop('checked') },
				room: { content: $('#room').val() || null, publicView: $('#roomPublic').prop('checked') },
				year: { content: $('#year').val() || null, publicView: $('#yearPublic').prop('checked') },
				homepage: { content: $('#homepage').val() || null, publicView: $('#homepagePublic').prop('checked') },
				city: { content: $('#city').val() || null, publicView: $('#cityPublic').prop('checked') },
				state: { content: $('#state').val() || null, publicView: $('#statePublic').prop('checked') },
				country: { content: $('#country').val() || null, publicView: $('#countryPublic').prop('checked') },
				extra: { content: $('#extra').val() || null, publicView: $('#extraPublic').prop('checked') }
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