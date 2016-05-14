$(window).load(function() {

	setTimeout(function() {
		$('#loader').addClass('out');
	}, 500+750);

	setTimeout(function() {
		$('#loader').fadeOut('fast');
	}, 1750+750);

})