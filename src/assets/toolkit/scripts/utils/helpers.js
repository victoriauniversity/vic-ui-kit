/**
 * Utility library with helper functions.
 *
 * It SHOULD NOT be used as a standalone library, but only
 * imported as a dependency.
 *
 * Add ONLY function that are generic enough to be reused
 * by almost any module.
 */


/** Checks whether an element is `display: none;` or not. */
export function isElementHidden( element ) {
  return ( element.offsetParent === null ); // *ONLY* happens when the element is not fixed
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
