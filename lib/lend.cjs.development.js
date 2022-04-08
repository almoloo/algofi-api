'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var algosdk = require('algosdk');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

var contracts = {
  testnet: {
    SYMBOLS: ["ALGO", "USDC", "goBTC", "goETH", "STBL", "vALGO", "SEVN", "EGHT", "NINE", "TENN", "ELVN", "TWLV", "TRTN", "FRTN", "FVTN", "SXTN"],
    SYMBOL_INFO: {
      ALGO: {
        marketCounter: 1,
        marketAppId: 51422140,
        bankAssetId: 51422936,
        underlyingAssetId: 1
      },
      USDC: {
        marketCounter: 2,
        marketAppId: 51422142,
        bankAssetId: 51422937,
        underlyingAssetId: 51435943
      },
      goBTC: {
        marketCounter: 3,
        marketAppId: 51422146,
        bankAssetId: 51422938,
        underlyingAssetId: 51436723
      },
      goETH: {
        marketCounter: 4,
        marketAppId: 51422149,
        bankAssetId: 51422939,
        underlyingAssetId: 51437163
      },
      STBL: {
        marketCounter: 5,
        marketAppId: 51422151,
        bankAssetId: 51422940,
        underlyingAssetId: 51437956
      },
      vALGO: {
        marketCounter: 6,
        marketAppId: 465814318,
        bankAssetId: 680408335,
        bankAssetDecimals: 6,
        underlyingAssetId: 1
      },
      SEVN: {
        marketCounter: 7,
        marketAppId: 51422155
      },
      EGHT: {
        marketCounter: 8,
        marketAppId: 51422158
      },
      NINE: {
        marketCounter: 9,
        marketAppId: 51422161
      },
      TENN: {
        marketCounter: 10,
        marketAppId: 51422164
      },
      ELVN: {
        marketCounter: 11,
        marketAppId: 51422170
      },
      TWLV: {
        marketCounter: 12,
        marketAppId: 51422172
      },
      TRTN: {
        marketCounter: 13,
        marketAppId: 51422175
      },
      FRTN: {
        marketCounter: 14,
        marketAppId: 51422177
      },
      FVTN: {
        marketCounter: 15,
        marketAppId: 51422179
      },
      SXTN: {
        marketCounter: 16,
        marketAppId: 51422186
      }
    },
    managerAppId: 51422788,
    supportedMarketCount: 6,
    maxAtomicOptInMarketCount: 13,
    maxMarketCount: 16,
    initRound: 18484796,
    STAKING_CONTRACTS: {
      STBL: {
        marketAppId: 53570045,
        managerAppId: 53570235,
        bankAssetId: 53593283,
        underlyingAssetId: 51437956
      }
    }
  },
  mainnet: {
    SYMBOLS: ["ALGO", "USDC", "goBTC", "goETH", "STBL", "vALGO", "SEVN", "EGHT", "NINE", "TENN", "ELVN", "TWLV", "TRTN", "FRTN", "FVTN", "SXTN"],
    SYMBOL_INFO: {
      ALGO: {
        marketCounter: 1,
        marketAppId: 465814065,
        bankAssetId: 465818547,
        underlyingAssetId: 1
      },
      USDC: {
        marketCounter: 2,
        marketAppId: 465814103,
        bankAssetId: 465818553,
        underlyingAssetId: 31566704
      },
      goBTC: {
        marketCounter: 3,
        marketAppId: 465814149,
        bankAssetId: 465818554,
        underlyingAssetId: 386192725
      },
      goETH: {
        marketCounter: 4,
        marketAppId: 465814222,
        bankAssetId: 465818555,
        underlyingAssetId: 386195940
      },
      STBL: {
        marketCounter: 5,
        marketAppId: 465814278,
        bankAssetId: 465818563,
        underlyingAssetId: 465865291
      },
      vALGO: {
        marketCounter: 6,
        marketAppId: 465814318,
        bankAssetId: 680408335,
        underlyingAssetId: 1
      },
      SEVN: {
        marketCounter: 7,
        marketAppId: 465814371
      },
      EGHT: {
        marketCounter: 8,
        marketAppId: 465814435
      },
      NINE: {
        marketCounter: 9,
        marketAppId: 465814472
      },
      TENN: {
        marketCounter: 10,
        marketAppId: 465814527
      },
      ELVN: {
        marketCounter: 11,
        marketAppId: 465814582
      },
      TWLV: {
        marketCounter: 12,
        marketAppId: 465814620
      },
      TRTN: {
        marketCounter: 13,
        marketAppId: 465814664
      },
      FRTN: {
        marketCounter: 14,
        marketAppId: 465814701
      },
      FVTN: {
        marketCounter: 15,
        marketAppId: 465814744
      },
      SXTN: {
        marketCounter: 16,
        marketAppId: 465814807
      }
    },
    supportedMarketCount: 6,
    maxMarketCount: 16,
    maxAtomicOptInMarketCount: 13,
    managerAppId: 465818260,
    initRound: 18011265,
    STAKING_CONTRACTS: {
      STBL: {
        marketAppId: 482608867,
        managerAppId: 482625868,
        bankAssetId: 482653551,
        underlyingAssetId: 465865291
      },
      "STBL-USDC-LP-V2": {
        marketAppId: 553866305,
        managerAppId: 553869413,
        bankAssetId: 553898734,
        underlyingAssetId: 552737686
      }
    }
  }
};

(function (Transactions) {
  Transactions[Transactions["MINT"] = 1] = "MINT";
  Transactions[Transactions["MINT_TO_COLLATERAL"] = 2] = "MINT_TO_COLLATERAL";
  Transactions[Transactions["ADD_COLLATERAL"] = 3] = "ADD_COLLATERAL";
  Transactions[Transactions["REMOVE_COLLATERAL"] = 4] = "REMOVE_COLLATERAL";
  Transactions[Transactions["BURN"] = 5] = "BURN";
  Transactions[Transactions["REMOVE_COLLATERAL_UNDERLYING"] = 6] = "REMOVE_COLLATERAL_UNDERLYING";
  Transactions[Transactions["BORROW"] = 7] = "BORROW";
  Transactions[Transactions["REPAY_BORROW"] = 8] = "REPAY_BORROW";
  Transactions[Transactions["LIQUIDATE"] = 9] = "LIQUIDATE";
  Transactions[Transactions["CLAIM_REWARDS"] = 10] = "CLAIM_REWARDS";
})(exports.Transactions || (exports.Transactions = {}));
/**
 * Wait for the specified transaction to complete
 *
 * @param algodClient - algod client
 * @param txId - transaction id of transaction we are waiting for
 */


function waitForConfirmation(_x, _x2) {
  return _waitForConfirmation.apply(this, arguments);
}

function _waitForConfirmation() {
  _waitForConfirmation = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(algodClient, txId) {
    var response, lastround, pendingInfo;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return algodClient.status()["do"]();

          case 2:
            response = _context2.sent;
            lastround = response["last-round"];

          case 4:

            _context2.next = 7;
            return algodClient.pendingTransactionInformation(txId)["do"]();

          case 7:
            pendingInfo = _context2.sent;

            if (!(pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0)) {
              _context2.next = 11;
              break;
            }

            console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
            return _context2.abrupt("break", 16);

          case 11:
            lastround += 1;
            _context2.next = 14;
            return algodClient.statusAfterBlock(lastround)["do"]();

          case 14:
            _context2.next = 4;
            break;

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _waitForConfirmation.apply(this, arguments);
}

var TransactionGroup = /*#__PURE__*/function () {
  /**
   * This is the constructor for the TransactionGroup class.
   * You pass in a list of transactions and get back a TransactionGroup object
   *
   * @param transactions - list of transactions
   */
  function TransactionGroup(transactions) {
    this.transactions = algosdk.assignGroupID(transactions);
    var signedTransactions = [];

    for (var _iterator = _createForOfIteratorHelperLoose(this.transactions), _step; !(_step = _iterator()).done;) {
      signedTransactions.push(null);
    }

    this.signedTransactions = signedTransactions;
  }
  /**
   * Signs the transactions with specified private key and saves to class state
   *
   * @param address - account address of the user
   * @param privateKey - private key of user
   */


  var _proto = TransactionGroup.prototype;

  _proto.signWithPrivateKey = function signWithPrivateKey(address, privateKey) {
    for (var _i = 0, _Object$entries = Object.entries(this.transactions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          i = _Object$entries$_i[0],
          txn = _Object$entries$_i[1];
      this.signedTransactions[i] = txn.signTxn(privateKey);
    }
  }
  /**
   * Signs the transactions with specified private keys and saves to class state
   *
   * @param privateKeys - private keys
   */
  ;

  _proto.signWithPrivateKeys = function signWithPrivateKeys(privateKeys) {
    if (privateKeys.length !== this.transactions.length) {
      throw new Error("Different number of private keys and transactions");
    }

    for (var _i2 = 0, _Object$entries2 = Object.entries(this.transactions); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _Object$entries2[_i2],
          i = _Object$entries2$_i[0],
          txn = _Object$entries2$_i[1];
      this.signedTransactions[i] = txn.signTxn(privateKeys[i]);
    }
  }
  /**
   * Submits the signed transactions to the network using the algod client
   *
   * @param algod - algod client
   * @param wait - wait for txn to complete; defaults to false
   * @returns
   */
  ;

  _proto.submit =
  /*#__PURE__*/
  function () {
    var _submit = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algod, wait) {
      var txid;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (wait === void 0) {
                wait = false;
              }

              _context.prev = 1;
              _context.next = 4;
              return algod.sendRawTransaction(this.signedTransactions)["do"]();

            case 4:
              txid = _context.sent;
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              throw new Error(_context.t0);

            case 10:
              if (!wait) {
                _context.next = 13;
                break;
              }

              _context.next = 13;
              return waitForConfirmation(algod, txid.txId);

            case 13:
              return _context.abrupt("return", {
                txid: txid.txId
              });

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 7]]);
    }));

    function submit(_x3, _x4) {
      return _submit.apply(this, arguments);
    }

    return submit;
  }();

  return TransactionGroup;
}();
/**
 * Return a random integer between 0 and max
 *
 * @param max - max integer that we want to return
 * @returns random integer between 0 and max
 */

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/**
 * Return the value for the associated key in the object passed in , or defaultValue if not found
 *
 * @param object - object to parse
 * @param key - key to find value for
 * @param defaultValue - default value to default to when we can't find key
 * @returns the value for the associated key in the object passed in , or defaultValue if not found
 */

function get(object, key, defaultValue) {
  var result = object[key];
  return typeof result !== "undefined" ? result : defaultValue;
}
/**
 * Return a byte representation of the passed in number
 *
 * @param num - number to convert to bytes
 * @returns a byte representation of the passed in number
 */

function intToBytes(num) {
  return algosdk.encodeUint64(num);
}
/**
 * Return a formatted version of state after taking care of decoding and unecessary key values
 *
 * @param state - state we are trying to format
 * @returns a formatted version of state after taking care of decoding and unecessary key values
 */

function formatState(state) {
  var formatted = {};

  for (var _iterator2 = _createForOfIteratorHelperLoose(state), _step2; !(_step2 = _iterator2()).done;) {
    var item = _step2.value;
    var key = item.key;
    var value = item.value;
    var formattedKey = void 0;
    var formattedValue = void 0;

    try {
      formattedKey = Buffer.from(key, "base64").toString();
    } catch (e) {
      formattedKey = Buffer.from(key).toString();
    }

    if (value.type === 1) {
      if (value.bytes !== "") {
        formattedValue = value.bytes;
      } else {
        formattedValue = Buffer.from(value.bytes, "base64").toString();
      }

      formatted[formattedKey] = formattedValue;
    } else {
      formatted[formattedKey] = value.uint;
    }
  }

  return formatted;
}
/**
 * Returns dict of local state for address for application with id appId
 *
 * @param client - algod clietn
 * @param address - address of account for which to get state
 * @param appId - is of the application
 * @returns dict of local state of address for application with id appId
 */

function readLocalState(_x5, _x6, _x7) {
  return _readLocalState.apply(this, arguments);
}
/**
 * Returns dict of global state for application with id appId. Address must be that of the creator.
 *
 * @param client - algod client
 * @param address - creator address
 * @param appId - id of the application
 * @returns dict of global state for application with id appId
 */

function _readLocalState() {
  _readLocalState = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(client, address, appId) {
    var results, _iterator4, _step4, localState;

    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return client.accountInformation(address)["do"]();

          case 2:
            results = _context3.sent;
            _iterator4 = _createForOfIteratorHelperLoose(results["apps-local-state"]);

          case 4:
            if ((_step4 = _iterator4()).done) {
              _context3.next = 12;
              break;
            }

            localState = _step4.value;

            if (!(localState.id === appId)) {
              _context3.next = 10;
              break;
            }

            if (Object.keys(localState).includes("key-value")) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", {});

          case 9:
            return _context3.abrupt("return", formatState(localState["key-value"]));

          case 10:
            _context3.next = 4;
            break;

          case 12:
            return _context3.abrupt("return", {});

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _readLocalState.apply(this, arguments);
}

function readGlobalState(_x8, _x9, _x10) {
  return _readGlobalState.apply(this, arguments);
}
/**
 * Returns dict of global state for application with the given appId
 *
 * @param algodClient - algod client
 * @param appId - id of the application
 * @returns dict of global state for application with id appId
 */

function _readGlobalState() {
  _readGlobalState = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(client, address, appId) {
    var results, appsCreated, _iterator5, _step5, app;

    return runtime_1.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return client.accountInformation(address)["do"]();

          case 2:
            results = _context4.sent;
            appsCreated = results["created-apps"];
            _iterator5 = _createForOfIteratorHelperLoose(appsCreated);

          case 5:
            if ((_step5 = _iterator5()).done) {
              _context4.next = 11;
              break;
            }

            app = _step5.value;

            if (!(app.id === appId)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", formatState(app.params["global-state"]));

          case 9:
            _context4.next = 5;
            break;

          case 11:
            return _context4.abrupt("return", {});

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _readGlobalState.apply(this, arguments);
}

function getGlobalState(_x11, _x12) {
  return _getGlobalState.apply(this, arguments);
}
/**
 * Returns list of supported staking contracts for the specified chain. Pulled from hardcoded values in contracts.ts.
 *
 * @param chain - network to query data for
 * @returns list of supported staking contracts
 */

function _getGlobalState() {
  _getGlobalState = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(algodClient, appId) {
    var application, stateDict;
    return runtime_1.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return algodClient.getApplicationByID(appId)["do"]();

          case 2:
            application = _context5.sent;
            stateDict = formatState(application.params["global-state"]);
            return _context5.abrupt("return", stateDict);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getGlobalState.apply(this, arguments);
}

function getStakingContracts(chain) {
  return contracts[chain].STAKING_CONTRACTS;
}
/**
 * Returns list of supported symbols for the specified chain. Pulled from hardcoded values in contracts.ts.
 *
 * @param chain - network to query data for
 * @param max - max assets
 * @param maxAtomicOptIn - list of supported symbols for algofi's protocol on chain
 * @returns
 */

function getOrderedSymbols(chain, max, maxAtomicOptIn) {
  if (max === void 0) {
    max = false;
  }

  if (maxAtomicOptIn === void 0) {
    maxAtomicOptIn = false;
  }

  var supportedMarketCount;

  if (max) {
    supportedMarketCount = contracts[chain].maxMarketCount;
  } else if (maxAtomicOptIn) {
    supportedMarketCount = contracts[chain].maxAtomicOptInMarketCount;
  } else {
    supportedMarketCount = contracts[chain].supportedMarketCount;
  }

  return contracts[chain].SYMBOLS.slice(0, supportedMarketCount);
}
/**
 * Returns app id of manager for the specified chain. Pulled from hardcoded values in contracts.ts.
 *
 * @param chain - network to query data for
 * @returns manager app id
 */

function getManagerAppId(chain) {
  return contracts[chain].managerAppId;
}
/**
 * Returns market app id of symbol for the specified chain. Pulled from hardcoded values in contracts.ts.
 *
 * @param chain - network to query data for
 * @param symbol - symbol to get market data for
 * @returns market app id
 */

function getMarketAppId(chain, symbol) {
  return contracts[chain].SYMBOL_INFO[symbol].marketAppId;
}
/**
 * Returns init round of algofi protocol for a specified chain. Pulled from hardcoded values in contracts.ts.
 *
 * @param chain - network to query data for
 * @returns init round of algofi protocol on specified chain
 */

function getInitRound(chain) {
  return contracts[chain].initRound;
}
/**
 * Returns a transaction group object representing a payment group transaction
 * for a given sender, receiver, amount and ability to rekey.
 *
 * @param sender - account address for sender
 * @param suggestedParams - suggested transaction params
 * @param receiver - account address for the receiver
 * @param amount - amount of algos to send
 * @returns
 */

function preparePaymentTransaction(sender, suggestedParams, receiver, amount) {
  var txn = algosdk.makePaymentTxnWithSuggestedParams(sender, receiver, amount, undefined, undefined, suggestedParams);
  var txnGroup = new TransactionGroup([txn]);
  return txnGroup;
}
/**
 * Returns a three element list with a new key, address and passphrase.
 *
 * @returns a three element list with a new key, address and passphrase.
 */

function getNewAccount() {
  var newAccount = algosdk.generateAccount();
  var key = newAccount.sk;
  var address = newAccount.addr;
  var passphrase = algosdk.secretKeyToMnemonic(key);
  return [key, address, passphrase];
}
/**
 * Returns value from the encoded global state dict of an application
 *
 * @param globalState - global state of an application
 * @param searchKey - utf8 key of a value to search for
 * @returns value for the given key
 */

function searchGlobalState(globalState, searchKey) {
  for (var _iterator3 = _createForOfIteratorHelperLoose(globalState), _step3; !(_step3 = _iterator3()).done;) {
    var field = _step3.value;
    var value = field.value;
    var key = field.key;

    if (searchKey === Buffer.from(key, "base64").toString()) {
      if (value.type == 2) {
        value = value.uint;
      } else {
        value = value.bytes;
      }

      return value;
    }
  }

  throw new Error("Key not found");
}

var marketStrings = {
  admin: "a",
  active_collateral: "acc",
  activate_market: "am",
  asset_id: "ai",
  bank_asset_id: "ba",
  bank_circulation: "bc",
  bank_to_underlying_exchange: "bt",
  borrow_index: "bi",
  base_interest_rate: "bir",
  contract_update_time: "cut",
  collateral_factor: "cf",
  implied_borrow_index: "i",
  increase_param_update_delay: "ipud",
  is_active: "ia",
  is_disabled_supply: "ids",
  is_disabled_borrow: "idb",
  is_final_params: "ifp",
  is_final_contract: "ifc",
  latest_time: "lt",
  liquidation_incentive: "li",
  manager_id: "mi",
  manager_market_counter_var: "mm",
  market_activation_time: "ma",
  market_supply_cap_in_dollars: "msc",
  market_borrow_cap_in_dollars: "mbc",
  min_scheduled_param_update_delay: "mpud",
  outstanding_borrow_shares: "ob",
  oracle_app_id: "o",
  oracle_price_field: "op",
  oracle_price_scale_factor: "ops",
  reserve_factor: "rf",
  new_collateral_factor: "ncf",
  new_liquidation_incentive: "nl",
  new_reserve_factor: "nr",
  new_utilization_optimal: "nu",
  new_base_interest_rate: "nb",
  new_slope_1: "ns",
  new_slope_2: "ns2",
  new_oracle_app_id: "no",
  new_oracle_price_field: "nop",
  new_oracle_price_scale_factor: "nops",
  new_market_supply_cap_in_dollars: "nmsc",
  new_market_borrow_cap_in_dollars: "nmbc",
  param_update_time: "put",
  remove_reserves: "rr",
  schedule_contract_update: "scu",
  schedule_market_params_update: "sm",
  set_market_params: "smp",
  set_is_final_params: "sifp",
  set_is_final_contract: "sifc",
  set_is_disabled_supply: "sids",
  set_is_enabled_supply: "sies",
  set_is_disabled_borrow: "sidb",
  set_is_enabled_borrow: "sieb",
  slope_1: "s1",
  slope_2: "s2",
  total_borrow_interest_rate: "tbir",
  transfer_admin: "ta",
  underlying_cash: "uc",
  underlying_borrowed: "ub",
  underlying_reserves: "ur",
  utilization_optimal: "uo",
  variable_interest_rate: "vir",
  update_market_params: "ump",
  // user variables
  user_active_collateral: "uac",
  user_borrow_shares: "ubs"
};
var managerStrings = {
  add_collateral: "ac",
  admin: "a",
  borrow: "b",
  burn: "bu",
  contract_update_time: "cut",
  counter_indexed_rewards_coefficient: "_ci",
  claim_rewards: "cr",
  disable_rewards_program: "drp",
  fetch_market_variables: "fmv",
  is_finalized: "if",
  latest_rewards_time: "lrt",
  liquidate: "l",
  mint: "m",
  mint_to_collateral: "mt",
  n_rewards_programs: "nrp",
  opt_into_asset: "oia",
  rewards_amount: "ra",
  rewards_asset_id: "rai",
  rewards_bitmap: "rbm",
  rewards_per_second: "rp",
  rewards_secondary_asset_id: "rsai",
  rewards_secondary_ratio: "rsr",
  rewards_start_time: "rst",
  supported_market_count: "smc",
  price_string: "_p",
  remove_collateral: "rc",
  remove_collateral_underlying: "rcu",
  repay_borrow: "rb",
  schedule_contract_update: "scu",
  storage_opt_in: "so",
  set_is_final: "sif",
  set_rewards_program: "srp",
  set_supported_market_count: "ssmc",
  transfer_admin: "ta",
  update_prices: "up",
  update_protocol_data: "upd",
  update_rewards_program: "urp",
  // user variables
  user_global_max_borrow_in_dollars: "ug",
  user_global_borrowed_in_dollars: "ugb",
  user_address: "ua",
  user_storage_address: "usa",
  user_rewards_latest_time: "urlt",
  user_rewards_program_number: "urpn",
  user_pending_rewards: "upr",
  user_secondary_pending_rewards: "us",
  counter_to_user_rewards_coefficient_initial: "_uc"
};

var NUM_DUMMY_TXNS = 9;
var dummyTxnNumToWord = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten"
};
/**
 * Returns a transaction group object representing the initial transactions
 * executed by the algofi protocol during a standard group transaction. The transactions are
 * (1) fetch market variables, (2) update prices, (3) update protocol data, and (4) degenerate ("dummy")
 * transactions to increase the number of cost units allowed (currently each transactions affords 700
 * additional cost units).
 *
 * @param transactionType - transactions enum representing the group transaction the init transactions are used for
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param managerAppId - id of the manager application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param storageAccount - account address for the storage account
 * @returns account address for the storage account
 */

function getInitTxns(transactionType, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount) {
  var suggestedParamsModified = JSON.parse(JSON.stringify(suggestedParams));
  var listTxnTypes = [exports.Transactions.MINT, exports.Transactions.BURN, exports.Transactions.REMOVE_COLLATERAL, exports.Transactions.REMOVE_COLLATERAL_UNDERLYING, exports.Transactions.BORROW, exports.Transactions.REPAY_BORROW, exports.Transactions.LIQUIDATE, exports.Transactions.CLAIM_REWARDS];

  if (listTxnTypes.includes(transactionType)) {
    suggestedParamsModified.fee = 2000;
  }

  var enc = new TextEncoder();
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc.encode(managerStrings.fetch_market_variables)], undefined, supportedMarketAppIds, undefined, intToBytes(getRandomInt(1000000)));
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParamsModified, managerAppId, [enc.encode(managerStrings.update_prices)], undefined, supportedOracleAppIds);
  var txn2 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc.encode(managerStrings.update_protocol_data)], [storageAccount], supportedMarketAppIds);
  var dummyTxns = [];

  for (var i = 1; i < NUM_DUMMY_TXNS + 1; i++) {
    var txn = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc.encode("dummy_" + dummyTxnNumToWord[i])], undefined, supportedMarketAppIds);
    dummyTxns.push(txn);
  }

  return [txn0, txn1, txn2].concat(dummyTxns);
}

