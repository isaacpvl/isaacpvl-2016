

// Waypoints plugin
// ------------------------------------------------------------

	(function() {
		var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
			__slice = [].slice;

		(function(root, factory) {
			if (typeof define === 'function' && define.amd) {
				return define('waypoints', ['jquery'], function($) {
					return factory($, root);
				});
			} else {
				return factory(root.jQuery, root);
			}
		})(this, function($, window) {
			var $w, Context, Waypoint, allWaypoints, contextCounter, contextKey, contexts, isTouch, jQMethods, methods, resizeEvent, scrollEvent, waypointCounter, waypointKey, wp, wps;
			$w = $(window);
			isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
			allWaypoints = {
				horizontal: {},
				vertical: {}
			};
			contextCounter = 1;
			contexts = {};
			contextKey = 'waypoints-context-id';
			resizeEvent = 'resize.waypoints';
			scrollEvent = 'scroll.waypoints';
			waypointCounter = 1;
			waypointKey = 'waypoints-waypoint-ids';
			wp = 'waypoint';
			wps = 'waypoints';
			Context = (function() {

				function Context($element) {
					var _this = this;
					this.$element = $element;
					this.element = $element[0];
					this.didResize = false;
					this.didScroll = false;
					this.id = 'context' + contextCounter++;
					this.oldScroll = {
						x: $element.scrollLeft(),
						y: $element.scrollTop()
					};
					this.waypoints = {
						horizontal: {},
						vertical: {}
					};
					$element.data(contextKey, this.id);
					contexts[this.id] = this;
					$element.bind(scrollEvent, function() {
						var scrollHandler;
						if (!(_this.didScroll || isTouch)) {
							_this.didScroll = true;
							scrollHandler = function() {
								_this.doScroll();
								return _this.didScroll = false;
							};
							return window.setTimeout(scrollHandler, $[wps].settings.scrollThrottle);
						}
					});
					$element.bind(resizeEvent, function() {
						var resizeHandler;
						if (!_this.didResize) {
							_this.didResize = true;
							resizeHandler = function() {
								$[wps]('refresh');
								return _this.didResize = false;
							};
							return window.setTimeout(resizeHandler, $[wps].settings.resizeThrottle);
						}
					});
				}

				Context.prototype.doScroll = function() {
					var axes,
						_this = this;
					axes = {
						horizontal: {
							newScroll: this.$element.scrollLeft(),
							oldScroll: this.oldScroll.x,
							forward: 'right',
							backward: 'left'
						},
						vertical: {
							newScroll: this.$element.scrollTop(),
							oldScroll: this.oldScroll.y,
							forward: 'down',
							backward: 'up'
						}
					};
					if (isTouch && (!axes.vertical.oldScroll || !axes.vertical.newScroll)) {
						$[wps]('refresh');
					}
					$.each(axes, function(aKey, axis) {
						var direction, isForward, triggered;
						triggered = [];
						isForward = axis.newScroll > axis.oldScroll;
						direction = isForward ? axis.forward : axis.backward;
						$.each(_this.waypoints[aKey], function(wKey, waypoint) {
							var _ref, _ref1;
							if ((axis.oldScroll < (_ref = waypoint.offset) && _ref <= axis.newScroll)) {
								return triggered.push(waypoint);
							} else if ((axis.newScroll < (_ref1 = waypoint.offset) && _ref1 <= axis.oldScroll)) {
								return triggered.push(waypoint);
							}
						});
						triggered.sort(function(a, b) {
							return a.offset - b.offset;
						});
						if (!isForward) {
							triggered.reverse();
						}
						return $.each(triggered, function(i, waypoint) {
							if (waypoint.options.continuous || i === triggered.length - 1) {
								return waypoint.trigger([direction]);
							}
						});
					});
					return this.oldScroll = {
						x: axes.horizontal.newScroll,
						y: axes.vertical.newScroll
					};
				};

				Context.prototype.refresh = function() {
					var axes, cOffset, isWin,
						_this = this;
					isWin = $.isWindow(this.element);
					cOffset = this.$element.offset();
					this.doScroll();
					axes = {
						horizontal: {
							contextOffset: isWin ? 0 : cOffset.left,
							contextScroll: isWin ? 0 : this.oldScroll.x,
							contextDimension: this.$element.width(),
							oldScroll: this.oldScroll.x,
							forward: 'right',
							backward: 'left',
							offsetProp: 'left'
						},
						vertical: {
							contextOffset: isWin ? 0 : cOffset.top,
							contextScroll: isWin ? 0 : this.oldScroll.y,
							contextDimension: isWin ? $[wps]('viewportHeight') : this.$element.height(),
							oldScroll: this.oldScroll.y,
							forward: 'down',
							backward: 'up',
							offsetProp: 'top'
						}
					};
					return $.each(axes, function(aKey, axis) {
						return $.each(_this.waypoints[aKey], function(i, waypoint) {
							var adjustment, elementOffset, oldOffset, _ref, _ref1;
							adjustment = waypoint.options.offset;
							oldOffset = waypoint.offset;
							elementOffset = $.isWindow(waypoint.element) ? 0 : waypoint.$element.offset()[axis.offsetProp];
							if ($.isFunction(adjustment)) {
								adjustment = adjustment.apply(waypoint.element);
							} else if (typeof adjustment === 'string') {
								adjustment = parseFloat(adjustment);
								if (waypoint.options.offset.indexOf('%') > -1) {
									adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
								}
							}
							waypoint.offset = elementOffset - axis.contextOffset + axis.contextScroll - adjustment;
							if ((waypoint.options.onlyOnScroll && (oldOffset != null)) || !waypoint.enabled) {
								return;
							}
							if (oldOffset !== null && (oldOffset < (_ref = axis.oldScroll) && _ref <= waypoint.offset)) {
								return waypoint.trigger([axis.backward]);
							} else if (oldOffset !== null && (oldOffset > (_ref1 = axis.oldScroll) && _ref1 >= waypoint.offset)) {
								return waypoint.trigger([axis.forward]);
							} else if (oldOffset === null && axis.oldScroll >= waypoint.offset) {
								return waypoint.trigger([axis.forward]);
							}
						});
					});
				};

				Context.prototype.checkEmpty = function() {
					if ($.isEmptyObject(this.waypoints.horizontal) && $.isEmptyObject(this.waypoints.vertical)) {
						this.$element.unbind([resizeEvent, scrollEvent].join(' '));
						return delete contexts[this.id];
					}
				};

				return Context;

			})();
			Waypoint = (function() {

				function Waypoint($element, context, options) {
					var idList, _ref;
					options = $.extend({}, $.fn[wp].defaults, options);
					if (options.offset === 'bottom-in-view') {
						options.offset = function() {
							var contextHeight;
							contextHeight = $[wps]('viewportHeight');
							if (!$.isWindow(context.element)) {
								contextHeight = context.$element.height();
							}
							return contextHeight - $(this).outerHeight();
						};
					}
					this.$element = $element;
					this.element = $element[0];
					this.axis = options.horizontal ? 'horizontal' : 'vertical';
					this.callback = options.handler;
					this.context = context;
					this.enabled = options.enabled;
					this.id = 'waypoints' + waypointCounter++;
					this.offset = null;
					this.options = options;
					context.waypoints[this.axis][this.id] = this;
					allWaypoints[this.axis][this.id] = this;
					idList = (_ref = $element.data(waypointKey)) != null ? _ref : [];
					idList.push(this.id);
					$element.data(waypointKey, idList);
				}

				Waypoint.prototype.trigger = function(args) {
					if (!this.enabled) {
						return;
					}
					if (this.callback != null) {
						this.callback.apply(this.element, args);
					}
					if (this.options.triggerOnce) {
						return this.destroy();
					}
				};

				Waypoint.prototype.disable = function() {
					return this.enabled = false;
				};

				Waypoint.prototype.enable = function() {
					this.context.refresh();
					return this.enabled = true;
				};

				Waypoint.prototype.destroy = function() {
					delete allWaypoints[this.axis][this.id];
					delete this.context.waypoints[this.axis][this.id];
					return this.context.checkEmpty();
				};

				Waypoint.getWaypointsByElement = function(element) {
					var all, ids;
					ids = $(element).data(waypointKey);
					if (!ids) {
						return [];
					}
					all = $.extend({}, allWaypoints.horizontal, allWaypoints.vertical);
					return $.map(ids, function(id) {
						return all[id];
					});
				};

				return Waypoint;

			})();
			methods = {
				init: function(f, options) {
					var _ref;
					if (options == null) {
						options = {};
					}
					if ((_ref = options.handler) == null) {
						options.handler = f;
					}
					this.each(function() {
						var $this, context, contextElement, _ref1;
						$this = $(this);
						contextElement = (_ref1 = options.context) != null ? _ref1 : $.fn[wp].defaults.context;
						if (!$.isWindow(contextElement)) {
							contextElement = $this.closest(contextElement);
						}
						contextElement = $(contextElement);
						context = contexts[contextElement.data(contextKey)];
						if (!context) {
							context = new Context(contextElement);
						}
						return new Waypoint($this, context, options);
					});
					$[wps]('refresh');
					return this;
				},
				disable: function() {
					return methods._invoke(this, 'disable');
				},
				enable: function() {
					return methods._invoke(this, 'enable');
				},
				destroy: function() {
					return methods._invoke(this, 'destroy');
				},
				prev: function(axis, selector) {
					return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
						if (index > 0) {
							return stack.push(waypoints[index - 1]);
						}
					});
				},
				next: function(axis, selector) {
					return methods._traverse.call(this, axis, selector, function(stack, index, waypoints) {
						if (index < waypoints.length - 1) {
							return stack.push(waypoints[index + 1]);
						}
					});
				},
				_traverse: function(axis, selector, push) {
					var stack, waypoints;
					if (axis == null) {
						axis = 'vertical';
					}
					if (selector == null) {
						selector = window;
					}
					waypoints = jQMethods.aggregate(selector);
					stack = [];
					this.each(function() {
						var index;
						index = $.inArray(this, waypoints[axis]);
						return push(stack, index, waypoints[axis]);
					});
					return this.pushStack(stack);
				},
				_invoke: function($elements, method) {
					$elements.each(function() {
						var waypoints;
						waypoints = Waypoint.getWaypointsByElement(this);
						return $.each(waypoints, function(i, waypoint) {
							waypoint[method]();
							return true;
						});
					});
					return this;
				}
			};
			$.fn[wp] = function() {
				var args, method;
				method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
				if (methods[method]) {
					return methods[method].apply(this, args);
				} else if ($.isFunction(method)) {
					return methods.init.apply(this, arguments);
				} else if ($.isPlainObject(method)) {
					return methods.init.apply(this, [null, method]);
				} else if (!method) {
					return $.error("jQuery Waypoints needs a callback function or handler option.");
				} else {
					return $.error("The " + method + " method does not exist in jQuery Waypoints.");
				}
			};
			$.fn[wp].defaults = {
				context: window,
				continuous: true,
				enabled: true,
				horizontal: false,
				offset: 0,
				triggerOnce: false
			};
			jQMethods = {
				refresh: function() {
					return $.each(contexts, function(i, context) {
						return context.refresh();
					});
				},
				viewportHeight: function() {
					var _ref;
					return (_ref = window.innerHeight) != null ? _ref : $w.height();
				},
				aggregate: function(contextSelector) {
					var collection, waypoints, _ref;
					collection = allWaypoints;
					if (contextSelector) {
						collection = (_ref = contexts[$(contextSelector).data(contextKey)]) != null ? _ref.waypoints : void 0;
					}
					if (!collection) {
						return [];
					}
					waypoints = {
						horizontal: [],
						vertical: []
					};
					$.each(waypoints, function(axis, arr) {
						$.each(collection[axis], function(key, waypoint) {
							return arr.push(waypoint);
						});
						arr.sort(function(a, b) {
							return a.offset - b.offset;
						});
						waypoints[axis] = $.map(arr, function(waypoint) {
							return waypoint.element;
						});
						return waypoints[axis] = $.unique(waypoints[axis]);
					});
					return waypoints;
				},
				above: function(contextSelector) {
					if (contextSelector == null) {
						contextSelector = window;
					}
					return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
						return waypoint.offset <= context.oldScroll.y;
					});
				},
				below: function(contextSelector) {
					if (contextSelector == null) {
						contextSelector = window;
					}
					return jQMethods._filter(contextSelector, 'vertical', function(context, waypoint) {
						return waypoint.offset > context.oldScroll.y;
					});
				},
				left: function(contextSelector) {
					if (contextSelector == null) {
						contextSelector = window;
					}
					return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
						return waypoint.offset <= context.oldScroll.x;
					});
				},
				right: function(contextSelector) {
					if (contextSelector == null) {
						contextSelector = window;
					}
					return jQMethods._filter(contextSelector, 'horizontal', function(context, waypoint) {
						return waypoint.offset > context.oldScroll.x;
					});
				},
				enable: function() {
					return jQMethods._invoke('enable');
				},
				disable: function() {
					return jQMethods._invoke('disable');
				},
				destroy: function() {
					return jQMethods._invoke('destroy');
				},
				extendFn: function(methodName, f) {
					return methods[methodName] = f;
				},
				_invoke: function(method) {
					var waypoints;
					waypoints = $.extend({}, allWaypoints.vertical, allWaypoints.horizontal);
					return $.each(waypoints, function(key, waypoint) {
						waypoint[method]();
						return true;
					});
				},
				_filter: function(selector, axis, test) {
					var context, waypoints;
					context = contexts[$(selector).data(contextKey)];
					if (!context) {
						return [];
					}
					waypoints = [];
					$.each(context.waypoints[axis], function(i, waypoint) {
						if (test(context, waypoint)) {
							return waypoints.push(waypoint);
						}
					});
					waypoints.sort(function(a, b) {
						return a.offset - b.offset;
					});
					return $.map(waypoints, function(waypoint) {
						return waypoint.element;
					});
				}
			};
			$[wps] = function() {
				var args, method;
				method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
				if (jQMethods[method]) {
					return jQMethods[method].apply(null, args);
				} else {
					return jQMethods.aggregate.call(null, method);
				}
			};
			$[wps].settings = {
				resizeThrottle: 100,
				scrollThrottle: 30
			};
			return $w.load(function() {
				return $[wps]('refresh');
			});
		});
	}).call(this);


