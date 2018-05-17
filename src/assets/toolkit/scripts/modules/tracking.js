/**
 * Toolkit's standalone JS module for website tracking.
 *
 * @requires $ {jQuery}
 */

import $ from 'jquery';

// Members

const GTM_TRACK_ATTRIBUTE = 'data-gtm-track';
const GTM_ID_ATTRIBUTE    = 'data-gtm-id';


const defaultConfig = {
  autoRegister: true,
};


/** Start tracking automatically. */
let shouldAutoRegister = true;




// Public methods


function addGtmTrackingListeners( elementsList, eventType, trackingId ) {
    if ( !window.dataLayer ) {
      console.warn( "`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script." );
      window.dataLayer = []; // Fallback
      return;
    }

  elementsList.each( function() {
    const elementToTrack = $( this );

    eventType = eventType || elementToTrack.attr( GTM_TRACK_ATTRIBUTE ) || 'auto';
    trackingId = trackingId || elementToTrack.attr( GTM_ID_ATTRIBUTE ) || elementToTrack[ 0 ].id;

    switch( eventType ) {
      case 'click': {
        elementToTrack.on( eventType, function( event ) {
          dataLayer.push({
            'event':            trackingId,
            'custom.selector':  event.target,
            'custom.eventType': event.type,
            'custom.href':      event.currentTarget.href,
            'custom.text':      event.currentTarget.text,
          });
        });
      }; break;
      case 'auto': break;
      default: {
        console.warn( `GTM: Tracking of event '${eventType}' is not supported. Please, change it.` );
      }
    }
  });
}

function pushTrackingInfoToGtm( trackingId, eventType ) {
  if ( !window.dataLayer ) {
    console.warn( "`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script." );
    window.dataLayer = []; // Fallback
    return;
  }

  dataLayer.push({
    'event':            trackingId,
    'custom.eventType': eventType,
  });
}

function shouldTrackByGtm( element ) {
  return Boolean( element.attr( GTM_TRACK_ATTRIBUTE ) !== undefined );
}





// Private functions

function autoregisterGtmTrackingListeners() {
  addGtmTrackingListeners( $( `[${GTM_TRACK_ATTRIBUTE}]` ));
}





// Run after the DOM has loaded...
$(() => {
  if ( shouldAutoRegister ) {
    /** Auto-register all on-demand elements to automatically start tracking. */
    setTimeout( autoregisterGtmTrackingListeners, 0 );
  }
});





// Public API interface
const trackingApi = {
  shouldTrackElement:  shouldTrackByGtm,
  trackEvent:          pushTrackingInfoToGtm,

  /** Any element or set of elements can be dynamically tracked this way */
  registerForTracking: addGtmTrackingListeners,
};


function overrideOptions({ autoRegister } = defaultConfig ) {
  shouldAutoRegister = autoRegister;
}




export const trackerConfig = overrideOptions;

export const tracker = trackingApi;

// Make API available for modules
export default trackingApi;


// For a global imports
window.toolkitTracker = function ( opts ) {
  overrideOptions( opts );
  return trackingApi;
};