var enc = /*#__PURE__*/new TextEncoder();
/**
 *
 * Returns a TransactionGroup object representing an add collateral group
 * transaction against the algofi protocol. Sender adds bank assets to collateral by sending
 * them to the account address of the market application that generates the bank assets.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for the sender
 * @param amount - amount of bank asset to add to collateral
 * @param bankAssetId - asset ids of the bank asset
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application for the bank asset
 * @param marketAddress - account address for the market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @returns TransactionGroup object representing an add collateral group transaction
 */

function prepareAddCollateralTransactions(sender, suggestedParams, storageAccount, amount, bankAssetId, managerAppId, marketAppId, marketAddress, supportedMarketAppIds, supportedOracleAppIds) {
  var prefixTransactions = getInitTxns(exports.Transactions.ADD_COLLATERAL, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc.encode(managerStrings.add_collateral)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc.encode(managerStrings.add_collateral)], [storageAccount], [managerAppId]);
  var txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, bankAssetId, suggestedParams);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}

var orderedAssets = ["ALGO", "USDC", "goBTC", "goETH", "STBL", "vALGO"];
var extraAssets = ["BANK"];
var orderedAssetsAndPlaceholders = ["ALGO", "USDC", "goBTC", "goETH", "STBL", "vALGO", "SEVN", "EGHT", "NINE", "TENN", "ELVN", "TWLV", "TRTN", "FRTN", "FVTN", "SXTN", "STBL-ALGO-LP", "STBL-USDC-LP", "STBL-USDC-LP-V2", "STBL-YLDY-LP"];
var protocolManagerAppId = 465818260;
var managerAddress = "2SGUKZCOBEVGN3HPKSXPS6DTCXZ7LSP6G3BQF6KVUIUREBBY2QTGSON7WQ";
var assetDictionary = {
  ALGO: {
    decimals: 6,
    marketCounter: 1,
    marketAppId: 465814065,
    marketAddress: "TY5N6G67JWHSMWFFFZ252FXWKLRO5UZLBEJ4LGV7TPR5PVSKPLDWH3YRXU",
    managerAppId: 465818260,
    bankAssetId: 465818547,
    bankAssetDecimals: 6,
    underlyingAssetId: 1,
    oracleAppId: 531724540,
    oracleFieldName: "latest_twap_price"
  },
  USDC: {
    decimals: 6,
    marketCounter: 2,
    marketAppId: 465814103,
    marketAddress: "ABQHZLNGGPWWZVA5SOQO3HBEECVJSE3OHYLKACOTC7TC4BS52ZHREPF7QY",
    managerAppId: 465818260,
    bankAssetId: 465818553,
    bankAssetDecimals: 6,
    underlyingAssetId: 31566704,
    oracleAppId: 451327550,
    oracleFieldName: "price"
  },
  goBTC: {
    decimals: 8,
    marketCounter: 3,
    marketAppId: 465814149,
    marketAddress: "W5UCMHDSTGKWBOV6YVLDVPJGPE4L4ISTU6TGXC7WRF63Y7GOVFOBUNJB5Q",
    managerAppId: 465818260,
    bankAssetId: 465818554,
    bankAssetDecimals: 8,
    underlyingAssetId: 386192725,
    oracleAppId: 531725044,
    oracleFieldName: "latest_twap_price"
  },
  goETH: {
    decimals: 8,
    marketCounter: 4,
    marketAppId: 465814222,
    marketAddress: "KATD43XBJJIDXB3U5UCPIFUDU3CZ3YQNVWA5PDDMZVGKSR4E3QWPJX67CY",
    managerAppId: 465818260,
    bankAssetId: 465818555,
    bankAssetDecimals: 8,
    underlyingAssetId: 386195940,
    oracleAppId: 531725449,
    oracleFieldName: "latest_twap_price"
  },
  STBL: {
    decimals: 6,
    marketCounter: 5,
    marketAppId: 465814278,
    marketAddress: "OPY7XNB5LVMECF3PHJGQV2U33LZPM5FBUXA3JJPHANAG5B7GEYUPZJVYRE",
    managerAppId: 465818260,
    bankAssetId: 465818563,
    bankAssetDecimals: 6,
    underlyingAssetId: 465865291,
    oracleAppId: 451327550,
    oracleFieldName: "price"
  },
  vALGO: {
    decimals: 6,
    marketCounter: 6,
    marketAppId: 465814318,
    marketAddress: "DAUL5I34T4C4U5OMXS7YBPJIERQ2NH3O7XPZCIJEGKP4NO3LK4UWDCHAG4",
    managerAppId: 465818260,
    bankAssetId: 680408335,
    bankAssetDecimals: 6,
    underlyingAssetId: 1,
    oracleAppId: 531724540,
    oracleFieldName: "latest_twap_price"
  },
  "STBL-STAKE": {
    decimals: 6,
    marketCounter: 5,
    marketAppId: 482608867,
    managerAppId: 482625868,
    marketAddress: "DYLJJES76YQCOUK6D4RALIPJ76U5QT7L6A2KP6QTOH63OBLFKLTER2J6IA",
    bankAssetId: 465818563,
    bankAssetDecimals: 6,
    underlyingAssetId: 465865291,
    oracleAppId: 451327550,
    oracleFieldName: "price"
  },
  "STBL-ALGO-LP": {
    decimals: 6,
    managerAppId: 514458901,
    managerAddress: "JZYVXQLRZ2TEI6XMIQN5KEHEVA5EA3LQVZUS24SGKLVIBQZTRSP3PTCRJQ",
    marketAppId: 514439598,
    marketAddress: "UMTL7D6YMN463FSG3JN572CFD6VTKRKNSK5KSQYIUK67N7CR3XLDFM42Y4",
    underlyingAssetId: 468634109,
    bankAssetId: 514473977,
    oracleAppId: 451327550,
    bankAssetDecimals: 6,
    oracleFieldName: "price"
  },
  "STBL-USDC-LP": {
    decimals: 6,
    marketAppId: 485244022,
    managerAppId: 485247444,
    managerAddress: "IG3KDYTH7IB46DC5K4ME4Z3R46VJEFXFPHRHVV3KKBTULW5ODHPJL7ZFU4",
    marketAddress: "Z3GWRL5HGCJQYIXP4MINCRWCKWDHZ5VSYJHDLIDLEIOARIZWJX6GLAWWEI",
    creatorAddress: "TFONT6HASLUUWDRE3MEEC4GS5PIMLEKNCE7Z2JMGNBFIHVZZ2QEJ7MODZE",
    oracleAppId: 451327550,
    bankAssetId: 485254141,
    bankAssetDecimals: 6,
    underlyingAssetId: 467020179,
    oracleFieldName: "price"
  },
  "STBL-USDC-LP-V2": {
    decimals: 6,
    managerAppId: 514599129,
    managerAddress: "SFSV2PM3724DUZGIQVLZ5XOUKSQBDALYI7UZ23YLGYFDLM3WH2AMWHBNTE",
    marketAppId: 514596716,
    marketAddress: "RLXSNIDRFIDMKJILBMDKHACY7YFEV2N65T6D3YGKKM2LAKHNK4XCOEVYIQ",
    underlyingAssetId: 467020179,
    bankAssetId: 514619644,
    creatorAddress: "TFONT6HASLUUWDRE3MEEC4GS5PIMLEKNCE7Z2JMGNBFIHVZZ2QEJ7MODZE",
    oracleAppId: 451327550,
    bankAssetDecimals: 6,
    oracleFieldName: "price"
  },
  "STBL-YLDY-LP": {
    decimals: 6,
    managerAppId: 514601080,
    managerAddress: "S53YDCHH3JGJKZWLNLUFDAQKSUZCAWOVNYHWAGMVCOFK2NNROS7NCLDK64",
    marketAppId: 514599409,
    marketAddress: "3VNLTSYGAMVBRSCSAF7PP7KSBAV5AQQIUM2TJXIDVOXX573AW7LMH6RARY",
    underlyingAssetId: 468695586,
    bankAssetId: 514624374,
    bankAssetDecimals: 6,
    oracleFieldName: "price"
  },
  BANK: {
    decimals: 6,
    underlyingAssetId: 51642940
  },
  SIIX: {
    marketCounter: 6,
    marketAppId: 465814318,
    marketAddress: "DAUL5I34T4C4U5OMXS7YBPJIERQ2NH3O7XPZCIJEGKP4NO3LK4UWDCHAG4"
  },
  SEVN: {
    marketCounter: 7,
    marketAppId: 465814371,
    marketAddress: "K75YX4ZN3J43R2JTRWB6M3KXNPWAJJVPFSMIRAGQO77TKXKHKBFKSRZGGA"
  },
  EGHT: {
    marketCounter: 8,
    marketAppId: 465814435,
    marketAddress: "P6B5MK2FMN24IVRYMQMEPZHJPCNN6OUKFI5OSTOUREC47HPQNUXAUKF4TY"
  },
  NINE: {
    marketCounter: 9,
    marketAppId: 465814472,
    marketAddress: "PWVB7SHASD5XJNQFZHC5UAR5UYY33TW62YA6JVOW6PMYNZ7KMARPXKMFRU"
  },
  TENN: {
    marketCounter: 10,
    marketAppId: 465814527,
    marketAddress: "K7TNWBPCKLJKX3KHUZ5VA7YKGWNPHM4E6HQ5HGD7VFVYZ3232RJFGATMTM"
  },
  ELVN: {
    marketCounter: 11,
    marketAppId: 465814582,
    marketAddress: "LEHVWIH62DHSXLXFBPAXHYZZYGO7ONJ4HJHQLX4LJSIXSM66FPN5BXRCPU"
  },
  TWLV: {
    marketCounter: 12,
    marketAppId: 465814620,
    marketAddress: "S6LBCGD4UFECPY3P67QFURVDXCBPWZXG56VJ43UVBK7ODIODF6UOX6BX4A"
  },
  TRTN: {
    marketCounter: 13,
    marketAppId: 465814664,
    marketAddress: "HHHROS6MPEFEXJ7JQOKASR67EEPRM3NRGWLREW54XBUHF6AQ3HYGQQIGCY"
  },
  FRTN: {
    marketCounter: 14,
    marketAppId: 465814701,
    marketAddress: "XFWV3BF47DBLJ2GY2WUUIIA3W4VTOFOALKKEJJNCWFG6DLHWZ6SFUQXPJA"
  },
  FVTN: {
    marketCounter: 15,
    marketAppId: 465814744,
    marketAddress: "BTC4OBXRM53F3WT3YXK5LEP2JYB6OIDGQHM4EOHYPOYORKR4QHY7CMD35M"
  },
  SXTN: {
    marketCounter: 16,
    marketAppId: 465814807,
    marketAddress: "F253XGHUENH36WTAVWR2DE6VPAF2FV7L7H3QESM5Q7QXQTEX5T2C2HT3NU"
  }
};
var foreignAppIds = [465814065, 465814103, 465814149, 465814222, 465814278];
var SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
var SCALE_FACTOR = 1e9;
var REWARDS_SCALE_FACTOR = 1e14;
var PARAMETER_SCALE_FACTOR = 1e3;
var orderedOracleAppIds = [];
var orderedMarketAppIds = [];
var orderedSupportedMarketAppIds = [];
var marketCounterToAssetName = {};
var assetIdToAssetName = {};

for (var _i = 0, _orderedAssets = orderedAssets; _i < _orderedAssets.length; _i++) {
  var assetName = _orderedAssets[_i];
  orderedOracleAppIds.push(assetDictionary[assetName]["oracleAppId"]);
  orderedSupportedMarketAppIds.push(assetDictionary[assetName]["marketAppId"]);
  marketCounterToAssetName[assetDictionary[assetName]["marketCounter"]] = assetName;
  assetIdToAssetName[assetDictionary[assetName]["underlyingAssetId"]] = assetName;
  assetIdToAssetName[assetDictionary[assetName]["bankAssetId"]] = "b" + assetName;
}

for (var _i2 = 0, _extraAssets = extraAssets; _i2 < _extraAssets.length; _i2++) {
  var _assetName = _extraAssets[_i2];
  assetIdToAssetName[assetDictionary[_assetName]["underlyingAssetId"]] = _assetName;
}

for (var _i3 = 0, _orderedAssetsAndPlac = orderedAssetsAndPlaceholders; _i3 < _orderedAssetsAndPlac.length; _i3++) {
  var _assetName2 = _orderedAssetsAndPlac[_i3];
  orderedMarketAppIds.push(assetDictionary[_assetName2]["marketAppId"]);
}

