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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = exports.tracker = exports.trackerConfig = void 0;\n\nvar _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ \"jquery\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n/**\n * Toolkit's standalone JS module for website tracking.\n *\n * @requires $ {jQuery}\n */\n// Members\nvar GTM_TRACK_ATTRIBUTE = 'data-gtm-track';\nvar GTM_ID_ATTRIBUTE = 'data-gtm-id';\nvar defaultConfig = {\n  autoRegister: true\n};\n/** Start tracking automatically. */\n\nvar shouldAutoRegister = true; // Public methods\n\nfunction addGtmTrackingListeners(elementsList, eventType, trackingId) {\n  if (!window.dataLayer) {\n    console.warn(\"`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script.\");\n    window.dataLayer = []; // Fallback\n\n    return;\n  }\n\n  elementsList.each(function () {\n    var elementToTrack = (0, _jquery.default)(this);\n    var trackingEventType = eventType || elementToTrack.attr(GTM_TRACK_ATTRIBUTE) || 'auto';\n    var id = trackingId || elementToTrack.attr(GTM_ID_ATTRIBUTE) || elementToTrack[0].id;\n\n    switch (trackingEventType) {\n      case 'click':\n        {\n          elementToTrack.on(trackingEventType, function (event) {\n            dataLayer.push({\n              'event': id,\n              'custom.selector': event.target,\n              'custom.eventType': event.type,\n              'custom.href': event.currentTarget.href,\n              'custom.text': event.currentTarget.text\n            });\n          });\n        }\n        ;\n        break;\n\n      case 'auto':\n        break;\n\n      default:\n        {\n          console.warn(\"GTM: Tracking of event '\".concat(trackingEventType, \"' is not supported.\"));\n        }\n    }\n  });\n}\n\nfunction pushTrackingInfoToGtm(trackingId, eventType) {\n  if (!window.dataLayer) {\n    console.warn(\"`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script.\");\n    window.dataLayer = []; // Fallback\n\n    return;\n  }\n\n  dataLayer.push({\n    'event': trackingId,\n    'custom.eventType': eventType\n  });\n}\n\nfunction shouldTrackByGtm(element) {\n  return Boolean(element.attr(GTM_TRACK_ATTRIBUTE) !== undefined);\n} // Private functions\n\n\nfunction autoregisterGtmTrackingListeners() {\n  addGtmTrackingListeners((0, _jquery.default)(\"[\".concat(GTM_TRACK_ATTRIBUTE, \"]\")));\n} // Run after the DOM has loaded...\n\n\n(0, _jquery.default)(function () {\n  if (shouldAutoRegister) {\n    /** Auto-register all on-demand elements to automatically start tracking. */\n    setTimeout(autoregisterGtmTrackingListeners, 0);\n  }\n}); // Public API interface\n\nvar trackingApi = {\n  shouldTrackElement: shouldTrackByGtm,\n  trackEvent: pushTrackingInfoToGtm,\n\n  /** Any element or set of elements can be dynamically tracked this way */\n  registerForTracking: addGtmTrackingListeners\n};\n\nfunction overrideOptions() {\n  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig,\n      autoRegister = _ref.autoRegister;\n\n  shouldAutoRegister = autoRegister;\n}\n\nvar trackerConfig = overrideOptions;\nexports.trackerConfig = trackerConfig;\nvar tracker = trackingApi; // Make API available for modules\n\nexports.tracker = tracker;\nvar _default = trackingApi; // For a global imports\n\nexports.default = _default;\n\nwindow.toolkitTracker = function (opts) {\n  overrideOptions(opts);\n  return trackingApi;\n};\n\n//# sourceURL=webpack:///./src/assets/toolkit/scripts/modules/tracking.js?");

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