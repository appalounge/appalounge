
$(function() {
	$.get('/data/gallery/', function(gallery) {
		for (var i = 0; i < gallery.length; i++) {
			//$('#dankmemes').append('<img style="padding:1%;width:20%;height:20%" src="/memes/' + dankmemes[i] + '"></img>');
            $('#gallery').append('<div class="col-sm-6 col-md-4"><div class="thumbnail"><a href="' + gallery[i] + '"><img src="' + gallery[i] + '" alt="Photo alt"/></a></div></div>');
		}
	});
});