var Asset = /*#__PURE__*/function () {
  /**
   * This is the constructor for the Asset class.
   *
   * **Note, do not call this to create a new asset**. Instead call
   * the static method init as there are asynchronous set up steps in
   * creating an asset and a constructor can only return an instance of
   * the class and not a promise.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new asset
   * const newAsset = await Asset.init(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor)
   *
   * //Incorrect way to instantiate new asset
   * const newAsset = new Asset(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor)
   * ```
   *
   * @param algodClient - algod client
   * @param underlyingAssetId - id of underlying asset
   * @param bankAssetId - bank asset id
   * @param oracleAppId - oracle application id of underlying asset
   * @param oraclePriceField - oracle price field of underlying asset
   * @param oraclePriceScaleFactor - oracle price scale factor of underlying asset
   */
  function Asset(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor) {
    if (oracleAppId === void 0) {
      oracleAppId = null;
    }

    if (oraclePriceField === void 0) {
      oraclePriceField = null;
    }

    if (oraclePriceScaleFactor === void 0) {
      oraclePriceScaleFactor = null;
    }

    this.algod = algodClient;
    this.underlyingAssetId = underlyingAssetId;
    this.bankAssetId = bankAssetId;

    if (oracleAppId !== null) {
      if (oraclePriceField === null) {
        throw Error("oracle price field must be specified");
      } else if (oraclePriceScaleFactor === null) {
        throw Error("oracle price scale factor must be specified");
      }
    }

    this.oracleAppId = oracleAppId;
    this.oraclePriceField = oraclePriceField;
    this.oraclePriceScaleFactor = oraclePriceScaleFactor;
  }
  /**
   * This is the function that should be called when creating a new asset.
   * You pass everything you would to the constructor, but to this function
   * instead and this returns the new and created asset.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new asset
   * const newAsset = await Asset.init(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor)
   *
   * //Incorrect way to instantiate new asset
   * const newAsset = new Asset(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor)
   * ```
   *
   * @param algodClient - algod client
   * @param underlyingAssetId - id of underlying asset
   * @param bankAssetId - bank asset id
   * @param oracleAppId - oracle application id of underlying asset
   * @param oraclePriceField - oracle price field of underlying asset
   * @param oraclePriceScaleFactor - oracle price scale factor of underlying asset
   * @returns a finished instance of the asset class.
   */


  Asset.init =
  /*#__PURE__*/
  function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor) {
      var asset, _i, _Object$keys, assetName;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (oracleAppId === void 0) {
                oracleAppId = null;
              }

              if (oraclePriceField === void 0) {
                oraclePriceField = null;
              }

              if (oraclePriceScaleFactor === void 0) {
                oraclePriceScaleFactor = null;
              }

              asset = new Asset(algodClient, underlyingAssetId, bankAssetId, oracleAppId, oraclePriceField, oraclePriceScaleFactor);

              for (_i = 0, _Object$keys = Object.keys(assetDictionary); _i < _Object$keys.length; _i++) {
                assetName = _Object$keys[_i];

                if (assetDictionary[assetName].underlyingAssetId === underlyingAssetId) {
                  asset.underlyingAssetInfo = assetDictionary[assetName];
                }
              }
              /*underlyingAssetId !== 1 ? (await asset.algod.getAssetByID(underlyingAssetId).do()).params : { decimals: 6 }
              asset.bankAssetInfo = (await asset.algod.getAssetByID(bankAssetId).do()).params */


              return _context.abrupt("return", asset);

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x, _x2, _x3, _x4, _x5, _x6) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
  /**
   * Returns underlying asset id
   *
   * @returns underlying asset id
   */
  ;

  var _proto = Asset.prototype;

  _proto.getUnderlyingAssetId = function getUnderlyingAssetId() {
    return this.underlyingAssetId;
  }
  /**
   * Returns underlying asset info
   *
   * @returns underlying asset info as a dictionary
   */
  ;

  _proto.getUnderlyingAssetInfo = function getUnderlyingAssetInfo() {
    return this.underlyingAssetInfo;
  }
  /**
   * Returns bank asset id
   *
   * @returns bank asset id
   */
  ;

  _proto.getBankAssetId = function getBankAssetId() {
    return this.bankAssetId;
  }
  /**
   * Returns bank asset info
   *
   * @returns bank asset info as a dictionary
   */
  ;

  _proto.getBankAssetInfo = function getBankAssetInfo() {
    return this.bankAssetInfo;
  }
  /**
   * Returns oracle app id
   *
   * @returns oracle app id
   */
  ;

  _proto.getOracleAppId = function getOracleAppId() {
    return this.oracleAppId;
  }
  /**
   * Returns oracle price field
   *
   * @returns oracle price field
   */
  ;

  _proto.getOraclePriceField = function getOraclePriceField() {
    return this.oraclePriceField;
  }
  /**
   * Returns oracle price scale factor
   *
   * @returns oracle price scale factor
   */
  ;

  _proto.getOraclePriceScaleFactor = function getOraclePriceScaleFactor() {
    return this.oraclePriceScaleFactor;
  }
  /**
   * Returns the current raw oracle price
   *
   * @returns oracle price
   */
  ;

  _proto.getRawPrice =
  /*#__PURE__*/
  function () {
    var _getRawPrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var price;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(this.oracleAppId === null)) {
                _context2.next = 2;
                break;
              }

              throw Error("no oracle app id for asset");

            case 2:
              _context2.next = 4;
              return getGlobalState(this.algod, this.oracleAppId);

            case 4:
              _context2.t0 = Buffer.from(this.oraclePriceField, "base64").toString();
              price = _context2.sent[_context2.t0];
              return _context2.abrupt("return", price);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getRawPrice() {
      return _getRawPrice.apply(this, arguments);
    }

    return getRawPrice;
  }()
  /**
   * Returns decimals of asset
   *
   * @returns decimals
   */
  ;

  _proto.getUnderlyingDecimals = function getUnderlyingDecimals() {
    return this.underlyingAssetInfo.decimals;
  }
  /**
   * Returns the current oracle price
   *
   * @returns oracle price
   */
  ;

  _proto.getPrice =
  /*#__PURE__*/
  function () {
    var _getPrice = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3() {
      var rawPrice;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(this.oracleAppId == null)) {
                _context3.next = 2;
                break;
              }

              throw Error("no oracle app id for asset");

            case 2:
              _context3.next = 4;
              return this.getRawPrice();

            case 4:
              rawPrice = _context3.sent;
              return _context3.abrupt("return", rawPrice * Math.pow(10, this.getUnderlyingDecimals()) / (this.getOraclePriceScaleFactor() * 1e3));

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getPrice() {
      return _getPrice.apply(this, arguments);
    }

    return getPrice;
  }()
  /**
   * Returns the usd value of the underlying amount (base units)
   *
   * @param amount - integer amount of base underlying units
   * @returns usd value
   */
  ;

  _proto.toUSD =
  /*#__PURE__*/
  function () {
    var _toUSD = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(amount) {
      var price;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getPrice();

            case 2:
              price = _context4.sent;
              return _context4.abrupt("return", amount * price / Math.pow(10, this.getUnderlyingDecimals()));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function toUSD(_x7) {
      return _toUSD.apply(this, arguments);
    }

    return toUSD;
  }();

  return Asset;
}();

var enc$1 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing an borrow group
 * transaction against the algofi protocol. Protocol sends requested borrow asset
 * to the sender account provided sufficient collateral has been posted
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage address for the sender
 * @param amount - amount of asset to borrow
 * @param assetId - asset id of the asset to be borrowed
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application for the borrow asset
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle applicaiton ids
 * @returns transaction group representing a borrow group transaction
 */

function prepareBorrowTransactions(sender, suggestedParams, storageAccount, amount, assetId, managerAppId, marketAppId, supportedMarketAppIds, supportedOracleAppIds) {
  var prefixTransactions = getInitTxns(exports.Transactions.BORROW, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$1.encode(managerStrings.borrow), intToBytes(amount)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$1.encode(managerStrings.borrow)], [storageAccount], [managerAppId], [assetId]);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1]));
}

var enc$2 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a burn group
 * transaction against the algofi protocol. Sender burns bank assets by sending them
 * to the account address of the market application for the bank asset which in turn
 * converts them to their underlying asset and sends back.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of bank asset to burn
 * @param assetId - asset id of the bank asset's underlying asset
 * @param bankAssetId - id of the bank asset to burn
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the amrekt application for the bank asset
 * @param marketAddress - account address for the market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle app ids
 * @returns transaction group object representing a burn group transaction
 */

function prepareBurnTransactions(sender, suggestedParams, storageAccount, amount, assetId, bankAssetId, managerAppId, marketAppId, marketAddress, supportedMarketAppIds, supportedOracleAppIds) {
  var prefixTransactions = getInitTxns(exports.Transactions.BURN, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$2.encode(managerStrings.burn)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$2.encode(managerStrings.burn)], [storageAccount], [managerAppId], [assetId]);
  var txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, bankAssetId, suggestedParams);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}

var enc$3 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a :class:`TransactionGroup` object representing a claim rewards
 * underlying group transaction against the algofi protocol. The sender requests
 * to claim rewards from the manager acount. If not, the account sends
 * back the user the amount of asset underlying their posted collateral.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param managerAppId - id of the manager application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param foreignAssets - list of rewards assets in the staking contract
 * @returns transaction group object representing a claim rewards transaction
 */

function prepareClaimRewardsTransactions(sender, suggestedParams, storageAccount, managerAppId, supportedMarketAppIds, supportedOracleAppIds, foreignAssets) {
  var prefixTransactions = getInitTxns(exports.Transactions.CLAIM_REWARDS, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$3.encode(managerStrings.claim_rewards)], [storageAccount], undefined, foreignAssets);
  return new TransactionGroup([].concat(prefixTransactions, [txn0]));
}

var OPT_IN_MIN_BALANCE = 0.65;
var enc$4 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a staking contract opt in
 * group transaction. The sender and storage account opt in to the staking application
 * and the storage account is rekeyed to the manager account address, rendering it
 * unable to be transacted against by the sender and therefore immutable.
 *
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application
 * @param sender - account address of the sender
 * @param storageAddress - address of the storage account
 * @param suggestedParams - suggested transaction params
 * @returns transaction group object representing a manger opt in group transaction
 */

function prepareStakingContractOptinTransactions(managerAppId, marketAppId, sender, storageAddress, suggestedParams) {
  var txnPayment = algosdk.makePaymentTxnWithSuggestedParams(sender, storageAddress, Math.floor(1000000 * OPT_IN_MIN_BALANCE), undefined, undefined, suggestedParams);
  var txnMarket = algosdk.makeApplicationOptInTxn(sender, suggestedParams, marketAppId);
  var txnUserOptInManager = algosdk.makeApplicationOptInTxn(sender, suggestedParams, managerAppId);
  var appAddress = algosdk.getApplicationAddress(managerAppId);
  var txnStorageOptInManager = algosdk.makeApplicationOptInTxn(storageAddress, suggestedParams, managerAppId, undefined, undefined, undefined, undefined, undefined, undefined, appAddress);
  return new TransactionGroup([txnPayment, txnMarket, txnUserOptInManager, txnStorageOptInManager]);
}
/**
 * Returns a transaction group object representing a stake
 * transaction against the algofi protocol. The sender sends assets to the
 * staking account and is credited with a stake.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of asset to supply for minting collateral
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the asset market application
 * @param marketAddress - account address for the market application
 * @param oracleAppId - id of the aset market application
 * @param assetId - asset id of the asset being supplied, defaults to algo
 * @returns transaction group object representing a mint to collateral group transaction
 */

function prepareStakeTransactions(sender, suggestedParams, storageAccount, amount, managerAppId, marketAppId, marketAddress, oracleAppId, assetId) {
  if (assetId === void 0) {
    assetId = null;
  }

  var supportedOracleAppIds = [oracleAppId];
  var supportedMarketAppIds = [marketAppId];
  var prefixTransactions = getInitTxns(exports.Transactions.MINT_TO_COLLATERAL, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$4.encode(managerStrings.mint_to_collateral)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$4.encode(managerStrings.mint_to_collateral)], [storageAccount], [managerAppId]);
  var txn2;

  if (assetId) {
    txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, assetId, suggestedParams);
  } else {
    txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, marketAddress, amount, undefined, undefined, suggestedParams);
  }

  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}
/**
 * Returns a :class:`TransactionGroup` object representing a remove stake
 * group transaction against the algofi protocol. The sender requests to remove stake
 * from a stake acount and if successful, the stake is removed.
 *
 * @param sender - account addres for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of collateral to remove from the market
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application of the collateral
 * @param oracleAppId - id of the oracle application of the collateral
 * @param assetId - id of the asset to unstake
 * @returns transaction group object representing a unstake group transaction
 */

function prepareUnstakeTransactions(sender, suggestedParams, storageAccount, amount, managerAppId, marketAppId, oracleAppId, assetId) {
  if (assetId === void 0) {
    assetId = null;
  }

  var supportedMarketAppIds = [marketAppId];
  var supportedOracleAppIds = [oracleAppId];
  var prefixTransactions = getInitTxns(exports.Transactions.REMOVE_COLLATERAL_UNDERLYING, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$4.encode(managerStrings.remove_collateral_underlying), intToBytes(amount)]);
  var txn1;

  if (assetId) {
    txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$4.encode(managerStrings.remove_collateral_underlying)], [storageAccount], [managerAppId], [assetId]);
  } else {
    txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$4.encode(managerStrings.remove_collateral_underlying)], [storageAccount], [managerAppId]);
  }

  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1]));
}
/**
 * Returns a transaction group object representing a claim rewards
 * underlying group transaction against the algofi protocol. The sender requests
 * to claim rewards from the manager acount. If not, the account sends
 * back the user the amount of asset underlying their posted collateral.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - astorage account address for sender
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application of the collateral
 * @param oracleAppId - id of the oracle application
 * @param foreignAssets - list of reward assets in the staking contract
 * @returns transaction group obejct representing a claim rewards transaction
 */

function prepareClaimStakingRewardsTransactions(sender, suggestedParams, storageAccount, managerAppId, marketAppId, oracleAppId, foreignAssets) {
  var supportedMarketAppIds = [marketAppId];
  var supportedOracleAppIds = [oracleAppId];
  var prefixTransactions = getInitTxns(exports.Transactions.CLAIM_REWARDS, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$4.encode(managerStrings.claim_rewards)], [storageAccount], undefined, foreignAssets);
  return new TransactionGroup([].concat(prefixTransactions, [txn0]));
}

var enc$5 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a remove collateral
 * underlying group transaction against the algofi protocol. Functionally equivalent to
 * remove collateral + burn. The sender requests to remove collateral from a market acount
 * after which the application determines if the removal puts the sender's health ratio
 * below 1. If not, the account sends back the user the amount of asset underlying their posted collateral.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of collateral to remove from the market
 * @param assetId - asset id of the asset underlying the collateral
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application of the collateral
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @returns transaction group object representing a remove collateral underlying group transaction
 */

function prepareRemoveCollateralUnderlyingTransactions(sender, suggestedParams, storageAccount, amount, assetId, managerAppId, marketAppId, supportedMarketAppIds, supportedOracleAppIds) {
  var prefixTransactions = getInitTxns(exports.Transactions.REMOVE_COLLATERAL_UNDERLYING, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$5.encode(managerStrings.remove_collateral_underlying), intToBytes(amount)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$5.encode(managerStrings.remove_collateral_underlying)], [storageAccount], [managerAppId], [assetId]);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1]));
}

var enc$6 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a mint to collateral group
 * transaction against the algofi protocol. Functionality equivalent to mint + add_collateral.
 * The sender sends assets to the account of the asset market application which then calculates
 * and credits the user with an amount of collateral.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of asset to supply for minting collateral
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the asset market application
 * @param marketAddress - account address for the market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param assetId - asset id of the asset being supplied, defaults to algo
 * @returns transaction group representing a mitn to collateral group transaction
 */

function prepareMintToCollateralTransactions(sender, suggestedParams, storageAccount, amount, managerAppId, marketAppId, marketAddress, supportedMarketAppIds, supportedOracleAppIds, assetId) {
  if (assetId === void 0) {
    assetId = null;
  }

  var prefixTransactions = getInitTxns(exports.Transactions.MINT_TO_COLLATERAL, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$6.encode(managerStrings.mint_to_collateral)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$6.encode(managerStrings.mint_to_collateral)], [storageAccount], [managerAppId]);
  var txn2;

  if (assetId) {
    txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, assetId, suggestedParams);
  } else {
    txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, marketAddress, amount, undefined, undefined, suggestedParams);
  }

  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}

var enc$7 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a remove collateral
 * group transaction against the algofi protocol. The sender requests to remove collateral
 * from a market acount after which the application determines if the removal puts the sender's health ratio
 * below 1. If not, the account sends back the user the amount of bank assets requested.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of bank asset collateral to remove from market
 * @param bankAssetId - asset id of bank asset collateral
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application of the collateral
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @returns transaction group object representing a remove collateral group transaction
 */

function prepareRemoveCollateralTransactions(sender, suggestedParams, storageAccount, amount, bankAssetId, managerAppId, marketAppId, supportedMarketAppIds, supportedOracleAppIds) {
  var prefixTransactions = getInitTxns(exports.Transactions.REMOVE_COLLATERAL, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$7.encode(managerStrings.remove_collateral), intToBytes(amount)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$7.encode(managerStrings.remove_collateral)], [storageAccount], [managerAppId], [bankAssetId]);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1]));
}

var enc$8 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a repay borrow
 * group transaction against the algofi protocol. The sender repays assets to the
 * market of the borrow asset after which the market application decreases the
 * outstanding borrow amount for the sender.
 *
 * @param sender - account address for sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amoutn of borrow asset to repay
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application of the borrow asset
 * @param marketAddress - account address for the market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param assetId - asset id of the borrow asset, defaults to algo
 * @returns transaction group object representing a repay borrow group transaction
 */

function prepareRepayBorrowTransactions(sender, suggestedParams, storageAccount, amount, managerAppId, marketAppId, marketAddress, supportedMarketAppIds, supportedOracleAppIds, assetId) {
  if (assetId === void 0) {
    assetId = null;
  }

  var prefixTransactions = getInitTxns(exports.Transactions.REPAY_BORROW, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$8.encode(managerStrings.repay_borrow)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$8.encode(managerStrings.repay_borrow)], [storageAccount], [managerAppId], assetId ? [assetId] : []);
  var txn2;

  if (assetId) {
    txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, assetId, suggestedParams);
  } else {
    txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, marketAddress, amount, undefined, undefined, suggestedParams);
  }

  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}

var OPT_IN_MIN_BALANCE$1 = 3.5695;
/**
 * Returns a transactiong roup object representing a manager opt in
 * group transaction. The sender and storage account opt in to the manager application
 * and the storage account is rekeyed to the manager account address, rendering it
 * unable to be transacted against by the sender and therefore immutable.
 *
 * @param managerAppId - id of the manager application
 * @param getMaxAtomicOptInMarketAppIds - max opt in market app ids
 * @param sender - account address for the sender
 * @param storageAddress - address of the storage account
 * @param suggestedParams - suggested transaction params
 * @returns transaction group object representing a managet opt in group transaction
 */

