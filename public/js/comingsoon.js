$(document).ready(function(){
	var colors = [
	              "red",
	              "orange",
	              "yellow",
	              "green",
	              "blue",
	              "purple"
	              ];
	var i = 0;
	setInterval(function() {
		$("#header").css("color", colors[i]);
		i++;
		if (i >= colors.length) {
			i = 0;
		}
		if (i % 2 == 0)
			$("#header2").css("color", 'white');
		else
			$("#header2").css("color", 'black');
		
	}, 300);
});