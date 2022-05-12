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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/toolkit/scripts/modules/tracking.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/toolkit/scripts/modules/tracking.js":
/*!********************************************************!*\
  !*** ./src/assets/toolkit/scripts/modules/tracking.js ***!
  \********************************************************/
/*! exports provided: trackerConfig, tracker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"trackerConfig\", function() { return trackerConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tracker\", function() { return tracker; });\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ \"jquery\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * Toolkit's standalone JS module for website tracking.\n *\n * @requires $ {jQuery}\n */\n // Members\n\nvar GTM_TRACK_ATTRIBUTE = 'data-gtm-track';\nvar GTM_ID_ATTRIBUTE = 'data-gtm-id';\nvar GTM_DATA_ATTRIBUTE = 'data-gtm-vars';\nvar defaultConfig = {\n  autoRegister: true\n};\n/** Start tracking automatically. */\n\nvar shouldAutoRegister = true; // Public methods\n\nfunction pushTrackingInfoToGtm(trackingId, trackingSource, customDataExtension) {\n  if (!window.dataLayer) {\n    console.warn('`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script. The tracking might not work correctly!');\n    window.dataLayer = []; // Init empty as fall-back to avoid hard errors\n\n    return;\n  }\n\n  var event,\n      customDataObject = {};\n\n  if (trackingSource && !(typeof trackingSource.altKey === 'undefined')) {\n    // is Event (see https://developer.mozilla.org/en-US/docs/Web/API/Event)\n    event = trackingSource;\n  } else {\n    // is Object with custom properties OR null/undefined\n    customDataObject = trackingSource || {};\n  } // Event supplied -> Extract data automatically based on the type of event\n\n\n  if (event) {\n    // Custom data pre-sets based on event type (https://developer.mozilla.org/en-US/docs/Web/API/Event/type)\n    switch (event.type) {\n      case 'click':\n        customDataObject = {\n          selector: event.target,\n          href: event.currentTarget.href,\n          text: event.currentTarget.text\n        };\n        break;\n\n      default:\n        {\n          console.warn(\"GTM: There is no tracking preset for the event type '\".concat(event.type, \"'. Please, track a different event or pass an Object with custom data that should be sent to Google Tag Manager.\"));\n        }\n    }\n\n    customDataObject.eventType = event.type;\n  } // Extend (and override) with the custom data object (if supplied)\n\n\n  if (customDataExtension) {\n    for (var property in customDataExtension) {\n      if (customDataExtension.hasOwnProperty(property)) {\n        customDataObject[property] = customDataExtension[property];\n      }\n    }\n  }\n\n  var dataLayerObject = {\n    event: trackingId\n  };\n  if (customDataObject) dataLayerObject.custom = customDataObject; // Push to the GTM\n\n  window.dataLayer.push(dataLayerObject);\n}\n\nfunction addGtmTrackingListeners(elementsList, eventType, trackingId) {\n  if (!window.dataLayer) {\n    console.warn('`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script.');\n    window.dataLayer = []; // Fallback\n\n    return;\n  }\n\n  elementsList.each(function attachTrackingHandlers() {\n    var elementToTrack = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),\n        trackingEventType = eventType || elementToTrack.attr(GTM_TRACK_ATTRIBUTE) || 'auto',\n        id = trackingId || elementToTrack.attr(GTM_ID_ATTRIBUTE) || elementToTrack[0].id,\n        customDataJsonString = elementToTrack.attr(GTM_DATA_ATTRIBUTE);\n    var customDataObject; // Convert the custom variables string into JSON\n\n    if (customDataJsonString) {\n      try {\n        customDataObject = JSON.parse(customDataJsonString);\n      } catch (err) {\n        console.error(\"The element with tracking ID \".concat(id, \" and its element '\").concat(customDataJsonString, \"' contains JSON string in invalid format. These information will not be pushed into Google Tag Manager...\"), customDataJsonString, err);\n      }\n    }\n\n    if (trackingEventType === 'auto') {// TODO: Determine binding event automatically based on the type of\n      // the element (e.g. <a> => 'click' etc.)\n    } else {\n      elementToTrack.on(trackingEventType, function (event) {\n        pushTrackingInfoToGtm(id, event, customDataObject);\n      });\n    }\n  });\n}\n\nfunction shouldTrackByGtm(element) {\n  element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(element);\n  return Boolean(element.attr(GTM_TRACK_ATTRIBUTE) !== undefined);\n} // Private functions\n\n\nfunction autoregisterGtmTrackingListeners() {\n  addGtmTrackingListeners(jquery__WEBPACK_IMPORTED_MODULE_0___default()(\"[\".concat(GTM_TRACK_ATTRIBUTE, \"]\")));\n} // Run after the DOM has loaded...\n\n\njquery__WEBPACK_IMPORTED_MODULE_0___default()(function () {\n  if (shouldAutoRegister) {\n    /** Auto-register all on-demand elements to automatically start tracking. */\n    setTimeout(autoregisterGtmTrackingListeners, 0);\n  }\n}); // Public API interface\n\nvar trackingApi = {\n  shouldTrackElement: shouldTrackByGtm,\n  trackEvent: pushTrackingInfoToGtm,\n\n  /** Any element or set of elements can be dynamically tracked this way */\n  registerForTracking: addGtmTrackingListeners\n};\n\nfunction overrideOptions() {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig,\n      autoRegister = _ref.autoRegister;\n\n  shouldAutoRegister = autoRegister;\n}\n\nvar trackerConfig = overrideOptions;\nvar tracker = trackingApi; // Make API available for modules\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (trackingApi); // For a global imports\n\nwindow.toolkitTracker = function (opts) {\n  overrideOptions(opts);\n  return trackingApi;\n};\n\n//# sourceURL=webpack:///./src/assets/toolkit/scripts/modules/tracking.js?");

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = jQuery;\n\n//# sourceURL=webpack:///external_%22jQuery%22?");

/***/ })

/******/ });