function prepareManagerAppOptinTransactions(managerAppId, getMaxAtomicOptInMarketAppIds, sender, storageAddress, suggestedParams) {
  var txnPayment = algosdk.makePaymentTxnWithSuggestedParams(sender, storageAddress, Math.floor(OPT_IN_MIN_BALANCE$1 * 1e6), undefined, undefined, suggestedParams);
  var marketOptinTransactions = [];

  for (var _iterator = _createForOfIteratorHelperLoose(getMaxAtomicOptInMarketAppIds), _step; !(_step = _iterator()).done;) {
    var marketAppId = _step.value;
    marketOptinTransactions.push(algosdk.makeApplicationOptInTxn(sender, suggestedParams, marketAppId));
  }

  var txnUserOptinManager = algosdk.makeApplicationOptInTxn(sender, suggestedParams, managerAppId);
  var appAddress = algosdk.getApplicationAddress(managerAppId);
  var txnStorageOptinManager = algosdk.makeApplicationOptInTxn(storageAddress, suggestedParams, managerAppId, undefined, undefined, undefined, undefined, undefined, undefined, appAddress);
  return new TransactionGroup([txnPayment].concat(marketOptinTransactions, [txnUserOptinManager, txnStorageOptinManager]));
}
/**
 * Returns a transaction group object representing a market opt in
 * group transaction.
 *
 * @param marketAppId -id of the market application
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @returns transaction group object representing a market opt in group transaction
 */

function prepareMarketAppOptinTransactions(marketAppId, sender, suggestedParams) {
  return new TransactionGroup([algosdk.makeApplicationOptInTxn(sender, suggestedParams, marketAppId, [intToBytes(getRandomInt(1000000))])]);
}
/**
 * Returns a transaction group object representing an asset opt in
 * group transaction.
 *
 * @param assetId - id of the asset to opt into
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @returns transaction group object representing an asset opt in group transaction
 */

function prepareAssetOptinTransactions(assetId, sender, suggestedParams) {
  var txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, sender, undefined, undefined, 0, undefined, assetId, suggestedParams);
  return new TransactionGroup([txn]);
}

var enc$9 = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a liquidation group
 * transaction against the algofi protocol. The sender (liquidator) repays up to
 * 50% of the liquidatee's outstanding borrow and takes collateral of the liquidatee
 * at a premium defined by the market. The liquidator first sends borrow assets to the
 * account address of the borrow market. Then, the account of the collateral market is authorized
 * to credit the liquidator with a greater value of the liquidatee's collateral. The liquidator can
 * then remove collateral to underlying to convert the collateral to assets.
 *
 * @param sender -account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender (liquidator)
 * @param liquidateeStorageAccount - storage account address for liquidatee
 * @param amount - amount of borrow the liquidator repays
 * @param managerAppId - id of the manager application
 * @param borrowMarketAppId - id of the borrow market application
 * @param borrowMarketAddress - account address of the borrow market
 * @param collateralMarketAppId - id of the collateral market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param collateralBankAssetId - id of the collateral bank asset
 * @param borrowAssetId - id of the borrow asset, defaults to algo
 * @returns transaction group object representing a liquidate group transaction
 */

function prepareLiquidateTransactions(sender, suggestedParams, storageAccount, liquidateeStorageAccount, amount, managerAppId, borrowMarketAppId, borrowMarketAddress, collateralMarketAppId, supportedMarketAppIds, supportedOracleAppIds, collateralBankAssetId, borrowAssetId) {
  if (borrowAssetId === void 0) {
    borrowAssetId = null;
  }

  var prefixTransactions = getInitTxns(exports.Transactions.LIQUIDATE, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, liquidateeStorageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$9.encode(managerStrings.liquidate)], undefined, supportedMarketAppIds);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, borrowMarketAppId, [enc$9.encode(managerStrings.liquidate)], [liquidateeStorageAccount], [managerAppId, collateralMarketAppId]);
  var txn2;

  if (borrowAssetId) {
    txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, borrowMarketAddress, undefined, undefined, amount, undefined, borrowAssetId, suggestedParams);
  } else {
    txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, borrowMarketAddress, amount, undefined, undefined, suggestedParams);
  }

  var txn3 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, collateralMarketAppId, [enc$9.encode(managerStrings.liquidate)], [liquidateeStorageAccount, storageAccount], [managerAppId, borrowMarketAppId], [collateralBankAssetId]);
  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2, txn3]));
}

var RewardsProgram = /*#__PURE__*/function () {
  /**
   * Constructor for RewardsProgram class
   *
   * @param algodClient - algod client
   * @param managerState - state of manager application we are interested in
   */
  function RewardsProgram(algodClient, managerState) {
    this.algod = algodClient;
    this.latestRewardsTime = get(managerState, managerStrings.latest_rewards_time, 0);
    this.rewardsProgramNumber = get(managerState, managerStrings.n_rewards_programs, 0);
    this.rewardsAmount = get(managerState, managerStrings.rewards_amount, 0);
    this.rewardsPerSecond = get(managerState, managerStrings.rewards_per_second, 0);
    this.rewardsAssetId = get(managerState, managerStrings.rewards_asset_id, 0);
    this.rewardsSecondaryRatio = get(managerState, managerStrings.rewards_secondary_ratio, 0);
    this.rewardsSecondaryAssetId = get(managerState, managerStrings.rewards_secondary_asset_id, 0);
  }
  /**
   * Return a list of current rewards assets
   *
   * @returns rewards asset list
   */


  var _proto = RewardsProgram.prototype;

  _proto.getRewardsAssetIds = function getRewardsAssetIds() {
    var result = [];

    if (this.rewardsAssetId > 1) {
      result.push(this.rewardsAssetId);
    }

    if (this.rewardsSecondaryAssetId > 1) {
      result.push(this.rewardsSecondaryAssetId);
    }

    return result;
  }
  /**
   * Return latest rewards time
   *
   * @returns latest rewards time
   */
  ;

  _proto.getLatestRewardsTime = function getLatestRewardsTime() {
    return this.latestRewardsTime;
  }
  /**
   * Return rewards program number
   *
   * @returns rewards program number
   */
  ;

  _proto.getRewardsProgramNumber = function getRewardsProgramNumber() {
    return this.rewardsProgramNumber;
  }
  /**
   * Return rewards amount
   *
   * @returns rewards amount
   */
  ;

  _proto.getRewardsAmount = function getRewardsAmount() {
    return this.rewardsAmount;
  }
  /**
   * Return rewards per second
   *
   * @returns rewards per second
   */
  ;

  _proto.getRewardsPerSecond = function getRewardsPerSecond() {
    return this.rewardsPerSecond;
  }
  /**
   * Return rewards asset id
   *
   * @returns rewards asset id
   */
  ;

  _proto.getRewardsAssetId = function getRewardsAssetId() {
    return this.rewardsAssetId;
  }
  /**
   * Returns rewards secondary ratio
   *
   * @returns rewards secondary ratio
   */
  ;

  _proto.getRewardsSecondaryRatio = function getRewardsSecondaryRatio() {
    return this.rewardsSecondaryRatio;
  }
  /**
   * Return rewards secondary asset id
   *
   * @returns rewards secondary asset id
   */
  ;

  _proto.getRewardsSecondaryAssetId = function getRewardsSecondaryAssetId() {
    return this.rewardsSecondaryAssetId;
  }
  /**
   * Return the projected claimable rewards for a given storage address
   *
   * @param storageAddress - storage address of unrealized rewards
   * @param manager - manager for unrealized rewards
   * @param markets - list of markets for unrealized rewards
   * @returns two element list of primary and secondary unrealized rewards
   */
  ;

  _proto.getStorageUnrealizedRewards =
  /*#__PURE__*/
  function () {
    var _getStorageUnrealizedRewards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(storageAddress, manager, markets) {
      var managerState, managerStorageState, onCurrentProgram, totalUnrealizedRewards, totalSecondaryUnrealizedRewards, totalBorrowUsd, _iterator, _step, market, date, timeElapsed, rewardsIssued, _iterator2, _step2, _market, marketCounterPrefix, coefficient, userCoefficient, marketUnderlyingTvl, projectedCoefficient, marketStorageState, unrealizedRewards, secondaryUnrealizedRewards;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getGlobalState(this.algod, manager.getManagerAppId());

            case 2:
              managerState = _context.sent;
              _context.next = 5;
              return readLocalState(this.algod, storageAddress, manager.getManagerAppId());

            case 5:
              managerStorageState = _context.sent;
              onCurrentProgram = this.getRewardsProgramNumber() === get(managerStorageState, managerStrings.user_rewards_program_number, 0);
              totalUnrealizedRewards = onCurrentProgram ? get(managerStorageState, managerStrings.user_pending_rewards, 0) : 0;
              totalSecondaryUnrealizedRewards = onCurrentProgram ? get(managerStorageState, managerStrings.user_secondary_pending_rewards, 0) : 0;
              totalBorrowUsd = 0;
              _iterator = _createForOfIteratorHelperLoose(markets);

            case 11:
              if ((_step = _iterator()).done) {
                _context.next = 23;
                break;
              }

              market = _step.value;
              _context.t0 = totalBorrowUsd;
              _context.t1 = market.getAsset();
              _context.next = 17;
              return market.getUnderlyingBorrowed();

            case 17:
              _context.t2 = _context.sent;
              _context.next = 20;
              return _context.t1.toUSD.call(_context.t1, _context.t2);

            case 20:
              totalBorrowUsd = _context.t0 += _context.sent;

            case 21:
              _context.next = 11;
              break;

            case 23:
              date = new Date();
              timeElapsed = Math.floor(date.getTime() / 1000 - this.getLatestRewardsTime());
              rewardsIssued = this.getRewardsAmount() > 0 ? timeElapsed * this.getRewardsPerSecond() : 0;
              _iterator2 = _createForOfIteratorHelperLoose(markets);

            case 27:
              if ((_step2 = _iterator2()).done) {
                _context.next = 61;
                break;
              }

              _market = _step2.value;
              marketCounterPrefix = Buffer.from(intToBytes(_market.getMarketCounter())).toString("utf-8");
              coefficient = get(managerState, marketCounterPrefix + managerStrings.counter_indexed_rewards_coefficient, 0); // Ask about defuault value for get function here

              userCoefficient = onCurrentProgram ? managerStorageState[marketCounterPrefix + managerStrings.counter_to_user_rewards_coefficient_initial] : 0;
              _context.next = 34;
              return _market.getUnderlyingBorrowed();

            case 34:
              _context.t3 = _context.sent;
              _context.t4 = _market.getActiveCollateral() * _market.getBankToUnderlyingExchange() / SCALE_FACTOR;
              marketUnderlyingTvl = _context.t3 + _context.t4;
              _context.t5 = coefficient;
              _context.t6 = Math;
              _context.t7 = rewardsIssued * REWARDS_SCALE_FACTOR;
              _context.t8 = _market.getAsset();
              _context.next = 43;
              return _market.getUnderlyingBorrowed();

            case 43:
              _context.t9 = _context.sent;
              _context.next = 46;
              return _context.t8.toUSD.call(_context.t8, _context.t9);

            case 46:
              _context.t10 = _context.sent;
              _context.t11 = _context.t7 * _context.t10;
              _context.t12 = totalBorrowUsd * marketUnderlyingTvl;
              _context.t13 = _context.t11 / _context.t12;
              _context.t14 = _context.t6.floor.call(_context.t6, _context.t13);
              projectedCoefficient = _context.t5 + _context.t14;
              _context.next = 54;
              return _market.getStorageState(storageAddress);

            case 54:
              marketStorageState = _context.sent;
              unrealizedRewards = Math.floor((projectedCoefficient - userCoefficient) * (marketStorageState.activeCollateralUnderlying + marketStorageState.borrowUnderlying) / REWARDS_SCALE_FACTOR);
              secondaryUnrealizedRewards = Math.floor(unrealizedRewards * this.getRewardsSecondaryRatio() / PARAMETER_SCALE_FACTOR);
              totalUnrealizedRewards += unrealizedRewards;
              totalSecondaryUnrealizedRewards += secondaryUnrealizedRewards;

            case 59:
              _context.next = 27;
              break;

            case 61:
              return _context.abrupt("return", [totalUnrealizedRewards, totalSecondaryUnrealizedRewards]);

            case 62:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getStorageUnrealizedRewards(_x, _x2, _x3) {
      return _getStorageUnrealizedRewards.apply(this, arguments);
    }

    return getStorageUnrealizedRewards;
  }();

  return RewardsProgram;
}();

var Manager = /*#__PURE__*/function () {
  /**
   * This is the constructor for the Manager class.
   *
   * **Note, do not call this to create a new manager**. Instead call
   * the static method init as there are asynchronous set up steps in
   * creating an manager and a constructor can only return an instance of
   * the class and not a promise.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new manager
   * const newManager = await Manager.init(algodClient, managerAppId)
   *
   * //Incorrect way to instantiate new manager
   * const newManager = new Manager(algodClient, managerAppId)
   * ```
   *
   * @param algodClient - algod client
   * @param managerAppId - id of the manager application
   */
  function Manager(algodClient, managerAppId) {
    this.algod = algodClient;
    this.managerAppId = managerAppId;
    this.managerAddress = algosdk.getApplicationAddress(this.managerAppId);
  }
  /**
   * This is the function that should be called when creating a new manager.
   * You pass everything you would to the constructor, but to this function
   * instead and this returns the new and created manager.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new manager
   * const newManager = await Manager.init(algodClient, managerAppId)
   *
   * //Incorrect way to instantiate new manager
   * const newManager = new Manager(algodClient, managerAppId)
   * ```
   *
   * @param algodClient - algod client
   * @param managerAppId - id of the manager application
   * @returns an instance of the manager class fully constructed
   */


  Manager.init =
  /*#__PURE__*/
  function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algodClient, managerAppId) {
      var manager;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              manager = new Manager(algodClient, managerAppId);
              _context.next = 3;
              return manager.updateGlobalState();

            case 3:
              return _context.abrupt("return", manager);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x, _x2) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
  /**
   * Method to fetch most recent manager global state
   */
  ;

  var _proto = Manager.prototype;

  _proto.updateGlobalState =
  /*#__PURE__*/
  function () {
    var _updateGlobalState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var managerState;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getGlobalState(this.algod, this.managerAppId);

            case 2:
              managerState = _context2.sent;
              this.rewardsProgram = new RewardsProgram(this.algod, managerState);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateGlobalState() {
      return _updateGlobalState.apply(this, arguments);
    }

    return updateGlobalState;
  }()
  /**
   * Return manager app id
   *
   * @returns manager app id
   */
  ;

  _proto.getManagerAppId = function getManagerAppId() {
    return this.managerAppId;
  }
  /**
   * Return manager address
   *
   * @returns manager address
   */
  ;

  _proto.getManagerAddress = function getManagerAddress() {
    return this.managerAddress;
  }
  /**
   * Returns rewards program
   *
   * @returns rewards program
   */
  ;

  _proto.getRewardsProgram = function getRewardsProgram() {
    return this.rewardsProgram;
  }
  /**
   * Reeturns the storage addres for the client user
   *
   * @param address - address to get info for
   * @returns storage account address for user
   */
  ;

  _proto.getStorageAddress =
  /*#__PURE__*/
  function () {
    var _getStorageAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(address) {
      var userManagerState, rawStorageAddress;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return readLocalState(this.algod, address, this.managerAppId);

            case 2:
              userManagerState = _context3.sent;
              rawStorageAddress = get(userManagerState, managerStrings.user_storage_address, null);

              if (rawStorageAddress) {
                _context3.next = 6;
                break;
              }

              throw new Error("No storage address found");

            case 6:
              return _context3.abrupt("return", algosdk.encodeAddress(Buffer.from(rawStorageAddress.trim(), "base64")));

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getStorageAddress(_x3) {
      return _getStorageAddress.apply(this, arguments);
    }

    return getStorageAddress;
  }()
  /**
   * Returns the market local state for the provided address
   *
   * @param address - address to get info for
   * @returns market local state for address
   */
  ;

  _proto.getUserState =
  /*#__PURE__*/
  function () {
    var _getUserState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(address) {
      var userState;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.t0 = this;
              _context4.next = 3;
              return this.getStorageAddress(address);

            case 3:
              _context4.t1 = _context4.sent;
              _context4.next = 6;
              return _context4.t0.getStorageState.call(_context4.t0, _context4.t1);

            case 6:
              userState = _context4.sent;
              return _context4.abrupt("return", userState);

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getUserState(_x4) {
      return _getUserState.apply(this, arguments);
    }

    return getUserState;
  }()
  /**
   * Returns the market local state for storage address
   *
   * @param storageAddress - storage address to get info for
   * @returns market local state for storage address
   */
  ;

  _proto.getStorageState =
  /*#__PURE__*/
  function () {
    var _getStorageState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(storageAddress) {
      var result, userState;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = {};
              _context5.next = 3;
              return readLocalState(this.algod, storageAddress, this.managerAppId);

            case 3:
              userState = _context5.sent;
              result.user_global_max_borrow_in_dollars = get(userState, managerStrings.user_global_max_borrow_in_dollars, 0);
              result.user_global_borrowed_in_dollars = get(userState, managerStrings.user_global_borrowed_in_dollars, 0);
              return _context5.abrupt("return", result);

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getStorageState(_x5) {
      return _getStorageState.apply(this, arguments);
    }

    return getStorageState;
  }()
  /**
   * Returns projected unrealized rewards for a user address
   *
   * @param address - address to get unrealized rewards for
   * @param markets - list of markets
   * @returns two element list of primary and secondary unrealized rewards
   */
  ;

  _proto.getUserUnrealizedRewards =
  /*#__PURE__*/
  function () {
    var _getUserUnrealizedRewards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(address, markets) {
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = this;
              _context6.next = 3;
              return this.getStorageAddress(address);

            case 3:
              _context6.t1 = _context6.sent;
              _context6.t2 = markets;
              return _context6.abrupt("return", _context6.t0.getStorageUnrealizedRewards.call(_context6.t0, _context6.t1, _context6.t2));

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getUserUnrealizedRewards(_x6, _x7) {
      return _getUserUnrealizedRewards.apply(this, arguments);
    }

    return getUserUnrealizedRewards;
  }()
  /**
   * Returns projected unrealized rewards for storage address
   *
   * @param storageAddress - storage address to get unrealized rewards for
   * @param markets - list of markets
   * @returns two element list of primary and secondary unrealized rewards
   */
  ;

  _proto.getStorageUnrealizedRewards =
  /*#__PURE__*/
  function () {
    var _getStorageUnrealizedRewards = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(storageAddress, markets) {
      var storageUnrealizedRewards;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.getRewardsProgram().getStorageUnrealizedRewards(storageAddress, this, markets);

            case 2:
              storageUnrealizedRewards = _context7.sent;
              return _context7.abrupt("return", storageUnrealizedRewards);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getStorageUnrealizedRewards(_x8, _x9) {
      return _getStorageUnrealizedRewards.apply(this, arguments);
    }

    return getStorageUnrealizedRewards;
  }();

  return Manager;
}();

var Market = /*#__PURE__*/function () {
  /**
   * This is the constructor for the Market class.
   *
   * **Note, do not call this to create a new market**. Instead call
   * the static method init as there are asynchronous set up steps in
   * creating an market and a constructor can only return an instance of
   * the class and not a promise.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new market
   * const newMarket = await Market.init(algodClient, historicalIndexerClient, marketAppId)
   *
   * //Incorrect way to instantiate new market
   * const newMarket = new Market(algodClient, historicalIndexerClient, marketAppId)
   * ```
   *
   * @param algodClient - algod client
   * @param historicalIndexerClient - historical indexer client
   * @param marketAppId - application id of the market we are interested in
   */
  function Market(algodClient, historicalIndexerClient, marketAppId) {
    this.algod = algodClient;
    this.historicalIndexer = historicalIndexerClient;
    this.marketAppId = marketAppId;
    this.marketAddress = algosdk.getApplicationAddress(this.marketAppId);
  }
  /**
   * This is the function that should be called when creating a new market.
   * You pass everything you would to the constructor, but to this function
   * instead and this returns the new and created market.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new market
   * const newMarket = await Market.init(algodClient, historicalIndexerClient, marketAppId)
   *
   * //Incorrect way to instantiate new market
   * const newMarket = new Market(algodClient, historicalIndexerClient, marketAppId)
   * ```
   *
   * @param algodClient - algod client
   * @param historicalIndexerClient - historical indexer client
   * @param marketAppId - application id of the market we are interested in
   * @returns a new instance of the market class fully constructed
   */


  Market.init =
  /*#__PURE__*/
  function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algodClient, historicalIndexerClient, marketAppId, initAsset) {
      var market;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (initAsset === void 0) {
                initAsset = true;
              }

              market = new Market(algodClient, historicalIndexerClient, marketAppId);
              _context.next = 4;
              return market.updateGlobalState(initAsset);

            case 4:
              return _context.abrupt("return", market);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x, _x2, _x3, _x4) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
  /**
   * Method to fetch most recent market global state
   */
  ;

  var _proto = Market.prototype;

  _proto.updateGlobalState =
  /*#__PURE__*/
  function () {
    var _updateGlobalState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(initAsset) {
      var marketState;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (initAsset === void 0) {
                initAsset = true;
              }

              _context2.next = 3;
              return getGlobalState(this.algod, this.marketAppId);

            case 3:
              marketState = _context2.sent;
              this.marketCounter = marketState[marketStrings.manager_market_counter_var];
              this.underlyingAssetId = get(marketState, marketStrings.asset_id, null);
              this.bankAssetId = get(marketState, marketStrings.bank_asset_id, null);
              this.oracleAppId = get(marketState, marketStrings.oracle_app_id, null);
              this.oraclePriceField = get(marketState, marketStrings.oracle_price_field, null);
              this.oraclePriceScaleFactor = get(marketState, marketStrings.oracle_price_scale_factor, null);
              this.collateralFactor = get(marketState, marketStrings.collateral_factor, null);
              this.liquidationIncentive = get(marketState, marketStrings.liquidation_incentive, null);
              this.reserveFactor = get(marketState, marketStrings.reserve_factor, null);
              this.baseInterestRate = get(marketState, marketStrings.base_interest_rate, null);
              this.slope1 = get(marketState, marketStrings.slope_1, null);
              this.slope2 = get(marketState, marketStrings.slope_2, null);
              this.utilizationOptimal = get(marketState, marketStrings.utilization_optimal, null);
              this.marketSupplyCapInDollars = get(marketState, marketStrings.market_supply_cap_in_dollars, null);
              this.marketBorrowCapInDollars = get(marketState, marketStrings.market_borrow_cap_in_dollars, null);
              this.activeCollateral = get(marketState, marketStrings.active_collateral, 0);
              this.bankCirculation = get(marketState, marketStrings.bank_circulation, 0);
              this.bankToUnderlyingExchange = get(marketState, marketStrings.bank_to_underlying_exchange, 0);
              this.underlyingBorrowed = get(marketState, marketStrings.underlying_borrowed, 0);
              this.outstandingBorrowShares = get(marketState, marketStrings.outstanding_borrow_shares, 0);
              this.underlyingCash = get(marketState, marketStrings.underlying_cash, 0);
              this.underlyingReserves = get(marketState, marketStrings.underlying_reserves, 0);
              this.borrowUtil = this.underlyingBorrowed / (this.underlyingBorrowed + this.underlyingCash + this.underlyingReserves);
              this.totalBorrowInterestRate = get(marketState, marketStrings.total_borrow_interest_rate, 0);
              this.totalSupplyInterestRate = this.totalBorrowInterestRate * this.borrowUtil;

              if (!initAsset) {
                _context2.next = 41;
                break;
              }

              if (!this.underlyingAssetId) {
                _context2.next = 36;
                break;
              }

              _context2.next = 33;
              return Asset.init(this.algod, this.underlyingAssetId, this.bankAssetId, this.oracleAppId, this.oraclePriceField, this.oraclePriceScaleFactor);

            case 33:
              _context2.t0 = _context2.sent;
              _context2.next = 37;
              break;

            case 36:
              _context2.t0 = null;

            case 37:
              this.asset = _context2.t0;
              _context2.next = 40;
              return this.asset.getPrice();

            case 40:
              this.assetPrice = _context2.sent;

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateGlobalState(_x5) {
      return _updateGlobalState.apply(this, arguments);
    }

    return updateGlobalState;
  }()
  /**
   * Returns the app id for this market
   *
   * @returns market app id
   */
  ;

  _proto.getMarketAppId = function getMarketAppId() {
    return this.marketAppId;
  }
  /**
   * Returns the market address for this market
   *
   * @returns market address
   */
  ;

  _proto.getMarketAddress = function getMarketAddress() {
    return this.marketAddress;
  }
  /**
   * Returns the market counter for this market
   *
   * @returns market counter
   */
  ;

  _proto.getMarketCounter = function getMarketCounter() {
    return this.marketCounter;
  }
  /**
   * Returns asset object for this market
   *
   * @returns asset
   */
  ;

  _proto.getAsset = function getAsset() {
    return this.asset;
  }
  /**
   * Returns active collateral for this market
   *
   * @returns active collateral
   */
  ;

  _proto.getActiveCollateral = function getActiveCollateral() {
    return this.activeCollateral;
  }
  /**
   * Returns bank circulation for this market
   *
   * @returns bank circulation
   */
  ;

  _proto.getBankCirculation = function getBankCirculation() {
    return this.bankCirculation;
  }
  /**
   * Returns bank to underlying exchange for this market
   *
   * @returns bank to underlying exchange
   */
  ;

  _proto.getBankToUnderlyingExchange = function getBankToUnderlyingExchange() {
    return this.bankToUnderlyingExchange;
  }
  /**
   * Returns underlying borrowed for this market
   *
   * @param block - specific block to get underlying borrowe for
   * @returns
   */
  ;

  _proto.getUnderlyingBorrowed =
  /*#__PURE__*/
  function () {
    var _getUnderlyingBorrowed = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(block) {
      var data;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (block === void 0) {
                block = null;
              }

              if (!block) {
                _context3.next = 14;
                break;
              }

              _context3.prev = 2;
              _context3.next = 5;
              return this.historicalIndexer.lookupApplications(this.marketAppId)["do"]();

            case 5:
              data = _context3.sent;
              return _context3.abrupt("return", searchGlobalState(data.application.params["global-state"], marketStrings.underlying_borrowed));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](2);
              throw new Error("Issue getting data");

            case 12:
              _context3.next = 15;
              break;

            case 14:
              return _context3.abrupt("return", this.underlyingBorrowed);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[2, 9]]);
    }));

    function getUnderlyingBorrowed(_x6) {
      return _getUnderlyingBorrowed.apply(this, arguments);
    }

    return getUnderlyingBorrowed;
  }()
  /**
   * Returns outstanding borrow shares for this market
   *
   * @returns outstanding borrow shares
   */
  ;

  _proto.getOutstandingBorrowShares = function getOutstandingBorrowShares() {
    return this.outstandingBorrowShares;
  }
  /**
   * Returns underlying cash for this market
   *
   * @param block - block to get underlying cash for
   * @returns underlying cash
   */
  ;

  _proto.getUnderlyingCash =
  /*#__PURE__*/
  function () {
    var _getUnderlyingCash = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(block) {
      var data;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (block === void 0) {
                block = null;
              }

              if (!block) {
                _context4.next = 14;
                break;
              }

              _context4.prev = 2;
              _context4.next = 5;
              return this.historicalIndexer.lookupApplications(this.marketAppId)["do"]();

            case 5:
              data = _context4.sent;
              return _context4.abrupt("return", searchGlobalState(data.application.params["global-state"], marketStrings.underlying_cash));

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](2);
              throw new Error("Issue getting data");

            case 12:
              _context4.next = 15;
              break;

            case 14:
              return _context4.abrupt("return", this.underlyingCash);

            case 15:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 9]]);
    }));

    function getUnderlyingCash(_x7) {
      return _getUnderlyingCash.apply(this, arguments);
    }

    return getUnderlyingCash;
  }()
  /**
   * Returns underlying reserves for this market
   *
   * @param block - block to get underlying reserves for
   * @returns underlying reserves
   */
  ;

  _proto.getUnderlyingReserves =
  /*#__PURE__*/
  function () {
    var _getUnderlyingReserves = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(block) {
      var data;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (block === void 0) {
                block = null;
              }

              if (!block) {
                _context5.next = 14;
                break;
              }

              _context5.prev = 2;
              _context5.next = 5;
              return this.historicalIndexer.lookupApplications(this.marketAppId)["do"]();

            case 5:
              data = _context5.sent;
              return _context5.abrupt("return", searchGlobalState(data.application.params["global-state"], marketStrings.underlying_reserves));

            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](2);
              throw new Error("Issue getting data");

            case 12:
              _context5.next = 15;
              break;

            case 14:
              return _context5.abrupt("return", this.underlyingReserves);

            case 15:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 9]]);
    }));

    function getUnderlyingReserves(_x8) {
      return _getUnderlyingReserves.apply(this, arguments);
    }

    return getUnderlyingReserves;
  }()
  /**
   * Returns total borrow interest rate for this market
   *
   * @param block - block to get total borrow interest rate for
   * @returns total borrow interest rate
   */
  ;

  _proto.getTotalBorrowInterestRate =
  /*#__PURE__*/
  function () {
    var _getTotalBorrowInterestRate = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(block) {
      var data;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (block === void 0) {
                block = null;
              }

              if (!block) {
                _context6.next = 14;
                break;
              }

              _context6.prev = 2;
              _context6.next = 5;
              return this.historicalIndexer.lookupApplications(this.marketAppId)["do"]();

            case 5:
              data = _context6.sent;
              return _context6.abrupt("return", searchGlobalState(data.application.params["global-state"], marketStrings.total_borrow_interest_rate));

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](2);
              throw new Error("Issue getting data");

            case 12:
              _context6.next = 15;
              break;

            case 14:
              return _context6.abrupt("return", this.totalBorrowInterestRate);

            case 15:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this, [[2, 9]]);
    }));

    function getTotalBorrowInterestRate(_x9) {
      return _getTotalBorrowInterestRate.apply(this, arguments);
    }

    return getTotalBorrowInterestRate;
  }()
  /**
   * Returns collateral factor for this market
   * @returns collateral factor
   */
  ;

  _proto.getCollateralFactor = function getCollateralFactor() {
    return this.collateralFactor;
  }
  /**
   * Returns liquidation incentive for this market
   *
   * @returns liquidation incentive
   */
  ;

  _proto.getLiquidationIncentive = function getLiquidationIncentive() {
    return this.liquidationIncentive;
  }
  /**
   * Returns the market local state for address
   *
   * @param storageAddress - storage addres to get info for
   * @returns market local state for address
   */
  ;

  _proto.getStorageState =
  /*#__PURE__*/
  function () {
    var _getStorageState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(storageAddress) {
      var result, userState, asset;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              result = {};
              _context7.next = 3;
              return readLocalState(this.algod, storageAddress, this.marketAppId);

            case 3:
              userState = _context7.sent;
              asset = this.getAsset();
              result.activeCollateralBank = get(userState, marketStrings.user_active_collateral, 0);
              result.activeCollateralUnderlying = Math.floor(result.activeCollateralBank * this.bankToUnderlyingExchange / SCALE_FACTOR);
              _context7.next = 9;
              return asset.toUSD(result.activeCollateralUnderlying);

            case 9:
              result.activeCollateralUsd = _context7.sent;
              result.activeCollateralMaxBorrowUsd = result.activeCollateralUsd * this.collateralFactor / PARAMETER_SCALE_FACTOR;
              result.borrowShares = get(userState, marketStrings.user_borrow_shares, 0);
              result.borrowUnderlying = Math.floor(this.underlyingBorrowed * result.borrowShares / this.outstandingBorrowShares);
              _context7.next = 15;
              return asset.toUSD(result.borrowUnderlying);

            case 15:
              result.borrowUsd = _context7.sent;
              return _context7.abrupt("return", result);

            case 17:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getStorageState(_x10) {
      return _getStorageState.apply(this, arguments);
    }

    return getStorageState;
  }();

  return Market;
}();