// Smooth scroll
// ------------------------------------------------------------

	window.smoothScroll = (function (window, document, undefined) {
		'use strict';
		// Default settings
		// Private {object} variable
		var _defaults = {
			speed: 1000,
			easing: 'easeInOutCubic',
			updateURL: false,
			callbackBefore: function () {},
			callbackAfter: function () {}
		};
		// Merge default settings with user options
		// Private method
		// Returns an {object}
		var _mergeObjects = function ( original, updates ) {
			for (var key in updates) {
				original[key] = updates[key];
			}
			return original;
		};
		// Calculate the easing pattern
		// Private method
		// Returns a decimal number
		var _easingPattern = function ( type, time ) {
			if ( type == 'easeInOutCubic' ) return time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1; // acceleration until halfway, then deceleration
		};
		// Calculate how far to scroll
		// Private method
		// Returns an integer
		var _getEndLocation = function ( anchor, headerHeight ) {
			var location = 0;
			if (anchor.offsetParent) {
				do {
					location += anchor.offsetTop;
					anchor = anchor.offsetParent;
				} while (anchor);
			}
			location = location - headerHeight;
			if ( location >= 0 ) {
				return location;
			} else {
				return 0;
			}
		};
		// Convert data-options attribute into an object of key/value pairs
		// Private method
		// Returns an {object}
		var _getDataOptions = function ( options ) {
			if ( options === null || options === undefined  ) {
				return {};
			} else {
				var settings = {}; // Create settings object
				options = options.split(';'); // Split into array of options
				// Create a key/value pair for each setting
				options.forEach( function(option) {
					option = option.trim();
					if ( option !== '' ) {
						option = option.split(':');
						settings[option[0]] = option[1].trim();
					}
				});
				return settings;
			}
		};
		// Update the URL
		// Private method
		// Runs functions
		var _updateURL = function ( anchor, url ) {
			if ( (url === true || url === 'true') && history.pushState ) {
				history.pushState( {pos:anchor.id}, '', anchor );
			}
		};
		// Start/stop the scrolling animation
		// Public method
		// Runs functions
		var animateScroll = function ( toggle, anchor, options, event ) {
			// Options and overrides
			options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
			var overrides = _getDataOptions( toggle ? toggle.getAttribute('data-options') : null );
			var speed = overrides.speed || options.speed;
			var easing = overrides.easing || options.easing;
			var updateURL = overrides.updateURL || options.updateURL;
			// Selectors and variables
			var fixedHeader = document.querySelector('[data-scroll-header]'); // Get the fixed header
			var headerHeight = fixedHeader === null ? 0 : (fixedHeader.offsetHeight + fixedHeader.offsetTop); // Get the height of a fixed header if one exists
			var startLocation = window.pageYOffset; // Current location on the page
			var endLocation = _getEndLocation( document.querySelector(anchor), headerHeight ); // Scroll to location
			var animationInterval; // interval timer
			var distance = endLocation - startLocation; // distance to travel
			var timeLapsed = 0;
			var percentage, position;
			// Prevent default click event
			if ( toggle && toggle.tagName === 'A' && event ) {
				event.preventDefault();
			}
			// Update URL
			_updateURL(anchor, updateURL);
			// Stop the scroll animation when it reaches its target (or the bottom/top of page)
			// Private method
			// Runs functions
			var _stopAnimateScroll = function () {
				var currentLocation = window.pageYOffset;
				if ( position == endLocation || currentLocation == endLocation || ( (window.innerHeight + currentLocation) >= document.body.scrollHeight ) ) {
					clearInterval(animationInterval);
					options.callbackAfter(); // Run callbacks after animation complete
				}
			};
			// Loop scrolling animation
			// Private method
			// Runs functions
			var _loopAnimateScroll = function () {
				timeLapsed += 16;
				percentage = ( timeLapsed / speed );
				percentage = ( percentage > 1 ) ? 1 : percentage;
				position = startLocation + ( distance * _easingPattern(easing, percentage) );
				window.scrollTo( 0, Math.floor(position) );
				_stopAnimateScroll(position, endLocation, animationInterval);
			};
			// Set interval timer
			// Private method
			// Runs functions
			var _startAnimateScroll = function () {
				options.callbackBefore(); // Run callbacks before animating scroll
				animationInterval = setInterval(_loopAnimateScroll, 16);
			};
			// Start scrolling animation
			_startAnimateScroll();
		};
		// Initialize Smooth Scroll
		// Public method
		// Runs functions
		var init = function ( options ) {
			// Feature test before initializing
			if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {
				// Selectors and variables
				options = _mergeObjects( _defaults, options || {} ); // Merge user options with defaults
				var toggles = document.querySelectorAll('[data-scroll]'); // Get smooth scroll toggles
				// When a toggle is clicked, run the click handler
				Array.prototype.forEach.call(toggles, function (toggle, index) {
					toggle.addEventListener('click', animateScroll.bind( null, toggle, toggle.getAttribute('href'), options ), false);
				});
			}
		};
		// Return public methods
		return {
			init: init,
			animateScroll: animateScroll
		};
	})(window, document);


