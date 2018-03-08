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
/******/ 	__webpack_require__.p = "test/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function parseNumeric(val) {
    return parseFloat(val) || 0;
}
exports.parseNumeric = parseNumeric;
var borderSizingSet = false;
function setDocumentBorderSizing() {
    if (!borderSizingSet) {
        document.documentElement.style.boxSizing = 'border-box';
        document.documentElement.style.width = '100%';
        document.body.style.width = '100%';
        borderSizingSet = true;
    }
}
exports.setDocumentBorderSizing = setDocumentBorderSizing;
function checkPassiveFeatureInEventListener() {
    var passiveSupported = false;
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () { return passiveSupported = true; },
        });
        window.addEventListener('test', options, options);
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
    return passiveSupported;
}
exports.checkPassiveFeatureInEventListener = checkPassiveFeatureInEventListener;
//# sourceMappingURL=utils.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
// CommonJS / Node have global context exposed as "global" variable.
// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
// the global "global" var for now.
var __window = typeof window !== 'undefined' && window;
var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
var __global = typeof global !== 'undefined' && global;
var _root = __window || __global || __self;
exports.root = _root;
// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
// This is needed when used with angular/tsickle which inserts a goog.module statement.
// Wrap in IIFE
(function () {
    if (!_root) {
        throw new Error('RxJS could not find any global context (window, self, global)');
    }
})();
//# sourceMappingURL=root.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isArray_1 = __webpack_require__(38);
var isObject_1 = __webpack_require__(39);
var isFunction_1 = __webpack_require__(11);
var tryCatch_1 = __webpack_require__(40);
var errorObject_1 = __webpack_require__(12);
var UnsubscriptionError_1 = __webpack_require__(41);
/**
 * Represents a disposable resource, such as the execution of an Observable. A
 * Subscription has one important method, `unsubscribe`, that takes no argument
 * and just disposes the resource held by the subscription.
 *
 * Additionally, subscriptions may be grouped together through the `add()`
 * method, which will attach a child Subscription to the current Subscription.
 * When a Subscription is unsubscribed, all its children (and its grandchildren)
 * will be unsubscribed as well.
 *
 * @class Subscription
 */
var Subscription = (function () {
    /**
     * @param {function(): void} [unsubscribe] A function describing how to
     * perform the disposal of resources when the `unsubscribe` method is called.
     */
    function Subscription(unsubscribe) {
        /**
         * A flag to indicate whether this Subscription has already been unsubscribed.
         * @type {boolean}
         */
        this.closed = false;
        this._parent = null;
        this._parents = null;
        this._subscriptions = null;
        if (unsubscribe) {
            this._unsubscribe = unsubscribe;
        }
    }
    /**
     * Disposes the resources held by the subscription. May, for instance, cancel
     * an ongoing Observable execution or cancel any other type of work that
     * started when the Subscription was created.
     * @return {void}
     */
    Subscription.prototype.unsubscribe = function () {
        var hasErrors = false;
        var errors;
        if (this.closed) {
            return;
        }
        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
        this.closed = true;
        this._parent = null;
        this._parents = null;
        // null out _subscriptions first so any child subscriptions that attempt
        // to remove themselves from this subscription will noop
        this._subscriptions = null;
        var index = -1;
        var len = _parents ? _parents.length : 0;
        // if this._parent is null, then so is this._parents, and we
        // don't have to remove ourselves from any parent subscriptions.
        while (_parent) {
            _parent.remove(this);
            // if this._parents is null or index >= len,
            // then _parent is set to null, and the loop exits
            _parent = ++index < len && _parents[index] || null;
        }
        if (isFunction_1.isFunction(_unsubscribe)) {
            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
            if (trial === errorObject_1.errorObject) {
                hasErrors = true;
                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1.UnsubscriptionError ?
                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
            }
        }
        if (isArray_1.isArray(_subscriptions)) {
            index = -1;
            len = _subscriptions.length;
            while (++index < len) {
                var sub = _subscriptions[index];
                if (isObject_1.isObject(sub)) {
                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
                    if (trial === errorObject_1.errorObject) {
                        hasErrors = true;
                        errors = errors || [];
                        var err = errorObject_1.errorObject.e;
                        if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
                        }
                        else {
                            errors.push(err);
                        }
                    }
                }
            }
        }
        if (hasErrors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
    };
    /**
     * Adds a tear down to be called during the unsubscribe() of this
     * Subscription.
     *
     * If the tear down being added is a subscription that is already
     * unsubscribed, is the same reference `add` is being called on, or is
     * `Subscription.EMPTY`, it will not be added.
     *
     * If this subscription is already in an `closed` state, the passed
     * tear down logic will be executed immediately.
     *
     * @param {TeardownLogic} teardown The additional logic to execute on
     * teardown.
     * @return {Subscription} Returns the Subscription used or created to be
     * added to the inner subscriptions list. This Subscription can be used with
     * `remove()` to remove the passed teardown logic from the inner subscriptions
     * list.
     */
    Subscription.prototype.add = function (teardown) {
        if (!teardown || (teardown === Subscription.EMPTY)) {
            return Subscription.EMPTY;
        }
        if (teardown === this) {
            return this;
        }
        var subscription = teardown;
        switch (typeof teardown) {
            case 'function':
                subscription = new Subscription(teardown);
            case 'object':
                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
                    return subscription;
                }
                else if (this.closed) {
                    subscription.unsubscribe();
                    return subscription;
                }
                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
                    var tmp = subscription;
                    subscription = new Subscription();
                    subscription._subscriptions = [tmp];
                }
                break;
            default:
                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
        var subscriptions = this._subscriptions || (this._subscriptions = []);
        subscriptions.push(subscription);
        subscription._addParent(this);
        return subscription;
    };
    /**
     * Removes a Subscription from the internal list of subscriptions that will
     * unsubscribe during the unsubscribe process of this Subscription.
     * @param {Subscription} subscription The subscription to remove.
     * @return {void}
     */
    Subscription.prototype.remove = function (subscription) {
        var subscriptions = this._subscriptions;
        if (subscriptions) {
            var subscriptionIndex = subscriptions.indexOf(subscription);
            if (subscriptionIndex !== -1) {
                subscriptions.splice(subscriptionIndex, 1);
            }
        }
    };
    Subscription.prototype._addParent = function (parent) {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        if (!_parent || _parent === parent) {
            // If we don't have a parent, or the new parent is the same as the
            // current parent, then set this._parent to the new parent.
            this._parent = parent;
        }
        else if (!_parents) {
            // If there's already one parent, but not multiple, allocate an Array to
            // store the rest of the parent Subscriptions.
            this._parents = [parent];
        }
        else if (_parents.indexOf(parent) === -1) {
            // Only add the new parent to the _parents list if it's not already there.
            _parents.push(parent);
        }
    };
    Subscription.EMPTY = (function (empty) {
        empty.closed = true;
        return empty;
    }(new Subscription()));
    return Subscription;
}());
exports.Subscription = Subscription;
function flattenUnsubscriptionErrors(errors) {
    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1.UnsubscriptionError) ? err.errors : err); }, []);
}
//# sourceMappingURL=Subscription.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
var Symbol = root_1.root.Symbol;
exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
    Symbol.for('rxSubscriber') : '@@rxSubscriber';
/**
 * @deprecated use rxSubscriber instead
 */