var StakingContract = /*#__PURE__*/function () {
  /**
   * This is the constructor for the StakingContract class.
   *
   * **Note, do not call this to create a new staking contract**. Instead call
   * the static method init as there are asynchronous set up steps in
   * creating an staking contract and a constructor can only return an instance of
   * the class and not a promise.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new staking contract
   * const newStakingContract = await StakingContract.init(algodClient, historicalIndexerClient, stakingContractInfo)
   *
   * //Incorrect way to instantiate new staking contract
   * const newStakingContract = new StakingContract(algodClient, historicalIndexerClient)
   * ```
   * @param algodClient - algod client
   * @param historicalIndexerClient - historical indexer client
   */
  function StakingContract(algodClient, historicalIndexerClient) {
    this.algodClient = algodClient;
    this.historicalIndexerClient = historicalIndexerClient;
  }
  /**
   * This is the function that should be called when creating a new staking contract.
   * You pass everything you would to the constructor with an additional staking contract info
   * dictionary, but to this function instead and this returns the new and created staking contract.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new staking contract
   * const newStakingContract = await StakingContract.init(algodClient, historicalIndexerClient, stakingContractInfo)
   *
   * //Incorrect way to instantiate new staking contract
   * const newStakingContract = new StakingContract(algodClient, historicalIndexerClient)
   * ```
   * @param algodClient - algod client
   * @param historicalIndexerClient - historical indexer client
   * @param stakingContractInfo - dictionary of information on staking contract
   */


  StakingContract.init =
  /*#__PURE__*/
  function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algodClient, historicalIndexerClient, stakingContractInfo) {
      var stakingContract;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              stakingContract = new StakingContract(algodClient, historicalIndexerClient);
              _context.next = 3;
              return Manager.init(stakingContract.algodClient, stakingContractInfo.managerAppId);

            case 3:
              stakingContract.manager = _context.sent;
              _context.next = 6;
              return Market.init(algodClient, historicalIndexerClient, stakingContractInfo.marketAppId);

            case 6:
              stakingContract.market = _context.sent;
              _context.next = 9;
              return stakingContract.updateGlobalState();

            case 9:
              return _context.abrupt("return", stakingContract);

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x, _x2, _x3) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
  /**
   * Method to fetch most recent staking contract global state
   */
  ;

  var _proto = StakingContract.prototype;

  _proto.updateGlobalState =
  /*#__PURE__*/
  function () {
    var _updateGlobalState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getManager().updateGlobalState();

            case 2:
              _context2.next = 4;
              return this.getMarket().updateGlobalState();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function updateGlobalState() {
      return _updateGlobalState.apply(this, arguments);
    }

    return updateGlobalState;
  }()
  /**
   * Return staking contract manager
   *
   * @returns manager
   */
  ;

  _proto.getManager = function getManager() {
    return this.manager;
  }
  /**
   * Return staking contract market
   *
   * @returns market
   */
  ;

  _proto.getMarket = function getMarket() {
    return this.market;
  }
  /**
   * Return asset object for this market
   *
   * @returns asset
   */
  ;

  _proto.getAsset = function getAsset() {
    return this.getMarket().getAsset();
  }
  /**
   * Return manager app id
   *
   * @returns manager app id
   */
  ;

  _proto.getManagerAppId = function getManagerAppId() {
    return this.getManager().getManagerAppId();
  }
  /**
   * Return manager address
   *
   * @returns manager address
   */
  ;

  _proto.getManagerAddress = function getManagerAddress() {
    return this.getManager().getManagerAddress();
  }
  /**
   * Return the market app id
   *
   * @returns market app id
   */
  ;

  _proto.getMarketAppId = function getMarketAppId() {
    return this.getMarket().getMarketAppId();
  }
  /**
   * Return the market address
   *
   * @returns market address
   */
  ;

  _proto.getMarketAddress = function getMarketAddress() {
    return this.getMarket().getMarketAddress();
  }
  /**
   * Return oracle app id
   *
   * @returns oracle app id
   */
  ;

  _proto.getOracleAppId = function getOracleAppId() {
    return this.getMarket().getAsset().getOracleAppId();
  }
  /**
   * Return staked amount
   *
   * @returns staked
   */
  ;

  _proto.getStaked = function getStaked() {
    return this.getMarket().getActiveCollateral();
  }
  /**
   * Return rewards program
   *
   * @returns rewards program
   */
  ;

  _proto.getRewardsProgram = function getRewardsProgram() {
    return this.getManager().getRewardsProgram();
  }
  /**
   * Return the staking contract storage address for given address or null if it does not exist
   *
   * @param address - address to get info for
   * @returns storage account address for user
   */
  ;

  _proto.getStorageAddress =
  /*#__PURE__*/
  function () {
    var _getStorageAddress = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(address) {
      var storageAddress;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getManager().getStorageAddress(address);

            case 2:
              storageAddress = _context3.sent;
              return _context3.abrupt("return", storageAddress);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getStorageAddress(_x4) {
      return _getStorageAddress.apply(this, arguments);
    }

    return getStorageAddress;
  }()
  /**
   * Return the staking contract local state for address
   *
   * @param address - address to get info for
   * @returns staking contract local state for address
   */
  ;

  _proto.getUserState =
  /*#__PURE__*/
  function () {
    var _getUserState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(address) {
      var storageAddress, userState;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.getStorageAddress(address);

            case 2:
              storageAddress = _context4.sent;

              if (storageAddress) {
                _context4.next = 5;
                break;
              }

              throw new Error("no storage address found");

            case 5:
              _context4.next = 7;
              return this.getStorageState(storageAddress);

            case 7:
              userState = _context4.sent;
              return _context4.abrupt("return", userState);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function getUserState(_x5) {
      return _getUserState.apply(this, arguments);
    }

    return getUserState;
  }()
  /**
   * Return the staking contract local state for storage address
   *
   * @param storageAddress -storage address to get info for
   * @returns staking contract local state for address
   */
  ;

  _proto.getStorageState =
  /*#__PURE__*/
  function () {
    var _getStorageState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(storageAddress) {
      var result, _yield$this$getManage, unrealizedRewards, secondaryUnrealizedRewards, userMarketState;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = {};
              _context5.next = 3;
              return this.getManager().getStorageUnrealizedRewards(storageAddress, [this.getMarket()]);

            case 3:
              _yield$this$getManage = _context5.sent;
              unrealizedRewards = _yield$this$getManage[0];
              secondaryUnrealizedRewards = _yield$this$getManage[1];
              result.unrealized_rewards = unrealizedRewards;
              result.secondary_unrealized_rewards = secondaryUnrealizedRewards;
              _context5.next = 10;
              return this.getMarket().getStorageState(storageAddress);

            case 10:
              userMarketState = _context5.sent;
              result.staked_bank = userMarketState.activeCollateralBank;
              result.stake_underlying = userMarketState.activeCollateralUnderlying;
              return _context5.abrupt("return", result);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function getStorageState(_x6) {
      return _getStorageState.apply(this, arguments);
    }

    return getStorageState;
  }();

  return StakingContract;
}();

var enc$a = /*#__PURE__*/new TextEncoder();
/**
 * Returns a transaction group object representing a mint group
 * transaction against the algofi protocol. bAssets are not automatically
 * posted to collateral as in `prepare_mint_to_collateral_transactions`.
 * Sender sends assets to the account of the asset market application which
 * then sends an amount of market bank assets to the user.
 *
 * @param sender - account address for the sender
 * @param suggestedParams - suggested transaction params
 * @param storageAccount - storage account address for sender
 * @param amount - amount of asset to supply for minting bank assets
 * @param bankAssetId - asset id of the bank asset to be minted
 * @param managerAppId - id of the manager application
 * @param marketAppId - id of the market application for the bank asset
 * @param marketAddress - account address for the market application
 * @param supportedMarketAppIds - list of supported market application ids
 * @param supportedOracleAppIds - list of supported oracle application ids
 * @param assetId - asset id of the asset being supplied, defaults to algo
 * @returns transaction group object representing a mint group transaction
 */

function prepareMintTransactions(sender, suggestedParams, storageAccount, amount, bankAssetId, managerAppId, marketAppId, marketAddress, supportedMarketAppIds, supportedOracleAppIds, assetId) {
  if (assetId === void 0) {
    assetId = null;
  }

  var prefixTransactions = getInitTxns(exports.Transactions.MINT, sender, suggestedParams, managerAppId, supportedMarketAppIds, supportedOracleAppIds, storageAccount);
  var txn0 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, managerAppId, [enc$a.encode(managerStrings.mint)]);
  var txn1 = algosdk.makeApplicationNoOpTxn(sender, suggestedParams, marketAppId, [enc$a.encode(managerStrings.mint)], [storageAccount], [managerAppId], [bankAssetId]);
  var txn2;

  if (assetId) {
    txn2 = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, marketAddress, undefined, undefined, amount, undefined, assetId, suggestedParams);
  } else {
    txn2 = algosdk.makePaymentTxnWithSuggestedParams(sender, marketAddress, amount, undefined, undefined, suggestedParams);
  }

  return new TransactionGroup([].concat(prefixTransactions, [txn0, txn1, txn2]));
}

