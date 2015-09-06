
$(document).ready(function() {
	$.get('/data' + location.pathname + location.search, function(response) {
		var files = response;
		if (files.length) {
			$('#files').append('<table>');
			$('#files').append('<tr>');
			$('#files').append('<td style="padding:5px;"><b>File</b></td>');
			$('#files').append('<td style="padding:5px;"><b>Size</b></td>');
			$('#files').append('</tr>');
			for (var i = 0; i < files.length; i++) {
				var link = location.pathname + location.search;
				link += (link[link.length - 1] === '/' ? '' : '/') + files[i].fileName;
				$('#files').append('<tr style="background-color:' + (files[i].isDirectory ? '#ffffee' : '#ffffff') + '">');
		        $('#files').append('<td style="padding:5px;"><b>' + files[i].fileName + '</b></td>');
	            $('#files').append('<td style="padding:5px;">' + files[i].size + ' bytes</td>');
	            if (!files[i].isDirectory) {
	                $('#files').append('<td style="padding:5px;"><a target="blank" href="' + link + '"><b>View</b></a></td>');
	                $('#files').append('<td style="padding:5px;"><a href="' + link + '" download><b>Download</b></a></td>');
	            }
	            else {
	                $('#files').append('<td style="padding:5px;"><a href="' + link + '"><b>Open</b></a></td>');
	                //$('#files').append('<td style="padding:5px;"><a href="' + files[i].fileName + '" download><b>Download</b></a></td>');
	            }
				$('#files').append('</tr>');
	            $('#files').append('<td style="padding:5px;"><a href="' + link.replace('files', 'remove') + '"><b>Delete</b></a></td>');
			}
			$('#files').append('</table>');
		}
		else {
			$('#files').append('<div style="color:#B4BCC2"><i>This folder is empty</i></div>');
		}
	});
	
	var path = decodeURI($('#subtitle').text());
	var dirs = path.split('/');
	for (var d = 0; d < dirs.length; d++) {
		if (!dirs[d]) {
			dirs.pop(d);
		}
	}
	var current = dirs.pop();
	var html = '';
	for (var d = 0; d < dirs.length; d++) {
		var parentPath = '';
		var dir = dirs[d];
		for (var e = 0; e <= d; e++) {
			parentPath += '/' + dirs[e];
		}
		html += '<a href="' + parentPath + '">' + dir + '</a>/';
	}
	html += current;
	$('#subtitle').html(html);
	
	$('#newFolder').click(function() {
		var folderName = $('#folderName').val();
		if (folderName) {
			var link = location.pathname + location.search;
			link += (link[link.length - 1] === '/' ? '' : '/') + folderName;
			$.get(link.replace('files', 'newfolder'), function(json) {
				location.href = json.redirect;
			});
		}
	});
});