exports.$$rxSubscriber = exports.rxSubscriber;
//# sourceMappingURL=rxSubscriber.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var requestAnimationFrame_1 = __webpack_require__(29);
// active requestAnimationFrame polyfill if it doesn't exist
requestAnimationFrame_1.rafFeature.isSupported({ usePolyfill: true });
function paintEventFactory(_a) {
    var type = _a.type, name = _a.name, _b = _a.elementTarget, elementTarget = _b === void 0 ? window : _b, update = _a.update, _c = _a.debug, debug = _c === void 0 ? '' : _c;
    var obj = elementTarget;
    var running = false;
    // let update_obj: any;
    var handler = function () {
        var detail = update ? update() : {};
        if (running) {
            return;
        }
        running = true;
        requestAnimationFrame(function () {
            // obj.dispatchEvent(new (Function.prototype.bind.apply(CustomEvent, [null, name].concat(object_to_array(update_obj)))));//like new CustomEvent(name, ...args)
            // const detail = update ? update() : {};
            if (debug !== '')
                detail.debug = debug;
            obj.dispatchEvent(new CustomEvent(name, { detail: detail }));
            running = false;
        });
    };
    obj.addEventListener(type, handler);
}
exports.paintEventFactory = paintEventFactory;
//# sourceMappingURL=paint-utils.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
Object.defineProperty(exports, "__esModule", { value: true });
function guid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
    });
}
exports.default = guid;
//# sourceMappingURL=guid.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isServer() {
    return !(typeof window !== 'undefined' && window.document);
}
var scrollbarWidth = undefined;
function scrollbarSize(recalculate) {
    if (recalculate === void 0) { recalculate = false; }
    // default to 15px server-side as this is true for many browsers
    if (isServer())
        return 15;
    if ((scrollbarWidth !== undefined) && !recalculate) {
        return scrollbarWidth;
    }
    // same as document.onreadystatechange = function () {  if (document.readyState === "interactive") { ... } };
    document.addEventListener('DOMContentLoaded', function (event) {
        scrollbarSize();
    });
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden'; // not visible
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 === w2)
        w2 = outer.clientWidth;
    document.body.removeChild(outer);
    scrollbarWidth = w1 - w2;
    return scrollbarWidth;
}
exports.scrollbarSize = scrollbarSize;
// vertical or horizontal scrollbar
function hasScrollbar(element) {
    // return element.scrollHeight > element.clientHeight; // doesn't take into account the scollbar container that fits the content.
    // return element.offsetWidth > element.clientWidth;
    var overflow = getComputedStyle(element).overflow;
    // window has always a vertical scrollbar if it's not hidden
    if (element === document.documentElement && overflow !== 'hidden')
        return true;
    // if (overflow === 'auto' || overflow === 'scroll') return true;
    // return false;
    if (overflow === 'auto' || overflow === 'scroll')
        return true;
    return false;
    // we should write
    /*
    const condition = element.scrollHeight > element.clientHeight ||
        element.scrollHeight + scrollbarSize() + parseNumeric(getComputedStyle(element).borderTop) + parseNumeric(getComputedStyle(element).borderBottom) !== element.offsetHeight;
    */
    //  element.scrollHeight > element.clientHeight || 
    // return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}
exports.hasScrollbar = hasScrollbar;
function verticalScrollbarSize(element) {
    if (element === document.documentElement) {
        if (document.documentElement.scrollHeight > document.documentElement.offsetHeight)
            return scrollbarSize();
        return 0;
    }
    return scrollbarSize();
    // return element.offsetWidth - element.clientWidth; // we should remove the borders
}
function horizontalScrollbarSize(element) {
    if (element === document.documentElement) {
        if (document.documentElement.scrollWidth > document.documentElement.offsetWidth)
            return scrollbarSize();
        return 0;
    }
    return scrollbarSize();
    // return element.offsetHeight - element.clientHeight; // we should remove the borders
}
function scrollbarSizes(element) {
    var containerDirection = getComputedStyle(element).direction;
    return {
        bottom: horizontalScrollbarSize(element),
        left: containerDirection === 'ltr' ? 0 : verticalScrollbarSize(element),
        right: containerDirection === 'ltr' ? verticalScrollbarSize(element) : 0
    };
}
exports.scrollbarSizes = scrollbarSizes;
//# sourceMappingURL=scrollbar.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
var toSubscriber_1 = __webpack_require__(37);
var observable_1 = __webpack_require__(42);
var pipe_1 = __webpack_require__(43);
/**
 * A representation of any set of values over any amount of time. This is the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
var Observable = (function () {
    /**
     * @constructor
     * @param {Function} subscribe the function that is called when the Observable is
     * initially subscribed to. This function is given a Subscriber, to which new values
     * can be `next`ed, or an `error` method can be called to raise an error, or
     * `complete` can be called to notify of a successful completion.
     */
    function Observable(subscribe) {
        this._isScalar = false;
        if (subscribe) {
            this._subscribe = subscribe;
        }
    }
    /**
     * Creates a new Observable, with this Observable as the source, and the passed
     * operator defined as the new observable's operator.
     * @method lift
     * @param {Operator} operator the operator defining the operation to take on the observable
     * @return {Observable} a new observable with the Operator applied
     */
    Observable.prototype.lift = function (operator) {
        var observable = new Observable();
        observable.source = this;
        observable.operator = operator;
        return observable;
    };
    /**
     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
     *
     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
     *
     * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
     * thought.
     *
     * Apart from starting the execution of an Observable, this method allows you to listen for values
     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
     * following ways.
     *
     * The first way is creating an object that implements {@link Observer} interface. It should have methods
     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
     * be left uncaught.
     *
     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
     *
     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
     *
     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
     * It is an Observable itself that decides when these functions will be called. For example {@link of}
     * by default emits all its values synchronously. Always check documentation for how given Observable
     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
     *
     * @example <caption>Subscribe with an Observer</caption>
     * const sumObserver = {
     *   sum: 0,
     *   next(value) {
     *     console.log('Adding: ' + value);
     *     this.sum = this.sum + value;
     *   },
     *   error() { // We actually could just remove this method,
     *   },        // since we do not really care about errors right now.
     *   complete() {
     *     console.log('Sum equals: ' + this.sum);
     *   }
     * };
     *
     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
     * .subscribe(sumObserver);
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Subscribe with functions</caption>
     * let sum = 0;
     *
     * Rx.Observable.of(1, 2, 3)
     * .subscribe(
     *   function(value) {
     *     console.log('Adding: ' + value);
     *     sum = sum + value;
     *   },
     *   undefined,
     *   function() {
     *     console.log('Sum equals: ' + sum);
     *   }
     * );
     *
     * // Logs:
     * // "Adding: 1"
     * // "Adding: 2"
     * // "Adding: 3"
     * // "Sum equals: 6"
     *
     *
     * @example <caption>Cancel a subscription</caption>
     * const subscription = Rx.Observable.interval(1000).subscribe(
     *   num => console.log(num),
     *   undefined,
     *   () => console.log('completed!') // Will not be called, even
     * );                                // when cancelling subscription
     *
     *
     * setTimeout(() => {
     *   subscription.unsubscribe();
     *   console.log('unsubscribed!');
     * }, 2500);
     *
     * // Logs:
     * // 0 after 1s
     * // 1 after 2s
     * // "unsubscribed!" after 2.5s
     *
     *
     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
     *  Observable.
     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
     *  the error will be thrown as unhandled.
     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
     * @return {ISubscription} a subscription reference to the registered handlers
     * @method subscribe
     */
    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
        var operator = this.operator;
        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
        if (operator) {
            operator.call(sink, this.source);
        }
        else {
            sink.add(this.source || !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
        }
        if (sink.syncErrorThrowable) {
            sink.syncErrorThrowable = false;
            if (sink.syncErrorThrown) {
                throw sink.syncErrorValue;
            }
        }
        return sink;
    };
    Observable.prototype._trySubscribe = function (sink) {
        try {
            return this._subscribe(sink);
        }
        catch (err) {
            sink.syncErrorThrown = true;
            sink.syncErrorValue = err;
            sink.error(err);
        }
    };
    /**
     * @method forEach
     * @param {Function} next a handler for each value emitted by the observable
     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
     * @return {Promise} a promise that either resolves on observable completion or
     *  rejects with the handled error
     */
    Observable.prototype.forEach = function (next, PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            // Must be declared in a separate statement to avoid a RefernceError when
            // accessing subscription below in the closure due to Temporal Dead Zone.
            var subscription;
            subscription = _this.subscribe(function (value) {
                if (subscription) {
                    // if there is a subscription, then we can surmise
                    // the next handling is asynchronous. Any errors thrown
                    // need to be rejected explicitly and unsubscribe must be
                    // called manually
                    try {
                        next(value);
                    }
                    catch (err) {
                        reject(err);
                        subscription.unsubscribe();
                    }
                }
                else {
                    // if there is NO subscription, then we're getting a nexted
                    // value synchronously during subscription. We can just call it.
                    // If it errors, Observable's `subscribe` will ensure the
                    // unsubscription logic is called, then synchronously rethrow the error.
                    // After that, Promise will trap the error and send it
                    // down the rejection path.
                    next(value);
                }
            }, reject, resolve);
        });
    };
    Observable.prototype._subscribe = function (subscriber) {
        return this.source.subscribe(subscriber);
    };
    /**
     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
     * @method Symbol.observable
     * @return {Observable} this instance of the observable
     */
    Observable.prototype[observable_1.observable] = function () {
        return this;
    };
    /* tslint:enable:max-line-length */
    /**
     * Used to stitch together functional operators into a chain.
     * @method pipe
     * @return {Observable} the Observable result of all of the operators having
     * been called in the order they were passed in.
     *
     * @example
     *
     * import { map, filter, scan } from 'rxjs/operators';
     *
     * Rx.Observable.interval(1000)
     *   .pipe(
     *     filter(x => x % 2 === 0),
     *     map(x => x + x),
     *     scan((acc, x) => acc + x)
     *   )
     *   .subscribe(x => console.log(x))
     */
    Observable.prototype.pipe = function () {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            operations[_i - 0] = arguments[_i];
        }
        if (operations.length === 0) {
            return this;
        }
        return pipe_1.pipeFromArray(operations)(this);
    };
    /* tslint:enable:max-line-length */
    Observable.prototype.toPromise = function (PromiseCtor) {
        var _this = this;
        if (!PromiseCtor) {
            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
                PromiseCtor = root_1.root.Rx.config.Promise;
            }
            else if (root_1.root.Promise) {
                PromiseCtor = root_1.root.Promise;
            }
        }
        if (!PromiseCtor) {
            throw new Error('no Promise impl found');
        }
        return new PromiseCtor(function (resolve, reject) {
            var value;
            _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
        });
    };
    // HACK: Since TypeScript inherits static properties too, we have to
    // fight against TypeScript here so Subject can have a different static create signature
    /**
     * Creates a new cold Observable by calling the Observable constructor
     * @static true
     * @owner Observable
     * @method create
     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
     * @return {Observable} a new cold observable
     */
    Observable.create = function (subscribe) {
        return new Observable(subscribe);
    };
    return Observable;
}());
exports.Observable = Observable;
//# sourceMappingURL=Observable.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var isFunction_1 = __webpack_require__(11);
var Subscription_1 = __webpack_require__(3);
var Observer_1 = __webpack_require__(13);
var rxSubscriber_1 = __webpack_require__(4);
/**
 * Implements the {@link Observer} interface and extends the
 * {@link Subscription} class. While the {@link Observer} is the public API for
 * consuming the values of an {@link Observable}, all Observers get converted to
 * a Subscriber, in order to provide Subscription-like capabilities such as
 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
 * implementing operators, but it is rarely used as a public API.
 *
 * @class Subscriber<T>
 */
