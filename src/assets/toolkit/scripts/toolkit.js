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
      DESKTOP_AND_LARGER = 'screen and (min-width: 61em)',
      TABLET_AND_SMALLER = 'screen and (max-width: 975px)',

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





/** HELPERS */

//FIXME: Should be automatically pre-populated from the build/build.config.js
const ENV_HOSTNAME = {
  STAGE: 'cms.victoria.ac.nz',
  PROD:  'www.victoria.ac.nz',
  LOCAL: 'local.victoria.ac.nz',
}


function isAdminEnvironment() {
  return ( window.location.hostname === ENV_HOSTNAME.STAGE ) || ( window.location.hostname === ENV_HOSTNAME.LOCAL );
}


/**
 * Decodes email address into re-usable form.
 *
 * @deprecated Very old approach that won't work today - do not use.
 */
function decodeMailAddresses(){
  var a = 'dre:ams0of@g1niht.lp2c9u3v8k4w7y5j6zbx-_qfntigue6los5zar7b:y4dp8v3m9h2.x1w@k0jcq-_';
  var i, h, j, k, l, m, n, s;
  for (i = 0; i < document.links.length; i += 1) {
    h = document.links[i].hash;
    if (h.substring(0, 3) == '#sd') {
      k = '';
      l = h.substring(3, 5);
      m = h.lastIndexOf('?subject=');
      if (m == -1) { s = document.links[i].href; }
      else {
        s = h.substring(m);
        h = h.substring(0, m);
      };
      for (j = 5; j < h.length; j += 2) {

        k = k + a.charAt((h.substring(j, j + 2) - l - 1));
      }
      ; m = s.lastIndexOf('?subject=');
      if (m == -1) {
        document.links[i].href = k;
      }
      else { document.links[i].href = k + s.substring(m); };
      n = document.links[i].innerHTML;
      if (n == 'address') {
        document.links[i].innerHTML = k.substring(7);
      }
      else { document.links[i].title = k.substring(7); };
    };
  };
}



/** MESSAGE/NOTIFICATIONS HANDLING */

const ERROR_TYPES = {
  SIDEBAR_WIDGETS_COUNT_EXCEEDED: 'sidebar-widgets-count-exceeded',
}


/**
 * Renders the error message notification and adds it to the top of the
 * content window. Will show only to administrators within non-production
 * environments.
 *
 * @param {{type: string, message: string, invalidItems: Array[string]}} errorObject
 *
 * @returns {void}
 */
function showAdminErrorMessage( errorObject ) {
  if ( !errorObject || !isAdminEnvironment() ) return;

  let invalidItemsListHtml;

  if ( errorObject.invalidItems.length > 0 ) {
    invalidItemsListHtml = `
      <ul>
        <li>${ errorObject.invalidItems.join( '</li><li>' ) }</li>
      </ul>
    `;
  }

  // Template
  let errorNotificationHtml = `
    <section class="flash-message error">
      ${ errorObject.message }
      ${ invalidItemsListHtml }
    </section>
  `;

  $( '.content-panel > main > .formatting' ).prepend( errorNotificationHtml );
  console.error( 'Content-related error has occured', errorObject );
}


/** NAVIGATION */



/**
 * Adds the 'active' class to a main menu item
 * that corresponds with the current top-level URL path
 * segment.
 *
 * Note: This is *only* done due to Squiz 5.4 limitations. Once we can render
 * this class on the backend, this function can be deprecated.
 */
function addActiveClassToMainMenu() {
  // [url-path-segment]: [nav-item-classname]
  const rootPages = {
    future:                'future',
    international:         'international',
    current:               'current',
    research:              'research',
    ['learning-teaching']: 'learning-teaching'
  }

  const urlPathSegments = window.location.pathname.split( '/' );

  if ( urlPathSegments.length > 1 && urlPathSegments[ 1 ] !== '' && rootPages.hasOwnProperty( urlPathSegments[ 1 ] )) {
    const activeNavItemClass = rootPages[ urlPathSegments[ 1 ]];
    const activeNavItem = document.querySelector( `.menu-bar .${activeNavItemClass}`);

    if ( activeNavItem ) activeNavItem.classList.add( 'active' );
  }
}





/** CONTENT DYNAMIC MANIPULATIONS */


/**
 * Moves `non-staff` contact cards into the previous/next <ul> with
 * regular staff.
 *
 * @deprecated This approach should not be used in new updates! Please, follow
 * clear syntax, so you don't have to move elements around.
 *
 * Notice: This is required to deal with structural and visual inconsistencies * that stem from legacy code that powers rendering of non-staff contact cards. Once
 * this is removed, this slow function can be removed too.
 */

