/** Version: 0.10.13 | Monday, August 1, 2022, 11:55 AM */
!function(n){var r={};function o(t){if(r[t])return r[t].exports;var e=r[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=n,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=16)}([function(t,e,n){"use strict";function r(t){if(300<=t.status||t.status<200){var e=new Error("Incorrect response HTTP status #".concat(t.status," (").concat(t.statusText,") received."));throw e.response=t,e}return t}function o(t){return null===t.offsetParent}function i(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function a(t,e){t.setAttribute(e,!1),t.removeAttribute(e)}function u(t){var e=t||(void 0!==window.navigator?window.navigator.userAgent:"");return/iPhone|iPod|iPad/i.test(e)&&!/Windows Phone/i.test(e)}n.d(e,"a",function(){return r}),n.d(e,"d",function(){return o}),n.d(e,"b",function(){return i}),n.d(e,"e",function(){return a}),n.d(e,"c",function(){return u})},function(t,e,n){"use strict";n.r(e);var r=n(5),o=function(){if(window.toolkitUrlManager)return window.toolkitUrlManager;return r.onLoadWhenQueryExists=function(t,e){r.queryString(t)&&(window.onDocumentReadyFunctions?window.onDocumentReadyFunctions.push(e):console.warn("`onDocumentReadyFunctions` Array is not available on the global scope - Cannot run the handler function for existing query `%s`.",t,e))},window.toolkitUrlManager=r}();e.default=o},function(e,t,n){(function(W,J){!function(t){"use strict";"function"==typeof bootstrap?bootstrap("promise",t):e.exports=t()}(function(){"use strict";var u=!1;try{throw new Error}catch(t){u=!!t.stack}var o,i=T(),e=function(){},f=function(){var n={task:void 0,next:null},e=n,r=!1,o=void 0,i=!1,a=[];function u(){for(var t,e;n.next;)t=(n=n.next).task,n.task=void 0,(e=n.domain)&&(n.domain=void 0,e.enter()),c(t,e);for(;a.length;)c(t=a.pop());r=!1}function c(t,e){try{t()}catch(t){if(i)throw e&&e.exit(),setTimeout(u,0),e&&e.enter(),t;setTimeout(function(){throw t},0)}e&&e.exit()}if(f=function(t){e=e.next={task:t,domain:i&&W.domain,next:null},r||(r=!0,o())},"object"==typeof W&&"[object process]"===W.toString()&&W.nextTick)i=!0,o=function(){W.nextTick(u)};else if("function"==typeof J)o="undefined"!=typeof window?J.bind(window,u):function(){J(u)};else if("undefined"!=typeof MessageChannel){var t=new MessageChannel;t.port1.onmessage=function(){o=s,(t.port1.onmessage=u)()};var s=function(){t.port2.postMessage(0)};o=function(){setTimeout(u,0),s()}}else o=function(){setTimeout(u,0)};return f.runAfter=function(t){a.push(t),r||(r=!0,o())},f}(),n=Function.call;function t(t){return function(){return n.apply(t,arguments)}}var c,s=t(Array.prototype.slice),l=t(Array.prototype.reduce||function(t,e){var n=0,r=this.length;if(1===arguments.length)for(;;){if(n in this){e=this[n++];break}if(++n>=r)throw new TypeError}for(;n<r;n++)n in this&&(e=t(e,this[n],n));return e}),a=t(Array.prototype.indexOf||function(t){for(var e=0;e<this.length;e++)if(this[e]===t)return e;return-1}),r=t(Array.prototype.map||function(r,o){var i=this,a=[];return l(i,function(t,e,n){a.push(r.call(o,e,n,i))},void 0),a}),p=Object.create||function(t){function e(){}return e.prototype=t,new e},d=Object.defineProperty||function(t,e,n){return t[e]=n.value,t},h=t(Object.prototype.hasOwnProperty),y=Object.keys||function(t){var e=[];for(var n in t)h(t,n)&&e.push(n);return e},m=t(Object.prototype.toString);c="undefined"!=typeof ReturnValue?ReturnValue:function(t){this.value=t};var v="From previous event:";function b(t,e){if(u&&e.stack&&"object"==typeof t&&null!==t&&t.stack){for(var n=[],r=e;r;r=r.source)r.stack&&(!t.__minimumStackCounter__||t.__minimumStackCounter__>r.stackCounter)&&(d(t,"__minimumStackCounter__",{value:r.stackCounter,configurable:!0}),n.unshift(r.stack));n.unshift(t.stack);var o=function(t){for(var e=t.split("\n"),n=[],r=0;r<e.length;++r){var o=e[r];!g(o)&&(-1===(i=o).indexOf("(module.js:")&&-1===i.indexOf("(node.js:"))&&o&&n.push(o)}var i;return n.join("\n")}(n.join("\n"+v+"\n"));d(t,"stack",{value:o,configurable:!0})}}function w(t){var e=/at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);if(e)return[e[1],Number(e[2])];var n=/at ([^ ]+):(\d+):(?:\d+)$/.exec(t);if(n)return[n[1],Number(n[2])];var r=/.*@(.+):(\d+)$/.exec(t);return r?[r[1],Number(r[2])]:void 0}function g(t){var e=w(t);if(!e)return!1;var n=e[0],r=e[1];return n===o&&i<=r&&r<=V}function T(){if(u)try{throw new Error}catch(t){var e=t.stack.split("\n"),n=w(0<e[0].indexOf("@")?e[1]:e[2]);if(!n)return;return o=n[0],n[1]}}function j(t){return t instanceof _?t:R(t)?(e=t,n=x(),j.nextTick(function(){try{e.then(n.resolve,n.reject,n.notify)}catch(t){n.reject(t)}}),n.promise):N(t);var e,n}(j.resolve=j).nextTick=f,j.longStackSupport=!1;var k=1;function x(){var o,i=[],a=[],t=p(x.prototype),e=p(_.prototype);if(e.promiseDispatch=function(t,e,n){var r=s(arguments);i?(i.push(r),"when"===e&&n[1]&&a.push(n[1])):j.nextTick(function(){o.promiseDispatch.apply(o,r)})},e.valueOf=function(){if(i)return e;var t=P(o);return A(t)&&(o=t),t},e.inspect=function(){return o?o.inspect():{state:"pending"}},j.longStackSupport&&u)try{throw new Error}catch(t){e.stack=t.stack.substring(t.stack.indexOf("\n")+1),e.stackCounter=k++}function n(n){o=n,j.longStackSupport&&u&&(e.source=n),l(i,function(t,e){j.nextTick(function(){n.promiseDispatch.apply(n,e)})},void 0),a=i=void 0}return t.promise=e,t.resolve=function(t){o||n(j(t))},t.fulfill=function(t){o||n(N(t))},t.reject=function(t){o||n(M(t))},t.notify=function(n){o||l(a,function(t,e){j.nextTick(function(){e(n)})},void 0)},t}function S(t){if("function"!=typeof t)throw new TypeError("resolver must be a function.");var e=x();try{t(e.resolve,e.reject,e.notify)}catch(t){e.reject(t)}return e.promise}function E(o){return S(function(t,e){for(var n=0,r=o.length;n<r;n++)j(o[n]).then(t,e)})}function _(o,i,e){void 0===i&&(i=function(t){return M(new Error("Promise does not support operation: "+t))}),void 0===e&&(e=function(){return{state:"unknown"}});var a=p(_.prototype);if(a.promiseDispatch=function(t,e,n){var r;try{r=o[e]?o[e].apply(a,n):i.call(a,e,n)}catch(t){r=M(t)}t&&t(r)},a.inspect=e){var t=e();"rejected"===t.state&&(a.exception=t.reason),a.valueOf=function(){var t=e();return"pending"===t.state||"rejected"===t.state?a:t.value}}return a}function O(t,e,n,r){return j(t).then(e,n,r)}function P(t){if(A(t)){var e=t.inspect();if("fulfilled"===e.state)return e.value}return t}function A(t){return t instanceof _}function R(t){return(e=t)===Object(e)&&"function"==typeof t.then;var e}"object"==typeof W&&W&&W.env&&W.env.Q_DEBUG&&(j.longStackSupport=!0),(j.defer=x).prototype.makeNodeResolver=function(){var n=this;return function(t,e){t?n.reject(t):2<arguments.length?n.resolve(s(arguments,1)):n.resolve(e)}},j.Promise=S,(j.promise=S).race=E,S.all=Q,S.reject=M,(S.resolve=j).passByCopy=function(t){return t},_.prototype.passByCopy=function(){return this},j.join=function(t,e){return j(t).join(e)},_.prototype.join=function(t){return j([this,t]).spread(function(t,e){if(t===e)return t;throw new Error("Q can't join: not the same: "+t+" "+e)})},j.race=E,_.prototype.race=function(){return this.then(j.race)},(j.makePromise=_).prototype.toString=function(){return"[object Promise]"},_.prototype.then=function(e,n,o){var r=this,i=x(),a=!1;return j.nextTick(function(){r.promiseDispatch(function(t){a||(a=!0,i.resolve(function(t){try{return"function"==typeof e?e(t):t}catch(t){return M(t)}}(t)))},"when",[function(t){a||(a=!0,i.resolve(function(t){if("function"==typeof n){b(t,r);try{return n(t)}catch(t){return M(t)}}return M(t)}(t)))}])}),r.promiseDispatch(void 0,"when",[void 0,function(t){var e,n,r=!1;try{n=t,e="function"==typeof o?o(n):n}catch(t){if(r=!0,!j.onerror)throw t;j.onerror(t)}r||i.notify(e)}]),i.promise},j.tap=function(t,e){return j(t).tap(e)},_.prototype.tap=function(e){return e=j(e),this.then(function(t){return e.fcall(t).thenResolve(t)})},j.when=O,_.prototype.thenResolve=function(t){return this.then(function(){return t})},j.thenResolve=function(t,e){return j(t).thenResolve(e)},_.prototype.thenReject=function(t){return this.then(function(){throw t})},j.thenReject=function(t,e){return j(t).thenReject(e)},j.nearer=P,j.isPromise=A,j.isPromiseAlike=R,j.isPending=function(t){return A(t)&&"pending"===t.inspect().state},_.prototype.isPending=function(){return"pending"===this.inspect().state},j.isFulfilled=function(t){return!A(t)||"fulfilled"===t.inspect().state},_.prototype.isFulfilled=function(){return"fulfilled"===this.inspect().state},j.isRejected=function(t){return A(t)&&"rejected"===t.inspect().state},_.prototype.isRejected=function(){return"rejected"===this.inspect().state};var I,L,U,B=[],C=[],D=[],F=!0;function q(){B.length=0,C.length=0,F||(F=!0)}function M(e){var t,n,r=_({when:function(t){return t&&function(e){if(F){var n=a(C,e);-1!==n&&("object"==typeof W&&"function"==typeof W.emit&&j.nextTick.runAfter(function(){var t=a(D,e);-1!==t&&(W.emit("rejectionHandled",B[n],e),D.splice(t,1))}),C.splice(n,1),B.splice(n,1))}}(this),t?t(e):this}},function(){return this},function(){return{state:"rejected",reason:e}});return t=r,n=e,F&&("object"==typeof W&&"function"==typeof W.emit&&j.nextTick.runAfter(function(){-1!==a(C,t)&&(W.emit("unhandledRejection",n,t),D.push(t))}),C.push(t),n&&void 0!==n.stack?B.push(n.stack):B.push("(no stack) "+n)),r}function N(n){return _({when:function(){return n},get:function(t){return n[t]},set:function(t,e){n[t]=e},delete:function(t){delete n[t]},post:function(t,e){return null==t?n.apply(void 0,e):n[t].apply(n,e)},apply:function(t,e){return n.apply(t,e)},keys:function(){return y(n)}},void 0,function(){return{state:"fulfilled",value:n}})}function $(t,e,n){return j(t).spread(e,n)}function H(t,e,n){return j(t).dispatch(e,n)}function Q(t){return O(t,function(o){var i=0,a=x();return l(o,function(t,e,n){var r;A(e)&&"fulfilled"===(r=e.inspect()).state?o[n]=r.value:(++i,O(e,function(t){o[n]=t,0==--i&&a.resolve(o)},a.reject,function(t){a.notify({index:n,value:t})}))},void 0),0===i&&a.resolve(o),a.promise})}function z(o){if(0===o.length)return j.resolve();var i=j.defer(),a=0;return l(o,function(t,e,n){var r=o[n];a++,O(r,function(t){i.resolve(t)},function(t){if(0==--a){var e=t||new Error(""+t);e.message="Q can't get fulfillment value from any promise, all promises were rejected. Last error message: "+e.message,i.reject(e)}},function(t){i.notify({index:n,value:t})})},void 0),i.promise}function G(t){return O(t,function(t){return t=r(t,j),O(Q(r(t,function(t){return O(t,e,e)})),function(){return t})})}j.resetUnhandledRejections=q,j.getUnhandledReasons=function(){return B.slice()},j.stopUnhandledRejectionTracking=function(){q(),F=!1},q(),j.reject=M,j.fulfill=N,j.master=function(n){return _({isDef:function(){}},function(t,e){return H(n,t,e)},function(){return j(n).inspect()})},j.spread=$,_.prototype.spread=function(e,t){return this.all().then(function(t){return e.apply(void 0,t)},t)},j.async=function(e){return function(){function t(t,e){var n,r;if("undefined"==typeof StopIteration){try{n=o[t](e)}catch(t){return M(t)}return n.done?j(n.value):O(n.value,i,a)}try{n=o[t](e)}catch(t){return"[object StopIteration]"===m(r=t)||r instanceof c?j(t.value):M(t)}return O(n,i,a)}var o=e.apply(this,arguments),i=t.bind(t,"next"),a=t.bind(t,"throw");return i()}},j.spawn=function(t){j.done(j.async(t)())},j.return=function(t){throw new c(t)},j.promised=function(n){return function(){return $([this,Q(arguments)],function(t,e){return n.apply(t,e)})}},j.dispatch=H,_.prototype.dispatch=function(t,e){var n=this,r=x();return j.nextTick(function(){n.promiseDispatch(r.resolve,t,e)}),r.promise},j.get=function(t,e){return j(t).dispatch("get",[e])},_.prototype.get=function(t){return this.dispatch("get",[t])},j.set=function(t,e,n){return j(t).dispatch("set",[e,n])},_.prototype.set=function(t,e){return this.dispatch("set",[t,e])},j.del=j.delete=function(t,e){return j(t).dispatch("delete",[e])},_.prototype.del=_.prototype.delete=function(t){return this.dispatch("delete",[t])},j.mapply=j.post=function(t,e,n){return j(t).dispatch("post",[e,n])},_.prototype.mapply=_.prototype.post=function(t,e){return this.dispatch("post",[t,e])},j.send=j.mcall=j.invoke=function(t,e){return j(t).dispatch("post",[e,s(arguments,2)])},_.prototype.send=_.prototype.mcall=_.prototype.invoke=function(t){return this.dispatch("post",[t,s(arguments,1)])},j.fapply=function(t,e){return j(t).dispatch("apply",[void 0,e])},_.prototype.fapply=function(t){return this.dispatch("apply",[void 0,t])},j.try=j.fcall=function(t){return j(t).dispatch("apply",[void 0,s(arguments,1)])},_.prototype.fcall=function(){return this.dispatch("apply",[void 0,s(arguments)])},j.fbind=function(t){var e=j(t),n=s(arguments,1);return function(){return e.dispatch("apply",[this,n.concat(s(arguments))])}},_.prototype.fbind=function(){var t=this,e=s(arguments);return function(){return t.dispatch("apply",[this,e.concat(s(arguments))])}},j.keys=function(t){return j(t).dispatch("keys",[])},_.prototype.keys=function(){return this.dispatch("keys",[])},j.all=Q,_.prototype.all=function(){return Q(this)},j.any=z,_.prototype.any=function(){return z(this)},j.allResolved=(I=G,L="allResolved",U="allSettled",function(){return"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(L+" is deprecated, use "+U+" instead.",new Error("").stack),I.apply(I,arguments)}),_.prototype.allResolved=function(){return G(this)},j.allSettled=function(t){return j(t).allSettled()},_.prototype.allSettled=function(){return this.then(function(t){return Q(r(t,function(t){function e(){return t.inspect()}return(t=j(t)).then(e,e)}))})},j.fail=j.catch=function(t,e){return j(t).then(void 0,e)},_.prototype.fail=_.prototype.catch=function(t){return this.then(void 0,t)},j.progress=function(t,e){return j(t).then(void 0,void 0,e)},_.prototype.progress=function(t){return this.then(void 0,void 0,t)},j.fin=j.finally=function(t,e){return j(t).finally(e)},_.prototype.fin=_.prototype.finally=function(e){if(!e||"function"!=typeof e.apply)throw new Error("Q can't apply finally callback");return e=j(e),this.then(function(t){return e.fcall().then(function(){return t})},function(t){return e.fcall().then(function(){throw t})})},j.done=function(t,e,n,r){return j(t).done(e,n,r)},_.prototype.done=function(t,e,n){var r=function(t){j.nextTick(function(){if(b(t,o),!j.onerror)throw t;j.onerror(t)})},o=t||e||n?this.then(t,e,n):this;"object"==typeof W&&W&&W.domain&&(r=W.domain.bind(r)),o.then(void 0,r)},j.timeout=function(t,e,n){return j(t).timeout(e,n)},_.prototype.timeout=function(t,e){var n=x(),r=setTimeout(function(){e&&"string"!=typeof e||((e=new Error(e||"Timed out after "+t+" ms")).code="ETIMEDOUT"),n.reject(e)},t);return this.then(function(t){clearTimeout(r),n.resolve(t)},function(t){clearTimeout(r),n.reject(t)},n.notify),n.promise},j.delay=function(t,e){return void 0===e&&(e=t,t=void 0),j(t).delay(e)},_.prototype.delay=function(n){return this.then(function(t){var e=x();return setTimeout(function(){e.resolve(t)},n),e.promise})},j.nfapply=function(t,e){return j(t).nfapply(e)},_.prototype.nfapply=function(t){var e=x(),n=s(t);return n.push(e.makeNodeResolver()),this.fapply(n).fail(e.reject),e.promise},j.nfcall=function(t){var e=s(arguments,1);return j(t).nfapply(e)},_.prototype.nfcall=function(){var t=s(arguments),e=x();return t.push(e.makeNodeResolver()),this.fapply(t).fail(e.reject),e.promise},j.nfbind=j.denodeify=function(n){if(void 0===n)throw new Error("Q can't wrap an undefined function");var r=s(arguments,1);return function(){var t=r.concat(s(arguments)),e=x();return t.push(e.makeNodeResolver()),j(n).fapply(t).fail(e.reject),e.promise}},_.prototype.nfbind=_.prototype.denodeify=function(){var t=s(arguments);return t.unshift(this),j.denodeify.apply(void 0,t)},j.nbind=function(n,r){var o=s(arguments,2);return function(){var t=o.concat(s(arguments)),e=x();return t.push(e.makeNodeResolver()),j(function(){return n.apply(r,arguments)}).fapply(t).fail(e.reject),e.promise}},_.prototype.nbind=function(){var t=s(arguments,0);return t.unshift(this),j.nbind.apply(void 0,t)},j.nmapply=j.npost=function(t,e,n){return j(t).npost(e,n)},_.prototype.nmapply=_.prototype.npost=function(t,e){var n=s(e||[]),r=x();return n.push(r.makeNodeResolver()),this.dispatch("post",[t,n]).fail(r.reject),r.promise},j.nsend=j.nmcall=j.ninvoke=function(t,e){var n=s(arguments,2),r=x();return n.push(r.makeNodeResolver()),j(t).dispatch("post",[e,n]).fail(r.reject),r.promise},_.prototype.nsend=_.prototype.nmcall=_.prototype.ninvoke=function(t){var e=s(arguments,1),n=x();return e.push(n.makeNodeResolver()),this.dispatch("post",[t,e]).fail(n.reject),n.promise},j.nodeify=function(t,e){return j(t).nodeify(e)},_.prototype.nodeify=function(e){if(!e)return this;this.then(function(t){j.nextTick(function(){e(null,t)})},function(t){j.nextTick(function(){e(t)})})},j.noConflict=function(){throw new Error("Q.noConflict only works when Q is used as a global")};var V=T();return j})}).call(this,n(3),n(10).setImmediate)},function(t,e){var n,r,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(t){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var c,s=[],f=!1,l=-1;function p(){f&&c&&(f=!1,c.length?s=c.concat(s):l=-1,s.length&&d())}function d(){if(!f){var t=u(p);f=!0;for(var e=s.length;e;){for(c=s,s=[];++l<e;)c&&c[l].run();l=-1,e=s.length}c=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(t)}}function h(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new h(t,e)),1!==s.length||f||u(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var r,o,i;function a(t){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var u,c="function"==typeof Symbol&&"symbol"===a(Symbol.iterator)?function(t){return a(t)}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":a(t)};u=function(){return function o(i,a,u){function c(n,t){if(!a[n]){if(!i[n]){if(s)return s(n,!0);var e=new Error("Cannot find module '"+n+"'");throw e.code="MODULE_NOT_FOUND",e}var r=a[n]={exports:{}};i[n][0].call(r.exports,function(t){var e=i[n][1][t];return c(e||t)},r,r.exports,o,i,a,u)}return a[n].exports}for(var s=!1,t=0;t<u.length;t++)c(u[t]);return c}({1:[function(t,e,n){window.addEventListener("popstate",function(t){a.triggerPopStateCb(t)});var a=e.exports={_onPopStateCbs:[],_isHash:!1,queryString:function(t,e){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+t+"=([^&#]*)"),r=n.exec(location.search),o=null;return null===r?!!(n=new RegExp("[\\?&]"+t+"(\\&([^&#]*)|$)")).test(location.search)||void 0:(o=r[1].replace(/\+/g," "),e?o:decodeURIComponent(o))},parseQuery:function(t){var e={};if("string"!=typeof t&&(t=window.location.search),!(t=t.replace(/^\?/g,"")))return{};for(var n,r=t.split("&"),o=0,i=null;o<r.length;++o)i=(n=r[o].indexOf("="))<0?(n=r[o].length,!0):decodeURIComponent(r[o].slice(n+1)),e[decodeURIComponent(r[o].slice(0,n))]=i;return e},stringify:function(n){if(!n||n.constructor!==Object)throw new Error("Query object should be an object.");var r="";return Object.keys(n).forEach(function(t){var e=n[t];r+=t,!0!==e&&(r+="="+encodeURIComponent(n[t])),r+="&"}),r=r.replace(/\&$/g,"")},updateSearchParam:function(t,e,n,r){var o=this.parseQuery();if(void 0===e)delete o[t];else{if(o[t]===e)return a;o[t]=e}var i="?"+this.stringify(o);return this._updateAll(window.location.pathname+i+location.hash,n,r),a},getLocation:function(){return window.location.pathname+window.location.search+window.location.hash},hash:function(t,e){return void 0===t?location.hash.substring(1):(e||(setTimeout(function(){a._isHash=!1},0),a._isHash=!0),location.hash=t)},_updateAll:function(t,e,n){return window.history[e?"pushState":"replaceState"](null,"",t),n&&a.triggerPopStateCb({}),t},pathname:function(t,e,n){return void 0===t?location.pathname:this._updateAll(t+window.location.search+window.location.hash,e,n)},triggerPopStateCb:function(e){this._isHash||this._onPopStateCbs.forEach(function(t){t(e)})},onPopState:function(t){this._onPopStateCbs.push(t)},removeHash:function(){this._updateAll(window.location.pathname+window.location.search,!1,!1)},removeQuery:function(){this._updateAll(window.location.pathname+window.location.hash,!1,!1)},version:"2.3.1"}},{}]},{},[1])(1)},"object"===c(e)&&void 0!==t?t.exports=u():(o=[],void 0===(i="function"==typeof(r=u)?r.apply(e,o):r)||(t.exports=i))},function(t,e,n){var d,h,y;d={},h=0,y=function(t){var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)},t.exports=function(t,e,n){var r;e&&"function"!=typeof e&&(n=e.context||n,r=e.setup,e=e.callback);var o,i,a=document.createElement("script"),u=!1,c=function(){u||(u=!0,i(),e&&e.call(n,o))},s=function(){o=new Error(t||"EMPTY"),c()};if(!a.readyState||"async"in a)i=function(){a.onload=a.onerror=null},a.onerror=s,a.onload=c,a.async=!0,a.charset="utf-8",r&&r.call(n,a),a.src=t,y(a);else{var f=h++,l={loaded:!0,complete:!0},p=!1;i=function(){a.onreadystatechange=a.onerror=null,d[f]=void 0},a.onreadystatechange=function(){var t=a.readyState;if(!o){if(!p&&l[t]&&(p=!0,y(a)),"loaded"===t&&(a.children,"loading"===a.readyState))return s();"complete"===a.readyState&&c()}},a.onerror=s,d[f]=a,r&&r.call(n,a),a.src=t}}},,,function(t,e,n){"use strict";n.r(e);var r=n(6),f=n.n(r),o=n(2),l=n.n(o),i="URLSearchParams"in self,a="Symbol"in self&&"iterator"in Symbol,u="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),c="FormData"in self,s="ArrayBuffer"in self;if(s)var p=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],d=ArrayBuffer.isView||function(t){return t&&-1<p.indexOf(Object.prototype.toString.call(t))};function h(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function y(t){return"string"!=typeof t&&(t=String(t)),t}function m(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return a&&(t[Symbol.iterator]=function(){return t}),t}function v(e){this.map={},e instanceof v?e.forEach(function(t,e){this.append(e,t)},this):Array.isArray(e)?e.forEach(function(t){this.append(t[0],t[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function b(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function w(n){return new Promise(function(t,e){n.onload=function(){t(n.result)},n.onerror=function(){e(n.error)}})}function g(t){var e=new FileReader,n=w(e);return e.readAsArrayBuffer(t),n}function T(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function j(){return this.bodyUsed=!1,this._initBody=function(t){var e;(this._bodyInit=t)?"string"==typeof t?this._bodyText=t:u&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:c&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:i&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():s&&u&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=T(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):s&&(ArrayBuffer.prototype.isPrototypeOf(t)||d(t))?this._bodyArrayBuffer=T(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):i&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},u&&(this.blob=function(){var t=b(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?b(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(g)}),this.text=function(){var t,e,n,r=b(this);if(r)return r;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,n=w(e),e.readAsText(t),n;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),n=new Array(e.length),r=0;r<e.length;r++)n[r]=String.fromCharCode(e[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},c&&(this.formData=function(){return this.text().then(S)}),this.json=function(){return this.text().then(JSON.parse)},this}v.prototype.append=function(t,e){t=h(t),e=y(e);var n=this.map[t];this.map[t]=n?n+", "+e:e},v.prototype.delete=function(t){delete this.map[h(t)]},v.prototype.get=function(t){return t=h(t),this.has(t)?this.map[t]:null},v.prototype.has=function(t){return this.map.hasOwnProperty(h(t))},v.prototype.set=function(t,e){this.map[h(t)]=y(e)},v.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},v.prototype.keys=function(){var n=[];return this.forEach(function(t,e){n.push(e)}),m(n)},v.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),m(e)},v.prototype.entries=function(){var n=[];return this.forEach(function(t,e){n.push([e,t])}),m(n)},a&&(v.prototype[Symbol.iterator]=v.prototype.entries);var k=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function x(t,e){var n,r,o=(e=e||{}).body;if(t instanceof x){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new v(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new v(e.headers)),this.method=(n=e.method||this.method||"GET",r=n.toUpperCase(),-1<k.indexOf(r)?r:n),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function S(t){var o=new FormData;return t.trim().split("&").forEach(function(t){if(t){var e=t.split("="),n=e.shift().replace(/\+/g," "),r=e.join("=").replace(/\+/g," ");o.append(decodeURIComponent(n),decodeURIComponent(r))}}),o}function E(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=200<=this.status&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new v(e.headers),this.url=e.url||"",this._initBody(t)}x.prototype.clone=function(){return new x(this,{body:this._bodyInit})},j.call(x.prototype),j.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new v(this.headers),url:this.url})},E.error=function(){var t=new E(null,{status:0,statusText:""});return t.type="error",t};var _=[301,302,303,307,308];E.redirect=function(t,e){if(-1===_.indexOf(e))throw new RangeError("Invalid status code");return new E(null,{status:e,headers:{location:t}})};var O=self.DOMException;try{new O}catch(t){(O=function(t,e){this.message=t,this.name=e;var n=Error(t);this.stack=n.stack}).prototype=Object.create(Error.prototype),O.prototype.constructor=O}function P(o,a){return new Promise(function(r,t){var e=new x(o,a);if(e.signal&&e.signal.aborted)return t(new O("Aborted","AbortError"));var i=new XMLHttpRequest;function n(){i.abort()}i.onload=function(){var t,o,e={status:i.status,statusText:i.statusText,headers:(t=i.getAllResponseHeaders()||"",o=new v,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var e=t.split(":"),n=e.shift().trim();if(n){var r=e.join(":").trim();o.append(n,r)}}),o)};e.url="responseURL"in i?i.responseURL:e.headers.get("X-Request-URL");var n="response"in i?i.response:i.responseText;r(new E(n,e))},i.onerror=function(){t(new TypeError("Network request failed"))},i.ontimeout=function(){t(new TypeError("Network request failed"))},i.onabort=function(){t(new O("Aborted","AbortError"))},i.open(e.method,e.url,!0),"include"===e.credentials?i.withCredentials=!0:"omit"===e.credentials&&(i.withCredentials=!1),"responseType"in i&&u&&(i.responseType="blob"),e.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),e.signal&&(e.signal.addEventListener("abort",n),i.onreadystatechange=function(){4===i.readyState&&e.signal.removeEventListener("abort",n)}),i.send(void 0===e._bodyInit?null:e._bodyInit)})}P.polyfill=!0,self.fetch||(self.fetch=P,self.Headers=v,self.Request=x,self.Response=E);var A=n(0),R=function(){if(window.lazyLoader)return window.lazyLoader;var s={};function r(t){var e,n,r=l.a.defer(),o=t.url,i=t.namespace,a=t.onSuccess;function u(t){return Object(A.b)(s,o)||(s[o]=t),r.resolve(t),a&&a(t),r.promise}if(Object(A.b)(s,o))return u(s[o]);if(o.match(/.*\.js$/)){if(i&&Object(A.b)(window,i))return u(window[i]);f()(o,function(t){t?r.reject(t):i&&Object(A.b)(window,i)?u(window[i]):(i&&console.warn("Javascript might be loaded, but the library is not available on the given global scope/namespace `window.%s`!",i),u(null))})}else if(o.match(/.*\.css$/)){var c=document.querySelector('link[href*="'.concat(o,'"]'));u(c||(e=o,(n=document.createElement("link")).href=e,n.type="text/css",n.rel="stylesheet",document.getElementsByTagName("head")[0].appendChild(n),n))}else window.fetch(o,{credentials:"same-origin",mode:"cors"}).then(A.a).then(function(t){return t.json()}).then(function(t){u(t)}).catch(function(t){r.reject(t)});return r.promise}var t=function(t,n){var e=t.map(function(t){return r(t)});l.a.allSettled(e).then(function(t){var e;t.forEach(function(t){"rejected"===t.state&&(e||(e=[]),e.push(t.reason))}),n(e)}).catch(function(t){n("Error when processing or retrieving the requested resources. ".concat(t))}).done()};return window.lazyLoader=t}();e.default=R},function(t,o,i){(function(t){var e=void 0!==t&&t||"undefined"!=typeof self&&self||window,n=Function.prototype.apply;function r(t,e){this._id=t,this._clearFn=e}o.setTimeout=function(){return new r(n.call(setTimeout,e,arguments),clearTimeout)},o.setInterval=function(){return new r(n.call(setInterval,e,arguments),clearInterval)},o.clearTimeout=o.clearInterval=function(t){t&&t.close()},r.prototype.unref=r.prototype.ref=function(){},r.prototype.close=function(){this._clearFn.call(e,this._id)},o.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},o.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},o._unrefActive=o.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;0<=e&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},i(11),o.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,o.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(this,i(4))},function(t,e,n){(function(t,h){!function(n,r){"use strict";if(!n.setImmediate){var o,i,e,a,t,u=1,c={},s=!1,f=n.document,l=Object.getPrototypeOf&&Object.getPrototypeOf(n);l=l&&l.setTimeout?l:n,o="[object process]"==={}.toString.call(n.process)?function(t){h.nextTick(function(){d(t)})}:function(){if(n.postMessage&&!n.importScripts){var t=!0,e=n.onmessage;return n.onmessage=function(){t=!1},n.postMessage("","*"),n.onmessage=e,t}}()?(a="setImmediate$"+Math.random()+"$",t=function(t){t.source===n&&"string"==typeof t.data&&0===t.data.indexOf(a)&&d(+t.data.slice(a.length))},n.addEventListener?n.addEventListener("message",t,!1):n.attachEvent("onmessage",t),function(t){n.postMessage(a+t,"*")}):n.MessageChannel?((e=new MessageChannel).port1.onmessage=function(t){d(t.data)},function(t){e.port2.postMessage(t)}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,function(t){var e=f.createElement("script");e.onreadystatechange=function(){d(t),e.onreadystatechange=null,i.removeChild(e),e=null},i.appendChild(e)}):function(t){setTimeout(d,0,t)},l.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var r={callback:t,args:e};return c[u]=r,o(u),u++},l.clearImmediate=p}function p(t){delete c[t]}function d(t){if(s)setTimeout(d,0,t);else{var e=c[t];if(e){s=!0;try{!function(t){var e=t.callback,n=t.args;switch(n.length){case 0:e();break;case 1:e(n[0]);break;case 2:e(n[0],n[1]);break;case 3:e(n[0],n[1],n[2]);break;default:e.apply(r,n)}}(e)}finally{p(t),s=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(this,n(4),n(3))},,,,,function(t,e,n){"use strict";n.r(e),n.d(e,"initToolbarUrlListeners",function(){return o}),n.d(e,"initToolbarLoader",function(){return i});var r=n(1),u=n(9);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var s=n(17);document.getElementById("clickLinks")&&(navigator.userAgent.match(/baidu|bing|msn|teoma|slurp|yandex|funnelback/i)||(document.getElementById("clickLinks").style.display="none"));new URLSearchParams(window.location.search);function o(){r.default.onLoadWhenQueryExists("toolbar",function(){window.toolkitToolbarLoader&&window.toolkitToolbarLoader("https://www.wgtn.ac.nz/api/toolbar/staff")}),r.default.onLoadWhenQueryExists("mytools",function(){window.toolkitToolbarLoader&&(document.location.href="https://puaha.wgtn.ac.nz/signin")})}function i(o){var i="toolkitToolbar",t="production"===s.name?".min":"",a="//".concat(s.server.host).concat("development"===s.name?":".concat(s.server.port):"","/toolkit.toolbar").concat(t,".js");window.toolkitToolbarLoader=function(t){var e="string"==typeof t?t:null,n="object"===c(t)?t:void 0,r=[{url:a,namespace:i}];if(o&&0<o.length&&o.forEach(function(t){return r.push(t)}),!n&&e)r.push({url:e,onSuccess:function(t){n=t}});else if(!n)return void console.error("A toolbar requires valid configuration and model object or URL (%s) to the RESTful API endpoint that would return this object. Toolbar dialog will not be opened.",e,n);Object(u.default)(r,function(t){if(t)console.error("Unable to lazy load all the dependencies required to initialise and open the Toolbar dialog.",t);else{var e=window[i];if(e)try{e.initToolbar(n).show()}catch(t){console.error(t)}else console.error("Toolbar library is not available on the global scope (window.".concat(i,") - the toolbar dialog will not be initialised and opened."))}})}}document.addEventListener("DOMContentLoaded",function(t){var r;(r=".course-item-list",new Promise(function(e){if(document.querySelector(r))return e(document.querySelector(r));var n=new MutationObserver(function(t){document.querySelector(r)&&(e(document.querySelector(r)),n.disconnect())});n.observe(document.body,{childList:!0,subtree:!0})})).then(function(){!function(){if(window.location.pathname.includes("/courses/")){var e=function(){o.addEventListener("change",function(t){r()})},n=function(){var t=document.querySelector(".fees-est .cost-items > div:nth-child(3)"),e=document.querySelector(".fees-est .cost-items > div:nth-child(4)"),n=document.querySelector(".cost-items > div:last-child");t&&t.remove(),e&&e.remove(),n&&n.remove()},r=function(){o.value,$(".levy-text").html('You will also pay an annual <a href="https://www.wgtn.ac.nz/students/money/fees/student-services-levy-faqs">Student Services Levy</a>.')};$(".clear-cart-wrap").first().before('<p style="margin-top: .5rem; font-size: .9rem;" class="levy-text"></p>');var o=document.querySelector("#fees-type");n(),document.querySelector(".fees-est").addEventListener("DOMNodeInserted",function(t){o=document.querySelector("#fees-type"),document.querySelector(".fees-est .cost-items > div:nth-child(3)")&&(n(),e())},!1),e(),r()}}()})}),(document.location.href.includes("?mode=dev")||document.location.href.includes("local.wgtn")||document.location.href.includes("assets/git_bridge/0009/1778031/dist"))&&$("body").attr("id","hubv4"),"courses"==document.location.pathname.split("/")[1]||"explore"==document.location.pathname.split("/")[1]?$("header ul[role=menubar]")&&$("header ul[role=menubar] > li > a").each(function(t){var e=$(this).text();if(e.includes("myTools")||e.includes("—Student Portal")){var n=$(this);n.text("Pūaha"),n.attr("href","https://puaha.wgtn.ac.nz/signin"),n.attr("title","Pūaha")}}):$("header .menu-bar > a").each(function(t){var e=$(this).text();if(e.includes("myTools")||e.includes("—Student Portal")){var n=$(this);n.text("Pūaha"),n.attr("href","https://puaha.wgtn.ac.nz/signin"),n.attr("title","Pūaha")}}),window.toolkitCore={initToolbarUrlListeners:o,initToolbarLoader:i}},function(t){t.exports={name:"production",server:{protocol:"https",host:"www.wgtn.ac.nz/__data/assets/git_bridge/0005/1778018/dist",port:443}}}]);