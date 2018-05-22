/** !Toolkit's core JS */


/* DEPENDENCIES & 3RD PARTY LIBRARIES IMPORTS */
import $ from 'jquery';
import fastclick from 'fastclick';
import Headroom from 'headroom.js';
import cookie from 'cookies-js';
import enquire from 'enquire.js';
import lity from 'lity';
import picturefill from 'picturefill';

// Include all standalone modules
import { tracker, trackerConfig } from './modules/tracking';

trackerConfig({ autoRegister: true });


// Export to the global namespace (~ window)
window.$      = $;
window.jQuery = $;





  require('./study-areas.js'); //TODO: set up multiple entry points for webpack bundles


  /* CONSTANT ATTRIBUTES */

  var TRANSITION_TIMEOUT       = 200; //update in _settings.variables.scss(135)
  var MOBILE_LARGE_AND_SMALLER = 'screen and (max-width: 42.99em)', //update in _settings.responsive.scss(57)

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


  const SIDEMENU_CLASS          = 'sidemenu';
  const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
  const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
  const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';

  const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
  const SIDEMENU_EXPANDED_CLASS      = 'expanded';



  function initExpandableSubmenu() {
    const expandableButtonElement = $( this );
    const submenuContainer = expandableButtonElement.parent( '.' + SIDEMENU_SUBMENU_CLASS );

    // Init default state
    var isExpanded = submenuContainer.hasClass( SIDEMENU_SELECTED_ITEM_CLASS );

    function apply() {
      if ( isExpanded ) {
        submenuContainer.addClass( SIDEMENU_EXPANDED_CLASS );
      } else {
        submenuContainer.removeClass( SIDEMENU_EXPANDED_CLASS );
      }
    }

    // Init
    apply();

    // Bind `click` events to all expandable buttons
    expandableButtonElement.on( 'click', function( e ) {
      e.preventDefault();
      e.stopPropagation();
      isExpanded = !isExpanded;
      apply();
    });
  }

  function initSidemenuExpandability() {
    const menuElement = $( '.' + SIDEMENU_CLASS );

    enhanceSidemenu( menuElement );

    // Expanding/Collapsing of the entire side menu on mobile devices
    menuElement.children( '.' + SIDEMENU_TOGGLE_CLASS ).children( 'a' ).on( 'click', function( e ) {
      e.preventDefault();
      e.stopPropagation();
      $(this).parent().toggleClass( SIDEMENU_EXPANDED_CLASS );
    });

    const expandableButtons = menuElement.find( '.' + SIDEMENU_EXPANDER_CLASS );

    // Add tracking if enabled
    if ( tracker.shouldTrackElement( menuElement ) ){
      tracker.registerForTracking( menuElement.find( 'li > a' ), 'click', 'sidemenu-link' );
      tracker.registerForTracking( expandableButtons, 'click', 'sidemenu-expander' );
    }

    expandableButtons.each( initExpandableSubmenu );
  }

  //TODO: Remove after this was implemented on the backend (~ in Squiz)
  /** Adds necessary classes and expanding/collapsing elements if the item has got submenu. */
  const btnExpanderHtml = '<span class="btn-expander" title="Toggle subpages"></span>';

  function enhanceSidemenu( menuElement ) {
      menuElement.find( 'li' ).each( function() {
        const listItem = $( this );

        // a) already has got a proper class in place? Skip!
        if ( listItem.hasClass( SIDEMENU_SUBMENU_CLASS )) return;

        // b) No submenu in <li>? Skip!
        if ( listItem.children( 'ul' ).length === 0 ) return;

        // c) Has got a submenu => Enhance sidemenu's HTML
        listItem.addClass( SIDEMENU_SUBMENU_CLASS );
        $( btnExpanderHtml).insertAfter( listItem.children( 'a' ) );
      });
  }



  /** Popup launcher. */
  function initPopupBox( popupElement, { delayInMs = 7000, suppressAfterCanceling = true } = {} ){

    const COOKIE_ID       = popupElement.get( 0 ).id || 'popup';
    const COOKIE_SETTINGS = {
      expires: 2419200, // 28 days
      //secure  : true    //If set to true the secure attribute of the cookie
    };

    let popupContainerElement = popupElement.parent( `.popup-positioner` );

    popupContainerElement = popupContainerElement.length ? popupContainerElement : null;

    const buttonOkElement       = popupElement.find( '.button-ok' );
    const buttonCancelElement   = popupElement.find( '.button-cancel' );
    const buttonCloseElement    = popupElement.find( '.btn-close' );

    const IS_SHOWN_CLASS        = 'shown';


    // Attach button events
    function bindButtonEvents() {
      buttonCloseElement.on( 'click', close );
      buttonCancelElement.on( 'click', cancel );
      buttonOkElement.on( 'click', submit );
    }

    function unbindButtonEvents() {
      buttonCloseElement.off( 'click', close );
      buttonCancelElement.off( 'click', cancel );
      buttonOkElement.off( 'click', submit );
    }

    function close( event ){
      // If `positionerClass` exists, hide + save 'hidden' to cookies
      event.preventDefault();
      event.stopPropagation();
      closePopup();
    }

    function submit( event ){
      // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
      closePopup();
    }

    function cancel( event ){
      // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
      closePopup();
    }

    function showPopup() {
      bindButtonEvents();
      addShownClass();

      if ( tracker.shouldTrackElement( popupElement ) ){
        tracker.trackEvent( popupElement.get( 0 ).id, 'open' );
      }
    }

    function addShownClass() {
    if ( popupContainerElement ) {
        $( document.body ).append( popupContainerElement );
        popupContainerElement.addClass( IS_SHOWN_CLASS );
        //popupContainerElement.fadeIn( 'slow', function() {});
      } else {
        popupElement.addClass( IS_SHOWN_CLASS );
      }
    }

    function removeShownClass() {
      if ( popupContainerElement ) {
        popupContainerElement.removeClass( IS_SHOWN_CLASS );
        //popupContainerElement.fadeOut( 'slow', function() {});
      } else {
        popupElement.removeClass( IS_SHOWN_CLASS );
      }
    }

    function isPopupShown(){
      return popupElement.attr( 'data-shown' ) == 'true';
    }

    function closePopup() {
      unbindButtonEvents();
      popupElement.attr( 'data-shown', false );
      removeShownClass();

      if ( suppressAfterCanceling ) closePopupPermanently();
    }

    function closePopupPermanently() {
      cookie.set( COOKIE_ID, true, COOKIE_SETTINGS );
    }

    // Constructor
    (function init() {
      const shouldShowPopup = !suppressAfterCanceling || ( cookie.get( COOKIE_ID ) === undefined || !cookie.get( COOKIE_ID ) );

      if ( shouldShowPopup && !isPopupShown() ) {
        popupElement.attr( 'data-shown', true ); // Must be added here to prevent triggering setTimeout when clicking multiple time

        // If there's a positioner available, display after the timeout!
        setTimeout( () => {
          showPopup();
        }, delayInMs );
      }
    })();

  }


  /**
   * Function called on the jQuery Element, opens it as a popup.
   *
   * @param {Object} { delayInMs = 0, suppressAfterCanceling = false }
   *
   * @returns {DOMElement}
   */
  function openPopup( { delayInMs = 0, suppressAfterCanceling = false } = {} ){
    initPopupBox( this, { delayInMs: delayInMs, suppressAfterCanceling: suppressAfterCanceling } );

    return this;
  }


