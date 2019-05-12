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
 * A service module providing asynchronous retrieval of the
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
   * @param {string} url
   *
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
   * Process and retrieve a resource from given resource specification.
   *
   * *Optimisations*:
   * A) If `*.js` file is requested and the `namespace` value is defined in the
   * resource specification, resource won't be lazy loaded (assuming the
   * library is already available).
   * B) All resources requested since the `lazyLoader` initialised are cached.
   * All subsequent requests on the same `url` in resource specification will
   * be loaded from the local cache.
   * C) A `*.css` file will not be loaded if an element `<link>` containing
   * `url` from resource specification is found in the DOM.
   *
   * @param {ResourceSpec} resourceSpecification
   *
   * @return {q.Promise}
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

    // 1. Check locally if the resource at `url` hasn't been already cached
    if ( hasProp( resourcesCache, url )) return resolveRequest( resourcesCache[url]);

    // 2. Not available locally - Retrieve based on given type
    if ( url.match( /.*\.js$/ )) {
      // A) Javascript

      // Check locally if `namespace` doesn't already exist in the global scope.
      if ( namespace && hasProp( window, namespace )) return resolveRequest( window[namespace]);

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
      const existingStylesheet = document.querySelector( `link[href*="${url}"]` );

      if ( existingStylesheet ) {
        resolveRequest( existingStylesheet );
      } else {
        resolveRequest( addCssToDom( url ));
      }
    } else {
      // C) XHR with JSON response
      window.fetch( url, {
        credentials: 'same-origin',
        mode:        'cors',
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
   * Factory method that receives list of all resources (and configuration
   * details) that should be asynchronously loaded.
   *
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





  /** SERVICE */
  const serviceFactory = loadResources;

  // A) Make available for vanilla JS
  window.lazyLoader = serviceFactory;

  // B) Return the Service function
  return serviceFactory;

}());


// Make the Service available for Modular JS codebases
export default lazyLoaderService;