var Subscriber = (function (_super) {
    __extends(Subscriber, _super);
    /**
     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
     * defined Observer or a `next` callback function.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     */
    function Subscriber(destinationOrNext, error, complete) {
        _super.call(this);
        this.syncErrorValue = null;
        this.syncErrorThrown = false;
        this.syncErrorThrowable = false;
        this.isStopped = false;
        switch (arguments.length) {
            case 0:
                this.destination = Observer_1.empty;
                break;
            case 1:
                if (!destinationOrNext) {
                    this.destination = Observer_1.empty;
                    break;
                }
                if (typeof destinationOrNext === 'object') {
                    if (destinationOrNext instanceof Subscriber) {
                        this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
                        this.destination = destinationOrNext;
                        this.destination.add(this);
                    }
                    else {
                        this.syncErrorThrowable = true;
                        this.destination = new SafeSubscriber(this, destinationOrNext);
                    }
                    break;
                }
            default:
                this.syncErrorThrowable = true;
                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
                break;
        }
    }
    Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function () { return this; };
    /**
     * A static factory for a Subscriber, given a (potentially partial) definition
     * of an Observer.
     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
     * @param {function(e: ?any): void} [error] The `error` callback of an
     * Observer.
     * @param {function(): void} [complete] The `complete` callback of an
     * Observer.
     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
     * Observer represented by the given arguments.
     */
    Subscriber.create = function (next, error, complete) {
        var subscriber = new Subscriber(next, error, complete);
        subscriber.syncErrorThrowable = false;
        return subscriber;
    };
    /**
     * The {@link Observer} callback to receive notifications of type `next` from
     * the Observable, with a value. The Observable may call this method 0 or more
     * times.
     * @param {T} [value] The `next` value.
     * @return {void}
     */
    Subscriber.prototype.next = function (value) {
        if (!this.isStopped) {
            this._next(value);
        }
    };
    /**
     * The {@link Observer} callback to receive notifications of type `error` from
     * the Observable, with an attached {@link Error}. Notifies the Observer that
     * the Observable has experienced an error condition.
     * @param {any} [err] The `error` exception.
     * @return {void}
     */
    Subscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            this.isStopped = true;
            this._error(err);
        }
    };
    /**
     * The {@link Observer} callback to receive a valueless notification of type
     * `complete` from the Observable. Notifies the Observer that the Observable
     * has finished sending push-based notifications.
     * @return {void}
     */
    Subscriber.prototype.complete = function () {
        if (!this.isStopped) {
            this.isStopped = true;
            this._complete();
        }
    };
    Subscriber.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function (value) {
        this.destination.next(value);
    };
    Subscriber.prototype._error = function (err) {
        this.destination.error(err);
        this.unsubscribe();
    };
    Subscriber.prototype._complete = function () {
        this.destination.complete();
        this.unsubscribe();
    };
    Subscriber.prototype._unsubscribeAndRecycle = function () {
        var _a = this, _parent = _a._parent, _parents = _a._parents;
        this._parent = null;
        this._parents = null;
        this.unsubscribe();
        this.closed = false;
        this.isStopped = false;
        this._parent = _parent;
        this._parents = _parents;
        return this;
    };
    return Subscriber;
}(Subscription_1.Subscription));
exports.Subscriber = Subscriber;
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SafeSubscriber = (function (_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
        _super.call(this);
        this._parentSubscriber = _parentSubscriber;
        var next;
        var context = this;
        if (isFunction_1.isFunction(observerOrNext)) {
            next = observerOrNext;
        }
        else if (observerOrNext) {
            next = observerOrNext.next;
            error = observerOrNext.error;
            complete = observerOrNext.complete;
            if (observerOrNext !== Observer_1.empty) {
                context = Object.create(observerOrNext);
                if (isFunction_1.isFunction(context.unsubscribe)) {
                    this.add(context.unsubscribe.bind(context));
                }
                context.unsubscribe = this.unsubscribe.bind(this);
            }
        }
        this._context = context;
        this._next = next;
        this._error = error;
        this._complete = complete;
    }
    SafeSubscriber.prototype.next = function (value) {
        if (!this.isStopped && this._next) {
            var _parentSubscriber = this._parentSubscriber;
            if (!_parentSubscriber.syncErrorThrowable) {
                this.__tryOrUnsub(this._next, value);
            }
            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.error = function (err) {
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._error) {
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(this._error, err);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, this._error, err);
                    this.unsubscribe();
                }
            }
            else if (!_parentSubscriber.syncErrorThrowable) {
                this.unsubscribe();
                throw err;
            }
            else {
                _parentSubscriber.syncErrorValue = err;
                _parentSubscriber.syncErrorThrown = true;
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.complete = function () {
        var _this = this;
        if (!this.isStopped) {
            var _parentSubscriber = this._parentSubscriber;
            if (this._complete) {
                var wrappedComplete = function () { return _this._complete.call(_this._context); };
                if (!_parentSubscriber.syncErrorThrowable) {
                    this.__tryOrUnsub(wrappedComplete);
                    this.unsubscribe();
                }
                else {
                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
                    this.unsubscribe();
                }
            }
            else {
                this.unsubscribe();
            }
        }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            this.unsubscribe();
            throw err;
        }
    };
    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
        try {
            fn.call(this._context, value);
        }
        catch (err) {
            parent.syncErrorValue = err;
            parent.syncErrorThrown = true;
            return true;
        }
        return false;
    };
    SafeSubscriber.prototype._unsubscribe = function () {
        var _parentSubscriber = this._parentSubscriber;
        this._context = null;
        this._parentSubscriber = null;
        _parentSubscriber.unsubscribe();
    };
    return SafeSubscriber;
}(Subscriber));
//# sourceMappingURL=Subscriber.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isFunction(x) {
    return typeof x === 'function';
}
exports.isFunction = isFunction;
//# sourceMappingURL=isFunction.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// typeof any so that it we don't have to cast when comparing a result to the error object
exports.errorObject = { e: {} };
//# sourceMappingURL=errorObject.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.empty = {
    closed: true,
    next: function (value) { },
    error: function (err) { throw err; },
    complete: function () { }
};
//# sourceMappingURL=Observer.js.map

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fill_range__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fill_range___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fill_range__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stickies_lib_src_stickies__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_stickies_lib_src_stickies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_stickies_lib_src_stickies__);




/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isObject = __webpack_require__(16);
var isNumber = __webpack_require__(18);
var randomize = __webpack_require__(20);
var repeatStr = __webpack_require__(24);
var repeat = __webpack_require__(25);

/**
 * Expose `fillRange`
 */

module.exports = fillRange;

/**
 * Return a range of numbers or letters.
 *
 * @param  {String} `a` Start of the range
 * @param  {String} `b` End of the range
 * @param  {String} `step` Increment or decrement to use.
 * @param  {Function} `fn` Custom function to modify each element in the range.
 * @return {Array}
 */

function fillRange(a, b, step, options, fn) {
  if (a == null || b == null) {
    throw new Error('fill-range expects the first and second args to be strings.');
  }

  if (typeof step === 'function') {
    fn = step; options = {}; step = null;
  }

  if (typeof options === 'function') {
    fn = options; options = {};
  }

  if (isObject(step)) {
    options = step; step = '';
  }

  var expand, regex = false, sep = '';
  var opts = options || {};

  if (typeof opts.silent === 'undefined') {
    opts.silent = true;
  }

  step = step || opts.step;

  // store a ref to unmodified arg
  var origA = a, origB = b;

  b = (b.toString() === '-0') ? 0 : b;

  if (opts.optimize || opts.makeRe) {
    step = step ? (step += '~') : step;
    expand = true;
    regex = true;
    sep = '~';
  }

  // handle special step characters
  if (typeof step === 'string') {
    var match = stepRe().exec(step);

    if (match) {
      var i = match.index;
      var m = match[0];

      // repeat string
      if (m === '+') {
        return repeat(a, b);

      // randomize a, `b` times
      } else if (m === '?') {
        return [randomize(a, b)];

      // expand right, no regex reduction
      } else if (m === '>') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;

      // expand to an array, or if valid create a reduced
      // string for a regex logic `or`
      } else if (m === '|') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;
        regex = true;
        sep = m;

      // expand to an array, or if valid create a reduced
      // string for a regex range
      } else if (m === '~') {
        step = step.substr(0, i) + step.substr(i + 1);
        expand = true;
        regex = true;
        sep = m;
      }
    } else if (!isNumber(step)) {
      if (!opts.silent) {
        throw new TypeError('fill-range: invalid step.');
      }
      return null;
    }
  }

  if (/[.&*()[\]^%$#@!]/.test(a) || /[.&*()[\]^%$#@!]/.test(b)) {
    if (!opts.silent) {
      throw new RangeError('fill-range: invalid range arguments.');
    }
    return null;
  }

  // has neither a letter nor number, or has both letters and numbers
  // this needs to be after the step logic
  if (!noAlphaNum(a) || !noAlphaNum(b) || hasBoth(a) || hasBoth(b)) {
    if (!opts.silent) {
      throw new RangeError('fill-range: invalid range arguments.');
    }
    return null;
  }

  // validate arguments
  var isNumA = isNumber(zeros(a));
  var isNumB = isNumber(zeros(b));

  if ((!isNumA && isNumB) || (isNumA && !isNumB)) {
    if (!opts.silent) {
      throw new TypeError('fill-range: first range argument is incompatible with second.');
    }
    return null;
  }

  // by this point both are the same, so we
  // can use A to check going forward.
  var isNum = isNumA;
  var num = formatStep(step);

  // is the range alphabetical? or numeric?
  if (isNum) {
    // if numeric, coerce to an integer
    a = +a; b = +b;
  } else {
    // otherwise, get the charCode to expand alpha ranges
    a = a.charCodeAt(0);
    b = b.charCodeAt(0);
  }

  // is the pattern descending?
  var isDescending = a > b;

  // don't create a character class if the args are < 0
  if (a < 0 || b < 0) {
    expand = false;
    regex = false;
  }

  // detect padding
  var padding = isPadded(origA, origB);
  var res, pad, arr = [];
  var ii = 0;

  // character classes, ranges and logical `or`
  if (regex) {
    if (shouldExpand(a, b, num, isNum, padding, opts)) {
      // make sure the correct separator is used
      if (sep === '|' || sep === '~') {
        sep = detectSeparator(a, b, num, isNum, isDescending);
      }
      return wrap([origA, origB], sep, opts);
    }
  }

  while (isDescending ? (a >= b) : (a <= b)) {
    if (padding && isNum) {
      pad = padding(a);
    }

    // custom function
    if (typeof fn === 'function') {
      res = fn(a, isNum, pad, ii++);

    // letters
    } else if (!isNum) {
      if (regex && isInvalidChar(a)) {
        res = null;
      } else {
        res = String.fromCharCode(a);
      }

    // numbers
    } else {
      res = formatPadding(a, pad);
    }

    // add result to the array, filtering any nulled values
    if (res !== null) arr.push(res);

    // increment or decrement
    if (isDescending) {
      a -= num;
    } else {
      a += num;
    }
  }

  // now that the array is expanded, we need to handle regex
  // character classes, ranges or logical `or` that wasn't
  // already handled before the loop
  if ((regex || expand) && !opts.noexpand) {
    // make sure the correct separator is used
    if (sep === '|' || sep === '~') {
      sep = detectSeparator(a, b, num, isNum, isDescending);
    }
    if (arr.length === 1 || a < 0 || b < 0) { return arr; }
    return wrap(arr, sep, opts);
  }

  return arr;
}