var Client = /*#__PURE__*/function () {
  /**
   *
   * This is the constructor for the Client class.
   *
   * **Note, do not call this to create a new client**. Instead call
   * the static method init as there are asynchronous set up steps in
   * creating an client and a constructor can only return an instance of
   * the class and not a promise.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new client
   * const client = await Client.init(algodClient, indexerClient, historicalIndexerClient, userAddress, chain)
   *
   * //Incorrect way to instantiate new client
   * const client = new Client(algodClient, indexerClient, historicalIndexerClient, userAddress, chain)
   * ```
   *
   * @param algodClient - algod client
   * @param indexerClient - indexer client
   * @param historicalIndexerClient - indexer client
   * @param userAddress - account address of user
   * @param chain - specified chain we want the client to run on
   */
  function Client(algodClient, indexerClient, historicalIndexerClient, userAddress, chain) {
    this.scaleFactor = 1e9;
    this.borrowSharesInit = 1e3;
    this.parameterScaleFactor = 1e3;
    this.algod = algodClient;
    this.indexerClient = indexerClient;
    this.historicalIndexer = historicalIndexerClient;
    this.chain = chain;
    this.userAddress = userAddress;
    this.initRound = getInitRound(this.chain);
    this.activeOrderedSymbols = getOrderedSymbols(this.chain);
    this.maxOrderedSymbols = getOrderedSymbols(this.chain, true);
    this.maxAtomicOptInOrderedSymbols = getOrderedSymbols(this.chain, undefined, true);
    this.stakingContractInfo = getStakingContracts(this.chain);
  }
  /**
   * This is the function that should be called when creating a new client.
   * You pass everything you would to the constructor, but to this function
   * instead and this returns the new and created client.
   *
   * #### Example
   * ```typescript
   * //Correct way to instantiate new client
   * const client = await Client.init(algodClient, indexerClient, historicalIndexerClient, userAddress, chain)
   *
   * //Incorrect way to instantiate new client
   * const client = new Client(algodClient, indexerClient, historicalIndexerClient, userAddress, chain)
   * ```
   *
   * @param algodClient - algod client
   * @param indexerClient - indexer client
   * @param historicalIndexerClient - indexer client
   * @param userAddress - account address of user
   * @param chain - specified chain we want the client to run on
   * @returns an instance of the client class fully constructed
   */


  Client.init =
  /*#__PURE__*/
  function () {
    var _init = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(algodClient, indexerClient, historicalIndexerClient, userAddress, chain, fetchStaking) {
      var client, _iterator, _step, symbol, _i, _Object$keys, title;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (fetchStaking === void 0) {
                fetchStaking = false;
              }

              client = new Client(algodClient, indexerClient, historicalIndexerClient, userAddress, chain);
              client.markets = {};
              _iterator = _createForOfIteratorHelperLoose(client.activeOrderedSymbols);

            case 4:
              if ((_step = _iterator()).done) {
                _context.next = 11;
                break;
              }

              symbol = _step.value;
              _context.next = 8;
              return Market.init(algodClient, historicalIndexerClient, getMarketAppId(client.chain, symbol));

            case 8:
              client.markets[symbol] = _context.sent;

            case 9:
              _context.next = 4;
              break;

            case 11:
              client.stakingContracts = {};

              if (!fetchStaking) {
                _context.next = 22;
                break;
              }

              _i = 0, _Object$keys = Object.keys(client.stakingContractInfo);

            case 14:
              if (!(_i < _Object$keys.length)) {
                _context.next = 22;
                break;
              }

              title = _Object$keys[_i];
              _context.next = 18;
              return StakingContract.init(client.algod, client.historicalIndexer, client.stakingContractInfo[title]);

            case 18:
              client.stakingContracts[title] = _context.sent;

            case 19:
              _i++;
              _context.next = 14;
              break;

            case 22:
              _context.next = 24;
              return Manager.init(client.algod, getManagerAppId(client.chain));

            case 24:
              client.manager = _context.sent;
              return _context.abrupt("return", client);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function init(_x, _x2, _x3, _x4, _x5, _x6) {
      return _init.apply(this, arguments);
    }

    return init;
  }()
  /**
   * Initializes the transactions parameters for the client.
   *
   * @returns default parameters for transactions
   */
  ;

  var _proto = Client.prototype;

  _proto.getDefaultParams =
  /*#__PURE__*/
  function () {
    var _getDefaultParams = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      var params;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.algod.getTransactionParams()["do"]();

            case 2:
              params = _context2.sent;
              params.flatFee = true;
              params.fee = 1000;
              return _context2.abrupt("return", params);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getDefaultParams() {
      return _getDefaultParams.apply(this, arguments);
    }

    return getDefaultParams;
  }()
  /**
   * Returns a dictionary of information about the user.
   *
   * @param address - address to get info for
   * @returns a dictionary of information about the user
   */
  ;

  _proto.getUserInfo =
  /*#__PURE__*/
  function () {
    var _getUserInfo = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(address) {
      var addr, userInfo;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context3.next = 5;
              return this.algod.accountInformation(addr)["do"]();

            case 5:
              userInfo = _context3.sent;
              return _context3.abrupt("return", userInfo);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getUserInfo(_x7) {
      return _getUserInfo.apply(this, arguments);
    }

    return getUserInfo;
  }()
  /**
   * Returns a boolean if the user address is opted into an application with id appId.
   *
   * @param appId - id of the application
   * @param address - address to get information for
   * @returns boolean if user is opted into application with id appId
   */
  ;

  _proto.isOptedIntoApp =
  /*#__PURE__*/
  function () {
    var _isOptedIntoApp = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(appId, address) {
      var addr, userInfo, optedInIds, _iterator2, _step2, app;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context4.next = 5;
              return this.getUserInfo(addr);

            case 5:
              userInfo = _context4.sent;
              optedInIds = [];

              for (_iterator2 = _createForOfIteratorHelperLoose(userInfo["apps-local-state"]); !(_step2 = _iterator2()).done;) {
                app = _step2.value;
                optedInIds.push(app.id);
              }

              return _context4.abrupt("return", optedInIds.includes(appId));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function isOptedIntoApp(_x8, _x9) {
      return _isOptedIntoApp.apply(this, arguments);
    }

    return isOptedIntoApp;
  }()
  /**
   * Returns a boolean if the user is opted into an asset with id assetId.
   *
   * @param assetId - id of the asset
   * @param address - address to get info for
   * @returns boolean if user is opted into an asset
   */
  ;

  _proto.isOptedIntoAsset =
  /*#__PURE__*/
  function () {
    var _isOptedIntoAsset = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(assetId, address) {
      var addr, userInfo, assets, _iterator3, _step3, asset;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context5.next = 5;
              return this.getUserInfo(addr);

            case 5:
              userInfo = _context5.sent;
              assets = [];

              for (_iterator3 = _createForOfIteratorHelperLoose(userInfo.assets); !(_step3 = _iterator3()).done;) {
                asset = _step3.value;
                assets.push(asset["asset-id"]);
              }

              return _context5.abrupt("return", assets.includes(assetId));

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function isOptedIntoAsset(_x10, _x11) {
      return _isOptedIntoAsset.apply(this, arguments);
    }

    return isOptedIntoAsset;
  }()
  /**
   * Returns a dictionary of user balances by assetid.
   *
   * @param address - address to get info for
   * @returns amount of asset
   */
  ;

  _proto.getUserBalances =
  /*#__PURE__*/
  function () {
    var _getUserBalances = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(address) {
      var addr, userInfo, balances, _iterator4, _step4, asset;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context6.next = 5;
              return this.getUserInfo(addr);

            case 5:
              userInfo = _context6.sent;
              balances = {};

              for (_iterator4 = _createForOfIteratorHelperLoose(userInfo.assets); !(_step4 = _iterator4()).done;) {
                asset = _step4.value;
                balances[asset["asset-id"]] = asset.amount;
              }

              balances[1] = userInfo.amount;
              return _context6.abrupt("return", balances);

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function getUserBalances(_x12) {
      return _getUserBalances.apply(this, arguments);
    }

    return getUserBalances;
  }()
  /**
   * Returns amount of asset in user's balance with asset id assetId.
   *
   * @param assetId - id of the asset,
   * @param address - address to get info for
   * @returns amount of asset that the user has
   */
  ;

  _proto.getUserBalance =
  /*#__PURE__*/
  function () {
    var _getUserBalance = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(assetId, address) {
      var addr, userBalances;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (assetId === void 0) {
                assetId = 1;
              }

              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context7.next = 6;
              return this.getUserBalances(addr);

            case 6:
              userBalances = _context7.sent;
              return _context7.abrupt("return", get(userBalances, assetId, 0));

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function getUserBalance(_x13, _x14) {
      return _getUserBalance.apply(this, arguments);
    }

    return getUserBalance;
  }()
  /**
   * Returns a dictionary with the lending market state for a given address (must be opted in).
   *
   * @param address - address to get info for; if null, will use address supplied when creating client
   * @returns dictionary that represents the state of user
   */
  ;

  _proto.getUserState =
  /*#__PURE__*/
  function () {
    var _getUserState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(address) {
      var addr, result, storageAddress, _iterator5, _step5, symbol;

      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;
              result = {};

              if (!addr) {
                addr = this.userAddress;
              }

              result.markets = {};
              _context8.next = 7;
              return this.manager.getUserState(addr);

            case 7:
              result.manager = _context8.sent;
              _context8.next = 10;
              return this.manager.getStorageAddress(addr);

            case 10:
              storageAddress = _context8.sent;
              _iterator5 = _createForOfIteratorHelperLoose(this.activeOrderedSymbols);

            case 12:
              if ((_step5 = _iterator5()).done) {
                _context8.next = 19;
                break;
              }

              symbol = _step5.value;
              _context8.next = 16;
              return this.markets[symbol].getStorageState(storageAddress);

            case 16:
              result.markets[symbol] = _context8.sent;

            case 17:
              _context8.next = 12;
              break;

            case 19:
              result.storageAddress = storageAddress;
              return _context8.abrupt("return", result);

            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function getUserState(_x15) {
      return _getUserState.apply(this, arguments);
    }

    return getUserState;
  }()
  /**
   * Returns a dictionary witht he lending market state for a given storage address.
   *
   * @param storageAddress - address to get info for; if null will use address supplied when creating client
   * @returns dictionary that represents the storage state of a user
   */
  ;

  _proto.getStorageState =
  /*#__PURE__*/
  function () {
    var _getStorageState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(storageAddress) {
      var addr, result, _iterator6, _step6, symbol;

      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (storageAddress === void 0) {
                storageAddress = null;
              }

              addr = storageAddress;
              result = {};

              if (addr) {
                _context9.next = 7;
                break;
              }

              _context9.next = 6;
              return this.manager.getStorageAddress(this.userAddress);

            case 6:
              addr = _context9.sent;

            case 7:
              result.manager = this.manager.getStorageState(addr);

              for (_iterator6 = _createForOfIteratorHelperLoose(this.activeOrderedSymbols); !(_step6 = _iterator6()).done;) {
                symbol = _step6.value;
                result[symbol] = this.markets[symbol].getStorageState(addr);
              }

              return _context9.abrupt("return", result);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function getStorageState(_x16) {
      return _getStorageState.apply(this, arguments);
    }

    return getStorageState;
  }()
  /**
   * Returns a dictionary with the staking contract state for the named staking contract and selected address
   *
   * @param stakingContractName - name of the staking contract to query
   * @param address - address to get info for; if null will use address supplied when creating client
   * @returns state representing staking contract info of user
   */
  ;

  _proto.getUserStakingContractState =
  /*#__PURE__*/
  function () {
    var _getUserStakingContractState = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(stakingContractName, address) {
      var addr, userState;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context10.next = 5;
              return this.stakingContracts[stakingContractName].getUserState(addr);

            case 5:
              userState = _context10.sent;
              return _context10.abrupt("return", userState);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function getUserStakingContractState(_x17, _x18) {
      return _getUserStakingContractState.apply(this, arguments);
    }

    return getUserStakingContractState;
  }() // GETTERS

  /**
   * Returns the manager object representing the manager of this client.
   *
   * @returns manager
   */
  ;

  _proto.getManager = function getManager() {
    return this.manager;
  }
  /**
   * Returns the market object for the given symbol.
   *
   * @param symbol - market symbol
   * @returns market
   */
  ;

  _proto.getMarket = function getMarket(symbol) {
    return this.markets[symbol];
  }
  /**
   * Returns a dictionary of active markets by symbol
   *
   * @returns markets dictionary
   */
  ;

  _proto.getActiveMarkets = function getActiveMarkets() {
    var activeMarkets = {};

    for (var _i2 = 0, _Object$entries = Object.entries(this.markets); _i2 < _Object$entries.length; _i2++) {
      var _Object$entries$_i = _Object$entries[_i2],
          key = _Object$entries$_i[0],
          value = _Object$entries$_i[1];

      if (this.activeOrderedSymbols.includes(key)) {
        activeMarkets[key] = value;
      }
    }

    return activeMarkets;
  }
  /**
   * Returns a staking contract with the given title
   *
   * @param title - staking contract name
   * @returns staking contract with the given name
   */
  ;

  _proto.getStakingContract = function getStakingContract(title) {
    return this.stakingContracts[title];
  }
  /**
   * Returns a ditionary of all staking contracts
   *
   * @returns staking contracts dictionary
   */
  ;

  _proto.getStakingContracts = function getStakingContracts() {
    return this.stakingContracts;
  }
  /**
   * Returns the asset object for the requested symbol
   *
   * @param symbol - symbol of the asset
   * @returns asset object with the provided symbol
   */
  ;

  _proto.getAsset = function getAsset(symbol) {
    if (!this.activeOrderedSymbols.includes(symbol)) {
      throw new Error("Unsupported asset");
    }

    return this.markets[symbol].getAsset();
  }
  /**
   * Returns the max opt in market application ids
   *
   * @returns list of max opt in market application ids
   */
  ;

  _proto.getMaxAtomicOptInMarketAppIds = function getMaxAtomicOptInMarketAppIds() {
    var maxOptInMarketAppIds = [];

    for (var _iterator7 = _createForOfIteratorHelperLoose(this.maxAtomicOptInOrderedSymbols), _step7; !(_step7 = _iterator7()).done;) {
      var symbol = _step7.value;
      maxOptInMarketAppIds.push(this.markets[symbol].getMarketAppId());
    }

    return maxOptInMarketAppIds;
  }
  /**
   * Returns a dictionary of the asset objects for each active market
   *
   * @returns dictionary of asset objects
   */
  ;

  _proto.getActiveAssets = function getActiveAssets() {
    var activeAssets = {};

    for (var _i3 = 0, _Object$entries2 = Object.entries(this.getActiveMarkets()); _i3 < _Object$entries2.length; _i3++) {
      var _Object$entries2$_i = _Object$entries2[_i3],
          symbol = _Object$entries2$_i[0],
          market = _Object$entries2$_i[1];
      activeAssets[symbol] = market.getAsset();
    }

    return activeAssets;
  }
  /**
   * Returns the active asset ids
   *
   * @returns list of active asset ids
   */
  ;

  _proto.getActiveAssetIds = function getActiveAssetIds() {
    var activeAssetIds = [];

    for (var _i4 = 0, _Object$values = Object.values(this.getActiveAssets()); _i4 < _Object$values.length; _i4++) {
      var asset = _Object$values[_i4];
      activeAssetIds.push(asset.getUnderlyingAssetId());
    }

    return activeAssetIds;
  }
  /**
   * Returns the active bank asset ids
   *
   * @returns list of active bank asset ids
   */
  ;

  _proto.getActiveBankAssetIds = function getActiveBankAssetIds() {
    var activeBankAssetIds = [];

    for (var _i5 = 0, _Object$values2 = Object.values(this.getActiveAssets()); _i5 < _Object$values2.length; _i5++) {
      var asset = _Object$values2[_i5];
      activeBankAssetIds.push(asset.getBankAssetId());
    }

    return activeBankAssetIds;
  }
  /**
   * Returns the list of symbols of the active assets
   *
   * @returns list of symbols for active assets
   */
  ;

  _proto.getActiveOrderedSymbols = function getActiveOrderedSymbols() {
    return this.activeOrderedSymbols;
  }
  /**
   * Returns a dictionary of raw oracle prices of the active assets pulled from their oracles
   *
   * @returns dictionary of int prices
   */
  ;

  _proto.getRawPrices = function getRawPrices() {
    var rawPrices = {};

    for (var _i6 = 0, _Object$entries3 = Object.entries(this.getActiveMarkets()); _i6 < _Object$entries3.length; _i6++) {
      var _Object$entries3$_i = _Object$entries3[_i6],
          symbol = _Object$entries3$_i[0],
          market = _Object$entries3$_i[1];
      rawPrices[symbol] = market.getAsset().getRawPrice();
    }

    return rawPrices;
  }
  /**
   * Returns a dictionary of dollarized float prices of the assets pulled from their oracles
   *
   * @returns dictionary of int prices
   */
  ;

  _proto.getPrices = function getPrices() {
    var prices = {};

    for (var _i7 = 0, _Object$entries4 = Object.entries(this.getActiveMarkets()); _i7 < _Object$entries4.length; _i7++) {
      var _Object$entries4$_i = _Object$entries4[_i7],
          symbol = _Object$entries4$_i[0],
          market = _Object$entries4$_i[1];
      prices[symbol] = market.getAsset().getPrice();
    }

    return prices;
  }
  /**
   * Returns a list of storage accounts for the given manager app id
   *
   * @param stakingContractName - name of staking contract
   * @returns list of storage accounts
   */
  ;

  _proto.getStorageAccounts =
  /*#__PURE__*/
  function () {
    var _getStorageAccounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(stakingContractName) {
      var nextPage, accounts, appId, accountData, _iterator8, _step8, account;

      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (stakingContractName === void 0) {
                stakingContractName = null;
              }

              nextPage = "";
              accounts = [];

              if (stakingContractName === null) {
                appId = Object.values(this.getActiveMarkets())[0].getMarketAppId();
              } else {
                appId = this.getStakingContract(stakingContractName).getManagerAppId();
              }

            case 4:
              if (!(nextPage !== null)) {
                _context11.next = 13;
                break;
              }

              console.log(nextPage);
              _context11.next = 8;
              return this.indexerClient.searchAccounts().applicationID(appId).nextToken(nextPage)["do"]();

            case 8:
              accountData = _context11.sent;

              for (_iterator8 = _createForOfIteratorHelperLoose(accountData.accounts); !(_step8 = _iterator8()).done;) {
                account = _step8.value;
                accounts.push(account);
              }

              if (accountData.includes("next-token")) {
                nextPage = accountData["next-token"];
              } else {
                nextPage = null;
              }

              _context11.next = 4;
              break;

            case 13:
              return _context11.abrupt("return", accounts);

            case 14:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function getStorageAccounts(_x19) {
      return _getStorageAccounts.apply(this, arguments);
    }

    return getStorageAccounts;
  }()
  /**
   * Returns the list of active oracle app ids
   *
   * @returns list of acdtive oracle app ids
   */
  ;

  _proto.getActiveOracleAppIds = function getActiveOracleAppIds() {
    var activeOracleAppIds = [];

    for (var _i8 = 0, _Object$values3 = Object.values(this.getActiveMarkets()); _i8 < _Object$values3.length; _i8++) {
      var market = _Object$values3[_i8];
      activeOracleAppIds.push(market.getAsset().getOracleAppId());
    }

    return activeOracleAppIds;
  }
  /**
   * Returns the list of the active market app ids
   *
   * @returns list of active market app ids
   */
  ;

  _proto.getActiveMarketAppIds = function getActiveMarketAppIds() {
    var activeMarketAppIds = [];

    for (var _i9 = 0, _Object$values4 = Object.values(this.getActiveMarkets()); _i9 < _Object$values4.length; _i9++) {
      var market = _Object$values4[_i9];
      activeMarketAppIds.push(market.getMarketAppId());
    }

    return activeMarketAppIds;
  }
  /**
   * Returns the list of the active market addresses
   *
   * @returns list of active market addresses
   */
  ;

  _proto.getActiveMarketAddresses = function getActiveMarketAddresses() {
    var activeMarketAddresses = [];

    for (var _i10 = 0, _Object$values5 = Object.values(this.getActiveMarkets()); _i10 < _Object$values5.length; _i10++) {
      var market = _Object$values5[_i10];
      activeMarketAddresses.push(market.getMarketAddress());
    }

    return activeMarketAddresses;
  }
  /**
   * Returns an opt in transaction group
   *
   * @param storageAddress - storage address to fund and rekey
   * @param address - address to send add collateral transaction group from; defulats to client user address
   * @returns
   */
  ;

  _proto.prepareOptinTransactions =
  /*#__PURE__*/
  function () {
    var _prepareOptinTransactions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(storageAddress, address) {
      var addr;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context12.t0 = prepareManagerAppOptinTransactions;
              _context12.t1 = this.manager.getManagerAppId();
              _context12.t2 = this.getMaxAtomicOptInMarketAppIds();
              _context12.t3 = addr;
              _context12.t4 = storageAddress;
              _context12.next = 10;
              return this.getDefaultParams();

            case 10:
              _context12.t5 = _context12.sent;
              return _context12.abrupt("return", (0, _context12.t0)(_context12.t1, _context12.t2, _context12.t3, _context12.t4, _context12.t5));

            case 12:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function prepareOptinTransactions(_x20, _x21) {
      return _prepareOptinTransactions.apply(this, arguments);
    }

    return prepareOptinTransactions;
  }()
  /**
   * Returns an add collateral transaction group
   *
   * @param symbol - symbol to add collateral with
   * @param amount - amount of collateral to add
   * @param address - address to send add collateral transaction group from; defaults to clint user address
   * @returns
   */
  ;

  _proto.prepareAddCollateralTransactions =
  /*#__PURE__*/
  function () {
    var _prepareAddCollateralTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee13(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context13.t0 = prepareAddCollateralTransactions;
              _context13.t1 = addr;
              _context13.next = 8;
              return this.getDefaultParams();

            case 8:
              _context13.t2 = _context13.sent;
              _context13.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context13.t3 = _context13.sent;
              _context13.t4 = amount;
              _context13.t5 = market.getAsset().getBankAssetId();
              _context13.t6 = this.manager.getManagerAppId();
              _context13.t7 = market.getMarketAppId();
              _context13.t8 = market.getMarketAddress();
              _context13.t9 = this.getActiveMarketAppIds();
              _context13.t10 = this.getActiveOracleAppIds();
              return _context13.abrupt("return", (0, _context13.t0)(_context13.t1, _context13.t2, _context13.t3, _context13.t4, _context13.t5, _context13.t6, _context13.t7, _context13.t8, _context13.t9, _context13.t10));

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, this);
    }));

    function prepareAddCollateralTransactions$1(_x22, _x23, _x24) {
      return _prepareAddCollateralTransactions2.apply(this, arguments);
    }

    return prepareAddCollateralTransactions$1;
  }()
  /**
   * Returns a borrow transaction group
   *
   * @param symbol - symbol to borrow
   * @param amount - amount to borrow
   * @param address - address to send borrow transaction group from; defaults to client user address
   * @returns borrow transaction group
   */
  ;

  _proto.prepareBorrowTransactions =
  /*#__PURE__*/
  function () {
    var _prepareBorrowTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee14(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context14.t0 = prepareBorrowTransactions;
              _context14.t1 = addr;
              _context14.next = 8;
              return this.getDefaultParams();

            case 8:
              _context14.t2 = _context14.sent;
              _context14.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context14.t3 = _context14.sent;
              _context14.t4 = amount;
              _context14.t5 = market.getAsset().getUnderlyingAssetId();
              _context14.t6 = this.manager.getManagerAppId();
              _context14.t7 = market.getMarketAppId();
              _context14.t8 = this.getActiveMarketAppIds();
              _context14.t9 = this.getActiveOracleAppIds();
              return _context14.abrupt("return", (0, _context14.t0)(_context14.t1, _context14.t2, _context14.t3, _context14.t4, _context14.t5, _context14.t6, _context14.t7, _context14.t8, _context14.t9));

            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this);
    }));

    function prepareBorrowTransactions$1(_x25, _x26, _x27) {
      return _prepareBorrowTransactions2.apply(this, arguments);
    }

    return prepareBorrowTransactions$1;
  }()
  /**
   * Returns a burn transaction group
   *
   * @param symbol - symbol to burn
   * @param amount - amount of bAsset to burn
   * @param address - address to send burn transaction group from; defaults to client user address
   * @returns burn transaction group
   */
  ;

  _proto.prepareBurnTransactions =
  /*#__PURE__*/
  function () {
    var _prepareBurnTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee15(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context15.t0 = prepareBurnTransactions;
              _context15.t1 = addr;
              _context15.next = 8;
              return this.getDefaultParams();

            case 8:
              _context15.t2 = _context15.sent;
              _context15.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context15.t3 = _context15.sent;
              _context15.t4 = amount;
              _context15.t5 = market.getAsset().getUnderlyingAssetId();
              _context15.t6 = market.getAsset().getBankAssetId();
              _context15.t7 = this.manager.getManagerAppId();
              _context15.t8 = market.getMarketAppId();
              _context15.t9 = market.getMarketAddress();
              _context15.t10 = this.getActiveMarketAppIds();
              _context15.t11 = this.getActiveOracleAppIds();
              return _context15.abrupt("return", (0, _context15.t0)(_context15.t1, _context15.t2, _context15.t3, _context15.t4, _context15.t5, _context15.t6, _context15.t7, _context15.t8, _context15.t9, _context15.t10, _context15.t11));

            case 21:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, this);
    }));

    function prepareBurnTransactions$1(_x28, _x29, _x30) {
      return _prepareBurnTransactions2.apply(this, arguments);
    }

    return prepareBurnTransactions$1;
  }()
  /**
   * Returns a claim rewards transaction group
   *
   * @param address - address to send claim rewards from; defaults to client user address
   * @returns claim rewards transaction group
   */
  ;

  _proto.prepareClaimRewardsTransactions =
  /*#__PURE__*/
  function () {
    var _prepareClaimRewardsTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee16(address) {
      var addr;
      return runtime_1.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              _context16.t0 = prepareClaimRewardsTransactions;
              _context16.t1 = addr;
              _context16.next = 7;
              return this.getDefaultParams();

            case 7:
              _context16.t2 = _context16.sent;
              _context16.next = 10;
              return this.manager.getStorageAddress(addr);

            case 10:
              _context16.t3 = _context16.sent;
              _context16.t4 = this.manager.getManagerAppId();
              _context16.t5 = this.getActiveMarketAppIds();
              _context16.t6 = this.getActiveOracleAppIds();
              _context16.t7 = this.manager.getRewardsProgram().getRewardsAssetIds();
              return _context16.abrupt("return", (0, _context16.t0)(_context16.t1, _context16.t2, _context16.t3, _context16.t4, _context16.t5, _context16.t6, _context16.t7));

            case 16:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, this);
    }));

    function prepareClaimRewardsTransactions$1(_x31) {
      return _prepareClaimRewardsTransactions2.apply(this, arguments);
    }

    return prepareClaimRewardsTransactions$1;
  }()
  /**
   * Returns a liquidate transaction group
   *
   * @param targetStorageAddress - storage address to liquidate
   * @param borrowSymbol - symbol to repay
   * @param amount - amount to repay
   * @param collateralSymbol - symbol to seize collateral from
   * @param address - address to send liquidate transaction group from; defaults to client user address
   * @returns liquidate transaction group
   */
  ;

  _proto.prepareLiquidateTransactions =
  /*#__PURE__*/
  function () {
    var _prepareLiquidateTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee17(targetStorageAddress, borrowSymbol, amount, collateralSymbol, address) {
      var addr, borrowMarket, collateralMarket;
      return runtime_1.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              borrowMarket = this.getMarket(borrowSymbol);
              collateralMarket = this.getMarket(collateralSymbol);
              _context17.t0 = prepareLiquidateTransactions;
              _context17.t1 = addr;
              _context17.next = 9;
              return this.getDefaultParams();

            case 9:
              _context17.t2 = _context17.sent;
              _context17.next = 12;
              return this.manager.getStorageAddress(addr);

            case 12:
              _context17.t3 = _context17.sent;
              _context17.t4 = targetStorageAddress;
              _context17.t5 = amount;
              _context17.t6 = this.manager.getManagerAppId();
              _context17.t7 = borrowMarket.getMarketAppId();
              _context17.t8 = borrowMarket.getMarketAddress();
              _context17.t9 = collateralMarket.getMarketAppId();
              _context17.t10 = this.getActiveMarketAppIds();
              _context17.t11 = this.getActiveOracleAppIds();
              _context17.t12 = collateralMarket.getAsset().getBankAssetId();
              _context17.t13 = borrowSymbol !== "ALGO" ? borrowMarket.getAsset().getUnderlyingAssetId() : undefined;
              return _context17.abrupt("return", (0, _context17.t0)(_context17.t1, _context17.t2, _context17.t3, _context17.t4, _context17.t5, _context17.t6, _context17.t7, _context17.t8, _context17.t9, _context17.t10, _context17.t11, _context17.t12, _context17.t13));

            case 24:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, this);
    }));

    function prepareLiquidateTransactions$1(_x32, _x33, _x34, _x35, _x36) {
      return _prepareLiquidateTransactions2.apply(this, arguments);
    }

    return prepareLiquidateTransactions$1;
  }()
  /**
   * Returns a mint transaction group
   *
   * @param symbol - symbol to mint
   * @param amount - amount of mint
   * @param address - address to send mint transacdtion group from; defaults to client user address
   * @returns mint transaction group
   */
  ;

  _proto.prepareMintTransactions =
  /*#__PURE__*/
  function () {
    var _prepareMintTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee18(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context18.t0 = prepareMintTransactions;
              _context18.t1 = addr;
              _context18.next = 8;
              return this.getDefaultParams();

            case 8:
              _context18.t2 = _context18.sent;
              _context18.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context18.t3 = _context18.sent;
              _context18.t4 = amount;
              _context18.t5 = market.getAsset().getBankAssetId();
              _context18.t6 = this.manager.getManagerAppId();
              _context18.t7 = market.getMarketAppId();
              _context18.t8 = market.getMarketAddress();
              _context18.t9 = this.getActiveMarketAppIds();
              _context18.t10 = this.getActiveOracleAppIds();
              _context18.t11 = symbol !== "ALGO" ? market.getAsset().getUnderlyingAssetId() : undefined;
              return _context18.abrupt("return", (0, _context18.t0)(_context18.t1, _context18.t2, _context18.t3, _context18.t4, _context18.t5, _context18.t6, _context18.t7, _context18.t8, _context18.t9, _context18.t10, _context18.t11));

            case 21:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, this);
    }));

    function prepareMintTransactions$1(_x37, _x38, _x39) {
      return _prepareMintTransactions2.apply(this, arguments);
    }

    return prepareMintTransactions$1;
  }()
  /**
   * Returns a mint to collateral transaction group
   *
   * @param symbol - symbol to mint
   * @param amount - amount to mint to collateral
   * @param address - address to send mint to collateral transaction group from; defaults to client user address
   * @returns mint to collateral transaction group
   */
  ;

  _proto.prepareMintToCollateralTransactions =
  /*#__PURE__*/
  function () {
    var _prepareMintToCollateralTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee19(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context19.t0 = prepareMintToCollateralTransactions;
              _context19.t1 = addr;
              _context19.next = 8;
              return this.getDefaultParams();

            case 8:
              _context19.t2 = _context19.sent;
              _context19.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context19.t3 = _context19.sent;
              _context19.t4 = amount;
              _context19.t5 = this.manager.getManagerAppId();
              _context19.t6 = market.getMarketAppId();
              _context19.t7 = market.getMarketAddress();
              _context19.t8 = this.getActiveMarketAppIds();
              _context19.t9 = this.getActiveOracleAppIds();
              _context19.t10 = symbol !== "ALGO" ? market.getAsset().getUnderlyingAssetId() : undefined;
              return _context19.abrupt("return", (0, _context19.t0)(_context19.t1, _context19.t2, _context19.t3, _context19.t4, _context19.t5, _context19.t6, _context19.t7, _context19.t8, _context19.t9, _context19.t10));

            case 20:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, this);
    }));

    function prepareMintToCollateralTransactions$1(_x40, _x41, _x42) {
      return _prepareMintToCollateralTransactions2.apply(this, arguments);
    }

    return prepareMintToCollateralTransactions$1;
  }()
  /**
   * Returns a remove collateral transaction group
   *
   * @param symbol - symbol to remove collateral from
   * @param amount - amount of collateral to remove
   * @param address - address to send remove collateral transaction group from; defaults to client user address
   * @returns remove collateral transaction group
   */
  ;

  _proto.prepareRemoveCollateralTransactions =
  /*#__PURE__*/
  function () {
    var _prepareRemoveCollateralTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee20(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context20.t0 = prepareRemoveCollateralTransactions;
              _context20.t1 = addr;
              _context20.next = 8;
              return this.getDefaultParams();

            case 8:
              _context20.t2 = _context20.sent;
              _context20.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context20.t3 = _context20.sent;
              _context20.t4 = amount;
              _context20.t5 = market.getAsset().getBankAssetId();
              _context20.t6 = this.manager.getManagerAppId();
              _context20.t7 = market.getMarketAppId();
              _context20.t8 = this.getActiveMarketAppIds();
              _context20.t9 = this.getActiveOracleAppIds();
              return _context20.abrupt("return", (0, _context20.t0)(_context20.t1, _context20.t2, _context20.t3, _context20.t4, _context20.t5, _context20.t6, _context20.t7, _context20.t8, _context20.t9));

            case 19:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, this);
    }));

    function prepareRemoveCollateralTransactions$1(_x43, _x44, _x45) {
      return _prepareRemoveCollateralTransactions2.apply(this, arguments);
    }

    return prepareRemoveCollateralTransactions$1;
  }()
  /**
   * Returns a remove collateral undrlying transaction group
   *
   * @param symbol - symbol to remove collateral from
   * @param amount - amount of collateral to remove
   * @param address - address to send remove collateral underlying transaction group from; defaults to client user address
   * @returns remove collateral underlying transaction group
   */
  ;

  _proto.prepareRemoveCollateralUnderlyingTransactions =
  /*#__PURE__*/
  function () {
    var _prepareRemoveCollateralUnderlyingTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee21(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context21.t0 = prepareRemoveCollateralUnderlyingTransactions;
              _context21.t1 = addr;
              _context21.next = 8;
              return this.getDefaultParams();

            case 8:
              _context21.t2 = _context21.sent;
              _context21.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context21.t3 = _context21.sent;
              _context21.t4 = amount;
              _context21.t5 = market.getAsset().getUnderlyingAssetId();
              _context21.t6 = this.manager.getManagerAppId();
              _context21.t7 = market.getMarketAppId();
              _context21.t8 = this.getActiveMarketAppIds();
              _context21.t9 = this.getActiveOracleAppIds();
              return _context21.abrupt("return", (0, _context21.t0)(_context21.t1, _context21.t2, _context21.t3, _context21.t4, _context21.t5, _context21.t6, _context21.t7, _context21.t8, _context21.t9));

            case 19:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, this);
    }));

    function prepareRemoveCollateralUnderlyingTransactions$1(_x46, _x47, _x48) {
      return _prepareRemoveCollateralUnderlyingTransactions2.apply(this, arguments);
    }

    return prepareRemoveCollateralUnderlyingTransactions$1;
  }()
  /**
   * Returns a repay borrow transaction group
   *
   * @param symbol - symbol to repay
   * @param amount - amount of repay
   * @param address - address to send repay borrow transaction group from; defaults to client user address
   * @returns
   */
  ;

  _proto.prepareRepayBorrowTransactions =
  /*#__PURE__*/
  function () {
    var _prepareRepayBorrowTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee22(symbol, amount, address) {
      var addr, market;
      return runtime_1.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              market = this.getMarket(symbol);
              _context22.t0 = prepareRepayBorrowTransactions;
              _context22.t1 = addr;
              _context22.next = 8;
              return this.getDefaultParams();

            case 8:
              _context22.t2 = _context22.sent;
              _context22.next = 11;
              return this.manager.getStorageAddress(addr);

            case 11:
              _context22.t3 = _context22.sent;
              _context22.t4 = amount;
              _context22.t5 = this.manager.getManagerAppId();
              _context22.t6 = market.getMarketAppId();
              _context22.t7 = market.getMarketAddress();
              _context22.t8 = this.getActiveMarketAppIds();
              _context22.t9 = this.getActiveOracleAppIds();
              _context22.t10 = symbol !== "ALGO" ? market.getAsset().getUnderlyingAssetId() : undefined;
              return _context22.abrupt("return", (0, _context22.t0)(_context22.t1, _context22.t2, _context22.t3, _context22.t4, _context22.t5, _context22.t6, _context22.t7, _context22.t8, _context22.t9, _context22.t10));

            case 20:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22, this);
    }));

    function prepareRepayBorrowTransactions$1(_x49, _x50, _x51) {
      return _prepareRepayBorrowTransactions2.apply(this, arguments);
    }

    return prepareRepayBorrowTransactions$1;
  }()
  /**
   * Returns a staking contract optin transaction group
   *
   * @param stakingContractName - name of staking contract to opt into
   * @param storageAddress - storage address to fund and rekey
   * @param address - address to create optin transaction group for; defaults to client user address
   * @returns staking contract opt in transaction group
   */
  ;

  _proto.prepareStakingContractOptinTransactions =
  /*#__PURE__*/
  function () {
    var _prepareStakingContractOptinTransactions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee23(stakingContractName, storageAddress, address) {
      var addr, stakingContract;
      return runtime_1.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              stakingContract = this.getStakingContract(stakingContractName);
              _context23.t0 = prepareManagerAppOptinTransactions;
              _context23.t1 = stakingContract.getManagerAppId();
              _context23.t2 = [stakingContract.getMarketAppId()];
              _context23.t3 = addr;
              _context23.t4 = storageAddress;
              _context23.next = 11;
              return this.getDefaultParams();

            case 11:
              _context23.t5 = _context23.sent;
              return _context23.abrupt("return", (0, _context23.t0)(_context23.t1, _context23.t2, _context23.t3, _context23.t4, _context23.t5));

            case 13:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23, this);
    }));

    function prepareStakingContractOptinTransactions(_x52, _x53, _x54) {
      return _prepareStakingContractOptinTransactions.apply(this, arguments);
    }

    return prepareStakingContractOptinTransactions;
  }()
  /**
   * Returns a staking contract stake transaction group
   *
   * @param stakingContractName - name of staking contract to stake on
   * @param amount - amount of stake
   * @param address - address to send stake transaction group from; defaults to client user address
   * @returns stake transacdtion group
   */
  ;

  _proto.prepareStakeTransactions =
  /*#__PURE__*/
  function () {
    var _prepareStakeTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee24(stakingContractName, amount, address) {
      var addr, stakingContract, assetId;
      return runtime_1.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              stakingContract = this.getStakingContract(stakingContractName);
              assetId = stakingContract.getAsset().getUnderlyingAssetId();
              _context24.t0 = prepareStakeTransactions;
              _context24.t1 = addr;
              _context24.next = 9;
              return this.getDefaultParams();

            case 9:
              _context24.t2 = _context24.sent;
              _context24.next = 12;
              return stakingContract.getStorageAddress(addr);

            case 12:
              _context24.t3 = _context24.sent;
              _context24.t4 = amount;
              _context24.t5 = stakingContract.getManagerAppId();
              _context24.t6 = stakingContract.getMarketAppId();
              _context24.t7 = stakingContract.getMarketAddress();
              _context24.t8 = stakingContract.getOracleAppId();
              _context24.t9 = assetId > 1 ? assetId : undefined;
              return _context24.abrupt("return", (0, _context24.t0)(_context24.t1, _context24.t2, _context24.t3, _context24.t4, _context24.t5, _context24.t6, _context24.t7, _context24.t8, _context24.t9));

            case 20:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24, this);
    }));

    function prepareStakeTransactions$1(_x55, _x56, _x57) {
      return _prepareStakeTransactions2.apply(this, arguments);
    }

    return prepareStakeTransactions$1;
  }()
  /**
   * Returns a staking contract unstake transactiong group
   *
   * @param stakingContractName - name of staking contract to unstake on
   * @param amount - amount of unstake
   * @param address - address to send unstake transaction group from; defaults to client user address
   * @returns unstake transaction group
   */
  ;

  _proto.prepareUnstakeTransactions =
  /*#__PURE__*/
  function () {
    var _prepareUnstakeTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee25(stakingContractName, amount, address) {
      var addr, stakingContract, assetId;
      return runtime_1.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              stakingContract = this.getStakingContract(stakingContractName);
              assetId = stakingContract.getAsset().getUnderlyingAssetId();
              _context25.t0 = prepareUnstakeTransactions;
              _context25.t1 = addr;
              _context25.next = 9;
              return this.getDefaultParams();

            case 9:
              _context25.t2 = _context25.sent;
              _context25.next = 12;
              return stakingContract.getStorageAddress(addr);

            case 12:
              _context25.t3 = _context25.sent;
              _context25.t4 = amount;
              _context25.t5 = stakingContract.getManagerAppId();
              _context25.t6 = stakingContract.getMarketAppId();
              _context25.t7 = stakingContract.getOracleAppId();
              _context25.t8 = assetId > 1 ? assetId : undefined;
              return _context25.abrupt("return", (0, _context25.t0)(_context25.t1, _context25.t2, _context25.t3, _context25.t4, _context25.t5, _context25.t6, _context25.t7, _context25.t8));

            case 19:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25, this);
    }));

    function prepareUnstakeTransactions$1(_x58, _x59, _x60) {
      return _prepareUnstakeTransactions2.apply(this, arguments);
    }

    return prepareUnstakeTransactions$1;
  }()
  /**
   * Returns a staking contract claim rewards transaction group
   *
   * @param stakingContractName - name of staking contract to unstake on
   * @param address - address to send claim rewards transaction group from; defaults to client user address
   * @returns unstake transaction group
   */
  ;

  _proto.prepareClaimStakingRewardsTransactions =
  /*#__PURE__*/
  function () {
    var _prepareClaimStakingRewardsTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee26(stakingContractName, address) {
      var addr, stakingContract;
      return runtime_1.wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              if (address === void 0) {
                address = null;
              }

              addr = address;

              if (!addr) {
                addr = this.userAddress;
              }

              stakingContract = this.getStakingContract(stakingContractName);
              _context26.t0 = prepareClaimStakingRewardsTransactions;
              _context26.t1 = addr;
              _context26.next = 8;
              return this.getDefaultParams();

            case 8:
              _context26.t2 = _context26.sent;
              _context26.next = 11;
              return stakingContract.getStorageAddress(addr);

            case 11:
              _context26.t3 = _context26.sent;
              _context26.t4 = stakingContract.getManagerAppId();
              _context26.t5 = stakingContract.getMarketAppId();
              _context26.t6 = stakingContract.getOracleAppId();
              _context26.t7 = stakingContract.getRewardsProgram().getRewardsAssetIds();
              return _context26.abrupt("return", (0, _context26.t0)(_context26.t1, _context26.t2, _context26.t3, _context26.t4, _context26.t5, _context26.t6, _context26.t7));

            case 17:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26, this);
    }));

    function prepareClaimStakingRewardsTransactions$1(_x61, _x62) {
      return _prepareClaimStakingRewardsTransactions2.apply(this, arguments);
    }

    return prepareClaimStakingRewardsTransactions$1;
  }()
  /**
   * Submits and waits for a transaction group to finish if specified
   *
   * @param transactionGroup - signed transaction group
   * @param wait - boolean to tell whether you want to wait or not
   * @returns a dictionary with the txid of the group transaction
   */
  ;

  _proto.submit =
  /*#__PURE__*/
  function () {
    var _submit = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee27(transactionGroup, wait) {
      var txid;
      return runtime_1.wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              if (wait === void 0) {
                wait = false;
              }

              _context27.prev = 1;
              _context27.next = 4;
              return this.algod.sendRawTransaction(transactionGroup)["do"]();

            case 4:
              txid = _context27.sent;
              _context27.next = 10;
              break;

            case 7:
              _context27.prev = 7;
              _context27.t0 = _context27["catch"](1);
              throw new Error(_context27.t0);

            case 10:
              if (!wait) {
                _context27.next = 12;
                break;
              }

              return _context27.abrupt("return", algosdk.waitForConfirmation(this.algod, txid, 10));

            case 12:
              return _context27.abrupt("return", {
                txid: txid
              });

            case 13:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27, this, [[1, 7]]);
    }));

    function submit(_x63, _x64) {
      return _submit.apply(this, arguments);
    }

    return submit;
  }();

  return Client;
}();
/**
 * Creates a new generic testnet client
 *
 * @param algodClient - Algod client for interacting with the network
 * @param indexerClient - Indexer client for interacting with the network
 * @param userAddress - address of the user
 * @returns a new and fuilly constructed algofi testnet client
 */

