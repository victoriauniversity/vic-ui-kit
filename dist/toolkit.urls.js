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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/toolkit/scripts/modules/urls.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/toolkit/scripts/modules/urls.js":
/*!****************************************************!*\
  !*** ./src/assets/toolkit/scripts/modules/urls.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Import 3rd party dependencies\nvar Url = __webpack_require__(/*! ../vendors/url */ \"./src/assets/toolkit/scripts/vendors/url.js\");\n/**\n * An extension of the lightweight `Url.js` library\n * (https://github.com/jillix/url.js/).\n */\n\n\nvar extendedUrlManager = function ExtendUrlManager() {\n  if (window.toolkitUrlManager) {\n    // Available already - do not initialise again!\n    return window.toolkitUrlManager;\n  }\n  /** PUBLIC METHODS */\n\n\n  function onLoadWhenQueryExists(queryName, handlerFunction) {\n    if (Url.queryString(queryName)) {\n      if (window.onDocumentReadyFunctions) {\n        window.onDocumentReadyFunctions.push(handlerFunction);\n      } else {\n        console.warn('`onDocumentReadyFunctions` Array is not available on the global scope - Cannot run the handler function for existing query `%s`.', queryName, handlerFunction);\n      }\n    }\n  } // A) Extend the API of the Url.js\n\n\n  Url.onLoadWhenQueryExists = onLoadWhenQueryExists; // B) Add the extended class to global scope\n\n  window.toolkitUrlManager = Url; // C) Return the extended class.\n\n  return Url;\n}(); // Make the Factory available for Modular JS codebases\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (extendedUrlManager);\n\n//# sourceURL=webpack:///./src/assets/toolkit/scripts/modules/urls.js?");

/***/ }),