/**
 * Wrap the string with the correct regex
 * syntax.
 */

function wrap(arr, sep, opts) {
  if (sep === '~') { sep = '-'; }
  var str = arr.join(sep);
  var pre = opts && opts.regexPrefix;

  // regex logical `or`
  if (sep === '|') {
    str = pre ? pre + str : str;
    str = '(' + str + ')';
  }

  // regex character class
  if (sep === '-') {
    str = (pre && pre === '^')
      ? pre + str
      : str;
    str = '[' + str + ']';
  }
  return [str];
}

/**
 * Check for invalid characters
 */

function isCharClass(a, b, step, isNum, isDescending) {
  if (isDescending) { return false; }
  if (isNum) { return a <= 9 && b <= 9; }
  if (a < b) { return step === 1; }
  return false;
}

/**
 * Detect the correct separator to use
 */

function shouldExpand(a, b, num, isNum, padding, opts) {
  if (isNum && (a > 9 || b > 9)) { return false; }
  return !padding && num === 1 && a < b;
}

/**
 * Detect the correct separator to use
 */

function detectSeparator(a, b, step, isNum, isDescending) {
  var isChar = isCharClass(a, b, step, isNum, isDescending);
  if (!isChar) {
    return '|';
  }
  return '~';
}

/**
 * Correctly format the step based on type
 */

function formatStep(step) {
  return Math.abs(step >> 0) || 1;
}

/**
 * Format padding, taking leading `-` into account
 */

function formatPadding(ch, pad) {
  var res = pad ? pad + ch : ch;
  if (pad && ch.toString().charAt(0) === '-') {
    res = '-' + pad + ch.toString().substr(1);
  }
  return res.toString();
}

/**
 * Check for invalid characters
 */

function isInvalidChar(str) {
  var ch = toStr(str);
  return ch === '\\'
    || ch === '['
    || ch === ']'
    || ch === '^'
    || ch === '('
    || ch === ')'
    || ch === '`';
}

/**
 * Convert to a string from a charCode
 */

function toStr(ch) {
  return String.fromCharCode(ch);
}


/**
 * Step regex
 */

function stepRe() {
  return /\?|>|\||\+|\~/g;
}

/**
 * Return true if `val` has either a letter
 * or a number
 */

function noAlphaNum(val) {
  return /[a-z0-9]/i.test(val);
}

/**
 * Return true if `val` has both a letter and
 * a number (invalid)
 */

function hasBoth(val) {
  return /[a-z][0-9]|[0-9][a-z]/i.test(val);
}

/**
 * Normalize zeros for checks
 */

function zeros(val) {
  if (/^-*0+$/.test(val.toString())) {
    return '0';
  }
  return val;
}

/**
 * Return true if `val` has leading zeros,
 * or a similar valid pattern.
 */

function hasZeros(val) {
  return /[^.]\.|^-*0+[0-9]/.test(val);
}

/**
 * If the string is padded, returns a curried function with
 * the a cached padding string, or `false` if no padding.
 *
 * @param  {*} `origA` String or number.
 * @return {String|Boolean}
 */

function isPadded(origA, origB) {
  if (hasZeros(origA) || hasZeros(origB)) {
    var alen = length(origA);
    var blen = length(origB);

    var len = alen >= blen
      ? alen
      : blen;

    return function (a) {
      return repeatStr('0', len - length(a));
    };
  }
  return false;
}

/**
 * Get the string length of `val`
 */

