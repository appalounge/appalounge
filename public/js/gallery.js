
$(function() {
	$.get('/data/gallery/', function(gallery) {
		for (var i = 0; i < gallery.length; i++) {
			//$('#dankmemes').append('<img style="padding:1%;width:20%;height:20%" src="/memes/' + dankmemes[i] + '"></img>');
            $('#gallery').append('<div style="text-align: center;" class="col-sm-6 col-md-4"><div style="margin-top: 16px;"><a href="' + gallery[i] + '"><img style="height: 300px; max-width: 375px;" src="' + gallery[i] + '" alt="Photo alt"/></a></div></div>');
		}
	});
});