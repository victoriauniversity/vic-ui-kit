// Import other standalone libraries
import UrlManager from './urls';
import LazyLoader from './lazyloader';

const envConfig = require( '../env.conf.json' );



/**
 * A collection of shareable lightweight libraries and functions
 * requiring no external dependencies, reusable across multiple
 * templates and environments. Can be also use as a lightweight
 * alternative to the beefy `toolkit.js`.
 */


export function initToolbarUrlListeners() {
  UrlManager.onLoadWhenQueryExists( 'toolbar', () => {
    if ( window.toolkitToolbarLoader ) window.toolkitToolbarLoader( 'https://www.victoria.ac.nz/api/toolbar/staff' );
  });

  UrlManager.onLoadWhenQueryExists( 'mytools', () => {
    if ( window.toolkitToolbarLoader ) window.toolkitToolbarLoader( 'https://www.victoria.ac.nz/api/toolbar/students' );
  });
}



// eslint-disable-next-line import/prefer-default-export
export function initToolbarLoader( extraDependenciesList ) {
  const WINDOW_NAMESPACE_TOOLBAR_LOADER = 'toolkitToolbarLoader',
    WINDOW_NAMESPACE_TOOLBAR = 'toolkitToolbar',
    URL_SCRIPT_TOOLBAR = `//${envConfig.server.host}${envConfig.name === 'development' ? `:${envConfig.server.port}` : ''}/toolkit.toolbar.js`;

  // Public API endpoint
  window[WINDOW_NAMESPACE_TOOLBAR_LOADER] = ( configObjectOrUrl ) => {
    // 1) Assemble dependencies
    const configEndpointUrl = ( typeof configObjectOrUrl === 'string' ) ? configObjectOrUrl : null;
    let configObject = ( typeof configObjectOrUrl === 'object' ) ? configObjectOrUrl : undefined;

    const toolbarDependenciesList = [
      { url: URL_SCRIPT_TOOLBAR, namespace: WINDOW_NAMESPACE_TOOLBAR },
    ];

    if ( extraDependenciesList && extraDependenciesList.length > 0 ) {
      extraDependenciesList.forEach( extraDependency => toolbarDependenciesList.push( extraDependency ));
    }

    if ( !configObject && configEndpointUrl ) {
      // Config & data model's URL is available - add it to the dependencies
      toolbarDependenciesList.push({
        url:        configEndpointUrl,
        onSuccess: ( responseObject ) => { configObject = responseObject; },
      });
    } else if ( !configObject ) {
      // Nor config & data model object -or- RESTful API is available
      console.error( 'A toolbar requires valid configuration and model object or URL (%s) to the RESTful API endpoint that would return this object. Toolbar dialog will not be opened.', configEndpointUrl, configObject );
      return;
    }

    //TODO: 2) Turn on full screen loading service

    // 3) Load all dependencies asynchronously (skip if already available yet)
    LazyLoader( toolbarDependenciesList, ( errors ) => {
      // TODO: 4) Turn off full screen loading service

      // All dependencies *MUST BE* loaded, otherwise skip the initialisation
      if ( !errors ) {

        // 5A) Init and open
        const toolbarManager = window[WINDOW_NAMESPACE_TOOLBAR];

        if ( toolbarManager ) {
          try {
            const toolbarInstance = toolbarManager.initToolbar( configObject );
            toolbarInstance.show();
          } catch ( err ) {
            console.error( err );
          }
        } else {
          console.error( `Toolbar library is not available on the global scope (window.${WINDOW_NAMESPACE_TOOLBAR}) - the toolbar dialog will not be initialised and opened.` );
        }
      } else {
        // 5B) Report errors
        console.error( 'Unable to lazy load all the dependencies required to initialise and open the Toolbar dialog.', errors );
      }
    });
  };
}

// Expose to the global scope
window.toolkitCore = {
  initToolbarUrlListeners,
  initToolbarLoader,
};
