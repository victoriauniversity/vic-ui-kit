/**
 * Toolkit's standalone JS module for website tracking.
 *
 * @requires $ {jQuery}
 */

import $ from 'jquery';

// Members

const GTM_TRACK_ATTRIBUTE = 'data-gtm-track';
const GTM_ID_ATTRIBUTE    = 'data-gtm-id';
const GTM_DATA_ATTRIBUTE  = 'data-gtm-vars';


const defaultConfig = {
  autoRegister: true,
};


/** Start tracking automatically. */
let shouldAutoRegister = true;




// Public methods

function pushTrackingInfoToGtm( trackingId, trackingSource, customDataExtension ) {
  if ( !window.dataLayer ) {
    console.warn( '`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script. The tracking might not work correctly!' );
    window.dataLayer = []; // Init empty as fall-back to avoid hard errors
    return;
  }

  let event,
    customDataObject = {};

  if ( trackingSource && !( typeof trackingSource.altKey === 'undefined' )) {
    // is Event (see https://developer.mozilla.org/en-US/docs/Web/API/Event)
    event = trackingSource;
  } else {
    // is Object with custom properties OR null/undefined
    customDataObject = trackingSource || {};
  }

  // Event supplied -> Extract data automatically based on the type of event
  if ( event ) {
    // Custom data pre-sets based on event type (https://developer.mozilla.org/en-US/docs/Web/API/Event/type)
    switch ( event.type ) {
      case 'click':
        customDataObject = {
          selector: event.target,
          href:     event.currentTarget.href,
          text:     event.currentTarget.text,
        };
        break;
      default: {
        console.warn( `GTM: There is no tracking preset for the event type '${event.type}'. Please, track a different event or pass an Object with custom data that should be sent to Google Tag Manager.` );
      }
    }

    customDataObject.eventType = event.type;
  }

  // Extend (and override) with the custom data object (if supplied)
  if ( customDataExtension ) {
    for ( var property in customDataExtension ) {
      if ( customDataExtension.hasOwnProperty( property ) ) {
        customDataObject[ property ] = customDataExtension[ property ];
      }
    }
  }

  const dataLayerObject = {
    event: trackingId,
  };

  if ( customDataObject ) dataLayerObject.custom = customDataObject;

  // Push to the GTM
  window.dataLayer.push( dataLayerObject );
}


function addGtmTrackingListeners( elementsList, eventType, trackingId ) {
  if ( !window.dataLayer ) {
    console.warn( '`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script.' );
    window.dataLayer = []; // Fallback
    return;
  }

  elementsList.each( function attachTrackingHandlers() {
    const elementToTrack = $( this ),

      trackingEventType = eventType || elementToTrack.attr( GTM_TRACK_ATTRIBUTE ) || 'auto',
      id = trackingId || elementToTrack.attr( GTM_ID_ATTRIBUTE ) || elementToTrack[0].id,
      customDataJsonString = elementToTrack.attr( GTM_DATA_ATTRIBUTE );

    let customDataObject;

    // Convert the custom variables string into JSON
    if ( customDataJsonString ) {
      try {
        customDataObject = JSON.parse( customDataJsonString );
      } catch ( err ) {
        console.error( `The element with tracking ID ${id} and its element '${customDataJsonString}' contains JSON string in invalid format. These information will not be pushed into Google Tag Manager...`, customDataJsonString, err );
      }
    }

    if ( trackingEventType === 'auto' ) {
      // TODO: Determine binding event automatically based on the type of
      // the element (e.g. <a> => 'click' etc.)
    } else {
      elementToTrack.on( trackingEventType, ( event ) => {
        pushTrackingInfoToGtm( id, event, customDataObject );
      });
    }

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
window.toolkitTracker = ( opts ) => {
  overrideOptions( opts );
  return trackingApi;
};

