import scriptLoader from 'little-loader';



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
   * Caches DOMElements or JSON Object resources that have been already
   * requested before.
   */
  const resourcesCache = [];





  /** PRIVATE FUNCTIONS */



  function processResourceRequest( resourceSpecification ) {

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
    // TODO:
    onProcessedCallback( errObject );

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