const STAFF_LIST_CONTAINER_CLASSNAME = 'articles-container',
      STAFF_LIST_CLASSNAME           = 'staff-list',
      STAFF_CONTACT_CLASSNAME        = 'contact';

function moveOrphanedStaffCardIntoList() {
  let orphanBeforeStaffList = document.querySelector( `.${STAFF_CONTACT_CLASSNAME} + .${STAFF_LIST_CONTAINER_CLASSNAME}` );
  let orphanAfterStaffList = document.querySelector( `.${STAFF_LIST_CONTAINER_CLASSNAME} + .${STAFF_CONTACT_CLASSNAME}` );

  if ( !orphanBeforeStaffList && !orphanAfterStaffList ) return;

  while ( orphanAfterStaffList ) {
    let orphanedStaffCardElement = $( orphanAfterStaffList );
    let staffListElement = orphanedStaffCardElement.prev().children( `.${STAFF_LIST_CLASSNAME}` );

    if ( staffListElement.length == 0 ) {
      // Staff list is not within its container - abort
      console.warn( `The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *previous* block does not contain '${STAFF_LIST_CLASSNAME}' class. You might experience visual inconsistencies.`, orphanAfterStaffList, staffListElement );
      return;
    }

    let listItem = $( '<li></li>' ).append( orphanedStaffCardElement );
    staffListElement.append( listItem );

    orphanAfterStaffList = document.querySelector( `.${STAFF_LIST_CONTAINER_CLASSNAME} + .${STAFF_CONTACT_CLASSNAME}` );
  }

  // Has to be re-evaluated again to reflect the previous content manipulations
  orphanBeforeStaffList = document.querySelector( `.${STAFF_CONTACT_CLASSNAME} + .${STAFF_LIST_CONTAINER_CLASSNAME}` );

  while ( orphanBeforeStaffList ) {
    let orphanedStaffCardElement = $( orphanBeforeStaffList ).prev( `.${STAFF_CONTACT_CLASSNAME}` ); // Current selector is pointing to the <ul> - point to the previous sibling instead!
    let staffListElement = orphanedStaffCardElement.next().children( `.${STAFF_LIST_CLASSNAME}` );

    if ( staffListElement.length == 0 ) {
      // Staff list is not within its container - abort
      console.warn( `The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *following* block does not contain '${STAFF_LIST_CLASSNAME}' class. You might experience visual inconsistencies.`, orphanedStaffCardElement, staffListElement );
      break;
    }

    let listItem = $( '<li></li>' ).append( orphanedStaffCardElement );
    staffListElement.prepend( listItem );

    orphanBeforeStaffList = document.querySelector( `.${STAFF_CONTACT_CLASSNAME} + .${STAFF_LIST_CONTAINER_CLASSNAME}` );
  }
}


/**
 * Because two sets of taught courses are rendered (one located at the top
 * of the page, one at the bottom), it hides the other, non-used counterpart.
 *
 * @deprecated
 *
 * Note: This is legacy code and can be removed when the backend renders
 * only one set of taught courses.
 */
function hideCoursesOnStaffProfile() {
  if ( !window.courseLocation ) return;

  if( window.courseLocation == 'top' ) {
      $( "#courses-bottom" ).css({ 'display': "none" });
  }

  if( window.courseLocation == 'bottom' ) {
    $("#courses-top").css({ 'display': "none" });
  }
}




/** CONTENT SIDE-BAR */

// Constants

const SIDEBAR_WIDGET_CLASSNAME = 'data-sidebar',
SIDEBAR_ID                     = 'rightHandMenu',
SIDEBAR_WIDGETS_MAX            = 3,

WIDGET_LINKS_CLASSNAME         = 'data-relatedLinks';


/**
 * Finds all widget blocks within the main content and moves them into the
 * right-hand sidebar.
 *
 * Note: This is *only* done due to Squiz 5.4 limitations. Once we can render
 * widgets into the sidebar on our backend, this client-side solution can be
 * deprecated.
 *
 * @returns {void}
 */
