
$(function() {
	$.get('/data/dankmemes/', function(dankmemes) {
		for (var i = 0; i < dankmemes.length; i++) {
			$('#dankmemes').append('<img style="padding:1%;width:20%;height:20%" src="/images/memes/' + dankmemes[i] + '"></img>');
		}
	});
});