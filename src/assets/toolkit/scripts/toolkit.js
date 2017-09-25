/**
 * Toolkit JavaScript
 */


 /* DEPENDENCIES & 3RD PARTY LIBRARIES IMPORTS */
  var fastclick = require('fastclick'),
  Headroom      = require('headroom.js'),
  picturefill   = require('picturefill'),
  lity          = require('lity'),
  enquire       = require('enquire.js');

  require('./study-areas.js'); //TODO: set up multiple entry points for webpack bundles



  /* CONSTANT ATTRIBUTES */

  var TRANSITION_TIMEOUT       = 200; //update in _settings.variables.scss(135)
  var MOBILE_LARGE_AND_SMALLER = 'screen and (max-width: 43.6875em)', //update in _settings.responsive.scss(57)

  // Iframe selectors
  YOUTUBE_IFRAME_SELECTOR = 'iframe[src*="youtube"]',
  GMAPS_IFRAME_SELECTOR   = 'iframe[src*="/maps/"]',
  VIMEO_IFRAME_SELECTOR   = 'iframe[src*="vimeo"]';


  /* SUPPORTING FUNCTIONS */

  /** Wrap YT videos in .embed wrapper that helps with responsiveness. */
  function wrapEmbeddedIframes() {
    var iframes = $( YOUTUBE_IFRAME_SELECTOR + ', ' + GMAPS_IFRAME_SELECTOR + ', ' + VIMEO_IFRAME_SELECTOR ),
    singleIframe = null, iframeClasses;

    iframes.each( function( index ) {
      singleIframe = $( this );

      // If it doesn't already have wrapper, wrap it!
      if ( !singleIframe.parent().hasClass( 'embed' ) ){
        iframeClasses = singleIframe.attr("class") || '';

        singleIframe.wrap( '<div class="embed ' + iframeClasses + '"></div>' );

        if ( iframeClasses ) singleIframe.removeClass();
      }
    });
  }


  /** Deletes all study areas tiles that are display: none from DOM to
  keep the markup clean (and easily handled by the CSS) */
  function removedUnusedTiles() {
    $( '.tiles-wrap .tile').each( function() {
      if ($(this).css("display") == "none") {
        $(this).remove();
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
		if ($(this).parent().hasClass('active')) {
			return;
		}
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('.study-areas').toggleClass('hidden');
		$('.degrees-quals').toggleClass('hidden');

	});

	/* dynamic height for tiles. setting height of all tiles from largest tile height */
	$('.dynamic-height-tiles ').each(function(n){
		//get array of heights for each group of class
		var tileHeights = $(this).find('li.tile').map(function(){
			return $(this).height(); 
		}).get();

		//check heights for largest
		var maxHeight = Math.max.apply(null, tileHeights);
		
		//apply maxheight to tiles
		$(this).find('li.tile').height(maxHeight + 16);
	});

	/* Navigation toggle on mobile */
	$('.main-menu-toggle').on('click', function () { 
		$('.main-nav').slideToggle();
		$('.search-bar').slideToggle();
		$('.menu-toggle-icon').toggleClass('open');
	 });

	 /* Show search bar on desktop */
	 $('.search-item').on('click', function () { 
		$('.search-bar').slideToggle();
	  });

  /** DOM manipulation */

  wrapEmbeddedIframes();
  removedUnusedTiles(); //TODO: Review - Can be removed after all the study areas are migrated

});