// Run after the DOM has loaded...
$(function(){

	fastclick.attach(document.body);
	var $body          = $( 'body' );
	var $globalNav     = $( '#global-nav' );
  var $globalSearch  = $( '#global-search' );

  /** Init side-menu, if it's present */
  if ( $( '.' + SIDEMENU_CLASS ).length ) {
    initSidemenuExpandability();
  }

  // Find all existing popups and if they contain `data-autoload` attribute,
  // trigger autoloading automatically.
  $( '.popup' ).each( function() {
    var popupElement = $( this )
    if ( popupElement.attr( 'data-autoload' ) !== undefined ){
      // Autoload (~ show/hide) popup
      var optionsObject = {};

      if ( popupElement.attr( 'data-opts' ) !== undefined ) {
        optionsObject = JSON.parse( popupElement.attr( 'data-opts' ) );
      }

      initPopupBox( popupElement, optionsObject );
    }
  });


  //http://wicky.nillia.ms/enquire.js/
  //TODO: Refactor and extract to its own library
	enquire.register( MOBILE_LARGE_AND_SMALLER, function() {

		if ( $globalNav.length ) {
      const eGlobalNav      = $globalNav[0],
      bannerHeaderElement = $( '.site-header' ),
      sidemenu            = $( '.sidemenu' );

			const headroom  = new Headroom( eGlobalNav, {

			  'offset':    $globalNav.outerHeight(),
        // or scroll tolerance per direction
        tolerance : {
          down: 5,
          up:   20,
        },
        'classes': {
          'initial':  'sticky',
          'pinned':   'slide-down',
          'unpinned': 'slide-up',
          'notTop':   'no-top'
        },
      });

      headroom.init();

      const disableHeadroom = () => {
        if(headroom){
          headroom.scroller.removeEventListener('scroll', headroom.debouncer, false);
        }
      };

      const enableHeadroom = () => {
        if(headroom){
          headroom.scroller.addEventListener('scroll', headroom.debouncer, false);
        }
      };

      const removeMenuOutClickListener = () => {
        document.removeEventListener( 'click', menuOutsideClickListener );
      };

      const registerMenuOutClickListener = () => {
        document.addEventListener( 'click', menuOutsideClickListener );
      };

      const toggleMobileMenu = () => {
				$globalNav.find('.tcon').toggleClass('tcon-transform');
        $globalNav.toggleClass( 'is-open' );

        if ( !headroom ) return;

        if ( $globalNav.hasClass( 'is-open' ) ){
          disableHeadroom();
          $body.addClass( 'unscrollable' );
          registerMenuOutClickListener();
        } else {
          enableHeadroom();
          $body.removeClass( 'unscrollable' );
          removeMenuOutClickListener();
        }
      };

      function menuOutsideClickListener( event ) {
        if (!$(event.target).closest( '#global-nav' ).length) {
          toggleMobileMenu();
        }
      };

			$body.on( 'click ', '.js-toggle-global-nav', function( _event ){
        toggleMobileMenu();
			});
		}

	});


  // Opens/closes global search bar & gains auto-focus
	$body.on('click ', '.js-toggle-global-search', function(_event){
		var $this = $(this);

		if ($this.data('js-has-active-transition')) {
			return false;
    }

		$this.data('js-has-active-transition', true);
		$this.find('.tcon').toggleClass('tcon-transform');

		if ( $globalSearch.hasClass('is-open') ) {
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

	/* study areas toggle programme level initially hide postgrad */
	$('.study-areas-postgrad').hide();
	$('.switch .switch-input').on( 'change', function () {

		console.log( $(this).attr('value') );

		if( $(this).attr('value') == 'undergraduate' ) {
			$('#study-area-tabs > ul > li:nth-child(1) h4').html('<span class="icon-book-open"></span>Subject areas');
			$('.study-areas-undergrad').show(500);
			$('.study-areas-postgrad').hide(500);
		}
		if( $(this).attr('value') == 'postgraduate' ) {
			$('#study-area-tabs > ul > li:nth-child(1) h4').html('<span class="icon-book-open"></span> Postgraduate subjects');
			$('.study-areas-postgrad').show(500);
			$('.study-areas-undergrad').hide(500);
		}

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


  //tile accordion

  $('.tile-accordion .tile').not('.tile-accordion.content-page').on('click', function (evt) {
		// evt.preventDefault();

		if( $(this).hasClass('accordion-closed') ) {
			$(this).children('.accordion-content ').slideDown();
			$(this).removeClass('accordion-closed').addClass('accordion-open');
		} else if ( $(this).hasClass('accordion-open') ) {
			$(this).children('.accordion-content ').slideUp();
			$(this).removeClass('accordion-open').addClass('accordion-closed');
		}

		$(this).find('.links a').on('click', function (event) {
			event.stopPropagation();
		 });
   });
});

/* Research hub content page tile accordian */
$('.tile-accordion.content-page .tile .toggle').on('click', function (evt) {

  var $this = $(this);

  $this.toggleClass('expanded');
  $this.siblings('p').toggle();

});

/* Add accessible title label for restricted links class  */
function restrictedLinkTitle() {
  var lockLinks = document.querySelectorAll('.link-restricted');

  for (var i = 0; i < lockLinks.length; i++) {
    lockLinks[i].setAttribute('title', 'Restricted intranet link');
  }


}
restrictedLinkTitle();

/* Research hub mega menu */
function hubMegaMenu() {
  console.log('menu test');
  
}

hubMegaMenu();





/**
 * jQuery's plugin as a utility factory
 * Usage as: $( jquerySelector ).vicApp().method( options )
 */
(function( $ ) {
  $.fn.vicApp = function () {
    return {
      openPopup: openPopup.bind( this )
    };
  }
})( jQuery );
