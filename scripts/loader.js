$(window).load(function() {
	var introStart = 1000;

	if ($('body').hasClass('home')) {
		setTimeout(function() {
			$('#loader').addClass('out');
		}, 750+introStart);
		setTimeout(function() {
			$('#loader').fadeOut('fast');
		}, 3000+introStart);
	}
	if ($('body').hasClass('project')) {
		setTimeout(function() {
			$('#loader').addClass('out');
		}, 650+introStart);
		setTimeout(function() {
			$('#loader').fadeOut('fast');
		}, 1750+introStart);
	}

});