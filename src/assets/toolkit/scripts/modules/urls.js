// Import 3rd party dependencies
const Url = require( '../vendors/url' );



/**
 * An extension of the lightweight `Url.js` library
 * (https://github.com/jillix/url.js/).
 */
const extendedUrlManager = ( function ExtendUrlManager() {

  if ( window.toolkitUrlManager ) { // Available already - do not initialise again!
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




  // A) Extend the API of the Url.js
  Url.onLoadWhenQueryExists = onLoadWhenQueryExists;


  // B) Add the extended class to global scope
  window.toolkitUrlManager = Url;

  // C) Return the extended class.
  return Url;

}());


// Make the Factory available for Modular JS codebases
export default extendedUrlManager;

