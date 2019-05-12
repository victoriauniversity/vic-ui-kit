// Import 3rd party dependencies
import Shuffle from 'shufflejs';



/**
 * A module for uniform way to filter out a list of items based on given rules
 *
 * @requires jQuery - external jQuery 1.8+
 */
const filteringService = ( function GetFilteringService() {

  if ( window.toolkitFiltering ) { // Available already - do not initialise again!
    return window.toolkitFiltering;
  }





  /** PRIVATE MODULE FUNCTIONS */



  /**
   * Alter `Shuffle.js` CSS to match the Toolkit UI.
   */
  function normaliseShuffleCss() {
    Shuffle.ShuffleItem.Css.INITIAL = {
      'display':     'block',
      'will-change': 'transform',
    };

    Shuffle.ShuffleItem.Css.VISIBLE = {
      before: {
        opacity:    1,
        visibility: 'visible',
        display:    'block',
      },
      after: {
        transitionDelay: '',
      },
    };

    Shuffle.ShuffleItem.Css.HIDDEN = {
      before: {
        opacity: 0,
        display: 'none',
      },
      after: {
        visibility:      'hidden',
        transitionDelay: '',
      },
    };
  }





  /** INLINE CLASSES. */


  /**
   * Simple wrapper around `Shuffle.js` (https://vestride.github.io/Shuffle/),
   * adding useful extensions to make filtering items more sane.
   *
   * @typedef {Class} Filterator
   *
   * @property {function} refresh
   * @property {function} filter
   * @property {function} addFilteringRule
   * @property {function} removeFilteringRule
   * @property {function} clearFilteringRules
   */
  class Filterator {

    /**
     * @param {string} wrapperSelector
     * @param {string} itemSelector
     * @param {Array<RuleFunction>|undefined} filteringRuleFunctions - (Optional)
     * @param {Object} model - (Optional)
     *
     * @memberof Filterator
     */
    constructor(
      wrapperSelector,
      itemSelector,
      filteringRuleFunctions,
      model,
      // config,
    ) {
      this._wrapperSelector = wrapperSelector;
      this._itemSelector = itemSelector;
      this._filteringRuleFunctions = filteringRuleFunctions || [];
      this._model = model || {};
      // this._config = config;

      this._initShuffler();
    }





    /** PUBLIC METHODS */



    /**
     * If any of the original elements (either wrapper or any of items)
     * were removed from DOM and re-created, calling this rebuilds the
     * Filterer's internal references.
     *
     * FIXME: Optimise by *NOT* re-creating this.shuffler.
     */
    refresh() {
      this._initShuffler();
    }



    /**
     * Performs filtering by showing only items that match
     * **all the rules** defined in `this._filteringRuleFunctions`.
     */
    filter() {
      if ( !this._shuffler ) return; // Do nothing if there's no shuffler available.

      this._shuffler.filter(( element, shuffle ) => {
        // ADDITIVE strategy => All must pass to be shown
        return this._filteringRuleFunctions.every(
          ruleFn => ruleFn( element, shuffle, this._model )
        );
      });
    }


    /**
     * Add a new rule-checking function to the Filterer.
     *
     * @param {RuleFunction} filteringRuleFn
     *  - Custom validation function that returns true or false.
     */
    addFilteringRule( filteringRuleFn ) {
      this._filteringRuleFunctions.push( filteringRuleFn );
    }



    /**
     * Removes rule-checking function from the Filterer (if exists).
     *
     * @param {RuleFunction} filteringRuleFn
     *  - Custom validation function that returns true or false.
     */
    removeFilteringRule( filteringRuleFn ) {
      const index = this._filteringRuleFunctions.indexOf( filteringRuleFn );
      if ( index !== -1 ) this._filteringRuleFunctions.splice( index, 1 );
    }



    /**
     * Removes all rule-checking functions from the Filterer.
     */
    clearFilteringRules() {
      this._filteringRuleFunctions = [];
    }





    /** PRIVATE FUNCTIONS */


    _initShuffler() {
      const wrapperElement = document.querySelector( this._wrapperSelector );

      if ( wrapperElement ) {
        // Options at https://vestride.github.io/Shuffle/#options
        this._shuffler = new Shuffle( document.querySelector( this._wrapperSelector ), {
          itemSelector:  this._itemSelector,
          useTransforms: false,
        });
      } else {
        this._shuffler = null;
      }
    }


  }

  /** MODULE INITIALISATION */

  ( function init() {
    normaliseShuffleCss();
  }());



  /** CONSTRUCTOR. */


  /**
  * Validates the passed parameters and all checks pass, creates new instance
  * of filtering service.
  *
  * @param {string} wrapperSelector
  * @param {string} itemSelector
  * @param {Array<RuleFunction>|undefined} filteringRuleFunctions
  * @param {Object} model
  * @param {Object} CONFIG
  *
  * @returns {Filterator}
  */
  function createFilterator(
    wrapperSelector,
    itemSelector,
    filteringRuleFunctions,
    model,
    CONFIG
  ) {
    if ( !wrapperSelector || !itemSelector ) { // Required attributes
      console.error( 'First two parameters `wrapperSelector` and `itemSelector` are required to initialise a new instance of Filtering service.' );
      return null;
    }

    return new Filterator( wrapperSelector, itemSelector, filteringRuleFunctions, model, CONFIG );
  }





  /** SERVICE FACTORY */
  const serviceFactory = createFilterator;

  // A) Make available for vanilla JS
  window.toolkitFiltering = serviceFactory;

  // B) Return the Service function
  return serviceFactory;

}());


// Make the Factory available for Modular JS codebases
export default filteringService;



/** DOCUMENTATION REFERENCES */

/**
 * Custom hook function that checks/verifies passed item.
 *
 * @typedef {function} RuleFunction
 *
 * @param {Element} element - DOM Element of the item that's being checked.
 * @param {Shuffle} shuffler - Allows access to the {Shuffle}'s features.
 * @param {Object} model - Data change model.
 *
 * @returns {boolean} - Whether or not given `element` passes the validation.
 */