function newAlgofiTestnetClient(_x65, _x66, _x67) {
  return _newAlgofiTestnetClient.apply(this, arguments);
}
/**
 * Creates a new generic mainnet client
 *
 * @param algodClient - Algod client for interacting with the network
 * @param indexerClient - Indexer client for interacting with the network
 * @param userAddress - address of the user
 * @returns a new and fully constructed algofi mainnet client
 */

function _newAlgofiTestnetClient() {
  _newAlgofiTestnetClient = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee28(algodClient, indexerClient, userAddress) {
    var historicalIndexerClient, newAlgodClient, newIndexerClient, client;
    return runtime_1.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            if (algodClient === void 0) {
              algodClient = null;
            }

            if (indexerClient === void 0) {
              indexerClient = null;
            }

            if (userAddress === void 0) {
              userAddress = null;
            }

            historicalIndexerClient = new algosdk.Indexer("", "https://indexer.testnet.algoexplorerapi.io/", "");

            if (algodClient === null) {
              newAlgodClient = new algosdk.Algodv2("", "https://api.testnet.algoexplorer.io", "");
            }

            if (indexerClient === null) {
              newIndexerClient = new algosdk.Indexer("", "https://algoindexer.testnet.algoexplorerapi.io/", "");
            }

            _context28.next = 8;
            return Client.init(newAlgodClient, newIndexerClient, historicalIndexerClient, userAddress, "testnet");

          case 8:
            client = _context28.sent;
            return _context28.abrupt("return", client);

          case 10:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28);
  }));
  return _newAlgofiTestnetClient.apply(this, arguments);
}

