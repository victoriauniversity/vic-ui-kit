/** !Toolkit's core JS */


/* DEPENDENCIES & 3RD PARTY LIBRARIES IMPORTS */
import $ from 'jquery';

import Headroom from 'headroom.js';
import enquire from 'enquire.js';
import select2 from 'select2';

import 'lity';
import 'picturefill';

// Include all standalone modules
import { tracker, trackerConfig } from './modules/tracking';
import popups from './modules/popups';
import tooltips from './modules/tooltips';
import { initTray } from './modules/tray';

// Core libs
import { initToolbarLoader, initToolbarUrlListeners } from './modules/core';

// Import helpers
import { hasProp } from './utils/helpers';

// Initialise dependencies
trackerConfig({ autoRegister: true });





// Export useful dependencies to the global namespace (~ window) so that
//  they can be used outside of this toolkit.
export default {};





require( './study-areas.js' ); // TODO: set up multiple entry points for webpack bundles
require( './modules/tabbed-search.js' );

$( '.select' ).select2();

/* CONSTANT ATTRIBUTES */

const TRANSITION_TIMEOUT       = 200; // update in _settings.variables.scss(135)
const MOBILE_LARGE_AND_SMALLER = 'screen and (max-width: 42.99em)', // update in _settings.responsive.scss(57)
  DESKTOP_AND_LARGER = 'screen and (min-width: 61em)',
  TABLET_AND_SMALLER = 'screen and (max-width: 975px)',

  // Iframe selectors
  YOUTUBE_IFRAME_SELECTOR = 'iframe[src*="youtube"]',
  GMAPS_IFRAME_SELECTOR   = 'iframe[src*="/maps/"]',
  VIMEO_IFRAME_SELECTOR   = 'iframe[src*="vimeo"]';


/* SUPPORTING FUNCTIONS */

/** Wrap YT videos in .embed wrapper that helps with responsiveness. */
function wrapEmbeddedIframes() {
  let iframes = $( `${YOUTUBE_IFRAME_SELECTOR}, ${GMAPS_IFRAME_SELECTOR}, ${VIMEO_IFRAME_SELECTOR}` ),
    singleIframe = null,
    iframeClasses;

  iframes.each( function ( index ) {
    singleIframe = $( this );

    // If it doesn't already have wrapper, wrap it!
    if ( !singleIframe.parent().hasClass( 'embed' )) {
      iframeClasses = singleIframe.attr( 'class' ) || '';

      singleIframe.wrap( `<div class="embed ${iframeClasses}"></div>` );

      if ( iframeClasses ) singleIframe.removeClass();
    }
  });
}


/** Deletes all study areas tiles that are display: none from DOM to
keep the markup clean (and easily handled by the CSS) */
function removedUnusedTiles() {
  $( '.tiles-wrap .tile' ).each( function () {
    if ( $( this ).css( 'display' ) == 'none' ) {
      $( this ).remove();
    }
  });
}


const SIDEMENU_CLASS          = 'sidemenu';
const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';

const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
const SIDEMENU_EXPANDED_CLASS      = 'expanded';





/** PRIVATE FUNCTIONS. */

function initExpandableSubmenu() {
  const expandableButtonElement = $( this );
  const submenuContainer = expandableButtonElement.parent( `.${SIDEMENU_SUBMENU_CLASS}` );

  // Init default state
  let isExpanded = submenuContainer.hasClass( SIDEMENU_SELECTED_ITEM_CLASS );

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
  expandableButtonElement.on( 'click', ( e ) => {
    e.preventDefault();
    e.stopPropagation();
    isExpanded = !isExpanded;
    apply();
  });
}

function initSidemenuExpandability(menuClass) {
  const menuElement = $( `.${menuClass}` );



  enhanceSidemenu( menuElement );

  // Expanding/Collapsing of the entire side menu on mobile devices
  menuElement.children( `.${SIDEMENU_TOGGLE_CLASS}` ).children( 'a' ).on( 'click', function ( e ) {
    e.preventDefault();
    e.stopPropagation();
    $( this ).parent().toggleClass( SIDEMENU_EXPANDED_CLASS );
  });

  const expandableButtons = menuElement.find( `.${SIDEMENU_EXPANDER_CLASS}` );

  // Add tracking if enabled
  if ( tracker.shouldTrackElement( menuElement )) {
    tracker.registerForTracking( menuElement.find( 'li > a' ), 'click', 'sidemenu-link' );
    tracker.registerForTracking( expandableButtons, 'click', 'sidemenu-expander' );
  }

  expandableButtons.each( initExpandableSubmenu );
}

