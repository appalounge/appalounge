
$(function() {
	$.get('/data/dankmemes/', function(dankmemes) {
		for (var i = 0; i < dankmemes.length; i++) {
			//$('#dankmemes').append('<img style="padding:1%;width:20%;height:20%" src="/memes/' + dankmemes[i] + '"></img>');
            $('#dankmemes').append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><img src="/memes/' + dankmemes[i] + '" alt="Photo alt"</div></div>');
		}
	});
});