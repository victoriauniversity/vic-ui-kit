/** Version: 0.10.13 | Tuesday, July 26, 2022, 2:54 PM */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var MediaQueryDispatch = __webpack_require__(8);
module.exports = new MediaQueryDispatch();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, setImmediate) {// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (true) {
        module.exports = definition();

    // RequireJS
    } else { var previousQ, global; }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                var rejection = err || new Error("" + err);

                rejection.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + rejection.message);

                deferred.reject(rejection);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5), __webpack_require__(16).setImmediate))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * Helper function for iterating over a collection
 *
 * @param collection
 * @param fn
 */
function each(collection, fn) {
    var i      = 0,
        length = collection.length,
        cont;

    for(i; i < length; i++) {
        cont = fn(collection[i], i);
        if(cont === false) {
            break; //allow early exit
        }
    }
}

/**
 * Helper function for determining whether target object is an array
 *
 * @param target the object under test
 * @return {Boolean} true if array, false otherwise
 */
function isArray(target) {
    return Object.prototype.toString.apply(target) === '[object Array]';
}

/**
 * Helper function for determining whether target object is a function
 *
 * @param target the object under test
 * @return {Boolean} true if function, false otherwise
 */
function isFunction(target) {
    return typeof target === 'function';
}

module.exports = {
    isFunction : isFunction,
    isArray : isArray,
    each : each
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

(function(root, factory) {
  'use strict';

  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  else {}
}(this, function() {
  'use strict';

  /* exported features */
  
  var features = {
    bind : !!(function(){}.bind),
    classList : 'classList' in document.documentElement,
    rAF : !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
  };
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
  
  /**
   * Handles debouncing of events via requestAnimationFrame
   * @see http://www.html5rocks.com/en/tutorials/speed/animations/
   * @param {Function} callback The callback to handle whichever event
   */
  function Debouncer (callback) {
    this.callback = callback;
    this.ticking = false;
  }
  Debouncer.prototype = {
    constructor : Debouncer,
  
    /**
     * dispatches the event to the supplied callback
     * @private
     */
    update : function() {
      this.callback && this.callback();
      this.ticking = false;
    },
  
    /**
     * ensures events don't get stacked
     * @private
     */
    requestTick : function() {
      if(!this.ticking) {
        requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this)));
        this.ticking = true;
      }
    },
  
    /**
     * Attach this as the event listeners
     */
    handleEvent : function() {
      this.requestTick();
    }
  };
  /**
   * Check if object is part of the DOM
   * @constructor
   * @param {Object} obj element to check
   */
  function isDOMElement(obj) {
    return obj && typeof window !== 'undefined' && (obj === window || obj.nodeType);
  }
  
  /**
   * Helper function for extending objects
   */
  function extend (object /*, objectN ... */) {
    if(arguments.length <= 0) {
      throw new Error('Missing arguments in extend function');
    }
  
    var result = object || {},
        key,
        i;
  
    for (i = 1; i < arguments.length; i++) {
      var replacement = arguments[i] || {};
  
      for (key in replacement) {
        // Recurse into object except if the object is a DOM element
        if(typeof result[key] === 'object' && ! isDOMElement(result[key])) {
          result[key] = extend(result[key], replacement[key]);
        }
        else {
          result[key] = result[key] || replacement[key];
        }
      }
    }
  
    return result;
  }
  
  /**
   * Helper function for normalizing tolerance option to object format
   */
  function normalizeTolerance (t) {
    return t === Object(t) ? t : { down : t, up : t };
  }
  
  /**
   * UI enhancement for fixed headers.
   * Hides header when scrolling down
   * Shows header when scrolling up
   * @constructor
   * @param {DOMElement} elem the header element
   * @param {Object} options options for the widget
   */
  function Headroom (elem, options) {
    options = extend(options, Headroom.options);
  
    this.lastKnownScrollY = 0;
    this.elem             = elem;
    this.tolerance        = normalizeTolerance(options.tolerance);
    this.classes          = options.classes;
    this.offset           = options.offset;
    this.scroller         = options.scroller;
    this.initialised      = false;
    this.onPin            = options.onPin;
    this.onUnpin          = options.onUnpin;
    this.onTop            = options.onTop;
    this.onNotTop         = options.onNotTop;
    this.onBottom         = options.onBottom;
    this.onNotBottom      = options.onNotBottom;
  }
  Headroom.prototype = {
    constructor : Headroom,
  
    /**
     * Initialises the widget
     */
    init : function() {
      if(!Headroom.cutsTheMustard) {
        return;
      }
  
      this.debouncer = new Debouncer(this.update.bind(this));
      this.elem.classList.add(this.classes.initial);
  
      // defer event registration to handle browser
      // potentially restoring previous scroll position
      setTimeout(this.attachEvent.bind(this), 100);
  
      return this;
    },
  
    /**
     * Unattaches events and removes any classes that were added
     */
    destroy : function() {
      var classes = this.classes;
  
      this.initialised = false;
  
      for (var key in classes) {
        if(classes.hasOwnProperty(key)) {
          this.elem.classList.remove(classes[key]);
        }
      }
  
      this.scroller.removeEventListener('scroll', this.debouncer, false);
    },
  
    /**
     * Attaches the scroll event
     * @private
     */
    attachEvent : function() {
      if(!this.initialised){
        this.lastKnownScrollY = this.getScrollY();
        this.initialised = true;
        this.scroller.addEventListener('scroll', this.debouncer, false);
  
        this.debouncer.handleEvent();
      }
    },
  
    /**
     * Unpins the header if it's currently pinned
     */
    unpin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.pinned) || !classList.contains(classes.unpinned)) {
        classList.add(classes.unpinned);
        classList.remove(classes.pinned);
        this.onUnpin && this.onUnpin.call(this);
      }
    },
  
    /**
     * Pins the header if it's currently unpinned
     */
    pin : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(classList.contains(classes.unpinned)) {
        classList.remove(classes.unpinned);
        classList.add(classes.pinned);
        this.onPin && this.onPin.call(this);
      }
    },
  
    /**
     * Handles the top states
     */
    top : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.top)) {
        classList.add(classes.top);
        classList.remove(classes.notTop);
        this.onTop && this.onTop.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notTop : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notTop)) {
        classList.add(classes.notTop);
        classList.remove(classes.top);
        this.onNotTop && this.onNotTop.call(this);
      }
    },
  
    bottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.bottom)) {
        classList.add(classes.bottom);
        classList.remove(classes.notBottom);
        this.onBottom && this.onBottom.call(this);
      }
    },
  
    /**
     * Handles the not top state
     */
    notBottom : function() {
      var classList = this.elem.classList,
        classes = this.classes;
  
      if(!classList.contains(classes.notBottom)) {
        classList.add(classes.notBottom);
        classList.remove(classes.bottom);
        this.onNotBottom && this.onNotBottom.call(this);
      }
    },
  
    /**
     * Gets the Y scroll position
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY
     * @return {Number} pixels the page has scrolled along the Y-axis
     */
    getScrollY : function() {
      return (this.scroller.pageYOffset !== undefined)
        ? this.scroller.pageYOffset
        : (this.scroller.scrollTop !== undefined)
          ? this.scroller.scrollTop
          : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    },
  
    /**
     * Gets the height of the viewport
     * @see http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
     * @return {int} the height of the viewport in pixels
     */
    getViewportHeight : function () {
      return window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    },
  
    /**
     * Gets the physical height of the DOM element
     * @param  {Object}  elm the element to calculate the physical height of which
     * @return {int}     the physical height of the element in pixels
     */
    getElementPhysicalHeight : function (elm) {
      return Math.max(
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the physical height of the scroller element
     * @return {int} the physical height of the scroller element in pixels
     */
    getScrollerPhysicalHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getViewportHeight()
        : this.getElementPhysicalHeight(this.scroller);
    },
  
    /**
     * Gets the height of the document
     * @see http://james.padolsey.com/javascript/get-document-height-cross-browser/
     * @return {int} the height of the document in pixels
     */
    getDocumentHeight : function () {
      var body = document.body,
        documentElement = document.documentElement;
  
      return Math.max(
        body.scrollHeight, documentElement.scrollHeight,
        body.offsetHeight, documentElement.offsetHeight,
        body.clientHeight, documentElement.clientHeight
      );
    },
  
    /**
     * Gets the height of the DOM element
     * @param  {Object}  elm the element to calculate the height of which
     * @return {int}     the height of the element in pixels
     */
    getElementHeight : function (elm) {
      return Math.max(
        elm.scrollHeight,
        elm.offsetHeight,
        elm.clientHeight
      );
    },
  
    /**
     * Gets the height of the scroller element
     * @return {int} the height of the scroller element in pixels
     */
    getScrollerHeight : function () {
      return (this.scroller === window || this.scroller === document.body)
        ? this.getDocumentHeight()
        : this.getElementHeight(this.scroller);
    },
  
    /**
     * determines if the scroll position is outside of document boundaries
     * @param  {int}  currentScrollY the current y scroll position
     * @return {bool} true if out of bounds, false otherwise
     */
    isOutOfBounds : function (currentScrollY) {
      var pastTop  = currentScrollY < 0,
        pastBottom = currentScrollY + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
  
      return pastTop || pastBottom;
    },
  
    /**
     * determines if the tolerance has been exceeded
     * @param  {int} currentScrollY the current scroll y position
     * @return {bool} true if tolerance exceeded, false otherwise
     */
    toleranceExceeded : function (currentScrollY, direction) {
      return Math.abs(currentScrollY-this.lastKnownScrollY) >= this.tolerance[direction];
    },
  
    /**
     * determine if it is appropriate to unpin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should unpin, false otherwise
     */
    shouldUnpin : function (currentScrollY, toleranceExceeded) {
      var scrollingDown = currentScrollY > this.lastKnownScrollY,
        pastOffset = currentScrollY >= this.offset;
  
      return scrollingDown && pastOffset && toleranceExceeded;
    },
  
    /**
     * determine if it is appropriate to pin
     * @param  {int} currentScrollY the current y scroll position
     * @param  {bool} toleranceExceeded has the tolerance been exceeded?
     * @return {bool} true if should pin, false otherwise
     */
    shouldPin : function (currentScrollY, toleranceExceeded) {
      var scrollingUp  = currentScrollY < this.lastKnownScrollY,
        pastOffset = currentScrollY <= this.offset;
  
      return (scrollingUp && toleranceExceeded) || pastOffset;
    },
  
    /**
     * Handles updating the state of the widget
     */
    update : function() {
      var currentScrollY  = this.getScrollY(),
        scrollDirection = currentScrollY > this.lastKnownScrollY ? 'down' : 'up',
        toleranceExceeded = this.toleranceExceeded(currentScrollY, scrollDirection);
  
      if(this.isOutOfBounds(currentScrollY)) { // Ignore bouncy scrolling in OSX
        return;
      }
  
      if (currentScrollY <= this.offset ) {
        this.top();
      } else {
        this.notTop();
      }
  
      if(currentScrollY + this.getViewportHeight() >= this.getScrollerHeight()) {
        this.bottom();
      }
      else {
        this.notBottom();
      }
  
      if(this.shouldUnpin(currentScrollY, toleranceExceeded)) {
        this.unpin();
      }
      else if(this.shouldPin(currentScrollY, toleranceExceeded)) {
        this.pin();
      }
  
      this.lastKnownScrollY = currentScrollY;
    }
  };
  /**
   * Default options
   * @type {Object}
   */
  Headroom.options = {
    tolerance : {
      up : 0,
      down : 0
    },
    offset : 0,
    scroller: window,
    classes : {
      pinned : 'headroom--pinned',
      unpinned : 'headroom--unpinned',
      top : 'headroom--top',
      notTop : 'headroom--not-top',
      bottom : 'headroom--bottom',
      notBottom : 'headroom--not-bottom',
      initial : 'headroom'
    }
  };
  Headroom.cutsTheMustard = typeof features !== 'undefined' && features.rAF && features.bind && features.classList;

  return Headroom;
}));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script loading is difficult thanks to IE. We need callbacks to fire
 * immediately following the script's execution, with no other scripts
 * running in between. If other scripts on the page are able to run
 * between our script and its callback, bad things can happen, such as
 * `jQuery.noConflict` not being called in time, resulting in plugins
 * latching onto our version of jQuery, etc.
 *
 * For IE<10 we use a relatively well-documented "preloading" strategy,
 * which ensures that the script is ready to execute *before* appending
 * it to the DOM. That way when it is finally appended, it is
 * executed immediately.
 *
 * References:
 * - http://www.html5rocks.com/en/tutorials/speed/script-loading/
 * - http://blog.getify.com/ie11-please-bring-real-script-preloading-back/
 * - https://github.com/jrburke/requirejs/issues/526
 * - https://connect.microsoft.com/IE/feedback/details/729164/
 *           ie10-dynamic-script-element-fires-loaded-readystate-prematurely
 */
(function () {

  // Global state.
  var pendingScripts = {};
  var scriptCounter = 0;

  /**
   * Insert script into the DOM
   *
   * @param {Object} script Script DOM object
   * @returns {void}
   */
  var _addScript = function (script) {
    // Get the first script element, we're just going to use it
    // as a reference for where to insert ours. Do NOT try to do
    // this just once at the top and then re-use the same script
    // as a reference later. Some weird loaders *remove* script
    // elements after the browser has executed their contents,
    // so the same reference might not have a parentNode later.
    var firstScript = document.getElementsByTagName("script")[0];

    // Append the script to the DOM, triggering execution.
    firstScript.parentNode.insertBefore(script, firstScript);
  };

  /**
   * Load Script.
   *
   * @param {String}            src       URI of script
   * @param {Function|Object}   callback  (Optional) Called on script load completion,
   *                                      or options object
   * @param {Object}            context   (Optional) Callback context (`this`)
   * @returns {void}
   */
  var _lload = function (src, callback, context) {
    /*eslint max-statements: [2, 32]*/
    var setup;

    if (callback && typeof callback !== "function") {
      context = callback.context || context;
      setup = callback.setup;
      callback = callback.callback;
    }

    var script = document.createElement("script");
    var done = false;
    var err;
    var _cleanup; // _must_ be set below.

    /**
     * Final handler for error or completion.
     *
     * **Note**: Will only be called _once_.
     *
     * @returns {void}
     */
    var _finish = function () {
      // Only call once.
      if (done) { return; }
      done = true;

      // Internal cleanup.
      _cleanup();

      // Callback.
      if (callback) {
        callback.call(context, err);
      }
    };

    /**
     * Error handler
     *
     * @returns {void}
     */
    var _error = function () {
      err = new Error(src || "EMPTY");
      _finish();
    };

    if (script.readyState && !("async" in script)) {
      /*eslint-disable consistent-return*/

      // This section is only for IE<10. Some other old browsers may
      // satisfy the above condition and enter this branch, but we don't
      // support those browsers anyway.

      var id = scriptCounter++;
      var isReady = { loaded: true, complete: true };
      var inserted = false;

      // Clear out listeners, state.
      _cleanup = function () {
        script.onreadystatechange = script.onerror = null;
        pendingScripts[id] = void 0;
      };

      // Attach the handler before setting src, otherwise we might
      // miss events (consider that IE could fire them synchronously
      // upon setting src, for example).
      script.onreadystatechange = function () {
        var firstState = script.readyState;

        // Protect against any errors from state change randomness.
        if (err) { return; }

        if (!inserted && isReady[firstState]) {
          inserted = true;

          // Append to DOM.
          _addScript(script);
        }

        // --------------------------------------------------------------------
        //                       GLORIOUS IE8 HACKAGE!!!
        // --------------------------------------------------------------------
        //
        // Oh IE8, how you disappoint. IE8 won't call `script.onerror`, so
        // we have to resort to drastic measures.
        // See, e.g. http://www.quirksmode.org/dom/events/error.html#t02
        //
        // As with all things development, there's a Stack Overflow comment that
        // asserts the following combinations of state changes in IE8 indicate a
        // script load error. And crazily, it seems to work!
        //
        // http://stackoverflow.com/a/18840568/741892
        //
        // The `script.readyState` transitions we're interested are:
        //
        // * If state starts as `loaded`
        // * Call `script.children`, which _should_ change state to `complete`
        // * If state is now `loading`, then **we have a load error**
        //
        // For the reader's amusement, here is HeadJS's catalog of various
        // `readyState` transitions in normal operation for IE:
        // https://github.com/headjs/headjs/blob/master/src/2.0.0/load.js#L379-L419
        if (firstState === "loaded") {
          // The act of accessing the property should change the script's
          // `readyState`.
          //
          // And, oh yeah, this hack is so hacky-ish we need the following
          // eslint disable...
          /*eslint-disable no-unused-expressions*/
          script.children;
          /*eslint-enable no-unused-expressions*/

          if (script.readyState === "loading") {
            // State transitions indicate we've hit the load error.
            //
            // **Note**: We are not intending to _return_ a value, just have
            // a shorter short-circuit code path here.
            return _error();
          }
        }

        // It's possible for readyState to be "complete" immediately
        // after we insert (and execute) the script in the branch
        // above. So check readyState again here and react without
        // waiting for another onreadystatechange.
        if (script.readyState === "complete") {
          _finish();
        }
      };

      // Onerror handler _may_ work here.
      script.onerror = _error;

      // Since we're not appending the script to the DOM yet, the
      // reference to our script element might get garbage collected
      // when this function ends, without onreadystatechange ever being
      // fired. This has been witnessed to happen. Adding it to
      // `pendingScripts` ensures this can't happen.
      pendingScripts[id] = script;

      // call the setup callback to mutate the script tag
      if (setup) {
        setup.call(context, script);
      }

      // This triggers a request for the script, but its contents won't
      // be executed until we append it to the DOM.
      script.src = src;

      // In some cases, the readyState is already "loaded" immediately
      // after setting src. It's a lie! Don't append to the DOM until
      // the onreadystatechange event says so.

    } else {
      // This section is for modern browsers, including IE10+.

      // Clear out listeners.
      _cleanup = function () {
        script.onload = script.onerror = null;
      };

      script.onerror = _error;
      script.onload = _finish;
      script.async = true;
      script.charset = "utf-8";

      // call the setup callback to mutate the script tag
      if (setup) {
        setup.call(context, script);
      }

      script.src = src;

      // Append to DOM.
      _addScript(script);
    }
  };

  // UMD wrapper.
  /*global define:false*/
  if (true) {
    // CommonJS
    module.exports = _lload;

  } else {}
}());


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var MediaQuery = __webpack_require__(9);
var Util = __webpack_require__(4);
var each = Util.each;
var isFunction = Util.isFunction;
var isArray = Util.isArray;

/**
 * Allows for registration of query handlers.
 * Manages the query handler's state and is responsible for wiring up browser events
 *
 * @constructor
 */
function MediaQueryDispatch () {
    if(!window.matchMedia) {
        throw new Error('matchMedia not present, legacy browsers require a polyfill');
    }

    this.queries = {};
    this.browserIsIncapable = !window.matchMedia('only all').matches;
}

MediaQueryDispatch.prototype = {

    constructor : MediaQueryDispatch,

    /**
     * Registers a handler for the given media query
     *
     * @param {string} q the media query
     * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
     * @param {function} options.match fired when query matched
     * @param {function} [options.unmatch] fired when a query is no longer matched
     * @param {function} [options.setup] fired when handler first triggered
     * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
     * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
     */
    register : function(q, options, shouldDegrade) {
        var queries         = this.queries,
            isUnconditional = shouldDegrade && this.browserIsIncapable;

        if(!queries[q]) {
            queries[q] = new MediaQuery(q, isUnconditional);
        }

        //normalise to object in an array
        if(isFunction(options)) {
            options = { match : options };
        }
        if(!isArray(options)) {
            options = [options];
        }
        each(options, function(handler) {
            if (isFunction(handler)) {
                handler = { match : handler };
            }
            queries[q].addHandler(handler);
        });

        return this;
    },

    /**
     * unregisters a query and all it's handlers, or a specific handler for a query
     *
     * @param {string} q the media query to target
     * @param {object || function} [handler] specific handler to unregister
     */
    unregister : function(q, handler) {
        var query = this.queries[q];

        if(query) {
            if(handler) {
                query.removeHandler(handler);
            }
            else {
                query.clear();
                delete this.queries[q];
            }
        }

        return this;
    }
};

module.exports = MediaQueryDispatch;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var QueryHandler = __webpack_require__(10);
var each = __webpack_require__(4).each;

/**
 * Represents a single media query, manages it's state and registered handlers for this query
 *
 * @constructor
 * @param {string} query the media query string
 * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
 */
function MediaQuery(query, isUnconditional) {
    this.query = query;
    this.isUnconditional = isUnconditional;
    this.handlers = [];
    this.mql = window.matchMedia(query);

    var self = this;
    this.listener = function(mql) {
        // Chrome passes an MediaQueryListEvent object, while other browsers pass MediaQueryList directly
        self.mql = mql.currentTarget || mql;
        self.assess();
    };
    this.mql.addListener(this.listener);
}

MediaQuery.prototype = {

    constuctor : MediaQuery,

    /**
     * add a handler for this query, triggering if already active
     *
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     */
    addHandler : function(handler) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        this.matches() && qh.on();
    },

    /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @param {object || function} handler the handler to remove
     */
    removeHandler : function(handler) {
        var handlers = this.handlers;
        each(handlers, function(h, i) {
            if(h.equals(handler)) {
                h.destroy();
                return !handlers.splice(i,1); //remove from array and exit each early
            }
        });
    },

    /**
     * Determine whether the media query should be considered a match
     *
     * @return {Boolean} true if media query can be considered a match, false otherwise
     */
    matches : function() {
        return this.mql.matches || this.isUnconditional;
    },

    /**
     * Clears all handlers and unbinds events
     */
    clear : function() {
        each(this.handlers, function(handler) {
            handler.destroy();
        });
        this.mql.removeListener(this.listener);
        this.handlers.length = 0; //clear array
    },

    /*
        * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
        */
    assess : function() {
        var action = this.matches() ? 'on' : 'off';

        each(this.handlers, function(handler) {
            handler[action]();
        });
    }
};

module.exports = MediaQuery;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Delegate to handle a media query being matched and unmatched.
 *
 * @param {object} options
 * @param {function} options.match callback for when the media query is matched
 * @param {function} [options.unmatch] callback for when the media query is unmatched
 * @param {function} [options.setup] one-time callback triggered the first time a query is matched
 * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
 * @constructor
 */
function QueryHandler(options) {
    this.options = options;
    !options.deferSetup && this.setup();
}

QueryHandler.prototype = {

    constructor : QueryHandler,

    /**
     * coordinates setup of the handler
     *
     * @function
     */
    setup : function() {
        if(this.options.setup) {
            this.options.setup();
        }
        this.initialised = true;
    },

    /**
     * coordinates setup and triggering of the handler
     *
     * @function
     */
    on : function() {
        !this.initialised && this.setup();
        this.options.match && this.options.match();
    },

    /**
     * coordinates the unmatch event for the handler
     *
     * @function
     */
    off : function() {
        this.options.unmatch && this.options.unmatch();
    },

    /**
     * called when a handler is to be destroyed.
     * delegates to the destroy or unmatch callbacks, depending on availability.
     *
     * @function
     */
    destroy : function() {
        this.options.destroy ? this.options.destroy() : this.off();
    },

    /**
     * determines equality by reference.
     * if object is supplied compare options, if function, compare match callback
     *
     * @function
     * @param {object || function} [target] the target for comparison
     */
    equals : function(target) {
        return this.options === target || this.options.match === target;
    }

};

module.exports = QueryHandler;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;/*!
 * Select2 4.0.13
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */
;(function (factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
} (function (jQuery) {
  // This is needed so we can catch the AMD loader configuration and use it
  // The inner file should be wrapped (by `banner.start.js`) in a function that
  // returns the AMD loader references.
  var S2 =(function () {
  // Restore the Select2 AMD loader so it can be used
  // Needed mostly in the language files, where the loader is not inserted
  if (jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd) {
    var S2 = jQuery.fn.select2.amd;
  }
var S2;(function () { if (!S2 || !S2.requirejs) {
if (!S2) { S2 = {}; } else { require = S2; }
/**
 * @license almond 0.3.3 Copyright jQuery Foundation and other contributors.
 * Released under MIT license, http://github.com/requirejs/almond/LICENSE
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part, normalizedBaseParts,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name) {
            name = name.split('/');
            lastIndex = name.length - 1;

            // If wanting node ID compatibility, strip .js from end
            // of IDs. Have to do this here, and not in nameToUrl
            // because node allows either .js or non .js to map
            // to same file.
            if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
            }

            // Starts with a '.' so need the baseName
            if (name[0].charAt(0) === '.' && baseParts) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that 'directory' and not name of the baseName's
                //module. For instance, baseName of 'one/two/three', maps to
                //'one/two/three.js', but we want the directory, 'one/two' for
                //this normalization.
                normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                name = normalizedBaseParts.concat(name);
            }

            //start trimDots
            for (i = 0; i < name.length; i++) {
                part = name[i];
                if (part === '.') {
                    name.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    // If at the start, or previous value is still ..,
                    // keep them so that when converted to a path it may
                    // still work when converted to a path, even though
                    // as an ID it is less than ideal. In larger point
                    // releases, may be better to just kick out an error.
                    if (i === 0 || (i === 1 && name[2] === '..') || name[i - 1] === '..') {
                        continue;
                    } else if (i > 0) {
                        name.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
            //end trimDots

            name = name.join('/');
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    //Creates a parts array for a relName where first part is plugin ID,
    //second part is resource ID. Assumes relName has already been normalized.
    function makeRelParts(relName) {
        return relName ? splitPrefix(relName) : [];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relParts) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0],
            relResourceName = relParts[1];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relResourceName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relResourceName));
            } else {
                name = normalize(name, relResourceName);
            }
        } else {
            name = normalize(name, relResourceName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i, relParts,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;
        relParts = makeRelParts(relName);

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relParts);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, makeRelParts(callback)).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

S2.requirejs = requirejs;S2.require = require;S2.define = define;
}
}());
S2.define("almond", function(){});

/* global jQuery:false, $:false */
S2.define('jquery',[],function () {
  var _$ = jQuery || $;

  if (_$ == null && console && console.error) {
    console.error(
      'Select2: An instance of jQuery or a jQuery-compatible library was not ' +
      'found. Make sure that you are including jQuery before Select2 on your ' +
      'web page.'
    );
  }

  return _$;
});

S2.define('select2/utils',[
  'jquery'
], function ($) {
  var Utils = {};

  Utils.Extend = function (ChildClass, SuperClass) {
    var __hasProp = {}.hasOwnProperty;

    function BaseConstructor () {
      this.constructor = ChildClass;
    }

    for (var key in SuperClass) {
      if (__hasProp.call(SuperClass, key)) {
        ChildClass[key] = SuperClass[key];
      }
    }

    BaseConstructor.prototype = SuperClass.prototype;
    ChildClass.prototype = new BaseConstructor();
    ChildClass.__super__ = SuperClass.prototype;

    return ChildClass;
  };

  function getMethods (theClass) {
    var proto = theClass.prototype;

    var methods = [];

    for (var methodName in proto) {
      var m = proto[methodName];

      if (typeof m !== 'function') {
        continue;
      }

      if (methodName === 'constructor') {
        continue;
      }

      methods.push(methodName);
    }

    return methods;
  }

  Utils.Decorate = function (SuperClass, DecoratorClass) {
    var decoratedMethods = getMethods(DecoratorClass);
    var superMethods = getMethods(SuperClass);

    function DecoratedClass () {
      var unshift = Array.prototype.unshift;

      var argCount = DecoratorClass.prototype.constructor.length;

      var calledConstructor = SuperClass.prototype.constructor;

      if (argCount > 0) {
        unshift.call(arguments, SuperClass.prototype.constructor);

        calledConstructor = DecoratorClass.prototype.constructor;
      }

      calledConstructor.apply(this, arguments);
    }

    DecoratorClass.displayName = SuperClass.displayName;

    function ctr () {
      this.constructor = DecoratedClass;
    }

    DecoratedClass.prototype = new ctr();

    for (var m = 0; m < superMethods.length; m++) {
      var superMethod = superMethods[m];

      DecoratedClass.prototype[superMethod] =
        SuperClass.prototype[superMethod];
    }

    var calledMethod = function (methodName) {
      // Stub out the original method if it's not decorating an actual method
      var originalMethod = function () {};

      if (methodName in DecoratedClass.prototype) {
        originalMethod = DecoratedClass.prototype[methodName];
      }

      var decoratedMethod = DecoratorClass.prototype[methodName];

      return function () {
        var unshift = Array.prototype.unshift;

        unshift.call(arguments, originalMethod);

        return decoratedMethod.apply(this, arguments);
      };
    };

    for (var d = 0; d < decoratedMethods.length; d++) {
      var decoratedMethod = decoratedMethods[d];

      DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);
    }

    return DecoratedClass;
  };

  var Observable = function () {
    this.listeners = {};
  };

  Observable.prototype.on = function (event, callback) {
    this.listeners = this.listeners || {};

    if (event in this.listeners) {
      this.listeners[event].push(callback);
    } else {
      this.listeners[event] = [callback];
    }
  };

  Observable.prototype.trigger = function (event) {
    var slice = Array.prototype.slice;
    var params = slice.call(arguments, 1);

    this.listeners = this.listeners || {};

    // Params should always come in as an array
    if (params == null) {
      params = [];
    }

    // If there are no arguments to the event, use a temporary object
    if (params.length === 0) {
      params.push({});
    }

    // Set the `_type` of the first object to the event
    params[0]._type = event;

    if (event in this.listeners) {
      this.invoke(this.listeners[event], slice.call(arguments, 1));
    }

    if ('*' in this.listeners) {
      this.invoke(this.listeners['*'], arguments);
    }
  };

  Observable.prototype.invoke = function (listeners, params) {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i].apply(this, params);
    }
  };

  Utils.Observable = Observable;

  Utils.generateChars = function (length) {
    var chars = '';

    for (var i = 0; i < length; i++) {
      var randomChar = Math.floor(Math.random() * 36);
      chars += randomChar.toString(36);
    }

    return chars;
  };

  Utils.bind = function (func, context) {
    return function () {
      func.apply(context, arguments);
    };
  };

  Utils._convertData = function (data) {
    for (var originalKey in data) {
      var keys = originalKey.split('-');

      var dataLevel = data;

      if (keys.length === 1) {
        continue;
      }

      for (var k = 0; k < keys.length; k++) {
        var key = keys[k];

        // Lowercase the first letter
        // By default, dash-separated becomes camelCase
        key = key.substring(0, 1).toLowerCase() + key.substring(1);

        if (!(key in dataLevel)) {
          dataLevel[key] = {};
        }

        if (k == keys.length - 1) {
          dataLevel[key] = data[originalKey];
        }

        dataLevel = dataLevel[key];
      }

      delete data[originalKey];
    }

    return data;
  };

  Utils.hasScroll = function (index, el) {
    // Adapted from the function created by @ShadowScripter
    // and adapted by @BillBarry on the Stack Exchange Code Review website.
    // The original code can be found at
    // http://codereview.stackexchange.com/q/13338
    // and was designed to be used with the Sizzle selector engine.

    var $el = $(el);
    var overflowX = el.style.overflowX;
    var overflowY = el.style.overflowY;

    //Check both x and y declarations
    if (overflowX === overflowY &&
        (overflowY === 'hidden' || overflowY === 'visible')) {
      return false;
    }

    if (overflowX === 'scroll' || overflowY === 'scroll') {
      return true;
    }

    return ($el.innerHeight() < el.scrollHeight ||
      $el.innerWidth() < el.scrollWidth);
  };

  Utils.escapeMarkup = function (markup) {
    var replaceMap = {
      '\\': '&#92;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#47;'
    };

    // Do not try to escape the markup if it's not a string
    if (typeof markup !== 'string') {
      return markup;
    }

    return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
      return replaceMap[match];
    });
  };

  // Append an array of jQuery nodes to a given element.
  Utils.appendMany = function ($element, $nodes) {
    // jQuery 1.7.x does not support $.fn.append() with an array
    // Fall back to a jQuery object collection using $.fn.add()
    if ($.fn.jquery.substr(0, 3) === '1.7') {
      var $jqNodes = $();

      $.map($nodes, function (node) {
        $jqNodes = $jqNodes.add(node);
      });

      $nodes = $jqNodes;
    }

    $element.append($nodes);
  };

  // Cache objects in Utils.__cache instead of $.data (see #4346)
  Utils.__cache = {};

  var id = 0;
  Utils.GetUniqueElementId = function (element) {
    // Get a unique element Id. If element has no id,
    // creates a new unique number, stores it in the id
    // attribute and returns the new id.
    // If an id already exists, it simply returns it.

    var select2Id = element.getAttribute('data-select2-id');
    if (select2Id == null) {
      // If element has id, use it.
      if (element.id) {
        select2Id = element.id;
        element.setAttribute('data-select2-id', select2Id);
      } else {
        element.setAttribute('data-select2-id', ++id);
        select2Id = id.toString();
      }
    }
    return select2Id;
  };

  Utils.StoreData = function (element, name, value) {
    // Stores an item in the cache for a specified element.
    // name is the cache key.
    var id = Utils.GetUniqueElementId(element);
    if (!Utils.__cache[id]) {
      Utils.__cache[id] = {};
    }

    Utils.__cache[id][name] = value;
  };

  Utils.GetData = function (element, name) {
    // Retrieves a value from the cache by its key (name)
    // name is optional. If no name specified, return
    // all cache items for the specified element.
    // and for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (name) {
      if (Utils.__cache[id]) {
        if (Utils.__cache[id][name] != null) {
          return Utils.__cache[id][name];
        }
        return $(element).data(name); // Fallback to HTML5 data attribs.
      }
      return $(element).data(name); // Fallback to HTML5 data attribs.
    } else {
      return Utils.__cache[id];
    }
  };

  Utils.RemoveData = function (element) {
    // Removes all cached items for a specified element.
    var id = Utils.GetUniqueElementId(element);
    if (Utils.__cache[id] != null) {
      delete Utils.__cache[id];
    }

    element.removeAttribute('data-select2-id');
  };

  return Utils;
});

S2.define('select2/results',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Results ($element, options, dataAdapter) {
    this.$element = $element;
    this.data = dataAdapter;
    this.options = options;

    Results.__super__.constructor.call(this);
  }

  Utils.Extend(Results, Utils.Observable);

  Results.prototype.render = function () {
    var $results = $(
      '<ul class="select2-results__options" role="listbox"></ul>'
    );

    if (this.options.get('multiple')) {
      $results.attr('aria-multiselectable', 'true');
    }

    this.$results = $results;

    return $results;
  };

  Results.prototype.clear = function () {
    this.$results.empty();
  };

  Results.prototype.displayMessage = function (params) {
    var escapeMarkup = this.options.get('escapeMarkup');

    this.clear();
    this.hideLoading();

    var $message = $(
      '<li role="alert" aria-live="assertive"' +
      ' class="select2-results__option"></li>'
    );

    var message = this.options.get('translations').get(params.message);

    $message.append(
      escapeMarkup(
        message(params.args)
      )
    );

    $message[0].className += ' select2-results__message';

    this.$results.append($message);
  };

  Results.prototype.hideMessages = function () {
    this.$results.find('.select2-results__message').remove();
  };

  Results.prototype.append = function (data) {
    this.hideLoading();

    var $options = [];

    if (data.results == null || data.results.length === 0) {
      if (this.$results.children().length === 0) {
        this.trigger('results:message', {
          message: 'noResults'
        });
      }

      return;
    }

    data.results = this.sort(data.results);

    for (var d = 0; d < data.results.length; d++) {
      var item = data.results[d];

      var $option = this.option(item);

      $options.push($option);
    }

    this.$results.append($options);
  };

  Results.prototype.position = function ($results, $dropdown) {
    var $resultsContainer = $dropdown.find('.select2-results');
    $resultsContainer.append($results);
  };

  Results.prototype.sort = function (data) {
    var sorter = this.options.get('sorter');

    return sorter(data);
  };

  Results.prototype.highlightFirstItem = function () {
    var $options = this.$results
      .find('.select2-results__option[aria-selected]');

    var $selected = $options.filter('[aria-selected=true]');

    // Check if there are any selected options
    if ($selected.length > 0) {
      // If there are selected options, highlight the first
      $selected.first().trigger('mouseenter');
    } else {
      // If there are no selected options, highlight the first option
      // in the dropdown
      $options.first().trigger('mouseenter');
    }

    this.ensureHighlightVisible();
  };

  Results.prototype.setClasses = function () {
    var self = this;

    this.data.current(function (selected) {
      var selectedIds = $.map(selected, function (s) {
        return s.id.toString();
      });

      var $options = self.$results
        .find('.select2-results__option[aria-selected]');

      $options.each(function () {
        var $option = $(this);

        var item = Utils.GetData(this, 'data');

        // id needs to be converted to a string when comparing
        var id = '' + item.id;

        if ((item.element != null && item.element.selected) ||
            (item.element == null && $.inArray(id, selectedIds) > -1)) {
          $option.attr('aria-selected', 'true');
        } else {
          $option.attr('aria-selected', 'false');
        }
      });

    });
  };

  Results.prototype.showLoading = function (params) {
    this.hideLoading();

    var loadingMore = this.options.get('translations').get('searching');

    var loading = {
      disabled: true,
      loading: true,
      text: loadingMore(params)
    };
    var $loading = this.option(loading);
    $loading.className += ' loading-results';

    this.$results.prepend($loading);
  };

  Results.prototype.hideLoading = function () {
    this.$results.find('.loading-results').remove();
  };

  Results.prototype.option = function (data) {
    var option = document.createElement('li');
    option.className = 'select2-results__option';

    var attrs = {
      'role': 'option',
      'aria-selected': 'false'
    };

    var matches = window.Element.prototype.matches ||
      window.Element.prototype.msMatchesSelector ||
      window.Element.prototype.webkitMatchesSelector;

    if ((data.element != null && matches.call(data.element, ':disabled')) ||
        (data.element == null && data.disabled)) {
      delete attrs['aria-selected'];
      attrs['aria-disabled'] = 'true';
    }

    if (data.id == null) {
      delete attrs['aria-selected'];
    }

    if (data._resultId != null) {
      option.id = data._resultId;
    }

    if (data.title) {
      option.title = data.title;
    }

    if (data.children) {
      attrs.role = 'group';
      attrs['aria-label'] = data.text;
      delete attrs['aria-selected'];
    }

    for (var attr in attrs) {
      var val = attrs[attr];

      option.setAttribute(attr, val);
    }

    if (data.children) {
      var $option = $(option);

      var label = document.createElement('strong');
      label.className = 'select2-results__group';

      var $label = $(label);
      this.template(data, label);

      var $children = [];

      for (var c = 0; c < data.children.length; c++) {
        var child = data.children[c];

        var $child = this.option(child);

        $children.push($child);
      }

      var $childrenContainer = $('<ul></ul>', {
        'class': 'select2-results__options select2-results__options--nested'
      });

      $childrenContainer.append($children);

      $option.append(label);
      $option.append($childrenContainer);
    } else {
      this.template(data, option);
    }

    Utils.StoreData(option, 'data', data);

    return option;
  };

  Results.prototype.bind = function (container, $container) {
    var self = this;

    var id = container.id + '-results';

    this.$results.attr('id', id);

    container.on('results:all', function (params) {
      self.clear();
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
        self.highlightFirstItem();
      }
    });

    container.on('results:append', function (params) {
      self.append(params.data);

      if (container.isOpen()) {
        self.setClasses();
      }
    });

    container.on('query', function (params) {
      self.hideMessages();
      self.showLoading(params);
    });

    container.on('select', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();

      if (self.options.get('scrollAfterSelect')) {
        self.highlightFirstItem();
      }
    });

    container.on('unselect', function () {
      if (!container.isOpen()) {
        return;
      }

      self.setClasses();

      if (self.options.get('scrollAfterSelect')) {
        self.highlightFirstItem();
      }
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expended="true"
      self.$results.attr('aria-expanded', 'true');
      self.$results.attr('aria-hidden', 'false');

      self.setClasses();
      self.ensureHighlightVisible();
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expended="false"
      self.$results.attr('aria-expanded', 'false');
      self.$results.attr('aria-hidden', 'true');
      self.$results.removeAttr('aria-activedescendant');
    });

    container.on('results:toggle', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      $highlighted.trigger('mouseup');
    });

    container.on('results:select', function () {
      var $highlighted = self.getHighlightedResults();

      if ($highlighted.length === 0) {
        return;
      }

      var data = Utils.GetData($highlighted[0], 'data');

      if ($highlighted.attr('aria-selected') == 'true') {
        self.trigger('close', {});
      } else {
        self.trigger('select', {
          data: data
        });
      }
    });

    container.on('results:previous', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      // If we are already at the top, don't move further
      // If no options, currentIndex will be -1
      if (currentIndex <= 0) {
        return;
      }

      var nextIndex = currentIndex - 1;

      // If none are highlighted, highlight the first
      if ($highlighted.length === 0) {
        nextIndex = 0;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top;
      var nextTop = $next.offset().top;
      var nextOffset = self.$results.scrollTop() + (nextTop - currentOffset);

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextTop - currentOffset < 0) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:next', function () {
      var $highlighted = self.getHighlightedResults();

      var $options = self.$results.find('[aria-selected]');

      var currentIndex = $options.index($highlighted);

      var nextIndex = currentIndex + 1;

      // If we are at the last option, stay there
      if (nextIndex >= $options.length) {
        return;
      }

      var $next = $options.eq(nextIndex);

      $next.trigger('mouseenter');

      var currentOffset = self.$results.offset().top +
        self.$results.outerHeight(false);
      var nextBottom = $next.offset().top + $next.outerHeight(false);
      var nextOffset = self.$results.scrollTop() + nextBottom - currentOffset;

      if (nextIndex === 0) {
        self.$results.scrollTop(0);
      } else if (nextBottom > currentOffset) {
        self.$results.scrollTop(nextOffset);
      }
    });

    container.on('results:focus', function (params) {
      params.element.addClass('select2-results__option--highlighted');
    });

    container.on('results:message', function (params) {
      self.displayMessage(params);
    });

    if ($.fn.mousewheel) {
      this.$results.on('mousewheel', function (e) {
        var top = self.$results.scrollTop();

        var bottom = self.$results.get(0).scrollHeight - top + e.deltaY;

        var isAtTop = e.deltaY > 0 && top - e.deltaY <= 0;
        var isAtBottom = e.deltaY < 0 && bottom <= self.$results.height();

        if (isAtTop) {
          self.$results.scrollTop(0);

          e.preventDefault();
          e.stopPropagation();
        } else if (isAtBottom) {
          self.$results.scrollTop(
            self.$results.get(0).scrollHeight - self.$results.height()
          );

          e.preventDefault();
          e.stopPropagation();
        }
      });
    }

    this.$results.on('mouseup', '.select2-results__option[aria-selected]',
      function (evt) {
      var $this = $(this);

      var data = Utils.GetData(this, 'data');

      if ($this.attr('aria-selected') === 'true') {
        if (self.options.get('multiple')) {
          self.trigger('unselect', {
            originalEvent: evt,
            data: data
          });
        } else {
          self.trigger('close', {});
        }

        return;
      }

      self.trigger('select', {
        originalEvent: evt,
        data: data
      });
    });

    this.$results.on('mouseenter', '.select2-results__option[aria-selected]',
      function (evt) {
      var data = Utils.GetData(this, 'data');

      self.getHighlightedResults()
          .removeClass('select2-results__option--highlighted');

      self.trigger('results:focus', {
        data: data,
        element: $(this)
      });
    });
  };

  Results.prototype.getHighlightedResults = function () {
    var $highlighted = this.$results
    .find('.select2-results__option--highlighted');

    return $highlighted;
  };

  Results.prototype.destroy = function () {
    this.$results.remove();
  };

  Results.prototype.ensureHighlightVisible = function () {
    var $highlighted = this.getHighlightedResults();

    if ($highlighted.length === 0) {
      return;
    }

    var $options = this.$results.find('[aria-selected]');

    var currentIndex = $options.index($highlighted);

    var currentOffset = this.$results.offset().top;
    var nextTop = $highlighted.offset().top;
    var nextOffset = this.$results.scrollTop() + (nextTop - currentOffset);

    var offsetDelta = nextTop - currentOffset;
    nextOffset -= $highlighted.outerHeight(false) * 2;

    if (currentIndex <= 2) {
      this.$results.scrollTop(0);
    } else if (offsetDelta > this.$results.outerHeight() || offsetDelta < 0) {
      this.$results.scrollTop(nextOffset);
    }
  };

  Results.prototype.template = function (result, container) {
    var template = this.options.get('templateResult');
    var escapeMarkup = this.options.get('escapeMarkup');

    var content = template(result, container);

    if (content == null) {
      container.style.display = 'none';
    } else if (typeof content === 'string') {
      container.innerHTML = escapeMarkup(content);
    } else {
      $(container).append(content);
    }
  };

  return Results;
});

S2.define('select2/keys',[

], function () {
  var KEYS = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    ESC: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46
  };

  return KEYS;
});

S2.define('select2/selection/base',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function BaseSelection ($element, options) {
    this.$element = $element;
    this.options = options;

    BaseSelection.__super__.constructor.call(this);
  }

  Utils.Extend(BaseSelection, Utils.Observable);

  BaseSelection.prototype.render = function () {
    var $selection = $(
      '<span class="select2-selection" role="combobox" ' +
      ' aria-haspopup="true" aria-expanded="false">' +
      '</span>'
    );

    this._tabindex = 0;

    if (Utils.GetData(this.$element[0], 'old-tabindex') != null) {
      this._tabindex = Utils.GetData(this.$element[0], 'old-tabindex');
    } else if (this.$element.attr('tabindex') != null) {
      this._tabindex = this.$element.attr('tabindex');
    }

    $selection.attr('title', this.$element.attr('title'));
    $selection.attr('tabindex', this._tabindex);
    $selection.attr('aria-disabled', 'false');

    this.$selection = $selection;

    return $selection;
  };

  BaseSelection.prototype.bind = function (container, $container) {
    var self = this;

    var resultsId = container.id + '-results';

    this.container = container;

    this.$selection.on('focus', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('blur', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      if (evt.which === KEYS.SPACE) {
        evt.preventDefault();
      }
    });

    container.on('results:focus', function (params) {
      self.$selection.attr('aria-activedescendant', params.data._resultId);
    });

    container.on('selection:update', function (params) {
      self.update(params.data);
    });

    container.on('open', function () {
      // When the dropdown is open, aria-expanded="true"
      self.$selection.attr('aria-expanded', 'true');
      self.$selection.attr('aria-owns', resultsId);

      self._attachCloseHandler(container);
    });

    container.on('close', function () {
      // When the dropdown is closed, aria-expanded="false"
      self.$selection.attr('aria-expanded', 'false');
      self.$selection.removeAttr('aria-activedescendant');
      self.$selection.removeAttr('aria-owns');

      self.$selection.trigger('focus');

      self._detachCloseHandler(container);
    });

    container.on('enable', function () {
      self.$selection.attr('tabindex', self._tabindex);
      self.$selection.attr('aria-disabled', 'false');
    });

    container.on('disable', function () {
      self.$selection.attr('tabindex', '-1');
      self.$selection.attr('aria-disabled', 'true');
    });
  };

  BaseSelection.prototype._handleBlur = function (evt) {
    var self = this;

    // This needs to be delayed as the active element is the body when the tab
    // key is pressed, possibly along with others.
    window.setTimeout(function () {
      // Don't trigger `blur` if the focus is still in the selection
      if (
        (document.activeElement == self.$selection[0]) ||
        ($.contains(self.$selection[0], document.activeElement))
      ) {
        return;
      }

      self.trigger('blur', evt);
    }, 1);
  };

  BaseSelection.prototype._attachCloseHandler = function (container) {

    $(document.body).on('mousedown.select2.' + container.id, function (e) {
      var $target = $(e.target);

      var $select = $target.closest('.select2');

      var $all = $('.select2.select2-container--open');

      $all.each(function () {
        if (this == $select[0]) {
          return;
        }

        var $element = Utils.GetData(this, 'element');

        $element.select2('close');
      });
    });
  };

  BaseSelection.prototype._detachCloseHandler = function (container) {
    $(document.body).off('mousedown.select2.' + container.id);
  };

  BaseSelection.prototype.position = function ($selection, $container) {
    var $selectionContainer = $container.find('.selection');
    $selectionContainer.append($selection);
  };

  BaseSelection.prototype.destroy = function () {
    this._detachCloseHandler(this.container);
  };

  BaseSelection.prototype.update = function (data) {
    throw new Error('The `update` method must be defined in child classes.');
  };

  /**
   * Helper method to abstract the "enabled" (not "disabled") state of this
   * object.
   *
   * @return {true} if the instance is not disabled.
   * @return {false} if the instance is disabled.
   */
  BaseSelection.prototype.isEnabled = function () {
    return !this.isDisabled();
  };

  /**
   * Helper method to abstract the "disabled" state of this object.
   *
   * @return {true} if the disabled option is true.
   * @return {false} if the disabled option is false.
   */
  BaseSelection.prototype.isDisabled = function () {
    return this.options.get('disabled');
  };

  return BaseSelection;
});

S2.define('select2/selection/single',[
  'jquery',
  './base',
  '../utils',
  '../keys'
], function ($, BaseSelection, Utils, KEYS) {
  function SingleSelection () {
    SingleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(SingleSelection, BaseSelection);

  SingleSelection.prototype.render = function () {
    var $selection = SingleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--single');

    $selection.html(
      '<span class="select2-selection__rendered"></span>' +
      '<span class="select2-selection__arrow" role="presentation">' +
        '<b role="presentation"></b>' +
      '</span>'
    );

    return $selection;
  };

  SingleSelection.prototype.bind = function (container, $container) {
    var self = this;

    SingleSelection.__super__.bind.apply(this, arguments);

    var id = container.id + '-container';

    this.$selection.find('.select2-selection__rendered')
      .attr('id', id)
      .attr('role', 'textbox')
      .attr('aria-readonly', 'true');
    this.$selection.attr('aria-labelledby', id);

    this.$selection.on('mousedown', function (evt) {
      // Only respond to left clicks
      if (evt.which !== 1) {
        return;
      }

      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on('focus', function (evt) {
      // User focuses on the container
    });

    this.$selection.on('blur', function (evt) {
      // User exits the container
    });

    container.on('focus', function (evt) {
      if (!container.isOpen()) {
        self.$selection.trigger('focus');
      }
    });
  };

  SingleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title'); // clear tooltip on empty
  };

  SingleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  SingleSelection.prototype.selectionContainer = function () {
    return $('<span></span>');
  };

  SingleSelection.prototype.update = function (data) {
    if (data.length === 0) {
      this.clear();
      return;
    }

    var selection = data[0];

    var $rendered = this.$selection.find('.select2-selection__rendered');
    var formatted = this.display(selection, $rendered);

    $rendered.empty().append(formatted);

    var title = selection.title || selection.text;

    if (title) {
      $rendered.attr('title', title);
    } else {
      $rendered.removeAttr('title');
    }
  };

  return SingleSelection;
});

S2.define('select2/selection/multiple',[
  'jquery',
  './base',
  '../utils'
], function ($, BaseSelection, Utils) {
  function MultipleSelection ($element, options) {
    MultipleSelection.__super__.constructor.apply(this, arguments);
  }

  Utils.Extend(MultipleSelection, BaseSelection);

  MultipleSelection.prototype.render = function () {
    var $selection = MultipleSelection.__super__.render.call(this);

    $selection.addClass('select2-selection--multiple');

    $selection.html(
      '<ul class="select2-selection__rendered"></ul>'
    );

    return $selection;
  };

  MultipleSelection.prototype.bind = function (container, $container) {
    var self = this;

    MultipleSelection.__super__.bind.apply(this, arguments);

    this.$selection.on('click', function (evt) {
      self.trigger('toggle', {
        originalEvent: evt
      });
    });

    this.$selection.on(
      'click',
      '.select2-selection__choice__remove',
      function (evt) {
        // Ignore the event if it is disabled
        if (self.isDisabled()) {
          return;
        }

        var $remove = $(this);
        var $selection = $remove.parent();

        var data = Utils.GetData($selection[0], 'data');

        self.trigger('unselect', {
          originalEvent: evt,
          data: data
        });
      }
    );
  };

  MultipleSelection.prototype.clear = function () {
    var $rendered = this.$selection.find('.select2-selection__rendered');
    $rendered.empty();
    $rendered.removeAttr('title');
  };

  MultipleSelection.prototype.display = function (data, container) {
    var template = this.options.get('templateSelection');
    var escapeMarkup = this.options.get('escapeMarkup');

    return escapeMarkup(template(data, container));
  };

  MultipleSelection.prototype.selectionContainer = function () {
    var $container = $(
      '<li class="select2-selection__choice">' +
        '<span class="select2-selection__choice__remove" role="presentation">' +
          '&times;' +
        '</span>' +
      '</li>'
    );

    return $container;
  };

  MultipleSelection.prototype.update = function (data) {
    this.clear();

    if (data.length === 0) {
      return;
    }

    var $selections = [];

    for (var d = 0; d < data.length; d++) {
      var selection = data[d];

      var $selection = this.selectionContainer();
      var formatted = this.display(selection, $selection);

      $selection.append(formatted);

      var title = selection.title || selection.text;

      if (title) {
        $selection.attr('title', title);
      }

      Utils.StoreData($selection[0], 'data', selection);

      $selections.push($selection);
    }

    var $rendered = this.$selection.find('.select2-selection__rendered');

    Utils.appendMany($rendered, $selections);
  };

  return MultipleSelection;
});

S2.define('select2/selection/placeholder',[
  '../utils'
], function (Utils) {
  function Placeholder (decorated, $element, options) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options);
  }

  Placeholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  Placeholder.prototype.createPlaceholder = function (decorated, placeholder) {
    var $placeholder = this.selectionContainer();

    $placeholder.html(this.display(placeholder));
    $placeholder.addClass('select2-selection__placeholder')
                .removeClass('select2-selection__choice');

    return $placeholder;
  };

  Placeholder.prototype.update = function (decorated, data) {
    var singlePlaceholder = (
      data.length == 1 && data[0].id != this.placeholder.id
    );
    var multipleSelections = data.length > 1;

    if (multipleSelections || singlePlaceholder) {
      return decorated.call(this, data);
    }

    this.clear();

    var $placeholder = this.createPlaceholder(this.placeholder);

    this.$selection.find('.select2-selection__rendered').append($placeholder);
  };

  return Placeholder;
});

S2.define('select2/selection/allowClear',[
  'jquery',
  '../keys',
  '../utils'
], function ($, KEYS, Utils) {
  function AllowClear () { }

  AllowClear.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    if (this.placeholder == null) {
      if (this.options.get('debug') && window.console && console.error) {
        console.error(
          'Select2: The `allowClear` option should be used in combination ' +
          'with the `placeholder` option.'
        );
      }
    }

    this.$selection.on('mousedown', '.select2-selection__clear',
      function (evt) {
        self._handleClear(evt);
    });

    container.on('keypress', function (evt) {
      self._handleKeyboardClear(evt, container);
    });
  };

  AllowClear.prototype._handleClear = function (_, evt) {
    // Ignore the event if it is disabled
    if (this.isDisabled()) {
      return;
    }

    var $clear = this.$selection.find('.select2-selection__clear');

    // Ignore the event if nothing has been selected
    if ($clear.length === 0) {
      return;
    }

    evt.stopPropagation();

    var data = Utils.GetData($clear[0], 'data');

    var previousVal = this.$element.val();
    this.$element.val(this.placeholder.id);

    var unselectData = {
      data: data
    };
    this.trigger('clear', unselectData);
    if (unselectData.prevented) {
      this.$element.val(previousVal);
      return;
    }

    for (var d = 0; d < data.length; d++) {
      unselectData = {
        data: data[d]
      };

      // Trigger the `unselect` event, so people can prevent it from being
      // cleared.
      this.trigger('unselect', unselectData);

      // If the event was prevented, don't clear it out.
      if (unselectData.prevented) {
        this.$element.val(previousVal);
        return;
      }
    }

    this.$element.trigger('input').trigger('change');

    this.trigger('toggle', {});
  };

  AllowClear.prototype._handleKeyboardClear = function (_, evt, container) {
    if (container.isOpen()) {
      return;
    }

    if (evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE) {
      this._handleClear(evt);
    }
  };

  AllowClear.prototype.update = function (decorated, data) {
    decorated.call(this, data);

    if (this.$selection.find('.select2-selection__placeholder').length > 0 ||
        data.length === 0) {
      return;
    }

    var removeAll = this.options.get('translations').get('removeAllItems');

    var $remove = $(
      '<span class="select2-selection__clear" title="' + removeAll() +'">' +
        '&times;' +
      '</span>'
    );
    Utils.StoreData($remove[0], 'data', data);

    this.$selection.find('.select2-selection__rendered').prepend($remove);
  };

  return AllowClear;
});

S2.define('select2/selection/search',[
  'jquery',
  '../utils',
  '../keys'
], function ($, Utils, KEYS) {
  function Search (decorated, $element, options) {
    decorated.call(this, $element, options);
  }

  Search.prototype.render = function (decorated) {
    var $search = $(
      '<li class="select2-search select2-search--inline">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
      '</li>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    var $rendered = decorated.call(this);

    this._transferTabIndex();

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var resultsId = container.id + '-results';

    decorated.call(this, container, $container);

    container.on('open', function () {
      self.$search.attr('aria-controls', resultsId);
      self.$search.trigger('focus');
    });

    container.on('close', function () {
      self.$search.val('');
      self.$search.removeAttr('aria-controls');
      self.$search.removeAttr('aria-activedescendant');
      self.$search.trigger('focus');
    });

    container.on('enable', function () {
      self.$search.prop('disabled', false);

      self._transferTabIndex();
    });

    container.on('disable', function () {
      self.$search.prop('disabled', true);
    });

    container.on('focus', function (evt) {
      self.$search.trigger('focus');
    });

    container.on('results:focus', function (params) {
      if (params.data._resultId) {
        self.$search.attr('aria-activedescendant', params.data._resultId);
      } else {
        self.$search.removeAttr('aria-activedescendant');
      }
    });

    this.$selection.on('focusin', '.select2-search--inline', function (evt) {
      self.trigger('focus', evt);
    });

    this.$selection.on('focusout', '.select2-search--inline', function (evt) {
      self._handleBlur(evt);
    });

    this.$selection.on('keydown', '.select2-search--inline', function (evt) {
      evt.stopPropagation();

      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();

      var key = evt.which;

      if (key === KEYS.BACKSPACE && self.$search.val() === '') {
        var $previousChoice = self.$searchContainer
          .prev('.select2-selection__choice');

        if ($previousChoice.length > 0) {
          var item = Utils.GetData($previousChoice[0], 'data');

          self.searchRemoveChoice(item);

          evt.preventDefault();
        }
      }
    });

    this.$selection.on('click', '.select2-search--inline', function (evt) {
      if (self.$search.val()) {
        evt.stopPropagation();
      }
    });

    // Try to detect the IE version should the `documentMode` property that
    // is stored on the document. This is only implemented in IE and is
    // slightly cleaner than doing a user agent check.
    // This property is not available in Edge, but Edge also doesn't have
    // this bug.
    var msie = document.documentMode;
    var disableInputEvents = msie && msie <= 11;

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$selection.on(
      'input.searchcheck',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents) {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        // Unbind the duplicated `keyup` event
        self.$selection.off('keyup.search');
      }
    );

    this.$selection.on(
      'keyup.search input.search',
      '.select2-search--inline',
      function (evt) {
        // IE will trigger the `input` event when a placeholder is used on a
        // search box. To get around this issue, we are forced to ignore all
        // `input` events in IE and keep using `keyup`.
        if (disableInputEvents && evt.type === 'input') {
          self.$selection.off('input.search input.searchcheck');
          return;
        }

        var key = evt.which;

        // We can freely ignore events from modifier keys
        if (key == KEYS.SHIFT || key == KEYS.CTRL || key == KEYS.ALT) {
          return;
        }

        // Tabbing will be handled during the `keydown` phase
        if (key == KEYS.TAB) {
          return;
        }

        self.handleSearch(evt);
      }
    );
  };

  /**
   * This method will transfer the tabindex attribute from the rendered
   * selection to the search box. This allows for the search box to be used as
   * the primary focus instead of the selection container.
   *
   * @private
   */
  Search.prototype._transferTabIndex = function (decorated) {
    this.$search.attr('tabindex', this.$selection.attr('tabindex'));
    this.$selection.attr('tabindex', '-1');
  };

  Search.prototype.createPlaceholder = function (decorated, placeholder) {
    this.$search.attr('placeholder', placeholder.text);
  };

  Search.prototype.update = function (decorated, data) {
    var searchHadFocus = this.$search[0] == document.activeElement;

    this.$search.attr('placeholder', '');

    decorated.call(this, data);

    this.$selection.find('.select2-selection__rendered')
                   .append(this.$searchContainer);

    this.resizeSearch();
    if (searchHadFocus) {
      this.$search.trigger('focus');
    }
  };

  Search.prototype.handleSearch = function () {
    this.resizeSearch();

    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.searchRemoveChoice = function (decorated, item) {
    this.trigger('unselect', {
      data: item
    });

    this.$search.val(item.text);
    this.handleSearch();
  };

  Search.prototype.resizeSearch = function () {
    this.$search.css('width', '25px');

    var width = '';

    if (this.$search.attr('placeholder') !== '') {
      width = this.$selection.find('.select2-selection__rendered').width();
    } else {
      var minimumWidth = this.$search.val().length + 1;

      width = (minimumWidth * 0.75) + 'em';
    }

    this.$search.css('width', width);
  };

  return Search;
});

S2.define('select2/selection/eventRelay',[
  'jquery'
], function ($) {
  function EventRelay () { }

  EventRelay.prototype.bind = function (decorated, container, $container) {
    var self = this;
    var relayEvents = [
      'open', 'opening',
      'close', 'closing',
      'select', 'selecting',
      'unselect', 'unselecting',
      'clear', 'clearing'
    ];

    var preventableEvents = [
      'opening', 'closing', 'selecting', 'unselecting', 'clearing'
    ];

    decorated.call(this, container, $container);

    container.on('*', function (name, params) {
      // Ignore events that should not be relayed
      if ($.inArray(name, relayEvents) === -1) {
        return;
      }

      // The parameters should always be an object
      params = params || {};

      // Generate the jQuery event for the Select2 event
      var evt = $.Event('select2:' + name, {
        params: params
      });

      self.$element.trigger(evt);

      // Only handle preventable events if it was one
      if ($.inArray(name, preventableEvents) === -1) {
        return;
      }

      params.prevented = evt.isDefaultPrevented();
    });
  };

  return EventRelay;
});

S2.define('select2/translation',[
  'jquery',
  'require'
], function ($, require) {
  function Translation (dict) {
    this.dict = dict || {};
  }

  Translation.prototype.all = function () {
    return this.dict;
  };

  Translation.prototype.get = function (key) {
    return this.dict[key];
  };

  Translation.prototype.extend = function (translation) {
    this.dict = $.extend({}, translation.all(), this.dict);
  };

  // Static functions

  Translation._cache = {};

  Translation.loadPath = function (path) {
    if (!(path in Translation._cache)) {
      var translations = require(path);

      Translation._cache[path] = translations;
    }

    return new Translation(Translation._cache[path]);
  };

  return Translation;
});

S2.define('select2/diacritics',[

], function () {
  var diacritics = {
    '\u24B6': 'A',
    '\uFF21': 'A',
    '\u00C0': 'A',
    '\u00C1': 'A',
    '\u00C2': 'A',
    '\u1EA6': 'A',
    '\u1EA4': 'A',
    '\u1EAA': 'A',
    '\u1EA8': 'A',
    '\u00C3': 'A',
    '\u0100': 'A',
    '\u0102': 'A',
    '\u1EB0': 'A',
    '\u1EAE': 'A',
    '\u1EB4': 'A',
    '\u1EB2': 'A',
    '\u0226': 'A',
    '\u01E0': 'A',
    '\u00C4': 'A',
    '\u01DE': 'A',
    '\u1EA2': 'A',
    '\u00C5': 'A',
    '\u01FA': 'A',
    '\u01CD': 'A',
    '\u0200': 'A',
    '\u0202': 'A',
    '\u1EA0': 'A',
    '\u1EAC': 'A',
    '\u1EB6': 'A',
    '\u1E00': 'A',
    '\u0104': 'A',
    '\u023A': 'A',
    '\u2C6F': 'A',
    '\uA732': 'AA',
    '\u00C6': 'AE',
    '\u01FC': 'AE',
    '\u01E2': 'AE',
    '\uA734': 'AO',
    '\uA736': 'AU',
    '\uA738': 'AV',
    '\uA73A': 'AV',
    '\uA73C': 'AY',
    '\u24B7': 'B',
    '\uFF22': 'B',
    '\u1E02': 'B',
    '\u1E04': 'B',
    '\u1E06': 'B',
    '\u0243': 'B',
    '\u0182': 'B',
    '\u0181': 'B',
    '\u24B8': 'C',
    '\uFF23': 'C',
    '\u0106': 'C',
    '\u0108': 'C',
    '\u010A': 'C',
    '\u010C': 'C',
    '\u00C7': 'C',
    '\u1E08': 'C',
    '\u0187': 'C',
    '\u023B': 'C',
    '\uA73E': 'C',
    '\u24B9': 'D',
    '\uFF24': 'D',
    '\u1E0A': 'D',
    '\u010E': 'D',
    '\u1E0C': 'D',
    '\u1E10': 'D',
    '\u1E12': 'D',
    '\u1E0E': 'D',
    '\u0110': 'D',
    '\u018B': 'D',
    '\u018A': 'D',
    '\u0189': 'D',
    '\uA779': 'D',
    '\u01F1': 'DZ',
    '\u01C4': 'DZ',
    '\u01F2': 'Dz',
    '\u01C5': 'Dz',
    '\u24BA': 'E',
    '\uFF25': 'E',
    '\u00C8': 'E',
    '\u00C9': 'E',
    '\u00CA': 'E',
    '\u1EC0': 'E',
    '\u1EBE': 'E',
    '\u1EC4': 'E',
    '\u1EC2': 'E',
    '\u1EBC': 'E',
    '\u0112': 'E',
    '\u1E14': 'E',
    '\u1E16': 'E',
    '\u0114': 'E',
    '\u0116': 'E',
    '\u00CB': 'E',
    '\u1EBA': 'E',
    '\u011A': 'E',
    '\u0204': 'E',
    '\u0206': 'E',
    '\u1EB8': 'E',
    '\u1EC6': 'E',
    '\u0228': 'E',
    '\u1E1C': 'E',
    '\u0118': 'E',
    '\u1E18': 'E',
    '\u1E1A': 'E',
    '\u0190': 'E',
    '\u018E': 'E',
    '\u24BB': 'F',
    '\uFF26': 'F',
    '\u1E1E': 'F',
    '\u0191': 'F',
    '\uA77B': 'F',
    '\u24BC': 'G',
    '\uFF27': 'G',
    '\u01F4': 'G',
    '\u011C': 'G',
    '\u1E20': 'G',
    '\u011E': 'G',
    '\u0120': 'G',
    '\u01E6': 'G',
    '\u0122': 'G',
    '\u01E4': 'G',
    '\u0193': 'G',
    '\uA7A0': 'G',
    '\uA77D': 'G',
    '\uA77E': 'G',
    '\u24BD': 'H',
    '\uFF28': 'H',
    '\u0124': 'H',
    '\u1E22': 'H',
    '\u1E26': 'H',
    '\u021E': 'H',
    '\u1E24': 'H',
    '\u1E28': 'H',
    '\u1E2A': 'H',
    '\u0126': 'H',
    '\u2C67': 'H',
    '\u2C75': 'H',
    '\uA78D': 'H',
    '\u24BE': 'I',
    '\uFF29': 'I',
    '\u00CC': 'I',
    '\u00CD': 'I',
    '\u00CE': 'I',
    '\u0128': 'I',
    '\u012A': 'I',
    '\u012C': 'I',
    '\u0130': 'I',
    '\u00CF': 'I',
    '\u1E2E': 'I',
    '\u1EC8': 'I',
    '\u01CF': 'I',
    '\u0208': 'I',
    '\u020A': 'I',
    '\u1ECA': 'I',
    '\u012E': 'I',
    '\u1E2C': 'I',
    '\u0197': 'I',
    '\u24BF': 'J',
    '\uFF2A': 'J',
    '\u0134': 'J',
    '\u0248': 'J',
    '\u24C0': 'K',
    '\uFF2B': 'K',
    '\u1E30': 'K',
    '\u01E8': 'K',
    '\u1E32': 'K',
    '\u0136': 'K',
    '\u1E34': 'K',
    '\u0198': 'K',
    '\u2C69': 'K',
    '\uA740': 'K',
    '\uA742': 'K',
    '\uA744': 'K',
    '\uA7A2': 'K',
    '\u24C1': 'L',
    '\uFF2C': 'L',
    '\u013F': 'L',
    '\u0139': 'L',
    '\u013D': 'L',
    '\u1E36': 'L',
    '\u1E38': 'L',
    '\u013B': 'L',
    '\u1E3C': 'L',
    '\u1E3A': 'L',
    '\u0141': 'L',
    '\u023D': 'L',
    '\u2C62': 'L',
    '\u2C60': 'L',
    '\uA748': 'L',
    '\uA746': 'L',
    '\uA780': 'L',
    '\u01C7': 'LJ',
    '\u01C8': 'Lj',
    '\u24C2': 'M',
    '\uFF2D': 'M',
    '\u1E3E': 'M',
    '\u1E40': 'M',
    '\u1E42': 'M',
    '\u2C6E': 'M',
    '\u019C': 'M',
    '\u24C3': 'N',
    '\uFF2E': 'N',
    '\u01F8': 'N',
    '\u0143': 'N',
    '\u00D1': 'N',
    '\u1E44': 'N',
    '\u0147': 'N',
    '\u1E46': 'N',
    '\u0145': 'N',
    '\u1E4A': 'N',
    '\u1E48': 'N',
    '\u0220': 'N',
    '\u019D': 'N',
    '\uA790': 'N',
    '\uA7A4': 'N',
    '\u01CA': 'NJ',
    '\u01CB': 'Nj',
    '\u24C4': 'O',
    '\uFF2F': 'O',
    '\u00D2': 'O',
    '\u00D3': 'O',
    '\u00D4': 'O',
    '\u1ED2': 'O',
    '\u1ED0': 'O',
    '\u1ED6': 'O',
    '\u1ED4': 'O',
    '\u00D5': 'O',
    '\u1E4C': 'O',
    '\u022C': 'O',
    '\u1E4E': 'O',
    '\u014C': 'O',
    '\u1E50': 'O',
    '\u1E52': 'O',
    '\u014E': 'O',
    '\u022E': 'O',
    '\u0230': 'O',
    '\u00D6': 'O',
    '\u022A': 'O',
    '\u1ECE': 'O',
    '\u0150': 'O',
    '\u01D1': 'O',
    '\u020C': 'O',
    '\u020E': 'O',
    '\u01A0': 'O',
    '\u1EDC': 'O',
    '\u1EDA': 'O',
    '\u1EE0': 'O',
    '\u1EDE': 'O',
    '\u1EE2': 'O',
    '\u1ECC': 'O',
    '\u1ED8': 'O',
    '\u01EA': 'O',
    '\u01EC': 'O',
    '\u00D8': 'O',
    '\u01FE': 'O',
    '\u0186': 'O',
    '\u019F': 'O',
    '\uA74A': 'O',
    '\uA74C': 'O',
    '\u0152': 'OE',
    '\u01A2': 'OI',
    '\uA74E': 'OO',
    '\u0222': 'OU',
    '\u24C5': 'P',
    '\uFF30': 'P',
    '\u1E54': 'P',
    '\u1E56': 'P',
    '\u01A4': 'P',
    '\u2C63': 'P',
    '\uA750': 'P',
    '\uA752': 'P',
    '\uA754': 'P',
    '\u24C6': 'Q',
    '\uFF31': 'Q',
    '\uA756': 'Q',
    '\uA758': 'Q',
    '\u024A': 'Q',
    '\u24C7': 'R',
    '\uFF32': 'R',
    '\u0154': 'R',
    '\u1E58': 'R',
    '\u0158': 'R',
    '\u0210': 'R',
    '\u0212': 'R',
    '\u1E5A': 'R',
    '\u1E5C': 'R',
    '\u0156': 'R',
    '\u1E5E': 'R',
    '\u024C': 'R',
    '\u2C64': 'R',
    '\uA75A': 'R',
    '\uA7A6': 'R',
    '\uA782': 'R',
    '\u24C8': 'S',
    '\uFF33': 'S',
    '\u1E9E': 'S',
    '\u015A': 'S',
    '\u1E64': 'S',
    '\u015C': 'S',
    '\u1E60': 'S',
    '\u0160': 'S',
    '\u1E66': 'S',
    '\u1E62': 'S',
    '\u1E68': 'S',
    '\u0218': 'S',
    '\u015E': 'S',
    '\u2C7E': 'S',
    '\uA7A8': 'S',
    '\uA784': 'S',
    '\u24C9': 'T',
    '\uFF34': 'T',
    '\u1E6A': 'T',
    '\u0164': 'T',
    '\u1E6C': 'T',
    '\u021A': 'T',
    '\u0162': 'T',
    '\u1E70': 'T',
    '\u1E6E': 'T',
    '\u0166': 'T',
    '\u01AC': 'T',
    '\u01AE': 'T',
    '\u023E': 'T',
    '\uA786': 'T',
    '\uA728': 'TZ',
    '\u24CA': 'U',
    '\uFF35': 'U',
    '\u00D9': 'U',
    '\u00DA': 'U',
    '\u00DB': 'U',
    '\u0168': 'U',
    '\u1E78': 'U',
    '\u016A': 'U',
    '\u1E7A': 'U',
    '\u016C': 'U',
    '\u00DC': 'U',
    '\u01DB': 'U',
    '\u01D7': 'U',
    '\u01D5': 'U',
    '\u01D9': 'U',
    '\u1EE6': 'U',
    '\u016E': 'U',
    '\u0170': 'U',
    '\u01D3': 'U',
    '\u0214': 'U',
    '\u0216': 'U',
    '\u01AF': 'U',
    '\u1EEA': 'U',
    '\u1EE8': 'U',
    '\u1EEE': 'U',
    '\u1EEC': 'U',
    '\u1EF0': 'U',
    '\u1EE4': 'U',
    '\u1E72': 'U',
    '\u0172': 'U',
    '\u1E76': 'U',
    '\u1E74': 'U',
    '\u0244': 'U',
    '\u24CB': 'V',
    '\uFF36': 'V',
    '\u1E7C': 'V',
    '\u1E7E': 'V',
    '\u01B2': 'V',
    '\uA75E': 'V',
    '\u0245': 'V',
    '\uA760': 'VY',
    '\u24CC': 'W',
    '\uFF37': 'W',
    '\u1E80': 'W',
    '\u1E82': 'W',
    '\u0174': 'W',
    '\u1E86': 'W',
    '\u1E84': 'W',
    '\u1E88': 'W',
    '\u2C72': 'W',
    '\u24CD': 'X',
    '\uFF38': 'X',
    '\u1E8A': 'X',
    '\u1E8C': 'X',
    '\u24CE': 'Y',
    '\uFF39': 'Y',
    '\u1EF2': 'Y',
    '\u00DD': 'Y',
    '\u0176': 'Y',
    '\u1EF8': 'Y',
    '\u0232': 'Y',
    '\u1E8E': 'Y',
    '\u0178': 'Y',
    '\u1EF6': 'Y',
    '\u1EF4': 'Y',
    '\u01B3': 'Y',
    '\u024E': 'Y',
    '\u1EFE': 'Y',
    '\u24CF': 'Z',
    '\uFF3A': 'Z',
    '\u0179': 'Z',
    '\u1E90': 'Z',
    '\u017B': 'Z',
    '\u017D': 'Z',
    '\u1E92': 'Z',
    '\u1E94': 'Z',
    '\u01B5': 'Z',
    '\u0224': 'Z',
    '\u2C7F': 'Z',
    '\u2C6B': 'Z',
    '\uA762': 'Z',
    '\u24D0': 'a',
    '\uFF41': 'a',
    '\u1E9A': 'a',
    '\u00E0': 'a',
    '\u00E1': 'a',
    '\u00E2': 'a',
    '\u1EA7': 'a',
    '\u1EA5': 'a',
    '\u1EAB': 'a',
    '\u1EA9': 'a',
    '\u00E3': 'a',
    '\u0101': 'a',
    '\u0103': 'a',
    '\u1EB1': 'a',
    '\u1EAF': 'a',
    '\u1EB5': 'a',
    '\u1EB3': 'a',
    '\u0227': 'a',
    '\u01E1': 'a',
    '\u00E4': 'a',
    '\u01DF': 'a',
    '\u1EA3': 'a',
    '\u00E5': 'a',
    '\u01FB': 'a',
    '\u01CE': 'a',
    '\u0201': 'a',
    '\u0203': 'a',
    '\u1EA1': 'a',
    '\u1EAD': 'a',
    '\u1EB7': 'a',
    '\u1E01': 'a',
    '\u0105': 'a',
    '\u2C65': 'a',
    '\u0250': 'a',
    '\uA733': 'aa',
    '\u00E6': 'ae',
    '\u01FD': 'ae',
    '\u01E3': 'ae',
    '\uA735': 'ao',
    '\uA737': 'au',
    '\uA739': 'av',
    '\uA73B': 'av',
    '\uA73D': 'ay',
    '\u24D1': 'b',
    '\uFF42': 'b',
    '\u1E03': 'b',
    '\u1E05': 'b',
    '\u1E07': 'b',
    '\u0180': 'b',
    '\u0183': 'b',
    '\u0253': 'b',
    '\u24D2': 'c',
    '\uFF43': 'c',
    '\u0107': 'c',
    '\u0109': 'c',
    '\u010B': 'c',
    '\u010D': 'c',
    '\u00E7': 'c',
    '\u1E09': 'c',
    '\u0188': 'c',
    '\u023C': 'c',
    '\uA73F': 'c',
    '\u2184': 'c',
    '\u24D3': 'd',
    '\uFF44': 'd',
    '\u1E0B': 'd',
    '\u010F': 'd',
    '\u1E0D': 'd',
    '\u1E11': 'd',
    '\u1E13': 'd',
    '\u1E0F': 'd',
    '\u0111': 'd',
    '\u018C': 'd',
    '\u0256': 'd',
    '\u0257': 'd',
    '\uA77A': 'd',
    '\u01F3': 'dz',
    '\u01C6': 'dz',
    '\u24D4': 'e',
    '\uFF45': 'e',
    '\u00E8': 'e',
    '\u00E9': 'e',
    '\u00EA': 'e',
    '\u1EC1': 'e',
    '\u1EBF': 'e',
    '\u1EC5': 'e',
    '\u1EC3': 'e',
    '\u1EBD': 'e',
    '\u0113': 'e',
    '\u1E15': 'e',
    '\u1E17': 'e',
    '\u0115': 'e',
    '\u0117': 'e',
    '\u00EB': 'e',
    '\u1EBB': 'e',
    '\u011B': 'e',
    '\u0205': 'e',
    '\u0207': 'e',
    '\u1EB9': 'e',
    '\u1EC7': 'e',
    '\u0229': 'e',
    '\u1E1D': 'e',
    '\u0119': 'e',
    '\u1E19': 'e',
    '\u1E1B': 'e',
    '\u0247': 'e',
    '\u025B': 'e',
    '\u01DD': 'e',
    '\u24D5': 'f',
    '\uFF46': 'f',
    '\u1E1F': 'f',
    '\u0192': 'f',
    '\uA77C': 'f',
    '\u24D6': 'g',
    '\uFF47': 'g',
    '\u01F5': 'g',
    '\u011D': 'g',
    '\u1E21': 'g',
    '\u011F': 'g',
    '\u0121': 'g',
    '\u01E7': 'g',
    '\u0123': 'g',
    '\u01E5': 'g',
    '\u0260': 'g',
    '\uA7A1': 'g',
    '\u1D79': 'g',
    '\uA77F': 'g',
    '\u24D7': 'h',
    '\uFF48': 'h',
    '\u0125': 'h',
    '\u1E23': 'h',
    '\u1E27': 'h',
    '\u021F': 'h',
    '\u1E25': 'h',
    '\u1E29': 'h',
    '\u1E2B': 'h',
    '\u1E96': 'h',
    '\u0127': 'h',
    '\u2C68': 'h',
    '\u2C76': 'h',
    '\u0265': 'h',
    '\u0195': 'hv',
    '\u24D8': 'i',
    '\uFF49': 'i',
    '\u00EC': 'i',
    '\u00ED': 'i',
    '\u00EE': 'i',
    '\u0129': 'i',
    '\u012B': 'i',
    '\u012D': 'i',
    '\u00EF': 'i',
    '\u1E2F': 'i',
    '\u1EC9': 'i',
    '\u01D0': 'i',
    '\u0209': 'i',
    '\u020B': 'i',
    '\u1ECB': 'i',
    '\u012F': 'i',
    '\u1E2D': 'i',
    '\u0268': 'i',
    '\u0131': 'i',
    '\u24D9': 'j',
    '\uFF4A': 'j',
    '\u0135': 'j',
    '\u01F0': 'j',
    '\u0249': 'j',
    '\u24DA': 'k',
    '\uFF4B': 'k',
    '\u1E31': 'k',
    '\u01E9': 'k',
    '\u1E33': 'k',
    '\u0137': 'k',
    '\u1E35': 'k',
    '\u0199': 'k',
    '\u2C6A': 'k',
    '\uA741': 'k',
    '\uA743': 'k',
    '\uA745': 'k',
    '\uA7A3': 'k',
    '\u24DB': 'l',
    '\uFF4C': 'l',
    '\u0140': 'l',
    '\u013A': 'l',
    '\u013E': 'l',
    '\u1E37': 'l',
    '\u1E39': 'l',
    '\u013C': 'l',
    '\u1E3D': 'l',
    '\u1E3B': 'l',
    '\u017F': 'l',
    '\u0142': 'l',
    '\u019A': 'l',
    '\u026B': 'l',
    '\u2C61': 'l',
    '\uA749': 'l',
    '\uA781': 'l',
    '\uA747': 'l',
    '\u01C9': 'lj',
    '\u24DC': 'm',
    '\uFF4D': 'm',
    '\u1E3F': 'm',
    '\u1E41': 'm',
    '\u1E43': 'm',
    '\u0271': 'm',
    '\u026F': 'm',
    '\u24DD': 'n',
    '\uFF4E': 'n',
    '\u01F9': 'n',
    '\u0144': 'n',
    '\u00F1': 'n',
    '\u1E45': 'n',
    '\u0148': 'n',
    '\u1E47': 'n',
    '\u0146': 'n',
    '\u1E4B': 'n',
    '\u1E49': 'n',
    '\u019E': 'n',
    '\u0272': 'n',
    '\u0149': 'n',
    '\uA791': 'n',
    '\uA7A5': 'n',
    '\u01CC': 'nj',
    '\u24DE': 'o',
    '\uFF4F': 'o',
    '\u00F2': 'o',
    '\u00F3': 'o',
    '\u00F4': 'o',
    '\u1ED3': 'o',
    '\u1ED1': 'o',
    '\u1ED7': 'o',
    '\u1ED5': 'o',
    '\u00F5': 'o',
    '\u1E4D': 'o',
    '\u022D': 'o',
    '\u1E4F': 'o',
    '\u014D': 'o',
    '\u1E51': 'o',
    '\u1E53': 'o',
    '\u014F': 'o',
    '\u022F': 'o',
    '\u0231': 'o',
    '\u00F6': 'o',
    '\u022B': 'o',
    '\u1ECF': 'o',
    '\u0151': 'o',
    '\u01D2': 'o',
    '\u020D': 'o',
    '\u020F': 'o',
    '\u01A1': 'o',
    '\u1EDD': 'o',
    '\u1EDB': 'o',
    '\u1EE1': 'o',
    '\u1EDF': 'o',
    '\u1EE3': 'o',
    '\u1ECD': 'o',
    '\u1ED9': 'o',
    '\u01EB': 'o',
    '\u01ED': 'o',
    '\u00F8': 'o',
    '\u01FF': 'o',
    '\u0254': 'o',
    '\uA74B': 'o',
    '\uA74D': 'o',
    '\u0275': 'o',
    '\u0153': 'oe',
    '\u01A3': 'oi',
    '\u0223': 'ou',
    '\uA74F': 'oo',
    '\u24DF': 'p',
    '\uFF50': 'p',
    '\u1E55': 'p',
    '\u1E57': 'p',
    '\u01A5': 'p',
    '\u1D7D': 'p',
    '\uA751': 'p',
    '\uA753': 'p',
    '\uA755': 'p',
    '\u24E0': 'q',
    '\uFF51': 'q',
    '\u024B': 'q',
    '\uA757': 'q',
    '\uA759': 'q',
    '\u24E1': 'r',
    '\uFF52': 'r',
    '\u0155': 'r',
    '\u1E59': 'r',
    '\u0159': 'r',
    '\u0211': 'r',
    '\u0213': 'r',
    '\u1E5B': 'r',
    '\u1E5D': 'r',
    '\u0157': 'r',
    '\u1E5F': 'r',
    '\u024D': 'r',
    '\u027D': 'r',
    '\uA75B': 'r',
    '\uA7A7': 'r',
    '\uA783': 'r',
    '\u24E2': 's',
    '\uFF53': 's',
    '\u00DF': 's',
    '\u015B': 's',
    '\u1E65': 's',
    '\u015D': 's',
    '\u1E61': 's',
    '\u0161': 's',
    '\u1E67': 's',
    '\u1E63': 's',
    '\u1E69': 's',
    '\u0219': 's',
    '\u015F': 's',
    '\u023F': 's',
    '\uA7A9': 's',
    '\uA785': 's',
    '\u1E9B': 's',
    '\u24E3': 't',
    '\uFF54': 't',
    '\u1E6B': 't',
    '\u1E97': 't',
    '\u0165': 't',
    '\u1E6D': 't',
    '\u021B': 't',
    '\u0163': 't',
    '\u1E71': 't',
    '\u1E6F': 't',
    '\u0167': 't',
    '\u01AD': 't',
    '\u0288': 't',
    '\u2C66': 't',
    '\uA787': 't',
    '\uA729': 'tz',
    '\u24E4': 'u',
    '\uFF55': 'u',
    '\u00F9': 'u',
    '\u00FA': 'u',
    '\u00FB': 'u',
    '\u0169': 'u',
    '\u1E79': 'u',
    '\u016B': 'u',
    '\u1E7B': 'u',
    '\u016D': 'u',
    '\u00FC': 'u',
    '\u01DC': 'u',
    '\u01D8': 'u',
    '\u01D6': 'u',
    '\u01DA': 'u',
    '\u1EE7': 'u',
    '\u016F': 'u',
    '\u0171': 'u',
    '\u01D4': 'u',
    '\u0215': 'u',
    '\u0217': 'u',
    '\u01B0': 'u',
    '\u1EEB': 'u',
    '\u1EE9': 'u',
    '\u1EEF': 'u',
    '\u1EED': 'u',
    '\u1EF1': 'u',
    '\u1EE5': 'u',
    '\u1E73': 'u',
    '\u0173': 'u',
    '\u1E77': 'u',
    '\u1E75': 'u',
    '\u0289': 'u',
    '\u24E5': 'v',
    '\uFF56': 'v',
    '\u1E7D': 'v',
    '\u1E7F': 'v',
    '\u028B': 'v',
    '\uA75F': 'v',
    '\u028C': 'v',
    '\uA761': 'vy',
    '\u24E6': 'w',
    '\uFF57': 'w',
    '\u1E81': 'w',
    '\u1E83': 'w',
    '\u0175': 'w',
    '\u1E87': 'w',
    '\u1E85': 'w',
    '\u1E98': 'w',
    '\u1E89': 'w',
    '\u2C73': 'w',
    '\u24E7': 'x',
    '\uFF58': 'x',
    '\u1E8B': 'x',
    '\u1E8D': 'x',
    '\u24E8': 'y',
    '\uFF59': 'y',
    '\u1EF3': 'y',
    '\u00FD': 'y',
    '\u0177': 'y',
    '\u1EF9': 'y',
    '\u0233': 'y',
    '\u1E8F': 'y',
    '\u00FF': 'y',
    '\u1EF7': 'y',
    '\u1E99': 'y',
    '\u1EF5': 'y',
    '\u01B4': 'y',
    '\u024F': 'y',
    '\u1EFF': 'y',
    '\u24E9': 'z',
    '\uFF5A': 'z',
    '\u017A': 'z',
    '\u1E91': 'z',
    '\u017C': 'z',
    '\u017E': 'z',
    '\u1E93': 'z',
    '\u1E95': 'z',
    '\u01B6': 'z',
    '\u0225': 'z',
    '\u0240': 'z',
    '\u2C6C': 'z',
    '\uA763': 'z',
    '\u0386': '\u0391',
    '\u0388': '\u0395',
    '\u0389': '\u0397',
    '\u038A': '\u0399',
    '\u03AA': '\u0399',
    '\u038C': '\u039F',
    '\u038E': '\u03A5',
    '\u03AB': '\u03A5',
    '\u038F': '\u03A9',
    '\u03AC': '\u03B1',
    '\u03AD': '\u03B5',
    '\u03AE': '\u03B7',
    '\u03AF': '\u03B9',
    '\u03CA': '\u03B9',
    '\u0390': '\u03B9',
    '\u03CC': '\u03BF',
    '\u03CD': '\u03C5',
    '\u03CB': '\u03C5',
    '\u03B0': '\u03C5',
    '\u03CE': '\u03C9',
    '\u03C2': '\u03C3',
    '\u2019': '\''
  };

  return diacritics;
});

S2.define('select2/data/base',[
  '../utils'
], function (Utils) {
  function BaseAdapter ($element, options) {
    BaseAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(BaseAdapter, Utils.Observable);

  BaseAdapter.prototype.current = function (callback) {
    throw new Error('The `current` method must be defined in child classes.');
  };

  BaseAdapter.prototype.query = function (params, callback) {
    throw new Error('The `query` method must be defined in child classes.');
  };

  BaseAdapter.prototype.bind = function (container, $container) {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.destroy = function () {
    // Can be implemented in subclasses
  };

  BaseAdapter.prototype.generateResultId = function (container, data) {
    var id = container.id + '-result-';

    id += Utils.generateChars(4);

    if (data.id != null) {
      id += '-' + data.id.toString();
    } else {
      id += '-' + Utils.generateChars(4);
    }
    return id;
  };

  return BaseAdapter;
});

S2.define('select2/data/select',[
  './base',
  '../utils',
  'jquery'
], function (BaseAdapter, Utils, $) {
  function SelectAdapter ($element, options) {
    this.$element = $element;
    this.options = options;

    SelectAdapter.__super__.constructor.call(this);
  }

  Utils.Extend(SelectAdapter, BaseAdapter);

  SelectAdapter.prototype.current = function (callback) {
    var data = [];
    var self = this;

    this.$element.find(':selected').each(function () {
      var $option = $(this);

      var option = self.item($option);

      data.push(option);
    });

    callback(data);
  };

  SelectAdapter.prototype.select = function (data) {
    var self = this;

    data.selected = true;

    // If data.element is a DOM node, use it instead
    if ($(data.element).is('option')) {
      data.element.selected = true;

      this.$element.trigger('input').trigger('change');

      return;
    }

    if (this.$element.prop('multiple')) {
      this.current(function (currentData) {
        var val = [];

        data = [data];
        data.push.apply(data, currentData);

        for (var d = 0; d < data.length; d++) {
          var id = data[d].id;

          if ($.inArray(id, val) === -1) {
            val.push(id);
          }
        }

        self.$element.val(val);
        self.$element.trigger('input').trigger('change');
      });
    } else {
      var val = data.id;

      this.$element.val(val);
      this.$element.trigger('input').trigger('change');
    }
  };

  SelectAdapter.prototype.unselect = function (data) {
    var self = this;

    if (!this.$element.prop('multiple')) {
      return;
    }

    data.selected = false;

    if ($(data.element).is('option')) {
      data.element.selected = false;

      this.$element.trigger('input').trigger('change');

      return;
    }

    this.current(function (currentData) {
      var val = [];

      for (var d = 0; d < currentData.length; d++) {
        var id = currentData[d].id;

        if (id !== data.id && $.inArray(id, val) === -1) {
          val.push(id);
        }
      }

      self.$element.val(val);

      self.$element.trigger('input').trigger('change');
    });
  };

  SelectAdapter.prototype.bind = function (container, $container) {
    var self = this;

    this.container = container;

    container.on('select', function (params) {
      self.select(params.data);
    });

    container.on('unselect', function (params) {
      self.unselect(params.data);
    });
  };

  SelectAdapter.prototype.destroy = function () {
    // Remove anything added to child elements
    this.$element.find('*').each(function () {
      // Remove any custom data set by Select2
      Utils.RemoveData(this);
    });
  };

  SelectAdapter.prototype.query = function (params, callback) {
    var data = [];
    var self = this;

    var $options = this.$element.children();

    $options.each(function () {
      var $option = $(this);

      if (!$option.is('option') && !$option.is('optgroup')) {
        return;
      }

      var option = self.item($option);

      var matches = self.matches(params, option);

      if (matches !== null) {
        data.push(matches);
      }
    });

    callback({
      results: data
    });
  };

  SelectAdapter.prototype.addOptions = function ($options) {
    Utils.appendMany(this.$element, $options);
  };

  SelectAdapter.prototype.option = function (data) {
    var option;

    if (data.children) {
      option = document.createElement('optgroup');
      option.label = data.text;
    } else {
      option = document.createElement('option');

      if (option.textContent !== undefined) {
        option.textContent = data.text;
      } else {
        option.innerText = data.text;
      }
    }

    if (data.id !== undefined) {
      option.value = data.id;
    }

    if (data.disabled) {
      option.disabled = true;
    }

    if (data.selected) {
      option.selected = true;
    }

    if (data.title) {
      option.title = data.title;
    }

    var $option = $(option);

    var normalizedData = this._normalizeItem(data);
    normalizedData.element = option;

    // Override the option's data with the combined data
    Utils.StoreData(option, 'data', normalizedData);

    return $option;
  };

  SelectAdapter.prototype.item = function ($option) {
    var data = {};

    data = Utils.GetData($option[0], 'data');

    if (data != null) {
      return data;
    }

    if ($option.is('option')) {
      data = {
        id: $option.val(),
        text: $option.text(),
        disabled: $option.prop('disabled'),
        selected: $option.prop('selected'),
        title: $option.prop('title')
      };
    } else if ($option.is('optgroup')) {
      data = {
        text: $option.prop('label'),
        children: [],
        title: $option.prop('title')
      };

      var $children = $option.children('option');
      var children = [];

      for (var c = 0; c < $children.length; c++) {
        var $child = $($children[c]);

        var child = this.item($child);

        children.push(child);
      }

      data.children = children;
    }

    data = this._normalizeItem(data);
    data.element = $option[0];

    Utils.StoreData($option[0], 'data', data);

    return data;
  };

  SelectAdapter.prototype._normalizeItem = function (item) {
    if (item !== Object(item)) {
      item = {
        id: item,
        text: item
      };
    }

    item = $.extend({}, {
      text: ''
    }, item);

    var defaults = {
      selected: false,
      disabled: false
    };

    if (item.id != null) {
      item.id = item.id.toString();
    }

    if (item.text != null) {
      item.text = item.text.toString();
    }

    if (item._resultId == null && item.id && this.container != null) {
      item._resultId = this.generateResultId(this.container, item);
    }

    return $.extend({}, defaults, item);
  };

  SelectAdapter.prototype.matches = function (params, data) {
    var matcher = this.options.get('matcher');

    return matcher(params, data);
  };

  return SelectAdapter;
});

S2.define('select2/data/array',[
  './select',
  '../utils',
  'jquery'
], function (SelectAdapter, Utils, $) {
  function ArrayAdapter ($element, options) {
    this._dataToConvert = options.get('data') || [];

    ArrayAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(ArrayAdapter, SelectAdapter);

  ArrayAdapter.prototype.bind = function (container, $container) {
    ArrayAdapter.__super__.bind.call(this, container, $container);

    this.addOptions(this.convertToOptions(this._dataToConvert));
  };

  ArrayAdapter.prototype.select = function (data) {
    var $option = this.$element.find('option').filter(function (i, elm) {
      return elm.value == data.id.toString();
    });

    if ($option.length === 0) {
      $option = this.option(data);

      this.addOptions($option);
    }

    ArrayAdapter.__super__.select.call(this, data);
  };

  ArrayAdapter.prototype.convertToOptions = function (data) {
    var self = this;

    var $existing = this.$element.find('option');
    var existingIds = $existing.map(function () {
      return self.item($(this)).id;
    }).get();

    var $options = [];

    // Filter out all items except for the one passed in the argument
    function onlyItem (item) {
      return function () {
        return $(this).val() == item.id;
      };
    }

    for (var d = 0; d < data.length; d++) {
      var item = this._normalizeItem(data[d]);

      // Skip items which were pre-loaded, only merge the data
      if ($.inArray(item.id, existingIds) >= 0) {
        var $existingOption = $existing.filter(onlyItem(item));

        var existingData = this.item($existingOption);
        var newData = $.extend(true, {}, item, existingData);

        var $newOption = this.option(newData);

        $existingOption.replaceWith($newOption);

        continue;
      }

      var $option = this.option(item);

      if (item.children) {
        var $children = this.convertToOptions(item.children);

        Utils.appendMany($option, $children);
      }

      $options.push($option);
    }

    return $options;
  };

  return ArrayAdapter;
});

S2.define('select2/data/ajax',[
  './array',
  '../utils',
  'jquery'
], function (ArrayAdapter, Utils, $) {
  function AjaxAdapter ($element, options) {
    this.ajaxOptions = this._applyDefaults(options.get('ajax'));

    if (this.ajaxOptions.processResults != null) {
      this.processResults = this.ajaxOptions.processResults;
    }

    AjaxAdapter.__super__.constructor.call(this, $element, options);
  }

  Utils.Extend(AjaxAdapter, ArrayAdapter);

  AjaxAdapter.prototype._applyDefaults = function (options) {
    var defaults = {
      data: function (params) {
        return $.extend({}, params, {
          q: params.term
        });
      },
      transport: function (params, success, failure) {
        var $request = $.ajax(params);

        $request.then(success);
        $request.fail(failure);

        return $request;
      }
    };

    return $.extend({}, defaults, options, true);
  };

  AjaxAdapter.prototype.processResults = function (results) {
    return results;
  };

  AjaxAdapter.prototype.query = function (params, callback) {
    var matches = [];
    var self = this;

    if (this._request != null) {
      // JSONP requests cannot always be aborted
      if ($.isFunction(this._request.abort)) {
        this._request.abort();
      }

      this._request = null;
    }

    var options = $.extend({
      type: 'GET'
    }, this.ajaxOptions);

    if (typeof options.url === 'function') {
      options.url = options.url.call(this.$element, params);
    }

    if (typeof options.data === 'function') {
      options.data = options.data.call(this.$element, params);
    }

    function request () {
      var $request = options.transport(options, function (data) {
        var results = self.processResults(data, params);

        if (self.options.get('debug') && window.console && console.error) {
          // Check to make sure that the response included a `results` key.
          if (!results || !results.results || !$.isArray(results.results)) {
            console.error(
              'Select2: The AJAX results did not return an array in the ' +
              '`results` key of the response.'
            );
          }
        }

        callback(results);
      }, function () {
        // Attempt to detect if a request was aborted
        // Only works if the transport exposes a status property
        if ('status' in $request &&
            ($request.status === 0 || $request.status === '0')) {
          return;
        }

        self.trigger('results:message', {
          message: 'errorLoading'
        });
      });

      self._request = $request;
    }

    if (this.ajaxOptions.delay && params.term != null) {
      if (this._queryTimeout) {
        window.clearTimeout(this._queryTimeout);
      }

      this._queryTimeout = window.setTimeout(request, this.ajaxOptions.delay);
    } else {
      request();
    }
  };

  return AjaxAdapter;
});

S2.define('select2/data/tags',[
  'jquery'
], function ($) {
  function Tags (decorated, $element, options) {
    var tags = options.get('tags');

    var createTag = options.get('createTag');

    if (createTag !== undefined) {
      this.createTag = createTag;
    }

    var insertTag = options.get('insertTag');

    if (insertTag !== undefined) {
        this.insertTag = insertTag;
    }

    decorated.call(this, $element, options);

    if ($.isArray(tags)) {
      for (var t = 0; t < tags.length; t++) {
        var tag = tags[t];
        var item = this._normalizeItem(tag);

        var $option = this.option(item);

        this.$element.append($option);
      }
    }
  }

  Tags.prototype.query = function (decorated, params, callback) {
    var self = this;

    this._removeOldTags();

    if (params.term == null || params.page != null) {
      decorated.call(this, params, callback);
      return;
    }

    function wrapper (obj, child) {
      var data = obj.results;

      for (var i = 0; i < data.length; i++) {
        var option = data[i];

        var checkChildren = (
          option.children != null &&
          !wrapper({
            results: option.children
          }, true)
        );

        var optionText = (option.text || '').toUpperCase();
        var paramsTerm = (params.term || '').toUpperCase();

        var checkText = optionText === paramsTerm;

        if (checkText || checkChildren) {
          if (child) {
            return false;
          }

          obj.data = data;
          callback(obj);

          return;
        }
      }

      if (child) {
        return true;
      }

      var tag = self.createTag(params);

      if (tag != null) {
        var $option = self.option(tag);
        $option.attr('data-select2-tag', true);

        self.addOptions([$option]);

        self.insertTag(data, tag);
      }

      obj.results = data;

      callback(obj);
    }

    decorated.call(this, params, wrapper);
  };

  Tags.prototype.createTag = function (decorated, params) {
    var term = $.trim(params.term);

    if (term === '') {
      return null;
    }

    return {
      id: term,
      text: term
    };
  };

  Tags.prototype.insertTag = function (_, data, tag) {
    data.unshift(tag);
  };

  Tags.prototype._removeOldTags = function (_) {
    var $options = this.$element.find('option[data-select2-tag]');

    $options.each(function () {
      if (this.selected) {
        return;
      }

      $(this).remove();
    });
  };

  return Tags;
});

S2.define('select2/data/tokenizer',[
  'jquery'
], function ($) {
  function Tokenizer (decorated, $element, options) {
    var tokenizer = options.get('tokenizer');

    if (tokenizer !== undefined) {
      this.tokenizer = tokenizer;
    }

    decorated.call(this, $element, options);
  }

  Tokenizer.prototype.bind = function (decorated, container, $container) {
    decorated.call(this, container, $container);

    this.$search =  container.dropdown.$search || container.selection.$search ||
      $container.find('.select2-search__field');
  };

  Tokenizer.prototype.query = function (decorated, params, callback) {
    var self = this;

    function createAndSelect (data) {
      // Normalize the data object so we can use it for checks
      var item = self._normalizeItem(data);

      // Check if the data object already exists as a tag
      // Select it if it doesn't
      var $existingOptions = self.$element.find('option').filter(function () {
        return $(this).val() === item.id;
      });

      // If an existing option wasn't found for it, create the option
      if (!$existingOptions.length) {
        var $option = self.option(item);
        $option.attr('data-select2-tag', true);

        self._removeOldTags();
        self.addOptions([$option]);
      }

      // Select the item, now that we know there is an option for it
      select(item);
    }

    function select (data) {
      self.trigger('select', {
        data: data
      });
    }

    params.term = params.term || '';

    var tokenData = this.tokenizer(params, this.options, createAndSelect);

    if (tokenData.term !== params.term) {
      // Replace the search term if we have the search box
      if (this.$search.length) {
        this.$search.val(tokenData.term);
        this.$search.trigger('focus');
      }

      params.term = tokenData.term;
    }

    decorated.call(this, params, callback);
  };

  Tokenizer.prototype.tokenizer = function (_, params, options, callback) {
    var separators = options.get('tokenSeparators') || [];
    var term = params.term;
    var i = 0;

    var createTag = this.createTag || function (params) {
      return {
        id: params.term,
        text: params.term
      };
    };

    while (i < term.length) {
      var termChar = term[i];

      if ($.inArray(termChar, separators) === -1) {
        i++;

        continue;
      }

      var part = term.substr(0, i);
      var partParams = $.extend({}, params, {
        term: part
      });

      var data = createTag(partParams);

      if (data == null) {
        i++;
        continue;
      }

      callback(data);

      // Reset the term to not include the tokenized portion
      term = term.substr(i + 1) || '';
      i = 0;
    }

    return {
      term: term
    };
  };

  return Tokenizer;
});

S2.define('select2/data/minimumInputLength',[

], function () {
  function MinimumInputLength (decorated, $e, options) {
    this.minimumInputLength = options.get('minimumInputLength');

    decorated.call(this, $e, options);
  }

  MinimumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (params.term.length < this.minimumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooShort',
        args: {
          minimum: this.minimumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MinimumInputLength;
});

S2.define('select2/data/maximumInputLength',[

], function () {
  function MaximumInputLength (decorated, $e, options) {
    this.maximumInputLength = options.get('maximumInputLength');

    decorated.call(this, $e, options);
  }

  MaximumInputLength.prototype.query = function (decorated, params, callback) {
    params.term = params.term || '';

    if (this.maximumInputLength > 0 &&
        params.term.length > this.maximumInputLength) {
      this.trigger('results:message', {
        message: 'inputTooLong',
        args: {
          maximum: this.maximumInputLength,
          input: params.term,
          params: params
        }
      });

      return;
    }

    decorated.call(this, params, callback);
  };

  return MaximumInputLength;
});

S2.define('select2/data/maximumSelectionLength',[

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  MaximumSelectionLength.prototype.bind =
    function (decorated, container, $container) {
      var self = this;

      decorated.call(this, container, $container);

      container.on('select', function () {
        self._checkIfMaximumSelected();
      });
  };

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this._checkIfMaximumSelected(function () {
        decorated.call(self, params, callback);
      });
  };

  MaximumSelectionLength.prototype._checkIfMaximumSelected =
    function (_, successCallback) {
      var self = this;

      this.current(function (currentData) {
        var count = currentData != null ? currentData.length : 0;
        if (self.maximumSelectionLength > 0 &&
          count >= self.maximumSelectionLength) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }

        if (successCallback) {
          successCallback();
        }
      });
  };

  return MaximumSelectionLength;
});

S2.define('select2/dropdown',[
  'jquery',
  './utils'
], function ($, Utils) {
  function Dropdown ($element, options) {
    this.$element = $element;
    this.options = options;

    Dropdown.__super__.constructor.call(this);
  }

  Utils.Extend(Dropdown, Utils.Observable);

  Dropdown.prototype.render = function () {
    var $dropdown = $(
      '<span class="select2-dropdown">' +
        '<span class="select2-results"></span>' +
      '</span>'
    );

    $dropdown.attr('dir', this.options.get('dir'));

    this.$dropdown = $dropdown;

    return $dropdown;
  };

  Dropdown.prototype.bind = function () {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.position = function ($dropdown, $container) {
    // Should be implemented in subclasses
  };

  Dropdown.prototype.destroy = function () {
    // Remove the dropdown from the DOM
    this.$dropdown.remove();
  };

  return Dropdown;
});

S2.define('select2/dropdown/search',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function Search () { }

  Search.prototype.render = function (decorated) {
    var $rendered = decorated.call(this);

    var $search = $(
      '<span class="select2-search select2-search--dropdown">' +
        '<input class="select2-search__field" type="search" tabindex="-1"' +
        ' autocomplete="off" autocorrect="off" autocapitalize="none"' +
        ' spellcheck="false" role="searchbox" aria-autocomplete="list" />' +
      '</span>'
    );

    this.$searchContainer = $search;
    this.$search = $search.find('input');

    $rendered.prepend($search);

    return $rendered;
  };

  Search.prototype.bind = function (decorated, container, $container) {
    var self = this;

    var resultsId = container.id + '-results';

    decorated.call(this, container, $container);

    this.$search.on('keydown', function (evt) {
      self.trigger('keypress', evt);

      self._keyUpPrevented = evt.isDefaultPrevented();
    });

    // Workaround for browsers which do not support the `input` event
    // This will prevent double-triggering of events for browsers which support
    // both the `keyup` and `input` events.
    this.$search.on('input', function (evt) {
      // Unbind the duplicated `keyup` event
      $(this).off('keyup');
    });

    this.$search.on('keyup input', function (evt) {
      self.handleSearch(evt);
    });

    container.on('open', function () {
      self.$search.attr('tabindex', 0);
      self.$search.attr('aria-controls', resultsId);

      self.$search.trigger('focus');

      window.setTimeout(function () {
        self.$search.trigger('focus');
      }, 0);
    });

    container.on('close', function () {
      self.$search.attr('tabindex', -1);
      self.$search.removeAttr('aria-controls');
      self.$search.removeAttr('aria-activedescendant');

      self.$search.val('');
      self.$search.trigger('blur');
    });

    container.on('focus', function () {
      if (!container.isOpen()) {
        self.$search.trigger('focus');
      }
    });

    container.on('results:all', function (params) {
      if (params.query.term == null || params.query.term === '') {
        var showSearch = self.showSearch(params);

        if (showSearch) {
          self.$searchContainer.removeClass('select2-search--hide');
        } else {
          self.$searchContainer.addClass('select2-search--hide');
        }
      }
    });

    container.on('results:focus', function (params) {
      if (params.data._resultId) {
        self.$search.attr('aria-activedescendant', params.data._resultId);
      } else {
        self.$search.removeAttr('aria-activedescendant');
      }
    });
  };

  Search.prototype.handleSearch = function (evt) {
    if (!this._keyUpPrevented) {
      var input = this.$search.val();

      this.trigger('query', {
        term: input
      });
    }

    this._keyUpPrevented = false;
  };

  Search.prototype.showSearch = function (_, params) {
    return true;
  };

  return Search;
});

S2.define('select2/dropdown/hidePlaceholder',[

], function () {
  function HidePlaceholder (decorated, $element, options, dataAdapter) {
    this.placeholder = this.normalizePlaceholder(options.get('placeholder'));

    decorated.call(this, $element, options, dataAdapter);
  }

  HidePlaceholder.prototype.append = function (decorated, data) {
    data.results = this.removePlaceholder(data.results);

    decorated.call(this, data);
  };

  HidePlaceholder.prototype.normalizePlaceholder = function (_, placeholder) {
    if (typeof placeholder === 'string') {
      placeholder = {
        id: '',
        text: placeholder
      };
    }

    return placeholder;
  };

  HidePlaceholder.prototype.removePlaceholder = function (_, data) {
    var modifiedData = data.slice(0);

    for (var d = data.length - 1; d >= 0; d--) {
      var item = data[d];

      if (this.placeholder.id === item.id) {
        modifiedData.splice(d, 1);
      }
    }

    return modifiedData;
  };

  return HidePlaceholder;
});

S2.define('select2/dropdown/infiniteScroll',[
  'jquery'
], function ($) {
  function InfiniteScroll (decorated, $element, options, dataAdapter) {
    this.lastParams = {};

    decorated.call(this, $element, options, dataAdapter);

    this.$loadingMore = this.createLoadingMore();
    this.loading = false;
  }

  InfiniteScroll.prototype.append = function (decorated, data) {
    this.$loadingMore.remove();
    this.loading = false;

    decorated.call(this, data);

    if (this.showLoadingMore(data)) {
      this.$results.append(this.$loadingMore);
      this.loadMoreIfNeeded();
    }
  };

  InfiniteScroll.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('query', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    container.on('query:append', function (params) {
      self.lastParams = params;
      self.loading = true;
    });

    this.$results.on('scroll', this.loadMoreIfNeeded.bind(this));
  };

  InfiniteScroll.prototype.loadMoreIfNeeded = function () {
    var isLoadMoreVisible = $.contains(
      document.documentElement,
      this.$loadingMore[0]
    );

    if (this.loading || !isLoadMoreVisible) {
      return;
    }

    var currentOffset = this.$results.offset().top +
      this.$results.outerHeight(false);
    var loadingMoreOffset = this.$loadingMore.offset().top +
      this.$loadingMore.outerHeight(false);

    if (currentOffset + 50 >= loadingMoreOffset) {
      this.loadMore();
    }
  };

  InfiniteScroll.prototype.loadMore = function () {
    this.loading = true;

    var params = $.extend({}, {page: 1}, this.lastParams);

    params.page++;

    this.trigger('query:append', params);
  };

  InfiniteScroll.prototype.showLoadingMore = function (_, data) {
    return data.pagination && data.pagination.more;
  };

  InfiniteScroll.prototype.createLoadingMore = function () {
    var $option = $(
      '<li ' +
      'class="select2-results__option select2-results__option--load-more"' +
      'role="option" aria-disabled="true"></li>'
    );

    var message = this.options.get('translations').get('loadingMore');

    $option.html(message(this.lastParams));

    return $option;
  };

  return InfiniteScroll;
});

S2.define('select2/dropdown/attachBody',[
  'jquery',
  '../utils'
], function ($, Utils) {
  function AttachBody (decorated, $element, options) {
    this.$dropdownParent = $(options.get('dropdownParent') || document.body);

    decorated.call(this, $element, options);
  }

  AttachBody.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('open', function () {
      self._showDropdown();
      self._attachPositioningHandler(container);

      // Must bind after the results handlers to ensure correct sizing
      self._bindContainerResultHandlers(container);
    });

    container.on('close', function () {
      self._hideDropdown();
      self._detachPositioningHandler(container);
    });

    this.$dropdownContainer.on('mousedown', function (evt) {
      evt.stopPropagation();
    });
  };

  AttachBody.prototype.destroy = function (decorated) {
    decorated.call(this);

    this.$dropdownContainer.remove();
  };

  AttachBody.prototype.position = function (decorated, $dropdown, $container) {
    // Clone all of the container classes
    $dropdown.attr('class', $container.attr('class'));

    $dropdown.removeClass('select2');
    $dropdown.addClass('select2-container--open');

    $dropdown.css({
      position: 'absolute',
      top: -999999
    });

    this.$container = $container;
  };

  AttachBody.prototype.render = function (decorated) {
    var $container = $('<span></span>');

    var $dropdown = decorated.call(this);
    $container.append($dropdown);

    this.$dropdownContainer = $container;

    return $container;
  };

  AttachBody.prototype._hideDropdown = function (decorated) {
    this.$dropdownContainer.detach();
  };

  AttachBody.prototype._bindContainerResultHandlers =
      function (decorated, container) {

    // These should only be bound once
    if (this._containerResultsHandlersBound) {
      return;
    }

    var self = this;

    container.on('results:all', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('results:append', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('results:message', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('select', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    container.on('unselect', function () {
      self._positionDropdown();
      self._resizeDropdown();
    });

    this._containerResultsHandlersBound = true;
  };

  AttachBody.prototype._attachPositioningHandler =
      function (decorated, container) {
    var self = this;

    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.each(function () {
      Utils.StoreData(this, 'select2-scroll-position', {
        x: $(this).scrollLeft(),
        y: $(this).scrollTop()
      });
    });

    $watchers.on(scrollEvent, function (ev) {
      var position = Utils.GetData(this, 'select2-scroll-position');
      $(this).scrollTop(position.y);
    });

    $(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,
      function (e) {
      self._positionDropdown();
      self._resizeDropdown();
    });
  };

  AttachBody.prototype._detachPositioningHandler =
      function (decorated, container) {
    var scrollEvent = 'scroll.select2.' + container.id;
    var resizeEvent = 'resize.select2.' + container.id;
    var orientationEvent = 'orientationchange.select2.' + container.id;

    var $watchers = this.$container.parents().filter(Utils.hasScroll);
    $watchers.off(scrollEvent);

    $(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);
  };

  AttachBody.prototype._positionDropdown = function () {
    var $window = $(window);

    var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
    var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

    var newDirection = null;

    var offset = this.$container.offset();

    offset.bottom = offset.top + this.$container.outerHeight(false);

    var container = {
      height: this.$container.outerHeight(false)
    };

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calculating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positioned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = {
      top: 0,
      left: 0
    };

    if (
      $.contains(document.body, $offsetParent[0]) ||
      $offsetParent[0].isConnected
      ) {
      parentOffset = $offsetParent.offset();
    }

    css.top -= parentOffset.top;
    css.left -= parentOffset.left;

    if (!isCurrentlyAbove && !isCurrentlyBelow) {
      newDirection = 'below';
    }

    if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      newDirection = 'above';
    } else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      newDirection = 'below';
    }

    if (newDirection == 'above' ||
      (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);
  };

  AttachBody.prototype._resizeDropdown = function () {
    var css = {
      width: this.$container.outerWidth(false) + 'px'
    };

    if (this.options.get('dropdownAutoWidth')) {
      css.minWidth = css.width;
      css.position = 'relative';
      css.width = 'auto';
    }

    this.$dropdown.css(css);
  };

  AttachBody.prototype._showDropdown = function (decorated) {
    this.$dropdownContainer.appendTo(this.$dropdownParent);

    this._positionDropdown();
    this._resizeDropdown();
  };

  return AttachBody;
});

S2.define('select2/dropdown/minimumResultsForSearch',[

], function () {
  function countResults (data) {
    var count = 0;

    for (var d = 0; d < data.length; d++) {
      var item = data[d];

      if (item.children) {
        count += countResults(item.children);
      } else {
        count++;
      }
    }

    return count;
  }

  function MinimumResultsForSearch (decorated, $element, options, dataAdapter) {
    this.minimumResultsForSearch = options.get('minimumResultsForSearch');

    if (this.minimumResultsForSearch < 0) {
      this.minimumResultsForSearch = Infinity;
    }

    decorated.call(this, $element, options, dataAdapter);
  }

  MinimumResultsForSearch.prototype.showSearch = function (decorated, params) {
    if (countResults(params.data.results) < this.minimumResultsForSearch) {
      return false;
    }

    return decorated.call(this, params);
  };

  return MinimumResultsForSearch;
});

S2.define('select2/dropdown/selectOnClose',[
  '../utils'
], function (Utils) {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function (params) {
      self._handleSelectOnClose(params);
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function (_, params) {
    if (params && params.originalSelect2Event != null) {
      var event = params.originalSelect2Event;

      // Don't select an item if the close event was triggered from a select or
      // unselect event
      if (event._type === 'select' || event._type === 'unselect') {
        return;
      }
    }

    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = Utils.GetData($highlightedResults[0], 'data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});

S2.define('select2/dropdown/closeOnSelect',[

], function () {
  function CloseOnSelect () { }

  CloseOnSelect.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('select', function (evt) {
      self._selectTriggered(evt);
    });

    container.on('unselect', function (evt) {
      self._selectTriggered(evt);
    });
  };

  CloseOnSelect.prototype._selectTriggered = function (_, evt) {
    var originalEvent = evt.originalEvent;

    // Don't close if the control key is being held
    if (originalEvent && (originalEvent.ctrlKey || originalEvent.metaKey)) {
      return;
    }

    this.trigger('close', {
      originalEvent: originalEvent,
      originalSelect2Event: evt
    });
  };

  return CloseOnSelect;
});

S2.define('select2/i18n/en',[],function () {
  // English
  return {
    errorLoading: function () {
      return 'The results could not be loaded.';
    },
    inputTooLong: function (args) {
      var overChars = args.input.length - args.maximum;

      var message = 'Please delete ' + overChars + ' character';

      if (overChars != 1) {
        message += 's';
      }

      return message;
    },
    inputTooShort: function (args) {
      var remainingChars = args.minimum - args.input.length;

      var message = 'Please enter ' + remainingChars + ' or more characters';

      return message;
    },
    loadingMore: function () {
      return 'Loading more results…';
    },
    maximumSelected: function (args) {
      var message = 'You can only select ' + args.maximum + ' item';

      if (args.maximum != 1) {
        message += 's';
      }

      return message;
    },
    noResults: function () {
      return 'No results found';
    },
    searching: function () {
      return 'Searching…';
    },
    removeAllItems: function () {
      return 'Remove all items';
    }
  };
});

S2.define('select2/defaults',[
  'jquery',
  'require',

  './results',

  './selection/single',
  './selection/multiple',
  './selection/placeholder',
  './selection/allowClear',
  './selection/search',
  './selection/eventRelay',

  './utils',
  './translation',
  './diacritics',

  './data/select',
  './data/array',
  './data/ajax',
  './data/tags',
  './data/tokenizer',
  './data/minimumInputLength',
  './data/maximumInputLength',
  './data/maximumSelectionLength',

  './dropdown',
  './dropdown/search',
  './dropdown/hidePlaceholder',
  './dropdown/infiniteScroll',
  './dropdown/attachBody',
  './dropdown/minimumResultsForSearch',
  './dropdown/selectOnClose',
  './dropdown/closeOnSelect',

  './i18n/en'
], function ($, require,

             ResultsList,

             SingleSelection, MultipleSelection, Placeholder, AllowClear,
             SelectionSearch, EventRelay,

             Utils, Translation, DIACRITICS,

             SelectData, ArrayData, AjaxData, Tags, Tokenizer,
             MinimumInputLength, MaximumInputLength, MaximumSelectionLength,

             Dropdown, DropdownSearch, HidePlaceholder, InfiniteScroll,
             AttachBody, MinimumResultsForSearch, SelectOnClose, CloseOnSelect,

             EnglishTranslation) {
  function Defaults () {
    this.reset();
  }

  Defaults.prototype.apply = function (options) {
    options = $.extend(true, {}, this.defaults, options);

    if (options.dataAdapter == null) {
      if (options.ajax != null) {
        options.dataAdapter = AjaxData;
      } else if (options.data != null) {
        options.dataAdapter = ArrayData;
      } else {
        options.dataAdapter = SelectData;
      }

      if (options.minimumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MinimumInputLength
        );
      }

      if (options.maximumInputLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumInputLength
        );
      }

      if (options.maximumSelectionLength > 0) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          MaximumSelectionLength
        );
      }

      if (options.tags) {
        options.dataAdapter = Utils.Decorate(options.dataAdapter, Tags);
      }

      if (options.tokenSeparators != null || options.tokenizer != null) {
        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Tokenizer
        );
      }

      if (options.query != null) {
        var Query = require(options.amdBase + 'compat/query');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          Query
        );
      }

      if (options.initSelection != null) {
        var InitSelection = require(options.amdBase + 'compat/initSelection');

        options.dataAdapter = Utils.Decorate(
          options.dataAdapter,
          InitSelection
        );
      }
    }

    if (options.resultsAdapter == null) {
      options.resultsAdapter = ResultsList;

      if (options.ajax != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          InfiniteScroll
        );
      }

      if (options.placeholder != null) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          HidePlaceholder
        );
      }

      if (options.selectOnClose) {
        options.resultsAdapter = Utils.Decorate(
          options.resultsAdapter,
          SelectOnClose
        );
      }
    }

    if (options.dropdownAdapter == null) {
      if (options.multiple) {
        options.dropdownAdapter = Dropdown;
      } else {
        var SearchableDropdown = Utils.Decorate(Dropdown, DropdownSearch);

        options.dropdownAdapter = SearchableDropdown;
      }

      if (options.minimumResultsForSearch !== 0) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          MinimumResultsForSearch
        );
      }

      if (options.closeOnSelect) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          CloseOnSelect
        );
      }

      if (
        options.dropdownCssClass != null ||
        options.dropdownCss != null ||
        options.adaptDropdownCssClass != null
      ) {
        var DropdownCSS = require(options.amdBase + 'compat/dropdownCss');

        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          DropdownCSS
        );
      }

      options.dropdownAdapter = Utils.Decorate(
        options.dropdownAdapter,
        AttachBody
      );
    }

    if (options.selectionAdapter == null) {
      if (options.multiple) {
        options.selectionAdapter = MultipleSelection;
      } else {
        options.selectionAdapter = SingleSelection;
      }

      // Add the placeholder mixin if a placeholder was specified
      if (options.placeholder != null) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          Placeholder
        );
      }

      if (options.allowClear) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          AllowClear
        );
      }

      if (options.multiple) {
        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          SelectionSearch
        );
      }

      if (
        options.containerCssClass != null ||
        options.containerCss != null ||
        options.adaptContainerCssClass != null
      ) {
        var ContainerCSS = require(options.amdBase + 'compat/containerCss');

        options.selectionAdapter = Utils.Decorate(
          options.selectionAdapter,
          ContainerCSS
        );
      }

      options.selectionAdapter = Utils.Decorate(
        options.selectionAdapter,
        EventRelay
      );
    }

    // If the defaults were not previously applied from an element, it is
    // possible for the language option to have not been resolved
    options.language = this._resolveLanguage(options.language);

    // Always fall back to English since it will always be complete
    options.language.push('en');

    var uniqueLanguages = [];

    for (var l = 0; l < options.language.length; l++) {
      var language = options.language[l];

      if (uniqueLanguages.indexOf(language) === -1) {
        uniqueLanguages.push(language);
      }
    }

    options.language = uniqueLanguages;

    options.translations = this._processTranslations(
      options.language,
      options.debug
    );

    return options;
  };

  Defaults.prototype.reset = function () {
    function stripDiacritics (text) {
      // Used 'uni range + named function' from http://jsperf.com/diacritics/18
      function match(a) {
        return DIACRITICS[a] || a;
      }

      return text.replace(/[^\u0000-\u007E]/g, match);
    }

    function matcher (params, data) {
      // Always return the object if there is nothing to compare
      if ($.trim(params.term) === '') {
        return data;
      }

      // Do a recursive check for options with children
      if (data.children && data.children.length > 0) {
        // Clone the data object if there are children
        // This is required as we modify the object to remove any non-matches
        var match = $.extend(true, {}, data);

        // Check each child of the option
        for (var c = data.children.length - 1; c >= 0; c--) {
          var child = data.children[c];

          var matches = matcher(params, child);

          // If there wasn't a match, remove the object in the array
          if (matches == null) {
            match.children.splice(c, 1);
          }
        }

        // If any children matched, return the new object
        if (match.children.length > 0) {
          return match;
        }

        // If there were no matching children, check just the plain object
        return matcher(params, match);
      }

      var original = stripDiacritics(data.text).toUpperCase();
      var term = stripDiacritics(params.term).toUpperCase();

      // Check if the text contains the term
      if (original.indexOf(term) > -1) {
        return data;
      }

      // If it doesn't contain the term, don't return anything
      return null;
    }

    this.defaults = {
      amdBase: './',
      amdLanguageBase: './i18n/',
      closeOnSelect: true,
      debug: false,
      dropdownAutoWidth: false,
      escapeMarkup: Utils.escapeMarkup,
      language: {},
      matcher: matcher,
      minimumInputLength: 0,
      maximumInputLength: 0,
      maximumSelectionLength: 0,
      minimumResultsForSearch: 0,
      selectOnClose: false,
      scrollAfterSelect: false,
      sorter: function (data) {
        return data;
      },
      templateResult: function (result) {
        return result.text;
      },
      templateSelection: function (selection) {
        return selection.text;
      },
      theme: 'default',
      width: 'resolve'
    };
  };

  Defaults.prototype.applyFromElement = function (options, $element) {
    var optionLanguage = options.language;
    var defaultLanguage = this.defaults.language;
    var elementLanguage = $element.prop('lang');
    var parentLanguage = $element.closest('[lang]').prop('lang');

    var languages = Array.prototype.concat.call(
      this._resolveLanguage(elementLanguage),
      this._resolveLanguage(optionLanguage),
      this._resolveLanguage(defaultLanguage),
      this._resolveLanguage(parentLanguage)
    );

    options.language = languages;

    return options;
  };

  Defaults.prototype._resolveLanguage = function (language) {
    if (!language) {
      return [];
    }

    if ($.isEmptyObject(language)) {
      return [];
    }

    if ($.isPlainObject(language)) {
      return [language];
    }

    var languages;

    if (!$.isArray(language)) {
      languages = [language];
    } else {
      languages = language;
    }

    var resolvedLanguages = [];

    for (var l = 0; l < languages.length; l++) {
      resolvedLanguages.push(languages[l]);

      if (typeof languages[l] === 'string' && languages[l].indexOf('-') > 0) {
        // Extract the region information if it is included
        var languageParts = languages[l].split('-');
        var baseLanguage = languageParts[0];

        resolvedLanguages.push(baseLanguage);
      }
    }

    return resolvedLanguages;
  };

  Defaults.prototype._processTranslations = function (languages, debug) {
    var translations = new Translation();

    for (var l = 0; l < languages.length; l++) {
      var languageData = new Translation();

      var language = languages[l];

      if (typeof language === 'string') {
        try {
          // Try to load it with the original name
          languageData = Translation.loadPath(language);
        } catch (e) {
          try {
            // If we couldn't load it, check if it wasn't the full path
            language = this.defaults.amdLanguageBase + language;
            languageData = Translation.loadPath(language);
          } catch (ex) {
            // The translation could not be loaded at all. Sometimes this is
            // because of a configuration problem, other times this can be
            // because of how Select2 helps load all possible translation files
            if (debug && window.console && console.warn) {
              console.warn(
                'Select2: The language file for "' + language + '" could ' +
                'not be automatically loaded. A fallback will be used instead.'
              );
            }
          }
        }
      } else if ($.isPlainObject(language)) {
        languageData = new Translation(language);
      } else {
        languageData = language;
      }

      translations.extend(languageData);
    }

    return translations;
  };

  Defaults.prototype.set = function (key, value) {
    var camelKey = $.camelCase(key);

    var data = {};
    data[camelKey] = value;

    var convertedData = Utils._convertData(data);

    $.extend(true, this.defaults, convertedData);
  };

  var defaults = new Defaults();

  return defaults;
});

S2.define('select2/options',[
  'require',
  'jquery',
  './defaults',
  './utils'
], function (require, $, Defaults, Utils) {
  function Options (options, $element) {
    this.options = options;

    if ($element != null) {
      this.fromElement($element);
    }

    if ($element != null) {
      this.options = Defaults.applyFromElement(this.options, $element);
    }

    this.options = Defaults.apply(this.options);

    if ($element && $element.is('input')) {
      var InputCompat = require(this.get('amdBase') + 'compat/inputData');

      this.options.dataAdapter = Utils.Decorate(
        this.options.dataAdapter,
        InputCompat
      );
    }
  }

  Options.prototype.fromElement = function ($e) {
    var excludedData = ['select2'];

    if (this.options.multiple == null) {
      this.options.multiple = $e.prop('multiple');
    }

    if (this.options.disabled == null) {
      this.options.disabled = $e.prop('disabled');
    }

    if (this.options.dir == null) {
      if ($e.prop('dir')) {
        this.options.dir = $e.prop('dir');
      } else if ($e.closest('[dir]').prop('dir')) {
        this.options.dir = $e.closest('[dir]').prop('dir');
      } else {
        this.options.dir = 'ltr';
      }
    }

    $e.prop('disabled', this.options.disabled);
    $e.prop('multiple', this.options.multiple);

    if (Utils.GetData($e[0], 'select2Tags')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-select2-tags` attribute has been changed to ' +
          'use the `data-data` and `data-tags="true"` attributes and will be ' +
          'removed in future versions of Select2.'
        );
      }

      Utils.StoreData($e[0], 'data', Utils.GetData($e[0], 'select2Tags'));
      Utils.StoreData($e[0], 'tags', true);
    }

    if (Utils.GetData($e[0], 'ajaxUrl')) {
      if (this.options.debug && window.console && console.warn) {
        console.warn(
          'Select2: The `data-ajax-url` attribute has been changed to ' +
          '`data-ajax--url` and support for the old attribute will be removed' +
          ' in future versions of Select2.'
        );
      }

      $e.attr('ajax--url', Utils.GetData($e[0], 'ajaxUrl'));
      Utils.StoreData($e[0], 'ajax-Url', Utils.GetData($e[0], 'ajaxUrl'));
    }

    var dataset = {};

    function upperCaseLetter(_, letter) {
      return letter.toUpperCase();
    }

    // Pre-load all of the attributes which are prefixed with `data-`
    for (var attr = 0; attr < $e[0].attributes.length; attr++) {
      var attributeName = $e[0].attributes[attr].name;
      var prefix = 'data-';

      if (attributeName.substr(0, prefix.length) == prefix) {
        // Get the contents of the attribute after `data-`
        var dataName = attributeName.substring(prefix.length);

        // Get the data contents from the consistent source
        // This is more than likely the jQuery data helper
        var dataValue = Utils.GetData($e[0], dataName);

        // camelCase the attribute name to match the spec
        var camelDataName = dataName.replace(/-([a-z])/g, upperCaseLetter);

        // Store the data attribute contents into the dataset since
        dataset[camelDataName] = dataValue;
      }
    }

    // Prefer the element's `dataset` attribute if it exists
    // jQuery 1.x does not correctly handle data attributes with multiple dashes
    if ($.fn.jquery && $.fn.jquery.substr(0, 2) == '1.' && $e[0].dataset) {
      dataset = $.extend(true, {}, $e[0].dataset, dataset);
    }

    // Prefer our internal data cache if it exists
    var data = $.extend(true, {}, Utils.GetData($e[0]), dataset);

    data = Utils._convertData(data);

    for (var key in data) {
      if ($.inArray(key, excludedData) > -1) {
        continue;
      }

      if ($.isPlainObject(this.options[key])) {
        $.extend(this.options[key], data[key]);
      } else {
        this.options[key] = data[key];
      }
    }

    return this;
  };

  Options.prototype.get = function (key) {
    return this.options[key];
  };

  Options.prototype.set = function (key, val) {
    this.options[key] = val;
  };

  return Options;
});

S2.define('select2/core',[
  'jquery',
  './options',
  './utils',
  './keys'
], function ($, Options, Utils, KEYS) {
  var Select2 = function ($element, options) {
    if (Utils.GetData($element[0], 'select2') != null) {
      Utils.GetData($element[0], 'select2').destroy();
    }

    this.$element = $element;

    this.id = this._generateId($element);

    options = options || {};

    this.options = new Options(options, $element);

    Select2.__super__.constructor.call(this);

    // Set up the tabindex

    var tabindex = $element.attr('tabindex') || 0;
    Utils.StoreData($element[0], 'old-tabindex', tabindex);
    $element.attr('tabindex', '-1');

    // Set up containers and adapters

    var DataAdapter = this.options.get('dataAdapter');
    this.dataAdapter = new DataAdapter($element, this.options);

    var $container = this.render();

    this._placeContainer($container);

    var SelectionAdapter = this.options.get('selectionAdapter');
    this.selection = new SelectionAdapter($element, this.options);
    this.$selection = this.selection.render();

    this.selection.position(this.$selection, $container);

    var DropdownAdapter = this.options.get('dropdownAdapter');
    this.dropdown = new DropdownAdapter($element, this.options);
    this.$dropdown = this.dropdown.render();

    this.dropdown.position(this.$dropdown, $container);

    var ResultsAdapter = this.options.get('resultsAdapter');
    this.results = new ResultsAdapter($element, this.options, this.dataAdapter);
    this.$results = this.results.render();

    this.results.position(this.$results, this.$dropdown);

    // Bind events

    var self = this;

    // Bind the container to all of the adapters
    this._bindAdapters();

    // Register any DOM event handlers
    this._registerDomEvents();

    // Register any internal event handlers
    this._registerDataEvents();
    this._registerSelectionEvents();
    this._registerDropdownEvents();
    this._registerResultsEvents();
    this._registerEvents();

    // Set the initial state
    this.dataAdapter.current(function (initialData) {
      self.trigger('selection:update', {
        data: initialData
      });
    });

    // Hide the original select
    $element.addClass('select2-hidden-accessible');
    $element.attr('aria-hidden', 'true');

    // Synchronize any monitored attributes
    this._syncAttributes();

    Utils.StoreData($element[0], 'select2', this);

    // Ensure backwards compatibility with $element.data('select2').
    $element.data('select2', this);
  };

  Utils.Extend(Select2, Utils.Observable);

  Select2.prototype._generateId = function ($element) {
    var id = '';

    if ($element.attr('id') != null) {
      id = $element.attr('id');
    } else if ($element.attr('name') != null) {
      id = $element.attr('name') + '-' + Utils.generateChars(2);
    } else {
      id = Utils.generateChars(4);
    }

    id = id.replace(/(:|\.|\[|\]|,)/g, '');
    id = 'select2-' + id;

    return id;
  };

  Select2.prototype._placeContainer = function ($container) {
    $container.insertAfter(this.$element);

    var width = this._resolveWidth(this.$element, this.options.get('width'));

    if (width != null) {
      $container.css('width', width);
    }
  };

  Select2.prototype._resolveWidth = function ($element, method) {
    var WIDTH = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;

    if (method == 'resolve') {
      var styleWidth = this._resolveWidth($element, 'style');

      if (styleWidth != null) {
        return styleWidth;
      }

      return this._resolveWidth($element, 'element');
    }

    if (method == 'element') {
      var elementWidth = $element.outerWidth(false);

      if (elementWidth <= 0) {
        return 'auto';
      }

      return elementWidth + 'px';
    }

    if (method == 'style') {
      var style = $element.attr('style');

      if (typeof(style) !== 'string') {
        return null;
      }

      var attrs = style.split(';');

      for (var i = 0, l = attrs.length; i < l; i = i + 1) {
        var attr = attrs[i].replace(/\s/g, '');
        var matches = attr.match(WIDTH);

        if (matches !== null && matches.length >= 1) {
          return matches[1];
        }
      }

      return null;
    }

    if (method == 'computedstyle') {
      var computedStyle = window.getComputedStyle($element[0]);

      return computedStyle.width;
    }

    return method;
  };

  Select2.prototype._bindAdapters = function () {
    this.dataAdapter.bind(this, this.$container);
    this.selection.bind(this, this.$container);

    this.dropdown.bind(this, this.$container);
    this.results.bind(this, this.$container);
  };

  Select2.prototype._registerDomEvents = function () {
    var self = this;

    this.$element.on('change.select2', function () {
      self.dataAdapter.current(function (data) {
        self.trigger('selection:update', {
          data: data
        });
      });
    });

    this.$element.on('focus.select2', function (evt) {
      self.trigger('focus', evt);
    });

    this._syncA = Utils.bind(this._syncAttributes, this);
    this._syncS = Utils.bind(this._syncSubtree, this);

    if (this.$element[0].attachEvent) {
      this.$element[0].attachEvent('onpropertychange', this._syncA);
    }

    var observer = window.MutationObserver ||
      window.WebKitMutationObserver ||
      window.MozMutationObserver
    ;

    if (observer != null) {
      this._observer = new observer(function (mutations) {
        self._syncA();
        self._syncS(null, mutations);
      });
      this._observer.observe(this.$element[0], {
        attributes: true,
        childList: true,
        subtree: false
      });
    } else if (this.$element[0].addEventListener) {
      this.$element[0].addEventListener(
        'DOMAttrModified',
        self._syncA,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeInserted',
        self._syncS,
        false
      );
      this.$element[0].addEventListener(
        'DOMNodeRemoved',
        self._syncS,
        false
      );
    }
  };

  Select2.prototype._registerDataEvents = function () {
    var self = this;

    this.dataAdapter.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerSelectionEvents = function () {
    var self = this;
    var nonRelayEvents = ['toggle', 'focus'];

    this.selection.on('toggle', function () {
      self.toggleDropdown();
    });

    this.selection.on('focus', function (params) {
      self.focus(params);
    });

    this.selection.on('*', function (name, params) {
      if ($.inArray(name, nonRelayEvents) !== -1) {
        return;
      }

      self.trigger(name, params);
    });
  };

  Select2.prototype._registerDropdownEvents = function () {
    var self = this;

    this.dropdown.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerResultsEvents = function () {
    var self = this;

    this.results.on('*', function (name, params) {
      self.trigger(name, params);
    });
  };

  Select2.prototype._registerEvents = function () {
    var self = this;

    this.on('open', function () {
      self.$container.addClass('select2-container--open');
    });

    this.on('close', function () {
      self.$container.removeClass('select2-container--open');
    });

    this.on('enable', function () {
      self.$container.removeClass('select2-container--disabled');
    });

    this.on('disable', function () {
      self.$container.addClass('select2-container--disabled');
    });

    this.on('blur', function () {
      self.$container.removeClass('select2-container--focus');
    });

    this.on('query', function (params) {
      if (!self.isOpen()) {
        self.trigger('open', {});
      }

      this.dataAdapter.query(params, function (data) {
        self.trigger('results:all', {
          data: data,
          query: params
        });
      });
    });

    this.on('query:append', function (params) {
      this.dataAdapter.query(params, function (data) {
        self.trigger('results:append', {
          data: data,
          query: params
        });
      });
    });

    this.on('keypress', function (evt) {
      var key = evt.which;

      if (self.isOpen()) {
        if (key === KEYS.ESC || key === KEYS.TAB ||
            (key === KEYS.UP && evt.altKey)) {
          self.close(evt);

          evt.preventDefault();
        } else if (key === KEYS.ENTER) {
          self.trigger('results:select', {});

          evt.preventDefault();
        } else if ((key === KEYS.SPACE && evt.ctrlKey)) {
          self.trigger('results:toggle', {});

          evt.preventDefault();
        } else if (key === KEYS.UP) {
          self.trigger('results:previous', {});

          evt.preventDefault();
        } else if (key === KEYS.DOWN) {
          self.trigger('results:next', {});

          evt.preventDefault();
        }
      } else {
        if (key === KEYS.ENTER || key === KEYS.SPACE ||
            (key === KEYS.DOWN && evt.altKey)) {
          self.open();

          evt.preventDefault();
        }
      }
    });
  };

  Select2.prototype._syncAttributes = function () {
    this.options.set('disabled', this.$element.prop('disabled'));

    if (this.isDisabled()) {
      if (this.isOpen()) {
        this.close();
      }

      this.trigger('disable', {});
    } else {
      this.trigger('enable', {});
    }
  };

  Select2.prototype._isChangeMutation = function (evt, mutations) {
    var changed = false;
    var self = this;

    // Ignore any mutation events raised for elements that aren't options or
    // optgroups. This handles the case when the select element is destroyed
    if (
      evt && evt.target && (
        evt.target.nodeName !== 'OPTION' && evt.target.nodeName !== 'OPTGROUP'
      )
    ) {
      return;
    }

    if (!mutations) {
      // If mutation events aren't supported, then we can only assume that the
      // change affected the selections
      changed = true;
    } else if (mutations.addedNodes && mutations.addedNodes.length > 0) {
      for (var n = 0; n < mutations.addedNodes.length; n++) {
        var node = mutations.addedNodes[n];

        if (node.selected) {
          changed = true;
        }
      }
    } else if (mutations.removedNodes && mutations.removedNodes.length > 0) {
      changed = true;
    } else if ($.isArray(mutations)) {
      $.each(mutations, function(evt, mutation) {
        if (self._isChangeMutation(evt, mutation)) {
          // We've found a change mutation.
          // Let's escape from the loop and continue
          changed = true;
          return false;
        }
      });
    }
    return changed;
  };

  Select2.prototype._syncSubtree = function (evt, mutations) {
    var changed = this._isChangeMutation(evt, mutations);
    var self = this;

    // Only re-pull the data if we think there is a change
    if (changed) {
      this.dataAdapter.current(function (currentData) {
        self.trigger('selection:update', {
          data: currentData
        });
      });
    }
  };

  /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */
  Select2.prototype.trigger = function (name, args) {
    var actualTrigger = Select2.__super__.trigger;
    var preTriggerMap = {
      'open': 'opening',
      'close': 'closing',
      'select': 'selecting',
      'unselect': 'unselecting',
      'clear': 'clearing'
    };

    if (args === undefined) {
      args = {};
    }

    if (name in preTriggerMap) {
      var preTriggerName = preTriggerMap[name];
      var preTriggerArgs = {
        prevented: false,
        name: name,
        args: args
      };

      actualTrigger.call(this, preTriggerName, preTriggerArgs);

      if (preTriggerArgs.prevented) {
        args.prevented = true;

        return;
      }
    }

    actualTrigger.call(this, name, args);
  };

  Select2.prototype.toggleDropdown = function () {
    if (this.isDisabled()) {
      return;
    }

    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  };

  Select2.prototype.open = function () {
    if (this.isOpen()) {
      return;
    }

    if (this.isDisabled()) {
      return;
    }

    this.trigger('query', {});
  };

  Select2.prototype.close = function (evt) {
    if (!this.isOpen()) {
      return;
    }

    this.trigger('close', { originalEvent : evt });
  };

  /**
   * Helper method to abstract the "enabled" (not "disabled") state of this
   * object.
   *
   * @return {true} if the instance is not disabled.
   * @return {false} if the instance is disabled.
   */
  Select2.prototype.isEnabled = function () {
    return !this.isDisabled();
  };

  /**
   * Helper method to abstract the "disabled" state of this object.
   *
   * @return {true} if the disabled option is true.
   * @return {false} if the disabled option is false.
   */
  Select2.prototype.isDisabled = function () {
    return this.options.get('disabled');
  };

  Select2.prototype.isOpen = function () {
    return this.$container.hasClass('select2-container--open');
  };

  Select2.prototype.hasFocus = function () {
    return this.$container.hasClass('select2-container--focus');
  };

  Select2.prototype.focus = function (data) {
    // No need to re-trigger focus events if we are already focused
    if (this.hasFocus()) {
      return;
    }

    this.$container.addClass('select2-container--focus');
    this.trigger('focus', {});
  };

  Select2.prototype.enable = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("enable")` method has been deprecated and will' +
        ' be removed in later Select2 versions. Use $element.prop("disabled")' +
        ' instead.'
      );
    }

    if (args == null || args.length === 0) {
      args = [true];
    }

    var disabled = !args[0];

    this.$element.prop('disabled', disabled);
  };

  Select2.prototype.data = function () {
    if (this.options.get('debug') &&
        arguments.length > 0 && window.console && console.warn) {
      console.warn(
        'Select2: Data can no longer be set using `select2("data")`. You ' +
        'should consider setting the value instead using `$element.val()`.'
      );
    }

    var data = [];

    this.dataAdapter.current(function (currentData) {
      data = currentData;
    });

    return data;
  };

  Select2.prototype.val = function (args) {
    if (this.options.get('debug') && window.console && console.warn) {
      console.warn(
        'Select2: The `select2("val")` method has been deprecated and will be' +
        ' removed in later Select2 versions. Use $element.val() instead.'
      );
    }

    if (args == null || args.length === 0) {
      return this.$element.val();
    }

    var newVal = args[0];

    if ($.isArray(newVal)) {
      newVal = $.map(newVal, function (obj) {
        return obj.toString();
      });
    }

    this.$element.val(newVal).trigger('input').trigger('change');
  };

  Select2.prototype.destroy = function () {
    this.$container.remove();

    if (this.$element[0].detachEvent) {
      this.$element[0].detachEvent('onpropertychange', this._syncA);
    }

    if (this._observer != null) {
      this._observer.disconnect();
      this._observer = null;
    } else if (this.$element[0].removeEventListener) {
      this.$element[0]
        .removeEventListener('DOMAttrModified', this._syncA, false);
      this.$element[0]
        .removeEventListener('DOMNodeInserted', this._syncS, false);
      this.$element[0]
        .removeEventListener('DOMNodeRemoved', this._syncS, false);
    }

    this._syncA = null;
    this._syncS = null;

    this.$element.off('.select2');
    this.$element.attr('tabindex',
    Utils.GetData(this.$element[0], 'old-tabindex'));

    this.$element.removeClass('select2-hidden-accessible');
    this.$element.attr('aria-hidden', 'false');
    Utils.RemoveData(this.$element[0]);
    this.$element.removeData('select2');

    this.dataAdapter.destroy();
    this.selection.destroy();
    this.dropdown.destroy();
    this.results.destroy();

    this.dataAdapter = null;
    this.selection = null;
    this.dropdown = null;
    this.results = null;
  };

  Select2.prototype.render = function () {
    var $container = $(
      '<span class="select2 select2-container">' +
        '<span class="selection"></span>' +
        '<span class="dropdown-wrapper" aria-hidden="true"></span>' +
      '</span>'
    );

    $container.attr('dir', this.options.get('dir'));

    this.$container = $container;

    this.$container.addClass('select2-container--' + this.options.get('theme'));

    Utils.StoreData($container[0], 'element', this.$element);

    return $container;
  };

  return Select2;
});

S2.define('jquery-mousewheel',[
  'jquery'
], function ($) {
  // Used to shim jQuery.mousewheel for non-full builds.
  return $;
});

S2.define('jquery.select2',[
  'jquery',
  'jquery-mousewheel',

  './select2/core',
  './select2/defaults',
  './select2/utils'
], function ($, _, Select2, Defaults, Utils) {
  if ($.fn.select2 == null) {
    // All methods that should return the element
    var thisMethods = ['open', 'close', 'destroy'];

    $.fn.select2 = function (options) {
      options = options || {};

      if (typeof options === 'object') {
        this.each(function () {
          var instanceOptions = $.extend(true, {}, options);

          var instance = new Select2($(this), instanceOptions);
        });

        return this;
      } else if (typeof options === 'string') {
        var ret;
        var args = Array.prototype.slice.call(arguments, 1);

        this.each(function () {
          var instance = Utils.GetData(this, 'select2');

          if (instance == null && window.console && console.error) {
            console.error(
              'The select2(\'' + options + '\') method was called on an ' +
              'element that is not using Select2.'
            );
          }

          ret = instance[options].apply(instance, args);
        });

        // Check if we should be returning `this`
        if ($.inArray(options, thisMethods) > -1) {
          return this;
        }

        return ret;
      } else {
        throw new Error('Invalid arguments for Select2: ' + options);
      }
    };
  }

  if ($.fn.select2.defaults == null) {
    $.fn.select2.defaults = Defaults;
  }

  return Select2;
});

  // Return the AMD loader configuration so it can be used outside of this file
  return {
    define: S2.define,
    require: S2.require
  };
}());

  // Autoload the jQuery bindings
  // We know that all of the modules exist above this, so we're safe
  var select2 = S2.require('jquery.select2');

  // Hold the AMD module references on the jQuery function that was just loaded
  // This allows Select2 to use the internal loader outside of this file, such
  // as in the language files.
  jQuery.fn.select2.amd = S2;

  // Return the Select2 instance for anyone who is importing it.
  return select2;
}));


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! Lity - v2.3.1 - 2018-04-20
* http://sorgalla.com/lity/
* Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
(function(window, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = (function($) {
            return factory(window, $);
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== "undefined" ? window : this, function(window, $) {
    'use strict';

    var document = window.document;

    var _win = $(window);
    var _deferred = $.Deferred;
    var _html = $('html');
    var _instances = [];

    var _attrAriaHidden = 'aria-hidden';
    var _dataAriaHidden = 'lity-' + _attrAriaHidden;

    var _focusableElementsSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

    var _defaultOptions = {
        esc: true,
        handler: null,
        handlers: {
            image: imageHandler,
            inline: inlineHandler,
            youtube: youtubeHandler,
            vimeo: vimeoHandler,
            googlemaps: googlemapsHandler,
            facebookvideo: facebookvideoHandler,
            iframe: iframeHandler
        },
        template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
    };

    var _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i;
    var _youtubeRegex = /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i;
    var _vimeoRegex =  /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;
    var _googlemapsRegex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;
    var _facebookvideoRegex = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;

    var _transitionEndEvent = (function() {
        var el = document.createElement('div');

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }

        return false;
    })();

    function transitionEnd(element) {
        var deferred = _deferred();

        if (!_transitionEndEvent || !element.length) {
            deferred.resolve();
        } else {
            element.one(_transitionEndEvent, deferred.resolve);
            setTimeout(deferred.resolve, 500);
        }

        return deferred.promise();
    }

    function settings(currSettings, key, value) {
        if (arguments.length === 1) {
            return $.extend({}, currSettings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof currSettings[key] === 'undefined'
                    ? null
                    : currSettings[key];
            }

            currSettings[key] = value;
        } else {
            $.extend(currSettings, key);
        }

        return this;
    }

    function parseQueryParams(params) {
        var pairs = decodeURI(params.split('#')[0]).split('&');
        var obj = {}, p;

        for (var i = 0, n = pairs.length; i < n; i++) {
            if (!pairs[i]) {
                continue;
            }

            p = pairs[i].split('=');
            obj[p[0]] = p[1];
        }

        return obj;
    }

    function appendQueryParams(url, params) {
        return url + (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
    }

    function transferHash(originalUrl, newUrl) {
        var pos = originalUrl.indexOf('#');

        if (-1 === pos) {
            return newUrl;
        }

        if (pos > 0) {
            originalUrl = originalUrl.substr(pos);
        }

        return newUrl + originalUrl;
    }

    function error(msg) {
        return $('<span class="lity-error"/>').append(msg);
    }

    function imageHandler(target, instance) {
        var desc = (instance.opener() && instance.opener().data('lity-desc')) || 'Image with no description';
        var img = $('<img src="' + target + '" alt="' + desc + '"/>');
        var deferred = _deferred();
        var failed = function() {
            deferred.reject(error('Failed loading image'));
        };

        img
            .on('load', function() {
                if (this.naturalWidth === 0) {
                    return failed();
                }

                deferred.resolve(img);
            })
            .on('error', failed)
        ;

        return deferred.promise();
    }

    imageHandler.test = function(target) {
        return _imageRegexp.test(target);
    };

    function inlineHandler(target, instance) {
        var el, placeholder, hasHideClass;

        try {
            el = $(target);
        } catch (e) {
            return false;
        }

        if (!el.length) {
            return false;
        }

        placeholder = $('<i style="display:none !important"/>');
        hasHideClass = el.hasClass('lity-hide');

        instance
            .element()
            .one('lity:remove', function() {
                placeholder
                    .before(el)
                    .remove()
                ;

                if (hasHideClass && !el.closest('.lity-content').length) {
                    el.addClass('lity-hide');
                }
            })
        ;

        return el
            .removeClass('lity-hide')
            .after(placeholder)
        ;
    }

    function youtubeHandler(target) {
        var matches = _youtubeRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(
            transferHash(
                target,
                appendQueryParams(
                    'https://www.youtube' + (matches[2] || '') + '.com/embed/' + matches[4],
                    $.extend(
                        {
                            autoplay: 1
                        },
                        parseQueryParams(matches[5] || '')
                    )
                )
            )
        );
    }

    function vimeoHandler(target) {
        var matches = _vimeoRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(
            transferHash(
                target,
                appendQueryParams(
                    'https://player.vimeo.com/video/' + matches[3],
                    $.extend(
                        {
                            autoplay: 1
                        },
                        parseQueryParams(matches[4] || '')
                    )
                )
            )
        );
    }

    function facebookvideoHandler(target) {
        var matches = _facebookvideoRegex.exec(target);

        if (!matches) {
            return false;
        }

        if (0 !== target.indexOf('http')) {
            target = 'https:' + target;
        }

        return iframeHandler(
            transferHash(
                target,
                appendQueryParams(
                    'https://www.facebook.com/plugins/video.php?href=' + target,
                    $.extend(
                        {
                            autoplay: 1
                        },
                        parseQueryParams(matches[4] || '')
                    )
                )
            )
        );
    }

    function googlemapsHandler(target) {
        var matches = _googlemapsRegex.exec(target);

        if (!matches) {
            return false;
        }

        return iframeHandler(
            transferHash(
                target,
                appendQueryParams(
                    'https://www.google.' + matches[3] + '/maps?' + matches[6],
                    {
                        output: matches[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
                    }
                )
            )
        );
    }

    function iframeHandler(target) {
        return '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen src="' + target + '"/></div>';
    }

    function winHeight() {
        return document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : Math.round(_win.height());
    }

    function keydown(e) {
        var current = currentInstance();

        if (!current) {
            return;
        }

        // ESC key
        if (e.keyCode === 27 && !!current.options('esc')) {
            current.close();
        }

        // TAB key
        if (e.keyCode === 9) {
            handleTabKey(e, current);
        }
    }

    function handleTabKey(e, instance) {
        var focusableElements = instance.element().find(_focusableElementsSelector);
        var focusedIndex = focusableElements.index(document.activeElement);

        if (e.shiftKey && focusedIndex <= 0) {
            focusableElements.get(focusableElements.length - 1).focus();
            e.preventDefault();
        } else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
            focusableElements.get(0).focus();
            e.preventDefault();
        }
    }

    function resize() {
        $.each(_instances, function(i, instance) {
            instance.resize();
        });
    }

    function registerInstance(instanceToRegister) {
        if (1 === _instances.unshift(instanceToRegister)) {
            _html.addClass('lity-active');

            _win
                .on({
                    resize: resize,
                    keydown: keydown
                })
            ;
        }

        $('body > *').not(instanceToRegister.element())
            .addClass('lity-hidden')
            .each(function() {
                var el = $(this);

                if (undefined !== el.data(_dataAriaHidden)) {
                    return;
                }

                el.data(_dataAriaHidden, el.attr(_attrAriaHidden) || null);
            })
            .attr(_attrAriaHidden, 'true')
        ;
    }

    function removeInstance(instanceToRemove) {
        var show;

        instanceToRemove
            .element()
            .attr(_attrAriaHidden, 'true')
        ;

        if (1 === _instances.length) {
            _html.removeClass('lity-active');

            _win
                .off({
                    resize: resize,
                    keydown: keydown
                })
            ;
        }

        _instances = $.grep(_instances, function(instance) {
            return instanceToRemove !== instance;
        });

        if (!!_instances.length) {
            show = _instances[0].element();
        } else {
            show = $('.lity-hidden');
        }

        show
            .removeClass('lity-hidden')
            .each(function() {
                var el = $(this), oldAttr = el.data(_dataAriaHidden);

                if (!oldAttr) {
                    el.removeAttr(_attrAriaHidden);
                } else {
                    el.attr(_attrAriaHidden, oldAttr);
                }

                el.removeData(_dataAriaHidden);
            })
        ;
    }

    function currentInstance() {
        if (0 === _instances.length) {
            return null;
        }

        return _instances[0];
    }

    function factory(target, instance, handlers, preferredHandler) {
        var handler = 'inline', content;

        var currentHandlers = $.extend({}, handlers);

        if (preferredHandler && currentHandlers[preferredHandler]) {
            content = currentHandlers[preferredHandler](target, instance);
            handler = preferredHandler;
        } else {
            // Run inline and iframe handlers after all other handlers
            $.each(['inline', 'iframe'], function(i, name) {
                delete currentHandlers[name];

                currentHandlers[name] = handlers[name];
            });

            $.each(currentHandlers, function(name, currentHandler) {
                // Handler might be "removed" by setting callback to null
                if (!currentHandler) {
                    return true;
                }

                if (
                    currentHandler.test &&
                    !currentHandler.test(target, instance)
                ) {
                    return true;
                }

                content = currentHandler(target, instance);

                if (false !== content) {
                    handler = name;
                    return false;
                }
            });
        }

        return {handler: handler, content: content || ''};
    }

    function Lity(target, options, opener, activeElement) {
        var self = this;
        var result;
        var isReady = false;
        var isClosed = false;
        var element;
        var content;

        options = $.extend(
            {},
            _defaultOptions,
            options
        );

        element = $(options.template);

        // -- API --

        self.element = function() {
            return element;
        };

        self.opener = function() {
            return opener;
        };

        self.options  = $.proxy(settings, self, options);
        self.handlers = $.proxy(settings, self, options.handlers);

        self.resize = function() {
            if (!isReady || isClosed) {
                return;
            }

            content
                .css('max-height', winHeight() + 'px')
                .trigger('lity:resize', [self])
            ;
        };

        self.close = function() {
            if (!isReady || isClosed) {
                return;
            }

            isClosed = true;

            removeInstance(self);

            var deferred = _deferred();

            // We return focus only if the current focus is inside this instance
            if (
                activeElement &&
                (
                    document.activeElement === element[0] ||
                    $.contains(element[0], document.activeElement)
                )
            ) {
                try {
                    activeElement.focus();
                } catch (e) {
                    // Ignore exceptions, eg. for SVG elements which can't be
                    // focused in IE11
                }
            }

            content.trigger('lity:close', [self]);

            element
                .removeClass('lity-opened')
                .addClass('lity-closed')
            ;

            transitionEnd(content.add(element))
                .always(function() {
                    content.trigger('lity:remove', [self]);
                    element.remove();
                    element = undefined;
                    deferred.resolve();
                })
            ;

            return deferred.promise();
        };

        // -- Initialization --

        result = factory(target, self, options.handlers, options.handler);

        element
            .attr(_attrAriaHidden, 'false')
            .addClass('lity-loading lity-opened lity-' + result.handler)
            .appendTo('body')
            .focus()
            .on('click', '[data-lity-close]', function(e) {
                if ($(e.target).is('[data-lity-close]')) {
                    self.close();
                }
            })
            .trigger('lity:open', [self])
        ;

        registerInstance(self);

        $.when(result.content)
            .always(ready)
        ;

        function ready(result) {
            content = $(result)
                .css('max-height', winHeight() + 'px')
            ;

            element
                .find('.lity-loader')
                .each(function() {
                    var loader = $(this);

                    transitionEnd(loader)
                        .always(function() {
                            loader.remove();
                        })
                    ;
                })
            ;

            element
                .removeClass('lity-loading')
                .find('.lity-content')
                .empty()
                .append(content)
            ;

            isReady = true;

            content
                .trigger('lity:ready', [self])
            ;
        }
    }

    function lity(target, options, opener) {
        if (!target.preventDefault) {
            opener = $(opener);
        } else {
            target.preventDefault();
            opener = $(this);
            target = opener.data('lity-target') || opener.attr('href') || opener.attr('src');
        }

        var instance = new Lity(
            target,
            $.extend(
                {},
                opener.data('lity-options') || opener.data('lity'),
                options
            ),
            opener,
            document.activeElement
        );

        if (!target.preventDefault) {
            return instance;
        }
    }

    lity.version  = '2.3.1';
    lity.options  = $.proxy(settings, lity, _defaultOptions);
    lity.handlers = $.proxy(settings, lity, _defaultOptions.handlers);
    lity.current  = currentInstance;

    $(document).on('click.lity', '[data-lity]', lity);

    return lity;
}));


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
/*! Gecko-Picture - v1.0
 * https://github.com/scottjehl/picturefill/tree/3.0/src/plugins/gecko-picture
 * Firefox's early picture implementation (prior to FF41) is static and does
 * not react to viewport changes. This tiny module fixes this.
 */
(function(window) {
	/*jshint eqnull:true */
	var ua = navigator.userAgent;

	if ( window.HTMLPictureElement && ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 < 45) ) {
		addEventListener("resize", (function() {
			var timer;

			var dummySrc = document.createElement("source");

			var fixRespimg = function(img) {
				var source, sizes;
				var picture = img.parentNode;

				if (picture.nodeName.toUpperCase() === "PICTURE") {
					source = dummySrc.cloneNode();

					picture.insertBefore(source, picture.firstElementChild);
					setTimeout(function() {
						picture.removeChild(source);
					});
				} else if (!img._pfLastSize || img.offsetWidth > img._pfLastSize) {
					img._pfLastSize = img.offsetWidth;
					sizes = img.sizes;
					img.sizes += ",100vw";
					setTimeout(function() {
						img.sizes = sizes;
					});
				}
			};

			var findPictureImgs = function() {
				var i;
				var imgs = document.querySelectorAll("picture > img, img[srcset][sizes]");
				for (i = 0; i < imgs.length; i++) {
					fixRespimg(imgs[i]);
				}
			};
			var onResize = function() {
				clearTimeout(timer);
				timer = setTimeout(findPictureImgs, 99);
			};
			var mq = window.matchMedia && matchMedia("(orientation: landscape)");
			var init = function() {
				onResize();

				if (mq && mq.addListener) {
					mq.addListener(onResize);
				}
			};

			dummySrc.srcset = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

			if (/^[c|i]|d$/.test(document.readyState || "")) {
				init();
			} else {
				document.addEventListener("DOMContentLoaded", init);
			}

			return onResize;
		})());
	}
})(window);

/*! Picturefill - v3.0.2
 * http://scottjehl.github.io/picturefill
 * Copyright (c) 2015 https://github.com/scottjehl/picturefill/blob/master/Authors.txt;
 *  License: MIT
 */

(function( window, document, undefined ) {
	// Enable strict mode
	"use strict";

	// HTML shim|v it for old IE (IE9 will still need the HTML video tag workaround)
	document.createElement( "picture" );

	var warn, eminpx, alwaysCheckWDescriptor, evalId;
	// local object for method references and testing exposure
	var pf = {};
	var isSupportTestReady = false;
	var noop = function() {};
	var image = document.createElement( "img" );
	var getImgAttr = image.getAttribute;
	var setImgAttr = image.setAttribute;
	var removeImgAttr = image.removeAttribute;
	var docElem = document.documentElement;
	var types = {};
	var cfg = {
		//resource selection:
		algorithm: ""
	};
	var srcAttr = "data-pfsrc";
	var srcsetAttr = srcAttr + "set";
	// ua sniffing is done for undetectable img loading features,
	// to do some non crucial perf optimizations
	var ua = navigator.userAgent;
	var supportAbort = (/rident/).test(ua) || ((/ecko/).test(ua) && ua.match(/rv\:(\d+)/) && RegExp.$1 > 35 );
	var curSrcProp = "currentSrc";
	var regWDesc = /\s+\+?\d+(e\d+)?w/;
	var regSize = /(\([^)]+\))?\s*(.+)/;
	var setOptions = window.picturefillCFG;
	/**
	 * Shortcut property for https://w3c.github.io/webappsec/specs/mixedcontent/#restricts-mixed-content ( for easy overriding in tests )
	 */
	// baseStyle also used by getEmValue (i.e.: width: 1em is important)
	var baseStyle = "position:absolute;left:0;visibility:hidden;display:block;padding:0;border:none;font-size:1em;width:1em;overflow:hidden;clip:rect(0px, 0px, 0px, 0px)";
	var fsCss = "font-size:100%!important;";
	var isVwDirty = true;

	var cssCache = {};
	var sizeLengthCache = {};
	var DPR = window.devicePixelRatio;
	var units = {
		px: 1,
		"in": 96
	};
	var anchor = document.createElement( "a" );
	/**
	 * alreadyRun flag used for setOptions. is it true setOptions will reevaluate
	 * @type {boolean}
	 */
	var alreadyRun = false;

	// Reusable, non-"g" Regexes

	// (Don't use \s, to avoid matching non-breaking space.)
	var regexLeadingSpaces = /^[ \t\n\r\u000c]+/,
	    regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/,
	    regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/,
	    regexTrailingCommas = /[,]+$/,
	    regexNonNegativeInteger = /^\d+$/,

	    // ( Positive or negative or unsigned integers or decimals, without or without exponents.
	    // Must include at least one digit.
	    // According to spec tests any decimal point must be followed by a digit.
	    // No leading plus sign is allowed.)
	    // https://html.spec.whatwg.org/multipage/infrastructure.html#valid-floating-point-number
	    regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/;

	var on = function(obj, evt, fn, capture) {
		if ( obj.addEventListener ) {
			obj.addEventListener(evt, fn, capture || false);
		} else if ( obj.attachEvent ) {
			obj.attachEvent( "on" + evt, fn);
		}
	};

	/**
	 * simple memoize function:
	 */

	var memoize = function(fn) {
		var cache = {};
		return function(input) {
			if ( !(input in cache) ) {
				cache[ input ] = fn(input);
			}
			return cache[ input ];
		};
	};

	// UTILITY FUNCTIONS

	// Manual is faster than RegEx
	// http://jsperf.com/whitespace-character/5
	function isSpace(c) {
		return (c === "\u0020" || // space
		        c === "\u0009" || // horizontal tab
		        c === "\u000A" || // new line
		        c === "\u000C" || // form feed
		        c === "\u000D");  // carriage return
	}

	/**
	 * gets a mediaquery and returns a boolean or gets a css length and returns a number
	 * @param css mediaqueries or css length
	 * @returns {boolean|number}
	 *
	 * based on: https://gist.github.com/jonathantneal/db4f77009b155f083738
	 */
	var evalCSS = (function() {

		var regLength = /^([\d\.]+)(em|vw|px)$/;
		var replace = function() {
			var args = arguments, index = 0, string = args[0];
			while (++index in args) {
				string = string.replace(args[index], args[++index]);
			}
			return string;
		};

		var buildStr = memoize(function(css) {

			return "return " + replace((css || "").toLowerCase(),
				// interpret `and`
				/\band\b/g, "&&",

				// interpret `,`
				/,/g, "||",

				// interpret `min-` as >=
				/min-([a-z-\s]+):/g, "e.$1>=",

				// interpret `max-` as <=
				/max-([a-z-\s]+):/g, "e.$1<=",

				//calc value
				/calc([^)]+)/g, "($1)",

				// interpret css values
				/(\d+[\.]*[\d]*)([a-z]+)/g, "($1 * e.$2)",
				//make eval less evil
				/^(?!(e.[a-z]|[0-9\.&=|><\+\-\*\(\)\/])).*/ig, ""
			) + ";";
		});

		return function(css, length) {
			var parsedLength;
			if (!(css in cssCache)) {
				cssCache[css] = false;
				if (length && (parsedLength = css.match( regLength ))) {
					cssCache[css] = parsedLength[ 1 ] * units[parsedLength[ 2 ]];
				} else {
					/*jshint evil:true */
					try{
						cssCache[css] = new Function("e", buildStr(css))(units);
					} catch(e) {}
					/*jshint evil:false */
				}
			}
			return cssCache[css];
		};
	})();

	var setResolution = function( candidate, sizesattr ) {
		if ( candidate.w ) { // h = means height: || descriptor.type === 'h' do not handle yet...
			candidate.cWidth = pf.calcListLength( sizesattr || "100vw" );
			candidate.res = candidate.w / candidate.cWidth ;
		} else {
			candidate.res = candidate.d;
		}
		return candidate;
	};

	/**
	 *
	 * @param opt
	 */
	var picturefill = function( opt ) {

		if (!isSupportTestReady) {return;}

		var elements, i, plen;

		var options = opt || {};

		if ( options.elements && options.elements.nodeType === 1 ) {
			if ( options.elements.nodeName.toUpperCase() === "IMG" ) {
				options.elements =  [ options.elements ];
			} else {
				options.context = options.elements;
				options.elements =  null;
			}
		}

		elements = options.elements || pf.qsa( (options.context || document), ( options.reevaluate || options.reselect ) ? pf.sel : pf.selShort );

		if ( (plen = elements.length) ) {

			pf.setupRun( options );
			alreadyRun = true;

			// Loop through all elements
			for ( i = 0; i < plen; i++ ) {
				pf.fillImg(elements[ i ], options);
			}

			pf.teardownRun( options );
		}
	};

	/**
	 * outputs a warning for the developer
	 * @param {message}
	 * @type {Function}
	 */
	warn = ( window.console && console.warn ) ?
		function( message ) {
			console.warn( message );
		} :
		noop
	;

	if ( !(curSrcProp in image) ) {
		curSrcProp = "src";
	}

	// Add support for standard mime types.
	types[ "image/jpeg" ] = true;
	types[ "image/gif" ] = true;
	types[ "image/png" ] = true;

	function detectTypeSupport( type, typeUri ) {
		// based on Modernizr's lossless img-webp test
		// note: asynchronous
		var image = new window.Image();
		image.onerror = function() {
			types[ type ] = false;
			picturefill();
		};
		image.onload = function() {
			types[ type ] = image.width === 1;
			picturefill();
		};
		image.src = typeUri;
		return "pending";
	}

	// test svg support
	types[ "image/svg+xml" ] = document.implementation.hasFeature( "http://www.w3.org/TR/SVG11/feature#Image", "1.1" );

	/**
	 * updates the internal vW property with the current viewport width in px
	 */
	function updateMetrics() {

		isVwDirty = false;
		DPR = window.devicePixelRatio;
		cssCache = {};
		sizeLengthCache = {};

		pf.DPR = DPR || 1;

		units.width = Math.max(window.innerWidth || 0, docElem.clientWidth);
		units.height = Math.max(window.innerHeight || 0, docElem.clientHeight);

		units.vw = units.width / 100;
		units.vh = units.height / 100;

		evalId = [ units.height, units.width, DPR ].join("-");

		units.em = pf.getEmValue();
		units.rem = units.em;
	}

	function chooseLowRes( lowerValue, higherValue, dprValue, isCached ) {
		var bonusFactor, tooMuch, bonus, meanDensity;

		//experimental
		if (cfg.algorithm === "saveData" ){
			if ( lowerValue > 2.7 ) {
				meanDensity = dprValue + 1;
			} else {
				tooMuch = higherValue - dprValue;
				bonusFactor = Math.pow(lowerValue - 0.6, 1.5);

				bonus = tooMuch * bonusFactor;

				if (isCached) {
					bonus += 0.1 * bonusFactor;
				}

				meanDensity = lowerValue + bonus;
			}
		} else {
			meanDensity = (dprValue > 1) ?
				Math.sqrt(lowerValue * higherValue) :
				lowerValue;
		}

		return meanDensity > dprValue;
	}

	function applyBestCandidate( img ) {
		var srcSetCandidates;
		var matchingSet = pf.getSet( img );
		var evaluated = false;
		if ( matchingSet !== "pending" ) {
			evaluated = evalId;
			if ( matchingSet ) {
				srcSetCandidates = pf.setRes( matchingSet );
				pf.applySetCandidate( srcSetCandidates, img );
			}
		}
		img[ pf.ns ].evaled = evaluated;
	}

	function ascendingSort( a, b ) {
		return a.res - b.res;
	}

	function setSrcToCur( img, src, set ) {
		var candidate;
		if ( !set && src ) {
			set = img[ pf.ns ].sets;
			set = set && set[set.length - 1];
		}

		candidate = getCandidateForSrc(src, set);

		if ( candidate ) {
			src = pf.makeUrl(src);
			img[ pf.ns ].curSrc = src;
			img[ pf.ns ].curCan = candidate;

			if ( !candidate.res ) {
				setResolution( candidate, candidate.set.sizes );
			}
		}
		return candidate;
	}

	function getCandidateForSrc( src, set ) {
		var i, candidate, candidates;
		if ( src && set ) {
			candidates = pf.parseSet( set );
			src = pf.makeUrl(src);
			for ( i = 0; i < candidates.length; i++ ) {
				if ( src === pf.makeUrl(candidates[ i ].url) ) {
					candidate = candidates[ i ];
					break;
				}
			}
		}
		return candidate;
	}

	function getAllSourceElements( picture, candidates ) {
		var i, len, source, srcset;

		// SPEC mismatch intended for size and perf:
		// actually only source elements preceding the img should be used
		// also note: don't use qsa here, because IE8 sometimes doesn't like source as the key part in a selector
		var sources = picture.getElementsByTagName( "source" );

		for ( i = 0, len = sources.length; i < len; i++ ) {
			source = sources[ i ];
			source[ pf.ns ] = true;
			srcset = source.getAttribute( "srcset" );

			// if source does not have a srcset attribute, skip
			if ( srcset ) {
				candidates.push( {
					srcset: srcset,
					media: source.getAttribute( "media" ),
					type: source.getAttribute( "type" ),
					sizes: source.getAttribute( "sizes" )
				} );
			}
		}
	}

	/**
	 * Srcset Parser
	 * By Alex Bell |  MIT License
	 *
	 * @returns Array [{url: _, d: _, w: _, h:_, set:_(????)}, ...]
	 *
	 * Based super duper closely on the reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-srcset-attribute
	 */

	// 1. Let input be the value passed to this algorithm.
	// (TO-DO : Explain what "set" argument is here. Maybe choose a more
	// descriptive & more searchable name.  Since passing the "set" in really has
	// nothing to do with parsing proper, I would prefer this assignment eventually
	// go in an external fn.)
	function parseSrcset(input, set) {

		function collectCharacters(regEx) {
			var chars,
			    match = regEx.exec(input.substring(pos));
			if (match) {
				chars = match[ 0 ];
				pos += chars.length;
				return chars;
			}
		}

		var inputLength = input.length,
		    url,
		    descriptors,
		    currentDescriptor,
		    state,
		    c,

		    // 2. Let position be a pointer into input, initially pointing at the start
		    //    of the string.
		    pos = 0,

		    // 3. Let candidates be an initially empty source set.
		    candidates = [];

		/**
		* Adds descriptor properties to a candidate, pushes to the candidates array
		* @return undefined
		*/
		// (Declared outside of the while loop so that it's only created once.
		// (This fn is defined before it is used, in order to pass JSHINT.
		// Unfortunately this breaks the sequencing of the spec comments. :/ )
		function parseDescriptors() {

			// 9. Descriptor parser: Let error be no.
			var pError = false,

			// 10. Let width be absent.
			// 11. Let density be absent.
			// 12. Let future-compat-h be absent. (We're implementing it now as h)
			    w, d, h, i,
			    candidate = {},
			    desc, lastChar, value, intVal, floatVal;

			// 13. For each descriptor in descriptors, run the appropriate set of steps
			// from the following list:
			for (i = 0 ; i < descriptors.length; i++) {
				desc = descriptors[ i ];

				lastChar = desc[ desc.length - 1 ];
				value = desc.substring(0, desc.length - 1);
				intVal = parseInt(value, 10);
				floatVal = parseFloat(value);

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0077 LATIN SMALL LETTER W character
				if (regexNonNegativeInteger.test(value) && (lastChar === "w")) {

					// If width and density are not both absent, then let error be yes.
					if (w || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes.
					// Otherwise, let width be the result.
					if (intVal === 0) {pError = true;} else {w = intVal;}

				// If the descriptor consists of a valid floating-point number followed by
				// a U+0078 LATIN SMALL LETTER X character
				} else if (regexFloatingPoint.test(value) && (lastChar === "x")) {

					// If width, density and future-compat-h are not all absent, then let error
					// be yes.
					if (w || d || h) {pError = true;}

					// Apply the rules for parsing floating-point number values to the descriptor.
					// If the result is less than zero, let error be yes. Otherwise, let density
					// be the result.
					if (floatVal < 0) {pError = true;} else {d = floatVal;}

				// If the descriptor consists of a valid non-negative integer followed by
				// a U+0068 LATIN SMALL LETTER H character
				} else if (regexNonNegativeInteger.test(value) && (lastChar === "h")) {

					// If height and density are not both absent, then let error be yes.
					if (h || d) {pError = true;}

					// Apply the rules for parsing non-negative integers to the descriptor.
					// If the result is zero, let error be yes. Otherwise, let future-compat-h
					// be the result.
					if (intVal === 0) {pError = true;} else {h = intVal;}

				// Anything else, Let error be yes.
				} else {pError = true;}
			} // (close step 13 for loop)

			// 15. If error is still no, then append a new image source to candidates whose
			// URL is url, associated with a width width if not absent and a pixel
			// density density if not absent. Otherwise, there is a parse error.
			if (!pError) {
				candidate.url = url;

				if (w) { candidate.w = w;}
				if (d) { candidate.d = d;}
				if (h) { candidate.h = h;}
				if (!h && !d && !w) {candidate.d = 1;}
				if (candidate.d === 1) {set.has1x = true;}
				candidate.set = set;

				candidates.push(candidate);
			}
		} // (close parseDescriptors fn)

		/**
		* Tokenizes descriptor properties prior to parsing
		* Returns undefined.
		* (Again, this fn is defined before it is used, in order to pass JSHINT.
		* Unfortunately this breaks the logical sequencing of the spec comments. :/ )
		*/
		function tokenize() {

			// 8.1. Descriptor tokeniser: Skip whitespace
			collectCharacters(regexLeadingSpaces);

			// 8.2. Let current descriptor be the empty string.
			currentDescriptor = "";

			// 8.3. Let state be in descriptor.
			state = "in descriptor";

			while (true) {

				// 8.4. Let c be the character at position.
				c = input.charAt(pos);

				//  Do the following depending on the value of state.
				//  For the purpose of this step, "EOF" is a special character representing
				//  that position is past the end of input.

				// In descriptor
				if (state === "in descriptor") {
					// Do the following, depending on the value of c:

				  // Space character
				  // If current descriptor is not empty, append current descriptor to
				  // descriptors and let current descriptor be the empty string.
				  // Set state to after descriptor.
					if (isSpace(c)) {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
							currentDescriptor = "";
							state = "after descriptor";
						}

					// U+002C COMMA (,)
					// Advance position to the next character in input. If current descriptor
					// is not empty, append current descriptor to descriptors. Jump to the step
					// labeled descriptor parser.
					} else if (c === ",") {
						pos += 1;
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// U+0028 LEFT PARENTHESIS (()
					// Append c to current descriptor. Set state to in parens.
					} else if (c === "\u0028") {
						currentDescriptor = currentDescriptor + c;
						state = "in parens";

					// EOF
					// If current descriptor is not empty, append current descriptor to
					// descriptors. Jump to the step labeled descriptor parser.
					} else if (c === "") {
						if (currentDescriptor) {
							descriptors.push(currentDescriptor);
						}
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}
				// (end "in descriptor"

				// In parens
				} else if (state === "in parens") {

					// U+0029 RIGHT PARENTHESIS ())
					// Append c to current descriptor. Set state to in descriptor.
					if (c === ")") {
						currentDescriptor = currentDescriptor + c;
						state = "in descriptor";

					// EOF
					// Append current descriptor to descriptors. Jump to the step labeled
					// descriptor parser.
					} else if (c === "") {
						descriptors.push(currentDescriptor);
						parseDescriptors();
						return;

					// Anything else
					// Append c to current descriptor.
					} else {
						currentDescriptor = currentDescriptor + c;
					}

				// After descriptor
				} else if (state === "after descriptor") {

					// Do the following, depending on the value of c:
					// Space character: Stay in this state.
					if (isSpace(c)) {

					// EOF: Jump to the step labeled descriptor parser.
					} else if (c === "") {
						parseDescriptors();
						return;

					// Anything else
					// Set state to in descriptor. Set position to the previous character in input.
					} else {
						state = "in descriptor";
						pos -= 1;

					}
				}

				// Advance position to the next character in input.
				pos += 1;

			// Repeat this step.
			} // (close while true loop)
		}

		// 4. Splitting loop: Collect a sequence of characters that are space
		//    characters or U+002C COMMA characters. If any U+002C COMMA characters
		//    were collected, that is a parse error.
		while (true) {
			collectCharacters(regexLeadingCommasOrSpaces);

			// 5. If position is past the end of input, return candidates and abort these steps.
			if (pos >= inputLength) {
				return candidates; // (we're done, this is the sole return path)
			}

			// 6. Collect a sequence of characters that are not space characters,
			//    and let that be url.
			url = collectCharacters(regexLeadingNotSpaces);

			// 7. Let descriptors be a new empty list.
			descriptors = [];

			// 8. If url ends with a U+002C COMMA character (,), follow these substeps:
			//		(1). Remove all trailing U+002C COMMA characters from url. If this removed
			//         more than one character, that is a parse error.
			if (url.slice(-1) === ",") {
				url = url.replace(regexTrailingCommas, "");
				// (Jump ahead to step 9 to skip tokenization and just push the candidate).
				parseDescriptors();

			//	Otherwise, follow these substeps:
			} else {
				tokenize();
			} // (close else of step 8)

		// 16. Return to the step labeled splitting loop.
		} // (Close of big while loop.)
	}

	/*
	 * Sizes Parser
	 *
	 * By Alex Bell |  MIT License
	 *
	 * Non-strict but accurate and lightweight JS Parser for the string value <img sizes="here">
	 *
	 * Reference algorithm at:
	 * https://html.spec.whatwg.org/multipage/embedded-content.html#parse-a-sizes-attribute
	 *
	 * Most comments are copied in directly from the spec
	 * (except for comments in parens).
	 *
	 * Grammar is:
	 * <source-size-list> = <source-size># [ , <source-size-value> ]? | <source-size-value>
	 * <source-size> = <media-condition> <source-size-value>
	 * <source-size-value> = <length>
	 * http://www.w3.org/html/wg/drafts/html/master/embedded-content.html#attr-img-sizes
	 *
	 * E.g. "(max-width: 30em) 100vw, (max-width: 50em) 70vw, 100vw"
	 * or "(min-width: 30em), calc(30vw - 15px)" or just "30vw"
	 *
	 * Returns the first valid <css-length> with a media condition that evaluates to true,
	 * or "100vw" if all valid media conditions evaluate to false.
	 *
	 */

	function parseSizes(strValue) {

		// (Percentage CSS lengths are not allowed in this case, to avoid confusion:
		// https://html.spec.whatwg.org/multipage/embedded-content.html#valid-source-size-list
		// CSS allows a single optional plus or minus sign:
		// http://www.w3.org/TR/CSS2/syndata.html#numbers
		// CSS is ASCII case-insensitive:
		// http://www.w3.org/TR/CSS2/syndata.html#characters )
		// Spec allows exponential notation for <number> type:
		// http://dev.w3.org/csswg/css-values/#numbers
		var regexCssLengthWithUnits = /^(?:[+-]?[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?(?:ch|cm|em|ex|in|mm|pc|pt|px|rem|vh|vmin|vmax|vw)$/i;

		// (This is a quick and lenient test. Because of optional unlimited-depth internal
		// grouping parens and strict spacing rules, this could get very complicated.)
		var regexCssCalc = /^calc\((?:[0-9a-z \.\+\-\*\/\(\)]+)\)$/i;

		var i;
		var unparsedSizesList;
		var unparsedSizesListLength;
		var unparsedSize;
		var lastComponentValue;
		var size;

		// UTILITY FUNCTIONS

		//  (Toy CSS parser. The goals here are:
		//  1) expansive test coverage without the weight of a full CSS parser.
		//  2) Avoiding regex wherever convenient.
		//  Quick tests: http://jsfiddle.net/gtntL4gr/3/
		//  Returns an array of arrays.)
		function parseComponentValues(str) {
			var chrctr;
			var component = "";
			var componentArray = [];
			var listArray = [];
			var parenDepth = 0;
			var pos = 0;
			var inComment = false;

			function pushComponent() {
				if (component) {
					componentArray.push(component);
					component = "";
				}
			}

			function pushComponentArray() {
				if (componentArray[0]) {
					listArray.push(componentArray);
					componentArray = [];
				}
			}

			// (Loop forwards from the beginning of the string.)
			while (true) {
				chrctr = str.charAt(pos);

				if (chrctr === "") { // ( End of string reached.)
					pushComponent();
					pushComponentArray();
					return listArray;
				} else if (inComment) {
					if ((chrctr === "*") && (str[pos + 1] === "/")) { // (At end of a comment.)
						inComment = false;
						pos += 2;
						pushComponent();
						continue;
					} else {
						pos += 1; // (Skip all characters inside comments.)
						continue;
					}
				} else if (isSpace(chrctr)) {
					// (If previous character in loop was also a space, or if
					// at the beginning of the string, do not add space char to
					// component.)
					if ( (str.charAt(pos - 1) && isSpace( str.charAt(pos - 1) ) ) || !component ) {
						pos += 1;
						continue;
					} else if (parenDepth === 0) {
						pushComponent();
						pos +=1;
						continue;
					} else {
						// (Replace any space character with a plain space for legibility.)
						chrctr = " ";
					}
				} else if (chrctr === "(") {
					parenDepth += 1;
				} else if (chrctr === ")") {
					parenDepth -= 1;
				} else if (chrctr === ",") {
					pushComponent();
					pushComponentArray();
					pos += 1;
					continue;
				} else if ( (chrctr === "/") && (str.charAt(pos + 1) === "*") ) {
					inComment = true;
					pos += 2;
					continue;
				}

				component = component + chrctr;
				pos += 1;
			}
		}

		function isValidNonNegativeSourceSizeValue(s) {
			if (regexCssLengthWithUnits.test(s) && (parseFloat(s) >= 0)) {return true;}
			if (regexCssCalc.test(s)) {return true;}
			// ( http://www.w3.org/TR/CSS2/syndata.html#numbers says:
			// "-0 is equivalent to 0 and is not a negative number." which means that
			// unitless zero and unitless negative zero must be accepted as special cases.)
			if ((s === "0") || (s === "-0") || (s === "+0")) {return true;}
			return false;
		}

		// When asked to parse a sizes attribute from an element, parse a
		// comma-separated list of component values from the value of the element's
		// sizes attribute (or the empty string, if the attribute is absent), and let
		// unparsed sizes list be the result.
		// http://dev.w3.org/csswg/css-syntax/#parse-comma-separated-list-of-component-values

		unparsedSizesList = parseComponentValues(strValue);
		unparsedSizesListLength = unparsedSizesList.length;

		// For each unparsed size in unparsed sizes list:
		for (i = 0; i < unparsedSizesListLength; i++) {
			unparsedSize = unparsedSizesList[i];

			// 1. Remove all consecutive <whitespace-token>s from the end of unparsed size.
			// ( parseComponentValues() already omits spaces outside of parens. )

			// If unparsed size is now empty, that is a parse error; continue to the next
			// iteration of this algorithm.
			// ( parseComponentValues() won't push an empty array. )

			// 2. If the last component value in unparsed size is a valid non-negative
			// <source-size-value>, let size be its value and remove the component value
			// from unparsed size. Any CSS function other than the calc() function is
			// invalid. Otherwise, there is a parse error; continue to the next iteration
			// of this algorithm.
			// http://dev.w3.org/csswg/css-syntax/#parse-component-value
			lastComponentValue = unparsedSize[unparsedSize.length - 1];

			if (isValidNonNegativeSourceSizeValue(lastComponentValue)) {
				size = lastComponentValue;
				unparsedSize.pop();
			} else {
				continue;
			}

			// 3. Remove all consecutive <whitespace-token>s from the end of unparsed
			// size. If unparsed size is now empty, return size and exit this algorithm.
			// If this was not the last item in unparsed sizes list, that is a parse error.
			if (unparsedSize.length === 0) {
				return size;
			}

			// 4. Parse the remaining component values in unparsed size as a
			// <media-condition>. If it does not parse correctly, or it does parse
			// correctly but the <media-condition> evaluates to false, continue to the
			// next iteration of this algorithm.
			// (Parsing all possible compound media conditions in JS is heavy, complicated,
			// and the payoff is unclear. Is there ever an situation where the
			// media condition parses incorrectly but still somehow evaluates to true?
			// Can we just rely on the browser/polyfill to do it?)
			unparsedSize = unparsedSize.join(" ");
			if (!(pf.matchesMedia( unparsedSize ) ) ) {
				continue;
			}

			// 5. Return size and exit this algorithm.
			return size;
		}

		// If the above algorithm exhausts unparsed sizes list without returning a
		// size value, return 100vw.
		return "100vw";
	}

	// namespace
	pf.ns = ("pf" + new Date().getTime()).substr(0, 9);

	// srcset support test
	pf.supSrcset = "srcset" in image;
	pf.supSizes = "sizes" in image;
	pf.supPicture = !!window.HTMLPictureElement;

	// UC browser does claim to support srcset and picture, but not sizes,
	// this extended test reveals the browser does support nothing
	if (pf.supSrcset && pf.supPicture && !pf.supSizes) {
		(function(image2) {
			image.srcset = "data:,a";
			image2.src = "data:,a";
			pf.supSrcset = image.complete === image2.complete;
			pf.supPicture = pf.supSrcset && pf.supPicture;
		})(document.createElement("img"));
	}

	// Safari9 has basic support for sizes, but does't expose the `sizes` idl attribute
	if (pf.supSrcset && !pf.supSizes) {

		(function() {
			var width2 = "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw==";
			var width1 = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
			var img = document.createElement("img");
			var test = function() {
				var width = img.width;

				if (width === 2) {
					pf.supSizes = true;
				}

				alwaysCheckWDescriptor = pf.supSrcset && !pf.supSizes;

				isSupportTestReady = true;
				// force async
				setTimeout(picturefill);
			};

			img.onload = test;
			img.onerror = test;
			img.setAttribute("sizes", "9px");

			img.srcset = width1 + " 1w," + width2 + " 9w";
			img.src = width1;
		})();

	} else {
		isSupportTestReady = true;
	}

	// using pf.qsa instead of dom traversing does scale much better,
	// especially on sites mixing responsive and non-responsive images
	pf.selShort = "picture>img,img[srcset]";
	pf.sel = pf.selShort;
	pf.cfg = cfg;

	/**
	 * Shortcut property for `devicePixelRatio` ( for easy overriding in tests )
	 */
	pf.DPR = (DPR  || 1 );
	pf.u = units;

	// container of supported mime types that one might need to qualify before using
	pf.types =  types;

	pf.setSize = noop;

	/**
	 * Gets a string and returns the absolute URL
	 * @param src
	 * @returns {String} absolute URL
	 */

	pf.makeUrl = memoize(function(src) {
		anchor.href = src;
		return anchor.href;
	});

	/**
	 * Gets a DOM element or document and a selctor and returns the found matches
	 * Can be extended with jQuery/Sizzle for IE7 support
	 * @param context
	 * @param sel
	 * @returns {NodeList|Array}
	 */
	pf.qsa = function(context, sel) {
		return ( "querySelector" in context ) ? context.querySelectorAll(sel) : [];
	};

	/**
	 * Shortcut method for matchMedia ( for easy overriding in tests )
	 * wether native or pf.mMQ is used will be decided lazy on first call
	 * @returns {boolean}
	 */
	pf.matchesMedia = function() {
		if ( window.matchMedia && (matchMedia( "(min-width: 0.1em)" ) || {}).matches ) {
			pf.matchesMedia = function( media ) {
				return !media || ( matchMedia( media ).matches );
			};
		} else {
			pf.matchesMedia = pf.mMQ;
		}

		return pf.matchesMedia.apply( this, arguments );
	};

	/**
	 * A simplified matchMedia implementation for IE8 and IE9
	 * handles only min-width/max-width with px or em values
	 * @param media
	 * @returns {boolean}
	 */
	pf.mMQ = function( media ) {
		return media ? evalCSS(media) : true;
	};

	/**
	 * Returns the calculated length in css pixel from the given sourceSizeValue
	 * http://dev.w3.org/csswg/css-values-3/#length-value
	 * intended Spec mismatches:
	 * * Does not check for invalid use of CSS functions
	 * * Does handle a computed length of 0 the same as a negative and therefore invalid value
	 * @param sourceSizeValue
	 * @returns {Number}
	 */
	pf.calcLength = function( sourceSizeValue ) {

		var value = evalCSS(sourceSizeValue, true) || false;
		if (value < 0) {
			value = false;
		}

		return value;
	};

	/**
	 * Takes a type string and checks if its supported
	 */

	pf.supportsType = function( type ) {
		return ( type ) ? types[ type ] : true;
	};

	/**
	 * Parses a sourceSize into mediaCondition (media) and sourceSizeValue (length)
	 * @param sourceSizeStr
	 * @returns {*}
	 */
	pf.parseSize = memoize(function( sourceSizeStr ) {
		var match = ( sourceSizeStr || "" ).match(regSize);
		return {
			media: match && match[1],
			length: match && match[2]
		};
	});

	pf.parseSet = function( set ) {
		if ( !set.cands ) {
			set.cands = parseSrcset(set.srcset, set);
		}
		return set.cands;
	};

	/**
	 * returns 1em in css px for html/body default size
	 * function taken from respondjs
	 * @returns {*|number}
	 */
	pf.getEmValue = function() {
		var body;
		if ( !eminpx && (body = document.body) ) {
			var div = document.createElement( "div" ),
				originalHTMLCSS = docElem.style.cssText,
				originalBodyCSS = body.style.cssText;

			div.style.cssText = baseStyle;

			// 1em in a media query is the value of the default font size of the browser
			// reset docElem and body to ensure the correct value is returned
			docElem.style.cssText = fsCss;
			body.style.cssText = fsCss;

			body.appendChild( div );
			eminpx = div.offsetWidth;
			body.removeChild( div );

			//also update eminpx before returning
			eminpx = parseFloat( eminpx, 10 );

			// restore the original values
			docElem.style.cssText = originalHTMLCSS;
			body.style.cssText = originalBodyCSS;

		}
		return eminpx || 16;
	};

	/**
	 * Takes a string of sizes and returns the width in pixels as a number
	 */
	pf.calcListLength = function( sourceSizeListStr ) {
		// Split up source size list, ie ( max-width: 30em ) 100%, ( max-width: 50em ) 50%, 33%
		//
		//                           or (min-width:30em) calc(30% - 15px)
		if ( !(sourceSizeListStr in sizeLengthCache) || cfg.uT ) {
			var winningLength = pf.calcLength( parseSizes( sourceSizeListStr ) );

			sizeLengthCache[ sourceSizeListStr ] = !winningLength ? units.width : winningLength;
		}

		return sizeLengthCache[ sourceSizeListStr ];
	};

	/**
	 * Takes a candidate object with a srcset property in the form of url/
	 * ex. "images/pic-medium.png 1x, images/pic-medium-2x.png 2x" or
	 *     "images/pic-medium.png 400w, images/pic-medium-2x.png 800w" or
	 *     "images/pic-small.png"
	 * Get an array of image candidates in the form of
	 *      {url: "/foo/bar.png", resolution: 1}
	 * where resolution is http://dev.w3.org/csswg/css-values-3/#resolution-value
	 * If sizes is specified, res is calculated
	 */
	pf.setRes = function( set ) {
		var candidates;
		if ( set ) {

			candidates = pf.parseSet( set );

			for ( var i = 0, len = candidates.length; i < len; i++ ) {
				setResolution( candidates[ i ], set.sizes );
			}
		}
		return candidates;
	};

	pf.setRes.res = setResolution;

	pf.applySetCandidate = function( candidates, img ) {
		if ( !candidates.length ) {return;}
		var candidate,
			i,
			j,
			length,
			bestCandidate,
			curSrc,
			curCan,
			candidateSrc,
			abortCurSrc;

		var imageData = img[ pf.ns ];
		var dpr = pf.DPR;

		curSrc = imageData.curSrc || img[curSrcProp];

		curCan = imageData.curCan || setSrcToCur(img, curSrc, candidates[0].set);

		// if we have a current source, we might either become lazy or give this source some advantage
		if ( curCan && curCan.set === candidates[ 0 ].set ) {

			// if browser can abort image request and the image has a higher pixel density than needed
			// and this image isn't downloaded yet, we skip next part and try to save bandwidth
			abortCurSrc = (supportAbort && !img.complete && curCan.res - 0.1 > dpr);

			if ( !abortCurSrc ) {
				curCan.cached = true;

				// if current candidate is "best", "better" or "okay",
				// set it to bestCandidate
				if ( curCan.res >= dpr ) {
					bestCandidate = curCan;
				}
			}
		}

		if ( !bestCandidate ) {

			candidates.sort( ascendingSort );

			length = candidates.length;
			bestCandidate = candidates[ length - 1 ];

			for ( i = 0; i < length; i++ ) {
				candidate = candidates[ i ];
				if ( candidate.res >= dpr ) {
					j = i - 1;

					// we have found the perfect candidate,
					// but let's improve this a little bit with some assumptions ;-)
					if (candidates[ j ] &&
						(abortCurSrc || curSrc !== pf.makeUrl( candidate.url )) &&
						chooseLowRes(candidates[ j ].res, candidate.res, dpr, candidates[ j ].cached)) {

						bestCandidate = candidates[ j ];

					} else {
						bestCandidate = candidate;
					}
					break;
				}
			}
		}

		if ( bestCandidate ) {

			candidateSrc = pf.makeUrl( bestCandidate.url );

			imageData.curSrc = candidateSrc;
			imageData.curCan = bestCandidate;

			if ( candidateSrc !== curSrc ) {
				pf.setSrc( img, bestCandidate );
			}
			pf.setSize( img );
		}
	};

	pf.setSrc = function( img, bestCandidate ) {
		var origWidth;
		img.src = bestCandidate.url;

		// although this is a specific Safari issue, we don't want to take too much different code paths
		if ( bestCandidate.set.type === "image/svg+xml" ) {
			origWidth = img.style.width;
			img.style.width = (img.offsetWidth + 1) + "px";

			// next line only should trigger a repaint
			// if... is only done to trick dead code removal
			if ( img.offsetWidth + 1 ) {
				img.style.width = origWidth;
			}
		}
	};

	pf.getSet = function( img ) {
		var i, set, supportsType;
		var match = false;
		var sets = img [ pf.ns ].sets;

		for ( i = 0; i < sets.length && !match; i++ ) {
			set = sets[i];

			if ( !set.srcset || !pf.matchesMedia( set.media ) || !(supportsType = pf.supportsType( set.type )) ) {
				continue;
			}

			if ( supportsType === "pending" ) {
				set = supportsType;
			}

			match = set;
			break;
		}

		return match;
	};

	pf.parseSets = function( element, parent, options ) {
		var srcsetAttribute, imageSet, isWDescripor, srcsetParsed;

		var hasPicture = parent && parent.nodeName.toUpperCase() === "PICTURE";
		var imageData = element[ pf.ns ];

		if ( imageData.src === undefined || options.src ) {
			imageData.src = getImgAttr.call( element, "src" );
			if ( imageData.src ) {
				setImgAttr.call( element, srcAttr, imageData.src );
			} else {
				removeImgAttr.call( element, srcAttr );
			}
		}

		if ( imageData.srcset === undefined || options.srcset || !pf.supSrcset || element.srcset ) {
			srcsetAttribute = getImgAttr.call( element, "srcset" );
			imageData.srcset = srcsetAttribute;
			srcsetParsed = true;
		}

		imageData.sets = [];

		if ( hasPicture ) {
			imageData.pic = true;
			getAllSourceElements( parent, imageData.sets );
		}

		if ( imageData.srcset ) {
			imageSet = {
				srcset: imageData.srcset,
				sizes: getImgAttr.call( element, "sizes" )
			};

			imageData.sets.push( imageSet );

			isWDescripor = (alwaysCheckWDescriptor || imageData.src) && regWDesc.test(imageData.srcset || "");

			// add normal src as candidate, if source has no w descriptor
			if ( !isWDescripor && imageData.src && !getCandidateForSrc(imageData.src, imageSet) && !imageSet.has1x ) {
				imageSet.srcset += ", " + imageData.src;
				imageSet.cands.push({
					url: imageData.src,
					d: 1,
					set: imageSet
				});
			}

		} else if ( imageData.src ) {
			imageData.sets.push( {
				srcset: imageData.src,
				sizes: null
			} );
		}

		imageData.curCan = null;
		imageData.curSrc = undefined;

		// if img has picture or the srcset was removed or has a srcset and does not support srcset at all
		// or has a w descriptor (and does not support sizes) set support to false to evaluate
		imageData.supported = !( hasPicture || ( imageSet && !pf.supSrcset ) || (isWDescripor && !pf.supSizes) );

		if ( srcsetParsed && pf.supSrcset && !imageData.supported ) {
			if ( srcsetAttribute ) {
				setImgAttr.call( element, srcsetAttr, srcsetAttribute );
				element.srcset = "";
			} else {
				removeImgAttr.call( element, srcsetAttr );
			}
		}

		if (imageData.supported && !imageData.srcset && ((!imageData.src && element.src) ||  element.src !== pf.makeUrl(imageData.src))) {
			if (imageData.src === null) {
				element.removeAttribute("src");
			} else {
				element.src = imageData.src;
			}
		}

		imageData.parsed = true;
	};

	pf.fillImg = function(element, options) {
		var imageData;
		var extreme = options.reselect || options.reevaluate;

		// expando for caching data on the img
		if ( !element[ pf.ns ] ) {
			element[ pf.ns ] = {};
		}

		imageData = element[ pf.ns ];

		// if the element has already been evaluated, skip it
		// unless `options.reevaluate` is set to true ( this, for example,
		// is set to true when running `picturefill` on `resize` ).
		if ( !extreme && imageData.evaled === evalId ) {
			return;
		}

		if ( !imageData.parsed || options.reevaluate ) {
			pf.parseSets( element, element.parentNode, options );
		}

		if ( !imageData.supported ) {
			applyBestCandidate( element );
		} else {
			imageData.evaled = evalId;
		}
	};

	pf.setupRun = function() {
		if ( !alreadyRun || isVwDirty || (DPR !== window.devicePixelRatio) ) {
			updateMetrics();
		}
	};

	// If picture is supported, well, that's awesome.
	if ( pf.supPicture ) {
		picturefill = noop;
		pf.fillImg = noop;
	} else {

		 // Set up picture polyfill by polling the document
		(function() {
			var isDomReady;
			var regReady = window.attachEvent ? /d$|^c/ : /d$|^c|^i/;

			var run = function() {
				var readyState = document.readyState || "";

				timerId = setTimeout(run, readyState === "loading" ? 200 :  999);
				if ( document.body ) {
					pf.fillImgs();
					isDomReady = isDomReady || regReady.test(readyState);
					if ( isDomReady ) {
						clearTimeout( timerId );
					}

				}
			};

			var timerId = setTimeout(run, document.body ? 9 : 99);

			// Also attach picturefill on resize and readystatechange
			// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
			var debounce = function(func, wait) {
				var timeout, timestamp;
				var later = function() {
					var last = (new Date()) - timestamp;

					if (last < wait) {
						timeout = setTimeout(later, wait - last);
					} else {
						timeout = null;
						func();
					}
				};

				return function() {
					timestamp = new Date();

					if (!timeout) {
						timeout = setTimeout(later, wait);
					}
				};
			};
			var lastClientWidth = docElem.clientHeight;
			var onResize = function() {
				isVwDirty = Math.max(window.innerWidth || 0, docElem.clientWidth) !== units.width || docElem.clientHeight !== lastClientWidth;
				lastClientWidth = docElem.clientHeight;
				if ( isVwDirty ) {
					pf.fillImgs();
				}
			};

			on( window, "resize", debounce(onResize, 99 ) );
			on( document, "readystatechange", run );
		})();
	}

	pf.picturefill = picturefill;
	//use this internally for easy monkey patching/performance testing
	pf.fillImgs = picturefill;
	pf.teardownRun = noop;

	/* expose methods for testing */
	picturefill._ = pf;

	window.picturefillCFG = {
		pf: pf,
		push: function(args) {
			var name = args.shift();
			if (typeof pf[name] === "function") {
				pf[name].apply(pf, args);
			} else {
				cfg[name] = args[0];
				if (alreadyRun) {
					pf.fillImgs( { reselect: true } );
				}
			}
		}
	};

	while (setOptions && setOptions.length) {
		window.picturefillCFG.push(setOptions.shift());
	}

	/* expose picturefill */
	window.picturefill = picturefill;

	/* expose picturefill */
	if (  true && typeof module.exports === "object" ) {
		// CommonJS, just export
		module.exports = picturefill;
	} else if ( true ) {
		// AMD support
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return picturefill; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// IE8 evals this sync, so it must be the last thing we do
	if ( !pf.supPicture ) {
		types[ "image/webp" ] = detectTypeSupport("image/webp", "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAABBxAR/Q9ERP8DAABWUDggGAAAADABAJ0BKgEAAQADADQlpAADcAD++/1QAA==" );
	}

} )( window, document );


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Cookies.js - 1.2.3
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
        
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }
            
            var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

            return value === undefined ? undefined : decodeURIComponent(value);
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };
    var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

    // AMD support
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return cookiesExport; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    // CommonJS/Node.js support
    } else {}
})(typeof window === 'undefined' ? this : window);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var require;var require;

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : _typeof2(obj);
};

(function (f) {
  if (( false ? undefined : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var g; }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return require(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof require == "function" && require;

    for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }

    return s;
  }({
    1: [function (require, module, exports) {
      window.addEventListener("popstate", function (e) {
        Url.triggerPopStateCb(e);
      });
      var Url = module.exports = {
        _onPopStateCbs: [],
        _isHash: false,
        queryString: function queryString(name, notDecoded) {
          name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
          var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
              results = regex.exec(location.search),
              encoded = null;

          if (results === null) {
            regex = new RegExp("[\\?&]" + name + "(\\&([^&#]*)|$)");

            if (regex.test(location.search)) {
              return true;
            }

            return undefined;
          } else {
            encoded = results[1].replace(/\+/g, " ");

            if (notDecoded) {
              return encoded;
            }

            return decodeURIComponent(encoded);
          }
        },
        parseQuery: function parseQuery(search) {
          var query = {};

          if (typeof search !== "string") {
            search = window.location.search;
          }

          search = search.replace(/^\?/g, "");

          if (!search) {
            return {};
          }

          var a = search.split("&"),
              i = 0,
              iequ,
              value = null;

          for (; i < a.length; ++i) {
            iequ = a[i].indexOf("=");

            if (iequ < 0) {
              iequ = a[i].length;
              value = true;
            } else {
              value = decodeURIComponent(a[i].slice(iequ + 1));
            }

            query[decodeURIComponent(a[i].slice(0, iequ))] = value;
          }

          return query;
        },
        stringify: function stringify(queryObj) {
          if (!queryObj || queryObj.constructor !== Object) {
            throw new Error("Query object should be an object.");
          }

          var stringified = "";
          Object.keys(queryObj).forEach(function (c) {
            var value = queryObj[c];
            stringified += c;

            if (value !== true) {
              stringified += "=" + encodeURIComponent(queryObj[c]);
            }

            stringified += "&";
          });
          stringified = stringified.replace(/\&$/g, "");
          return stringified;
        },
        updateSearchParam: function updateSearchParam(param, value, push, triggerPopState) {
          var searchParsed = this.parseQuery();

          if (value === undefined) {
            delete searchParsed[param];
          } else {
            if (searchParsed[param] === value) {
              return Url;
            }

            searchParsed[param] = value;
          }

          var newSearch = "?" + this.stringify(searchParsed);

          this._updateAll(window.location.pathname + newSearch + location.hash, push, triggerPopState);

          return Url;
        },
        getLocation: function getLocation() {
          return window.location.pathname + window.location.search + window.location.hash;
        },
        hash: function hash(newHash, triggerPopState) {
          if (newHash === undefined) {
            return location.hash.substring(1);
          }

          if (!triggerPopState) {
            setTimeout(function () {
              Url._isHash = false;
            }, 0);
            Url._isHash = true;
          }

          return location.hash = newHash;
        },
        _updateAll: function _updateAll(s, push, triggerPopState) {
          window.history[push ? "pushState" : "replaceState"](null, "", s);

          if (triggerPopState) {
            Url.triggerPopStateCb({});
          }

          return s;
        },
        pathname: function pathname(_pathname, push, triggerPopState) {
          if (_pathname === undefined) {
            return location.pathname;
          }

          return this._updateAll(_pathname + window.location.search + window.location.hash, push, triggerPopState);
        },
        triggerPopStateCb: function triggerPopStateCb(e) {
          if (this._isHash) {
            return;
          }

          this._onPopStateCbs.forEach(function (c) {
            c(e);
          });
        },
        onPopState: function onPopState(cb) {
          this._onPopStateCbs.push(cb);
        },
        removeHash: function removeHash() {
          this._updateAll(window.location.pathname + window.location.search, false, false);
        },
        removeQuery: function removeQuery() {
          this._updateAll(window.location.pathname + window.location.hash, false, false);
        },
        version: "2.3.1"
      };
    }, {}]
  }, {}, [1])(1);
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(17);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2), __webpack_require__(5)))

/***/ }),
/* 18 */
/***/ (function(module) {

module.exports = {"name":"production","server":{"protocol":"https","host":"www.wgtn.ac.nz/__data/assets/git_bridge/0005/1778018/dist","port":443}};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var _accent_map;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var $ = __webpack_require__(0);

$(function () {
  //filterTags parameter only needed for postgrad quals filter..
  function searchFilter(targetElements, searchInput, minQueryLength, filterTags) {
    var $targetElements = $(targetElements);
    var $searchInput = $(searchInput);
    var MIN_QUERY_LENGTH = minQueryLength;

    function noQualsMessage() {
      //add no quals message
      if ($(filterTags)) {
        $('.no-quals-message').remove();
        var isVisible = 0;
        var noResultsFilterName = '';
        $targetElements.each(function () {
          if ($(this).is(":visible")) {
            isVisible++;
          } else {}
        });

        if (isVisible == 0) {
          var activeFilter = $('.quals-filter .tag.tag-active').text(); // console.log('active filter', activeFilter);

          noResultsFilterName += activeFilter;

          if (activeFilter == 'All') {
            noResultsFilterName = '';
          }

          var noQualMessage = '<section class="flash-message error no-quals-message" style="margin-top:.5rem;"><p class="">Sorry, no <strong>' + noResultsFilterName + '</strong> qualifications available. Please try another qualification.</p></section>'; // console.log('no results filter name', noResultsFilterName);

          $('.study-areas-postgrad .quals-filter').after(noQualMessage);
        }
      }
    } // console.time('removing accents from all elements');


    $targetElements.each(function () {
      var $this = $(this);
      $this.data('search-text', accent_fold($this.find('h2').text()).toLowerCase());
      $this.data('search-keywords', accent_fold($this.data('search-keywords')).toLowerCase());
    }); // console.timeEnd('removing accents from all elements');
    // $('.no-quals-message').remove();

    $searchInput.on('propertychange change click keyup input paste', function (_event) {
      var _query = _event.currentTarget.value;

      if (_query.length < MIN_QUERY_LENGTH) {
        $targetElements.toggleClass('is-matching', false);
        $targetElements.toggleClass('is-not-matching', false);
        noQualsMessage();
        return;
      }

      _query = accent_fold(_query).toLowerCase();
      $targetElements.each(function () {
        var $this = $(this);

        if ($this.data('search-text').indexOf(_query) !== -1 || $this.data('search-keywords').indexOf(_query) !== -1) {
          $this.toggleClass('is-matching', true);
          $this.toggleClass('is-not-matching', false);
        } else {
          $this.toggleClass('is-matching', false);
          $this.toggleClass('is-not-matching', true);
        }
      });
      noQualsMessage();
      $('.is-matching').each(function (index) {
        //for each breakpoint
        if (window.matchMedia("(min-width: 88em)").matches) {
          alignGrid(4, index, $(this), '.is-matching');
        }

        if (window.matchMedia("(max-width: 87.99em) and (min-width: 61em)").matches) {
          alignGrid(3, index, $(this), '.is-matching');
        }

        if (window.matchMedia("(max-width: 60.99em) and (min-width: 43em)").matches) {
          alignGrid(2, index, $(this), '.is-matching');
        }

        if (index === 0) {
          $(this).css('margin-left', '0');
        }
      });
    });
    var tags = $(filterTags);

    function alignGrid(cols, index, tile, filter) {
      //resets margins for grid
      tile.css({
        'margin-right': '0.375rem'
      });
      tile.css({
        'margin-left': '0.375rem'
      });

      if ((index + 1) % cols === 0) {
        tile.css('margin-right', '0%'); //Need set time out to make sure style is applied

        setTimeout(function () {
          tile.nextAll(filter).first().css({
            'margin-left': '0rem'
          });
        }, 75);
      }
    }

    ;

    if (tags !== null) {
      tags.each(function () {
        //on tag click update input to filter
        $(this).on('click', function (e) {
          $(this).siblings().removeClass('tag-active');
          $(this).addClass('tag-active');

          if ($(this).text() !== "All") {
            // $(searchInput).val('');
            // $(searchInput).val($(this).text()).change();
            var tag = $(this).text().toLowerCase(); // console.log(tag);

            $targetElements.each(function () {
              var $this = $(this); // console.log('tile', $this.data());

              if ($this.data('search-text').indexOf(tag) !== -1 || $this.data('search-keywords').indexOf(tag) !== -1) {
                $this.toggleClass('show-filter', true);
                $this.toggleClass('hide-filter', false);
              } else {
                $this.toggleClass('show-filter', false);
                $this.toggleClass('hide-filter', true);
              }
            });
            noQualsMessage();
            $(this).css('margin-right', ''); //update margins to prevent grid breaking

            $('.show-filter').each(function (index) {
              //for each breakpoint
              if (window.matchMedia("(min-width: 88em)").matches) {
                alignGrid(4, index, $(this), '.show-filter');
              }

              if (window.matchMedia("(max-width: 87.99em) and (min-width: 61em)").matches) {
                alignGrid(3, index, $(this), '.show-filter');
              }

              if (window.matchMedia("(max-width: 60.99em) and (min-width: 43em)").matches) {
                alignGrid(2, index, $(this), '.show-filter');
              }

              if (index === 0) {
                $(this).css('margin-left', '0');
              }
            });
          } else {
            // $(searchInput).val('').change();
            $(targetElements).css({
              'margin-right': '',
              'margin-left': ''
            });
            $('.no-quals-message').remove();
            $targetElements.toggleClass('show-filter', true);
            $targetElements.toggleClass('hide-filter', false);
          }
        });
      });
    }
  }

  searchFilter('.postgrad-quals li', '#search-quals', 3, '.quals-filter .tag');
  searchFilter('#areas-of-study li', '#search-aos', 3);
}); //alistapart.com/article/accent-folding-for-auto-complete

var accent_map = (_accent_map = {
  'ẚ': 'a',
  'Á': 'a',
  'á': 'a',
  'À': 'a',
  'à': 'a',
  'Ă': 'a',
  'ă': 'a',
  'Ắ': 'a',
  'ắ': 'a',
  'Ằ': 'a',
  'ằ': 'a',
  'Ẵ': 'a',
  'ẵ': 'a',
  'Ẳ': 'a',
  'ẳ': 'a',
  'Â': 'a',
  'â': 'a',
  'Ấ': 'a',
  'ấ': 'a',
  'Ầ': 'a',
  'ầ': 'a',
  'Ẫ': 'a',
  'ẫ': 'a',
  'Ẩ': 'a',
  'ẩ': 'a',
  'Ǎ': 'a',
  'ǎ': 'a',
  'Å': 'a',
  'å': 'a',
  'Ǻ': 'a',
  'ǻ': 'a',
  'Ä': 'a',
  'ä': 'a',
  'Ǟ': 'a',
  'ǟ': 'a',
  'Ã': 'a',
  'ã': 'a',
  'Ȧ': 'a',
  'ȧ': 'a',
  'Ǡ': 'a',
  'ǡ': 'a',
  'Ą': 'a',
  'ą': 'a',
  'Ā': 'a',
  'ā': 'a',
  'Ả': 'a',
  'ả': 'a',
  'Ȁ': 'a',
  'ȁ': 'a',
  'Ȃ': 'a',
  'ȃ': 'a',
  'Ạ': 'a',
  'ạ': 'a',
  'Ặ': 'a',
  'ặ': 'a',
  'Ậ': 'a',
  'ậ': 'a',
  'Ḁ': 'a',
  'ḁ': 'a',
  'Ⱥ': 'a',
  'ⱥ': 'a',
  'Ǽ': 'a',
  'ǽ': 'a',
  'Ǣ': 'a',
  'ǣ': 'a',
  'Ḃ': 'b',
  'ḃ': 'b',
  'Ḅ': 'b',
  'ḅ': 'b',
  'Ḇ': 'b',
  'ḇ': 'b',
  'Ƀ': 'b',
  'ƀ': 'b',
  'ᵬ': 'b',
  'Ɓ': 'b',
  'ɓ': 'b',
  'Ƃ': 'b',
  'ƃ': 'b',
  'Ć': 'c',
  'ć': 'c',
  'Ĉ': 'c',
  'ĉ': 'c',
  'Č': 'c',
  'č': 'c',
  'Ċ': 'c',
  'ċ': 'c',
  'Ç': 'c',
  'ç': 'c',
  'Ḉ': 'c',
  'ḉ': 'c',
  'Ȼ': 'c',
  'ȼ': 'c',
  'Ƈ': 'c',
  'ƈ': 'c',
  'ɕ': 'c',
  'Ď': 'd',
  'ď': 'd',
  'Ḋ': 'd',
  'ḋ': 'd',
  'Ḑ': 'd',
  'ḑ': 'd',
  'Ḍ': 'd',
  'ḍ': 'd',
  'Ḓ': 'd',
  'ḓ': 'd',
  'Ḏ': 'd',
  'ḏ': 'd',
  'Đ': 'd',
  'đ': 'd',
  'ᵭ': 'd',
  'Ɖ': 'd',
  'ɖ': 'd',
  'Ɗ': 'd',
  'ɗ': 'd',
  'Ƌ': 'd',
  'ƌ': 'd',
  'ȡ': 'd',
  'ð': 'd',
  'É': 'e',
  'Ə': 'e',
  'Ǝ': 'e',
  'ǝ': 'e',
  'é': 'e',
  'È': 'e',
  'è': 'e',
  'Ĕ': 'e',
  'ĕ': 'e',
  'Ê': 'e',
  'ê': 'e',
  'Ế': 'e',
  'ế': 'e',
  'Ề': 'e',
  'ề': 'e',
  'Ễ': 'e',
  'ễ': 'e',
  'Ể': 'e',
  'ể': 'e',
  'Ě': 'e',
  'ě': 'e',
  'Ë': 'e',
  'ë': 'e',
  'Ẽ': 'e',
  'ẽ': 'e',
  'Ė': 'e',
  'ė': 'e',
  'Ȩ': 'e',
  'ȩ': 'e',
  'Ḝ': 'e',
  'ḝ': 'e',
  'Ę': 'e',
  'ę': 'e',
  'Ē': 'e',
  'ē': 'e',
  'Ḗ': 'e',
  'ḗ': 'e',
  'Ḕ': 'e',
  'ḕ': 'e',
  'Ẻ': 'e',
  'ẻ': 'e',
  'Ȅ': 'e',
  'ȅ': 'e',
  'Ȇ': 'e',
  'ȇ': 'e',
  'Ẹ': 'e',
  'ẹ': 'e',
  'Ệ': 'e',
  'ệ': 'e',
  'Ḙ': 'e',
  'ḙ': 'e',
  'Ḛ': 'e',
  'ḛ': 'e',
  'Ɇ': 'e',
  'ɇ': 'e',
  'ɚ': 'e',
  'ɝ': 'e',
  'Ḟ': 'f',
  'ḟ': 'f',
  'ᵮ': 'f',
  'Ƒ': 'f',
  'ƒ': 'f',
  'Ǵ': 'g',
  'ǵ': 'g',
  'Ğ': 'g',
  'ğ': 'g',
  'Ĝ': 'g',
  'ĝ': 'g',
  'Ǧ': 'g',
  'ǧ': 'g',
  'Ġ': 'g',
  'ġ': 'g',
  'Ģ': 'g',
  'ģ': 'g',
  'Ḡ': 'g',
  'ḡ': 'g',
  'Ǥ': 'g',
  'ǥ': 'g',
  'Ɠ': 'g',
  'ɠ': 'g',
  'Ĥ': 'h',
  'ĥ': 'h',
  'Ȟ': 'h',
  'ȟ': 'h',
  'Ḧ': 'h',
  'ḧ': 'h',
  'Ḣ': 'h',
  'ḣ': 'h',
  'Ḩ': 'h',
  'ḩ': 'h',
  'Ḥ': 'h',
  'ḥ': 'h',
  'Ḫ': 'h',
  'ḫ': 'h',
  'H': 'h',
  '̱': 'h',
  'ẖ': 'h',
  'Ħ': 'h',
  'ħ': 'h',
  'Ⱨ': 'h',
  'ⱨ': 'h',
  'Í': 'i',
  'í': 'i',
  'Ì': 'i',
  'ì': 'i',
  'Ĭ': 'i',
  'ĭ': 'i',
  'Î': 'i',
  'î': 'i',
  'Ǐ': 'i',
  'ǐ': 'i',
  'Ï': 'i',
  'ï': 'i',
  'Ḯ': 'i',
  'ḯ': 'i',
  'Ĩ': 'i',
  'ĩ': 'i',
  'İ': 'i',
  'i': 'i',
  'Į': 'i',
  'į': 'i',
  'Ī': 'i',
  'ī': 'i',
  'Ỉ': 'i',
  'ỉ': 'i',
  'Ȉ': 'i',
  'ȉ': 'i',
  'Ȋ': 'i',
  'ȋ': 'i',
  'Ị': 'i',
  'ị': 'i',
  'Ḭ': 'i',
  'ḭ': 'i',
  'I': 'i',
  'ı': 'i',
  'Ɨ': 'i',
  'ɨ': 'i',
  'Ĵ': 'j',
  'ĵ': 'j',
  'J': 'j',
  '̌': 'j',
  'ǰ': 'j',
  'ȷ': 'j',
  'Ɉ': 'j',
  'ɉ': 'j',
  'ʝ': 'j',
  'ɟ': 'j',
  'ʄ': 'j',
  'Ḱ': 'k',
  'ḱ': 'k',
  'Ǩ': 'k',
  'ǩ': 'k',
  'Ķ': 'k',
  'ķ': 'k',
  'Ḳ': 'k',
  'ḳ': 'k',
  'Ḵ': 'k',
  'ḵ': 'k',
  'Ƙ': 'k',
  'ƙ': 'k',
  'Ⱪ': 'k',
  'ⱪ': 'k',
  'Ĺ': 'a',
  'ĺ': 'l',
  'Ľ': 'l',
  'ľ': 'l',
  'Ļ': 'l',
  'ļ': 'l',
  'Ḷ': 'l',
  'ḷ': 'l',
  'Ḹ': 'l',
  'ḹ': 'l',
  'Ḽ': 'l',
  'ḽ': 'l',
  'Ḻ': 'l',
  'ḻ': 'l',
  'Ł': 'l',
  'ł': 'l'
}, _defineProperty(_accent_map, "\u0141", 'l'), _defineProperty(_accent_map, '̣', 'l'), _defineProperty(_accent_map, "\u0142", 'l'), _defineProperty(_accent_map, "\u0323", 'l'), _defineProperty(_accent_map, 'Ŀ', 'l'), _defineProperty(_accent_map, 'ŀ', 'l'), _defineProperty(_accent_map, 'Ƚ', 'l'), _defineProperty(_accent_map, 'ƚ', 'l'), _defineProperty(_accent_map, 'Ⱡ', 'l'), _defineProperty(_accent_map, 'ⱡ', 'l'), _defineProperty(_accent_map, 'Ɫ', 'l'), _defineProperty(_accent_map, 'ɫ', 'l'), _defineProperty(_accent_map, 'ɬ', 'l'), _defineProperty(_accent_map, 'ɭ', 'l'), _defineProperty(_accent_map, 'ȴ', 'l'), _defineProperty(_accent_map, 'Ḿ', 'm'), _defineProperty(_accent_map, 'ḿ', 'm'), _defineProperty(_accent_map, 'Ṁ', 'm'), _defineProperty(_accent_map, 'ṁ', 'm'), _defineProperty(_accent_map, 'Ṃ', 'm'), _defineProperty(_accent_map, 'ṃ', 'm'), _defineProperty(_accent_map, 'ɱ', 'm'), _defineProperty(_accent_map, 'Ń', 'n'), _defineProperty(_accent_map, 'ń', 'n'), _defineProperty(_accent_map, 'Ǹ', 'n'), _defineProperty(_accent_map, 'ǹ', 'n'), _defineProperty(_accent_map, 'Ň', 'n'), _defineProperty(_accent_map, 'ň', 'n'), _defineProperty(_accent_map, 'Ñ', 'n'), _defineProperty(_accent_map, 'ñ', 'n'), _defineProperty(_accent_map, 'Ṅ', 'n'), _defineProperty(_accent_map, 'ṅ', 'n'), _defineProperty(_accent_map, 'Ņ', 'n'), _defineProperty(_accent_map, 'ņ', 'n'), _defineProperty(_accent_map, 'Ṇ', 'n'), _defineProperty(_accent_map, 'ṇ', 'n'), _defineProperty(_accent_map, 'Ṋ', 'n'), _defineProperty(_accent_map, 'ṋ', 'n'), _defineProperty(_accent_map, 'Ṉ', 'n'), _defineProperty(_accent_map, 'ṉ', 'n'), _defineProperty(_accent_map, 'Ɲ', 'n'), _defineProperty(_accent_map, 'ɲ', 'n'), _defineProperty(_accent_map, 'Ƞ', 'n'), _defineProperty(_accent_map, 'ƞ', 'n'), _defineProperty(_accent_map, 'ɳ', 'n'), _defineProperty(_accent_map, 'ȵ', 'n'), _defineProperty(_accent_map, 'N', 'n'), _defineProperty(_accent_map, '̈', 'n'), _defineProperty(_accent_map, 'n', 'n'), _defineProperty(_accent_map, "\u0308", 'n'), _defineProperty(_accent_map, 'Ó', 'o'), _defineProperty(_accent_map, 'ó', 'o'), _defineProperty(_accent_map, 'Ò', 'o'), _defineProperty(_accent_map, 'ò', 'o'), _defineProperty(_accent_map, 'Ŏ', 'o'), _defineProperty(_accent_map, 'ŏ', 'o'), _defineProperty(_accent_map, 'Ô', 'o'), _defineProperty(_accent_map, 'ô', 'o'), _defineProperty(_accent_map, 'Ố', 'o'), _defineProperty(_accent_map, 'ố', 'o'), _defineProperty(_accent_map, 'Ồ', 'o'), _defineProperty(_accent_map, 'ồ', 'o'), _defineProperty(_accent_map, 'Ỗ', 'o'), _defineProperty(_accent_map, 'ỗ', 'o'), _defineProperty(_accent_map, 'Ổ', 'o'), _defineProperty(_accent_map, 'ổ', 'o'), _defineProperty(_accent_map, 'Ǒ', 'o'), _defineProperty(_accent_map, 'ǒ', 'o'), _defineProperty(_accent_map, 'Ö', 'o'), _defineProperty(_accent_map, 'ö', 'o'), _defineProperty(_accent_map, 'Ȫ', 'o'), _defineProperty(_accent_map, 'ȫ', 'o'), _defineProperty(_accent_map, 'Ő', 'o'), _defineProperty(_accent_map, 'ő', 'o'), _defineProperty(_accent_map, 'Õ', 'o'), _defineProperty(_accent_map, 'õ', 'o'), _defineProperty(_accent_map, 'Ṍ', 'o'), _defineProperty(_accent_map, 'ṍ', 'o'), _defineProperty(_accent_map, 'Ṏ', 'o'), _defineProperty(_accent_map, 'ṏ', 'o'), _defineProperty(_accent_map, 'Ȭ', 'o'), _defineProperty(_accent_map, 'ȭ', 'o'), _defineProperty(_accent_map, 'Ȯ', 'o'), _defineProperty(_accent_map, 'ȯ', 'o'), _defineProperty(_accent_map, 'Ȱ', 'o'), _defineProperty(_accent_map, 'ȱ', 'o'), _defineProperty(_accent_map, 'Ø', 'o'), _defineProperty(_accent_map, 'ø', 'o'), _defineProperty(_accent_map, 'Ǿ', 'o'), _defineProperty(_accent_map, 'ǿ', 'o'), _defineProperty(_accent_map, 'Ǫ', 'o'), _defineProperty(_accent_map, 'ǫ', 'o'), _defineProperty(_accent_map, 'Ǭ', 'o'), _defineProperty(_accent_map, 'ǭ', 'o'), _defineProperty(_accent_map, 'Ō', 'o'), _defineProperty(_accent_map, 'ō', 'o'), _defineProperty(_accent_map, 'Ṓ', 'o'), _defineProperty(_accent_map, 'ṓ', 'o'), _defineProperty(_accent_map, 'Ṑ', 'o'), _defineProperty(_accent_map, 'ṑ', 'o'), _defineProperty(_accent_map, 'Ỏ', 'o'), _defineProperty(_accent_map, 'ỏ', 'o'), _defineProperty(_accent_map, 'Ȍ', 'o'), _defineProperty(_accent_map, 'ȍ', 'o'), _defineProperty(_accent_map, 'Ȏ', 'o'), _defineProperty(_accent_map, 'ȏ', 'o'), _defineProperty(_accent_map, 'Ơ', 'o'), _defineProperty(_accent_map, 'ơ', 'o'), _defineProperty(_accent_map, 'Ớ', 'o'), _defineProperty(_accent_map, 'ớ', 'o'), _defineProperty(_accent_map, 'Ờ', 'o'), _defineProperty(_accent_map, 'ờ', 'o'), _defineProperty(_accent_map, 'Ỡ', 'o'), _defineProperty(_accent_map, 'ỡ', 'o'), _defineProperty(_accent_map, 'Ở', 'o'), _defineProperty(_accent_map, 'ở', 'o'), _defineProperty(_accent_map, 'Ợ', 'o'), _defineProperty(_accent_map, 'ợ', 'o'), _defineProperty(_accent_map, 'Ọ', 'o'), _defineProperty(_accent_map, 'ọ', 'o'), _defineProperty(_accent_map, 'Ộ', 'o'), _defineProperty(_accent_map, 'ộ', 'o'), _defineProperty(_accent_map, 'Ɵ', 'o'), _defineProperty(_accent_map, 'ɵ', 'o'), _defineProperty(_accent_map, 'Ṕ', 'p'), _defineProperty(_accent_map, 'ṕ', 'p'), _defineProperty(_accent_map, 'Ṗ', 'p'), _defineProperty(_accent_map, 'ṗ', 'p'), _defineProperty(_accent_map, 'Ᵽ', 'p'), _defineProperty(_accent_map, 'Ƥ', 'p'), _defineProperty(_accent_map, 'ƥ', 'p'), _defineProperty(_accent_map, 'P', 'p'), _defineProperty(_accent_map, '̃', 'p'), _defineProperty(_accent_map, 'p', 'p'), _defineProperty(_accent_map, "\u0303", 'p'), _defineProperty(_accent_map, 'ʠ', 'q'), _defineProperty(_accent_map, 'Ɋ', 'q'), _defineProperty(_accent_map, 'ɋ', 'q'), _defineProperty(_accent_map, 'Ŕ', 'r'), _defineProperty(_accent_map, 'ŕ', 'r'), _defineProperty(_accent_map, 'Ř', 'r'), _defineProperty(_accent_map, 'ř', 'r'), _defineProperty(_accent_map, 'Ṙ', 'r'), _defineProperty(_accent_map, 'ṙ', 'r'), _defineProperty(_accent_map, 'Ŗ', 'r'), _defineProperty(_accent_map, 'ŗ', 'r'), _defineProperty(_accent_map, 'Ȑ', 'r'), _defineProperty(_accent_map, 'ȑ', 'r'), _defineProperty(_accent_map, 'Ȓ', 'r'), _defineProperty(_accent_map, 'ȓ', 'r'), _defineProperty(_accent_map, 'Ṛ', 'r'), _defineProperty(_accent_map, 'ṛ', 'r'), _defineProperty(_accent_map, 'Ṝ', 'r'), _defineProperty(_accent_map, 'ṝ', 'r'), _defineProperty(_accent_map, 'Ṟ', 'r'), _defineProperty(_accent_map, 'ṟ', 'r'), _defineProperty(_accent_map, 'Ɍ', 'r'), _defineProperty(_accent_map, 'ɍ', 'r'), _defineProperty(_accent_map, 'ᵲ', 'r'), _defineProperty(_accent_map, 'ɼ', 'r'), _defineProperty(_accent_map, 'Ɽ', 'r'), _defineProperty(_accent_map, 'ɽ', 'r'), _defineProperty(_accent_map, 'ɾ', 'r'), _defineProperty(_accent_map, 'ᵳ', 'r'), _defineProperty(_accent_map, 'ß', 's'), _defineProperty(_accent_map, 'Ś', 's'), _defineProperty(_accent_map, 'ś', 's'), _defineProperty(_accent_map, 'Ṥ', 's'), _defineProperty(_accent_map, 'ṥ', 's'), _defineProperty(_accent_map, 'Ŝ', 's'), _defineProperty(_accent_map, 'ŝ', 's'), _defineProperty(_accent_map, 'Š', 's'), _defineProperty(_accent_map, 'š', 's'), _defineProperty(_accent_map, 'Ṧ', 's'), _defineProperty(_accent_map, 'ṧ', 's'), _defineProperty(_accent_map, 'Ṡ', 's'), _defineProperty(_accent_map, 'ṡ', 's'), _defineProperty(_accent_map, 'ẛ', 's'), _defineProperty(_accent_map, 'Ş', 's'), _defineProperty(_accent_map, 'ş', 's'), _defineProperty(_accent_map, 'Ṣ', 's'), _defineProperty(_accent_map, 'ṣ', 's'), _defineProperty(_accent_map, 'Ṩ', 's'), _defineProperty(_accent_map, 'ṩ', 's'), _defineProperty(_accent_map, 'Ș', 's'), _defineProperty(_accent_map, 'ș', 's'), _defineProperty(_accent_map, 'ʂ', 's'), _defineProperty(_accent_map, 'S', 's'), _defineProperty(_accent_map, '̩', 's'), _defineProperty(_accent_map, 's', 's'), _defineProperty(_accent_map, "\u0329", 's'), _defineProperty(_accent_map, 'Þ', 't'), _defineProperty(_accent_map, 'þ', 't'), _defineProperty(_accent_map, 'Ť', 't'), _defineProperty(_accent_map, 'ť', 't'), _defineProperty(_accent_map, 'T', 't'), _defineProperty(_accent_map, "\u0308", 't'), _defineProperty(_accent_map, 'ẗ', 't'), _defineProperty(_accent_map, 'Ṫ', 't'), _defineProperty(_accent_map, 'ṫ', 't'), _defineProperty(_accent_map, 'Ţ', 't'), _defineProperty(_accent_map, 'ţ', 't'), _defineProperty(_accent_map, 'Ṭ', 't'), _defineProperty(_accent_map, 'ṭ', 't'), _defineProperty(_accent_map, 'Ț', 't'), _defineProperty(_accent_map, 'ț', 't'), _defineProperty(_accent_map, 'Ṱ', 't'), _defineProperty(_accent_map, 'ṱ', 't'), _defineProperty(_accent_map, 'Ṯ', 't'), _defineProperty(_accent_map, 'ṯ', 't'), _defineProperty(_accent_map, 'Ŧ', 't'), _defineProperty(_accent_map, 'ŧ', 't'), _defineProperty(_accent_map, 'Ⱦ', 't'), _defineProperty(_accent_map, 'ⱦ', 't'), _defineProperty(_accent_map, 'ᵵ', 't'), _defineProperty(_accent_map, 'ƫ', 't'), _defineProperty(_accent_map, 'Ƭ', 't'), _defineProperty(_accent_map, 'ƭ', 't'), _defineProperty(_accent_map, 'Ʈ', 't'), _defineProperty(_accent_map, 'ʈ', 't'), _defineProperty(_accent_map, 'ȶ', 't'), _defineProperty(_accent_map, 'Ú', 'u'), _defineProperty(_accent_map, 'ú', 'u'), _defineProperty(_accent_map, 'Ù', 'u'), _defineProperty(_accent_map, 'ù', 'u'), _defineProperty(_accent_map, 'Ŭ', 'u'), _defineProperty(_accent_map, 'ŭ', 'u'), _defineProperty(_accent_map, 'Û', 'u'), _defineProperty(_accent_map, 'û', 'u'), _defineProperty(_accent_map, 'Ǔ', 'u'), _defineProperty(_accent_map, 'ǔ', 'u'), _defineProperty(_accent_map, 'Ů', 'u'), _defineProperty(_accent_map, 'ů', 'u'), _defineProperty(_accent_map, 'Ü', 'u'), _defineProperty(_accent_map, 'ü', 'u'), _defineProperty(_accent_map, 'Ǘ', 'u'), _defineProperty(_accent_map, 'ǘ', 'u'), _defineProperty(_accent_map, 'Ǜ', 'u'), _defineProperty(_accent_map, 'ǜ', 'u'), _defineProperty(_accent_map, 'Ǚ', 'u'), _defineProperty(_accent_map, 'ǚ', 'u'), _defineProperty(_accent_map, 'Ǖ', 'u'), _defineProperty(_accent_map, 'ǖ', 'u'), _defineProperty(_accent_map, 'Ű', 'u'), _defineProperty(_accent_map, 'ű', 'u'), _defineProperty(_accent_map, 'Ũ', 'u'), _defineProperty(_accent_map, 'ũ', 'u'), _defineProperty(_accent_map, 'Ṹ', 'u'), _defineProperty(_accent_map, 'ṹ', 'u'), _defineProperty(_accent_map, 'Ų', 'u'), _defineProperty(_accent_map, 'ų', 'u'), _defineProperty(_accent_map, 'Ū', 'u'), _defineProperty(_accent_map, 'ū', 'u'), _defineProperty(_accent_map, 'Ṻ', 'u'), _defineProperty(_accent_map, 'ṻ', 'u'), _defineProperty(_accent_map, 'Ủ', 'u'), _defineProperty(_accent_map, 'ủ', 'u'), _defineProperty(_accent_map, 'Ȕ', 'u'), _defineProperty(_accent_map, 'ȕ', 'u'), _defineProperty(_accent_map, 'Ȗ', 'u'), _defineProperty(_accent_map, 'ȗ', 'u'), _defineProperty(_accent_map, 'Ư', 'u'), _defineProperty(_accent_map, 'ư', 'u'), _defineProperty(_accent_map, 'Ứ', 'u'), _defineProperty(_accent_map, 'ứ', 'u'), _defineProperty(_accent_map, 'Ừ', 'u'), _defineProperty(_accent_map, 'ừ', 'u'), _defineProperty(_accent_map, 'Ữ', 'u'), _defineProperty(_accent_map, 'ữ', 'u'), _defineProperty(_accent_map, 'Ử', 'u'), _defineProperty(_accent_map, 'ử', 'u'), _defineProperty(_accent_map, 'Ự', 'u'), _defineProperty(_accent_map, 'ự', 'u'), _defineProperty(_accent_map, 'Ụ', 'u'), _defineProperty(_accent_map, 'ụ', 'u'), _defineProperty(_accent_map, 'Ṳ', 'u'), _defineProperty(_accent_map, 'ṳ', 'u'), _defineProperty(_accent_map, 'Ṷ', 'u'), _defineProperty(_accent_map, 'ṷ', 'u'), _defineProperty(_accent_map, 'Ṵ', 'u'), _defineProperty(_accent_map, 'ṵ', 'u'), _defineProperty(_accent_map, 'Ʉ', 'u'), _defineProperty(_accent_map, 'ʉ', 'u'), _defineProperty(_accent_map, 'Ṽ', 'v'), _defineProperty(_accent_map, 'ṽ', 'v'), _defineProperty(_accent_map, 'Ṿ', 'v'), _defineProperty(_accent_map, 'ṿ', 'v'), _defineProperty(_accent_map, 'Ʋ', 'v'), _defineProperty(_accent_map, 'ʋ', 'v'), _defineProperty(_accent_map, 'Ẃ', 'w'), _defineProperty(_accent_map, 'ẃ', 'w'), _defineProperty(_accent_map, 'Ẁ', 'w'), _defineProperty(_accent_map, 'ẁ', 'w'), _defineProperty(_accent_map, 'Ŵ', 'w'), _defineProperty(_accent_map, 'ŵ', 'w'), _defineProperty(_accent_map, 'W', 'w'), _defineProperty(_accent_map, '̊', 'w'), _defineProperty(_accent_map, 'ẘ', 'w'), _defineProperty(_accent_map, 'Ẅ', 'w'), _defineProperty(_accent_map, 'ẅ', 'w'), _defineProperty(_accent_map, 'Ẇ', 'w'), _defineProperty(_accent_map, 'ẇ', 'w'), _defineProperty(_accent_map, 'Ẉ', 'w'), _defineProperty(_accent_map, 'ẉ', 'w'), _defineProperty(_accent_map, 'Ẍ', 'x'), _defineProperty(_accent_map, 'ẍ', 'x'), _defineProperty(_accent_map, 'Ẋ', 'x'), _defineProperty(_accent_map, 'ẋ', 'x'), _defineProperty(_accent_map, 'Ý', 'y'), _defineProperty(_accent_map, 'ý', 'y'), _defineProperty(_accent_map, 'Ỳ', 'y'), _defineProperty(_accent_map, 'ỳ', 'y'), _defineProperty(_accent_map, 'Ŷ', 'y'), _defineProperty(_accent_map, 'ŷ', 'y'), _defineProperty(_accent_map, 'Y', 'y'), _defineProperty(_accent_map, "\u030A", 'y'), _defineProperty(_accent_map, 'ẙ', 'y'), _defineProperty(_accent_map, 'Ÿ', 'y'), _defineProperty(_accent_map, 'ÿ', 'y'), _defineProperty(_accent_map, 'Ỹ', 'y'), _defineProperty(_accent_map, 'ỹ', 'y'), _defineProperty(_accent_map, 'Ẏ', 'y'), _defineProperty(_accent_map, 'ẏ', 'y'), _defineProperty(_accent_map, 'Ȳ', 'y'), _defineProperty(_accent_map, 'ȳ', 'y'), _defineProperty(_accent_map, 'Ỷ', 'y'), _defineProperty(_accent_map, 'ỷ', 'y'), _defineProperty(_accent_map, 'Ỵ', 'y'), _defineProperty(_accent_map, 'ỵ', 'y'), _defineProperty(_accent_map, 'ʏ', 'y'), _defineProperty(_accent_map, 'Ɏ', 'y'), _defineProperty(_accent_map, 'ɏ', 'y'), _defineProperty(_accent_map, 'Ƴ', 'y'), _defineProperty(_accent_map, 'ƴ', 'y'), _defineProperty(_accent_map, 'Ź', 'z'), _defineProperty(_accent_map, 'ź', 'z'), _defineProperty(_accent_map, 'Ẑ', 'z'), _defineProperty(_accent_map, 'ẑ', 'z'), _defineProperty(_accent_map, 'Ž', 'z'), _defineProperty(_accent_map, 'ž', 'z'), _defineProperty(_accent_map, 'Ż', 'z'), _defineProperty(_accent_map, 'ż', 'z'), _defineProperty(_accent_map, 'Ẓ', 'z'), _defineProperty(_accent_map, 'ẓ', 'z'), _defineProperty(_accent_map, 'Ẕ', 'z'), _defineProperty(_accent_map, 'ẕ', 'z'), _defineProperty(_accent_map, 'Ƶ', 'z'), _defineProperty(_accent_map, 'ƶ', 'z'), _defineProperty(_accent_map, 'Ȥ', 'z'), _defineProperty(_accent_map, 'ȥ', 'z'), _defineProperty(_accent_map, 'ʐ', 'z'), _defineProperty(_accent_map, 'ʑ', 'z'), _defineProperty(_accent_map, 'Ⱬ', 'z'), _defineProperty(_accent_map, 'ⱬ', 'z'), _defineProperty(_accent_map, 'Ǯ', 'z'), _defineProperty(_accent_map, 'ǯ', 'z'), _defineProperty(_accent_map, 'ƺ', 'z'), _accent_map);

function accent_fold(s) {
  if (!s) {
    return '';
  }

  var ret = '';

  for (var i = 0; i < s.length; i++) {
    ret += accent_map[s.charAt(i)] || s.charAt(i);
  }

  return ret;
}

;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var enquire_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(enquire_js__WEBPACK_IMPORTED_MODULE_0__);

/* Tab state */

var tabState = window.sessionStorage.tabState; // console.log( 'tabstate== ', tabState );
// Only execute if tabs exist

if (document.querySelectorAll('#search-tab-js').length > 0) {
  var defaultActive = $('.p-search__tabs .active a').data('tab');
  var tabs = $('.p-search__tab a'); // console.log( defaultActive );

  var $resultSections = $('.search-results'); // console.log( $resultSections );

  /* Sets default vault based on default active tab */

  $resultSections.each(function (index, section) {
    // element == this
    var $section = $(section);
    var sectionData = $section.data('content'); // console.log( $section.data('content' ));
    // eslint-disable-next-line eqeqeq

    if (sectionData == defaultActive) {
      // console.log( 'match ' + sectionData, defaultActive );
      $section.addClass('search-active');
    } else {
      $section.addClass('search-inactive');
    }
  });
  /* Tab click */

  tabs.each(function (_index, tab) {
    // element == this
    var $tab = $(tab);
    $tab.on('click', function () {
      // console.log( $tab );
      if (!$tab.parent().hasClass('active')) {
        // not active tab add class and remove from current
        tabs.parents().removeClass('active');
        $tab.parent().addClass('active'); // set matching content to show
        // console.log( $tab.data( 'tab' ));
        // Match tab with content

        var tabContent = $tab.data('tab');
        var $resultsContainer = $(".search-results[data-content=\"".concat(tabContent, "\"]")); // console.log( $resultsContainer );
        // Toggle active state

        $resultSections.removeClass('search-active').addClass('search-inactive');
        $resultsContainer.toggleClass('search-active').toggleClass('search-inactive');
        /* Set active tab state */

        tabState = $tab.data('tab');
        window.sessionStorage.setItem('tabState', tabState); // console.log( tabState );
        // console.log( 'sessionStorage state == ', window.sessionStorage.tabState );
      } else {// is active tab
        }
    });
  });
  /* Get secondary tab data values hide if not relevant results -- fixes pgination issue in squiz */

  $('.tab-secondary').each(function (_indexInArray, sectab) {
    var $sectab = $(sectab);
    var fullyMatching = parseInt($sectab.data('matching'), 10);
    var currStart = $sectab.data('currstart'); //disable click if not results

    if (fullyMatching === 0) {
      $sectab.find('a').off('click');
      $sectab.addClass('disabled-tab');
    }
  }); //ie11 urlsearchparam polyfill

  (function (w) {
    w.URLSearchParams = w.URLSearchParams || function (searchString) {
      var self = this;
      self.searchString = searchString;

      self.get = function (name) {
        var results = new RegExp('[?&]' + name + '=([^&#]*)').exec(self.searchString);

        if (results == null) {
          return null;
        } else {
          return decodeURI(results[1]) || 0;
        }
      };
    };
  })(window); // Set tab from query param


  var queryParam = new URLSearchParams(document.location.search).get("tab"); // console.log("query param", queryParam);

  switch (queryParam) {
    case 'web':
      window.sessionStorage.setItem('tabState', 'vuw-web');
      tabState = window.sessionStorage.tabState;
      break;

    case 'courses':
      window.sessionStorage.setItem('tabState', 'wgtn_courses');
      tabState = window.sessionStorage.tabState;
      break;

    case 'subjects':
      window.sessionStorage.setItem('tabState', 'wgtn-meta-study-areas');
      tabState = window.sessionStorage.tabState;
      break;

    case 'people':
      window.sessionStorage.setItem('tabState', 'vic-push-staff-prod');
      tabState = window.sessionStorage.tabState;
      break;

    case 'intranet':
      window.sessionStorage.setItem('tabState', 'intranet');
      tabState = window.sessionStorage.tabState;
      break;

    case 'qualifications':
      window.sessionStorage.setItem('tabState', 'wgtn-meta-qualifications');
      tabState = window.sessionStorage.tabState;
      break;

    default:
      break;
  } // change state based on session storage tab state


  if (window.sessionStorage.tabState && queryParam) {
    // console.log('tabstate exists in local storage');
    // get tabs
    tabs.each(function (index, tab) {
      var $tab = $(tab);
      var tabData = $(tab).data('tab'); // match against sessionStorage

      if (tabData === tabState) {
        // console.log( 'tab should be set to --- ', tabState );
        // set content state
        $(".p-search__tab a[data-tab=\"".concat(tabState, "\"]")).trigger('click');
      } else {// console.warn('No tab found');
      }
    });
  }
  /* Filter toggle on mobile */


  var TABLET_AND_SMALLER = 'screen and (max-width: 975px)';
  var isTabletAndBelow = false;
  enquire_js__WEBPACK_IMPORTED_MODULE_0___default.a.register(TABLET_AND_SMALLER, function () {
    isTabletAndBelow = true;
  }); // console.log( isTabletAndBelow );

  if (isTabletAndBelow) {
    $('.filter-results-title').on('click', function (e) {
      var $this = $(e); // console.log( $this );
      // Change caret

      $('.filter-results-title span').toggleClass('icon-caret-down').toggleClass('icon-caret-right'); // show filters

      $('.p-search-filter-group').toggle('medium', function () {});
    });
  } //hide long tabs


  $(".search-facets .toggle").each(function (i, el) {
    var $el = $(el);
    var $totalTags = $(el).next().children().length; // console.log( ` ${$el.text()} ${ $totalTags }` );
    //sets filter state from filter totals

    if ($totalTags === 0) {
      $el.hide();
    } else if ($totalTags >= 6) {
      $el.append('<span class="icon-caret-right"></span>');
      $el.next().toggle();
    } else if ($totalTags < 6) {
      $el.append('<span class="icon-caret-down"></span>');
    }

    $(el).on('click', function () {
      $(el).next().toggle(); //toggle caret

      $(el).find('span').toggleClass(function () {
        return $(el).find('span').is('.icon-caret-right') ? 'icon-caret-down icon-caret-right' : 'icon-caret-right icon-caret-down';
      });
    });
  });
}

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "jQuery"
var external_jQuery_ = __webpack_require__(0);
var external_jQuery_default = /*#__PURE__*/__webpack_require__.n(external_jQuery_);

// EXTERNAL MODULE: ./node_modules/headroom.js/dist/headroom.js
var dist_headroom = __webpack_require__(6);
var headroom_default = /*#__PURE__*/__webpack_require__.n(dist_headroom);

// EXTERNAL MODULE: ./node_modules/enquire.js/src/index.js
var src = __webpack_require__(1);
var src_default = /*#__PURE__*/__webpack_require__.n(src);

// EXTERNAL MODULE: ./node_modules/select2/dist/js/select2.js
var select2 = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/lity/dist/lity.js
var lity = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/picturefill/dist/picturefill.js
var picturefill = __webpack_require__(13);

// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/tracking.js
/**
 * Toolkit's standalone JS module for website tracking.
 *
 * @requires $ {jQuery}
 */
 // Members

var GTM_TRACK_ATTRIBUTE = 'data-gtm-track';
var GTM_ID_ATTRIBUTE = 'data-gtm-id';
var GTM_DATA_ATTRIBUTE = 'data-gtm-vars';
var defaultConfig = {
  autoRegister: true
};
/** Start tracking automatically. */

var shouldAutoRegister = true; // Public methods

function pushTrackingInfoToGtm(trackingId, trackingSource, customDataExtension) {
  if (!window.dataLayer) {
    console.warn('`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script. The tracking might not work correctly!');
    window.dataLayer = []; // Init empty as fall-back to avoid hard errors

    return;
  }

  var event,
      customDataObject = {};

  if (trackingSource && !(typeof trackingSource.altKey === 'undefined')) {
    // is Event (see https://developer.mozilla.org/en-US/docs/Web/API/Event)
    event = trackingSource;
  } else {
    // is Object with custom properties OR null/undefined
    customDataObject = trackingSource || {};
  } // Event supplied -> Extract data automatically based on the type of event


  if (event) {
    // Custom data pre-sets based on event type (https://developer.mozilla.org/en-US/docs/Web/API/Event/type)
    switch (event.type) {
      case 'click':
        customDataObject = {
          selector: event.target,
          href: event.currentTarget.href,
          text: event.currentTarget.text
        };
        break;

      default:
        {
          console.warn("GTM: There is no tracking preset for the event type '".concat(event.type, "'. Please, track a different event or pass an Object with custom data that should be sent to Google Tag Manager."));
        }
    }

    customDataObject.eventType = event.type;
  } // Extend (and override) with the custom data object (if supplied)


  if (customDataExtension) {
    for (var property in customDataExtension) {
      if (customDataExtension.hasOwnProperty(property)) {
        customDataObject[property] = customDataExtension[property];
      }
    }
  }

  var dataLayerObject = {
    event: trackingId
  };
  if (customDataObject) dataLayerObject.custom = customDataObject; // Push to the GTM

  window.dataLayer.push(dataLayerObject);
}

function addGtmTrackingListeners(elementsList, eventType, trackingId) {
  if (!window.dataLayer) {
    console.warn('`dataLayer` variable is unavailable. Please, check that your Google Tag Manager script is loading before any other script.');
    window.dataLayer = []; // Fallback

    return;
  }

  elementsList.each(function attachTrackingHandlers() {
    var elementToTrack = external_jQuery_default()(this),
        trackingEventType = eventType || elementToTrack.attr(GTM_TRACK_ATTRIBUTE) || 'auto',
        id = trackingId || elementToTrack.attr(GTM_ID_ATTRIBUTE) || elementToTrack[0].id,
        customDataJsonString = elementToTrack.attr(GTM_DATA_ATTRIBUTE);
    var customDataObject; // Convert the custom variables string into JSON

    if (customDataJsonString) {
      try {
        customDataObject = JSON.parse(customDataJsonString);
      } catch (err) {
        console.error("The element with tracking ID ".concat(id, " and its element '").concat(customDataJsonString, "' contains JSON string in invalid format. These information will not be pushed into Google Tag Manager..."), customDataJsonString, err);
      }
    }

    if (trackingEventType === 'auto') {// TODO: Determine binding event automatically based on the type of
      // the element (e.g. <a> => 'click' etc.)
    } else {
      elementToTrack.on(trackingEventType, function (event) {
        pushTrackingInfoToGtm(id, event, customDataObject);
      });
    }
  });
}

function shouldTrackByGtm(element) {
  element = external_jQuery_default()(element);
  return Boolean(element.attr(GTM_TRACK_ATTRIBUTE) !== undefined);
} // Private functions


function autoregisterGtmTrackingListeners() {
  addGtmTrackingListeners(external_jQuery_default()("[".concat(GTM_TRACK_ATTRIBUTE, "]")));
} // Run after the DOM has loaded...


external_jQuery_default()(function () {
  if (shouldAutoRegister) {
    /** Auto-register all on-demand elements to automatically start tracking. */
    setTimeout(autoregisterGtmTrackingListeners, 0);
  }
}); // Public API interface

var trackingApi = {
  shouldTrackElement: shouldTrackByGtm,
  trackEvent: pushTrackingInfoToGtm,

  /** Any element or set of elements can be dynamically tracked this way */
  registerForTracking: addGtmTrackingListeners
};

function overrideOptions() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultConfig,
      autoRegister = _ref.autoRegister;

  shouldAutoRegister = autoRegister;
}

var trackerConfig = overrideOptions;
var tracker = trackingApi; // Make API available for modules

/* harmony default export */ var tracking = (trackingApi); // For a global imports

window.toolkitTracker = function (opts) {
  overrideOptions(opts);
  return trackingApi;
};
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/popups.js
var popups_this = undefined;

/**
 * Toolkit's standalone JS module for popup-based interactions.
 *
 * @requires Cookie {cookies-js}
 */
// Dynamic 3rd party dependencies
var cookie;
var popups_tracker = window.toolkitTracker ? window.toolkitTracker() : null;
var CLASSNAME = {
  POPUP_AUTOINIT: 'popup',
  BUTTON_OK: 'button-ok',
  BUTTON_CANCEL: 'button-cancel',
  BUTTON_CLOSE: 'btn-close'
};

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {
    ;
  }

  return el;
}
/** Popup launcher. */


function initPopupBox(popupElement) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$delayInMs = _ref.delayInMs,
      delayInMs = _ref$delayInMs === void 0 ? 8000 : _ref$delayInMs,
      _ref$suppressAfterCan = _ref.suppressAfterCanceling,
      suppressAfterCanceling = _ref$suppressAfterCan === void 0 ? true : _ref$suppressAfterCan;

  var COOKIE_ID = popupElement.id || 'popup-default';
  var COOKIE_SETTINGS = {
    expires: 2419200 // 28 days
    // secure  : true    //If set to true the secure attribute of the cookie

  };
  var popupContainerElement = findAncestor(popupElement, 'popup-positioner');
  var buttonOkElements = popupElement.getElementsByClassName(CLASSNAME.BUTTON_OK),
      buttonCancelElement = popupElement.getElementsByClassName(CLASSNAME.BUTTON_CANCEL),
      buttonCloseElement = popupElement.getElementsByClassName(CLASSNAME.BUTTON_CLOSE)[0],
      IS_SHOWN_CLASS = 'shown'; // console.log('popup show');

  function removeShownClass() {
    if (popupContainerElement) {
      popupContainerElement.classList.remove(IS_SHOWN_CLASS);
    } else {
      popupElement.classList.remove(IS_SHOWN_CLASS);
    }
  }

  function closePopupPermanently() {
    if (cookie) cookie.set(COOKIE_ID, true, COOKIE_SETTINGS);
  }

  function closePopup() {
    unbindButtonEvents();
    popupElement.setAttribute('data-shown', false);
    removeShownClass();
    if (suppressAfterCanceling) closePopupPermanently();
  }

  function close(event) {
    // If `positionerClass` exists, hide + save 'hidden' to cookies
    event.preventDefault();
    event.stopPropagation();
    closePopup();
  }

  function submit() {
    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
    closePopup();
  }

  function cancel() {
    // If `positionerClass` exists, hide + save 'hidden' to cookies + continue to the page
    closePopup();
  } // Attach button events


  function bindButtonEvents() {
    for (var i = 0; i < buttonOkElements.length; i++) {
      buttonOkElements[i].addEventListener('click', submit);
    }

    if (buttonCloseElement) buttonCloseElement.addEventListener('click', close);

    if (buttonCancelElement) {
      for (var _i = 0; _i < buttonCancelElement.length; _i++) {
        buttonCancelElement[_i].addEventListener('click', cancel);
      }
    }
  }

  function unbindButtonEvents() {
    for (var i = 0; i < buttonOkElements.length; i++) {
      buttonOkElements[i].removeEventListener('click', submit);
    }

    if (buttonCloseElement) buttonCloseElement.removeEventListener('click', close);

    if (buttonCancelElement) {
      for (var _i2 = 0; _i2 < buttonCancelElement.length; _i2++) {
        buttonCancelElement[_i2].removeEventListener('click', cancel);
      }
    }
  }

  function addShownClass() {
    if (popupContainerElement) {
      document.getElementsByTagName('body')[0].appendChild(popupContainerElement);
      popupContainerElement.classList.add(IS_SHOWN_CLASS);
    } else {
      popupElement.classList.add(IS_SHOWN_CLASS);
    }
  }

  function isPopupShown() {
    return popupElement.getAttribute('data-shown') === 'true';
  }

  function showPopup() {
    bindButtonEvents();
    addShownClass();

    if (popups_tracker && popups_tracker.shouldTrackElement(popupElement)) {
      popups_tracker.trackEvent(popupElement.id, {
        eventType: 'open'
      });
    }
  } // Constructor


  var shouldShowPopup = !cookie || !suppressAfterCanceling || cookie.get(COOKIE_ID) === undefined || !cookie.get(COOKIE_ID);

  if (shouldShowPopup && !isPopupShown()) {
    popupElement.setAttribute('data-shown', true); // Must be added here to prevent triggering setTimeout when clicking multiple time
    // If there's a positioner available, display after the timeout!

    setTimeout(function () {
      showPopup();
    }, delayInMs);
  }
}
/**
 * Function called on the jQuery Element, opens it as a popup.
 *
 * @param {Object} { delayInMs = 0, suppressAfterCanceling = false }
 *
 * @returns {DOMElement}
 */


function openPopupInstantly(popupElement) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref2$delayInMs = _ref2.delayInMs,
      delayInMs = _ref2$delayInMs === void 0 ? 0 : _ref2$delayInMs,
      _ref2$suppressAfterCa = _ref2.suppressAfterCanceling,
      suppressAfterCanceling = _ref2$suppressAfterCa === void 0 ? false : _ref2$suppressAfterCa;

  initPopupBox(popupElement, {
    delayInMs: delayInMs,
    suppressAfterCanceling: suppressAfterCanceling
  });
}

function autoInitialisePopups() {
  var autoloadPopups = document.getElementsByClassName(CLASSNAME.POPUP_AUTOINIT);

  for (var i = 0; i < autoloadPopups.length; i += 1) {
    var popupElement = autoloadPopups[i];

    if (popupElement.getAttribute('data-autoload') !== null) {
      // Autoload (~ show/hide) popup
      var optionsObject = {};

      if (popupElement.getAttribute('data-opts') !== null) {
        optionsObject = JSON.parse(popupElement.getAttribute('data-opts'));
      }

      initPopupBox(popupElement, optionsObject);
    }
  }
} // Public API interface


var popupsApi = {
  init: initPopupBox,
  initAndOpen: openPopupInstantly
}; // Initialiser

function popups_init() {
  if (!cookie) {
    console.error('`Cookie-js` library is not available. Please, import the library for the correct functionality!');
  }

  if (!popups_tracker) {
    console.warn('`Toolkit.tracking` library is not available, so the user actions related to popups will not be sent to the Google Tag Manager. Please, make sure the library is included to enable the tracking.');
  } // Run when the DOM is ready!


  if (document.readyState === 'complete') {
    autoInitialisePopups();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        // Find all existing popups and if they contain `data-autoload` attribute,
        autoInitialisePopups();
      }
    };
  }
}

if (!window.toolkitPopups) {
  // Not initialised yet
  // TODO: Move into encapsulated library module
  try {
    cookie = __webpack_require__(14);
    popups_init();
  } catch (err) {
    // Fallback when the cookies-js is not included - Load from the CDN
    var isScriptLoaded = false;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = '//cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js';

    s.onreadystatechange = function () {
      // After-load handler for IE
      if (isScriptLoaded) return;

      if (popups_this.readyState === 'complete' || popups_this.readyState === 'loaded') {
        cookie = window.Cookies;
        popups_init();
        isScriptLoaded = true;
      }
    };

    s.onload = function () {
      // After-load handler for all the other browsers
      if (isScriptLoaded) return;
      cookie = window.Cookies;
      popups_init();
      isScriptLoaded = true;
    };

    document.getElementsByTagName('head')[0].appendChild(s);
  } // For a global use


  window.toolkitPopups = popupsApi;
} // Make API available for modules


/* harmony default export */ var popups = (popupsApi);
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/utils/helpers.js
/**
 * Utility library with helper functions.
 *
 * It **SHOULD NOT** be used as a standalone library, but only
 * imported as a dependency.
 *
 * Add **ONLY** function that are generic enough to be reused
 * by almost any module.
 */

/**
 * Checks HTTP response status and if permitted (200-299), passes the response.
 * Otherwise, an exception is thrown.
 *
 * @param {Response} response
 * @throws {Error}
 */
function checkHttpStatus(response) {
  if (response.status >= 300 || response.status < 200) {
    var error = new Error("Incorrect response HTTP status #".concat(response.status, " (").concat(response.statusText, ") received."));
    error.response = response;
    throw error;
  }

  return response;
}
/**
 * Checks whether an element is `display: none;` or not.
 *
 * @param {Element} element - DOM Element.
 *
 * @return {boolean}
 */

function isElementHidden(element) {
  return element.offsetParent === null; // *ONLY* happens when the element is not fixed
}
/**
 * Tests whether a property/attribute exists on a given {Object}. This is a
 * safe implementation of `Object.hasOwnProperty()`
 *
 * @param {Object} obj - Object to test the existence of the attribute on.
 * @param {String} propName - Name of the attribute to test.
 */

function hasProp(obj, propName) {
  return Object.prototype.hasOwnProperty.call(obj, propName);
}
/**
 * Remove attribute from a DOM Element in a browser-compatible manner.
 *
 * @param {Element} domElement
 * @param {string} attributeName
 */

function removeAttribute(domElement, attributeName) {
  domElement.setAttribute(attributeName, false); // Hack for IE11 / MS Edge

  domElement.removeAttribute(attributeName); // All other normal browsers
}
/**
 * Detects if the device is likely to be from Apple.
 * Should only be used for fixing or hacking critical issues.
 *
 * @param {String} customUserAgent -
 *  Allows to specify the HTTP Header's `User-Agent` string.
 *
 * @return {boolean}
 */

function isAppleMobileDevice(customUserAgent) {
  var userAgent = customUserAgent || (typeof window.navigator !== 'undefined' ? window.navigator.userAgent : '');
  return /iPhone|iPod|iPad/i.test(userAgent) && !/Windows Phone/i.test(userAgent);
}
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/tooltips.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/** Library-specific polyfills (not shared anywhere else) */

if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // API interface


var tooltipsApi = window.toolkitTooltips || {};
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

(function ToolkitTooltip() {
  if (window.toolkitTooltips) {
    // Available already - do not initialise again!
    return;
  }

  window.toolkitTooltips = tooltipsApi; // Import for a global access

  /** @constant */

  var VALUE_ID = 'toolkit-tooltip',
      ATTRIBUTE_NAME_TOOLTIP = 'data-tooltip',
      ATTRIBUTE_NAME_CONTENT = 'title',
      SIZES = {
    SCREEN_PADDING: 20,
    MAX_WIDTH: 400,
    CARET_SIZE: 20
  },
      TRIGGER_TYPE = {
    HOVER: 'hover',
    CLICK: 'click'
  };
  /** PRIVATE MEMBERS */

  var globalTooltipElement, lastInteractedSourceElement, outsideClickListenerFn;
  /** List of active tooltips */

  var tooltipsList = [];
  /** PRIVATE FUNCTIONS */

  function appendTooltipElement() {
    var tooltipElement = document.createElement('div');
    tooltipElement.setAttribute('id', VALUE_ID);
    tooltipElement.setAttribute('class', 'tooltip');
    tooltipElement.setAttribute('role', 'tooltip');
    tooltipElement.setAttribute('hidden', '');
    document.body.appendChild(tooltipElement);
    globalTooltipElement = tooltipElement;
  }

  function removeTooltipElement() {
    globalTooltipElement = undefined;
    document.body.removeChild(globalTooltipElement);
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


  var Tooltip =
  /*#__PURE__*/
  function () {
    /**
     * @param {Element} sourceElement -
     *  DOM Element that will toggle the tooltip.
     * @param {{content:string, attributeNameContent:string,trigger:string}} -
     *   Optional custom settings.
     *
     * @memberof Tooltip
     */
    function Tooltip(sourceElement) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          content = _ref.content,
          _ref$attributeNameCon = _ref.attributeNameContent,
          attributeNameContent = _ref$attributeNameCon === void 0 ? ATTRIBUTE_NAME_CONTENT : _ref$attributeNameCon,
          _ref$trigger = _ref.trigger,
          trigger = _ref$trigger === void 0 ? TRIGGER_TYPE.HOVER : _ref$trigger;

      _classCallCheck(this, Tooltip);

      this.sourceElement = sourceElement;
      this.content = content || sourceElement.getAttribute(attributeNameContent);
      this.triggerType = trigger;

      if (this.content) {
        this.init();
      } else {
        console.warn('There is no available content to show in the tooltip for element. The tooltip will not be created. ', this.sourceElement, this.content);
      }

      this.bindEvents();
      this.enhanceAccessibility();
    }
    /** PUBLIC METHODS */

    /** Removes the tooltip and cleans up. */


    _createClass(Tooltip, [{
      key: "destroy",
      value: function destroy() {
        // Remove this instance from the list of tooltips
        var tooltipIndex = tooltipsList.indexOf(this);

        if (tooltipIndex > -1) {
          tooltipsList.splice(tooltipIndex, 1); // TODO: + Unbind all events
        }

        if (tooltipsList.length === 0) removeTooltipElement();
      }
    }, {
      key: "showTooltip",
      value: function showTooltip($event) {
        // Mobile Safari *ONLY* quirk: https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile
        if (isAppleMobileDevice()) document.body.style.cursor = 'pointer';
        removeAttribute(this.sourceElement, 'title'); // Remove title attribute to prevent default system behavior

        this.sourceElement.setAttribute('aria-describedby', VALUE_ID); // Accessibility

        removeAttribute(globalTooltipElement, 'hidden'); // Accessibility

        globalTooltipElement.style.opacity = 0; // FIXME: SHOULD support HTML-based content too!

        globalTooltipElement.textContent = this.content;
        globalTooltipElement.style.display = 'block';
        this.positionTooltip();
        return $event;
      }
    }, {
      key: "hideTooltip",
      value: function hideTooltip($event) {
        globalTooltipElement.style.opacity = 0; // TODO: Animate disappearance

        this.sourceElement.setAttribute(ATTRIBUTE_NAME_CONTENT, this.content);
        removeAttribute(this.sourceElement, 'aria-describedby');
        globalTooltipElement.setAttribute('hidden', ''); // Accessibility
        // Mobile Safari *ONLY* quirk: https://developer.mozilla.org/en-US/docs/Web/Events/click#Safari_Mobile

        if (isAppleMobileDevice()) document.body.style.cursor = null;
        globalTooltipElement.style.display = 'none';
        return $event;
      }
    }, {
      key: "toggleTooltip",
      value: function toggleTooltip($event) {
        var _this = this;

        if (isElementHidden(globalTooltipElement)) {
          if (outsideClickListenerFn) window.removeEventListener('click', outsideClickListenerFn);
          outsideClickListenerFn = this.handleClickOutsideTooltip.bind(this);
          window.addEventListener('click', outsideClickListenerFn);
          this.showTooltip($event);
        } else {
          window.removeEventListener('click', outsideClickListenerFn);
          this.hideTooltip($event);

          if (lastInteractedSourceElement !== this.sourceElement) {
            setTimeout(function () {
              // `setTimeout()` forces the tooltip to re-open (by pushing it into )
              _this.toggleTooltip($event);
            });
          }
        }

        lastInteractedSourceElement = this.sourceElement;
      }
      /** PRIVATE FUNCTIONS */

      /** Builds tooltip, attaches events and adds generic DOM. */

    }, {
      key: "init",
      value: function init() {
        tooltipsList.push(this); // First initiated tooltip -> add the global tooltip element

        if (tooltipsList.length === 1) appendTooltipElement();
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        if (this.triggerType === TRIGGER_TYPE.CLICK) {
          this.sourceElement.addEventListener('click', this.toggleTooltip.bind(this));
        } else if (this.triggerType === TRIGGER_TYPE.HOVER) {
          this.bindMouseHovering();
          this.bindAccessibilityFeatures();
        } else {
          console.error('Unsupported type of trigger `%s`. The tooltip will not be shown for your element', this.triggerType, this.sourceElement);
        }
      }
    }, {
      key: "bindAccessibilityFeatures",
      value: function bindAccessibilityFeatures() {
        this.sourceElement.addEventListener('focus', this.showTooltip.bind(this));
        this.sourceElement.addEventListener('focusout', this.hideTooltip.bind(this));
        this.sourceElement.addEventListener('keydown', this.hideTooltipOnEscKey.bind(this));
      }
    }, {
      key: "bindMouseHovering",
      value: function bindMouseHovering() {
        this.sourceElement.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.sourceElement.addEventListener('mouseout', this.hideTooltip.bind(this));
      }
    }, {
      key: "enhanceAccessibility",
      value: function enhanceAccessibility() {
        this.sourceElement.setAttribute('tabindex', 0);
      }
    }, {
      key: "handleClickOutsideTooltip",
      value: function handleClickOutsideTooltip($event) {
        if ($event.target !== this.sourceElement && $event.target !== globalTooltipElement) {
          window.removeEventListener('click', outsideClickListenerFn);
          this.hideTooltip($event);
        }
      }
    }, {
      key: "hideTooltipOnEscKey",
      value: function hideTooltipOnEscKey($event) {
        var KEY_ESC_ID = 27;

        if ($event.which === KEY_ESC_ID) {
          this.hideTooltip();
          $event.preventDefault();
          return false;
        }

        return true;
      }
    }, {
      key: "getSourceElementCenterX",
      value: function getSourceElementCenterX() {
        return this.sourceElement.getBoundingClientRect().left + this.sourceElement.getBoundingClientRect().width / 2;
      }
    }, {
      key: "calculateTooltipPositionX",
      value: function calculateTooltipPositionX() {
        var positionX = 0;
        var expectedTooltipWidth = Math.floor(globalTooltipElement.getBoundingClientRect().width),
            viewPortWidth = window.innerWidth,
            caretOffset = 20,
            // Half of the caret size + margin from the edge of the tooltip
        elementCenterX = this.getSourceElementCenterX(),
            potentialTooltipLeftPositionX = elementCenterX - caretOffset,
            potentialTooltipRightPositionX = elementCenterX - expectedTooltipWidth + caretOffset;

        if (viewPortWidth < potentialTooltipLeftPositionX + expectedTooltipWidth && elementCenterX - caretOffset >= 0) {
          globalTooltipElement.classList.add('right');
          positionX = potentialTooltipRightPositionX;
        } else {
          // Default
          globalTooltipElement.classList.add('left');
          positionX = potentialTooltipLeftPositionX;
        }

        return positionX;
      }
    }, {
      key: "calculateTooltipPositionY",
      value: function calculateTooltipPositionY() {
        var positionY = 0;
        var caretOffset = 16,
            // Caret's height + margin between the tip and the element
        expectedTooltipHeight = globalTooltipElement.getBoundingClientRect().height,
            viewPortTopY = window.window.pageYOffset,
            viewPortBottomY = viewPortTopY + window.innerHeight,
            elementTopY = this.sourceElement.getBoundingClientRect().top,
            elementBottomY = elementTopY + this.sourceElement.getBoundingClientRect().height,
            potentialTooltipTopPositionY = elementTopY - caretOffset - expectedTooltipHeight,
            potentialTooltipBottomPositionY = elementBottomY + caretOffset;

        if (potentialTooltipTopPositionY < SIZES.SCREEN_PADDING && elementBottomY + caretOffset + expectedTooltipHeight <= viewPortBottomY - SIZES.SCREEN_PADDING) {
          globalTooltipElement.classList.add('top');
          positionY = potentialTooltipBottomPositionY;
        } else {
          // Default
          globalTooltipElement.classList.add('bottom');
          positionY = potentialTooltipTopPositionY;
        }

        return positionY + viewPortTopY;
      }
    }, {
      key: "setTooltipWidth",
      value: function setTooltipWidth() {
        // Pre-calculate required dimensions
        var expectedTooltipWidth = Math.floor(globalTooltipElement.getBoundingClientRect().width),
            viewPortWidth = window.innerWidth,
            caretOffset = 20,
            // Half of the caret size + margin from the edge of the tooltip
        elementCenterX = this.getSourceElementCenterX(),
            potentialTooltipLeftPositionX = elementCenterX - caretOffset,
            potentialTooltipRightPositionX = elementCenterX - expectedTooltipWidth + caretOffset,
            potentialTooltipLeftSpace = viewPortWidth - potentialTooltipLeftPositionX,
            potentialTooltipRightSpace = potentialTooltipRightPositionX + expectedTooltipWidth; // 2. Check if the tooltip is going to fit there

        if (potentialTooltipLeftSpace - SIZES.SCREEN_PADDING >= expectedTooltipWidth || potentialTooltipRightSpace - SIZES.SCREEN_PADDING >= expectedTooltipWidth) {
          globalTooltipElement.style.width = "".concat(expectedTooltipWidth + 1, "px");
          return;
        }

        if (potentialTooltipLeftSpace < potentialTooltipRightSpace) {
          // Tooltip right is better
          globalTooltipElement.style.width = "".concat(potentialTooltipRightSpace - SIZES.SCREEN_PADDING, "px");
        } else {
          // Tooltip left is better
          globalTooltipElement.style.width = "".concat(potentialTooltipLeftSpace - SIZES.SCREEN_PADDING, "px");
        }
      }
    }, {
      key: "positionTooltip",
      value: function positionTooltip() {
        // Reset positioning classes
        globalTooltipElement.classList.remove('left');
        globalTooltipElement.classList.remove('right');
        globalTooltipElement.classList.remove('top');
        globalTooltipElement.classList.remove('bottom');
        globalTooltipElement.style.width = ''; // Revert into 'auto'

        globalTooltipElement.style.height = ''; // Revert into 'auto'

        this.setTooltipWidth();
        globalTooltipElement.style.left = "".concat(this.calculateTooltipPositionX(), "px");
        globalTooltipElement.style.top = "".concat(this.calculateTooltipPositionY(), "px");
        globalTooltipElement.style.opacity = 1;
      }
    }]);

    return Tooltip;
  }();
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


  function initTooltip(tooltipableElement, configObject) {
    var tooltipConfigObject = configObject;
    var tooltipElementConfigString = tooltipableElement.getAttribute(ATTRIBUTE_NAME_TOOLTIP);

    if (!tooltipConfigObject && tooltipElementConfigString && tooltipConfigObject !== '') {
      try {
        tooltipConfigObject = JSON.parse(tooltipElementConfigString);
      } catch (err) {
        console.error('Custom configuration options for a tooltip MUST be in a valid JSON format: ', tooltipElementConfigString, tooltipableElement, err);
      }
    }

    return new Tooltip(tooltipableElement, tooltipConfigObject);
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


  function initTooltips(tooltipableDomElements) {
    /** @type {NodeList} */
    var tooltipableElementList = tooltipableDomElements || document.querySelectorAll("[".concat(ATTRIBUTE_NAME_TOOLTIP, "]"));
    var newTooltipInstances = [];
    tooltipableElementList.forEach(function (element) {
      return newTooltipInstances.push(initTooltip(element));
    });
    return newTooltipInstances.length > 0 ? newTooltipInstances : null;
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
    while (tooltipsList.length) {
      tooltipsList[0].destroy();
    }

    return true;
  } // Populate public API interface


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

  (function init() {
    if (!areDependenciesAvailable()) return;
    constructor();
    initOnDomReady();
  })();
})(); // Make API available for Modular JS codebases


/* harmony default export */ var tooltips = (tooltipsApi);
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/tray.js
/* eslint-disable func-names */

var TABLET_AND_SMALLER = "screen and (max-width: 975px)",
    DESKTOP_AND_LARGER = "screen and (min-width: 1200px)"; // eslint-disable-next-line import/prefer-default-export

function initTray() {
  // console.log( 'tray...', $( '.tray-toggle' ));
  console.log("Init tray"); // Check title length and shrink if too long

  var pageTitleEl = $(".header-content > a");
  var pageTitleLength = pageTitleEl.text().length;
  console.log($(".header-content > a").text().length);

  if (pageTitleLength > 150) {
    pageTitleEl.parent().addClass("long-title");
    pageTitleEl.addClass("long-title");
  }

  $("body").on("click keyup", function (e) {
    // Close tray if clicked away from or escpae buttons
    console.log(e.target.className, "clicked"); // If not enter key

    if (e.which !== 13) {
      if (e.target.className.includes("tray-open") && $(".tray-open").length || e.key == "Escape" && $(".tray-open").length) {
        e.preventDefault();
        toggleTray();
      }
    } // Close dropdown if click away
    // If key is not tab or shift


    if (e.which !== 9 && e.which !== 16) {
      if (!e.target.className.includes("selector") && $(".custom-dropdown .selector").hasClass("open") || !e.target.className.includes("selector") && e.key == "Escape") {
        $(".custom-dropdown .selector").next().slideUp("fast");
        $(".custom-dropdown .selector").removeClass("open");
      }
    }
  }); // Initial position

  function setTabsBlipInitialPosition() {
    var activeItem = $("nav.tray .tabs .active").parent();

    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tabs").offset().left,
        width: activeItem.outerWidth()
      });
    }
  } // tray functionality


  function toggleTray() {
    $(".tray").toggleClass("tray-closed", "normal");
    $(".tray").toggleClass("tray-open", "normal");
    setTabsBlipInitialPosition();
    $("body").toggleClass("noscroll");
  }

  $(".tray-toggle").on("click keydown", function (e) {
    if (e.which == 13 || e.which == 1) {
      e.preventDefault();
      toggleTray(); // return false;
    }
  });
  $(".expanded-draw").click(function (e) {
    e.preventDefault();
    toggleTray();
  });
  $(".tray-close").click(function (e) {
    e.preventDefault();
    toggleTray();
  });
  $(".search-toggle").click(function (e) {
    e.preventDefault();
    toggleTray();
    setTimeout(function () {
      $(".tray .search-input").focus();
    }, 500);
  }); // $('.search-button-inside form').on('focus', (e) => {
  //   $( this ).toggleClass('focus')
  //   console.log( $(this) );
  // })
  // ****************************************
  // ****************************************
  // sidemenu tray
  // const SIDEMENU_TOGGLE_CLASS   = 'sidemenu-toggle';
  // const SIDEMENU_EXPANDER_CLASS = 'btn-expander';
  // const SIDEMENU_SUBMENU_CLASS  = 'has-submenu';
  // const SIDEMENU_SELECTED_ITEM_CLASS = 'active';
  // const SIDEMENU_EXPANDED_CLASS      = 'expanded';

  var horizontalMenuExpanded = false;
  var $blip = $(".menu-blip");

  function buildTray(index, item) {
    // console.log( 'nav item', $(this).parent().children('a').text() );
    var nav = $(this);
    var navClassString = $(this).parent().children("a").html();
    var titleLink = $(this).parent().children("a").attr("href"); //push into traw div

    nav.clone().appendTo(".draw-nav").addClass(navClassString).attr("data-index", index); //add title

    $(".draw-nav ul[data-index='".concat(index, "']")).prepend("<h4 class=\"sub-draw-title\"><a href=\"".concat(titleLink, "\">").concat(navClassString, "</a></h4>"));
  }

  var openTimeout;
  var sidemenuExpanded = false;
  var $draw = $(".sidemenu-drawer"); //! Sidemenu expand logic

  function expandTray(index, listItem) {
    $(listItem).on("mouseenter click", function (e) {
      // If clicking on expander arrow
      if (e.type == "click" && $(e.target).hasClass("btn-expander")) {
        if ($(e.target).parent().hasClass("active-menu-item")) {
          // If clicked parent is expanded
          sidemenuExpanded = false;
          $draw.removeClass("active");
          $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");
          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
        } else {
          $draw.removeClass("active");
          $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");
          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
          $(e.target).parent().addClass("active-menu-item");
          $draw.addClass("active");
          sidemenuExpanded = true;
        }
      } else {
        // Else we are hovering on the menu item
        if ($(listItem).parent().hasClass("expanded-draw")) {
          // console.log('has class button close tray');
          sidemenuExpanded = true;
          $draw.addClass("active"); // Remove other ones
        } else {
          //show tray
          if (sidemenuExpanded === false) {
            $draw.addClass("active");
            sidemenuExpanded = !sidemenuExpanded;
          }

          $(".sidemenu-homepage > ul > li").removeClass("expanded-draw");
          $(listItem).parent().addClass("expanded-draw");
        } // Hover trigger


        $(".nav-item-parent.active-menu-item").removeClass("active-menu-item");
        $(listItem).addClass("active-menu-item");
        var matchingNavGroup = $(".draw-nav ul[data-index='".concat(index, "']"));
        $(".draw-nav > ul").removeClass("active-nav-group");
        matchingNavGroup.toggleClass("active-nav-group"); // }
      }
    });
  }

  function expandDrawSubContent() {
    // console.log('expand expandDrawSubContent');
    var subDrawExpander = $(".sidemenu-drawer .draw-nav ul ").find(".btn-expander"); // console.log(subDrawExpander);

    subDrawExpander.each(function (i, button) {
      var $button = $(button);
      $button.on("click keyup", function (e) {
        if (e.type == "click" || e.key == "Enter") {
          // console.log($button);
          $button.parent("li").toggleClass("expanded");
        }
      });
    });
  } // Close draw when clicking the X button


  $(".close-draw").on("click", function (e) {
    closeDraw();
  });

  function closeDraw(location) {
    var loc = location || "expanded-draw";

    if ($("#banner-nav").length > 0) {
      loc = "expanded-draw";
    } else {
      loc = "horizontal-drawer-expanded";
    } // console.log(loc);


    if (sidemenuExpanded) {
      sidemenuExpanded = !sidemenuExpanded;
      $(".sidemenu-homepage .".concat(loc)).removeClass("expanded-draw"); // Remove any active item classes

      $(".nav-item-parent.active-menu-item").removeClass("active-menu-item"); // Remove blip

      $blip.css({
        height: 0
      });
      $draw.removeClass("active");
    } // horizontal mega menu draw


    if (horizontalMenuExpanded) {
      horizontalMenuExpanded = !horizontalMenuExpanded;
      $(".sidemenu-drawer").removeClass("".concat(loc));
      $(".mega-menu-top-level > li").removeClass("expanded-nav");
      $blip.css({
        width: 0
      }); // $draw.toggleClass('active');
    } // On click OR mouseover of body, hide the tray if it's open

  } // ! ==== HOMEPAGE SIDE-MENU ONLY ====


  $("body").on("click", function (e) {
    console.log(e.target);
    var horizontalNavHeader = $("#mega_menu_block");
    var sidemenu = $(".sidemenu-homepage"); // let  megamenu = $('.sidemenu-drawer');

    if (sidemenuExpanded && !sidemenu.is(e.target) && // if the target of the click isn't the container...
    sidemenu.has(e.target).length === 0 && !e.target.className.includes("close-draw") // and not clicking the close button...
    ) {
        // ... nor a descendant of the container
        closeDraw();
      } // closes menu if not clicking on header.. .should this be behaviour?


    if ($(".show-mega-menu-top").length) {
      if (horizontalMenuExpanded && !horizontalNavHeader.is(e.target) && horizontalNavHeader.has(e.target).length === 0) {
        closeDraw();
      }
    }
  });

  function sidemenuTray() {
    var menu = $(".sidemenu-homepage"); // console.log(menu);
    //build tray nav content

    var trayNavItems = $(".sidemenu-homepage > ul > li > ul");
    var listItem = $(".sidemenu-homepage > ul > li:not(.sidemenu__label)"); // console.log(trayNavItems);

    listItem.each(expandTray);
    trayNavItems.each(buildTray);
    expandDrawSubContent();
    closeDraw();
  }

  if ($(".sidemenu-homepage").length) {
    src_default.a.register(DESKTOP_AND_LARGER, function () {
      sidemenuTray();
    });
  } // **********
  // Horizontal Nav
  // **********


  function initHorizontalNav() {
    // console.log('hori nav go');
    var menuItems = $(".show-mega-menu-top .mega-menu-top-level .nav-item-parent ");
    var menuItemsWithSub = $(".show-mega-menu-top .mega-menu-top-level > .has-submenu");
    var subMenuItems = $(".show-mega-menu-top .mega-menu-top-level > .nav-item-parent "); // build sub menu for expand

    subMenuItems.each(function (index) {
      var $item = $(this); // console.log( $item, index );

      var titleLink = $item.children("a").attr("href");
      var titleText = $item.children("a").text();
      var titleHtml = $item.children("a").html(); // console.log(titleLink, ' ', titleText);
      //push into traw div

      if ($item.children("ul").length) {
        $item.children("ul").clone().appendTo(".draw-nav").attr("data-index", index);
      } else {
        // console.log('No UL CHILDREN');
        $(".draw-nav").append("<ul data-index=\"".concat(index, "\"></ul>"));
      } //add title


      $(".draw-nav > ul[data-index='".concat(index, "']")).prepend("<li class=\"sub-draw-title\"><a href=\"".concat(titleLink, "\">").concat(titleHtml, "</a></li>"));
    }); // console.log('testing horizontalMenuExpanded  ----   ', horizontalMenuExpanded);
    // !EXPAND MENU ON HOVER

    menuItems.on("mouseenter click", function (e) {
      var index = $(this).index() - 2;
      console.log("🚀 ~ file: tray.js ~ line 254 ~ menuItemsWithSub.on ~ index", index);
      var $navItem = $(this);
      e.preventDefault();
      e.stopPropagation(); // If menu is already open, don't delay expanding the menu, else do!

      if (horizontalMenuExpanded || e.type == "click") {
        expandHorizontalMenu(index, $navItem, e.type);
      } else {
        openTimeout = setTimeout(function () {
          expandHorizontalMenu(index, $navItem, e.type);
        }, 200);
      }
    });

    var expandHorizontalMenu = function expandHorizontalMenu(index, $navItem, eventType) {
      if ($navItem.hasClass("expanded-nav") && eventType == "click") {
        // If nav item is already expanded... close it
        horizontalMenuExpanded = !horizontalMenuExpanded;
        $navItem.removeClass("expanded-nav");
        $(".sidemenu-drawer").removeClass("horizontal-drawer-expanded");
        $(".draw-nav > ul").removeClass("active-nav-group"); // $blip.css({
        //   width: 0,
        // });
      } else {
        // Else if nav item is NOT expanded... open it
        if (horizontalMenuExpanded === false) {
          $(".sidemenu-drawer").addClass("horizontal-drawer-expanded");
          horizontalMenuExpanded = !horizontalMenuExpanded;
        }

        menuItems.removeClass("expanded-nav");
        $navItem.addClass("expanded-nav"); // HORIZONTAL MENU BLIP ADJUSTMENT

        $blip.css({
          left: $navItem.offset().left - $("#mega-menu").offset().left,
          width: $navItem.innerWidth()
        });
      } // set active submenu to display


      var matchingNavGroup = $(" .draw-nav > ul[data-index='".concat(index, "']"));
      $(".draw-nav > ul").removeClass("active-nav-group");
      matchingNavGroup.toggleClass("active-nav-group"); // console.log('horizontalMenuExpanded',horizontalMenuExpanded);
    }; // !CLOSE ON MENU MOUSE OUT


    src_default.a.register(DESKTOP_AND_LARGER, function () {
      // Hide menu if mouseout for x seconds
      // If banner nav is active
      if ($("#banner-nav").length > 0) {
        $("#banner-nav").on("mouseleave", function (e) {
          clearTimeout(openTimeout);
          openTimeout = setTimeout(function () {
            closeDraw();
          }, 300);
        }); // If hover back in while timeout is active, cancel it so it doesn't hide

        $("#banner-nav").on("mouseenter", function (e) {
          clearTimeout(openTimeout);
        });
      } else {
        $("#mega_menu_block").on("mouseleave", function (e) {
          clearTimeout(openTimeout);
          openTimeout = setTimeout(function () {
            if ($(".show-mega-menu-top").length && horizontalMenuExpanded) {
              closeDraw();
            }
          }, 300);
        }); // If hover back in while timeout is active, cancel it so it doesn't hide

        $(".main-site-header, .gradient-line, #mega-nav").on("mouseenter", function (e) {
          clearTimeout(openTimeout);
        });
      }
    }); // Set nav offset height for css variable

    var navHeight = $(".show-mega-menu-top .mega-sub-menu").height() + 6; // console.log(navHeight);

    document.querySelector(":root").style.setProperty("--horizontal-nav-offset", "".concat(navHeight, "px"));
    closeDraw("horizontal-drawer-expanded");
    expandDrawSubContent();
  }

  if ($(".show-mega-menu-top").length) {
    // only run on desktop size
    src_default.a.register(DESKTOP_AND_LARGER, function () {
      console.log("Desktop activated "); // Only inti horizontal nav if it hasn't rendered yet, prevents duplication when resizing multiple times

      if ($(".sub-draw-title").length < 1) {
        initHorizontalNav();
      }
    });
  } // initHorizontalNav();
  // Blip movement logic


  $("#mega-menu > li:not(.sidemenu__label)").on("mouseover click", function () {
    // If we are using a sidemenu
    if ($("#mega-menu").parent().hasClass("sidemenu-homepage")) {
      $blip.css({
        top: $(this).offset().top - $(this).parents("#mega-menu").offset().top,
        height: $(this).innerHeight()
      });
    } else {
      // Else we are using horizontal menu
      $blip.css({
        left: $(this).offset().left - $("#mega-menu").offset().left,
        width: $(this).innerWidth()
      });
    }
  }); // On mouse out of horizontal nav

  $(".main-site-header #mega-menu > li").on("mouseout", function () {
    var activeItem = $(".expanded-nav");

    if (activeItem.length) {
      $blip.css({
        left: activeItem.offset().left - $("#mega-menu").offset().left,
        width: activeItem.innerWidth()
      });
    } else {
      $blip.css({
        width: 0
      });
    }
  }); // Custom SAVED menu

  $(".ls-trigger").click(function (e) {
    console.log(e);
    window.localStorage.setItem("savedScholarships", '[{"rank":1,"score":0,"title":"A K Elliot sadsdasdasd!","collection":"vic-schols-push","component":0,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","summary":"1727054 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Fa-k-elliot-memorial-scholarship 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fa-k-elliot-memorial-scholarship&profile=_default_preview","date":null,"fileSize":5565,"fileType":"xml","tier":1,"docNum":48,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fa-k-elliot-memorial-scholarship&auth=3phxo37ZFdx6vI4nWgWX9w&profile=_default_preview&rank=1&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/a-k-elliot-memorial-scholarship","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Business"],"t":["A K Elliot Memorial Scholarship"],"contents":["Study Area(s): Business Subject Area(s): N/A --> Scholarship Level: Doctoral"," Master’s Research"," All postgraduate Closing Date(s): 1 November Tenure: One year Number offered: One Value: Approximately $5,000 (subject to funds available) Description This scholarship is to help students conduct research in the field of librarianship. History This scholarship arises from a bequest under the Will of Miss Agnes King Elliot, former President of the New Zealand Library Association, who died in 1982. Eligibility The scholarship is open to applicants who, in the year of tenure will be enrolled as Master\'s or PhD students undertaking a research degree in Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand. Criteria Applicants must be intending to enrol in Master\'s by research or PhD degree in Information Studies at Victoria University of Wellington (preference will be given to a specialisation in Library Science (LIBR) or Archives and Records Management (ARCR). Applicants must be intending to pursue a research topic in the field of Librarianship in New Zealand. Application process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Scholarship specific documentation A brief description of the research topic to be undertaken Selection process The successful recipient will be selected by Head of School of Information Management in consultation with appropriate staff from the school. In making the award the panel may take into consideration academic and"],"level":["Doctoral"," Master’s Research"," All postgraduate"],"closing1":["2021-11-01"],"history":["This scholarship is open to applicants who, in the year of tenure will be enrolled as Masters or PhD students undertaking a research degree in Library and Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand."],"subjectAreas":["Information Systems"],"value":["5000"],"tenure":["One year"]},"metaData":{"history":"This scholarship is open to applicants who, in the year of tenure will be enrolled as Masters or PhD students undertaking a research degree in Library and Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand.","subjectAreas":"Information Systems","t":"A K Elliot Memorial Scholarship","tenure":"One year","level":"Doctoral; Master’s Research; All postgraduate","closing1":"2021-11-01","studyAreas":"Business","value":"5000","contents":"Study Area(s): Business Subject Area(s): N/A --> Scholarship Level: Doctoral; Master’s Research; All postgraduate Closing Date(s): 1 November Tenure: One year Number offered: One Value: Approximately $5,000 (subject to funds available) Description This scholarship is to help students conduct research in the field of librarianship. History This scholarship arises from a bequest under the Will of Miss Agnes King Elliot, former President of the New Zealand Library Association, who died in 1982. Eligibility The scholarship is open to applicants who, in the year of tenure will be enrolled as Master\'s or PhD students undertaking a research degree in Information Studies, and intend to pursue a research topic in the field of Librarianship in New Zealand. Criteria Applicants must be intending to enrol in Master\'s by research or PhD degree in Information Studies at Victoria University of Wellington (preference will be given to a specialisation in Library Science (LIBR) or Archives and Records Management (ARCR). Applicants must be intending to pursue a research topic in the field of Librarianship in New Zealand. Application process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Scholarship specific documentation A brief description of the research topic to be undertaken Selection process The successful recipient will be selected by Head of School of Information Management in consultation with appropriate staff from the school. In making the award the panel may take into consideration academic and"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"true"},{"rank":2,"score":0,"title":"ACC \\"Jonathan Nicholls\\" Scholarship","collection":"vic-schols-push","component":0,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","summary":"1727395 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Facc-jonathan-nicholls-scholarship 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Facc-jonathan-nicholls-scholarship&profile=_default_preview","date":null,"fileSize":7614,"fileType":"xml","tier":1,"docNum":140,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Facc-jonathan-nicholls-scholarship&auth=8tLSz%2FazWKSu0vNF1vtDww&profile=_default_preview&rank=2&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/acc-jonathan-nicholls-scholarship","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Business"," Science"],"t":["ACC \\"Jonathan Nicholls\\" Scholarship"],"contents":["Study Area(s): Business"," Science Subject Area(s): N/A --> Scholarship Level: All postgraduate"," Returning students Closing Date(s): 31 October Tenure: One year Number offered: One Value: $5,000 (please see additional information) Description In honour of Jonathan Nicholls (ACC\'s Head of Actuarial Services who passed away in early 2015), ACC wishes to promote the actuarial profession in much the same way that Jonathan did. ACC is dedicated to supporting Actuarial Science students and others looking to pursue a career in the actuarial profession. ACC&rsquo","s actuarial team provides support to ACC and the Ministry of Social Development. This allows for a unique opportunity for any potential internship offered, as the successful candidate could be placed in either of the two agencies. As such, a successful student would have the chance to gain exposure to a variety of areas where actuarial skills can be applied, including a combination of traditional and non-traditional areas. History This scholarship is funded by ACC and has been established as a legacy for Jonathan Nicholls, the former Head of Actuarial Services at ACC, who was passionately committed to growing and developing the actuarial profession. The purpose of the scholarship is to promote, develop and grow students wishing to pursue a career as an Actuary. It is also an investment towards local talent to provide a student in Mathematics, Statistics, Economics, Finance or specifically Actuarial Science with financial support to complete their final year of study at Victoria University of Wellington. Eligibility This scholarship is offered to current students (undergraduate or postgraduate) at Victoria University of Wellington. The applicants are expected to have commitment to working in the actuarial profession, a good academic record, communication skills (ability to explain complex ideas clearly both verbally and in writing), motivation to achieve, committed to achieving agreed objectives and working in the actuarial profession and meeting the needs of our"],"level":["All postgraduate"," Returning students"],"closing1":["2021-10-31"],"history":["This scholarship is open to students currently studying (undergraduate or postgraduate) at Victoria University of Wellington. Applicants must be studying Actuarial Science, Economics, Finance, Mathematics, or Statistics. Preference will be given to applicants who are intending to finish their studies in the next year and have completed ACTS201."],"subjectAreas":["Actuarial Science"," Economics"," Finance"," Mathematics"," Statistics"],"value":["5000"],"tenure":["One year"]},"metaData":{"subjectAreas":"Actuarial Science; Economics; Finance; Mathematics; Statistics","history":"This scholarship is open to students currently studying (undergraduate or postgraduate) at Victoria University of Wellington. Applicants must be studying Actuarial Science, Economics, Finance, Mathematics, or Statistics. Preference will be given to applicants who are intending to finish their studies in the next year and have completed ACTS201.","tenure":"One year","t":"ACC \\"Jonathan Nicholls\\" Scholarship","closing1":"2021-10-31","studyAreas":"Business; Science","level":"All postgraduate; Returning students","value":"5000","contents":"Study Area(s): Business; Science Subject Area(s): N/A --> Scholarship Level: All postgraduate; Returning students Closing Date(s): 31 October Tenure: One year Number offered: One Value: $5,000 (please see additional information) Description In honour of Jonathan Nicholls (ACC\'s Head of Actuarial Services who passed away in early 2015), ACC wishes to promote the actuarial profession in much the same way that Jonathan did. ACC is dedicated to supporting Actuarial Science students and others looking to pursue a career in the actuarial profession. ACC&rsquo;s actuarial team provides support to ACC and the Ministry of Social Development. This allows for a unique opportunity for any potential internship offered, as the successful candidate could be placed in either of the two agencies. As such, a successful student would have the chance to gain exposure to a variety of areas where actuarial skills can be applied, including a combination of traditional and non-traditional areas. History This scholarship is funded by ACC and has been established as a legacy for Jonathan Nicholls, the former Head of Actuarial Services at ACC, who was passionately committed to growing and developing the actuarial profession. The purpose of the scholarship is to promote, develop and grow students wishing to pursue a career as an Actuary. It is also an investment towards local talent to provide a student in Mathematics, Statistics, Economics, Finance or specifically Actuarial Science with financial support to complete their final year of study at Victoria University of Wellington. Eligibility This scholarship is offered to current students (undergraduate or postgraduate) at Victoria University of Wellington. The applicants are expected to have commitment to working in the actuarial profession, a good academic record, communication skills (ability to explain complex ideas clearly both verbally and in writing), motivation to achieve, committed to achieving agreed objectives and working in the actuarial profession and meeting the needs of our"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"false"},{"rank":3,"score":0,"title":"Ahunuku Māori Summer Research Scholarship 2021-2022","collection":"vic-schols-push","component":1,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","summary":"1886794 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Fahunuku-maori-summer-research-scholarship-2020-2021 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fahunuku-maori-summer-research-scholarship-2020-2021&profile=_default_preview","date":null,"fileSize":8313,"fileType":"xml","tier":1,"docNum":112,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Fahunuku-maori-summer-research-scholarship-2020-2021&auth=TCV3AvGOkTVV80%2BjDpYtQw&profile=_default_preview&rank=3&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/ahunuku-maori-summer-research-scholarship-2020-2021","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Science"],"t":["Ahunuku Māori Summer Research Scholarship 2021-2022"],"contents":["Study area(s): Science Subject Area(s): N/A --> Scholarship level: Returning students"," Honours"," Master\'s by coursework Closing date(s): 20 September 2021 Award for: Māori Value: $6,000 Description The Ahunuku Māori Summer Research Scholarship 2021-2022 is available through GNS Science, Te Pū Ao over the summer. Selected scholars are expected to contribute a minimum of 400 hours to the project between November 2021 and February 2022. All projects must be completed by the start of Trimester 1, 2022. Each scholarship will have a value of $6,000, paid in four equal instalments. Eligibility and conditions Applicants must be Māori, or of Māori descent. Applicants will be selected on the basis of academic merit, expertise in the research area, and recommendations from GNS staff associated with the project. Applicants must have completed at least two years of their undergraduate degree and are currently enrolled at any Australian or New Zealand University in an undergraduate, Honours, or first year of a Masters\' degree. Selected applicants must comply with the standard Summer Research Scholarship conditions . Students enrolled in a PhD or Masters by Thesis programs are not eligible. Application process Applications for the 2021-2022 Ahunuku Māori Summer Scholarships will be open from 6 September 2021 and close 20 September 2021 at 4.30 pm (New Zealand time zone). To apply for any of the following projects, an online application must be submitted by 4.30 pm on the closing date. When applying, please note the corresponding scholarship code for each project. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered. For further details on the projects or for any questions about the scholarship, please contact summer-research@vuw.ac.nz. 2021-2022 Project details Scholarship project code: 900 - Development of a new calibration to reconstruct past air and water"],"level":["Returning students"," Honours"," Master\'s by coursework"],"closing1":["2021-09-20"],"subjectAreas":["Nursing"],"category":["Māori"],"value":["$6,000"]},"metaData":{"level":"Returning students; Honours; Master\'s by coursework","value":"$6,000","subjectAreas":"Nursing","studyAreas":"Science","closing1":"2021-09-20","t":"Ahunuku Māori Summer Research Scholarship 2021-2022","category":"Māori","contents":"Study area(s): Science Subject Area(s): N/A --> Scholarship level: Returning students; Honours; Master\'s by coursework Closing date(s): 20 September 2021 Award for: Māori Value: $6,000 Description The Ahunuku Māori Summer Research Scholarship 2021-2022 is available through GNS Science, Te Pū Ao over the summer. Selected scholars are expected to contribute a minimum of 400 hours to the project between November 2021 and February 2022. All projects must be completed by the start of Trimester 1, 2022. Each scholarship will have a value of $6,000, paid in four equal instalments. Eligibility and conditions Applicants must be Māori, or of Māori descent. Applicants will be selected on the basis of academic merit, expertise in the research area, and recommendations from GNS staff associated with the project. Applicants must have completed at least two years of their undergraduate degree and are currently enrolled at any Australian or New Zealand University in an undergraduate, Honours, or first year of a Masters\' degree. Selected applicants must comply with the standard Summer Research Scholarship conditions . Students enrolled in a PhD or Masters by Thesis programs are not eligible. Application process Applications for the 2021-2022 Ahunuku Māori Summer Scholarships will be open from 6 September 2021 and close 20 September 2021 at 4.30 pm (New Zealand time zone). To apply for any of the following projects, an online application must be submitted by 4.30 pm on the closing date. When applying, please note the corresponding scholarship code for each project. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered. For further details on the projects or for any questions about the scholarship, please contact summer-research@vuw.ac.nz. 2021-2022 Project details Scholarship project code: 900 - Development of a new calibration to reconstruct past air and water"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"false"},{"rank":5,"score":0,"title":"Alastair Whitelaw Undergraduate Scholarship in History","collection":"vic-schols-push","component":6,"collapsed":null,"liveUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","summary":"1982276 https% 3A% 2F% 2Fwww.wgtn.ac.nz% 2Fscholarships% 2Fcurrent% 2Falastair-whitelaw-undergraduate-scholarship-in-history 256.","cacheUrl":"/s/cache?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Falastair-whitelaw-undergraduate-scholarship-in-history&profile=_default_preview","date":null,"fileSize":5880,"fileType":"xml","tier":1,"docNum":6,"exploreLink":null,"kmFromOrigin":null,"quickLinks":null,"displayUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","clickTrackingUrl":"/s/redirect?collection=vic-schols-push&url=https%3A%2F%2Fwww.wgtn.ac.nz%2Fscholarships%2Fcurrent%2Falastair-whitelaw-undergraduate-scholarship-in-history&auth=oDILcipOUZqSHUq83hlpSA&profile=_default_preview&rank=5&query=%21showall","explain":null,"indexUrl":"https://www.wgtn.ac.nz/scholarships/current/alastair-whitelaw-undergraduate-scholarship-in-history","gscopesSet":[],"documentVisibleToUser":true,"promoted":false,"diversified":false,"listMetadata":{"studyAreas":["Humanities"],"t":["Alastair Whitelaw Undergraduate Scholarship in History"],"contents":["Study area(s): Humanities Subject Area(s): N/A --> Scholarship level: Returning students Closing date(s): 30 April Tenure: 1 year Award for: Māori"," Pasifika Number offered: One Value: $3,000 Description This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern&rsquo","s and King&rsquo","s College in Auckland where he was also a Boarding Housemaster. This Scholarship is designed to encourage and support&nbsp","Māori or Pasifika&nbsp","students to pursue study in History at Victoria University of Wellington-Te Herenga Waka. History This scholarship is to support a Māori or Pasifika student studying in 300 level in History. Eligibility Applicants for this scholarship must be enrolled, or be intending to enrol in&nbsp","300 level&nbsp","in History at Victoria University of Wellington - Te Herenga Waka. Selection will be based on academic merit. Criteria Applicants must be of Māori or Pasifika descent. Applicants must be currently enrolled or intending to enrol in&nbsp","300 level&nbsp","&nbsp","in History at Victoria University of Wellington. Applicants must be majoring in History. Application Process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Apply online Scholarship specific documentation A personal statement outlining the desired"],"level":["Returning students"],"closing1":["2022-04-30"],"history":["This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern’s and..."],"subjectAreas":["History"],"category":["Māori"," Pasifika"],"tenure":["1 year"]},"metaData":{"studyAreas":"Humanities","category":"Māori; Pasifika","subjectAreas":"History","closing1":"2022-04-30","tenure":"1 year","history":"This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern’s and...","contents":"Study area(s): Humanities Subject Area(s): N/A --> Scholarship level: Returning students Closing date(s): 30 April Tenure: 1 year Award for: Māori; Pasifika Number offered: One Value: $3,000 Description This Scholarship arises from a bequest under the Will of Alastair Whitelaw, who died in 2015. Teaching and history were both his lifelong passion. He graduated from Victoria University of Wellington in 1955. He went on to complete an MA at Oxford and had a long career as a secondary school teacher. He taught history at both St Kentigern&rsquo;s and King&rsquo;s College in Auckland where he was also a Boarding Housemaster. This Scholarship is designed to encourage and support&nbsp;Māori or Pasifika&nbsp;students to pursue study in History at Victoria University of Wellington-Te Herenga Waka. History This scholarship is to support a Māori or Pasifika student studying in 300 level in History. Eligibility Applicants for this scholarship must be enrolled, or be intending to enrol in&nbsp;300 level&nbsp;in History at Victoria University of Wellington - Te Herenga Waka. Selection will be based on academic merit. Criteria Applicants must be of Māori or Pasifika descent. Applicants must be currently enrolled or intending to enrol in&nbsp;300 level&nbsp;&nbsp;in History at Victoria University of Wellington. Applicants must be majoring in History. Application Process <p>A completed online application must be submitted by 4.30 pm on the closing date. Late or incomplete applications will not be accepted. Any required supporting documentation (including references) must also be received by 4.30 pm on the closing date in order for the application to be considered.</p><p>Applications will normally open one month prior to the closing date. If no application link is provided below, check back again closer to the closing date. <a href=\\"https://cms.wgtn.ac.nz/scholarships/scholarships-office\\">Contact us</a> if you have any queries.</p> Apply online Scholarship specific documentation A personal statement outlining the desired","level":"Returning students","t":"Alastair Whitelaw Undergraduate Scholarship in History"},"tags":[],"customData":{},"relatedDocuments":{},"favourited":"true","notice":"true"}]');
  });
  Storage.prototype.setItem = new Proxy(Storage.prototype.setItem, {
    apply: function apply(target, thisArg, argumentList) {
      var event = new CustomEvent("localstorage", {
        detail: {
          key: argumentList[0],
          oldValue: thisArg.getItem(argumentList[0]),
          newValue: argumentList[1]
        }
      });
      window.dispatchEvent(event); // checkSavedItems();

      return Reflect.apply(target, thisArg, argumentList);
    }
  });
  Storage.prototype.removeItem = new Proxy(Storage.prototype.removeItem, {
    apply: function apply(target, thisArg, argumentList) {
      var event = new CustomEvent("localstorage", {
        detail: {
          key: argumentList[0]
        }
      });
      window.dispatchEvent(event);
      return Reflect.apply(target, thisArg, argumentList);
    }
  });
  Storage.prototype.clear = new Proxy(Storage.prototype.clear, {
    apply: function apply(target, thisArg, argumentList) {
      var event = new CustomEvent("localstorage", {
        detail: {
          key: "__all__"
        }
      });
      window.dispatchEvent(event);
      return Reflect.apply(target, thisArg, argumentList);
    }
  });
  var notificationCount = 0; // !Listen to storage changes from other windows on same domain
  // window.addEventListener("storage", (e) => {
  //   // When local storage changes, dump the list to
  //   // the console.
  //   console.log(e);
  //   console.log(window.localStorage);
  //   if (e.key.includes("saved")) {
  //     console.log(e);
  //     checkSavedItems(e.key);
  //     notificationCount++;
  //     if (notificationCount > 0) {
  //       // Show main menu notification count
  //       if ($(".menu-notifcations").length) {
  //         $(".menu-notifcations").show();
  //       } else {
  //         $(".header-toggle .tray-toggle").append(
  //           "<div class='menu-notifcations'>" + notificationCount + "</div>"
  //         );
  //       }
  //       // Inner tab notification
  //       if ($(".t-saved .notification").length) {
  //         $(".t-saved .notification").show();
  //       } else {
  //         $(".t-saved span").append("<div class='notification'></div>");
  //       }
  //       // Show inner tab notifcation count
  //       $("nav.tray .tabs .notification").show();
  //       $("nav.tray .tabs .notification").text(notificationCount);
  //     }
  //   }
  // });
  // // !Listen to local storage on CURRENT PAGE
  // window.addEventListener(
  //   "localstorage",
  //   function (e) {
  //     if (e.detail.key.includes("saved")) {
  //       console.log(e.detail);
  //       // checkSavedItems(e.detail.key);
  //       notificationCount++;
  //       if (notificationCount > 0) {
  //         // Show main menu notification count
  //         if ($(".menu-notifcations").length) {
  //           $(".menu-notifcations").show();
  //         } else {
  //           $(".header-toggle .tray-toggle").append(
  //             "<div class='menu-notifcations'>" + notificationCount + "</div>"
  //           );
  //         }
  //         // Inner tab notification
  //         if ($(".t-saved .notification").length) {
  //           $(".t-saved .notification").show();
  //         } else {
  //           $(".t-saved span").append("<div class='notification'></div>");
  //         }
  //         // Show inner tab notifcation count
  //         $("nav.tray .tabs .notification").show();
  //         $("nav.tray .tabs .notification").text(notificationCount);
  //       }
  //     }
  //     // }
  //   },
  //   false
  // );
  // !Remove default icon injected on all role="button" elements

  $(".btn-expander").addClass("no-icon"); // !Temporary override of toolkit hiding

  $(".sidemenu  ul > .has-submenu").css("display", "flex");

  var formatAsDate = function formatAsDate(date, locale) {
    var arr = date.split("");
    var year = arr.slice(0, 4).join("");
    var month = arr.slice(4, 6).join("");
    var day = arr.slice(6, 8).join("");

    if (locale == "us") {
      var dateString = year + " " + month + " " + day;
      dateString = new Date(dateString);
      return dateString;
    } else {
      var dateString = year + " " + month + " " + day;
      dateString = new Date(dateString).toLocaleDateString("en-UK");
      return dateString;
    }
  }; // !SAVED EVENTS LISTS
  // function checkSavedItems(item) {
  //   var nameMaps = {
  //     savedEvents: "events",
  //     savedScholarships: "scholarships",
  //     savedClubs: "clubs",
  //     savedPages: "pages",
  //     savedPrizes: "prizes",
  //   };
  //   if (item == "savedEvents") {
  //     var noResultsUrl = "https://cms.wgtn.ac.nz/events";
  //   } else if (item == "savedScholarships") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/scholarships/find-scholarships";
  //   } else if (item == "savedClubs") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/students/campus/clubs/directory";
  //   } else if (item == "savedPrizes") {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/scholarships/annual-prizes";
  //   } else {
  //     noResultsUrl = "https://cms.wgtn.ac.nz/";
  //   }
  //   if (item) {
  //     if (nameMaps[item] !== undefined) {
  //       setTimeout(() => {
  //         if (localStorage[item]) {
  //           var items = JSON.parse(localStorage[item]);
  //         }
  //         if (items && items.length > 0) {
  //           var itemsLength = items.length;
  //         } else {
  //           itemsLength = 0;
  //         }
  //         if (items && items.length > 0) {
  //           // Update count in dropdown
  //           $(".custom-dropdown")
  //             .find("." + nameMaps[item] + " .count")
  //             .text("(" + items.length + ")");
  //           // Update count in accordion
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .find(".count")
  //             .text(items.length);
  //           // Append accordion buttons
  //           $("." + nameMaps[item] + "-list").append(
  //             "<div class='accordion-buttons'></div>"
  //           );
  //           if (items.length > 0) {
  //             $("." + nameMaps[item] + "-list .accordion-buttons").append(
  //               "<a target='_blank' class='btn rounded no-icon secondary view-all' href=''>View all <i class='icons8-external-link'></i></a>"
  //             );
  //           }
  //           $("." + nameMaps[item] + "-list .accordion-buttons").append(
  //             "<a target='_blank' class='btn rounded no-icon primary add-more' href='" +
  //               noResultsUrl +
  //               "'>Add more <i class='icons8-external-link'></i></a>"
  //           );
  //           // Clear old list
  //           $("." + nameMaps[item] + "-list li").remove();
  //           var first5 = items.slice(0, 5);
  //           first5.forEach(function (e) {
  //             // If liveUrl exists we presume it follows the Funnelback structure of 'title' and 'liveUrl', e.g. for Events
  //             if (e.liveUrl) {
  //               // Format date
  //               if (nameMaps[item] == "events") {
  //                 if (
  //                   !$("." + nameMaps[item] + "-list li > a")
  //                     .text()
  //                     .includes(e.title)
  //                 ) {
  //                   $(
  //                     "<li> <a target='_blank' href='" +
  //                       e.liveUrl +
  //                       "'><span data-url='" +
  //                       e.liveUrl +
  //                       "' data-date='" +
  //                       e.metaData.O +
  //                       "' class='item-dates'>" +
  //                       formatAsDate(e.metaData.O, "uk") +
  //                       "</span>" +
  //                       e.title +
  //                       "</a> " +
  //                       "<button title='Remove this item from saved list' class='no-icon remove-item'><i class='icons8-close'></i></button></li>"
  //                   ).insertBefore(
  //                     $("." + nameMaps[item] + "-list").find(
  //                       ".accordion-buttons"
  //                     )
  //                   );
  //                 }
  //               } else {
  //                 if (
  //                   !$("." + nameMaps[item] + "-list li > a")
  //                     .text()
  //                     .includes(e.title)
  //                 ) {
  //                   $(
  //                     "<li><a target='_blank' href='" +
  //                       e.liveUrl +
  //                       "'>" +
  //                       e.title +
  //                       "</a></li>"
  //                   ).insertBefore(
  //                     $("." + nameMaps[item] + "-list").find(
  //                       ".accordion-buttons"
  //                     )
  //                   );
  //                 }
  //               }
  //             } else {
  //               $(
  //                 "<li><a target='_blank' href='" +
  //                   e.url +
  //                   "'>" +
  //                   e.name +
  //                   "</a></li>"
  //               ).insertBefore(
  //                 $("." + nameMaps[item] + "-list").find(".accordion-buttons")
  //               );
  //             }
  //           });
  //         }
  //         if (itemsLength == 0) {
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .addClass("empty");
  //           $("." + nameMaps[item] + "-list").append(
  //             "<div class='empty-message'>Nothing here... <a target='_blank' href='" +
  //               noResultsUrl +
  //               "'>Add some!</a></div>"
  //           );
  //         } else {
  //           $("." + nameMaps[item] + "-list")
  //             .prev()
  //             .removeClass("empty");
  //           $("." + nameMaps[item] + "-list")
  //             .find(".empty-message")
  //             .hide();
  //         }
  //       }, 100);
  //     }
  //   }
  // }
  // checkSavedItems("savedEvents");
  // checkSavedItems("savedScholarships");
  // checkSavedItems("savedClubs");
  // checkSavedItems("savedPages");
  // checkSavedItems("savedPrizes");
  // // Trigger to open/close items in saved items
  // $(".group-title").on("click keyup", function (e) {
  //   if (e.which == 13 || e.which == 1) {
  //     $(this).toggleClass("active");
  //     if ($(this).hasClass("active")) {
  //       $(this).find("i").addClass("flipped");
  //     } else {
  //       $(this).find("i").removeClass("flipped");
  //     }
  //     $(this).next().slideToggle("fast");
  //   }
  // });


  var resizeTallBlip = function resizeTallBlip(el, hide) {
    if (hide) {
      $tallBlip.css({
        height: "0px"
      });
    } else {
      $tallBlip.css({
        top: el.offset().top - el.parents(".main-nav-list").offset().top,
        left: el.offset().left - $(".main-nav-list").offset().left,
        height: el.outerHeight()
      });
    }
  }; // !TAB BLIP MOVEMENT LOGIC


  var $tabBlip = $("nav.tray .tabs .blip");
  $("nav.tray .tabs .tab").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1 || e.type == "click") {
      $("nav.tray .tabs .tab").removeClass("active");
      $(this).addClass("active"); // Hide notification is there is one

      $(".menu-notifcations").hide();

      if ($(this).find(".notification")) {
        $(this).find(".notification").hide();
      }

      if ($(this).hasClass("t-menu")) {
        $(".tray-main-nav").show();
        $(".tray-sub-menu").show();
        $(".saved-menu").hide();
      } else {
        $(".tray-main-nav").hide();
        $(".tray-sub-menu").hide();
        $(".saved-menu").show();
      }
    }
  });
  $("nav.tray .tabs > div").on("mouseover click keyup", function (e) {
    if (e.type == "click" || e.type == "mouseover" || e.type == "keyup" && e.which == 13) {
      $tabBlip.css({
        left: $(this).offset().left - $("nav.tray .tabs").offset().left,
        width: $(this).outerWidth()
      });
    }
  });
  $("nav.tray .tabs").on("mouseout", function () {
    var activeItem = $("nav.tray .tabs .active").parent();

    if (activeItem.length) {
      $tabBlip.css({
        left: activeItem.offset().left - $("nav.tray .tabs").offset().left,
        width: activeItem.outerWidth()
      });
    }
  }); // !TRAY MENU BLIP

  var $tallBlip = $(".main-nav-list .tall-blip");
  $(".main-nav-list > li ").on("mouseenter click", function () {
    resizeTallBlip($(this));
  });
  $(".main-nav-list").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");

    if (!activeItem.length) {
      resizeTallBlip($(this), true);
    }
  });
  $(".tray-main-nav").on("mouseleave", function () {
    var activeItem = $(".main-nav-list > li.active");

    if (activeItem.length) {
      resizeTallBlip(activeItem);
    }
  }); // !CUSTOM DROPDOWN

  $(".custom-dropdown .selector").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      // If enter or left-click
      $(this).next().slideToggle("fast");
      $(this).toggleClass("open");
    }
  });
  $(".custom-dropdown ul li").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      // If enter or left-click
      // Clear open class on selector
      if ($(".custom-dropdown .selector").hasClass("open")) {
        $(".custom-dropdown .selector").removeClass("open");
      } // Toggle active class


      $(".custom-dropdown ul li").removeClass("active");
      $(this).addClass("active"); // Set text to value

      $(this).parent().prev().find(".selector-text").text($(this).data("name")); // Close list on click

      $(this).parent().slideToggle("fast");
      var text = $(this).data("name").toLowerCase();
      showSavedData(text);
    }
  });

  var showSavedData = function showSavedData(e) {
    $(".no-results").slideUp(); // Make titles visible

    $(".group-title").hide();
    $(".group-title").removeClass("active");
    $(".item-list").hide();
    var $toggler = $("." + e + "-title");
    $toggler.css("display", "flex");
    $toggler.toggleClass("active");

    if ($toggler.hasClass("active")) {
      $toggler.find("i").addClass("flipped");
    } else {
      $toggler.find("i").removeClass("flipped");
    }

    $toggler.next().slideToggle("fast");
  }; // !MAIN NAV LIST ACCORDIONS


  $(".tray .main-nav-item ul li").each(function (e) {
    var $element = $(this);

    if ($(this).find("ul").length > 0) {
      $element.addClass("has-submenu");
      $('<span tabindex="0" class="btn-expander mf-heatmap-click no-icon" title="Toggle subpages" role="button"></span>').insertAfter($element.find(">a"));
    }
  }); // Open on initial load

  if ($(".tray .main-nav-item > a.active")) {
    $(".tray .main-nav-item > a.active").parent().toggleClass("active");
    $(".tray .main-nav-item > a.active").parent().toggleClass("expanded");
    $(".tray .main-nav-item > a.active").parent().find(">ul").slideToggle();
  } // On top level menu click


  $(".tray .main-nav-item > .btn-expander").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      $(this).parent().toggleClass("expanded");
      $(this).parent().find(">a").toggleClass("active");

      if ($(this).parent().find(">a").hasClass("active")) {
        $(this).find("a").prop("disabled", false);
      } else {
        $(this).find("a").prop("disabled", true);
      } // Find any active/expanded children and close them


      $(this).parent().find(">ul .active").removeClass("active");
      $(this).parent().find(">ul .expanded").removeClass("expanded"); // Slide out main menu

      $(this).parent().find(">ul").slideToggle("fast", function () {
        // Resize blip
        var activeItem = $(this).parent();

        if (activeItem.length) {
          resizeTallBlip(activeItem);
        }
      });
    }
  }); // !INNER ACCORDION

  $(".tray .nav-item-parent.has-submenu .btn-expander").on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      // If enter or left-click
      var activeItem = $(".main-nav-item.active");
      setTimeout(function () {
        resizeTallBlip(activeItem);
      }, 300);
      $(this).parent().toggleClass("active");
      $(this).parent().find(">a").toggleClass("active");
      $(this).parent().toggleClass("expanded");
    }
  }); // Hint

  if (localStorage.getItem("newMenuNotice") !== "true" || !localStorage.getItem("newMenuNotice")) {
    setTimeout(function () {
      $(".hint").css("display", "flex").hide().fadeIn();
    }, 1500);
  } else {} // Clear


  $(".hint .acknowledgement").on("click", function () {
    localStorage.setItem("newMenuNotice", true);
    $(".hint").fadeOut();
  });

  if (window.location.search.includes("responsive=true")) {
    $(".tray").addClass("responsive-preview");
    toggleTray();
  } // setTimeout(() => {
  //   // Initial blip position
  //   var activeItem = $(".main-nav-list > li.active");
  //   if (activeItem.length) {
  //     $tallBlip.css({
  //       top:
  //         activeItem.offset().top -
  //         activeItem.parents(".main-nav-list").offset().top,
  //       height: activeItem.outerHeight(),
  //       left: activeItem.offset().left - $(".main-nav-list").offset().left,
  //     });
  //   }
  //   // Prune events
  //   var dateNow = new Date();
  //   $(".tray-content .events-list li ").each(function (e) {
  //     var eventExpiryMessage = $(
  //       "<div class='expired-text'>This event has expired</div>"
  //     );
  //     var $el = $(this).find("a span");
  //     if (dateNow > formatAsDate($el.attr("data-date"), "us")) {
  //       $el.append(eventExpiryMessage);
  //       $el.parent().attr("target", "");
  //       $el.parent().parent().addClass("expired");
  //     }
  //   });
  //   // TODO: Make pruning automatic, display message on open of event-list
  //   $(".tray-content .events-list li .remove-item").on("click", function () {
  //     var $el = $(this);
  //     var localObject = JSON.parse(localStorage.getItem("savedEvents"));
  //     // Return array of items where displayUrl !== clicked li href
  //     var filterdLocalObject = localObject.filter(function (item) {
  //       return item.displayUrl !== $el.prev().attr("href");
  //     });
  //     console.log(filterdLocalObject);
  //     $el.parent().slideUp();
  //     $el
  //       .parents(".item-list")
  //       .prev()
  //       .find(".count")
  //       .text(filterdLocalObject.length);
  //     localStorage.setItem("savedEvents", JSON.stringify(filterdLocalObject));
  //   });
  // }, 500);

}
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/urls.js
// Import 3rd party dependencies
var Url = __webpack_require__(15);
/**
 * An extension of the lightweight `Url.js` library
 * (https://github.com/jillix/url.js/).
 */


var extendedUrlManager = function ExtendUrlManager() {
  if (window.toolkitUrlManager) {
    // Available already - do not initialise again!
    return window.toolkitUrlManager;
  }
  /** PUBLIC METHODS */


  function onLoadWhenQueryExists(queryName, handlerFunction) {
    if (Url.queryString(queryName)) {
      if (window.onDocumentReadyFunctions) {
        window.onDocumentReadyFunctions.push(handlerFunction);
      } else {
        console.warn('`onDocumentReadyFunctions` Array is not available on the global scope - Cannot run the handler function for existing query `%s`.', queryName, handlerFunction);
      }
    }
  } // A) Extend the API of the Url.js


  Url.onLoadWhenQueryExists = onLoadWhenQueryExists; // B) Add the extended class to global scope

  window.toolkitUrlManager = Url; // C) Return the extended class.

  return Url;
}(); // Make the Factory available for Modular JS codebases


/* harmony default export */ var urls = (extendedUrlManager);
// EXTERNAL MODULE: ./node_modules/little-loader/lib/little-loader.js
var little_loader = __webpack_require__(7);
var little_loader_default = /*#__PURE__*/__webpack_require__.n(little_loader);

// EXTERNAL MODULE: ./node_modules/q/q.js
var q = __webpack_require__(3);
var q_default = /*#__PURE__*/__webpack_require__.n(q);

// CONCATENATED MODULE: ./node_modules/whatwg-fetch/fetch.js
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}

// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/lazyloader.js
// Import 3rd party dependencies


 // Import helpers


/**
 * @typedef {Object} ResourceSpec
 *
 * @property {String} url - Full URL of the resource.
 * @property {String} namespace - (Optional) If the requested resource is
 *    JavaScript attached to the `window` global Object, it allows to
 *    double-check whether it already exists to prevent extra download.
 * @property {function} onSuccess - (Optional) Function hook that
 *    triggers if the resource loads successfully.
 */

/**
 * A service module providing asynchronous retrieval of the
 * javascript files, CSS or JSON structures (from RESTful APIs).
 *
 * Can be accessed globally through `window.lazyLoader`
 * or imported/required as a JS module.
 *
 * @return {LazyLoadResources}
 */

var lazyLoaderService = function GetLazyLoader() {
  if (window.lazyLoader) {
    // Available already - do not initialise again!
    return window.lazyLoader;
  }
  /** @constant */

  /** PRIVATE MEMBERS */

  /**
   * Caches DOMElements or JSON Object of the resources that have been already
   * requested once before.
   */


  var resourcesCache = {};
  /** PRIVATE FUNCTIONS */

  /**
   * @param {string} url
   *
   * @returns {Element} `<link>` DOM element that was added.
   */

  function addCssToDom(url) {
    var link = document.createElement('link');
    link.href = url;
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);
    return link;
  }
  /**
   * Process and retrieve a resource from given resource specification.
   *
   * *Optimisations*:
   * A) If `*.js` file is requested and the `namespace` value is defined in the
   * resource specification, resource won't be lazy loaded (assuming the
   * library is already available).
   * B) All resources requested since the `lazyLoader` initialised are cached.
   * All subsequent requests on the same `url` in resource specification will
   * be loaded from the local cache.
   * C) A `*.css` file will not be loaded if an element `<link>` containing
   * `url` from resource specification is found in the DOM.
   *
   * @param {ResourceSpec} resourceSpecification
   *
   * @return {q.Promise}
   */


  function processResourceRequest(resourceSpecification) {
    var deferred = q_default.a.defer();
    var url = resourceSpecification.url,
        namespace = resourceSpecification.namespace,
        onSuccess = resourceSpecification.onSuccess;

    function resolveRequest(requestResult) {
      // Add to cache
      if (!hasProp(resourcesCache, url)) resourcesCache[url] = requestResult;
      deferred.resolve(requestResult);
      if (onSuccess) onSuccess(requestResult);
      return deferred.promise;
    } // 1. Check locally if the resource at `url` hasn't been already cached


    if (hasProp(resourcesCache, url)) return resolveRequest(resourcesCache[url]); // 2. Not available locally - Retrieve based on given type

    if (url.match(/.*\.js$/)) {
      // A) Javascript
      // Check locally if `namespace` doesn't already exist in the global scope.
      if (namespace && hasProp(window, namespace)) return resolveRequest(window[namespace]);
      little_loader_default()(url, function (err) {
        if (!err) {
          if (namespace && hasProp(window, namespace)) {
            resolveRequest(window[namespace]);
          } else {
            if (namespace) console.warn('Javascript might be loaded, but the library is not available on the given global scope/namespace `window.%s`!', namespace);
            resolveRequest(null);
          }
        } else {
          deferred.reject(err);
        }
      });
    } else if (url.match(/.*\.css$/)) {
      // B) CSS file
      var existingStylesheet = document.querySelector("link[href*=\"".concat(url, "\"]"));

      if (existingStylesheet) {
        resolveRequest(existingStylesheet);
      } else {
        resolveRequest(addCssToDom(url));
      }
    } else {
      // C) XHR with JSON response
      window.fetch(url, {
        credentials: 'same-origin',
        mode: 'cors'
      }).then(checkHttpStatus).then(function (response) {
        return response.json();
      }).then(function (responseJson) {
        resolveRequest(responseJson);
      }).catch(function (err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  }
  /** CONSTRUCTOR. */

  /**
   * Factory method that receives list of all resources (and configuration
   * details) that should be asynchronously loaded.
   *
   * @typedef {function} LazyLoadResources
   *
   * @param {Array<ResourceSpec>} resourcesSpecList
   * @param {function} onProcessedCallback
   */


  function loadResources(resourcesSpecList, onProcessedCallback) {
    // 1) Process all resource specifications and generate list of Promises
    var requestPromises = resourcesSpecList.map(function (resourceSpecification) {
      return processResourceRequest(resourceSpecification);
    }); // 2) When all resolve (or fail), execute the callback and pass errors if any

    q_default.a.allSettled(requestPromises).then(function (settledObjects) {
      var rejectionsList;
      settledObjects.forEach(function (settledObject) {
        if (settledObject.state === 'rejected') {
          if (!rejectionsList) rejectionsList = [];
          rejectionsList.push(settledObject.reason);
        }
      });
      onProcessedCallback(rejectionsList);
    }).catch(function (rejectionReason) {
      onProcessedCallback("Error when processing or retrieving the requested resources. ".concat(rejectionReason));
    }).done();
  }
  /** SERVICE */


  var serviceFactory = loadResources; // A) Make available for vanilla JS

  window.lazyLoader = serviceFactory; // B) Return the Service function

  return serviceFactory;
}(); // Make the Service available for Modular JS codebases


/* harmony default export */ var lazyloader = (lazyLoaderService);
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/modules/core.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Import other standalone libraries



var envConfig = __webpack_require__(18);
/**
 * A collection of shareable lightweight libraries and functions
 * requiring no external dependencies, reusable across multiple
 * templates and environments. Can be also use as a lightweight
 * alternative to the beefy `toolkit.js`.
 */

/* Hide levy info on courses page */


function waitForElm(selector) {
  return new Promise(function (resolve) {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    var observer = new MutationObserver(function (mutations) {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
} // Hide link for bots in case bot-version of page gets cached, e.g. on /events


if (document.getElementById("clickLinks")) {
  if (!navigator.userAgent.match(/baidu|bing|msn|teoma|slurp|yandex|funnelback/i)) {
    document.getElementById("clickLinks").style.display = "none";
  }
}

var searchParams = new URLSearchParams(window.location.search);

function hideCourseLevies() {
  if (window.location.pathname.includes("/courses/")) {
    var updateLocation = function updateLocation() {
      // console.log(feeLocation.value);
      feeLocation.addEventListener("change", function (e) {
        setLevyText();
      });
    };

    var removeLevies = function removeLevies() {
      var assLevy = document.querySelector(".fees-est .cost-items > div:nth-child(3)");
      var servLevy = document.querySelector(".fees-est .cost-items > div:nth-child(4)");
      var totalLevy = document.querySelector(".cost-items > div:last-child");
      assLevy ? assLevy.remove() : null;
      servLevy ? servLevy.remove() : null;
      totalLevy ? totalLevy.remove() : null;
    };

    var setLevyText = function setLevyText() {
      if (feeLocation.value == "domestic") {
        var levyText = "You will also pay an annual <a href=\"https://www.wgtn.ac.nz/students/money/fees/student-services-levy-faqs\">Student Services Levy</a>.";
        $(".levy-text").html(levyText);
      } else {
        var _levyText = "You will also pay an annual <a href=\"https://www.wgtn.ac.nz/students/money/fees/student-services-levy-faqs\">Student Services Levy</a>.";
        $(".levy-text").html(_levyText);
      }
    };

    // searchParams.has('leviesTest')
    // console.log('is courses', window.location.pathname.includes('/courses/'));
    // console.log('hide levies');
    // console.log( searchParams.has('leviesTest')  );
    // $('.fees-est').hide();
    // let assLevy = document.querySelector('.fees-est .cost-items > div:nth-child(3)');
    // let servLevy = document.querySelector('.fees-est .cost-items > div:nth-child(4)');
    // let totalLevy = document.querySelector('.cost-items > div:nth-child(6)');
    $(".clear-cart-wrap").first().before('<p style="margin-top: .5rem; font-size: .9rem;" class="levy-text"></p>');
    var feeLocation = document.querySelector("#fees-type");
    removeLevies();
    document.querySelector(".fees-est").addEventListener("DOMNodeInserted", function (event) {
      feeLocation = document.querySelector("#fees-type"); // console.log('content change', event.target);

      if (document.querySelector(".fees-est .cost-items > div:nth-child(3)")) {
        removeLevies();
        updateLocation();
      }
    }, false);
    updateLocation();
    setLevyText();
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  waitForElm(".course-item-list").then(function () {
    // console.log('hide');
    hideCourseLevies();
  });
}); // Check toolbar for mode=dev and apply class

if (document.location.href.includes("?mode=dev") || document.location.href.includes("local.wgtn") || document.location.href.includes("assets/git_bridge/0009/1778031/dist")) {
  $("body").attr("id", "hubv4");
} // Check toolbar to ensure myTools has been updated to Puaha


if (document.location.pathname.split("/")[1] == "courses" || document.location.pathname.split("/")[1] == "explore") {
  if ($("header ul[role=menubar]")) {
    $("header ul[role=menubar] > li > a").each(function (e) {
      var text = $(this).text(); // Update link if mytools

      if (text.includes("myTools") || text.includes("—Student Portal")) {
        var $el = $(this);
        $el.text("Pūaha");
        $el.attr("href", "https://puaha.wgtn.ac.nz/signin");
        $el.attr("title", "Pūaha");
      }
    });
  }
} else {
  $("header .menu-bar > a").each(function (e) {
    var text = $(this).text(); // Update link if mytools

    if (text.includes("myTools") || text.includes("—Student Portal")) {
      var $el = $(this);
      $el.text("Pūaha");
      $el.attr("href", "https://puaha.wgtn.ac.nz/signin");
      $el.attr("title", "Pūaha");
    }
  });
}
/* END Hide levy info on courses page */


function initToolbarUrlListeners() {
  urls.onLoadWhenQueryExists("toolbar", function () {
    if (window.toolkitToolbarLoader) window.toolkitToolbarLoader("https://www.wgtn.ac.nz/api/toolbar/staff");
  });
  urls.onLoadWhenQueryExists("mytools", function () {
    if (window.toolkitToolbarLoader) document.location.href = "https://puaha.wgtn.ac.nz/signin";
  });
} // eslint-disable-next-line import/prefer-default-export

function initToolbarLoader(extraDependenciesList) {
  var WINDOW_NAMESPACE_TOOLBAR_LOADER = "toolkitToolbarLoader",
      WINDOW_NAMESPACE_TOOLBAR = "toolkitToolbar",
      minifiedString = envConfig.name === "production" ? ".min" : "",
      URL_SCRIPT_TOOLBAR = "//".concat(envConfig.server.host).concat(envConfig.name === "development" ? ":".concat(envConfig.server.port) : "", "/toolkit.toolbar").concat(minifiedString, ".js"); // Public API endpoint

  window[WINDOW_NAMESPACE_TOOLBAR_LOADER] = function (configObjectOrUrl) {
    // 1) Assemble dependencies
    var configEndpointUrl = typeof configObjectOrUrl === "string" ? configObjectOrUrl : null;
    var configObject = _typeof(configObjectOrUrl) === "object" ? configObjectOrUrl : undefined;
    var toolbarDependenciesList = [{
      url: URL_SCRIPT_TOOLBAR,
      namespace: WINDOW_NAMESPACE_TOOLBAR
    }];

    if (extraDependenciesList && extraDependenciesList.length > 0) {
      extraDependenciesList.forEach(function (extraDependency) {
        return toolbarDependenciesList.push(extraDependency);
      });
    }

    if (!configObject && configEndpointUrl) {
      // Config & data model's URL is available - add it to the dependencies
      toolbarDependenciesList.push({
        url: configEndpointUrl,
        onSuccess: function onSuccess(responseObject) {
          configObject = responseObject;
        }
      });
    } else if (!configObject) {
      // Nor config & data model object -or- RESTful API is available
      console.error("A toolbar requires valid configuration and model object or URL (%s) to the RESTful API endpoint that would return this object. Toolbar dialog will not be opened.", configEndpointUrl, configObject);
      return;
    } //TODO: 2) Turn on full screen loading service
    // 3) Load all dependencies asynchronously (skip if already available yet)


    lazyloader(toolbarDependenciesList, function (errors) {
      // TODO: 4) Turn off full screen loading service
      // All dependencies *MUST BE* loaded, otherwise skip the initialisation
      if (!errors) {
        // 5A) Init and open
        var toolbarManager = window[WINDOW_NAMESPACE_TOOLBAR];

        if (toolbarManager) {
          try {
            var toolbarInstance = toolbarManager.initToolbar(configObject);
            toolbarInstance.show();
          } catch (err) {
            console.error(err);
          }
        } else {
          console.error("Toolbar library is not available on the global scope (window.".concat(WINDOW_NAMESPACE_TOOLBAR, ") - the toolbar dialog will not be initialised and opened."));
        }
      } else {
        // 5B) Report errors
        console.error("Unable to lazy load all the dependencies required to initialise and open the Toolbar dialog.", errors);
      }
    });
  };
} // Expose to the global scope

window.toolkitCore = {
  initToolbarUrlListeners: initToolbarUrlListeners,
  initToolbarLoader: initToolbarLoader
};
// CONCATENATED MODULE: ./src/assets/toolkit/scripts/toolkit.js
/** !Toolkit's core JS */

/* DEPENDENCIES & 3RD PARTY LIBRARIES IMPORTS */





 // Include all standalone modules




 // Core libs

 // Import helpers

 // Initialise dependencies

trackerConfig({
  autoRegister: true
}); // Export useful dependencies to the global namespace (~ window) so that
//  they can be used outside of this toolkit.

/* harmony default export */ var toolkit = __webpack_exports__["default"] = ({});

__webpack_require__(19); // TODO: set up multiple entry points for webpack bundles


__webpack_require__(20);

external_jQuery_default()(".select").select2();
/* CONSTANT ATTRIBUTES */

var TRANSITION_TIMEOUT = 200; // update in _settings.variables.scss(135)

var MOBILE_LARGE_AND_SMALLER = "screen and (max-width: 42.99em)",
    // update in _settings.responsive.scss(57)
toolkit_DESKTOP_AND_LARGER = "screen and (min-width: 61em)",
    toolkit_TABLET_AND_SMALLER = "screen and (max-width: 975px)",
    // Iframe selectors
YOUTUBE_IFRAME_SELECTOR = 'iframe[src*="youtube"]',
    GMAPS_IFRAME_SELECTOR = 'iframe[src*="/maps/"]',
    VIMEO_IFRAME_SELECTOR = 'iframe[src*="vimeo"]';
/* SUPPORTING FUNCTIONS */

/** Wrap YT videos in .embed wrapper that helps with responsiveness. */

function wrapEmbeddedIframes() {
  var iframes = external_jQuery_default()("".concat(YOUTUBE_IFRAME_SELECTOR, ", ").concat(GMAPS_IFRAME_SELECTOR, ", ").concat(VIMEO_IFRAME_SELECTOR)),
      singleIframe = null,
      iframeClasses;
  iframes.each(function (index) {
    singleIframe = external_jQuery_default()(this); // If it doesn't already have wrapper, wrap it!

    if (!singleIframe.parent().hasClass("embed")) {
      iframeClasses = singleIframe.attr("class") || "";
      singleIframe.wrap("<div class=\"embed ".concat(iframeClasses, "\"></div>"));
      if (iframeClasses) singleIframe.removeClass();
    }
  });
}
/** Deletes all study areas tiles that are display: none from DOM to
keep the markup clean (and easily handled by the CSS) */


function removedUnusedTiles() {
  external_jQuery_default()(".tiles-wrap .tile").each(function () {
    if (external_jQuery_default()(this).css("display") == "none") {
      external_jQuery_default()(this).remove();
    }
  });
}

var SIDEMENU_CLASS = "sidemenu";
var SIDEMENU_TOGGLE_CLASS = "sidemenu-toggle";
var SIDEMENU_EXPANDER_CLASS = "btn-expander";
var SIDEMENU_SUBMENU_CLASS = "has-submenu";
var SIDEMENU_SELECTED_ITEM_CLASS = "active";
var SIDEMENU_EXPANDED_CLASS = "expanded";
var pageName = external_jQuery_default()("main h1").first().text();
/** PRIVATE FUNCTIONS. */

function initExpandableSubmenu() {
  var _this = this;

  var expandableButtonElement = external_jQuery_default()(this);
  var submenuContainer = expandableButtonElement.parent(".".concat(SIDEMENU_SUBMENU_CLASS)); // Open item of current page
  // Init default state

  var isExpanded = submenuContainer.hasClass(SIDEMENU_SELECTED_ITEM_CLASS);

  function apply(topLevel, clickedEl) {
    if (clickedEl && !clickedEl.parent().hasClass("expanded")) {
      if (topLevel) {
        // Remove others
        var expandedLi = external_jQuery_default()(".sidebar > nav > ul > li.expanded");
        expandedLi.find(">ul").css("max-height", "0px");
        external_jQuery_default()(".sidebar > nav > ul li.has-submenu.expanded").not(submenuContainer).removeClass("expanded");
      } else {
        console.log("===== INNER EXPANDER CLICKED ====");
      }

      submenuContainer.addClass(SIDEMENU_EXPANDED_CLASS);
      var expandedLi = external_jQuery_default()(".sidebar > nav > ul > li.expanded");
      var listLength = expandedLi.find("> ul > li").length;
      expandedLi.find(">ul").css("max-height", expandedLi.outerHeight() + 100 * listLength + "px");
    } else {
      // !CLOSE ITEM
      var expandedLi = external_jQuery_default()(".sidebar > nav > ul > li.expanded");
      submenuContainer.removeClass(SIDEMENU_EXPANDED_CLASS);

      if (topLevel) {
        submenuContainer.find(SIDEMENU_EXPANDED_CLASS).removeClass(SIDEMENU_EXPANDED_CLASS);
        expandedLi.find(">ul").css("max-height", "0px");
      }
    }
  } // Init
  // apply(true, $(".sidebar > nav > ul > li.active > .btn-expander"));
  // Bind `click` events to all expandable buttons
  // expandableButtonElement.on("click", (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   isExpanded = !isExpanded;
  //   apply();
  // });
  // Click event for expand buttons in SIDEMENU only


  expandableButtonElement.on("click keyup", function (e) {
    if (e.which == 13 || e.which == 1) {
      e.preventDefault();
      e.stopPropagation();
      isExpanded = !isExpanded;
      var topLevel = false;
      var clickedButton = external_jQuery_default()(_this); // !TOP LEVEL

      if (clickedButton.parent().parent().parent().hasClass("sidemenu")) {
        topLevel = true;
      }

      apply(topLevel, clickedButton);
    }
  });
}

function initSidemenuExpandability(menuClass) {
  var menuElement = external_jQuery_default()(".".concat(menuClass));
  enhanceSidemenu(menuElement);
  var matches = 0;
  external_jQuery_default()("." + SIDEMENU_CLASS).find("a").each(function () {
    var linkText = external_jQuery_default()(this).text(); // var matches is needed so that multiple menus don't open when there are duplicate links

    if (linkText == pageName && matches < 1) {
      matches++;
      external_jQuery_default()(this).addClass("active");
      external_jQuery_default()(this).parents("li").addClass("active expanded");
    }
  }); // Expanding/Collapsing of the entire side menu on mobile devices

  menuElement.children(".".concat(SIDEMENU_TOGGLE_CLASS)).children("a").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    external_jQuery_default()(this).parent().toggleClass(SIDEMENU_EXPANDED_CLASS);
  });
  var expandableButtons = menuElement.find(".".concat(SIDEMENU_EXPANDER_CLASS)); // Add tracking if enabled

  if (tracker.shouldTrackElement(menuElement)) {
    tracker.registerForTracking(menuElement.find("li > a"), "click", "sidemenu-link");
    tracker.registerForTracking(expandableButtons, "click", "sidemenu-expander");
  }

  expandableButtons.each(initExpandableSubmenu); // Ensure expander height is the same as the link (for long link titles than span across 2+ lines)

  src_default.a.register(toolkit_DESKTOP_AND_LARGER, function () {
    external_jQuery_default()(".sidemenu > ul > li").each(function (e) {
      var link = external_jQuery_default()(this).find(">a");
      var expander = external_jQuery_default()(this).find("> .btn-expander");
      expander.css("height", link.outerHeight());
    });
  });
} // TODO: Remove after this was implemented on the backend (~ in Squiz)

/** Adds necessary classes and expanding/collapsing elements if the item has got submenu. */


var btnExpanderHtml = '<span tabindex="0" class="btn-expander mf-heatmap-click" title="Toggle subpages" role="button"></span>';

function enhanceSidemenu(menuElement) {
  menuElement.find("li").each(function () {
    var listItem = external_jQuery_default()(this); // a) already has got a proper class in place? Skip!

    if (listItem.hasClass(SIDEMENU_SUBMENU_CLASS)) return; // b) No submenu in <li>? Skip!

    if (listItem.children("ul").length === 0) return; // c) Has got a submenu => Enhance sidemenu's HTML

    listItem.addClass(SIDEMENU_SUBMENU_CLASS);
    external_jQuery_default()(btnExpanderHtml).insertAfter(listItem.children("a"));
  });
}
/** HELPERS */
// FIXME: Should be automatically pre-populated from the build/build.config.js


var ENV_HOSTNAME = {
  STAGE: "cms.wgtn.ac.nz",
  PROD: "www.wgtn.ac.nz",
  LOCAL: "local.wgtn.ac.nz"
}; // FIXME: Should be automatically pre-populated from the build/build.config.js

var URL_BASE = {
  TOOLKIT: "local.wgtn.ac.nz:8080"
};

function isAdminEnvironment() {
  return window.location.hostname === ENV_HOSTNAME.STAGE || window.location.hostname === ENV_HOSTNAME.LOCAL;
}
/**
 * Decodes email address into re-usable form.
 *
 * @deprecated Very old approach that won't work today - do not use.
 */


function decodeMailAddresses() {
  var a = "dre:ams0of@g1niht.lp2c9u3v8k4w7y5j6zbx-_qfntigue6los5zar7b:y4dp8v3m9h2.x1w@k0jcq-_";
  var i, h, j, k, l, m, n, s;

  for (i = 0; i < document.links.length; i += 1) {
    h = document.links[i].hash;

    if (h.substring(0, 3) == "#sd") {
      k = "";
      l = h.substring(3, 5);
      m = h.lastIndexOf("?subject=");

      if (m == -1) {
        s = document.links[i].href;
      } else {
        s = h.substring(m);
        h = h.substring(0, m);
      }

      for (j = 5; j < h.length; j += 2) {
        k += a.charAt(h.substring(j, j + 2) - l - 1);
      }

      m = s.lastIndexOf("?subject=");

      if (m == -1) {
        document.links[i].href = k;
      } else {
        document.links[i].href = k + s.substring(m);
      }

      n = document.links[i].innerHTML;

      if (n == "address") {
        document.links[i].innerHTML = k.substring(7);
      } else {
        document.links[i].title = k.substring(7);
      }
    }
  }
}
/** MESSAGE/NOTIFICATIONS HANDLING */


var ERROR_TYPES = {
  SIDEBAR_WIDGETS_COUNT_EXCEEDED: "sidebar-widgets-count-exceeded"
};
/**
 * Renders the error message notification and adds it to the top of the
 * content window. Will show only to administrators within non-production
 * environments.
 *
 * @param {{type: string, message: string, invalidItems: Array[string]}} errorObject
 *
 * @returns {void}
 */

function showAdminErrorMessage(errorObject) {
  if (!errorObject || !isAdminEnvironment()) return;
  var invalidItemsListHtml;

  if (errorObject.invalidItems.length > 0) {
    invalidItemsListHtml = "\n      <ul>\n        <li>".concat(errorObject.invalidItems.join("</li><li>"), "</li>\n      </ul>\n    ");
  } // Template


  var errorNotificationHtml = "\n    <section class=\"flash-message error\">\n      ".concat(errorObject.message, "\n      ").concat(invalidItemsListHtml, "\n    </section>\n  ");
  external_jQuery_default()(".content-panel > main > .formatting").prepend(errorNotificationHtml);
  console.error("Content-related error has occured", errorObject);
}
/** NAVIGATION */

/**
 * Adds the 'active' class to a main menu item
 * that corresponds with the current top-level URL path
 * segment.
 *
 * Note: This is *only* done due to Squiz 5.4 limitations. Once we can render
 * this class on the backend, this function can be deprecated.
 */


function addActiveClassToMainMenu() {
  // [url-path-segment]: [nav-item-classname]
  var rootPages = {
    study: "future",
    international: "international",
    students: "current",
    research: "research",
    engage: "engage"
  },
      urlPathSegments = window.location.pathname.split("/");

  if (urlPathSegments.length > 1 && urlPathSegments[1] !== "" && hasProp(rootPages, urlPathSegments[1])) {
    var activeNavItemClass = rootPages[urlPathSegments[1]];
    var activeNavItem = document.querySelector(".menu-bar .".concat(activeNavItemClass));
    if (activeNavItem) activeNavItem.classList.add("active");
  }
}
/** CONTENT DYNAMIC MANIPULATIONS */

/**
 * Moves `non-staff` contact cards into the previous/next <ul> with
 * regular staff.
 *
 * @deprecated This approach should not be used in new updates! Please, follow
 * clear syntax, so you don't have to move elements around.
 *
 * Notice: This is required to deal with structural and visual
 * inconsistencies that stem from legacy code that powers rendering
 * of non-staff contact cards. Once this is removed, this slow
 * function can be removed too.
 */


var STAFF_LIST_CONTAINER_CLASSNAME = "articles-container",
    STAFF_LIST_CLASSNAME = "staff-list",
    STAFF_CONTACT_CLASSNAME = "contact";

function moveOrphanedStaffCardIntoList() {
  var orphanBeforeStaffList = document.querySelector(".".concat(STAFF_CONTACT_CLASSNAME, " + .").concat(STAFF_LIST_CONTAINER_CLASSNAME));
  var orphanAfterStaffList = document.querySelector(".".concat(STAFF_LIST_CONTAINER_CLASSNAME, " + .").concat(STAFF_CONTACT_CLASSNAME));
  if (!orphanBeforeStaffList && !orphanAfterStaffList) return;

  while (orphanAfterStaffList) {
    var orphanedStaffCardElement = external_jQuery_default()(orphanAfterStaffList);
    var staffListElement = orphanedStaffCardElement.prev().children(".".concat(STAFF_LIST_CLASSNAME));

    if (staffListElement.length === 0) {
      // Staff list is not within its container - abort
      console.warn("The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *previous* block does not contain '".concat(STAFF_LIST_CLASSNAME, "' class. You might experience visual inconsistencies."), orphanAfterStaffList, staffListElement);
      return;
    }

    var listItem = external_jQuery_default()("<li></li>").append(orphanedStaffCardElement);
    staffListElement.append(listItem);
    orphanAfterStaffList = document.querySelector(".".concat(STAFF_LIST_CONTAINER_CLASSNAME, " + .").concat(STAFF_CONTACT_CLASSNAME));
  } // Has to be re-evaluated again to reflect the previous content manipulations


  orphanBeforeStaffList = document.querySelector(".".concat(STAFF_CONTACT_CLASSNAME, " + .").concat(STAFF_LIST_CONTAINER_CLASSNAME));

  while (orphanBeforeStaffList) {
    var _orphanedStaffCardElement = external_jQuery_default()(orphanBeforeStaffList).prev(".".concat(STAFF_CONTACT_CLASSNAME)); // Current selector is pointing to the <ul> - point to the previous sibling instead!


    var _staffListElement = _orphanedStaffCardElement.next().children(".".concat(STAFF_LIST_CLASSNAME));

    if (_staffListElement.length === 0) {
      // Staff list is not within its container - abort
      console.warn("The 'non-staff' profile could not be placed within the list of other 'staff' profiles, beceause the *following* block does not contain '".concat(STAFF_LIST_CLASSNAME, "' class. You might experience visual inconsistencies."), _orphanedStaffCardElement, _staffListElement);
      break;
    }

    var _listItem = external_jQuery_default()("<li></li>").append(_orphanedStaffCardElement);

    _staffListElement.prepend(_listItem);

    orphanBeforeStaffList = document.querySelector(".".concat(STAFF_CONTACT_CLASSNAME, " + .").concat(STAFF_LIST_CONTAINER_CLASSNAME));
  }
}
/**
 * Because two sets of taught courses are rendered (one located at the top
 * of the page, one at the bottom), it hides the other, non-used counterpart.
 *
 * @deprecated
 *
 * Note: This is legacy code and can be removed when the backend renders
 * only one set of taught courses.
 */


function hideCoursesOnStaffProfile() {
  if (!window.courseLocation) return;

  if (window.courseLocation === "top") {
    external_jQuery_default()("#courses-bottom").css({
      display: "none"
    });
  }

  if (window.courseLocation === "bottom") {
    external_jQuery_default()("#courses-top").css({
      display: "none"
    });
  }
}
/** CONTENT SIDE-BAR */
// Constants


var SIDEBAR_WIDGET_CLASSNAME = "data-sidebar",
    SIDEBAR_ID = "rightHandMenu",
    SIDEBAR_WIDGETS_MAX = 3,
    WIDGET_LINKS_CLASSNAME = "data-relatedLinks";
/**
 * Finds all widget blocks within the main content and moves them into the
 * right-hand sidebar.
 *
 * Note: This is *only* done due to Squiz 5.4 limitations. Once we can render
 * widgets into the sidebar on our backend, this client-side solution can be
 * deprecated.
 *
 * @returns {void}
 */

function moveWidgetsToSidebar() {
  // No widgets OR sidebar available -> Skip!
  if (!document.querySelector(".".concat(SIDEBAR_WIDGET_CLASSNAME)) || !document.getElementById(SIDEBAR_ID)) return; // Members
  // Original, unordered widgets

  var widgetsToMove = external_jQuery_default()(".".concat(SIDEBAR_WIDGET_CLASSNAME)),
      sidebarElement = external_jQuery_default()("#".concat(SIDEBAR_ID)); // Correctly ordered and prepared to be rendered

  var widgetsMoved = [];
  var error;
  widgetsToMove.each(function moveWidgetToSidebar() {
    var widgetElement = external_jQuery_default()(this);

    if (widgetsMoved.length >= SIDEBAR_WIDGETS_MAX) {
      if (!error) {
        error = {
          type: ERROR_TYPES.SIDEBAR_WIDGETS_COUNT_EXCEEDED,
          message: "\n              <h2>Too many elements in the sidebar</h2>\n              <p>Currently added: ".concat(widgetsToMove.length, ", Maximum: ").concat(SIDEBAR_WIDGETS_MAX, ".</p>\n              <p>\n                <strong>Please remove the class '").concat(SIDEBAR_WIDGET_CLASSNAME, "' from all blocks you do not want to appear in the sidebar.</strong>\n              </p>\n              <p>\n                The blocks with following content will not be shown in the sidebar:\n              </p>\n            "),
          invalidItems: []
        };
      }

      error.invalidItems.push(this.id || "".concat(widgetElement.text().trim().substring(0, 80), "..."));
      return;
    }

    if (widgetElement.hasClass(WIDGET_LINKS_CLASSNAME)) {
      // A) Staff profile - add to the top!
      widgetsMoved.unshift(widgetElement);
    } else {
      // B) Others (downloads, publications etc.) - Add to the last positions
      widgetsMoved.push(widgetElement);
    } // Remove from its original location


    widgetElement.detach(); // Remove `display:none` if it exists

    widgetElement.css("display", "");
  }); // Render widgets in the sidebar

  sidebarElement.append.apply(sidebarElement, widgetsMoved); // Render errors, if any

  if (error) showAdminErrorMessage(error);
}
/** 'GO UP' BUTTON */


var BTN_UP_ID = "btn-up",
    BTN_ADMIN_EDIT_ID = "btn-admin",
    // ADMIN_URL_EXTENSION = '_edit', // Uncomment if the button and URL cannot be rendered by Squiz!
SCROLL_ANIMATION_DURATION_IN_MS = 700;

function initFloatingButtons() {
  var buttonUpElement = document.getElementById(BTN_UP_ID),
      buttonAdminElement = isAdminEnvironment() ? document.getElementById(BTN_ADMIN_EDIT_ID) : null;

  if (buttonUpElement) {
    external_jQuery_default()(buttonUpElement).click(function (e) {
      e.preventDefault();
      external_jQuery_default()("html,body").animate({
        scrollTop: 0
      }, SCROLL_ANIMATION_DURATION_IN_MS);
    });
  }

  if (buttonAdminElement) {
    external_jQuery_default()(buttonAdminElement).css("display", ""); // Remove inline 'display'
    // Uncomment if the button and URL cannot be rendered by Squiz!
    // $( buttonAdminElement ).click( ( e ) => {
    //  e.preventDefault();
    //    window.location.href += `/${ADMIN_URL_EXTENSION}`;
    // })
  }
}

function victoriousHeader() {
  if (external_jQuery_default()(".victorious-header").length) {
    // console.log('vistorious test');
    var header = document.querySelector(".victorious-header");
    console.log(header.offsetHeight);
    var options = {
      // vertical offset in px before element is first unpinned
      offset: 10,
      // scroll tolerance in px before state changes
      tolerance: 10,
      // css classes to apply
      classes: {
        // when element is initialised
        initial: "",
        // when scrolling up
        pinned: "headroom--pinned",
        // when scrolling down
        unpinned: "headroom--unpinned",
        // when above offset
        top: "headroom--top",
        // when below offset
        notTop: "header-shrink",
        // whe  n at bottom of scoll area
        bottom: "headroom--bottom",
        // when not at bottom of scroll area
        notBottom: "headroom--not-bottom"
      }
    };
    var headroom = new headroom_default.a(header, options);

    if (external_jQuery_default()(".victorious-expand").length) {
      headroom.init();
    } // toggle issues in nav


    external_jQuery_default()(".past-issues a").on("click", function () {
      external_jQuery_default()(".issues").slideToggle();
      external_jQuery_default()(this).find("span").toggleClass("icon-caret-right").toggleClass("icon-caret-down");
    });
  } else {
    return;
  }
}
/** INITIALISE ON SCRIPT LOAD. */


(function init() {
  initToolbarLoader();
  initToolbarUrlListeners();
})();
/** INITIALISE ON DOM LOAD. */


external_jQuery_default()(function () {
  moveWidgetsToSidebar();
  addActiveClassToMainMenu();
  moveOrphanedStaffCardIntoList();
  tooltips.initTooltips(); // FIXME: Extract out to a standalone plugin and run on staff profiles *only*

  hideCoursesOnStaffProfile();
  var $body = external_jQuery_default()("body"),
      $globalNav = external_jQuery_default()("#global-nav"),
      $globalSearch = external_jQuery_default()("#global-search");
  /** Init side-menu, if it's present */

  if (external_jQuery_default()(".".concat(SIDEMENU_CLASS)).length) {
    initSidemenuExpandability(SIDEMENU_CLASS);
  } // ***************************
  // Init homepage side megamenu
  // ***************************


  if (external_jQuery_default()(".sidemenu-homepage").length) {
    src_default.a.register(toolkit_TABLET_AND_SMALLER, function () {
      console.log("sidemenu-homepage");
      initSidemenuExpandability("sidemenu-homepage"); // console.log('tray is small size for mob');
    });
    var $sidemenuHomepage = external_jQuery_default()(".sidemenu-homepage");
    enhanceSidemenu($sidemenuHomepage);
  } // initSidemenuExpandability( 'horizontal-menu' );
  // ***************************
  // Init horizontal megamenu
  // ***************************


  if (external_jQuery_default()(".show-mega-menu-top").length) {
    src_default.a.register(toolkit_TABLET_AND_SMALLER, function () {
      console.log("show-mega-menu-top");
      initSidemenuExpandability("mega-sub-menu"); // console.log('tray is small size for mob');
    });
    enhanceSidemenu(external_jQuery_default()(".mega-sub-menu"));
  }

  if (external_jQuery_default()(".header-tray").length) {
    // console.log('init tray');
    initTray();
  }

  victoriousHeader(); // if (
  //   window.skrollr &&
  //   $(window).width() > 800 &&
  //   !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //     navigator.userAgent
  //   )
  // ) {
  //   window.onload = function () {
  //     let s = skrollr.init({
  //       smoothScrolling: true,
  //       render: function () {
  //         // console.log('skrollr init');
  //       },
  //     });
  //   };
  //   if (s.isMobile()) {
  //     s.destroy();
  //   }
  //   $(window).on('resize', () => {
  //     if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { // no reason to destroy on mobile
  //       if ($(window).width() <= 800) {
  //         skrollr.init().destroy(); // skrollr.init() returns the singleton created above
  //       }
  //     }
  //   });
  // }

  initFloatingButtons();
  decodeMailAddresses(); // http://wicky.nilia.ms/enquire.js/
  // TODO: Refactor and extract to its own library
  // enquire.register( MOBILE_LARGE_AND_SMALLER, () => {
  //   if ( $globalNav.length ) {
  //     const eGlobalNav    = $globalNav[0],
  //       bannerHeaderElement = $( '.site-header' ),
  //       sidemenu            = $( '.sidemenu' );
  //     const headroom  = new Headroom( eGlobalNav, {
  // 		  offset:    $globalNav.outerHeight(),
  //       // or scroll tolerance per direction
  //       tolerance: {
  //         down: 5,
  //         up:   20,
  //       },
  //       classes: {
  //         initial:  'sticky',
  //         pinned:   'slide-down',
  //         unpinned: 'slide-up',
  //         notTop:   'no-top',
  //       },
  //     });
  //     headroom.init();
  //     const disableHeadroom = () => {
  //       if ( headroom ) {
  //         headroom.scroller.removeEventListener( 'scroll', headroom.debouncer, false );
  //       }
  //     };
  //     const enableHeadroom = () => {
  //       if ( headroom ) {
  //         headroom.scroller.addEventListener( 'scroll', headroom.debouncer, false );
  //       }
  //     };
  //     const removeMenuOutClickListener = () => {
  //       document.removeEventListener( 'click', menuOutsideClickListener );
  //     };
  //     const registerMenuOutClickListener = () => {
  //       document.addEventListener( 'click', menuOutsideClickListener );
  //     };
  //     const toggleMobileMenu = () => {
  //       $globalNav.find( '.tcon' ).toggleClass( 'tcon-transform' );
  //       $globalNav.toggleClass( 'is-open' );
  //       if ( !headroom ) return;
  //       if ( $globalNav.hasClass( 'is-open' )) {
  //         disableHeadroom();
  //         $body.addClass( 'unscrollable' );
  //         registerMenuOutClickListener();
  //       } else {
  //         enableHeadroom();
  //         $body.removeClass( 'unscrollable' );
  //         removeMenuOutClickListener();
  //       }
  //     };
  //     function menuOutsideClickListener( event ) {
  //       if ( !$( event.target ).closest( '#global-nav' ).length ) {
  //         toggleMobileMenu();
  //       }
  //     }
  //     $body.on( 'click ', '.js-toggle-global-nav', ( _event ) => {
  //       toggleMobileMenu();
  //     });
  //   }
  // });
  // Opens/closes global search bar & gains auto-focus

  $body.on("click ", ".js-toggle-global-search", function (_event) {
    var $this = external_jQuery_default()(this);

    if ($this.data("js-has-active-transition")) {
      return false;
    }

    $this.data("js-has-active-transition", true);
    $this.find(".tcon").toggleClass("tcon-transform");

    if ($globalSearch.hasClass("is-open")) {
      $globalSearch.toggleClass("is-open", false);
      setTimeout(function () {
        $this.data("js-has-active-transition", false);
      }, TRANSITION_TIMEOUT);
    } else {
      $globalSearch.toggleClass("is-open", true);
      setTimeout(function () {
        $globalSearch.find("input:text").focus();
        $this.data("js-has-active-transition", false);
      }, TRANSITION_TIMEOUT);
    }

    _event.preventDefault();
  }); // Study areas tabs toggle

  external_jQuery_default()("#study-area-tabs li a").click(function () {
    if (external_jQuery_default()(this).parent().hasClass("active")) {
      return;
    }

    external_jQuery_default()(".active").removeClass("active");
    external_jQuery_default()(this).parent().addClass("active");
    external_jQuery_default()(".study-areas").toggleClass("hidden");
    external_jQuery_default()(".degrees-quals").toggleClass("hidden");
  });
  /* Show the tab content that is selected */

  if (document.getElementById("undergraduate") && document.getElementById("undergraduate").checked) {
    switchTabToUndergrad();
  } else if (document.getElementById("postgraduate") && document.getElementById("postgraduate").checked) {
    switchTabToPostgrad();
  }

  external_jQuery_default()(".switch .switch-input").on("change", function () {
    if (external_jQuery_default()(this).attr("value") == "undergraduate") {
      switchTabToUndergrad();
    }

    if (external_jQuery_default()(this).attr("value") == "postgraduate") {
      switchTabToPostgrad();
    }
  });

  function switchTabToUndergrad() {
    external_jQuery_default()("#study-area-tabs > ul > li:nth-child(1) h4").html('<span class="icon-book-open"></span>Subject areas');
    external_jQuery_default()(".study-areas-undergrad").show(500);
    external_jQuery_default()(".study-areas-postgrad").hide(500);
  }

  function switchTabToPostgrad() {
    external_jQuery_default()("#study-area-tabs > ul > li:nth-child(1) h4").html('<span class="icon-book-open"></span> Postgraduate subjects');
    external_jQuery_default()(".study-areas-postgrad").show(500);
    external_jQuery_default()(".study-areas-undergrad").hide(500);
  }
  /* dynamic height for tiles. setting height of all tiles from largest tile height */


  external_jQuery_default()(".dynamic-height-tiles ").each(function (n) {
    // get array of heights for each group of class
    var tileHeights = external_jQuery_default()(this).find("li.tile").map(function () {
      return external_jQuery_default()(this).height();
    }).get(); // check heights for largest

    var maxHeight = Math.max.apply(null, tileHeights); // apply maxheight to tiles

    external_jQuery_default()(this).find("li.tile").height(maxHeight + 16);
  });
  /* Navigation toggle on mobile */

  external_jQuery_default()(".main-menu-toggle").on("click", function () {
    external_jQuery_default()(".main-nav").slideToggle();
    external_jQuery_default()(".sub-nav").slideToggle();
    external_jQuery_default()(".search-bar").slideToggle();
    external_jQuery_default()(".menu-toggle-icon").toggleClass("open");
  });
  /* Show search bar on desktop */

  external_jQuery_default()(".search-item").on("click", function () {
    external_jQuery_default()(".search-bar").slideToggle();
    var searchInputElement = external_jQuery_default()("#search-query");

    if (searchInputElement.is(":visible")) {
      searchInputElement.focus();
    }
  });

  if (external_jQuery_default()("#study-area-tabs")) {
    var getUrlParameter = function getUrlParameter(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]".concat(name, "=([^&#]*)"));
      var results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    var handleSwitchInputClick = function handleSwitchInputClick(event) {
      window.history.replaceState({}, "", "".concat(window.location.pathname, "?grad=").concat(event.target.id));
    };

    var grad = "URLSearchParams" in window ? new URLSearchParams(window.location.search).get("grad") : getUrlParameter("grad");

    if (grad === "postgraduate" || grad === "undergraduate") {
      external_jQuery_default()("#".concat(grad)).click();
    }

    var tabs = external_jQuery_default()("#study-area-tabs .switch-input");
    tabs.each(function () {
      this.addEventListener("click", handleSwitchInputClick);
    });
  }
  /** DOM manipulation */


  wrapEmbeddedIframes();
  removedUnusedTiles(); // TODO: Review - Can be removed after all the study areas are migrated
  // tile accordion

  external_jQuery_default()(".tile-accordion .tile").not(".tile-accordion.content-page").on("click", function (evt) {
    // evt.preventDefault();
    if (external_jQuery_default()(this).hasClass("accordion-closed")) {
      external_jQuery_default()(this).children(".accordion-content ").slideDown();
      external_jQuery_default()(this).removeClass("accordion-closed").addClass("accordion-open");
    } else if (external_jQuery_default()(this).hasClass("accordion-open")) {
      external_jQuery_default()(this).children(".accordion-content ").slideUp();
      external_jQuery_default()(this).removeClass("accordion-open").addClass("accordion-closed");
    }

    external_jQuery_default()(this).find(".links a").on("click", function (event) {
      event.stopPropagation();
    });
  });
  /** Runs any custom scripts that could be added in the content. */

  if (onDocumentReadyFunctions && onDocumentReadyFunctions.length) {
    onDocumentReadyFunctions.forEach(function (singleFunction) {
      singleFunction();
    });
  }
});
/* Research hub content page tile accordian */

external_jQuery_default()(".tile-accordion.content-page .tile .toggle").on("click", function (evt) {
  var $this = external_jQuery_default()(this);
  $this.toggleClass("expanded");
  $this.siblings("p").toggle();
});
/* Add accessible title label for restricted links class  */

function restrictedLinkTitle() {
  var lockLinks = document.querySelectorAll(".link-restricted");

  for (var i = 0; i < lockLinks.length; i++) {
    lockLinks[i].setAttribute("title", "Restricted intranet link");
  }
}

restrictedLinkTitle();
/* Research hub mega menu */

function hubMegaMenu() {
  var menu = external_jQuery_default()(".hub-mega-menu .mega-menu-inner");
  var menuExpandButton = external_jQuery_default()(".hub-mega-menu .btn-expander");
  var mobile = false;
  var desktop = false;
  src_default.a.register(toolkit_DESKTOP_AND_LARGER, function () {
    desktop = true;
    mobile = false;
  });
  src_default.a.register(toolkit_TABLET_AND_SMALLER, function () {
    desktop = false;
    mobile = true;
  });
  menuExpandButton.each(function () {
    var _this2 = this;

    external_jQuery_default()(this).on("click", function (c) {
      var $this = external_jQuery_default()(_this2);

      if (desktop) {
        menu.toggleClass("expanded");
      }

      if (mobile) {
        menu.addClass("expanded");
        $this.parent().toggleClass("js-dropdown-show");
      }
    });
  });
}

function hubMegaMenu2() {
  var menu = external_jQuery_default()(".hub-mega-menu .mega-menu-inner");
  var menuExpandButton = external_jQuery_default()(".hub-mega-menu .btn-expander").parent();
  var mobile = false;
  var desktop = false;
  src_default.a.register(toolkit_DESKTOP_AND_LARGER, function () {
    desktop = true;
    mobile = false;
  });
  src_default.a.register(toolkit_TABLET_AND_SMALLER, function () {
    desktop = false;
    mobile = true;
  });
  menuExpandButton.each(function () {
    var $this = external_jQuery_default()(this); // Create and append Title to list of expanded links

    var title = $this.children("a").text();
    var titleLink = $this.children("a").attr("href");
    var newLink = "<li class=\"js-inject-title\"><a href=\"".concat(titleLink, "\"> ").concat(title, " </a></li>");
    $this.children("ul").prepend(newLink); // subnav expand function

    external_jQuery_default()(this).on("click", function (c) {
      c.preventDefault();

      if (desktop) {
        menu.toggleClass("expanded");
      }

      if (mobile) {
        menu.addClass("expanded");
        $this.toggleClass("js-dropdown-show");
      }
    });
  });
}

if (document.getElementsByClassName("hub-mega-menu").length > 0 && !document.getElementsByClassName("mega-menu-bar").length > 0) {
  var hubMegaMenuElement = external_jQuery_default()(".hub-mega-menu");
  var megaMenuExpandButton = external_jQuery_default()(".hub-mega-menu .btn-expander");
  hubMegaMenu();

  if (tracker.shouldTrackElement(hubMegaMenuElement)) {
    tracker.registerForTracking(hubMegaMenuElement.find("li > a"), "click", "megamenu-link");
    tracker.registerForTracking(megaMenuExpandButton, "click", "megamenu-expander");
  }
}
/* New hub mega menu */


if (document.getElementsByClassName("hub-mega-menu").length > 0 && document.getElementsByClassName("mega-menu-bar").length > 0) {
  hubMegaMenu2();
  console.log("new menu bar strip thing cool ");
}

function openPopup() {
  popups.initAndOpen(this[0]);
  return this;
}

if (document.getElementsByClassName("toggle").length > 0) {
  external_jQuery_default()(".toggle").on("click", function () {
    external_jQuery_default()(this).toggleClass("active");
    external_jQuery_default()(this).next(".toggle-block").toggleClass("active");
  });
} // !Add light class to all sidemenus (TEMPORARY)


if (external_jQuery_default()(".sidemenu").length > 0 && !external_jQuery_default()(".sidemenu").hasClass("sidemenu-light")) {
  external_jQuery_default()(".sidemenu").addClass("sidemenu-light");
}
/* USing on subject page proto */


document.addEventListener("DOMContentLoaded", function () {
  // ensure vue comps ready ..
  setTimeout(function () {
    // console.log('run toggle slide');
    if (document.getElementsByClassName("toggle-slide").length > 0) {
      external_jQuery_default()(".toggle-slide").on("click", function () {
        external_jQuery_default()(this).toggleClass("active");

        if (external_jQuery_default()(this).next(".toggle-block").hasClass("active")) {
          external_jQuery_default()(this).next(".toggle-block").slideUp().toggleClass("active");
        } else {
          external_jQuery_default()(this).next(".toggle-block").slideDown().toggleClass("active");
        }
      });
    }
  }, 750);
}); // Sticky header/nav on mobile

if (document.location.href.includes("?mode=dev") || document.location.href.includes("local.wgtn") || document.location.href.includes("assets/git_bridge/0009/1778031/dist")) {
  // Sticky header/nav on mobile
  window.onscroll = function (e) {
    var _this3 = this;

    src_default.a.register(toolkit_TABLET_AND_SMALLER, function () {
      if (window.pageYOffset > 100) {
        var scrollY = window.pageYOffset || document.documentElement.scrollTop;
        var header = external_jQuery_default()(".main-site-header");

        if (scrollY < _this3.lastScroll - 5) {
          header.addClass("sticky");
        } else {
          header.removeClass("sticky");
        }

        _this3.lastScroll = scrollY;
      }
    });
  };
}
/**
 * jQuery's plugin as a utility factory
 * Usage as: $( jquerySelector ).vicApp().method( options )
 */


(function ($) {
  $.fn.vicApp = function () {
    return {
      openPopup: openPopup.bind(this)
    };
  };
})(jQuery);

if (document.getElementsByClassName("calendar-cards").length > 0) {
  external_jQuery_default()("#search-filter").on("keyup search", function () {
    var value = external_jQuery_default()(this).val().toLowerCase(); // if input 3 or more filter

    if (external_jQuery_default()(this).val().length >= 2) {
      external_jQuery_default()(".calendar-cards .card").filter(function () {
        external_jQuery_default()(this).toggle(external_jQuery_default()(this).text().toLowerCase().indexOf(value) > -1);
      });
    } else {
      // show all if search input less then 2
      external_jQuery_default()(".calendar-cards .card").show();
    }
  }); // Filter on type tags

  external_jQuery_default()(".tags .tag").on("click", function () {
    if (external_jQuery_default()(this).hasClass("selected")) {
      external_jQuery_default()(this).removeClass("selected");
      external_jQuery_default()(".calendar-cards .card").show();
    } else {
      external_jQuery_default()(".tags .tag").removeClass("selected");
      external_jQuery_default()(".calendar-cards .card").show();

      if (external_jQuery_default()(this).text() === "Amendment") {
        external_jQuery_default()(this).addClass("selected");
        external_jQuery_default()(".calendar-cards .card").filter(':not([data-type="Amendment"])').hide();
      }

      if (external_jQuery_default()(this).text() === "New") {
        external_jQuery_default()(this).addClass("selected");
        external_jQuery_default()(".calendar-cards .card").filter(':not([data-type="New"])').hide();
      }

      if (external_jQuery_default()(this).text() === "Errata") {
        external_jQuery_default()(this).addClass("selected");
        external_jQuery_default()(".calendar-cards .card").filter(':not([data-type="Errata"])').hide();
      }
    }
  });
} // Carousel


var arrayOfPhotos = ["https://www.wgtn.ac.nz/__data/assets/image/0010/1750339/sleep-mat-banner-minds-v3.jpg", "https://www.wgtn.ac.nz/__data/assets/image/0006/1721877/windy-banner.jpg", "https://www.wgtn.ac.nz/__data/assets/image/0010/560773/MaoriStudiesBanner.jpg", "https://www.wgtn.ac.nz/__data/assets/image/0007/1873258/ai-fingers.jpg", "https://www.wgtn.ac.nz/__data/assets/image/0005/1756517/globe-top.jpg"];
var count = -1;
external_jQuery_default()(".carousel-controls .next").on("click", function (e) {
  console.log(e);
  console.log(count);

  if (count < 4) {
    count++;
  } else {
    count = 0;
  }

  external_jQuery_default()(this).parent().prev().find(">img").attr("src", arrayOfPhotos[count]);
});
external_jQuery_default()(".carousel-controls .previous").on("click", function (e) {
  console.log(e);
  console.log(count);

  if (count > 0) {
    count--;
  } else {
    count = 4;
  }

  external_jQuery_default()(this).parent().prev().find(">img").attr("src", arrayOfPhotos[count]);
}); // Add Maori language tags to all tereo titles

external_jQuery_default()(".tereo-title").attr("lang", "mi");

/***/ })
/******/ ]);