function moveWidgetsToSidebar() {
  // No widgets OR sidebar available -> Skip!
  if ( !document.querySelector( `.${SIDEBAR_WIDGET_CLASSNAME}` ) || !document.getElementById( SIDEBAR_ID ) ) return;


  // Members

  // Original, unordered widgets
  const widgetsToMove          = $( `.${SIDEBAR_WIDGET_CLASSNAME}` ),
  sidebarElement               = $( `#${SIDEBAR_ID}` );

  // Correctly ordered and prepared to be rendered
  let widgetsMoved             = [];

  let error;


  widgetsToMove.each( function( index ) {
    const widgetElement = $( this );

    if ( widgetsMoved.length >= SIDEBAR_WIDGETS_MAX ) {
      if ( !error ) {
        error = {
          type:         ERROR_TYPES.SIDEBAR_WIDGETS_COUNT_EXCEEDED,
          message:      `
              <h2>Too many elements in the sidebar</h2>
              <p>Currently added: ${widgetsToMove.length}, Maximum: ${SIDEBAR_WIDGETS_MAX}.</p>
              <p>
                <strong>Please remove the class '${SIDEBAR_WIDGET_CLASSNAME}' from all blocks you do not want to appear in the sidebar.</strong>
              </p>
              <p>
                The blocks with following content will not be shown in the sidebar:
              </p>
            `,
          invalidItems: [],
        };
      }

      error.invalidItems.push( this.id || `${widgetElement.text().trim().substring( 0, 80 )}...` );

      return;
    }

    // A) Staff profile - add to the top!
    if( widgetElement.hasClass( WIDGET_LINKS_CLASSNAME ) ){
      widgetsMoved.unshift( widgetElement );
    }
    // B) Others (downloads, publications etc.) - Add to the last positions
    else {
      widgetsMoved.push( widgetElement );
    }

    // Remove from its original location
    widgetElement.detach();

    // Remove `display:none` if it exists
    widgetElement.css( 'display', '' );
  });

  // Render widgets in the sidebar
  sidebarElement.append.apply( sidebarElement, widgetsMoved );

  // Render errors, if any
  if ( error ) showAdminErrorMessage( error );
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


/** 'GO UP' BUTTON */

const BTN_UP_ID           = 'btn-up',
      BTN_ADMIN_EDIT_ID   = 'btn-admin';

const ADMIN_URL_EXTENSION = '_edit';

const SCROLL_ANIMATION_DURATION_IN_MS = 700;


function initFloatingButtons() {
  const buttonUpElement = document.getElementById( BTN_UP_ID );
  const buttonAdminElement = isAdminEnvironment() ? document.getElementById( BTN_ADMIN_EDIT_ID ) : null;

  if ( buttonUpElement ){
    $( buttonUpElement ).click( ( e ) => {
      e.preventDefault();
      $( 'html,body' ).animate({
          scrollTop: 0
      }, SCROLL_ANIMATION_DURATION_IN_MS );
    });
  }

  if ( buttonAdminElement ){
    $( buttonAdminElement ).css( 'display', '' ); // Remove inline 'display'

    // Uncomment if the button and URL cannot be rendered by Squiz!
    //$( buttonAdminElement ).click( ( e ) => {
    //  e.preventDefault();
    //    window.location.href += `/${ADMIN_URL_EXTENSION}`;
    //})
  }

}



// Run after the DOM has loaded...
$(function(){
  moveWidgetsToSidebar();
  addActiveClassToMainMenu();
  moveOrphanedStaffCardIntoList();
  hideCoursesOnStaffProfile();

	fastclick.attach(document.body);
	var $body          = $( 'body' );
	var $globalNav     = $( '#global-nav' );
  var $globalSearch  = $( '#global-search' );

  /** Init side-menu, if it's present */
  if ( $( '.' + SIDEMENU_CLASS ).length ) {
    initSidemenuExpandability();
  }

  initFloatingButtons();
  decodeMailAddresses();



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
      const eGlobalNav    = $globalNav[0],
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

    const searchInputElement = $( '#search-query' );

    if ( searchInputElement.is( ':visible' ) ) {
      searchInputElement.focus();
    }
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
  const menu = $('.hub-mega-menu .mega-menu-inner');
  const menuExpandButton = $('.hub-mega-menu .btn-expander');
  let mobile = false;
  let desktop = false;

  enquire.register( DESKTOP_AND_LARGER, function() {
    desktop = true;
    mobile = false;
  });
  enquire.register( TABLET_AND_SMALLER, function() {
    desktop = false;
    mobile = true;
  });

  menuExpandButton.each( function() {
    $(this).on('click', (c) => {
        let $this = $(this);
        if ( desktop ) {
          menu.toggleClass('expanded');
        }
        if ( mobile) {
          menu.addClass('expanded');
          $this.parent().toggleClass('js-dropdown-show');
        }
      });
  });
}

if( document.getElementsByClassName('hub-mega-menu').length > 0 ){
  const hubMegaMenuElement = $('.hub-mega-menu');
  const megaMenuExpandButton = $('.hub-mega-menu .btn-expander');
  
  hubMegaMenu();
  
  if ( tracker.shouldTrackElement( hubMegaMenuElement ) ){
    tracker.registerForTracking( hubMegaMenuElement.find( 'li > a' ), 'click', 'megamenu-link' );
    tracker.registerForTracking( megaMenuExpandButton, 'click', 'megamenu-expander' );
  }

}





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
