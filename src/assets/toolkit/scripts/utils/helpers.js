/**
 * Utility library with helper functions.
 *
 * It **SHOULD NOT** be used as a standalone library, but only
 * imported as a dependency.
 *
 * Add **ONLY** function that are generic enough to be reused
 * by almost any module.
 */


/**
 * Checks HTTP response status and if permitted (200-299), passes the response.
 * Otherwise, an exception is thrown.
 *
 * @param {Response} response
 * @throws {Error}
 */
export function checkHttpStatus( response ) {
  if ( response.status >= 300 || response.status < 200 ) {
    const error = new Error( `Incorrect response HTTP status #${response.status} (${response.statusText}) received.` );
    error.response = response;

    throw error;
  }

  return response;
}


/**
 * Checks whether an element is `display: none;` or not.
 *
 * @param {Element} element - DOM Element.
 *
 * @return {boolean}
 */
export function isElementHidden( element ) {
  return ( element.offsetParent === null ); // *ONLY* happens when the element is not fixed
}



/**
 * Tests whether a property/attribute exists on a given {Object}. This is a
 * safe implementation of `Object.hasOwnProperty()`
 *
 * @param {Object} obj - Object to test the existence of the attribute on.
 * @param {String} propName - Name of the attribute to test.
 */
export function hasProp( obj, propName ) {
  return Object.prototype.hasOwnProperty.call( obj, propName );
}


/**
 * Remove attribute from a DOM Element in a browser-compatible manner.
 *
 * @param {Element} domElement
 * @param {string} attributeName
 */
export function removeAttribute( domElement, attributeName ) {
  domElement.setAttribute( attributeName, false ); // Hack for IE11 / MS Edge
  domElement.removeAttribute( attributeName ); // All other normal browsers
}


/**
 * Detects if the device is likely to be from Apple.
 * Should only be used for fixing or hacking critical issues.
 *
 * @param {String} customUserAgent -
 *  Allows to specify the HTTP Header's `User-Agent` string.
 *
 * @return {boolean}
 */
export function isAppleMobileDevice( customUserAgent ) {
  const userAgent = customUserAgent
    || ( typeof window.navigator !== 'undefined' ? window.navigator.userAgent : '' );

  return ( /iPhone|iPod|iPad/i ).test( userAgent ) && !( /Windows Phone/i ).test( userAgent );
}
