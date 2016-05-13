$(window).load(function() {
	setTimeout(function() {
		$('#status').fadeOut();
		$('#preloader').delay(100).fadeOut('slow');
		$('body').delay(100).css({'overflow':'visible'});
	}, 1000);
})