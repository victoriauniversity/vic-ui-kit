/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/toolkit/scripts/modules/popups.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/toolkit/scripts/modules/popups.js":
/*!******************************************************!*\
  !*** ./src/assets/toolkit/scripts/modules/popups.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _this = undefined;\n\n/**\n * Toolkit's standalone JS module for popup-based interactions.\n *\n * @requires Cookie {cookies-js}\n */\n// Dynamic 3rd party dependencies\nvar cookie;\nvar tracker = window.toolkitTracker ? window.toolkitTracker() : null;\nvar CLASSNAME = {\n  POPUP_AUTOINIT: 'popup',\n  BUTTON_OK: 'button-ok',\n  BUTTON_CANCEL: 'button-cancel',\n  BUTTON_CLOSE: 'btn-close'\n};\n\nfunction findAncestor(el, cls) {\n  while ((el = el.parentElement) && !el.classList.contains(cls)) {\n    ;\n  }\n\n  return el;\n}\n/** Popup launcher. */\n\n\nfunction initPopupBox(popupElement) {\n  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref$delayInMs = _ref.delayInMs,\n      delayInMs = _ref$delayInMs === void 0 ? 7000 : _ref$delayInMs,\n      _ref$suppressAfterCan = _ref.suppressAfterCanceling,\n      suppressAfterCanceling = _ref$suppressAfterCan === void 0 ? true : _ref$suppressAfterCan;\n\n  var COOKIE_ID = popupElement.id || 'popup-default';\n  var COOKIE_SETTINGS = {\n    expires: 2419200 // 28 days\n    // secure  : true    //If set to true the secure attribute of the cookie\n\n  };\n  var popupContainerElement = findAncestor(popupElement, 'popup-positioner');\n  var buttonOkElements = popupElement.getElementsByClassName(CLASSNAME.BUTTON_OK),\n      buttonCancelElement = popupElement.getElementsByClassName(CLASSNAME.BUTTON_CANCEL),\n      buttonCloseElement = popupElement.getElementsByClassName(CLASSNAME.BUTTON_CLOSE)[0],\n      IS_SHOWN_CLASS = 'shown';\n\n  function removeShownClass() {\n    if (popupContainerElement) {\n      popupContainerElement.classList.remove(IS_SHOWN_CLASS);\n    } else {\n      popupElement.classList.remove(IS_SHOWN_CLASS);\n    }\n  }\n\n  function closePopupPermanently() {\n    if (cookie) cookie.set(COOKIE_ID, true, COOKIE_SETTINGS);\n  }\n\n  function closePopup() {\n    unbindButtonEvents();\n    popupElement.setAttribute('data-shown', false);\n    removeShownClass();\n    if (suppressAfterCanceling) closePopupPermanently();\n  }\n\n  function close(event) {\n    // If `positionerClass` exists, hide + save 'hidden' to cookies\n    event.preventDefault();\n    event.stopPropagation();\n    closePopup();\n  }\n\n  function submit() {\n    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page\n    closePopup();\n  }\n\n  function cancel() {\n    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page\n    closePopup();\n  } // Attach button events\n\n\n  function bindButtonEvents() {\n    for (var i = 0; i < buttonOkElements.length; i++) {\n      buttonOkElements[i].addEventListener('click', submit);\n    }\n\n    if (buttonCloseElement) buttonCloseElement.addEventListener('click', close);\n\n    if (buttonCancelElement) {\n      for (var _i = 0; _i < buttonCancelElement.length; _i++) {\n        buttonCancelElement[_i].addEventListener('click', cancel);\n      }\n    }\n  }\n\n  function unbindButtonEvents() {\n    for (var i = 0; i < buttonOkElements.length; i++) {\n      buttonOkElements[i].removeEventListener('click', submit);\n    }\n\n    if (buttonCloseElement) buttonCloseElement.removeEventListener('click', close);\n\n    if (buttonCancelElement) {\n      for (var _i2 = 0; _i2 < buttonCancelElement.length; _i2++) {\n        buttonCancelElement[_i2].removeEventListener('click', cancel);\n      }\n    }\n  }\n\n  function addShownClass() {\n    if (popupContainerElement) {\n      document.getElementsByTagName('body')[0].appendChild(popupContainerElement);\n      popupContainerElement.classList.add(IS_SHOWN_CLASS);\n    } else {\n      popupElement.classList.add(IS_SHOWN_CLASS);\n    }\n  }\n\n  function isPopupShown() {\n    return popupElement.getAttribute('data-shown') === 'true';\n  }\n\n  function showPopup() {\n    bindButtonEvents();\n    addShownClass();\n\n    if (tracker && tracker.shouldTrackElement(popupElement)) {\n      tracker.trackEvent(popupElement.id, {\n        eventType: 'open'\n      });\n    }\n  } // Constructor\n\n\n  var shouldShowPopup = !cookie || !suppressAfterCanceling || cookie.get(COOKIE_ID) === undefined || !cookie.get(COOKIE_ID);\n\n  if (shouldShowPopup && !isPopupShown()) {\n    popupElement.setAttribute('data-shown', true); // Must be added here to prevent triggering setTimeout when clicking multiple time\n    // If there's a positioner available, display after the timeout!\n\n    setTimeout(function () {\n      showPopup();\n    }, delayInMs);\n  }\n}\n/**\n * Function called on the jQuery Element, opens it as a popup.\n *\n * @param {Object} { delayInMs = 0, suppressAfterCanceling = false }\n *\n * @returns {DOMElement}\n */\n\n\nfunction openPopupInstantly(popupElement) {\n  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},\n      _ref2$delayInMs = _ref2.delayInMs,\n      delayInMs = _ref2$delayInMs === void 0 ? 0 : _ref2$delayInMs,\n      _ref2$suppressAfterCa = _ref2.suppressAfterCanceling,\n      suppressAfterCanceling = _ref2$suppressAfterCa === void 0 ? false : _ref2$suppressAfterCa;\n\n  initPopupBox(popupElement, {\n    delayInMs: delayInMs,\n    suppressAfterCanceling: suppressAfterCanceling\n  });\n}\n\nfunction autoInitialisePopups() {\n  var autoloadPopups = document.getElementsByClassName(CLASSNAME.POPUP_AUTOINIT);\n\n  for (var i = 0; i < autoloadPopups.length; i += 1) {\n    var popupElement = autoloadPopups[i];\n\n    if (popupElement.getAttribute('data-autoload') !== null) {\n      // Autoload (~ show/hide) popup\n      var optionsObject = {};\n\n      if (popupElement.getAttribute('data-opts') !== null) {\n        optionsObject = JSON.parse(popupElement.getAttribute('data-opts'));\n      }\n\n      initPopupBox(popupElement, optionsObject);\n    }\n  }\n} // Public API interface\n\n\nvar popupsApi = {\n  init: initPopupBox,\n  initAndOpen: openPopupInstantly\n}; // Initialiser\n\nfunction init() {\n  if (!cookie) {\n    console.error('`Cookie-js` library is not available. Please, import the library for the correct functionality!');\n  }\n\n  if (!tracker) {\n    console.warn('`Toolkit.tracking` library is not available, so the user actions related to popups will not be sent to the Google Tag Manager. Please, make sure the library is included to enable the tracking.');\n  } // Run when the DOM is ready!\n\n\n  if (document.readyState === 'complete') {\n    autoInitialisePopups();\n  } else {\n    document.onreadystatechange = function () {\n      if (document.readyState === 'complete') {\n        // Find all existing popups and if they contain `data-autoload` attribute,\n        autoInitialisePopups();\n      }\n    };\n  }\n}\n\nif (!window.toolkitPopups) {\n  // Not initialised yet\n  // TODO: Move into encapsulated library module\n  try {\n    cookie = __webpack_require__(/*! cookies-js */ \"cookies-js\");\n    init();\n  } catch (err) {\n    // Fallback when the cookies-js is not included - Load from the CDN\n    var isScriptLoaded = false;\n    var s = document.createElement('script');\n    s.type = 'text/javascript';\n    s.async = true;\n    s.src = '//cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js';\n\n    s.onreadystatechange = function () {\n      // After-load handler for IE\n      if (isScriptLoaded) return;\n\n      if (_this.readyState === 'complete' || _this.readyState === 'loaded') {\n        cookie = window.Cookies;\n        init();\n        isScriptLoaded = true;\n      }\n    };\n\n    s.onload = function () {\n      // After-load handler for all the other browsers\n      if (isScriptLoaded) return;\n      cookie = window.Cookies;\n      init();\n      isScriptLoaded = true;\n    };\n\n    document.getElementsByTagName('head')[0].appendChild(s);\n  } // For a global use\n\n\n  window.toolkitPopups = popupsApi;\n} // Make API available for modules\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (popupsApi);\n\n//# sourceURL=webpack:///./src/assets/toolkit/scripts/modules/popups.js?");

/***/ }),

/***/ "cookies-js":
/*!**************************!*\
  !*** external "Cookies" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("if(typeof Cookies === 'undefined') {var e = new Error(\"Cannot find module 'Cookies'\"); e.code = 'MODULE_NOT_FOUND'; throw e;}\nmodule.exports = Cookies;\n\n//# sourceURL=webpack:///external_%22Cookies%22?");

/***/ })

/******/ });