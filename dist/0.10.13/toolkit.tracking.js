/** Version: 0.10.13 | Monday, March 28, 2022, 3:23 PM */
!function(r){var n={};function a(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,a),e.l=!0,e.exports}a.m=r,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=12)}({12:function(t,e,r){"use strict";r.r(e),r.d(e,"trackerConfig",function(){return p}),r.d(e,"tracker",function(){return v});var n=r(8),c=r.n(n),u="data-gtm-track",l="data-gtm-id",f="data-gtm-vars",a={autoRegister:!0},o=!0;function s(t,e,r){if(!window.dataLayer)return console.warn("`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script. The tracking might not work correctly!"),void(window.dataLayer=[]);var n,a={};if(e&&void 0!==e.altKey?n=e:a=e||{},n){switch(n.type){case"click":a={selector:n.target,href:n.currentTarget.href,text:n.currentTarget.text};break;default:console.warn("GTM: There is no tracking preset for the event type '".concat(n.type,"'. Please, track a different event or pass an Object with custom data that should be sent to Google Tag Manager."))}a.eventType=n.type}if(r)for(var o in r)r.hasOwnProperty(o)&&(a[o]=r[o]);var i={event:t};a&&(i.custom=a),window.dataLayer.push(i)}function i(t,o,i){if(!window.dataLayer)return console.warn("`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script."),void(window.dataLayer=[]);t.each(function(){var e,t=c()(this),r=o||t.attr(u)||"auto",n=i||t.attr(l)||t[0].id,a=t.attr(f);if(a)try{e=JSON.parse(a)}catch(t){console.error("The element with tracking ID ".concat(n," and its element '").concat(a,"' contains JSON string in invalid format. These information will not be pushed into Google Tag Manager..."),a,t)}"auto"===r||t.on(r,function(t){s(n,t,e)})})}function d(){i(c()("[".concat(u,"]")))}c()(function(){o&&setTimeout(d,0)});var g={shouldTrackElement:function(t){return t=c()(t),Boolean(void 0!==t.attr(u))},trackEvent:s,registerForTracking:i};function y(){var t=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:a).autoRegister;o=t}var p=y,v=g;e.default=g,window.toolkitTracker=function(t){return y(t),g}},8:function(t,e){t.exports=jQuery}});