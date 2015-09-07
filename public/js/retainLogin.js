
$(function() {
	$('.retainLogin').each(function() {
		var remove = [ 'path', 'required' ];
		var newHref = $(this).attr('href') + location.search;
		for (var r = 0; r < remove.length; r++) {
			newHref = removeParam(newHref, remove[r]);
		}
		$(this).attr('href', newHref);
	});
});

function removeParam(sourceURL, key) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
}