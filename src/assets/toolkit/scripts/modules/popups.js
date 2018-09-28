/**
 * Toolkit's standalone JS module for popup-based interactions.
 *
 * @requires Cookie {cookies-js}
 */


// Dynamic 3rd party dependencies
let cookie;

const tracker = window.toolkitTracker ? window.toolkitTracker() : null;

const CLASSNAME = {
  POPUP_AUTOINIT: 'popup',
  BUTTON_OK:      'button-ok',
  BUTTON_CANCEL:  'button-cancel',
  BUTTON_CLOSE:   'btn-close',
};

function findAncestor( el, cls ) {
  while (( el = el.parentElement ) && !el.classList.contains( cls ));
  return el;
}


/** Popup launcher. */
function initPopupBox( popupElement, {
  delayInMs = 7000,
  suppressAfterCanceling = true,
} = {}) {
  const COOKIE_ID       = popupElement.id || 'popup-default';
  const COOKIE_SETTINGS = {
    expires: 2419200, // 28 days
    // secure  : true    //If set to true the secure attribute of the cookie
  };
  const popupContainerElement = findAncestor( popupElement, 'popup-positioner' );

  const buttonOkElements = popupElement.getElementsByClassName( CLASSNAME.BUTTON_OK ),
    buttonCancelElement = popupElement.getElementsByClassName( CLASSNAME.BUTTON_CANCEL )[0],
    buttonCloseElement  = popupElement.getElementsByClassName( CLASSNAME.BUTTON_CLOSE )[0],

    IS_SHOWN_CLASS      = 'shown';

  function removeShownClass() {
    if ( popupContainerElement ) {
      popupContainerElement.classList.remove( IS_SHOWN_CLASS );
    } else {
      popupElement.classList.remove( IS_SHOWN_CLASS );
    }
  }

  function closePopupPermanently() {
    if ( cookie ) cookie.set( COOKIE_ID, true, COOKIE_SETTINGS );
  }

  function closePopup() {
    unbindButtonEvents();
    popupElement.setAttribute( 'data-shown', false );
    removeShownClass();

    if ( suppressAfterCanceling ) closePopupPermanently();
  }

  function close( event ) {
    // If `positionerClass` exists, hide + save 'hidden' to cookies
    event.preventDefault();
    event.stopPropagation();
    closePopup();
  }

  function submit() {
    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
    closePopup();
  }

  function cancel() {
    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
    closePopup();
  }

  // Attach button events
  function bindButtonEvents() {
    for ( let i = 0; i < buttonOkElements.length; i++ ) {
      buttonOkElements[i].addEventListener( 'click', submit );
    }

    if ( buttonCloseElement ) buttonCloseElement.addEventListener( 'click', close );
    if ( buttonCancelElement ) buttonCancelElement.addEventListener( 'click', cancel );
  }

  function unbindButtonEvents() {
    for ( let i = 0; i < buttonOkElements.length; i++ ) {
      buttonOkElements[i].removeEventListener( 'click', submit );
    }

    if ( buttonCloseElement ) buttonCloseElement.removeEventListener( 'click', close );
    if ( buttonCancelElement ) buttonCancelElement.removeEventListener( 'click', cancel );
  }

  function addShownClass() {
    if ( popupContainerElement ) {
      document.getElementsByTagName( 'body' )[0].appendChild( popupContainerElement );
      popupContainerElement.classList.add( IS_SHOWN_CLASS );
    } else {
      popupElement.classList.add( IS_SHOWN_CLASS );
    }
  }

  function isPopupShown() {
    return popupElement.getAttribute( 'data-shown' ) === 'true';
  }

  function showPopup() {
    bindButtonEvents();
    addShownClass();

    if ( tracker && tracker.shouldTrackElement( popupElement )) {
      tracker.trackEvent( popupElement.id, {
        eventType: 'open',
      });
    }
  }

  // Constructor
  const shouldShowPopup = !cookie
    || !suppressAfterCanceling
    || ( cookie.get( COOKIE_ID ) === undefined )
    || ( !cookie.get( COOKIE_ID ));

  if ( shouldShowPopup && !isPopupShown()) {
    popupElement.setAttribute( 'data-shown', true ); // Must be added here to prevent triggering setTimeout when clicking multiple time

    // If there's a positioner available, display after the timeout!
    setTimeout(() => {
      showPopup();
    }, delayInMs );
  }
}


/**
 * Function called on the jQuery Element, opens it as a popup.
 *
 * @param {Object} { delayInMs = 0, suppressAfterCanceling = false }
 *
 * @returns {DOMElement}
 */
function openPopupInstantly( popupElement, {
  delayInMs = 0,
  suppressAfterCanceling = false,
} = {}) {
  initPopupBox( popupElement, {
    delayInMs: delayInMs,
    suppressAfterCanceling: suppressAfterCanceling
  });
}


function autoInitialisePopups() {
  const autoloadPopups = document.getElementsByClassName( CLASSNAME.POPUP_AUTOINIT );

  for ( let i = 0; i < autoloadPopups.length; i += 1 ) {
    const popupElement = autoloadPopups[i];

    if ( popupElement.getAttribute( 'data-autoload' ) !== null ) {
      // Autoload (~ show/hide) popup
      let optionsObject = {};

      if ( popupElement.getAttribute( 'data-opts' ) !== null ) {
        optionsObject = JSON.parse( popupElement.getAttribute( 'data-opts' ));
      }

      initPopupBox( popupElement, optionsObject );
    }
  }
}


// Public API interface
const popupsApi = {
  init:        initPopupBox,
  initAndOpen: openPopupInstantly,
};


// Initialiser
function init() {
  if ( !cookie ) {
    console.error( '`Cookie-js` library is not available. Please, import the library for the correct functionality!' );
  }

  if ( !tracker ) {
    console.warn( '`Toolkit.tracking` library is not available, so the user actions related to popups will not be sent to the Google Tag Manager. Please, make sure the library is included to enable the tracking.' );
  }

  // Run when the DOM is ready!
  if ( document.readyState === 'complete' ) {
    autoInitialisePopups();
  } else {
    document.onreadystatechange = () => {
      if ( document.readyState === 'complete' ) {
        // Find all existing popups and if they contain `data-autoload` attribute,
        autoInitialisePopups();
      }
    };
  }
}


if ( !window.toolkitPopups ) { // Not initialised yet
  // TODO: Move into encapsulated library module
  try {
    cookie = require( 'cookies-js' );
    init();
  } catch ( err ) {
    // Fallback when the cookies-js is not included - Load from the CDN
    let isScriptLoaded = false;

    const s = document.createElement( 'script' );

    s.type = 'text/javascript';
    s.async = true;
    s.src = '//cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js';

    s.onreadystatechange = () => { // After-load handler for IE
      if ( isScriptLoaded ) return;
      if ( this.readyState === 'complete' || this.readyState === 'loaded' ) {
        cookie = window.Cookies;
        init();
        isScriptLoaded = true;
      }
    };
    s.onload = () => { // After-load handler for all the other browsers
      if ( isScriptLoaded ) return;
      cookie = window.Cookies;
      init();
      isScriptLoaded = true;
    };

    document.getElementsByTagName( 'head' )[0].appendChild( s );
  }


  // For a global use
  window.toolkitPopups = popupsApi;
}




// Make API available for modules
export default popupsApi;