function length(val) {
  return val.toString().length;
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isArray = __webpack_require__(17);

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(19);

module.exports = function isNumber(num) {
  var type = typeOf(num);
  if (type !== 'number' && type !== 'string') {
    return false;
  }
  var n = +num;
  return (n - n + 1) >= 0 && num !== '';
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(1);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * randomatic <https://github.com/jonschlinkert/randomatic>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isNumber = __webpack_require__(21);
var typeOf = __webpack_require__(23);

/**
 * Expose `randomatic`
 */

module.exports = randomatic;

/**
 * Available mask characters
 */

var type = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  special: '~!@#$%^&()_+-={}[];\',.'
};

type.all = type.lower + type.upper + type.number + type.special;

/**
 * Generate random character sequences of a specified `length`,
 * based on the given `pattern`.
 *
 * @param {String} `pattern` The pattern to use for generating the random string.
 * @param {String} `length` The length of the string to generate.
 * @param {String} `options`
 * @return {String}
 * @api public
 */

function randomatic(pattern, length, options) {
  if (typeof pattern === 'undefined') {
    throw new Error('randomatic expects a string or number.');
  }

  var custom = false;
  if (arguments.length === 1) {
    if (typeof pattern === 'string') {
      length = pattern.length;

    } else if (isNumber(pattern)) {
      options = {}; length = pattern; pattern = '*';
    }
  }

  if (typeOf(length) === 'object' && length.hasOwnProperty('chars')) {
    options = length;
    pattern = options.chars;
    length = pattern.length;
    custom = true;
  }

  var opts = options || {};
  var mask = '';
  var res = '';

  // Characters to be used
  if (pattern.indexOf('?') !== -1) mask += opts.chars;
  if (pattern.indexOf('a') !== -1) mask += type.lower;
  if (pattern.indexOf('A') !== -1) mask += type.upper;
  if (pattern.indexOf('0') !== -1) mask += type.number;
  if (pattern.indexOf('!') !== -1) mask += type.special;
  if (pattern.indexOf('*') !== -1) mask += type.all;
  if (custom) mask += pattern;

  while (length--) {
    res += mask.charAt(parseInt(Math.random() * mask.length, 10));
  }
  return res;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(22);

module.exports = function isNumber(num) {
  var type = typeOf(num);

  if (type === 'string') {
    if (!num.trim()) return false;
  } else if (type !== 'number') {
    return false;
  }

  return (num - num + 1) >= 0;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(1);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(1);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */



module.exports = function repeat(ele, num) {
  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var sticky_element_1 = __webpack_require__(27);
var paint_utils_1 = __webpack_require__(5);
var guid_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
var scroll_containers_1 = __webpack_require__(35);
var Stickies = /** @class */ (function () {
    // container: HTMLElement = document.documentElement, handleEvents = true
    function Stickies(container, _a) {
        if (container === void 0) { container = document.documentElement; }
        var _b = _a === void 0 ? {} : _a, _c = _b.handleEvents, handleEvents = _c === void 0 ? true : _c, _d = _b.scrollContainersMangement, scrollContainersMangement = _d === void 0 ? true : _d;
        this._stickies = [];
        this._container = container;
        if (handleEvents) {
            if (Stickies.firstInstance)
                this.initEvents();
            this.init();
        }
        Stickies.firstInstance = false;
        if (scrollContainersMangement) {
            this.scrollContainers = new scroll_containers_1.ScrollContainers(this.container);
            this.scrollContainers.scollObservable.subscribe(this.scrollHandler.bind(this));
        }
    }
    Object.defineProperty(Stickies.prototype, "container", {
        get: function () {
            return this._container;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Stickies.prototype, "stickies", {
        get: function () {
            return this._stickies;
        },
        enumerable: true,
        configurable: true
    });
    Stickies.prototype.yPosition = function (node) {
        window.pageYOffset + node.getBoundingClientRect().top - utils_1.parseNumeric(getComputedStyle(node).top);
    };
    // push with order according to y value
    Stickies.prototype.pushSticky = function (sticky) {
        var _this = this;
        var index = this.stickies.findIndex(function (element) { return _this.yPosition(element.node) < _this.yPosition(sticky.node); });
        if (index === -1) {
            this.stickies.push(sticky);
            return this.stickies.length - 1;
        }
        this.stickies.splice(index, 0, sticky);
        return index;
    };
    Stickies.prototype.addOne = function (node, offset) {
        if (offset === void 0) { offset = 0; }
        if (!node)
            return;
        // Check if it is already applied to the node
        // and return existing sticky
        var sticky = this.stickies.find(function (element) { return element.node === node; });
        if (sticky)
            return sticky;
        sticky = new sticky_element_1.default(node, this.container, this.scrollContainers, this.stickies, offset);
        var index = this.pushSticky(sticky);
        for (var i = 0; i < this.stickies.length; ++i)
            this.stickies[i].stickiesUpdated(i);
        sticky.refresh();
        // this.stickies.forEach(sticky => sticky.updateLimits());
        return sticky;
    };
    Stickies.prototype.add = function (nodeList /* Collection of HTMLElement*/, offset) {
        if (offset === void 0) { offset = 0; }
        if (!nodeList)
            return;
        var nodeToAdd = undefined;
        if (nodeList instanceof HTMLElement)
            nodeToAdd = [nodeList];
        else
            nodeToAdd = nodeList;
        // Add every element as a sticky and return an array of created Sticky instances
        var addedStickies = [];
        for (var i = 0; i < nodeList.length; ++i) {
            addedStickies.push(this.addOne(nodeList[i], offset));
        }
        return addedStickies;
    };
    Stickies.prototype.refreshAll = function () {
        this.stickies.forEach(function (sticky) { return sticky.refresh(); });
    };
    Stickies.prototype.removeOne = function (element) {
        if (!element)
            return;
        var index = 0;
        if (element instanceof HTMLElement)
            index = this.stickies.findIndex(function (sticky) { return sticky.node === element; });
        else
            index = this.stickies.findIndex(function (sticky) { return sticky === element; });
        if (index === -1) {
            var sticky = this.stickies[index];
            sticky.deactivate();
            this.stickies.splice(index, 1); // delete element in array
        }
    };
    Stickies.prototype.remove = function (nodeList) {
        if (!nodeList)
            return;
        // Remove the stickies bound to the nodes in the list
        for (var i = 0; i < nodeList.length; ++i) {
            this.removeOne(nodeList[i]);
        }
    };
    Stickies.prototype.removeAll = function () {
        this.remove(this.stickies);
    };
    Stickies.prototype.updateScrollbarPositions = function (scrollEvent) {
        scrollEvent.scrollContainer.scrollbarContainerPosition.scrollTop = scrollEvent.scrollbarContainerPosition.scrollTop;
        scrollEvent.scrollContainer.scrollbarContainerPosition.scrollLeft = scrollEvent.scrollbarContainerPosition.scrollLeft;
    };
    Stickies.prototype.scrollRootContainer = function (scrollEvent) {
        // tslint:disable:brace-style
        // console.log('scrollRootContainer: ' + scrollEvent.debug);
        // X Scroll bar of the ROOT container
        if (scrollEvent.scrollContainer.scrollbarContainerPosition.scrollLeft !== scrollEvent.scrollbarContainerPosition.scrollLeft) {
            this.updateScrollbarPositions(scrollEvent);
            this.refreshAll();
        }
        else if (scrollEvent.scrollContainer.scrollbarContainerPosition.scrollTop !== scrollEvent.scrollbarContainerPosition.scrollTop) {
            this.updateScrollbarPositions(scrollEvent);
            // recalc position for all stickies
            this.stickies.forEach(function (sticky) {
                // sticky.updateEndLimit();
                sticky.recalcPosition(scrollEvent.scrollbarContainerPosition);
            }.bind(this));
        }
        // tslint:enable:brace-style
    };
    Stickies.prototype.scrollUpperContainer = function (scrollEvent) {
        // tslint:disable:brace-style
        // console.log('scrollUpperContainer: ' + scrollEvent.debug);
        if (scrollEvent.scrollContainer.scrollbarContainerPosition.scrollLeft !== scrollEvent.scrollbarContainerPosition.scrollLeft) {
            this.updateScrollbarPositions(scrollEvent);
            this.refreshAll();
        }
        else if (scrollEvent.scrollContainer.scrollbarContainerPosition.scrollTop !== scrollEvent.scrollbarContainerPosition.scrollTop) {
            this.updateScrollbarPositions(scrollEvent);
            // recalc position for all stickies
            this.stickies.forEach(function (sticky) {
                // sticky.updateEndLimit();
                /* sticky.recalcPosition(
                    scrollEvent.scrollbarContainerPosition,
                    this.scrollContainers.intersectionContainer); */
                sticky.recalcContainerPosition(scrollEvent.scrollbarContainerPosition);
            }.bind(this));
        }
        // tslint:enable:brace-style
    };
    Stickies.prototype.scrollHandler = function (scrollEvent) {
        if (scrollEvent.isRootScrollContainer)
            this.scrollRootContainer(scrollEvent);
        else
            this.scrollUpperContainer(scrollEvent);
    };
    Stickies.prototype.init = function () {
        // handle event
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners
        var options = {
            passive: true,
        };
        // Watch for window resizes and device orientation cahnges and trigger refresh
        window.addEventListener('resizeOptimized' + Stickies.uniqueId, this.refreshAll.bind(this), utils_1.checkPassiveFeatureInEventListener() ? options : false);
        window.addEventListener('orientationchangeOptimized' + Stickies.uniqueId, this.refreshAll.bind(this), utils_1.checkPassiveFeatureInEventListener() ? options : false);
    };
    Stickies.prototype.initEvents = function () {
        paint_utils_1.paintEventFactory({ type: 'resize', name: 'resizeOptimized' + Stickies.uniqueId });
        paint_utils_1.paintEventFactory({ type: 'orientationchange', name: 'orientationchangeOptimized' + Stickies.uniqueId });
    };
    Stickies.uniqueId = guid_1.default();
    Stickies.firstInstance = true;
    return Stickies;
}());
exports.Stickies = Stickies;
//# sourceMappingURL=stickies.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(0);
var clipPath_1 = __webpack_require__(28);
function assign(targetObj, sourceObject) {
    for (var _i = 0, _a = Object.getOwnPropertyNames(sourceObject); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        targetObj[name_1] = sourceObject[name_1];
    }
    return targetObj;
}
var docHiddenKey;
var visibilityChangeEventName;
if ('hidden' in document) {
    docHiddenKey = 'hidden';
    visibilityChangeEventName = 'visibilitychange';
}
else if ('webkitHidden' in document) {
    docHiddenKey = 'webkitHidden';
    visibilityChangeEventName = 'webkitvisibilitychange';
}
var CSSNumber = /** @class */ (function () {
    function CSSNumber(value, inRange) {
        if (inRange === void 0) { inRange = function (value) { return true; }; }
        this.inRange = inRange;
        if (!this.inRange(value))
            throw new Error(value + ' is not an acceptable value');
        this.value = value;
    }
    Object.defineProperty(CSSNumber.prototype, "n", {
        get: function () {
            return this.value;
        },
        set: function (value) {
            this.value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CSSNumber.prototype, "px", {
        get: function () {
            return this.value + 'px';
        },
        enumerable: true,
        configurable: true
    });
    CSSNumber.prototype.toString = function () {
        throw new Error('Coercion forbidden');
    };
    return CSSNumber;
}());
var CSSNumberEnum;
(function (CSSNumberEnum) {
    CSSNumberEnum[CSSNumberEnum["all"] = 0] = "all";
    CSSNumberEnum[CSSNumberEnum["positif"] = 1] = "positif";
})(CSSNumberEnum || (CSSNumberEnum = {}));
function cssNumber(value, type) {
    if (type === void 0) { type = undefined; }
    if (type === undefined || type === CSSNumberEnum.all)
        return new CSSNumber(value);
    if (type === CSSNumberEnum.positif)
        return new CSSNumber(value);
}
// @Injectable()
var StickyElement = /** @class */ (function () {
    function StickyElement(node, container, scrollContainers, stickies, top) {
        if (top === void 0) { top = 0; }
        this.debugId = 0;
        if (!(node instanceof HTMLElement))
            throw new Error('First argument must be a HTMLElement');
        ++StickyElement.id;
        this.debugId = StickyElement.id;
        this._node = node;
        this.container = container;
        this.scrollContainers = scrollContainers;
        this.topGap = top;
        this.stickies = stickies;
        this.stickyMode = undefined;
        this.limits = { start: 0, end: 0 };
        // this.refresh();
        // Fast dirty check for layout changes every 500ms
        var fastCheckTimer;
        var startFastCheckTimer = function () {
            fastCheckTimer = setInterval(function () { return function (sticky) { return sticky.fastCheck(); }; }, 500);
        };
        var stopFastCheckTimer = function () { return clearInterval(fastCheckTimer); };
        if (visibilityChangeEventName) {
            if (!document[docHiddenKey])
                startFastCheckTimer();
            document.addEventListener(visibilityChangeEventName, function () {
                if (document[docHiddenKey]) {
                    stopFastCheckTimer();
                }
                else {
                    startFastCheckTimer();
                }
            });
        }
        else
            startFastCheckTimer();
    }
    Object.defineProperty(StickyElement.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: true,
        configurable: true
    });
    StickyElement.prototype.getDocOffsetTop = function (node) {
        var docOffsetTop = 0;
        var current = node;
        while (current) {
            docOffsetTop += current.offsetTop;
            current = current.offsetParent;
        }
        return docOffsetTop;
    };
    StickyElement.prototype.stickiesUpdated = function (currentIndex) {
        this.index = currentIndex;
        this.nbStickies = this.stickies.length;
        if (this.scrollContainers.intersectionContainer !== undefined)
            this.updateLimits();
    };
    StickyElement.prototype.refresh = function () {
        this.deactivate();
        /*
         * 1. Save node computed props
         */
        var nodeComputedStyle = getComputedStyle(this.node);
        this.margins = {
            top: utils_1.parseNumeric(nodeComputedStyle.marginTop),
            bottom: utils_1.parseNumeric(nodeComputedStyle.marginBottom),
            left: utils_1.parseNumeric(nodeComputedStyle.marginLeft),
            right: utils_1.parseNumeric(nodeComputedStyle.marginRight)
        };
        // Check if the node can be activated
        if ((nodeComputedStyle.top !== 'auto' && isNaN(parseFloat(nodeComputedStyle.top))) ||
            nodeComputedStyle.display === 'table-cell' ||
            nodeComputedStyle.display === 'none')
            throw new Error("Node can not be a Sticky node because the display is " + nodeComputedStyle.display);
        var containerNode = this.container.host ? this.container.host : this.container;
        this.containerSaved = {
            styles: {
                position: containerNode.style.position,
            },
            offsetHeight: containerNode.offsetHeight,
        };
        var nodeCoordViewport = this.node.getBoundingClientRect();
        this.positionAbsViewport = {
            top: undefined,
            left: nodeCoordViewport.left,
        };
        this.dimensions = {
            height: nodeCoordViewport.height,
            width: nodeCoordViewport.width,
        };
        var inlineNodeStyle = this.node.style;
        this.inlineStyles = {
            position: inlineNodeStyle.position,
            top: inlineNodeStyle.top,
            bottom: inlineNodeStyle.bottom,
            left: inlineNodeStyle.left,
            right: inlineNodeStyle.right,
            width: inlineNodeStyle.width,
            marginTop: inlineNodeStyle.marginTop,
            marginLeft: inlineNodeStyle.marginLeft,
            marginRight: inlineNodeStyle.marginRight,
        };
        var rootScrollContainerCoordComputedStyle = getComputedStyle(this.scrollContainers.rootScrollContainer.element);
        // Ensure that the node will be positioned relatively to the container node
        var rootScrollContainerPosition = rootScrollContainerCoordComputedStyle.position;
        if (rootScrollContainerPosition !== 'absolute' && rootScrollContainerPosition !== 'relative') {
            this.scrollContainers.rootScrollContainer.element.style.position = 'relative';
        }
        // GROS CHANGEMENT
        var rootScrollContainerCoordViewport = this.scrollContainers.rootScrollContainer.getCleanedBoundingRect();
        this.positionRelativeToRootScrollContainer = {
            top: nodeCoordViewport.top - rootScrollContainerCoordViewport.top,
            left: nodeCoordViewport.left - rootScrollContainerCoordViewport.left,
        };
        // Clone creation
        this.clone = {};
        this.clone.node = this.node.cloneNode(true);
        this.clone.node.className = '';
        this.clone.node.style.position = 'static';
        this.clone.node.style.visibility = 'hidden';
        // initialisation of this.stickyMode
        // this.recalcPosition(this.scrollContainers.scrollContainersCollection.get(0).scrollPosition());
        // we postione in absolute the node now (like if it was an stickyMode=start) because after we add a node.clone (see next line)
        // just before node, and so the next sticky node would compute positionRelativeToRootScrollContainer with the node.clone height extra
        // and then so on for the next next sticky nodes.
        this.node.style.margin = '0';
        this.startPosition();
        this.node.parentNode.insertBefore(this.clone.node, this.node);
        this.clone.docOffsetTop = this.getDocOffsetTop(this.clone.node);
        // update limits if the rootScrollContainer is visible
        if (this.scrollContainers.intersectionContainer)
            this.updateLimits();
    };
    StickyElement.prototype.startPosition = function () {
        this.updateStyle({
            position: 'absolute',
            top: this.positionRelativeToRootScrollContainer.top,
            left: this.positionRelativeToRootScrollContainer.left,
            height: this.dimensions.height,
            width: this.dimensions.width,
        });
    };
    StickyElement.prototype.updateStyle = function (style) {
        Object.assign(this.node.style, {
            position: style.position,
            top: style.top + 'px',
            left: style.left + 'px',
            height: style.height + 'px',
            width: style.width + 'px',
        });
    };
    StickyElement.prototype.updateLimits = function () {
        this.limits.start = this.y_to_K_shift0Inter(this.clone.node) - this.topGap - this.margins.top;
        if (this.index === this.nbStickies - 1) {
            this.limits.end = this.y_to_K_shift0Inter(this.container) +
                this.container.offsetHeight -
                this.clone.node.offsetHeight -
                utils_1.parseNumeric(getComputedStyle(this.container).borderBottomWidth) -
                this.topGap;
        }
        else {
            this.limits.end =
                this.y_to_K_shift0Inter(this.stickies[this.index + 1].clone.node) -
                    this.node.offsetHeight
                    - 2 * this.topGap;
        }
        this.limits.end = this.limits.end - this.margins.top - this.margins.bottom;
    };
    // returns y⋂/SK0
    StickyElement.prototype.y_to_K_shift0Inter = function (node) {
        // Absolute Coordinates -> rootScrollK Coordinates y/SK
        return node.getBoundingClientRect().top - this.scrollContainers.rootScrollContainer.getCleanedBoundingRect().top
            // Shift Δ0 -> first element in rootScrollK is y === 0 ==> y/SK0
            + this.scrollContainers.rootScrollContainer.element.scrollTop
            // Shift Δ⋂ (intersection) -> first element in rootScrollK is y ===  Δ⋂ (Δ⋂ > 0 because always visible ==> ⋂ is inside SK) ==> y⋂/SK0
            - (this.scrollContainers.intersectionContainer.top - this.scrollContainers.rootScrollContainer.getCleanedBoundingRect().top);
        // All together y⋂/SK0 > 0
    };
    StickyElement.prototype.updateStickyMode = function (scrollContainerPosition) {
        var oldStickyMode = this.stickyMode;
        this.stickyMode =
            scrollContainerPosition.scrollTop <= this.limits.start ?
                'start' :
                scrollContainerPosition.scrollTop >= this.limits.end ? 'end' : 'middle';
        return oldStickyMode;
    };
    StickyElement.prototype.recalcContainerPosition = function (scrollContainerPosition) {
        this.updateLimits();
        this.recalcPosition(this.scrollContainers.rootScrollContainer.scrollPosition(), true);
    };
    StickyElement.prototype.recalcPosition = function (scrollContainerPosition, forceRepaint) {
        if (forceRepaint === void 0) { forceRepaint = false; }
        var oldStickyMode = this.updateStickyMode(scrollContainerPosition);
        if (this.scrollContainers.intersectionContainer.bottom - this.scrollContainers.intersectionContainer.top - this.topGap - this.margins.top <
            utils_1.parseNumeric(getComputedStyle(this.node).height) && this.stickyMode === 'middle') {
            var maskBottom = this.scrollContainers.intersectionContainer.bottom - this.node.getBoundingClientRect().top;
            var maskBottomPerc = maskBottom / (this.node.offsetHeight) * 100;
            var polygon = [
                { x: '0', y: '0' },
                { x: '100%', y: '0' },
                { x: '100%', y: maskBottomPerc + "%" },
                { x: '0', y: maskBottomPerc + "%" }
            ];
            clipPath_1.featureClipPath.shim(this.node, polygon);
            // tslint:disable-next-line:no-parameter-reassignment
            // forceRepaint = true;
        }
        else {
            this.node.style[clipPath_1.featureClipPath.propNameSupported()] = '';
            // tslint:disable-next-line:no-parameter-reassignment
            // forceRepaint = true;
        }
        if (!forceRepaint && this.stickyMode === oldStickyMode)
            return;
        if (this === this.stickies[2]) {
            console.log('recalcPosition', 'scroll: ' + scrollContainerPosition.scrollTop, '\n', this.scrollContainers.intersectionContainer, '\n', 'start: ' + this.limits.start, '\n', 'end ' + this.limits.end, '\n', 'mode', this.stickyMode);
        }
        switch (this.stickyMode) {
            case 'start':
                this.startPosition();
                break;
            case 'middle':
                this.updateStyle({
                    position: 'fixed',
                    left: this.positionAbsViewport.left,
                    top: this.scrollContainers.intersectionContainer.top + this.topGap + this.margins.top,
                    height: this.dimensions.height,
                    width: this.dimensions.width,
                });
                this.node.classList.add('is-sticky');
                break;
            case 'end':
                console.log(scrollContainerPosition.scrollTop - this.limits.end);
                // correction of scoll increment (it's not px per px the scorlling increment
                // only when we pass from middle to end (because when an upper container is moving, forceRepaint===true and we are not changing mode necesserily).
                // We could test actually forceRepaint===false but it's not so safe if the method is called from outside with forceRepaint===true
                var deltaScrollCorrection = oldStickyMode !== this.stickyMode ? scrollContainerPosition.scrollTop - this.limits.end : 0;
                this.updateStyle({
                    position: 'absolute',
                    left: this.positionRelativeToRootScrollContainer.left,
                    top: this.node.getBoundingClientRect().top - this.scrollContainers.rootScrollContainer.getCleanedBoundingRect().top +
                        scrollContainerPosition.scrollTop -
                        deltaScrollCorrection,
                    height: this.dimensions.height,
                    width: this.dimensions.width,
                });
                this.node.classList.remove('is-sticky');
                break;
        }
    };
    StickyElement.prototype.fastCheck = function () {
        if (Math.abs(this.getDocOffsetTop(this.clone.node) - this.clone.docOffsetTop) > 1 ||
            Math.abs(this.container.offsetHeight - this.containerSaved.offsetHeight) > 1)
            this.refresh();
    };
    StickyElement.prototype.deactivate = function () {
        var _this = this;
        if (this.clone === undefined)
            return;
        this.clone.node.parentNode.removeChild(this.clone.node);
        Object.assign(this.node.style, this.inlineStyles);
        // Check whether element’s container node is used by other stickies.
        // If not, restore container node’s styles.
        if (!this.stickies.some(function (sticky) { return sticky !== _this && sticky.container === _this.container; })) {
            Object.assign(this.container.style, this.containerSaved.styles);
        }
    };
    StickyElement.id = 0;
    return StickyElement;
}());
exports.default = StickyElement;
//# sourceMappingURL=sticky-element.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/milottit/Libraries/FeaturesDetection/src/features/css/clipPath.ts Unexpected token (4:7)\nYou may need an appropriate loader to handle this file type.\n| import { FeatureCSS } from './../../featureCSS';\n| \n| export type Polygon = Array<{ x: string, y: string }>;\n| \n| ");

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__featuresDetection__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__featuresDetection___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__featuresDetection__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__featureJS__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__featureJS___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__featureJS__);



const rafFeature = new __WEBPACK_IMPORTED_MODULE_1__featureJS__["FeatureJS"]('requestAnimationFrame', {
    test: () => window.requestAnimationFrame !== undefined,
    polyfill: () => { __webpack_require__(32).polyfill(); }
});
/* harmony export (immutable) */ __webpack_exports__["rafFeature"] = rafFeature;



__WEBPACK_IMPORTED_MODULE_0__featuresDetection__["FeaturesDetection"].js.features.add(rafFeature);


/***/ }),
/* 30 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/milottit/Libraries/FeaturesDetection/src/featuresDetection.ts Unexpected token (6:11)\nYou may need an appropriate loader to handle this file type.\n| \n| export class FeaturesDetectionn {\n|     public readonly css = new FeaturesDetectionCSS();\n|     public readonly js = new FeaturesDetectionJS();\n| ");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

throw new Error("Module parse failed: /home/milottit/Libraries/FeaturesDetection/src/featureJS.ts Unexpected token (6:7)\nYou may need an appropriate loader to handle this file type.\n| \n| \n| export interface FeatureJSOption {\n|     usePolyfill?: boolean;\n|     forceRecompute?: boolean;");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var now = __webpack_require__(33)
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

//# sourceMappingURL=performance-now.js.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ }),
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var scroll_container_1 = __webpack_require__(36);
var utils_1 = __webpack_require__(0);
var scrollbar_1 = __webpack_require__(8);
var Subject_1 = __webpack_require__(45);
var ScrollContainersCollection = /** @class */ (function () {
    function ScrollContainersCollection() {
        this.collection = [];
    }
    Object.defineProperty(ScrollContainersCollection.prototype, "length", {
        get: function () {
            return this.collection.length;
        },
        enumerable: true,
        configurable: true
    });
    ScrollContainersCollection.prototype[Symbol.iterator] = function () {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(this.collection[i] !== undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.collection[i].scrollContainer];
                case 2:
                    _a.sent();
                    ++i;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    ScrollContainersCollection.prototype.get = function (index) {
        return this.collection[index].scrollContainer;
    };
    ScrollContainersCollection.prototype.release = function () {
        for (var _i = 0, _a = this.collection; _i < _a.length; _i++) {
            var element = _a[_i];
            element.subscription.unsubscribe();
        }
        this.collection = [];
    };
    ScrollContainersCollection.prototype.push = function (scrollContainer, subscription) {
        this.collection.push({ scrollContainer: scrollContainer, subscription: subscription });
    };
    ScrollContainersCollection.prototype.findIndex = function (scrollContainer) {
        return this.collection.findIndex(function (element) { return element.scrollContainer === scrollContainer; });
    };
    return ScrollContainersCollection;
}());
exports.ScrollContainersCollection = ScrollContainersCollection;
var ScrollContainers = /** @class */ (function () {
    function ScrollContainers(rootContainer) {
        this.scrollContainers = new ScrollContainersCollection(); // ReleasableCollaction<ScrollContainer> = new ReleasableCollaction();
        this.scrollObservable$ = new Subject_1.Subject();
        this.rootContainer = rootContainer;
        this.createIntersectionDiv();
        this.updateScrollableContainers();
    }
    Object.defineProperty(ScrollContainers.prototype, "scollObservable", {
        get: function () {
            return this.scrollObservable$;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollContainers.prototype, "intersectionContainer", {
        get: function () {
            return this._intersectionContainer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollContainers.prototype, "intersectionDiv", {
        get: function () {
            return this._intersectionDiv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollContainers.prototype, "scrollContainersCollection", {
        get: function () {
            return this.scrollContainers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollContainers.prototype, "rootScrollContainer", {
        get: function () {
            return this.scrollContainers.get(0);
        },
        enumerable: true,
        configurable: true
    });
    ScrollContainers.prototype[Symbol.iterator] = function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.scrollContainers[Symbol.iterator]];
        });
    };
    ScrollContainers.prototype.createIntersectionDiv = function () {
        this._intersectionDiv = document.createElement('div');
        document.body.appendChild(this.intersectionDiv);
        utils_1.setDocumentBorderSizing();
        Object.assign(this.intersectionDiv.style, {
            position: 'fixed',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            border: '2px solid black',
            overflow: 'hidden',
            opacity: '1.0',
            display: 'none'
        });
    };
    ScrollContainers.prototype.showIntersectionDiv = function () {
        this.updateIntersectionDisplay();
        this.intersectionDiv.style.display = 'block';
    };
    ScrollContainers.prototype.hideIntersectionDiv = function () {
        this.intersectionDiv.style.display = 'none';
    };
    ScrollContainers.prototype.isShadowRoot = function (element) {
        return element.host !== undefined;
    };
    ScrollContainers.prototype.unshadowElement = function (element) {
        return this.isShadowRoot(element) ? element.host : element;
    };
    ScrollContainers.prototype.isContainerVisible = function () {
        // the intersection is empty
        if (this.intersectionContainer === undefined)
            return false;
        var rootScrollKCleanedRect = this.scrollContainers.get(0).getCleanedBoundingRect();
        if (rootScrollKCleanedRect.top > this.intersectionContainer.bottom || rootScrollKCleanedRect.bottom < this.intersectionContainer.top)
            return false;
        return true;
    };
    ScrollContainers.prototype.containerScrolled = function (scrollEvent) {
        var scrolledIndex = this.scrollContainers.findIndex(scrollEvent.scrollContainer);
        this.emitEventIfVisisble(scrolledIndex, scrollEvent);
    };
    ScrollContainers.prototype.emitEventIfVisisble = function (indexScrollContainer, scrollEvent) {
        this.updateIntersectionContainers();
        if (this.isContainerVisible()) {
            this.showIntersectionDiv();
            this.scollObservable.next(Object.assign(scrollEvent, { isRootScrollContainer: indexScrollContainer === 0 }));
        }
        else {
            this.hideIntersectionDiv();
        }
    };
    ScrollContainers.prototype.updateScrollableContainers = function () {
        this.scrollContainers.release();
        var current = this.rootContainer; // the stickies containers. Not necesseray scrollable
        var onlyWindowScrollable = true;
        var scrollContainer;
        var subscirption;
        while (true) {
            current = this.unshadowElement(current);
            if (scrollbar_1.hasScrollbar(current)) {
                onlyWindowScrollable = false;
                scrollContainer = new scroll_container_1.ScrollContainer(current);
                subscirption = scrollContainer.scollObservable.subscribe(this.containerScrolled.bind(this));
                this.scrollContainers.push(scrollContainer, subscirption);
            }
            if (current === document.documentElement)
                break;
            current = current.parentNode;
        }
        var fakeScrollEvent = {
            scrollbarContainerPosition: this.scrollContainers.get(0).scrollPosition(),
            isRootScrollContainer: true,
            scrollContainer: this.scrollContainers.get(0)
        };
        this.containerScrolled(fakeScrollEvent);
    };
    ScrollContainers.prototype.updateIntersectionDisplay = function () {
        /*
        let totatBorderTopBottom = 0;

        for (let i = 1; i < this.scrollContainers.length; ++i) {
            const style = getComputedStyle(this.scrollContainers.get(i).element);
            totatBorderTopBottom += parseNumeric(style.borderTop) + parseNumeric(style.borderBottom);
        }*/
        var debugStyle = getComputedStyle(this.intersectionDiv);
        Object.assign(this.intersectionDiv.style, {
            top: this.intersectionContainer.top + 'px',
            height: this.intersectionContainer.bottom - this.intersectionContainer.top + 'px',
            // - parseNumeric(debugStyle.borderTop) - parseNumeric(debugStyle.borderBottom) + 'px',
            left: this.intersectionContainer.left + 'px',
            width: this.intersectionContainer.right - this.intersectionContainer.left + 'px'
            // - parseNumeric(debugStyle.borderLeft) - parseNumeric(debugStyle.borderRight) + 'px',
        });
    };
    ScrollContainers.prototype.updateIntersectionContainers = function () {
        this._intersectionContainer = this.scrollContainers.get(0).getCleanedBoundingRect();
        if (this.scrollContainers.length === 1)
            return;
        var boundRect;
        // debug 
        this.scrollContainers.get(0).updateDebugDiv();
        for (var i = 1; i < this.scrollContainers.length; ++i) {
            // debug
            this.scrollContainers.get(i).updateDebugDiv();
            boundRect = this.scrollContainers.get(i).getCleanedBoundingRect();
            // TOP
            if (boundRect.top > this.intersectionContainer.bottom) {
                this._intersectionContainer = undefined;
                return;
            }
            if (boundRect.top > this.intersectionContainer.top)
                this.intersectionContainer.top = boundRect.top;
            // BOTTOM
            if (boundRect.bottom < this.intersectionContainer.top) {
                this._intersectionContainer = undefined;
                return;
            }
            if (boundRect.bottom < this.intersectionContainer.bottom)
                this.intersectionContainer.bottom = boundRect.bottom;
            // LEFT
            if (boundRect.left > this.intersectionContainer.right) {
                this._intersectionContainer = undefined;
                return;
            }
            if (boundRect.left > this.intersectionContainer.left)
                this.intersectionContainer.left = boundRect.left;
            // RIGHT
            if (boundRect.right < this.intersectionContainer.left) {
                this._intersectionContainer = undefined;
                return;
            }
            if (boundRect.right < this.intersectionContainer.right)
                this.intersectionContainer.right = boundRect.right;
        }
        // console.log(this.intersectionContainer);
    };
    return ScrollContainers;
}());
exports.ScrollContainers = ScrollContainers;
//# sourceMappingURL=scroll-containers.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var paint_utils_1 = __webpack_require__(5);
var guid_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
var scrollbar_1 = __webpack_require__(8);
var Observable_1 = __webpack_require__(9);
var ScrollContainer = /** @class */ (function () {
    function ScrollContainer(element) {
        this._element = element;
        if (element === document.documentElement)
            this.elementScrolled = window; // or document, it's the same for the scrolling
        else
            this.elementScrolled = element;
        this.scrollbarContainerPosition = this.scrollPosition();
        this.addEventListener();
        // this.createDebugDiv();
    }
    Object.defineProperty(ScrollContainer.prototype, "element", {
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScrollContainer.prototype, "scollObservable", {
        get: function () {
            return this.scollObservable$;
        },
        enumerable: true,
        configurable: true
    });
    ScrollContainer.prototype.createDebugDiv = function () {
        // setDocumentBorderSizing();
        this.debugDiv = document.createElement('div');
        document.body.appendChild(this.debugDiv);
        document.body.classList.add('debug');
        Object.assign(this.debugDiv.style, {
            position: 'fixed',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            border: '3px solid purple',
            opacity: '1.0',
            zIndex: '-1000'
        });
        this.updateDebugDiv();
    };
    /*public showIntersectionDiv() {
        this.debugDiv.style.display = 'block';
    }

    private hideIntersectionDiv() {
        this.debugDiv.style.display = 'none';
    }*/
    ScrollContainer.prototype.updateDebugDiv = function () {
        if (!this.debugDiv)
            return;
        var cleanedRect = this.getCleanedBoundingRect();
        var debugStyle = getComputedStyle(this.debugDiv);
        Object.assign(this.debugDiv.style, {
            top: cleanedRect.top + 'px',
            height: cleanedRect.bottom - cleanedRect.top + 'px',
            left: cleanedRect.left + 'px',
            width: cleanedRect.right - cleanedRect.left + 'px' // - parseNumeric(debugStyle.borderLeft) - parseNumeric(debugStyle.borderRight) + 'px',
        });
    };
    ScrollContainer.prototype.scrollPosition = function () {
        if (this.elementScrolled instanceof Window) {
            return { scrollTop: window.pageYOffset, scrollLeft: window.pageXOffset };
        }
        // else
        return { scrollTop: this.elementScrolled.scrollTop, scrollLeft: this.elementScrolled.scrollLeft };
    };
    // like element.getBoundingClientRect working also for Window BUT removing the scrollbar size and border
    ScrollContainer.prototype.getCleanedBoundingRect = function () {
        var scrolllbarSize = scrollbar_1.scrollbarSizes(this.element);
        if (this.elementScrolled instanceof Window) {
            return {
                top: 0,
                bottom: window.innerHeight - scrolllbarSize.bottom,
                left: 0 + scrolllbarSize.left,
                right: window.innerWidth - scrolllbarSize.right
            };
        }
        // else
        var rect = this.elementScrolled.getBoundingClientRect();
        var style = getComputedStyle(this.elementScrolled);
        return {
            top: rect.top + utils_1.parseNumeric(style.borderBottom),
            bottom: rect.bottom - scrolllbarSize.bottom - utils_1.parseNumeric(style.borderBottom),
            left: rect.left + scrolllbarSize.left + utils_1.parseNumeric(style.borderLeft),
            right: rect.right - scrolllbarSize.right - utils_1.parseNumeric(style.borderRight)
        };
    };
    ScrollContainer.prototype.addEventListener = function () {
        var scrollEvent = {
            type: 'scroll',
            name: 'scrollOptimized' + ScrollContainer.uniqueId,
            elementTarget: this.elementScrolled,
            update: function () {
                return {
                    scrollContainer: this,
                    scrollbarContainerPosition: this.scrollPosition()
                };
            }.bind(this),
            debug: this.elementScrolled instanceof Window ? 'Window-ScrollOptimized' : 'NotWindow-ScrollOptimized ' + this.elementScrolled.id,
        };
        paint_utils_1.paintEventFactory(scrollEvent);
        var options = {
            passive: true,
        };
        var subscribe = function (observer) {
            this.parameterEventListener = [
                'scrollOptimized' + ScrollContainer.uniqueId,
                function (event) { return observer.next(event.detail); },
                utils_1.checkPassiveFeatureInEventListener() ? options : false
            ];
            this.elementScrolled.addEventListener.apply(this.elementScrolled, this.parameterEventListener);
            return function unsubscribe() {
                // to not have few times a listner on the same scrollContainer
                this.elementScrolled.removeEventListener.apply(this.elementScrolled, this.parameterEventListener);
            }.bind(this);
        }.bind(this);
        this.scollObservable$ = Observable_1.Observable.create(subscribe);
    };
    ScrollContainer.prototype.release = function () {
        // to not have few times a listner on the same scrollContainer
        // this.elementScrolled.removeEventListener.apply(this.elementScrolled, this.parameterEventListener);
    };
    ScrollContainer.uniqueId = guid_1.default();
    return ScrollContainer;
}());
exports.ScrollContainer = ScrollContainer;
//# sourceMappingURL=scroll-container.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Subscriber_1 = __webpack_require__(10);
var rxSubscriber_1 = __webpack_require__(4);
var Observer_1 = __webpack_require__(13);
function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
        if (nextOrObserver instanceof Subscriber_1.Subscriber) {
            return nextOrObserver;
        }
        if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
            return nextOrObserver[rxSubscriber_1.rxSubscriber]();
        }
    }
    if (!nextOrObserver && !error && !complete) {
        return new Subscriber_1.Subscriber(Observer_1.empty);
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
}
exports.toSubscriber = toSubscriber;
//# sourceMappingURL=toSubscriber.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.isArray = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });
//# sourceMappingURL=isArray.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function isObject(x) {
    return x != null && typeof x === 'object';
}
exports.isObject = isObject;
//# sourceMappingURL=isObject.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var errorObject_1 = __webpack_require__(12);
var tryCatchTarget;
function tryCatcher() {
    try {
        return tryCatchTarget.apply(this, arguments);
    }
    catch (e) {
        errorObject_1.errorObject.e = e;
        return errorObject_1.errorObject;
    }
}
function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
}
exports.tryCatch = tryCatch;
;
//# sourceMappingURL=tryCatch.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when one or more errors have occurred during the
 * `unsubscribe` of a {@link Subscription}.
 */
var UnsubscriptionError = (function (_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
        _super.call(this);
        this.errors = errors;
        var err = Error.call(this, errors ?
            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
        this.name = err.name = 'UnsubscriptionError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return UnsubscriptionError;
}(Error));
exports.UnsubscriptionError = UnsubscriptionError;
//# sourceMappingURL=UnsubscriptionError.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var root_1 = __webpack_require__(2);
function getSymbolObservable(context) {
    var $$observable;
    var Symbol = context.Symbol;
    if (typeof Symbol === 'function') {
        if (Symbol.observable) {
            $$observable = Symbol.observable;
        }
        else {
            $$observable = Symbol('observable');
            Symbol.observable = $$observable;
        }
    }
    else {
        $$observable = '@@observable';
    }
    return $$observable;
}
exports.getSymbolObservable = getSymbolObservable;
exports.observable = getSymbolObservable(root_1.root);
/**
 * @deprecated use observable instead
 */
exports.$$observable = exports.observable;
//# sourceMappingURL=observable.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var noop_1 = __webpack_require__(44);
/* tslint:enable:max-line-length */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i - 0] = arguments[_i];
    }
    return pipeFromArray(fns);
}
exports.pipe = pipe;
/* @internal */
function pipeFromArray(fns) {
    if (!fns) {
        return noop_1.noop;
    }
    if (fns.length === 1) {
        return fns[0];
    }
    return function piped(input) {
        return fns.reduce(function (prev, fn) { return fn(prev); }, input);
    };
}
exports.pipeFromArray = pipeFromArray;
//# sourceMappingURL=pipe.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-empty */
function noop() { }
exports.noop = noop;
//# sourceMappingURL=noop.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable_1 = __webpack_require__(9);
var Subscriber_1 = __webpack_require__(10);
var Subscription_1 = __webpack_require__(3);
var ObjectUnsubscribedError_1 = __webpack_require__(46);
var SubjectSubscription_1 = __webpack_require__(47);
var rxSubscriber_1 = __webpack_require__(4);
/**
 * @class SubjectSubscriber<T>
 */
var SubjectSubscriber = (function (_super) {
    __extends(SubjectSubscriber, _super);
    function SubjectSubscriber(destination) {
        _super.call(this, destination);
        this.destination = destination;
    }
    return SubjectSubscriber;
}(Subscriber_1.Subscriber));
exports.SubjectSubscriber = SubjectSubscriber;
/**
 * @class Subject<T>
 */
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        _super.call(this);
        this.observers = [];
        this.closed = false;
        this.isStopped = false;
        this.hasError = false;
        this.thrownError = null;
    }
    Subject.prototype[rxSubscriber_1.rxSubscriber] = function () {
        return new SubjectSubscriber(this);
    };
    Subject.prototype.lift = function (operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
    };
    Subject.prototype.next = function (value) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        if (!this.isStopped) {
            var observers = this.observers;
            var len = observers.length;
            var copy = observers.slice();
            for (var i = 0; i < len; i++) {
                copy[i].next(value);
            }
        }
    };
    Subject.prototype.error = function (err) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.hasError = true;
        this.thrownError = err;
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].error(err);
        }
        this.observers.length = 0;
    };
    Subject.prototype.complete = function () {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        this.isStopped = true;
        var observers = this.observers;
        var len = observers.length;
        var copy = observers.slice();
        for (var i = 0; i < len; i++) {
            copy[i].complete();
        }
        this.observers.length = 0;
    };
    Subject.prototype.unsubscribe = function () {
        this.isStopped = true;
        this.closed = true;
        this.observers = null;
    };
    Subject.prototype._trySubscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else {
            return _super.prototype._trySubscribe.call(this, subscriber);
        }
    };
    Subject.prototype._subscribe = function (subscriber) {
        if (this.closed) {
            throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
        else if (this.hasError) {
            subscriber.error(this.thrownError);
            return Subscription_1.Subscription.EMPTY;
        }
        else if (this.isStopped) {
            subscriber.complete();
            return Subscription_1.Subscription.EMPTY;
        }
        else {
            this.observers.push(subscriber);
            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        }
    };
    Subject.prototype.asObservable = function () {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
    };
    Subject.create = function (destination, source) {
        return new AnonymousSubject(destination, source);
    };
    return Subject;
}(Observable_1.Observable));
exports.Subject = Subject;
/**
 * @class AnonymousSubject<T>
 */
