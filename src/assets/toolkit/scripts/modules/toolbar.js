import MicroModal from 'micromodal';

import { hasProp } from '../utils/helpers';



/** Library-specific polyfills */



// API interface
const toolbarApi = window.toolkitToolbar || {};


/**
 * A module providing dialogs with tools.
 *
 * @requires jQuery - Requires jQuery 1.8+ as external dependency
 */
( function ToolbarManager() {

  if ( window.toolkitToolbar ) { // Available already - do not initialise again!
    return;
  }

  window.toolkitToolbar = toolbarApi; // Import for a global access


  /** @constant */

  // Default copy
  const TEXTS = {
      TITLE:                    'Toolbar',
      BUTTON_CLOSE_TITLE:       'Close the toolbar',
      SEARCH_OK_LABEL:          'Ok',
      SEARCH_INPUT_PLACEHOLDER: 'Search for a tool...',
      SEARCH_INPUT_ARIA_LABEL:  'Type to filter out tools:',
    },

    MODAL_CONFIG = {
      onShow:        addModalsUrlQuery,
      onClose:       removeModalsUrlQuery,
      disableFocus:  true,
      disableScroll: true,
      //debugMode:   true,
    },

    LOCAL_STORAGE_POSTFIX = 'favourites';




  /** PRIVATE MODULE MEMBERS */


  /** List of active toolbar instances */
  const toolbarsList = [];

  let containerElement;





  /** PRIVATE MODULE FUNCTIONS */


  function getInitialisedToolbar( id ) {
    for ( let i = 0; i < toolbarsList.length; i += 1 ) {
      if ( toolbarsList[i].getId() === id ) return toolbarsList[i];
    }

    return null;
  }


  function getFavouritesListFromStorage( storageKey ) {
    const localStorageJsonString = localStorage.getItem( storageKey );

    if ( localStorageJsonString ) {
      const favouriteToolsIds = JSON.parse( localStorageJsonString ) || [];

      // Presets exist - don't use defaults
      return favouriteToolsIds;
    }

    return [];
  }




  function buildNotificationTemplate( notificationObject ) {
    return `
    <div class="formatting block">
      <section class="flash-message ${notificationObject.type}">
        <h2>${notificationObject.title}</h2>
        ${( hasProp( notificationObject.content )) ? `<p>${notificationObject.content}</p>` : ''}
      </section>
    </div>`;
  }

  /**
   * @param {string} id - Toolbar instance identifier.
   *
   * @return {string} - HTML template.
   */
  function buildSearchTemplate( id ) {
    return `
    <form class="filter" action="javascript:;" role="search">
      <label for="${id}-filter-query"><span class="icon-search"></span></label>
      <input id="${id}-filter-query" aria-label="${TEXTS.SEARCH_INPUT_ARIA_LABEL}" autocomplete="off" incremental="incremental" autocorrect="off" type="search" name="filter-query" placeholder="${TEXTS.SEARCH_INPUT_PLACEHOLDER}" tabindex="0">
      <input id="filter-submit" class="btn" type="submit" value="${TEXTS.SEARCH_OK_LABEL}">
    </form>`;
  }



  /**
   * @param {string} id - Toolbar instance identifier.
   * @param {Object} config
   * @param {Object} content - Object with custom content elements.
   *
   * @return {string} - HTML template.
   */
  function buildDialogTemplate({ id, config, content }) {
    return `
      <div id="${id}" class="toolbar dialog-container" aria-hidden="true">
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
          <header>
            <h1 id="${id}-title">${( hasProp( content, 'title' )) ? content.title : TEXTS.TITLE}</h1>
            <a href="javascript:;" title="${TEXTS.BUTTON_CLOSE_TITLE}" class="btn-close" aria-label="Close modal" data-micromodal-close tabindex="-1" ></a>

            ${( config.showSearch ) ? buildSearchTemplate( id ) : ''}
            ${( hasProp( content, 'headerHtml' )) ? content.headerHtml : ''}
          </header>

          <div class="dialog-content">
            <div class="centraliser"></div>
          </div>

          <footer>
            <div class="centraliser block">
              <div class="links">
                ${( hasProp( content, 'footerHtml' )) ? content.footerHtml : ''}
              </div>
            </div>
          </footer>

        </section>
      </div>`;
  }



  /** INLINE CLASSES. */


  /**
   * Defines behaviour and UI of a Toolbar popup dialog.
   *
   * @typedef {Class} Toolbar
   */
  class Toolbar {

    /**
     * @param {string} id - Unique identifier of this Toolbar instance
     * @param {Object} config - Options to turn features on/off.
     * @param {Object} content - Custom content blocks that can be injected.
     * @param {Object} data - Main data model with tools.
     *
     * @memberof Toolbar
     */
    constructor({
      id,
      config,
      content,
      data,
    }) {
      this.id = id;
      this.config = config;
      this.content = content;
      this.data = data;

      this.init();
      this.bindEvents();
    }





    /** PUBLIC METHODS */



    /** Removes the toolbar and cleans up. */
    destroy() {
      // Remove this instance from the list of toolbar instances
      const toolbarInstanceIndex = toolbarsList.indexOf( this );
      if ( toolbarInstanceIndex > -1 ) {
        toolbarsList.splice( toolbarInstanceIndex, 1 );
        // TODO: + Unbind all events
      }

      // Remove element from DOM
      this.toolbarElement.remove();
    }

    getId() {
      return this.id;
    }


    show() {
      MicroModal.show( this.id, MODAL_CONFIG );
      this.showNotificationIfExists();

    }

    close() {}





    /** PRIVATE FUNCTIONS */


    /** Builds tooltip, attaches events and adds generic DOM. */
    init() {
      toolbarsList.push( this );

      this.toolbarElement = $( buildDialogTemplate( this.id, this.config, this.content ));

      // Add the element into the Toolbar container
      containerElement.append( this.toolbarElement );

      const favouritesIdsList = getFavouritesListFromStorage( `${this.id}.${LOCAL_STORAGE_POSTFIX}` );
      this.setFavouritesFromIds( favouritesIdsList );
    }

    bindEvents() {}

    showNotificationIfExists() {
      if ( hasProp( this.content, 'notification' )) {
        $( '.dialog-content .centraliser' ).prepend( buildNotificationTemplate( this.content.notification ));
      }
    }


    moveDefaultsToFavourites( toolIndexInDefaults ) {
      this.data.favourites.push( this.data.defaults.splice( toolIndexInDefaults, 1 )[0]);
    }

    moveFavouritesToDefaults( toolIndexInFavourites ) {
      this.data.defaults.push( this.data.favourites.splice( toolIndexInFavourites, 1 )[0]);
    }

    setFavouritesFromIds( favouritesIdsList ) {
      const { favourites, defaults } = this.data;

      // A) Update favourites
      for ( let i = 0; i < favourites; i += 1 ) {
        const currentFavourite = favourites[i];

        if ( favouritesIdsList.indexOf( `${this.id}.${currentFavourite.id}` ) === -1 ) {
          // Move to non-favourites
          this.moveFavouritesToDefaults( i );
          i += -1;
        }
      }

      // B) Update non-favourites
      for ( let i = 0; i < defaults.length; i += 1 ) {
        const currentDefault = defaults[i];

        if ( favouritesIdsList.indexOf( `${this.id}.${currentDefault.id}` ) > -1 ) {
          this.moveDefaultsToFavourites( i );
          i -= 1;
        }
      }
    }



  }



  /** PUBLIC MODULE METHODS. */


  /**
   * Creates, initialises and returns {Toolbar} instance based on given data and
   * configuration model `modelObject`.
   *
   * @param {Object} modelObject -
   *    Model including data, content and configuration options for the Toolbar.
   *
   * @return {Toolbar}
   */
  function initToolbar( modelObject ) {
    if ( !modelObject ) {
      console.error( 'To initialise a new Toolbar dialog, you need to provide valid model Object.', modelObject );
      return undefined;
    }

    // If a toolbar with this particular ID is already initialised -> return it
    // instead of making new one.
    if ( hasProp( modelObject, 'id' ) && getInitialisedToolbar( modelObject.id )) {
      return getInitialisedToolbar( modelObject.id );
    }

    return new Toolbar( modelObject );
  }



  /**
   * Retrieves all existing initialised Toolbar dialogs.
   *
   * @return {Array<Toolbar>}
   */
  function getAllToolbars() {
    return toolbarsList;
  }



  /**
   * Removes all the Toolbar dialogs safely to prevent memory leaks.
   *
   * @returns {boolean}
   */
  function destroyAllToolbars() {
    while ( toolbarsList.length ) {
      toolbarsList[0].destroy();
    }

    return true;
  }




  /** MODULE INITIALISATIONS. */


  /**
   * Check for external dependencies and report/auto-import if any are missing.
   */
  function areDependenciesAvailable() {
    return hasProp( window, 'jQuery' );
  }


  /** @constructor */
  function constructor() {
    containerElement = $( '<div id="tb" class="toolbars-container></div>' );
    $( 'body' ).prepend( containerElement );
  }


  /** Initialisations after the DOM becomes ready. */
  function initOnDomReady() {}


  ( function init() {
    if ( !areDependenciesAvailable()) {
      console.error( '`jQuery` is not available in the global scope (window.jQuery). The Toolbar dialogs cannot be initialised.' );
      return;
    }

    // Populate public API interface
    toolbarApi.initToolbar = initToolbar;
    toolbarApi.getAllToolbars = getAllToolbars;
    toolbarApi.destroyAllToolbars = destroyAllToolbars;

    constructor();
    initOnDomReady();
  }());



}());


// Make API available for Modular JS codebases
export default toolbarApi;
