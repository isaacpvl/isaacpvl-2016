$(window).load(function() {

	setTimeout(function() {
		$('#status').addClass('out');
	}, 1000);

	setTimeout(function() {
		$('#loader').fadeOut('fast');
	}, 3000);

})