function newAlgofiMainnetClient(_x68, _x69, _x70) {
  return _newAlgofiMainnetClient.apply(this, arguments);
}

function _newAlgofiMainnetClient() {
  _newAlgofiMainnetClient = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee29(algodClient, indexerClient, userAddress) {
    var historicalIndexerClient, newIndexerClient, client;
    return runtime_1.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            if (algodClient === void 0) {
              algodClient = null;
            }

            if (indexerClient === void 0) {
              indexerClient = null;
            }

            if (userAddress === void 0) {
              userAddress = null;
            }

            historicalIndexerClient = new algosdk.Indexer("", "https://indexer.algoexplorerapi.io/", "");

            if (algodClient === null) {
              algodClient = new algosdk.Algodv2("", "https://algoexplorerapi.io", "");
            }

            if (indexerClient === null) {
              newIndexerClient = new algosdk.Indexer("", "https://algoindexer.algoexplorerapi.io", "");
            }

            _context29.next = 8;
            return Client.init(algodClient, newIndexerClient, historicalIndexerClient, userAddress, "mainnet");

          case 8:
            client = _context29.sent;
            return _context29.abrupt("return", client);

          case 10:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29);
  }));
  return _newAlgofiMainnetClient.apply(this, arguments);
}

exports.Asset = Asset;
exports.Client = Client;
exports.Manager = Manager;
exports.Market = Market;
exports.PARAMETER_SCALE_FACTOR = PARAMETER_SCALE_FACTOR;
exports.REWARDS_SCALE_FACTOR = REWARDS_SCALE_FACTOR;
exports.RewardsProgram = RewardsProgram;
exports.SCALE_FACTOR = SCALE_FACTOR;
exports.SECONDS_PER_YEAR = SECONDS_PER_YEAR;
exports.StakingContract = StakingContract;
exports.TransactionGroup = TransactionGroup;
exports.assetDictionary = assetDictionary;
exports.assetIdToAssetName = assetIdToAssetName;
exports.extraAssets = extraAssets;
exports.foreignAppIds = foreignAppIds;
exports.formatState = formatState;
exports.get = get;
exports.getGlobalState = getGlobalState;
exports.getInitRound = getInitRound;
exports.getInitTxns = getInitTxns;
exports.getManagerAppId = getManagerAppId;
exports.getMarketAppId = getMarketAppId;
exports.getNewAccount = getNewAccount;
exports.getOrderedSymbols = getOrderedSymbols;
exports.getRandomInt = getRandomInt;
exports.getStakingContracts = getStakingContracts;
exports.intToBytes = intToBytes;
exports.managerAddress = managerAddress;
exports.managerStrings = managerStrings;
exports.marketCounterToAssetName = marketCounterToAssetName;
exports.marketStrings = marketStrings;
exports.newAlgofiMainnetClient = newAlgofiMainnetClient;
exports.newAlgofiTestnetClient = newAlgofiTestnetClient;
exports.orderedAssets = orderedAssets;
exports.orderedAssetsAndPlaceholders = orderedAssetsAndPlaceholders;
exports.orderedMarketAppIds = orderedMarketAppIds;
exports.orderedOracleAppIds = orderedOracleAppIds;
exports.orderedSupportedMarketAppIds = orderedSupportedMarketAppIds;
exports.prepareAddCollateralTransactions = prepareAddCollateralTransactions;
exports.prepareAssetOptinTransactions = prepareAssetOptinTransactions;
exports.prepareBorrowTransactions = prepareBorrowTransactions;
exports.prepareBurnTransactions = prepareBurnTransactions;
exports.prepareClaimRewardsTransactions = prepareClaimRewardsTransactions;
exports.prepareClaimStakingRewardsTransactions = prepareClaimStakingRewardsTransactions;
exports.prepareLiquidateTransactions = prepareLiquidateTransactions;
exports.prepareManagerAppOptinTransactions = prepareManagerAppOptinTransactions;
exports.prepareMarketAppOptinTransactions = prepareMarketAppOptinTransactions;
exports.prepareMintToCollateralTransactions = prepareMintToCollateralTransactions;
exports.prepareMintTransactions = prepareMintTransactions;
exports.preparePaymentTransaction = preparePaymentTransaction;
exports.prepareRemoveCollateralTransactions = prepareRemoveCollateralTransactions;
exports.prepareRemoveCollateralUnderlyingTransactions = prepareRemoveCollateralUnderlyingTransactions;
exports.prepareRepayBorrowTransactions = prepareRepayBorrowTransactions;
exports.prepareStakeTransactions = prepareStakeTransactions;
exports.prepareStakingContractOptinTransactions = prepareStakingContractOptinTransactions;
exports.prepareUnstakeTransactions = prepareUnstakeTransactions;
exports.protocolManagerAppId = protocolManagerAppId;
exports.readGlobalState = readGlobalState;
exports.readLocalState = readLocalState;
exports.searchGlobalState = searchGlobalState;
exports.waitForConfirmation = waitForConfirmation;
//# sourceMappingURL=lend.cjs.development.js.map
