$(window).load(function() {
	var introStart = 100;

	setTimeout(function() {
		$('#loader').addClass('out');
	}, 750+introStart);

	if ($('body').hasClass('home')) {
		setTimeout(function() {
			$('#loader').fadeOut('fast');
		}, 3000+introStart);
	}
	if ($('body').hasClass('project')) {
		setTimeout(function() {
			$('#loader').fadeOut('fast');
		}, 1750+introStart);
	}

});