// Main script
// ------------------------------------------------------------

	jQuery(function($) {
		var body = $("body");
		var header = $("header");
		var nav = $("nav");
		var nava = $(".nava");
		var navb = $(".navb");
		var navc = $(".navc");
		var navd = $(".navd");
		var arrow = $(".arrow");
		var home = $(".push");
		var work = $(".work");
		var browser = $(".browser");

		var callbackScroll = { 
			callbackAfter: function () {
				liToggleEnabled = true;
				return liToggleEnabled;
			}
		};
		smoothScroll.animateScroll(null, '#project', callbackScroll);

	// intro sequence
		$(window).load(function() {
			setTimeout(function() {

				$('nav').removeClass('hide');
				$('.wrap').removeClass('hide');
				$('.push').removeClass('hide');
				$('.arrowbar').removeClass('hide');
				$('.overview').removeClass('hide');
				$('.sbg').removeClass('hide');

				setTimeout(function() {
					$('.work').removeClass('bgfade');
				}, 650);

				setTimeout(function() {
					$('.nava').addClass('full');
				}, 1800);

			// waypoints
				setTimeout(function() {

				// fold transitions
					home.waypoint({
					handler: function(event, direction) {
						body.toggleClass('fold');}, offset: '-5%' });
					work.waypoint({
					handler: function(event, direction) {
						nav.toggleClass('sticky');}, offset: '30%' });
					work.waypoint({
					handler: function(event, direction) {
						body.toggleClass('fade');}, offset: -1 });

				}, 500);


			}, 500);
		})


	// adds parallax scroll to header
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


	// links and transitions to other pages
		$('body.project').on('mouseup', '.navlink', function(event) {
			event.preventDefault();
			var projectPath = '/'+$(this).attr('data-pathname')+'/';
			if((event.which == 1)) {
				$('body').addClass('next'); 
				var projectDelay = setTimeout(function() { 
					location.href = projectPath;
				}, 400);
			} else {
				window.open(projectPath, '_blank');
			}
		});

		$('#nava').on('mouseup', function(event) {
			event.preventDefault();
			if((event.which == 1)) {
				$('body').addClass('home'); 
				setTimeout(function() { 
					location.href='/';
				}, 400);
			} else {
				window.open('/', '_blank');
			}
		});


	// triggers video play on click
		var video = document.getElementById('video');
		if (body.hasClass('coolhouse')) {
			video.addEventListener('click',function(){
				video.play();
			},false);
		}


	// redirects to homepage
		$(window).on('resize', function() {
			if (window.matchMedia('(max-width: 959px)').matches) {
				window.location.href = "/";
			}
		});
		if (window.matchMedia('(max-width: 959px)').matches) {
			window.location.href = "/";
		}


	});


