import { isElementHidden, removeAttribute, isAppleMobileDevice } from '../utils/helpers';

/** Library-specific polyfills */

if ( 'NodeList' in window && !NodeList.prototype.forEach ) {
  console.info( 'polyfill for IE11' );
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}


// API interface
const tooltipsApi = window.toolkitTooltips || {};


/**
 * A module providing basic tooltips UI and functionality.
 * Can be accessed globally through `window.toolkitTooltips` or
 * imported/required as a JS module.
 *
 * @typedef {Object} toolkitTooltip
 *
 * @property {function} initTooltip
 * @property {function} initTooltips
 * @property {function} getAllTooltips
 * @property {function} destroyAllTooltips
 */
( function ToolkitTooltip() {

  if ( window.toolkitTooltips ) { // Available already - do not initialise again!
    return;
  }

  window.toolkitTooltips = tooltipsApi; // Import for a global access


  /** @constant */

  const VALUE_ID = 'toolkit-tooltip',

    ATTRIBUTE_NAME_TOOLTIP = 'data-tooltip',
    ATTRIBUTE_NAME_CONTENT = 'title',

    SIZES = {
      SCREEN_PADDING: 20,
      MAX_WIDTH:      400,
      CARET_SIZE:     20,
    },

    TRIGGER_TYPE = {
      HOVER: 'hover',
      CLICK: 'click',
    };



  /** PRIVATE MEMBERS */


  let globalTooltipElement,
    lastInteractedSourceElement,
    outsideClickListenerFn;


  /** List of active tooltips */
  const tooltipsList = [];



  /** PRIVATE FUNCTIONS */


  function appendTooltipElement() {
    const tooltipElement = document.createElement( 'div' );

    tooltipElement.setAttribute( 'id', VALUE_ID );
    tooltipElement.setAttribute( 'class', 'tooltip' );
    tooltipElement.setAttribute( 'role', 'tooltip' );
    tooltipElement.setAttribute( 'hidden', '' );

    document.body.appendChild( tooltipElement );
    globalTooltipElement = tooltipElement;
  }


  function removeTooltipElement() {
    globalTooltipElement = undefined;
    document.body.removeChild( globalTooltipElement );
  }



  /** INLINE CLASSES. */


  /**
   * Takes care of all the data and UI operations
   *
   * @typedef {Class} Tooltip
   *
   * @property {Element} sourceElement
   * @property {string} content
   * @property {string} triggerType
   *
   * @property {function} destroy
   * @property {function} showTooltip
   * @property {function} hideTooltip
   * @property {function} toggleTooltip
   *
   */
  class Tooltip {

    /**
     * @param {Element} sourceElement -
     *  DOM Element that will toggle the tooltip.
     * @param {{content:string, attributeNameContent:string,trigger:string}} -
     *   Optional custom settings.
     *
     * @memberof Tooltip
     */
    constructor( sourceElement, {
      content,
      attributeNameContent = ATTRIBUTE_NAME_CONTENT,
      trigger = TRIGGER_TYPE.HOVER,
    } = {}) {
      this.sourceElement = sourceElement;

      this.content = content || sourceElement.getAttribute( attributeNameContent );
      this.triggerType = trigger;

      if ( this.content ) {
        this.init();
      } else {
        console.warn( 'There is no available content to show in the tooltip for element. The tooltip will not be created. ', this.sourceElement, this.content );
      }

      this.bindEvents();
      this.enhanceAccessibility();
    }



    /** PUBLIC METHODS */


    /** Removes the tooltip and cleans up. */
    destroy() {
      // Remove this instance from the list of tooltips
      const tooltipIndex = tooltipsList.indexOf( this );
      if ( tooltipIndex > -1 ) {
        tooltipsList.splice( tooltipIndex, 1 );
        // TODO: + Unbind all events
      }

      if ( tooltipsList.length === 0 ) removeTooltipElement();
    }


    showTooltip( $event ) {
      // Mobile Safari *ONLY* quirk: https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
      if ( isAppleMobileDevice()) document.body.style.cursor = 'pointer';

      removeAttribute( this.sourceElement, 'title' ); // Remove title attribute to prevent default system behavior
      this.sourceElement.setAttribute( 'aria-describedby', VALUE_ID ); // Accessibility

      removeAttribute( globalTooltipElement, 'hidden' ); // Accessibility
      globalTooltipElement.style.opacity = 0;
      // FIXME: SHOULD support HTML-based content too!
      globalTooltipElement.textContent = this.content;
      globalTooltipElement.style.display = 'block';

      this.positionTooltip();

      return $event;
    }


    hideTooltip( $event ) {
      globalTooltipElement.style.opacity = 0; // TODO: Animate disappearance

      this.sourceElement.setAttribute( ATTRIBUTE_NAME_CONTENT, this.content );
      removeAttribute( this.sourceElement, 'aria-describedby' );

      globalTooltipElement.setAttribute( 'hidden', '' ); // Accessibility

      // Mobile Safari *ONLY* quirk: https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
      if ( isAppleMobileDevice()) document.body.style.cursor = null;

      globalTooltipElement.style.display = 'none';

      return $event;
    }


    toggleTooltip( $event ) {

      if ( isElementHidden( globalTooltipElement )) {
        if ( outsideClickListenerFn ) window.removeEventListener( 'click', outsideClickListenerFn );

        outsideClickListenerFn = this.handleClickOutsideTooltip.bind( this );

        window.addEventListener( 'click', outsideClickListenerFn );
        this.showTooltip( $event );
      } else {
        window.removeEventListener( 'click', outsideClickListenerFn );
        this.hideTooltip( $event );

        if ( lastInteractedSourceElement !== this.sourceElement ) {
          setTimeout(() => { // `setTimeout()` forces the tooltip to re-open (by pushing it into )
            this.toggleTooltip( $event );
          });
        }
      }

      lastInteractedSourceElement = this.sourceElement;
    }



    /** PRIVATE FUNCTIONS */


    /** Builds tooltip, attaches events and adds generic DOM. */
    init() {
      tooltipsList.push( this );

      // First initiated tooltip -> add the global tooltip element
      if ( tooltipsList.length === 1 ) appendTooltipElement();
    }


    bindEvents() {
      if ( this.triggerType === TRIGGER_TYPE.CLICK ) {
        this.sourceElement.addEventListener( 'click', this.toggleTooltip.bind( this ));
      } else if ( this.triggerType === TRIGGER_TYPE.HOVER ) {
        this.bindMouseHovering();
        this.bindAccessibilityFeatures();
      } else {
        console.error( 'Unsupported type of trigger `%s`. The tooltip will not be shown for your element', this.triggerType, this.sourceElement );
      }
    }


    bindAccessibilityFeatures() {
      this.sourceElement.addEventListener( 'focus', this.showTooltip.bind( this ));
      this.sourceElement.addEventListener( 'focusout', this.hideTooltip.bind( this ));
      this.sourceElement.addEventListener( 'keydown', this.hideTooltipOnEscKey.bind( this ));
    }


    bindMouseHovering() {
      this.sourceElement.addEventListener( 'mouseenter', this.showTooltip.bind( this ));
      this.sourceElement.addEventListener( 'mouseout', this.hideTooltip.bind( this ));
    }


    enhanceAccessibility() {
      this.sourceElement.setAttribute( 'tabindex', 0 );
    }


    handleClickOutsideTooltip( $event ) {
      if ( $event.target !== this.sourceElement && $event.target !== globalTooltipElement ) {
        window.removeEventListener( 'click', outsideClickListenerFn );
        this.hideTooltip( $event );
      }
    }

    hideTooltipOnEscKey( $event ) {
      const KEY_ESC_ID = 27;

      if ( $event.which === KEY_ESC_ID ) {
        this.hideTooltip();
        $event.preventDefault();
        return false;
      }

      return true;
    }


    getSourceElementCenterX() {
      return this.sourceElement.getBoundingClientRect().left
        + this.sourceElement.getBoundingClientRect().width / 2;
    }


    calculateTooltipPositionX() {
      let positionX = 0;

      const expectedTooltipWidth = Math.floor( globalTooltipElement.getBoundingClientRect().width ),
        viewPortWidth = window.innerWidth,

        caretOffset = 20, // Half of the caret size + margin from the edge of the tooltip

        elementCenterX = this.getSourceElementCenterX(),

        potentialTooltipLeftPositionX = elementCenterX - caretOffset,
        potentialTooltipRightPositionX = elementCenterX - expectedTooltipWidth + caretOffset;

      if ( viewPortWidth < ( potentialTooltipLeftPositionX + expectedTooltipWidth )
        && ( elementCenterX - caretOffset ) >= ( 0 )) {
        globalTooltipElement.classList.add( 'right' );
        positionX = potentialTooltipRightPositionX;
      } else {
        // Default
        globalTooltipElement.classList.add( 'left' );
        positionX = potentialTooltipLeftPositionX;
      }

      return positionX;
    }


    calculateTooltipPositionY() {
      let positionY = 0;

      const caretOffset = 16, // Caret's height + margin between the tip and the element

        expectedTooltipHeight = globalTooltipElement.getBoundingClientRect().height,

        viewPortTopY = window.window.pageYOffset,
        viewPortBottomY = viewPortTopY + window.innerHeight,

        elementTopY = this.sourceElement.getBoundingClientRect().top,
        elementBottomY = elementTopY + this.sourceElement.getBoundingClientRect().height,

        potentialTooltipTopPositionY = elementTopY - caretOffset
          - expectedTooltipHeight,
        potentialTooltipBottomPositionY = elementBottomY + caretOffset;

      if ( potentialTooltipTopPositionY < SIZES.SCREEN_PADDING
        && ( elementBottomY + caretOffset + expectedTooltipHeight ) <= viewPortBottomY - SIZES.SCREEN_PADDING ) {
        globalTooltipElement.classList.add( 'top' );
        positionY = potentialTooltipBottomPositionY;
      } else {
        // Default
        globalTooltipElement.classList.add( 'bottom' );
        positionY = potentialTooltipTopPositionY;
      }

      return positionY + viewPortTopY;
    }


    setTooltipWidth() {
      // Pre-calculate required dimensions
      const expectedTooltipWidth = Math.floor( globalTooltipElement.getBoundingClientRect().width ),
        viewPortWidth = window.innerWidth,

        caretOffset   = 20, // Half of the caret size + margin from the edge of the tooltip

        elementCenterX = this.getSourceElementCenterX(),

        potentialTooltipLeftPositionX = elementCenterX - caretOffset,
        potentialTooltipRightPositionX = elementCenterX - expectedTooltipWidth + caretOffset,

        potentialTooltipLeftSpace = viewPortWidth - potentialTooltipLeftPositionX,
        potentialTooltipRightSpace = potentialTooltipRightPositionX + expectedTooltipWidth;

      // 2. Check if the tooltip is going to fit there
      if (( potentialTooltipLeftSpace - SIZES.SCREEN_PADDING ) >= expectedTooltipWidth
        || ( potentialTooltipRightSpace - SIZES.SCREEN_PADDING >= expectedTooltipWidth )) {
        globalTooltipElement.style.width = `${expectedTooltipWidth + 1}px`;
        return;
      }

      if ( potentialTooltipLeftSpace < potentialTooltipRightSpace ) {
        // Tooltip right is better
        globalTooltipElement.style.width = `${potentialTooltipRightSpace - SIZES.SCREEN_PADDING}px`;
      } else {
        // Tooltip left is better
        globalTooltipElement.style.width = `${potentialTooltipLeftSpace - SIZES.SCREEN_PADDING}px`;
      }
    }


    positionTooltip() {
      // Reset positioning classes
      globalTooltipElement.classList.remove( 'left' );
      globalTooltipElement.classList.remove( 'right' );
      globalTooltipElement.classList.remove( 'top' );
      globalTooltipElement.classList.remove( 'bottom' );

      globalTooltipElement.style.width = ''; // Revert into 'auto'
      globalTooltipElement.style.height = ''; // Revert into 'auto'

      this.setTooltipWidth();

      globalTooltipElement.style.left = `${this.calculateTooltipPositionX()}px`;
      globalTooltipElement.style.top = `${this.calculateTooltipPositionY()}px`;

      globalTooltipElement.style.opacity = 1;
    }

  }



  /** PUBLIC METHODS. */


  /**
   * Initialises a tooltip for a given element. If the `configObject` is not
   * passed, it tries to parse it from a `data-tooltip` attribute (JSON-valid
   * string object) of the element.
   *
   * @param {Element} tooltipableElement -
   *    A single element that should be used to initialise a tooltip.
   * @param {Object} configObject -
   *    Object specifying configurable options to adjust tooltip's behaviour.
   *
   * @return {Tooltip}
   */
  function initTooltip( tooltipableElement, configObject ) {
    let tooltipConfigObject = configObject;

    const tooltipElementConfigString = tooltipableElement.getAttribute( ATTRIBUTE_NAME_TOOLTIP );

    if ( !tooltipConfigObject
        && tooltipElementConfigString && tooltipConfigObject !== '' ) {
      try {
        tooltipConfigObject = JSON.parse( tooltipElementConfigString );
      } catch ( err ) {
        console.error( 'Custom configuration options for a tooltip MUST be in a valid JSON format: ', tooltipElementConfigString, tooltipableElement, err );
      }
    }

    return new Tooltip( tooltipableElement, tooltipConfigObject );
  }


  /**
   * If no parameter is passed, auto-initialise a tooltip for all
   * elements that contain `data-tooltip` attribute.
   *
   * @param {Array<Element>} tooltipableDomElements -
   *    A list of all elements to initialise a tooltip for.
   *
   * @return {Array<Tooltip>|null} List of newly created Tooltips.
   */
  function initTooltips( tooltipableDomElements ) {
    /** @type {NodeList} */
    const tooltipableElementList = tooltipableDomElements || document.querySelectorAll( `[${ATTRIBUTE_NAME_TOOLTIP}]` );

    const newTooltipInstances = [];
    tooltipableElementList.forEach( element => newTooltipInstances.push( initTooltip( element )));

    return ( newTooltipInstances.length > 0 ) ? newTooltipInstances : null;
  }


  /**
   * Retrieves all existing active tooltips.
   *
   * @return {Array<Tooltip>}
   */
  function getAllTooltips() {
    return tooltipsList;
  }


  /**
   * Removes all the Tooltips safely to prevent memory leaks.
   *
   * @returns {boolean}
   */
  function destroyAllTooltips() {
    while ( tooltipsList.length ) {
      tooltipsList[0].destroy();
    }

    return true;
  }



  // Populate public API interface
  tooltipsApi.initTooltip = initTooltip;
  tooltipsApi.initTooltips = initTooltips;
  tooltipsApi.getAllTooltips = getAllTooltips;
  tooltipsApi.destroyAllTooltips = destroyAllTooltips;



  /** MODULE INITIALISATIONS. */


  /**
   * Check for dependencies and report/auto-import if any are missing.
   */
  function areDependenciesAvailable() {}


  /** @constructor */
  function constructor() {}


  /** Initialisations after the DOM becomes ready. */
  function initOnDomReady() {}


  ( function init() {
    if ( !areDependenciesAvailable()) return;

    constructor();
    initOnDomReady();
  }());



}());


// Make API available for Modular JS codebases
export default tooltipsApi;
