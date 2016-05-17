

// Home script
// ------------------------------------------------------------

jQuery(function() {
	var body = $("body");
	var header = $("header");
	var nav = $("nav");
	var nava = $("#nava");
	var navb = $("#navb");
	var navc = $("#navc");
	var navd = $("#navd");
	var home = $("#push");
	var wall = $("#wall");
	var work = $("#work");
	var about = $("#about");
	var contact = $("#contact");
	var tagline = $("#tagline");
	var liToggleEnabled = true;

		$("nav li.caps").on('click', 'a', function() {
			$('nav li.caps').removeClass('active'); 
				$(this).closest('li.caps').addClass('active');
				liToggleEnabled = false;
				return liToggleEnabled;
		});

	// autoscroll to top
		var callbackScroll = { 
			callbackAfter: function () {
				liToggleEnabled = true;
				return liToggleEnabled;
			}
		};
		smoothScroll.animateScroll(null, '#home', callbackScroll);


// Intro sequence
// ------------------------------------------------------------

	$(window).load(function() {
		setTimeout(function() {

			$('nav').removeClass('hide');
			$('header').removeClass('hide');
			$('.wrap').removeClass('hide');
			$('.base').removeClass('hide');
			$('#taglinem').removeClass('hide');
			$('.arrowbar').removeClass('hide');

		setTimeout(function() {
			$('#push').addClass('reveal');
		}, 1200);

		setTimeout(function() {
			$('#nava').addClass('full');
		}, 1800);

	// PVL automatic expand
		var pvlStartTimer = setTimeout(function() {
			$('#nava').addClass('hover');   
		}, 6600);
		var pvlStopTimer = setTimeout(function() {
			$('#nava').removeClass('hover');
		}, 9600);

	// face animation arctext
		var firstSmile,
				happyFace,
				winkyFace,
				happyFaceAgain,
				noFace;
		if(($(window).innerWidth() > 959) && screen.width > 768) {
			$("#super").lettering();
			$("#sweet").lettering();
			$("#unique").lettering();
			$("#design").lettering();
			init();
		}

	// face animation trigger
		function init() {
			$("#super").arctext({radius: -1});
			$("#sweet").arctext({radius: -1});
			$('#unique').arctext({radius: -1});
			$("#design").arctext({radius: -1});
			$("#tagline h1 > span").arctext({radius: -1});
			firstSmile = setTimeout(function() {
				faceSmile();
			}, 2400);
			$('#tagline').on('click', '> span', function() {
				if(!$('#tagline').hasClass('face')) {
					faceSmile();
				}
			});
		}


// Waypoints
// ------------------------------------------------------------

		setTimeout(function() {

		// fold transitions
			home.waypoint({
				handler: function(event, direction) {
					body.toggleClass('fold');}, offset: '-5%' });
			wall.waypoint({
				handler: function(event, direction) {
					body.toggleClass('foldb');}, offset: '-200%' });
		// arrows
			home.waypoint({
				handler: function(event, direction) {
					work.toggleClass('out');}, offset: '-5%' });
			about.waypoint({
				handler: function(event, direction) {
					about.toggleClass('out');}, offset: '60%' });
			contact.waypoint({
				handler: function(event, direction) {
					contact.toggleClass('out');}, offset: '60%' });
		// nav style
			wall.waypoint({
				handler: function(event, direction) {
					nav.toggleClass('sticky');}, offset: '30%' });
			about.waypoint({
				handler: function(event, direction) {
					nav.toggleClass('bluebg');}, offset: 60 });
			contact.waypoint({
				handler: function(event, direction) {
					nav.toggleClass('bluebg');}, offset: 60 });
		// nav active item
			wall.waypoint({
				handler: function(event, direction) { if (liToggleEnabled) {
					navb.toggleClass('active'); } }, offset: '30%' });
			about.waypoint({
				handler: function(event, direction) { if (liToggleEnabled) {
					navb.toggleClass('active'); } }, offset: 60 });
			about.waypoint({
				handler: function(event, direction) { if (liToggleEnabled) {
					navc.toggleClass('active'); } }, offset: 60 });
			contact.waypoint({
				handler: function(event, direction) { if (liToggleEnabled) {
					navc.toggleClass('active'); } }, offset: 60 });
			contact.waypoint({
				handler: function(event, direction) { if (liToggleEnabled) {
					navd.toggleClass('active'); } }, offset: 60 });

		}, 2000);

	}, 1000+1000);
});


// header parallax scroll
	$(document).scroll(function(){
		var headerTagline = $('#tagline'),
			offsetTagline = headerTagline.offset().top,
			yPosTagline = -($(window).scrollTop()/headerTagline.data('speed'));
		headerTagline.css({'-webkit-transform':'translateY('+yPosTagline+'px)','transform':'translateY('+yPosTagline+'px)'}); 
		var headerSpeech = $('#speech'),
			offsetSpeech = headerSpeech.offset().top,
			yPosSpeech = -($(window).scrollTop()/headerSpeech.data('speed'));
		headerSpeech.css({'-webkit-transform':'translateY('+yPosSpeech+'px)','transform':'translateY('+yPosSpeech+'px)'}); 
	});


// face animation scroll disable
	wall.waypoint({
			 handler: function(direction) {
				 tagline.toggleClass('smile');
			 }, offset: 0 });

	$('#push').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
		$.waypoints('refresh');
	});

	if(navigator.userAgent.match(/(iPhone|iPod|iPad)/i)){
		$("body").addClass('nowall');
	}


