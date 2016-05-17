$(window).load(function() {

	setTimeout(function() {
		$('#loader').addClass('out');
	}, 500+1000);
	setTimeout(function() {
		$('#loader').fadeOut('fast');
	}, 1750+1000);

});