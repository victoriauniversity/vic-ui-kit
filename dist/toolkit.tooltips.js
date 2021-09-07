/** Version: 0.10.13 | Tuesday, September 7, 2021, 2:08 PM */
!function(i){var o={};function n(t){if(o[t])return o[t].exports;var e=o[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,n),e.l=!0,e.exports}n.m=i,n.c=o,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=15)}({0:function(t,e,i){"use strict";function o(t){if(300<=t.status||t.status<200){var e=new Error("Incorrect response HTTP status #".concat(t.status," (").concat(t.statusText,") received."));throw e.response=t,e}return t}function n(t){return null===t.offsetParent}function r(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function s(t,e){t.setAttribute(e,!1),t.removeAttribute(e)}function l(t){var e=t||(void 0!==window.navigator?window.navigator.userAgent:"");return/iPhone|iPod|iPad/i.test(e)&&!/Windows Phone/i.test(e)}i.d(e,"a",function(){return o}),i.d(e,"d",function(){return n}),i.d(e,"b",function(){return r}),i.d(e,"e",function(){return s}),i.d(e,"c",function(){return l})},15:function(t,e,i){"use strict";i.r(e);var p=i(0);function v(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}"NodeList"in window&&!NodeList.prototype.forEach&&(console.info("polyfill for IE11"),NodeList.prototype.forEach=function(t,e){e=e||window;for(var i=0;i<this.length;i++)t.call(e,this[i],i,this)});var y=window.toolkitTooltips||{};!function(){if(!window.toolkitTooltips){window.toolkitTooltips=y;var c,o,n,r="toolkit-tooltip",s="data-tooltip",u=20,a="hover",d="click",h=[],l=function(){function l(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=e.content,o=e.attributeNameContent,n=void 0===o?"title":o,r=e.trigger,s=void 0===r?a:r;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,l),this.sourceElement=t,this.content=i||t.getAttribute(n),this.triggerType=s,this.content?this.init():console.warn("There is no available content to show in the tooltip for element. The tooltip will not be created. ",this.sourceElement,this.content),this.bindEvents(),this.enhanceAccessibility()}var t,e,i;return t=l,(e=[{key:"destroy",value:function(){var t=h.indexOf(this);-1<t&&h.splice(t,1),0===h.length&&(c=void 0,document.body.removeChild(c))}},{key:"showTooltip",value:function(t){return Object(p.c)()&&(document.body.style.cursor="pointer"),Object(p.e)(this.sourceElement,"title"),this.sourceElement.setAttribute("aria-describedby",r),Object(p.e)(c,"hidden"),c.style.opacity=0,c.textContent=this.content,c.style.display="block",this.positionTooltip(),t}},{key:"hideTooltip",value:function(t){return c.style.opacity=0,this.sourceElement.setAttribute("title",this.content),Object(p.e)(this.sourceElement,"aria-describedby"),c.setAttribute("hidden",""),Object(p.c)()&&(document.body.style.cursor=null),c.style.display="none",t}},{key:"toggleTooltip",value:function(t){var e=this;Object(p.d)(c)?(n&&window.removeEventListener("click",n),n=this.handleClickOutsideTooltip.bind(this),window.addEventListener("click",n),this.showTooltip(t)):(window.removeEventListener("click",n),this.hideTooltip(t),o!==this.sourceElement&&setTimeout(function(){e.toggleTooltip(t)})),o=this.sourceElement}},{key:"init",value:function(){var t;h.push(this),1===h.length&&((t=document.createElement("div")).setAttribute("id",r),t.setAttribute("class","tooltip"),t.setAttribute("role","tooltip"),t.setAttribute("hidden",""),document.body.appendChild(t),c=t)}},{key:"bindEvents",value:function(){this.triggerType===d?this.sourceElement.addEventListener("click",this.toggleTooltip.bind(this)):this.triggerType===a?(this.bindMouseHovering(),this.bindAccessibilityFeatures()):console.error("Unsupported type of trigger `%s`. The tooltip will not be shown for your element",this.triggerType,this.sourceElement)}},{key:"bindAccessibilityFeatures",value:function(){this.sourceElement.addEventListener("focus",this.showTooltip.bind(this)),this.sourceElement.addEventListener("focusout",this.hideTooltip.bind(this)),this.sourceElement.addEventListener("keydown",this.hideTooltipOnEscKey.bind(this))}},{key:"bindMouseHovering",value:function(){this.sourceElement.addEventListener("mouseenter",this.showTooltip.bind(this)),this.sourceElement.addEventListener("mouseout",this.hideTooltip.bind(this))}},{key:"enhanceAccessibility",value:function(){this.sourceElement.setAttribute("tabindex",0)}},{key:"handleClickOutsideTooltip",value:function(t){t.target!==this.sourceElement&&t.target!==c&&(window.removeEventListener("click",n),this.hideTooltip(t))}},{key:"hideTooltipOnEscKey",value:function(t){return 27!==t.which||(this.hideTooltip(),t.preventDefault(),!1)}},{key:"getSourceElementCenterX",value:function(){return this.sourceElement.getBoundingClientRect().left+this.sourceElement.getBoundingClientRect().width/2}},{key:"calculateTooltipPositionX",value:function(){var t=Math.floor(c.getBoundingClientRect().width),e=window.innerWidth,i=this.getSourceElementCenterX(),o=i-20,n=i-t+20;return e<o+t&&0<=i-20?(c.classList.add("right"),n):(c.classList.add("left"),o)}},{key:"calculateTooltipPositionY",value:function(){var t=c.getBoundingClientRect().height,e=window.window.pageYOffset,i=e+window.innerHeight,o=this.sourceElement.getBoundingClientRect().top,n=o+this.sourceElement.getBoundingClientRect().height,r=o-16-t,s=n+16;return(r<u&&n+16+t<=i-u?(c.classList.add("top"),s):(c.classList.add("bottom"),r))+e}},{key:"setTooltipWidth",value:function(){var t=Math.floor(c.getBoundingClientRect().width),e=window.innerWidth,i=this.getSourceElementCenterX(),o=e-(i-20),n=i-t+20+t;c.style.width="".concat(t<=o-u||t<=n-u?t+1:o<n?n-u:o-u,"px")}},{key:"positionTooltip",value:function(){c.classList.remove("left"),c.classList.remove("right"),c.classList.remove("top"),c.classList.remove("bottom"),c.style.width="",c.style.height="",this.setTooltipWidth(),c.style.left="".concat(this.calculateTooltipPositionX(),"px"),c.style.top="".concat(this.calculateTooltipPositionY(),"px"),c.style.opacity=1}}])&&v(t.prototype,e),i&&v(t,i),l}();y.initTooltip=f,y.initTooltips=function(t){var e=t||document.querySelectorAll("[".concat(s,"]")),i=[];return e.forEach(function(t){return i.push(f(t))}),0<i.length?i:null},y.getAllTooltips=function(){return h},y.destroyAllTooltips=function(){for(;h.length;)h[0].destroy();return!0}}function f(e,t){var i=t,o=e.getAttribute(s);if(!i&&o&&""!==i)try{i=JSON.parse(o)}catch(t){console.error("Custom configuration options for a tooltip MUST be in a valid JSON format: ",o,e,t)}return new l(e,i)}}(),e.default=y}});