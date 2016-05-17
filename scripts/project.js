

// Project script
// ------------------------------------------------------------

jQuery(function($) {
	var body = $("body");
	var header = $("header");
	var nav = $("nav");
	var nava = $("#nava");
	var navb = $("#navb");
	var navc = $("#navc");
	var home = $("#push");
	var work = $("#work");

	// autoscroll to top
		var callbackScroll = { 
			callbackAfter: function () {
				liToggleEnabled = true;
				return liToggleEnabled;
			}
		};
		smoothScroll.animateScroll(null, '#project', callbackScroll);


// Intro sequence
// ------------------------------------------------------------

	$(window).load(function() {
		setTimeout(function() {

			$('nav').removeClass('hide');
			$('header').removeClass('hide');
			$('.arrowbar').removeClass('hide');
			// $('.base').removeClass('hide');

			setTimeout(function() {
				$('.work').removeClass('bgfade');
				$('.base').removeClass('hide');
			}, 600);

			setTimeout(function() {
				$('#nava').addClass('full');
			}, 1800);


// Waypoints
// ------------------------------------------------------------

		setTimeout(function() {

		// fold transitions
			home.waypoint({
				handler: function(event, direction) {
					body.toggleClass('fold');}, offset: '-5%' });
			work.waypoint({
				handler: function(event, direction) {
					body.toggleClass('foldb');}, offset: '-70%' });
		// nav style
			work.waypoint({
				handler: function(event, direction) {
					nav.toggleClass('sticky');}, offset: '30%' });

		}, 500);

	}, 1000+1000);
});


// header parallax scroll
	$(document).scroll(function(){
		var headerLogo = $('#logo, #logob'),
			offsetLogo = headerLogo.offset().top,
			yPosLogo = -($(window).scrollTop()/headerLogo.data('speed'));
		headerLogo.css({'-webkit-transform':'translateY('+yPosLogo+'px)','transform':'translateY('+yPosLogo+'px)'});
		var headerTitle = $('#title'),
			offsetTitle = headerTitle.offset().top,
			yPosTitle = -($(window).scrollTop()/headerTitle.data('speed'));
		headerTitle.css({'-webkit-transform':'translateY('+yPosTitle+'px)','transform':'translateY('+yPosTitle+'px)'});
	});

// triggers video play on click
	var video = document.getElementById('video');
	if (body.hasClass('coolhouse')) {
		video.addEventListener('click',function(){
			video.play();
		},false);
	}

// homepage redirect
	$(window).on('resize', function() {
		if (window.matchMedia('(max-width: 959px)').matches) {
			window.location.href = "/";
		}
	});
	if (window.matchMedia('(max-width: 959px)').matches) {
		window.location.href = "/";
	}

// page links & transitions
	$('#nava').on('mouseup', function(event) {
		event.preventDefault();
		if((event.which == 1)) {
			$('body').addClass('out').addClass('return'); 
			setTimeout(function() { 
				location.href='/';
			}, 1200);
		} else {
			window.open('/', '_blank');
		}
	});
	$('body.project').on('mouseup', '.navb #navlink', function(event) {
		event.preventDefault();
		var projectPath = '/'+$(this).attr('data-pathname')+'/';
		if((event.which == 1)) {
			$('body').addClass('out').addClass('prev'); 
			var projectDelay = setTimeout(function() {
				location.href = projectPath;
			}, 1200);
		} else {
			window.open(projectPath, '_blank');
		}
	});
	$('body.project').on('mouseup', '.navc #navlink, a#navlink, .next#navlink', function(event) {
		event.preventDefault();
		var projectPath = '/'+$(this).attr('data-pathname')+'/';
		if((event.which == 1)) {
			$('body').addClass('out').addClass('next');
			$('.next').addClass('active'); 
			var projectDelay = setTimeout(function() { 
				location.href = projectPath;
			}, 1200);
		} else {
			window.open(projectPath, '_blank');
		}
	});


});


// smooth scroll
	smoothScroll.init();
