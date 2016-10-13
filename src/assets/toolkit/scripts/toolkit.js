/**
 * Toolkit JavaScript
 */
var fastclick = require('fastclick');
var Headroom = require('headroom.js');
var picturefill = require('picturefill');
// var Velocity = require("velocity-animate");
var lity = require('lity');
var enquire = require('enquire.js');

require('./study-areas.js'); //TODO: set up multiple entry points for webpack bundles

var TRANSITION_TIMEOUT = 200; //update in _settings.variables.scss(135)
var MOBILE_LARGE_AND_SMALLER = 'screen and (max-width: 43.6875em)'; //update in _settings.responsive.scss(57)



/** Wrap YT videos in .embed wrapper that helps with responsiveness. */
function wrapYouTubeVideos() {
  var youtubeVideos = $('iframe[src*="youtube"'),
  singleVideo = null;

  youtubeVideos.each( function( index ) {
    singleVideo = $( this );

    // If it doesn't already have wrapper, wrap it!
    if ( !singleVideo.parent().hasClass( 'embed' ) ){
      singleVideo.wrap( '<div class="embed"></div>' );
    }
  });
}





$(function(){

	fastclick.attach(document.body);
	var $body = $('body');
	var $globalNav = $("#global-nav");
	var $globalSearch = $("#global-search");

	//http://wicky.nillia.ms/enquire.js/
	enquire.register(MOBILE_LARGE_AND_SMALLER, function() {

		if ($globalNav.length) {
			var eGlobalNav = $globalNav[0];
			var headroom  = new Headroom(eGlobalNav, {
			  "offset": eGlobalNav.clientHeight,
			  "tolerance": {
			  	up: 20,
			  	down: 5
			  },
			  onPin: function (){
			  	//reset in-menu scrolling
			  	$globalNav.find('.menu').scrollTop(0);
			  },
			  onUnpin: function (){
			  	$globalNav.toggleClass('is-open', false);
			  	$globalNav.find('.tcon').toggleClass('tcon-transform', false);
			  }

			});
			headroom.init();

			$body.on('click ', '.js-toggle-global-nav', function(_event){
				var $this = $(this);
				$this.find('.tcon').toggleClass('tcon-transform');
				$globalNav.toggleClass('is-open');
			});
		}

	});


	$body.on('click ', '.js-toggle-global-search', function(_event){
		var $this = $(this);

		if ($this.data('js-has-active-transition')) {
			return false;
		}

		$this.data('js-has-active-transition', true);
		$this.find('.tcon').toggleClass('tcon-transform');

		if ($globalSearch.hasClass('is-open')) {
			$globalSearch.toggleClass('is-open', false);
			setTimeout(function(){
				$this.data('js-has-active-transition', false);
			}, TRANSITION_TIMEOUT);
		} else {
			$globalSearch.toggleClass('is-open', true);
			setTimeout(function(){
				$globalSearch.find('input:text').focus();
				$this.data('js-has-active-transition', false);
			}, TRANSITION_TIMEOUT);
		}
		// $globalSearch.velocity({'left': '85%'}, { duration: 1500 });
		_event.preventDefault();
	});


	//Study areas tabs toggle

	$('#study-area-tabs li a').click(function(){
		console.log('test');
		if ($(this).parent().hasClass('active')) {
			return;
		}
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('.tile-grid').toggleClass('hidden');
		$('.study-area-single').toggleClass('hidden');
		
	});


  /** DOM manipulation */

  wrapYouTubeVideos();

});