var AnonymousSubject = (function (_super) {
    __extends(AnonymousSubject, _super);
    function AnonymousSubject(destination, source) {
        _super.call(this);
        this.destination = destination;
        this.source = source;
    }
    AnonymousSubject.prototype.next = function (value) {
        var destination = this.destination;
        if (destination && destination.next) {
            destination.next(value);
        }
    };
    AnonymousSubject.prototype.error = function (err) {
        var destination = this.destination;
        if (destination && destination.error) {
            this.destination.error(err);
        }
    };
    AnonymousSubject.prototype.complete = function () {
        var destination = this.destination;
        if (destination && destination.complete) {
            this.destination.complete();
        }
    };
    AnonymousSubject.prototype._subscribe = function (subscriber) {
        var source = this.source;
        if (source) {
            return this.source.subscribe(subscriber);
        }
        else {
            return Subscription_1.Subscription.EMPTY;
        }
    };
    return AnonymousSubject;
}(Subject));
exports.AnonymousSubject = AnonymousSubject;
//# sourceMappingURL=Subject.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * An error thrown when an action is invalid because the object has been
 * unsubscribed.
 *
 * @see {@link Subject}
 * @see {@link BehaviorSubject}
 *
 * @class ObjectUnsubscribedError
 */
var ObjectUnsubscribedError = (function (_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
        var err = _super.call(this, 'object unsubscribed');
        this.name = err.name = 'ObjectUnsubscribedError';
        this.stack = err.stack;
        this.message = err.message;
    }
    return ObjectUnsubscribedError;
}(Error));
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
//# sourceMappingURL=ObjectUnsubscribedError.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Subscription_1 = __webpack_require__(3);
/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
var SubjectSubscription = (function (_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, subscriber) {
        _super.call(this);
        this.subject = subject;
        this.subscriber = subscriber;
        this.closed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function () {
        if (this.closed) {
            return;
        }
        this.closed = true;
        var subject = this.subject;
        var observers = subject.observers;
        this.subject = null;
        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
            return;
        }
        var subscriberIndex = observers.indexOf(this.subscriber);
        if (subscriberIndex !== -1) {
            observers.splice(subscriberIndex, 1);
        }
    };
    return SubjectSubscription;
}(Subscription_1.Subscription));
exports.SubjectSubscription = SubjectSubscription;
//# sourceMappingURL=SubjectSubscription.js.map

/***/ })
/******/ ]);