// browser cycle animation trigger
	cycleGo = $(function() {
		browserCycle();
	});
	cycleLoop = setInterval(function() {
		browserCycle();
	}, 6400);


// newsflash easter egg trigger
	$('#newslink').on('mouseup', function() {
		$('#news').addClass('flash');
	});
	$('#news').on('mouseup', function() {
		$('#news').removeClass('flash');
	});


// page links & transitions
	$('section.work').on('mouseup', '#navlink', function(event) {
		event.preventDefault();
		var projectPath = '/'+$(this).attr('data-pathname')+'/';
		if((event.which == 1)) {
			$('body').addClass('out').addClass('next');
			var projectDelay = setTimeout(function() {
				location.href = projectPath;
			}, 1200);
		} else {
			window.open(projectPath, '_blank');
		}
	});

});


// Header face animation
// ------------------------------------------------------------

	function faceSmile() {

		if($('#tagline').hasClass('smile')) {
			happyFace = setTimeout(function() {
				$("#tagline").addClass('face').addClass('trigger');
				$("#speech").addClass('face');
				$("#super").arctext('set', {radius: 70, dir: 1, animation: { speed: 400}});
				$("#sweet").arctext('set', {radius: 90, dir: 1, animation: { speed: 450}});
				$('#unique').arctext('set', {radius: 690, dir: 1, animation: { speed: 500}});
				$("#design").arctext('set', {radius: 335, dir: -1, animation: { speed: 380}});
			}, 120);
		}
		if($('#tagline').hasClass('smile')) {
			winkyFace = setTimeout(function() {
				$("#tagline").addClass('wink');
				$("#speech").addClass('pop');
				$("#super").arctext('set', {radius: 70, dir: 1, animation: { speed: 280}});
				$("#sweet").arctext('set', {radius: 140, dir: -1, animation: { speed: 160}}); 
				$('#unique').arctext('set', {radius: -1, dir: -1, animation: { speed: 280}});
				$("#design").arctext('set', {radius: 120, dir: -1, animation: { speed: 280}});
			}, 1650);
		}
		if($('#tagline').hasClass('smile')) {
			happyFaceAgain = setTimeout(function() {
				$("#tagline").removeClass('wink');
				$("#super").arctext('set', {radius: 70, dir: 1, animation: { speed: 280}});
				$("#sweet").arctext('set', {radius: 90, dir: 1, animation: { speed: 160}});
				$('#unique').arctext('set', {radius: 690, dir: 1, animation: { speed: 330}});
				$("#design").arctext('set', {radius: 335, dir: -1, animation: { speed: 280}});
			}, 2300);
		}
		if($('#tagline').hasClass('smile')) {
			noFace = setTimeout(function() {
				$("#tagline").removeClass('face');
				$("#speech").removeClass('face');
				$("header #tagline h1 > span").arctext('set', {radius: -1, animation: { speed: 400}});
			}, 3400);
		}

	}


// Browser cycle animation
// ------------------------------------------------------------

	function browserCycle() {

		if($('.multibrowser').hasClass('cycle')) {
			prepa = setTimeout(function() {
				$(".cycle").addClass('prepa');
			}, 200);
			stepa = setTimeout(function() {
				$(".cycle").removeClass('prepa');
				$(".cycle").removeClass('stepd');
				$(".cycle").addClass('stepa');
			}, 1000);
			prepb = setTimeout(function() {
				$(".cycle").addClass('prepb');
			}, 1800);
			stepb = setTimeout(function() {
				$(".cycle").removeClass('prepb');
				$(".cycle").removeClass('stepa');
				$(".cycle").addClass('stepb');
			}, 2600);
			prepc = setTimeout(function() {
				$(".cycle").addClass('prepc');
			}, 3400);
			stepc = setTimeout(function() {
				$(".cycle").removeClass('prepc');
				$(".cycle").removeClass('stepb');
				$(".cycle").addClass('stepc');
			}, 4200);
			prepd = setTimeout(function() {
				$(".cycle").addClass('prepd');
			}, 5000);
			stepd = setTimeout(function() {
				$(".cycle").removeClass('prepd');
				$(".cycle").removeClass('stepc');
				$(".cycle").addClass('stepd');
			}, 5800);
		}

}


// smooth scroll
	smoothScroll.init();
