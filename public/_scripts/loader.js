$(window).load(function() {

	setTimeout(function() {
		$('#loader').addClass('out');
	}, 750+1000);

	setTimeout(function() {
		$('#loader').fadeOut('fast');
	}, 3000+1000);

})