// TODO: Remove after this was implemented on the backend (~ in Squiz)
/** Adds necessary classes and expanding/collapsing elements if the item has got submenu. */
const btnExpanderHtml = '<span class="btn-expander mf-heatmap-click" title="Toggle subpages"></span>';


function enhanceSidemenu( menuElement ) {
  menuElement.find( 'li' ).each( function () {
    const listItem = $( this );

    // a) already has got a proper class in place? Skip!
    if ( listItem.hasClass( SIDEMENU_SUBMENU_CLASS )) return;

    // b) No submenu in <li>? Skip!
    if ( listItem.children( 'ul' ).length === 0 ) return;

    // c) Has got a submenu => Enhance sidemenu's HTML
    listItem.addClass( SIDEMENU_SUBMENU_CLASS );
    $( btnExpanderHtml ).insertAfter( listItem.children( 'a' ));
  });
}





/** HELPERS */

// FIXME: Should be automatically pre-populated from the build/build.config.js
const ENV_HOSTNAME = {
  STAGE: 'cms.wgtn.ac.nz',
  PROD:  'www.wgtn.ac.nz',
  LOCAL: 'local.wgtn.ac.nz',
};

// FIXME: Should be automatically pre-populated from the build/build.config.js
const URL_BASE = {
  TOOLKIT: 'local.wgtn.ac.nz:8080',
};


function isAdminEnvironment() {
  return ( window.location.hostname === ENV_HOSTNAME.STAGE )
      || ( window.location.hostname === ENV_HOSTNAME.LOCAL );
}


/**
 * Decodes email address into re-usable form.
 *
 * @deprecated Very old approach that won't work today - do not use.
 */
function decodeMailAddresses() {
  const a = 'dre:ams0of@g1niht.lp2c9u3v8k4w7y5j6zbx-_qfntigue6los5zar7b:y4dp8v3m9h2.x1w@k0jcq-_';

  let i,
    h,
    j,
    k,
    l,
    m,
    n,
    s;
  for ( i = 0; i < document.links.length; i += 1 ) {
    h = document.links[i].hash;
    if ( h.substring( 0, 3 ) == '#sd' ) {
      k = '';
      l = h.substring( 3, 5 );
      m = h.lastIndexOf( '?subject=' );
      if ( m == -1 ) { s = document.links[i].href; } else {
        s = h.substring( m );
        h = h.substring( 0, m );
      }
      for ( j = 5; j < h.length; j += 2 ) {

        k += a.charAt(( h.substring( j, j + 2 ) - l - 1 ));
      }
      m = s.lastIndexOf( '?subject=' );
      if ( m == -1 ) {
        document.links[i].href = k;
      } else { document.links[i].href = k + s.substring( m ); }
      n = document.links[i].innerHTML;
      if ( n == 'address' ) {
        document.links[i].innerHTML = k.substring( 7 );
      } else { document.links[i].title = k.substring( 7 ); }
    }
  }
}



/** MESSAGE/NOTIFICATIONS HANDLING */