/***/ "./src/assets/toolkit/scripts/vendors/url.js":
/*!***************************************************!*\
  !*** ./src/assets/toolkit/scripts/vendors/url.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;\n\nfunction _typeof2(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof2(obj); }\n\nvar _typeof = typeof Symbol === \"function\" && _typeof2(Symbol.iterator) === \"symbol\" ? function (obj) {\n  return _typeof2(obj);\n} : function (obj) {\n  return obj && typeof Symbol === \"function\" && obj.constructor === Symbol ? \"symbol\" : _typeof2(obj);\n};\n\n(function (f) {\n  if (( false ? undefined : _typeof(exports)) === \"object\" && typeof module !== \"undefined\") {\n    module.exports = f();\n  } else if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var g; }\n})(function () {\n  var define, module, exports;\n  return function e(t, n, r) {\n    function s(o, u) {\n      if (!n[o]) {\n        if (!t[o]) {\n          var a = typeof require == \"function\" && require;\n          if (!u && a) return require(o, !0);\n          if (i) return i(o, !0);\n          var f = new Error(\"Cannot find module '\" + o + \"'\");\n          throw f.code = \"MODULE_NOT_FOUND\", f;\n        }\n\n        var l = n[o] = {\n          exports: {}\n        };\n        t[o][0].call(l.exports, function (e) {\n          var n = t[o][1][e];\n          return s(n ? n : e);\n        }, l, l.exports, e, t, n, r);\n      }\n\n      return n[o].exports;\n    }\n\n    var i = typeof require == \"function\" && require;\n\n    for (var o = 0; o < r.length; o++) {\n      s(r[o]);\n    }\n\n    return s;\n  }({\n    1: [function (require, module, exports) {\n      window.addEventListener(\"popstate\", function (e) {\n        Url.triggerPopStateCb(e);\n      });\n      var Url = module.exports = {\n        _onPopStateCbs: [],\n        _isHash: false,\n        queryString: function queryString(name, notDecoded) {\n          name = name.replace(/[\\[]/, \"\\\\[\").replace(/[\\]]/, \"\\\\]\");\n          var regex = new RegExp(\"[\\\\?&]\" + name + \"=([^&#]*)\"),\n              results = regex.exec(location.search),\n              encoded = null;\n\n          if (results === null) {\n            regex = new RegExp(\"[\\\\?&]\" + name + \"(\\\\&([^&#]*)|$)\");\n\n            if (regex.test(location.search)) {\n              return true;\n            }\n\n            return undefined;\n          } else {\n            encoded = results[1].replace(/\\+/g, \" \");\n\n            if (notDecoded) {\n              return encoded;\n            }\n\n            return decodeURIComponent(encoded);\n          }\n        },\n        parseQuery: function parseQuery(search) {\n          var query = {};\n\n          if (typeof search !== \"string\") {\n            search = window.location.search;\n          }\n\n          search = search.replace(/^\\?/g, \"\");\n\n          if (!search) {\n            return {};\n          }\n\n          var a = search.split(\"&\"),\n              i = 0,\n              iequ,\n              value = null;\n\n          for (; i < a.length; ++i) {\n            iequ = a[i].indexOf(\"=\");\n\n            if (iequ < 0) {\n              iequ = a[i].length;\n              value = true;\n            } else {\n              value = decodeURIComponent(a[i].slice(iequ + 1));\n            }\n\n            query[decodeURIComponent(a[i].slice(0, iequ))] = value;\n          }\n\n          return query;\n        },\n        stringify: function stringify(queryObj) {\n          if (!queryObj || queryObj.constructor !== Object) {\n            throw new Error(\"Query object should be an object.\");\n          }\n\n          var stringified = \"\";\n          Object.keys(queryObj).forEach(function (c) {\n            var value = queryObj[c];\n            stringified += c;\n\n            if (value !== true) {\n              stringified += \"=\" + encodeURIComponent(queryObj[c]);\n            }\n\n            stringified += \"&\";\n          });\n          stringified = stringified.replace(/\\&$/g, \"\");\n          return stringified;\n        },\n        updateSearchParam: function updateSearchParam(param, value, push, triggerPopState) {\n          var searchParsed = this.parseQuery();\n\n          if (value === undefined) {\n            delete searchParsed[param];\n          } else {\n            if (searchParsed[param] === value) {\n              return Url;\n            }\n\n            searchParsed[param] = value;\n          }\n\n          var newSearch = \"?\" + this.stringify(searchParsed);\n\n          this._updateAll(window.location.pathname + newSearch + location.hash, push, triggerPopState);\n\n          return Url;\n        },\n        getLocation: function getLocation() {\n          return window.location.pathname + window.location.search + window.location.hash;\n        },\n        hash: function hash(newHash, triggerPopState) {\n          if (newHash === undefined) {\n            return location.hash.substring(1);\n          }\n\n          if (!triggerPopState) {\n            setTimeout(function () {\n              Url._isHash = false;\n            }, 0);\n            Url._isHash = true;\n          }\n\n          return location.hash = newHash;\n        },\n        _updateAll: function _updateAll(s, push, triggerPopState) {\n          window.history[push ? \"pushState\" : \"replaceState\"](null, \"\", s);\n\n          if (triggerPopState) {\n            Url.triggerPopStateCb({});\n          }\n\n          return s;\n        },\n        pathname: function pathname(_pathname, push, triggerPopState) {\n          if (_pathname === undefined) {\n            return location.pathname;\n          }\n\n          return this._updateAll(_pathname + window.location.search + window.location.hash, push, triggerPopState);\n        },\n        triggerPopStateCb: function triggerPopStateCb(e) {\n          if (this._isHash) {\n            return;\n          }\n\n          this._onPopStateCbs.forEach(function (c) {\n            c(e);\n          });\n        },\n        onPopState: function onPopState(cb) {\n          this._onPopStateCbs.push(cb);\n        },\n        removeHash: function removeHash() {\n          this._updateAll(window.location.pathname + window.location.search, false, false);\n        },\n        removeQuery: function removeQuery() {\n          this._updateAll(window.location.pathname + window.location.hash, false, false);\n        },\n        version: \"2.3.1\"\n      };\n    }, {}]\n  }, {}, [1])(1);\n});\n\n//# sourceURL=webpack:///./src/assets/toolkit/scripts/vendors/url.js?");

/***/ })

/******/ });