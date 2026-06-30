import * as UrlModule from '../vendors/url.js';

const originalUrl = UrlModule.default || UrlModule;
const Url = { ...originalUrl }; 

/**
 * An extension of the lightweight `Url.js` library
 * (https://github.com/jillix/url.js/).
 */
function initUrlManager() {
  if ( window.toolkitUrlManager ) { 
    return window.toolkitUrlManager;
  }

  /** PUBLIC METHODS */
  function onLoadWhenQueryExists( queryName, handlerFunction ) {
    if ( Url.queryString( queryName )) {
      if ( window.onDocumentReadyFunctions ) {
        window.onDocumentReadyFunctions.push( handlerFunction );
      } else {
        console.warn( '`onDocumentReadyFunctions` Array is not available on the global scope - Cannot run the handler function for existing query `%s`.', queryName, handlerFunction );
      }
    }
  }

  Url.onLoadWhenQueryExists = onLoadWhenQueryExists;

  window.toolkitUrlManager = Url;

  return Url;
}

const extendedUrlManager = initUrlManager();

export default extendedUrlManager;