const ERROR_TYPES = {
  SIDEBAR_WIDGETS_COUNT_EXCEEDED: 'sidebar-widgets-count-exceeded',
};


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
  if ( !errorObject || !isAdminEnvironment()) return;

  let invalidItemsListHtml;

  if ( errorObject.invalidItems.length > 0 ) {
    invalidItemsListHtml = `
      <ul>
        <li>${errorObject.invalidItems.join( '</li><li>' )}</li>
      </ul>
    `;
  }

  // Template
  const errorNotificationHtml = `
    <section class="flash-message error">
      ${errorObject.message}
      ${invalidItemsListHtml}
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
      study:                'future',
      international:         'international',
      students:               'current',
      research:              'research',
      engage:                'engage',
    },

    urlPathSegments = window.location.pathname.split( '/' );

  if ( urlPathSegments.length > 1 && urlPathSegments[1] !== '' && hasProp( rootPages, urlPathSegments[1])) {
    const activeNavItemClass = rootPages[urlPathSegments[1]];
    const activeNavItem = document.querySelector( `.menu-bar .${activeNavItemClass}` );

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
 * Notice: This is required to deal with structural and visual
 * inconsistencies that stem from legacy code that powers rendering
 * of non-staff contact cards. Once this is removed, this slow
 * function can be removed too.
 */

const STAFF_LIST_CONTAINER_CLASSNAME = 'articles-container',
  STAFF_LIST_CLASSNAME           = 'staff-list',
  STAFF_CONTACT_CLASSNAME        = 'contact';

function moveOrphanedStaffCardIntoList() {
  let orphanBeforeStaffList = document.querySelector( `.${STAFF_CONTACT_CLASSNAME} + .${STAFF_LIST_CONTAINER_CLASSNAME}` );
  let orphanAfterStaffList = document.querySelector( `.${STAFF_LIST_CONTAINER_CLASSNAME} + .${STAFF_CONTACT_CLASSNAME}` );

  if ( !orphanBeforeStaffList && !orphanAfterStaffList ) return;

  while ( orphanAfterStaffList ) {
    const orphanedStaffCardElement = $( orphanAfterStaffList );
    const staffListElement = orphanedStaffCardElement.prev().children( `.${STAFF_LIST_CLASSNAME}` );

    if ( staffListElement.length === 0 ) {
      // Staff list is not within its container - abort
      console.warn( `The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *previous* block does not contain '${STAFF_LIST_CLASSNAME}' class. You might experience visual inconsistencies.`, orphanAfterStaffList, staffListElement );
      return;
    }

    const listItem = $( '<li></li>' ).append( orphanedStaffCardElement );
    staffListElement.append( listItem );

    orphanAfterStaffList = document.querySelector( `.${STAFF_LIST_CONTAINER_CLASSNAME} + .${STAFF_CONTACT_CLASSNAME}` );
  }

  // Has to be re-evaluated again to reflect the previous content manipulations
  orphanBeforeStaffList = document.querySelector( `.${STAFF_CONTACT_CLASSNAME} + .${STAFF_LIST_CONTAINER_CLASSNAME}` );

  while ( orphanBeforeStaffList ) {
    const orphanedStaffCardElement = $( orphanBeforeStaffList ).prev( `.${STAFF_CONTACT_CLASSNAME}` ); // Current selector is pointing to the <ul> - point to the previous sibling instead!
    const staffListElement = orphanedStaffCardElement.next().children( `.${STAFF_LIST_CLASSNAME}` );

    if ( staffListElement.length === 0 ) {
      // Staff list is not within its container - abort
      console.warn( `The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *following* block does not contain '${STAFF_LIST_CLASSNAME}' class. You might experience visual inconsistencies.`, orphanedStaffCardElement, staffListElement );
      break;
    }

    const listItem = $( '<li></li>' ).append( orphanedStaffCardElement );
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

  if ( window.courseLocation === 'top' ) {
    $( '#courses-bottom' ).css({ display: 'none' });
  }

  if ( window.courseLocation === 'bottom' ) {
    $( '#courses-top' ).css({ display: 'none' });
  }
}




/** CONTENT SIDE-BAR */

// Constants

const SIDEBAR_WIDGET_CLASSNAME = 'data-sidebar',
  SIDEBAR_ID                   = 'rightHandMenu',
  SIDEBAR_WIDGETS_MAX          = 3,

  WIDGET_LINKS_CLASSNAME       = 'data-relatedLinks';


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
  if ( !document.querySelector( `.${SIDEBAR_WIDGET_CLASSNAME}` ) || !document.getElementById( SIDEBAR_ID )) return;


  // Members

  // Original, unordered widgets
  const widgetsToMove          = $( `.${SIDEBAR_WIDGET_CLASSNAME}` ),
    sidebarElement             = $( `#${SIDEBAR_ID}` );

  // Correctly ordered and prepared to be rendered
  const widgetsMoved             = [];

  let error;


  widgetsToMove.each( function moveWidgetToSidebar() {
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

    if ( widgetElement.hasClass( WIDGET_LINKS_CLASSNAME )) {
      // A) Staff profile - add to the top!
      widgetsMoved.unshift( widgetElement );
    } else {
      // B) Others (downloads, publications etc.) - Add to the last positions
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





/** 'GO UP' BUTTON */

const BTN_UP_ID       = 'btn-up',
  BTN_ADMIN_EDIT_ID   = 'btn-admin',

  // ADMIN_URL_EXTENSION = '_edit', // Uncomment if the button and URL cannot be rendered by Squiz!

  SCROLL_ANIMATION_DURATION_IN_MS = 700;


function initFloatingButtons() {
  const buttonUpElement = document.getElementById( BTN_UP_ID ),
    buttonAdminElement = isAdminEnvironment() ? document.getElementById( BTN_ADMIN_EDIT_ID ) : null;

  if ( buttonUpElement ) {
    $( buttonUpElement ).click(( e ) => {
      e.preventDefault();
      $( 'html,body' ).animate({
        scrollTop: 0,
      }, SCROLL_ANIMATION_DURATION_IN_MS );
    });
  }

  if ( buttonAdminElement ) {
    $( buttonAdminElement ).css( 'display', '' ); // Remove inline 'display'

    // Uncomment if the button and URL cannot be rendered by Squiz!
    // $( buttonAdminElement ).click( ( e ) => {
    //  e.preventDefault();
    //    window.location.href += `/${ADMIN_URL_EXTENSION}`;
    // })
  }

}

function victoriousHeader() {
  if ($('.victorious-header').length ) {
    // console.log('vistorious test');

    const header = document.querySelector('.victorious-header');

    console.log( header.offsetHeight );

    const options = {
      // vertical offset in px before element is first unpinned
      offset:    10,
      // scroll tolerance in px before state changes
      tolerance: 10,
      // css classes to apply
      classes: {
        // when element is initialised
        initial: '',
        // when scrolling up
        pinned: 'headroom--pinned',
        // when scrolling down
        unpinned: 'headroom--unpinned',
        // when above offset
        top: 'headroom--top',
        // when below offset
        notTop: 'header-shrink',
        // whe  n at bottom of scoll area
        bottom: 'headroom--bottom',
        // when not at bottom of scroll area
        notBottom: 'headroom--not-bottom'
      },
    };

    const headroom  = new Headroom( header, options );

    if ($('.victorious-expand').length ) {
      headroom.init();
    }

    // toggle issues in nav
    $( '.past-issues a' ).on( 'click', function () {
      $( '.issues' ).slideToggle();
      $( this ).find('span').toggleClass('icon-caret-right').toggleClass('icon-caret-down');
    });

  } else {
    return;
  }
}





/** INITIALISE ON SCRIPT LOAD. */



( function init() {
  initToolbarLoader();
  initToolbarUrlListeners();
}());





/** INITIALISE ON DOM LOAD. */
$(() => {
  moveWidgetsToSidebar();
  addActiveClassToMainMenu();
  moveOrphanedStaffCardIntoList();

  tooltips.initTooltips();

  // FIXME: Extract out to a standalone plugin and run on staff profiles *only*
  hideCoursesOnStaffProfile();

  const $body     = $( 'body' ),
  $globalNav    = $( '#global-nav' ),
  $globalSearch = $( '#global-search' );

  /** Init side-menu, if it's present */
  if ( $( `.${SIDEMENU_CLASS}` ).length ) {
    initSidemenuExpandability( SIDEMENU_CLASS );
  }

  if ( $( `.sidemenu-homepage` ).length ) {
    enquire.register( TABLET_AND_SMALLER, () => {
      console.log(`sidemenu-homepage`);

      initSidemenuExpandability( 'sidemenu-homepage' );
      console.log('tray is small size for mob');
    });
    const $sidemenuHomepage = $('.sidemenu-homepage');
    enhanceSidemenu($sidemenuHomepage);
  };

  initTray();
  victoriousHeader();

  if( window.skrollr && $(window).width() > 800 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {


    window.onload = function() {
      let s = skrollr.init({
        smoothScrolling: true,
        render: function() {
          // console.log('skrollr init');
        }
      });
    };
    // if (s.isMobile()) {
    //   s.destroy();
    // }
    // $(window).on('resize', () => {
    //   if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // no reason to destroy on mobile
    //     if ($(window).width() <= 800) {
    //       skrollr.init().destroy(); // skrollr.init() returns the singleton created above
    //     }
    //   }

    // });
  }



  initFloatingButtons();
  decodeMailAddresses();

  // http://wicky.nilia.ms/enquire.js/
  // TODO: Refactor and extract to its own library
  enquire.register( MOBILE_LARGE_AND_SMALLER, () => {

    if ( $globalNav.length ) {
      const eGlobalNav    = $globalNav[0],
        bannerHeaderElement = $( '.site-header' ),
        sidemenu            = $( '.sidemenu' );

      const headroom  = new Headroom( eGlobalNav, {

			  offset:    $globalNav.outerHeight(),
        // or scroll tolerance per direction
        tolerance: {
          down: 5,
          up:   20,
        },
        classes: {
          initial:  'sticky',
          pinned:   'slide-down',
          unpinned: 'slide-up',
          notTop:   'no-top',
        },
      });

      headroom.init();

      const disableHeadroom = () => {
        if ( headroom ) {
          headroom.scroller.removeEventListener( 'scroll', headroom.debouncer, false );
        }
      };

      const enableHeadroom = () => {
        if ( headroom ) {
          headroom.scroller.addEventListener( 'scroll', headroom.debouncer, false );
        }
      };

      const removeMenuOutClickListener = () => {
        document.removeEventListener( 'click', menuOutsideClickListener );
      };

      const registerMenuOutClickListener = () => {
        document.addEventListener( 'click', menuOutsideClickListener );
      };

      const toggleMobileMenu = () => {
        $globalNav.find( '.tcon' ).toggleClass( 'tcon-transform' );
        $globalNav.toggleClass( 'is-open' );

        if ( !headroom ) return;

        if ( $globalNav.hasClass( 'is-open' )) {
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
        if ( !$( event.target ).closest( '#global-nav' ).length ) {
          toggleMobileMenu();
        }
      }

      $body.on( 'click ', '.js-toggle-global-nav', ( _event ) => {
        toggleMobileMenu();
      });
    }

  });


  // Opens/closes global search bar & gains auto-focus
  $body.on( 'click ', '.js-toggle-global-search', function ( _event ) {
    const $this = $( this );

    if ( $this.data( 'js-has-active-transition' )) {
      return false;
    }

    $this.data( 'js-has-active-transition', true );
    $this.find( '.tcon' ).toggleClass( 'tcon-transform' );

    if ( $globalSearch.hasClass( 'is-open' )) {
      $globalSearch.toggleClass( 'is-open', false );
      setTimeout(() => {
        $this.data( 'js-has-active-transition', false );
      }, TRANSITION_TIMEOUT );
    } else {
      $globalSearch.toggleClass( 'is-open', true );
      setTimeout(() => {
        $globalSearch.find( 'input:text' ).focus();
        $this.data( 'js-has-active-transition', false );
      }, TRANSITION_TIMEOUT );
    }

    _event.preventDefault();
  });


  // Study areas tabs toggle

  $( '#study-area-tabs li a' ).click( function () {
    if ( $( this ).parent().hasClass( 'active' )) {
      return;
    }
    $( '.active' ).removeClass( 'active' );
    $( this ).parent().addClass( 'active' );
    $( '.study-areas' ).toggleClass( 'hidden' );
    $( '.degrees-quals' ).toggleClass( 'hidden' );

  });


  /* Show the tab content that is selected */

  if ( document.getElementById( 'undergraduate' ) && document.getElementById( 'undergraduate' ).checked ) {
    switchTabToUndergrad();
  } else if ( document.getElementById( 'postgraduate' ) && document.getElementById( 'postgraduate' ).checked ) {
    switchTabToPostgrad();
  }

  $( '.switch .switch-input' ).on( 'change', function () {
    if ( $( this ).attr( 'value' ) == 'undergraduate' ) {
      switchTabToUndergrad();
    }

    if ( $( this ).attr( 'value' ) == 'postgraduate' ) {
      switchTabToPostgrad();
    }
  });

  function switchTabToUndergrad() {
    $( '#study-area-tabs > ul > li:nth-child(1) h4' ).html( '<span class="icon-book-open"></span>Subject areas' );
    $( '.study-areas-undergrad' ).show( 500 );
    $( '.study-areas-postgrad' ).hide( 500 );
  }

  function switchTabToPostgrad() {
    $( '#study-area-tabs > ul > li:nth-child(1) h4' ).html( '<span class="icon-book-open"></span> Postgraduate subjects' );
    $( '.study-areas-postgrad' ).show( 500 );
    $( '.study-areas-undergrad' ).hide( 500 );
  }

  /* dynamic height for tiles. setting height of all tiles from largest tile height */
  $( '.dynamic-height-tiles ' ).each( function ( n ) {
    // get array of heights for each group of class
    const tileHeights = $( this ).find( 'li.tile' ).map( function () {
      return $( this ).height();
    }).get();

    // check heights for largest
    const maxHeight = Math.max.apply( null, tileHeights );

    // apply maxheight to tiles
    $( this ).find( 'li.tile' ).height( maxHeight + 16 );
  });

  /* Navigation toggle on mobile */
  $( '.main-menu-toggle' ).on( 'click', () => {
    $( '.main-nav' ).slideToggle();
    $( '.sub-nav' ).slideToggle();
    $( '.search-bar' ).slideToggle();
    $( '.menu-toggle-icon' ).toggleClass( 'open' );
	 });

  /* Show search bar on desktop */
  $( '.search-item' ).on( 'click', () => {
    $( '.search-bar' ).slideToggle();

    const searchInputElement = $( '#search-query' );

    if ( searchInputElement.is( ':visible' )) {
      searchInputElement.focus();
    }
  });

  if ( $( '#study-area-tabs' )) {
    function getUrlParameter( name ) {
      name = name.replace( /[\[]/, '\\[' ).replace( /[\]]/, '\\]' );
      const regex = new RegExp( `[\\?&]${name}=([^&#]*)` );
      const results = regex.exec( location.search );
      return results === null ? '' : decodeURIComponent( results[1].replace( /\+/g, ' ' ));
    }

    const grad = 'URLSearchParams' in window
      ? new URLSearchParams( window.location.search ).get( 'grad' )
      : getUrlParameter( 'grad' );

    if ( grad === 'postgraduate' || grad === 'undergraduate' ) {
      $( `#${grad}` ).click();
    }

    const tabs = $( '#study-area-tabs .switch-input' );

    function handleSwitchInputClick( event ) {
      window.history.replaceState({}, '', `${window.location.pathname}?grad=${event.target.id}` );
    }

    tabs.each( function () {
      this.addEventListener( 'click', handleSwitchInputClick );
    });
  }

  /** DOM manipulation */

  wrapEmbeddedIframes();
  removedUnusedTiles(); // TODO: Review - Can be removed after all the study areas are migrated


  // tile accordion

  $( '.tile-accordion .tile' ).not( '.tile-accordion.content-page' ).on( 'click', function ( evt ) {
    // evt.preventDefault();

    if ( $( this ).hasClass( 'accordion-closed' )) {
      $( this ).children( '.accordion-content ' ).slideDown();
      $( this ).removeClass( 'accordion-closed' ).addClass( 'accordion-open' );
    } else if ( $( this ).hasClass( 'accordion-open' )) {
      $( this ).children( '.accordion-content ' ).slideUp();
      $( this ).removeClass( 'accordion-open' ).addClass( 'accordion-closed' );
    }

    $( this ).find( '.links a' ).on( 'click', ( event ) => {
      event.stopPropagation();
		 });
  });


  /** Runs any custom scripts that could be added in the content. */
  if ( onDocumentReadyFunctions && onDocumentReadyFunctions.length ) {
    onDocumentReadyFunctions.forEach(( singleFunction ) => {
      singleFunction();
    });
  }

});

/* Research hub content page tile accordian */
$( '.tile-accordion.content-page .tile .toggle' ).on( 'click', function ( evt ) {

  const $this = $( this );

  $this.toggleClass( 'expanded' );
  $this.siblings( 'p' ).toggle();

});

/* Add accessible title label for restricted links class  */
function restrictedLinkTitle() {
  const lockLinks = document.querySelectorAll( '.link-restricted' );

  for ( let i = 0; i < lockLinks.length; i++ ) {
    lockLinks[i].setAttribute( 'title', 'Restricted intranet link' );
  }


}
restrictedLinkTitle();

/* Research hub mega menu */
function hubMegaMenu() {
  const menu = $( '.hub-mega-menu .mega-menu-inner' );
  const menuExpandButton = $( '.hub-mega-menu .btn-expander' );
  let mobile = false;
  let desktop = false;

  enquire.register( DESKTOP_AND_LARGER, () => {
    desktop = true;
    mobile = false;
  });
  enquire.register( TABLET_AND_SMALLER, () => {
    desktop = false;
    mobile = true;
  });

  menuExpandButton.each( function () {
    $( this ).on( 'click', ( c ) => {
      const $this = $( this );
      if ( desktop ) {
        menu.toggleClass( 'expanded' );
      }
      if ( mobile ) {
        menu.addClass( 'expanded' );
        $this.parent().toggleClass( 'js-dropdown-show' );
      }
    });
  });
}

function hubMegaMenu2() {
  const menu = $( '.hub-mega-menu .mega-menu-inner' );
  const menuExpandButton = $( '.hub-mega-menu .btn-expander' ).parent();
  let mobile = false;
  let desktop = false;

  enquire.register( DESKTOP_AND_LARGER, () => {
    desktop = true;
    mobile = false;
  });
  enquire.register( TABLET_AND_SMALLER, () => {
    desktop = false;
    mobile = true;
  });

  menuExpandButton.each( function () {

    const $this = $( this );

    // Create and append Title to list of expanded links
    const title = $this.children( 'a' ).text();
    const titleLink = $this.children( 'a' ).attr( 'href' );
    const newLink = `<li class="js-inject-title"><a href="${titleLink}"> ${title} </a></li>`;

    $this.children( 'ul' ).prepend( newLink );

    // subnav expand function
    $( this ).on( 'click', ( c ) => {
      c.preventDefault();

      if ( desktop ) {
        menu.toggleClass( 'expanded' );
      }
      if ( mobile ) {
        menu.addClass( 'expanded' );
        $this.toggleClass( 'js-dropdown-show' );
      }
    });
  });
}

if ( document.getElementsByClassName( 'hub-mega-menu' ).length > 0 && !document.getElementsByClassName( 'mega-menu-bar' ).length > 0 ) {
  const hubMegaMenuElement = $( '.hub-mega-menu' );
  const megaMenuExpandButton = $( '.hub-mega-menu .btn-expander' );

  hubMegaMenu();

  if ( tracker.shouldTrackElement( hubMegaMenuElement )) {
    tracker.registerForTracking( hubMegaMenuElement.find( 'li > a' ), 'click', 'megamenu-link' );
    tracker.registerForTracking( megaMenuExpandButton, 'click', 'megamenu-expander' );
  }

}

/* New hub mega menu */
if ( document.getElementsByClassName( 'hub-mega-menu' ).length > 0 && document.getElementsByClassName( 'mega-menu-bar' ).length > 0 ) {

  hubMegaMenu2();
  console.log( 'new menu bar strip thing cool ' );

}


function openPopup() {
  popups.initAndOpen( this[0]);
  return this;
}




/**
 * jQuery's plugin as a utility factory
 * Usage as: $( jquerySelector ).vicApp().method( options )
 */
( function ( $ ) {
  $.fn.vicApp = function () {
    return {
      openPopup: openPopup.bind( this ),
    };
  };
}( jQuery ));


if ( document.getElementsByClassName( 'calendar-cards' ).length > 0 ) {

  $( '#search-filter' ).on( 'keyup search', function () {
    const value = $( this ).val().toLowerCase();


    // if input 3 or more filter
    if ( $( this ).val().length >= 2 ) {
      $( '.calendar-cards .card' ).filter( function () {
        $( this ).toggle( $( this ).text().toLowerCase().indexOf( value ) > -1 );


      });
    } else {
      // show all if search input less then 2
      $( '.calendar-cards .card' ).show();
    }

  });

  // Filter on type tags
  $( '.tags .tag' ).on( 'click', function () {


    if ( $( this ).hasClass( 'selected' )) {
      $( this ).removeClass( 'selected' );
      $( '.calendar-cards .card' ).show();

    } else {
      $( '.tags .tag' ).removeClass( 'selected' );
      $( '.calendar-cards .card' ).show();

      if ( $( this ).text() === 'Amendment' ) {
        $( this ).addClass( 'selected' );
        $( '.calendar-cards .card' ).filter( ':not([data-type="Amendment"])' ).hide();
      }
      if ( $( this ).text() === 'New' ) {
        $( this ).addClass( 'selected' );
        $( '.calendar-cards .card' ).filter( ':not([data-type="New"])' ).hide();
      }
      if ( $( this ).text() === 'Errata' ) {
        $( this ).addClass( 'selected' );
        $( '.calendar-cards .card' ).filter( ':not([data-type="Errata"])' ).hide();
      }
    }


  });

}
