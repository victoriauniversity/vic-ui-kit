// Import 3rd party dependencies
import scriptLoader from 'little-loader';
import q from 'q';
import 'whatwg-fetch';

// Import helpers
import { checkHttpStatus, hasProp } from '../utils/helpers';





/**
 * @typedef {Object} ResourceSpec
 *
 * @property {String} url - Full URL of the resource.
 * @property {String} namespace - (Optional) If the requested resource is
 *    JavaScript attached to the `window` global Object, it allows to
 *    double-check whether it already exists to prevent extra download.
 * @property {function} onSuccess - (Optional) Function hook that
 *    triggers if the resource loads successfully.
 */

/**
 * A factory module providing asynchronous retrieval of the
 * javascript files, CSS or JSON structures (from RESTful APIs).
 *
 * Can be accessed globally through `window.lazyLoader`
 * or imported/required as a JS module.
 *
 * @return {LazyLoadResources}
 */
const lazyLoaderService = ( function GetLazyLoader() {

  if ( window.lazyLoader ) { // Available already - do not initialise again!
    return window.lazyLoader;
  }


  /** @constant */





  /** PRIVATE MEMBERS */

  /**
   * Caches DOMElements or JSON Object of the resources that have been already
   * requested once before.
   */
  const resourcesCache = {};





  /** PRIVATE FUNCTIONS */



  /**
   *
   *
   *
   * @param {string} url
   * @returns {Element} `<link>` DOM element that was added.
   */
  function addCssToDom( url ) {
    const link  = document.createElement( 'link' );

    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';

    document.getElementsByTagName( 'head' )[0].appendChild( link );
    return link;
  }



  /**
   *
   *
   * @param {ResourceSpec} resourceSpecification
   */
  function processResourceRequest( resourceSpecification ) {
    const deferred = q.defer();
    const { url, namespace, onSuccess } = resourceSpecification;

    function resolveRequest( requestResult ) {
      // Add to cache
      if ( !hasProp( resourcesCache, url )) resourcesCache[url] = requestResult;

      deferred.resolve( requestResult );
      if ( onSuccess ) onSuccess( requestResult );

      return deferred.promise;
    }

    // 1. Check locally if `namespace` doesn't already exist in the global scope.
    if ( namespace && hasProp( window, namespace )) return resolveRequest( window[namespace]);

    // 2. Check locally if the resource at `url` hasn't been already cached
    if ( hasProp( resourcesCache, url )) return resolveRequest( resourcesCache[url]);

    // 3. Not available locally - Retrieve based on given type
    if ( url.match( /.*\.js$/ )) {
      // A) Javascript
      scriptLoader( url, ( err ) => {
        if ( !err ) {
          if ( namespace && hasProp( window, namespace )) {
            resolveRequest( window[namespace]);
          } else {
            if ( namespace ) console.warn( 'Javascript might be loaded, but the library is not available on the given global scope/namespace `window.%s`!', namespace );

            resolveRequest( null );
          }
        } else {
          deferred.reject( err );
        }
      });
    } else if ( url.match( /.*\.css$/ )) {
      // B) CSS file
      const linkElement = addCssToDom( url );
      resolveRequest( linkElement );
    } else {
      // C) XHR with JSON response
      window.fetch( url, {
        credentials: 'same-origin',
        mode:        'cors',
        // credentials: 'include', //TODO: Evaluate if this is 100% safe
      })
        .then( checkHttpStatus )
        .then( response => response.json())
        .then(( responseJson ) => {
          resolveRequest( responseJson );
        })
        .catch(( err ) => {
          deferred.reject( err );
        });
    }

    return deferred.promise;
  }




  /** CONSTRUCTOR. */


  /**
   * @typedef {function} LazyLoadResources
   *
   * @param {Array<ResourceSpec>} resourcesSpecList
   * @param {function} onProcessedCallback
   */
  function loadResources( resourcesSpecList, onProcessedCallback ) {

    // 1) Process all resource specifications and generate list of Promises
    const requestPromises = resourcesSpecList.map(
      resourceSpecification => processResourceRequest( resourceSpecification )
    );

    // 2) When all resolve (or fail), execute the callback and pass errors if any
    q.allSettled( requestPromises ).then(( settledObjects ) => {
      let rejectionsList;

      settledObjects.forEach(( settledObject ) => {
        if ( settledObject.state === 'rejected' ) {
          if ( !rejectionsList ) rejectionsList = [];
          rejectionsList.push( settledObject.reason );
        }
      });

      onProcessedCallback( rejectionsList );
    }).catch(( rejectionReason ) => {
      onProcessedCallback( `Error when processing or retrieving the requested resources. ${rejectionReason}` );
    }).done();
  }





  /** SERVICE FACTORY */
  const serviceFactory = loadResources;

  // A) Make available for vanilla JS
  window.lazyLoader = serviceFactory;

  // B) Return the Service function
  return serviceFactory;

}());


// Make the Factory available for Modular JS codebases
export default lazyLoaderService;