// Plugins
	// Lock scroll
	$(".lockscroll").bind("mousewheel DOMMouseScroll",function(e){var t=null;e.type==="mousewheel"?t=e.originalEvent.wheelDelta*-1:e.type==="DOMMouseScroll"&&(t=40*e.originalEvent.detail); if(t){e.preventDefault();$(this).scrollTop(t+$(this).scrollTop());}});

	// Retina images
	(function(){function e(e){this.path=e;var t=this.path.split("."),n=t.slice(0,t.length-1).join("."),r=t[t.length-1];this.at_2x_path=n+"@2x."+r}function t(t){this.el=t,this.path=new e(this.el.getAttribute("src"));var n=this;this.path.check_2x_variant(function(e){e&&n.swap()})}var n=typeof exports=="undefined"?window:exports;n.RetinaImagePath=e,e.confirmed_paths=[],e.prototype.is_external=function(){return!!this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain)},e.prototype.check_2x_variant=function(t){var n,r=this;if(this.is_external())return t(!1);if(this.at_2x_path in e.confirmed_paths)return t(!0);n=new XMLHttpRequest,n.open("HEAD",this.at_2x_path),n.onreadystatechange=function(){return n.readyState!=4?t(!1):n.status>=200&&n.status<=399?(e.confirmed_paths.push(r.at_2x_path),t(!0)):t(!1)},n.send()},n.RetinaImage=t,t.prototype.swap=function(e){function t(){n.el.complete?(n.el.setAttribute("width",n.el.offsetWidth),n.el.setAttribute("height",n.el.offsetHeight),n.el.setAttribute("src",e)):setTimeout(t,5)}typeof e=="undefined"&&(e=this.path.at_2x_path);var n=this;t()},n.devicePixelRatio>1&&(window.onload=function(){var e=document.getElementsByTagName("img"),n=[],r,i;for(r=0;r<e.length;r++)i=e[r],n.push(new t(i))})})();
	
	// Smooth scroll
	smoothScroll.init();

