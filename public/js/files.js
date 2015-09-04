
$(function() {
	$.get('/data' + location.pathname, function(files) {
		$('#files').append('<table>');
		$('#files').append('<tr>');
		$('#files').append('<td style="padding:5px;"><b>File</b></td>');
		$('#files').append('<td style="padding:5px;"><b>Size</b></td>');
		$('#files').append('</tr>');
		for (var i = 0; i < files.length; i++) {
			$('#files').append('<tr style="background-color:' + (files[i].isDirectory ? '#ffffee' : '#ffffff') + '">');
	        $('#files').append('<td style="padding:5px;"><b>' + files[i].fileName + '</b></td>');
            $('#files').append('<td style="padding:5px;">' + files[i].stats.size + ' bytes</td>');
            if (!files[i].isDirectory) {
                $('#files').append('<td style="padding:5px;"><a href="' + files[i].fileName + '"><b>View</b></a></td>');
                $('#files').append('<td style="padding:5px;"><a href="' + files[i].fileName + '" download><b>Download</b></a></td>');
            }
            else {
                $('#files').append('<td style="padding:5px;"><a href="' + files[i].fileName + '"><b>Open</b></a></td>');
                //$('#files').append('<td style="padding:5px;"><a href="' + files[i].fileName + '" download><b>Download</b></a></td>');
            }
			$('#files').append('</tr>');
		}
		$('#files').append('</table>');
	});
});