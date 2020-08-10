(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "+gcA":
/***/ (function(module, exports) {

module.exports = function _functionName(f) {
  // String(x => x) evaluates to "x => x", so the pattern may not match.
  var match = String(f).match(/^function (\w*)/);
  return match == null ? '' : match[1];
};

/***/ }),

/***/ "/Ubj":
/***/ (function(module, exports, __webpack_require__) {

var _isArray = __webpack_require__("hOtR");
/**
 * This checks whether a function has a [methodname] function. If it isn't an
 * array it will execute that function otherwise it will default to the ramda
 * implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */


module.exports = function _checkForMethod(methodname, fn) {
  return function () {
    var length = arguments.length;

    if (length === 0) {
      return fn();
    }

    var obj = arguments[length - 1];
    return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, Array.prototype.slice.call(arguments, 0, length - 1));
  };
};

/***/ }),

/***/ "/W8u":
/***/ (function(module, exports) {

module.exports = function _isTransformer(obj) {
  return typeof obj['@@transducer/step'] === 'function';
};

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "0BRo":
/***/ (function(module, exports, __webpack_require__) {

var equals = __webpack_require__("1s4d");

module.exports = function _indexOf(list, a, idx) {
  var inf, item; // Array.prototype.indexOf doesn't exist below IE9

  if (typeof list.indexOf === 'function') {
    switch (typeof a) {
      case 'number':
        if (a === 0) {
          // manually crawl the list to distinguish between +0 and -0
          inf = 1 / a;

          while (idx < list.length) {
            item = list[idx];

            if (item === 0 && 1 / item === inf) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } else if (a !== a) {
          // NaN
          while (idx < list.length) {
            item = list[idx];

            if (typeof item === 'number' && item !== item) {
              return idx;
            }

            idx += 1;
          }

          return -1;
        } // non-zero numbers can utilise Set


        return list.indexOf(a, idx);
      // all these types can utilise Set

      case 'string':
      case 'boolean':
      case 'function':
      case 'undefined':
        return list.indexOf(a, idx);

      case 'object':
        if (a === null) {
          // null can utilise Set
          return list.indexOf(a, idx);
        }

    }
  } // anything else not covered above, defer to R.equals


  while (idx < list.length) {
    if (equals(list[idx], a)) {
      return idx;
    }

    idx += 1;
  }

  return -1;
};

/***/ }),

/***/ "0fhL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
}; //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------
// --[ Dependencies ]---------------------------------------------------


var _require = __webpack_require__("6B8Y"),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol; // --[ Helpers ]--------------------------------------------------------

/*~
 * type: (Object Any) => String
 */


var objectToKeyValuePairs = function objectToKeyValuePairs(object) {
  return Object.keys(object).map(function (key) {
    return key + ': ' + showValue(object[key]);
  }).join(', ');
};
/*~
 * type: (Object Any).() => String
 */


var plainObjectToString = function plainObjectToString() {
  return '{ ' + objectToKeyValuePairs(this) + ' }';
};
/*~
 * type: (Array Any).() => String
 */


var arrayToString = function arrayToString() {
  return '[' + this.map(showValue).join(', ') + ']';
};
/*~
 * type: (Function) => String
 */


var functionNameToString = function functionNameToString(fn) {
  return fn.name !== '' ? ': ' + fn.name : '';
};
/*~
 * type: (Function) => String
 */


var functionToString = function functionToString(fn) {
  return '[Function' + functionNameToString(fn) + ']';
};
/*~
 * type: () => String
 */


var nullToString = function nullToString() {
  return 'null';
};
/*~
 * type: (Any) => Bool
 */


var isPlainObject = function isPlainObject(object) {
  return !object.toString || object.toString === Object.prototype.toString;
};
/*~
 * type: (Null | Object Any) => String
 */


var objectToString = function objectToString(object) {
  return object === null ? nullToString : Array.isArray(object) ? arrayToString : isPlainObject(object) ? plainObjectToString :
  /* otherwise */
  object.toString;
};
/*~
 * type: (Any) => String
 */


var showValue = function showValue(value) {
  return typeof value === 'undefined' ? 'undefined' : typeof value === 'function' ? functionToString(value) : Object.is(value, -0) ? '-0' : typeof value === 'number' ? value : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol' ? value.toString() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? objectToString(value).call(value) :
  /* otherwise */
  JSON.stringify(value);
}; // --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, Union) => Void
 */


var debugRepresentation = function debugRepresentation(variant, adt) {
  // eslint-disable-line max-statements
  var typeName = adt[typeSymbol];
  var variantName = adt[typeSymbol] + '.' + variant.prototype[tagSymbol]; // (for Object.prototype.toString)

  adt[Symbol.toStringTag] = typeName;
  variant.prototype[Symbol.toStringTag] = variantName; // (regular JavaScript representations)

  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */

  adt.toString = function () {
    return typeName;
  };
  /*~
   * stability: experimental
   * mmodule: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   () => String
   */


  variant.toString = function () {
    return variantName;
  };
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   (Union).() => String
   */


  variant.prototype.toString = function () {
    return variantName + '(' + plainObjectToString.call(this) + ')';
  }; // (Node REPL representations)


  adt.inspect = adt.toString;
  variant.inspect = variant.toString;
  variant.prototype.inspect = variant.prototype.toString;
  return variant;
}; // --[ Exports ]-------------------------------------------------------


module.exports = debugRepresentation;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "1DYX":
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__("ALMR");

var _pipe = __webpack_require__("5ktw");

var reduce = __webpack_require__("SK8o");

var tail = __webpack_require__("rhzI");
/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity; the remaining functions must be unary.
 *
 * In some libraries this function is named `sequence`.
 *
 * **Note:** The result of pipe is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
 * @param {...Function} functions
 * @return {Function}
 * @see R.compose
 * @example
 *
 *      var f = R.pipe(Math.pow, R.negate, R.inc);
 *
 *      f(3, 4); // -(3^4) + 1
 * @symb R.pipe(f, g, h)(a, b) = h(g(f(a, b)))
 */


module.exports = function pipe() {
  if (arguments.length === 0) {
    throw new Error('pipe requires at least one argument');
  }

  return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
};

/***/ }),

/***/ "1s4d":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _equals = __webpack_require__("zgIM");
/**
 * Returns `true` if its arguments are equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */


module.exports = _curry2(function equals(a, b) {
  return _equals(a, b, [], []);
});

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2UD4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */


var IntlMessageFormat = __webpack_require__("lVBX")['default']; // Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.


__webpack_require__(1); // Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.


exports = module.exports = IntlMessageFormat;
exports['default'] = exports;

/***/ }),

/***/ "2w5D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var deprecated = __webpack_require__("GfB1");

module.exports = function (methodName) {
  return function (result) {
    deprecated('Type.' + methodName + '() is being deprecated in favour of Type[\'fantasy-land/' + methodName + '\'](). \n    Your data structure is using the old-style fantasy-land methods,\n    and these won\'t be supported in Folktale 3');
    return result;
  };
};

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "3DaA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("5tHe"),
    Error = _require.Error,
    Ok = _require.Ok;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b: (() => b :: throws a) => Result a b
 */


var _try = function _try(f) {
  try {
    return Ok(f());
  } catch (e) {
    return Error(e);
  }
};

module.exports = _try;

/***/ }),

/***/ "4Q1U":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");
/**
 * Checks if the input value is `null` or `undefined`.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Type
 * @sig * -> Boolean
 * @param {*} x The value to test.
 * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
 * @example
 *
 *      R.isNil(null); //=> true
 *      R.isNil(undefined); //=> true
 *      R.isNil(0); //=> false
 *      R.isNil([]); //=> false
 */


module.exports = _curry1(function isNil(x) {
  return x == null;
});

/***/ }),

/***/ "57TA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }

    return targetComponent;
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;

/***/ }),

/***/ "5NW9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("E1XU"),
    Success = _require.Success,
    Failure = _require.Failure;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Result a b) => Validation a b
 */


var resultToValidation = function resultToValidation(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var value = _ref.value;
      return Failure(value);
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Success(value);
    }
  });
};

module.exports = resultToValidation;

/***/ }),

/***/ "5ktw":
/***/ (function(module, exports) {

module.exports = function _pipe(f, g) {
  return function () {
    return g.call(this, f.apply(this, arguments));
  };
};

/***/ }),

/***/ "5tHe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = __webpack_require__("gnJF");

var assertFunction = __webpack_require__("rnYU");

var _require = __webpack_require__("UYkW"),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = __webpack_require__("6RdS");

var adtMethods = __webpack_require__("d1Y1");

var extend = __webpack_require__("F7L5");

var warnDeprecation = __webpack_require__("GfB1");

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;
/*~ stability: stable */

var Result = union('folktale:Result', {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (a) => Result a b
   */
  Error: function Error(value) {
    return {
      value: value
    };
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (b) => Result a b
   */
  Ok: function Ok(value) {
    return {
      value: value
    };
  }
}).derive(equality, debugRepresentation, serialization);
var Error = Result.Error,
    Ok = Result.Ok;
var assertResult = assertType(Result);
extend(Error.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Error');
  }

});
extend(Ok.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Result a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Result.Ok');
  }

});
/*~
 * ~belongsTo: Result
 */

adtMethods(Result, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => c) => Result a c
   */
  map: {
    /*~*/
    Error: function map(f) {
      assertFunction('Result.Error#map', f);
      return this;
    },

    /*~*/
    Ok: function map(f) {
      assertFunction('Result.Ok#map', f);
      return Ok(f(this.value));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a ((b) => c)).(Result a b) => Result a c
   */
  apply: {
    /*~*/
    Error: function apply(anResult) {
      assertResult('Result.Error#apply', anResult);
      return this;
    },

    /*~*/
    Ok: function apply(anResult) {
      assertResult('Result.Ok#apply', anResult);
      return anResult.map(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a b).((b) => Result a c) => Result a c
   */
  chain: {
    /*~*/
    Error: function chain(f) {
      assertFunction('Result.Error#chain', f);
      return this;
    },

    /*~*/
    Ok: function chain(f) {
      assertFunction('Result.Ok#chain', f);
      return f(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Error: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of an Error.\n\nError does not contain a normal value - it contains an error.\nYou might consider switching from Result#unsafeGet to Result#getOrElse,\nor some other method that is not partial.\n      ');
    },

    /*~*/
    Ok: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Error: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Ok: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => Result c b) => Result c b
   */
  orElse: {
    /*~*/
    Error: function orElse(handler) {
      assertFunction('Result.Error#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Ok: function orElse(handler) {
      assertFunction('Result.Ok#orElse', handler);
      return this;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).(Result a b) => Result a b
   *   where b is Semigroup
   */
  concat: {
    /*~*/
    Error: function concat(aResult) {
      assertResult('Result.Error#concat', aResult);
      return this;
    },

    /*~*/
    Ok: function concat(aResult) {
      var _this = this;

      assertResult('Result.Ok#concat', aResult);
      return aResult.map(function (xs) {
        return _this.value.concat(xs);
      });
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Error: function fold(f, g) {
      assertFunction('Result.Error#fold', f);
      assertFunction('Result.Error#fold', g);
      return f(this.value);
    },

    /*~*/
    Ok: function fold(f, g) {
      assertFunction('Result.Ok#fold', f);
      assertFunction('Result.Ok#fold', g);
      return g(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).() => Result b a
   */
  swap: {
    /*~*/
    Error: function swap() {
      return Ok(this.value);
    },

    /*~*/
    Ok: function swap() {
      return Error(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   (Result a b).((a) => c, (b) => d) => Result c d
   */
  bimap: {
    /*~*/
    Error: function bimap(f, g) {
      assertFunction('Result.Error#bimap', f);
      assertFunction('Result.Error#bimap', g);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function bimap(f, g) {
      assertFunction('Result.Ok#bimap', f);
      assertFunction('Result.Ok#bimap', g);
      return Ok(g(this.value));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b, c:
   *     (Result a b).((a) => c) => Result c b
   */
  mapError: {
    /*~*/
    Error: function mapError(f) {
      assertFunction('Result.Error#mapError', f);
      return Error(f(this.value));
    },

    /*~*/
    Ok: function mapError(f) {
      assertFunction('Result.Ok#mapError', f);
      return this;
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Error: function filter(predicate) {
      assertFunction('Result.Error#filter', predicate);
      return this;
    },

    /*~*/
    Ok: function filter(predicate) {
      assertFunction('Result.Ok#filter', predicate);
      return predicate(this.value) ? this : Error(this.value);
    }
  }
});
Object.assign(Result, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (b) => Result a b
   */
  of: function of(value) {
    return Ok(value);
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a, b: (Result a b).() => b :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).() => Validation a b
   */
  toValidation: function toValidation() {
    return __webpack_require__("5NW9")(this);
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Result a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return __webpack_require__("OzU1")(this);
  }
});
provideAliases(Error.prototype);
provideAliases(Ok.prototype);
provideAliases(Result);
module.exports = Result;

/***/ }),

/***/ "6B8Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineEnumerableProperties(obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------
// --[ Dependencies ]---------------------------------------------------


var warnDeprecation = __webpack_require__("GfB1");

var extend = __webpack_require__("F7L5");

var assertObject = __webpack_require__("TVCR"); // --[ Constants and Aliases ]------------------------------------------


var TYPE = Symbol.for('@@folktale:adt:type');
var TAG = Symbol.for('@@folktale:adt:tag');
var ANY = Symbol.for('@@folktale:adt:default');
var META = Symbol.for('@@meta:magical');
var keys = Object.keys; // --[ Helpers ]--------------------------------------------------------
//
// Returns an array of own enumerable values in an object.
//

function values(object) {
  return keys(object).map(function (key) {
    return object[key];
  });
} //
// Transforms own enumerable key/value pairs.
//


function mapObject(object, transform) {
  return keys(object).reduce(function (result, key) {
    result[key] = transform(key, object[key]);
    return result;
  }, {});
} //
// Gets a custom error message for the matchWith function.
// 


function getMatchWithErrorMessage(method, property) {
  return 'Variant "' + property + '" not covered in pattern.\nThis could mean you did not include all variants in your Union\'s matchWith function.\n\nFor example, if you had this Union:\n\nconst Operation = union({\n    Add: (a, b) => ({ a, b }),\n    Subtract: (a, b) => ({ a, b }),\n})\n\nBut wrote this matchWith:\n\nop.matchWith({\n    Add: ({ a, b }) => a + b\n    // Subtract not implemented!\n})\n\nIt would throw this error because we need to check against \'Subtract\'. Check your matchWith function\'s argument, \nit\'s possibly missing the \'' + property + '\' method in the object you\'ve passed.';
} // --[ Variant implementation ]-----------------------------------------
//
// Defines the variants given a set of patterns and an ADT namespace.
//


function defineVariants(typeId, patterns, adt) {
  return mapObject(patterns, function (name, constructor) {
    var _constructor, _ref, _extend, _mutatorMap, _tag, _type, _constructor2, _extend2, _mutatorMap2; // ---[ Variant Internals ]-----------------------------------------


    function InternalConstructor() {}

    InternalConstructor.prototype = Object.create(adt);
    extend(InternalConstructor.prototype, (_extend = {}, _defineProperty(_extend, TAG, name), _constructor = 'constructor', _mutatorMap = {}, _mutatorMap[_constructor] = _mutatorMap[_constructor] || {}, _mutatorMap[_constructor].get = function () {
      return InternalConstructor;
    }, _ref = 'is' + name, _mutatorMap[_ref] = _mutatorMap[_ref] || {}, _mutatorMap[_ref].get = function () {
      warnDeprecation('.is' + name + ' is deprecated. Use ' + name + '.hasInstance(value)\ninstead to check if a value belongs to the ADT variant.');
      return true;
    }, _defineProperty(_extend, 'matchWith', function matchWith(pattern) {
      assertObject(typeId + '\'s ' + name + '#matchWith', pattern);

      if (name in pattern) {
        return pattern[name](this);
      } else if (ANY in pattern) {
        return pattern[ANY]();
      } else {
        throw new Error(getMatchWithErrorMessage(pattern, name));
      }
    }), _defineEnumerableProperties(_extend, _mutatorMap), _extend));

    function makeInstance() {
      var result = new InternalConstructor(); // eslint-disable-line prefer-const

      extend(result, constructor.apply(undefined, arguments) || {});
      return result;
    }

    extend(makeInstance, (_extend2 = {}, _defineProperty(_extend2, META, constructor[META]), _tag = 'tag', _mutatorMap2 = {}, _mutatorMap2[_tag] = _mutatorMap2[_tag] || {}, _mutatorMap2[_tag].get = function () {
      return name;
    }, _type = 'type', _mutatorMap2[_type] = _mutatorMap2[_type] || {}, _mutatorMap2[_type].get = function () {
      return typeId;
    }, _constructor2 = 'constructor', _mutatorMap2[_constructor2] = _mutatorMap2[_constructor2] || {}, _mutatorMap2[_constructor2].get = function () {
      return InternalConstructor;
    }, _defineProperty(_extend2, 'prototype', InternalConstructor.prototype), _defineProperty(_extend2, 'hasInstance', function hasInstance(value) {
      return Boolean(value) && adt.hasInstance(value) && value[TAG] === name;
    }), _defineEnumerableProperties(_extend2, _mutatorMap2), _extend2));
    return makeInstance;
  });
} // --[ ADT Implementation ]--------------------------------------------

/*~
 * authors:
 *   - Quildreen Motta
 * 
 * stability: experimental
 * type: |
 *   (String, Object (Array String)) => Union
 */


var union = function union(typeId, patterns) {
  var _extend3;

  var UnionNamespace = Object.create(Union);
  var variants = defineVariants(typeId, patterns, UnionNamespace);
  extend(UnionNamespace, variants, (_extend3 = {}, _defineProperty(_extend3, TYPE, typeId), _defineProperty(_extend3, 'variants', values(variants)), _defineProperty(_extend3, 'hasInstance', function hasInstance(value) {
    return Boolean(value) && value[TYPE] === this[TYPE];
  }), _extend3));
  return UnionNamespace;
};
/*~ ~belongsTo : union */


var Union = {
  /*~
   * type: |
   *   Union . (...(Variant, Union) => Any) => Union
   */
  derive: function derive() {
    var _this = this;

    for (var _len = arguments.length, derivations = Array(_len), _key = 0; _key < _len; _key++) {
      derivations[_key] = arguments[_key];
    }

    derivations.forEach(function (derivation) {
      _this.variants.forEach(function (variant) {
        return derivation(variant, _this);
      });
    });
    return this;
  }
}; // --[ Exports ]--------------------------------------------------------

union.Union = Union;
union.typeSymbol = TYPE;
union.tagSymbol = TAG;
union.any = ANY;
module.exports = union;

/***/ }),

/***/ "6RdS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var aliases = {
  equals: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => Boolean
     *   where 'S is Setoid
     */
    'fantasy-land/equals': function fantasyLandEquals(that) {
      return this.equals(that);
    }
  },
  concat: {
    /*~
     * module: null
     * type: |
     *   ('S 'a).('S 'a) => 'S 'a
     *   where 'S is Semigroup
     */
    'fantasy-land/concat': function fantasyLandConcat(that) {
      return this.concat(that);
    }
  },
  empty: {
    /*~
     * module: null
     * type: |
     *   ('M).() => 'M a
     *   where 'M is Monoid
     */
    'fantasy-land/empty': function fantasyLandEmpty() {
      return this.empty();
    }
  },
  map: {
    /*~
     * module: null
     * type: |
     *   ('F 'a).(('a) => 'b) => 'F 'b
     *   where 'F is Functor
     */
    'fantasy-land/map': function fantasyLandMap(transformation) {
      return this.map(transformation);
    }
  },
  apply: {
    /*~
     * module: null
     * type: |
     *   ('F ('a) => b).('F 'a) => 'F 'b
     *   where 'F is Apply
     */
    ap: function ap(that) {
      return this.apply(that);
    },

    /*~
     * module: null
     * type: |
     *   ('F 'a).('F ('a) => 'b) => 'F 'b
     *   where 'F is Apply
     */
    'fantasy-land/ap': function fantasyLandAp(that) {
      return that.apply(this);
    }
  },
  of: {
    /*~
     * module: null
     * type: |
     *   forall F, a:
     *     (F).(a) => F a
     *   where F is Applicative
     */
    'fantasy-land/of': function fantasyLandOf(value) {
      return this.of(value);
    }
  },
  or: {
    /*~
     * module: null
     * type: |
     *   forall F, a:
     *     (F a).(F a) => F a
     *   where F is Functor, Alt
     */
    'fantasy-land/alt': function fantasyLandAlt(value) {
      return this.or(value);
    },

    /*~
     * module: null
     * type: |
     *   forall F, a:
     *     (F a).(F a) => F a
     *   where F is Functor, Alt
     */
    alt: function alt(value) {
      return this.or(value);
    }
  },
  reduce: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b:
     *     (F a).((b, a) => b, b) => b
     *   where F is Foldable
     */
    'fantasy-land/reduce': function fantasyLandReduce(combinator, initial) {
      return this.reduce(combinator, initial);
    }
  },
  traverse: {
    /*~
     * module: null
     * type: |
     *   forall F, T, a, b:
     *     (T a).((a) => F b, (c) => F c) => F (T b)
     *   where F is Apply, T is Traversable
     */
    'fantasy-land/traverse': function fantasyLandTraverse(transformation, lift) {
      return this.traverse(transformation, lift);
    }
  },
  chain: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b:
     *     (M a).((a) => M b) => M b
     *   where M is Chain
     */
    'fantasy-land/chain': function fantasyLandChain(transformation) {
      return this.chain(transformation);
    }
  },
  chainRecursively: {
    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec
     */
    chainRec: function chainRec(step, initial) {
      return this.chainRecursively(step, initial);
    },

    /*~
     * module: null
     * type: |
     *   forall M, a, b, c:
     *     (M).(
     *       Step:    ((a) => c, (b) => c, a) => M c,
     *       Initial: a
     *     ) => M b
     *   where M is ChainRec
     */
    'fantasy-land/chainRec': function fantasyLandChainRec(step, initial) {
      return this.chainRecursively(step, initial);
    }
  },
  extend: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).((W a) => b) => W b
     *   where W is Extend
     */
    'fantasy-land/extend': function fantasyLandExtend(transformation) {
      return this.extend(transformation);
    }
  },
  extract: {
    /*~
     * module: null
     * type: |
     *   forall W, a, b:
     *     (W a).() => a
     *   where W is Comonad
     */
    'fantasy-land/extract': function fantasyLandExtract() {
      return this.extract();
    }
  },
  bimap: {
    /*~
     * module: null
     * type: |
     *   forall F, a, b, c, d:
     *     (F a b).((a) => c, (b) => d) => F c d
     *   where F is Bifunctor
     */
    'fantasy-land/bimap': function fantasyLandBimap(f, g) {
      return this.bimap(f, g);
    }
  },
  promap: {
    /*~
     * module: null
     * type: |
     *   forall P, a, b, c, d:
     *     (P a b).((c) => a, (b) => d) => P c d
     */
    'fantasy-land/promap': function fantasyLandPromap(f, g) {
      return this.promap(f, g);
    }
  }
};

var provideAliases = function provideAliases(structure) {
  Object.keys(aliases).forEach(function (method) {
    if (typeof structure[method] === 'function') {
      Object.keys(aliases[method]).forEach(function (alias) {
        structure[alias] = aliases[method][alias];
      });
    }
  });
};

module.exports = provideAliases;

/***/ }),

/***/ "6nwk":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var equals = __webpack_require__("1s4d");

var take = __webpack_require__("PhQ1");
/**
 * Checks if a list starts with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} prefix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.startsWith('a', 'abc')                //=> true
 *      R.startsWith('b', 'abc')                //=> false
 *      R.startsWith(['a'], ['a', 'b', 'c'])    //=> true
 *      R.startsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


module.exports = _curry2(function (prefix, list) {
  return equals(take(prefix.length, list), prefix);
});

/***/ }),

/***/ "7BTi":
/***/ (function(module, exports) {

module.exports = function _isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

/***/ }),

/***/ "7Inb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */


var IntlRelativeFormat = __webpack_require__("W6Rk")['default']; // Add all locale data to `IntlRelativeFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.


__webpack_require__(2); // Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.


exports = module.exports = IntlRelativeFormat;
exports['default'] = exports;

/***/ }),

/***/ "7ZZO":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _xfBase = __webpack_require__("rJtk");

module.exports = function () {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }

  XFilter.prototype['@@transducer/init'] = _xfBase.init;
  XFilter.prototype['@@transducer/result'] = _xfBase.result;

  XFilter.prototype['@@transducer/step'] = function (result, input) {
    return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
  };

  return _curry2(function _xfilter(f, xf) {
    return new XFilter(f, xf);
  });
}();

/***/ }),

/***/ "7e6P":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _has = __webpack_require__("Av+g");

var _isArguments = __webpack_require__("l7rt");
/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @see R.keysIn, R.values
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */


module.exports = function () {
  // cover IE < 9 keys issues
  var hasEnumBug = !{
    toString: null
  }.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString']; // Safari bug

  var hasArgsEnumBug = function () {
    'use strict';

    return arguments.propertyIsEnumerable('length');
  }();

  var contains = function contains(list, item) {
    var idx = 0;

    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }

      idx += 1;
    }

    return false;
  };

  return typeof Object.keys === 'function' && !hasArgsEnumBug ? _curry1(function keys(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) : _curry1(function keys(obj) {
    if (Object(obj) !== obj) {
      return [];
    }

    var prop, nIdx;
    var ks = [];

    var checkArgsLength = hasArgsEnumBug && _isArguments(obj);

    for (prop in obj) {
      if (_has(prop, obj) && (!checkArgsLength || prop !== 'length')) {
        ks[ks.length] = prop;
      }
    }

    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;

      while (nIdx >= 0) {
        prop = nonEnumerableProps[nIdx];

        if (_has(prop, obj) && !contains(ks, prop)) {
          ks[ks.length] = prop;
        }

        nIdx -= 1;
      }
    }

    return ks;
  });
}();

/***/ }),

/***/ "8+s/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var React = __webpack_require__("q1tI");

var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }

  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }

  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = /*#__PURE__*/function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      } // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.peek = function peek() {
        return state;
      };

      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      var _proto = SideEffect.prototype;

      _proto.UNSAFE_componentWillMount = function UNSAFE_componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    }(React.PureComponent);

    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");

    _defineProperty(SideEffect, "canUseDOM", canUseDOM);

    return SideEffect;
  };
}

module.exports = withSideEffect;

/***/ }),

/***/ "8/j2":
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__("ALMR");

var _curry2 = __webpack_require__("Wnyi");
/**
 * Creates a function that is bound to a context.
 * Note: `R.bind` does not provide the additional argument-binding capabilities of
 * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Function
 * @category Object
 * @sig (* -> *) -> {*} -> (* -> *)
 * @param {Function} fn The function to bind to context
 * @param {Object} thisObj The context to bind `fn` to
 * @return {Function} A function that will execute in the context of `thisObj`.
 * @see R.partial
 * @example
 *
 *      var log = R.bind(console.log, console);
 *      R.pipe(R.assoc('a', 2), R.tap(log), R.assoc('a', 3))({a: 1}); //=> {a: 3}
 *      // logs {a: 2}
 * @symb R.bind(f, o)(a, b) = f.call(o, a, b)
 */


module.exports = _curry2(function bind(fn, thisObj) {
  return _arity(fn.length, function () {
    return fn.apply(thisObj, arguments);
  });
});

/***/ }),

/***/ "9gHp":
/***/ (function(module, exports, __webpack_require__) {

var _isArray = __webpack_require__("hOtR");

var _isTransformer = __webpack_require__("/W8u");
/**
 * Returns a function that dispatches with different strategies based on the
 * object in list position (last argument). If it is an array, executes [fn].
 * Otherwise, if it has a function with one of the given method names, it will
 * execute that function (functor case). Otherwise, if it is a transformer,
 * uses transducer [xf] to return a new transformer (transducer case).
 * Otherwise, it will default to executing [fn].
 *
 * @private
 * @param {Array} methodNames properties to check for a custom implementation
 * @param {Function} xf transducer to initialize if object is transformer
 * @param {Function} fn default ramda implementation
 * @return {Function} A function that dispatches on object in list position
 */


module.exports = function _dispatchable(methodNames, xf, fn) {
  return function () {
    if (arguments.length === 0) {
      return fn();
    }

    var args = Array.prototype.slice.call(arguments, 0);
    var obj = args.pop();

    if (!_isArray(obj)) {
      var idx = 0;

      while (idx < methodNames.length) {
        if (typeof obj[methodNames[idx]] === 'function') {
          return obj[methodNames[idx]].apply(obj, args);
        }

        idx += 1;
      }

      if (_isTransformer(obj)) {
        var transducer = xf.apply(null, args);
        return transducer(obj);
      }
    }

    return fn.apply(this, arguments);
  };
};

/***/ }),

/***/ "ABxe":
/***/ (function(module, exports) {

module.exports = function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
};

/***/ }),

/***/ "ALMR":
/***/ (function(module, exports) {

module.exports = function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
};

/***/ }),

/***/ "Av+g":
/***/ (function(module, exports) {

module.exports = function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/***/ }),

/***/ "B5EB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union/derivations
 */

module.exports = {
  serialization: __webpack_require__("BX6v"),
  equality: __webpack_require__("P1/7"),
  debugRepresentation: __webpack_require__("0fhL")
};

/***/ }),

/***/ "BPn/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNil = __webpack_require__("4Q1U");

var _isNil2 = _interopRequireDefault(_isNil);

var _result = __webpack_require__("FQBR");

var _result2 = _interopRequireDefault(_result);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Get .pagesPaths from pluginOptions
 * @sig Options -> Result String[]
 * @param {{pagesPaths: String[]}} options plugin options
 * @return {Result<String[]>} pagesPaths Result
 */


var getPagesPaths = function getPagesPaths(options) {
  if ((0, _isNil2.default)(options)) {
    return _result2.default.Error('Null plugin options');
  }

  var pagesPaths = options.pagesPaths;

  if ((0, _isNil2.default)(pagesPaths)) {
    return _result2.default.Error('Null pluginOptions.pagesPaths');
  } // Should test if pagesPaths is an Array?
  // Should test if pagesPaths is empty?


  return _result2.default.Ok(pagesPaths);
};

exports.default = getPagesPaths;

/***/ }),

/***/ "BX6v":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------
// --[ Dependencies ]---------------------------------------------------


var _require = __webpack_require__("6B8Y"),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

var mapValues = __webpack_require__("qo/p");

var values = __webpack_require__("cnAB");

var extend = __webpack_require__("F7L5"); // --[ Constants ]------------------------------------------------------


var typeJsonKey = '@@type';
var tagJsonKey = '@@tag';
var valueJsonKey = '@@value'; // --[ Helpers ]--------------------------------------------------------

/*~
 * type: ((Object 'a) => 'b) => ([Object 'a]) => Object 'b  
 */

var arrayToObject = function arrayToObject(extractKey) {
  return function (array) {
    return array.reduce(function (object, element) {
      object[extractKey(element)] = element;
      return object;
    }, {});
  };
};
/*~
 * type: (String) => (Object 'a) => 'a | None 
 */


var property = function property(propertyName) {
  return function (object) {
    return object[propertyName];
  };
};
/*~
 * type: ([Object 'a]) => Object 'a 
 */


var indexByType = arrayToObject(property(typeSymbol));
/*~
 * type: (String, String) => Bool
 */

var assertType = function assertType(given, expected) {
  if (expected !== given) {
    throw new TypeError('\n       The JSON structure was generated from ' + expected + '.\n       You are trying to parse it as ' + given + '. \n    ');
  }
};
/*~
 * type: |
 *   type JSONSerialisation = {
 *     "@@type":  String,
 *     "@@tag":   String,
 *     "@@value": Object Any
 *   }
 *   type JSONParser = {
 *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
 *   }
 * 
 *   (Object JSONParser) => (JSONSerialisation) => Any
 */


var parseValue = function parseValue(parsers) {
  return function (value) {
    if (value !== null && typeof value[typeJsonKey] === 'string') {
      var type = value[typeJsonKey];

      if (parsers[type]) {
        return parsers[type].fromJSON(value, parsers, true);
      } else {
        return value;
      }
    } else {
      return value;
    }
  };
};
/*~
 * type: ('a) => JSON
 */


var serializeValue = function serializeValue(value) {
  return value === undefined ? null : value !== null && typeof value.toJSON === 'function' ? value.toJSON() :
  /* otherwise */
  value;
}; // --[ Implementation ]-------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (Variant, ADT) => Void 
 */


var serialization = function serialization(variant, adt) {
  var typeName = adt[typeSymbol];
  var tagName = variant.prototype[tagSymbol];
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   * 
   *   Variant . () => JSONSerialisation
   */

  variant.prototype.toJSON = function () {
    var _ref;

    return _ref = {}, _defineProperty(_ref, typeJsonKey, typeName), _defineProperty(_ref, tagJsonKey, tagName), _defineProperty(_ref, valueJsonKey, mapValues(this, serializeValue)), _ref;
  };
  /*~
   * stability: experimental
   * module: null
   * authors:
   *   - "@boris-marinov"
   * 
   * type: |
   *   type JSONSerialisation = {
   *     "@@type":  String,
   *     "@@tag":   String,
   *     "@@value": Object Any
   *   }
   *   type JSONParser = {
   *     fromJSON: (JSONSerialisation, Array JSONParser) => Variant
   *   }
   * 
   *   (JSONSerialisation, Array JSONParser) => Variant
   */


  adt.fromJSON = function (value) {
    var parsers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defineProperty({}, typeName, adt);
    var keysIndicateType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var valueTypeName = value[typeJsonKey];
    var valueTagName = value[tagJsonKey];
    var valueContents = value[valueJsonKey];
    assertType(typeName, valueTypeName);
    var parsersByType = keysIndicateType ? parsers :
    /*otherwise*/
    indexByType(values(parsers));
    var parsedValue = mapValues(valueContents, parseValue(parsersByType));
    return extend(Object.create(adt[valueTagName].prototype), parsedValue);
  };
}; // --[ Exports ]--------------------------------------------------------


module.exports = serialization;

/***/ }),

/***/ "BuAq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get browser language.
 *
 * @return {String} langKey
 */

var getBrowserLanguage = function getBrowserLanguage() {
  if (typeof window === 'undefined') {
    return null;
  }

  var first = window.navigator.languages ? window.navigator.languages[0] : null;
  var lang = first || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
  return lang;
};

exports.default = getBrowserLanguage;

/***/ }),

/***/ "DjAY":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _curry2 = __webpack_require__("Wnyi");

var _isPlaceholder = __webpack_require__("ABxe");
/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


module.exports = function _curry3(fn) {
  return function f3(a, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;

      case 1:
        return _isPlaceholder(a) ? f3 : _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        });

      case 2:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f3 : _isPlaceholder(a) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _curry1(function (_c) {
          return fn(a, b, _c);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a) && _isPlaceholder(b) ? _curry2(function (_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a) && _isPlaceholder(c) ? _curry2(function (_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function (_b, _c) {
          return fn(a, _b, _c);
        }) : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function (_c) {
          return fn(a, b, _c);
        }) : fn(a, b, c);
    }
  };
};

/***/ }),

/***/ "E1XU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = __webpack_require__("gnJF");

var assertFunction = __webpack_require__("rnYU");

var _require = __webpack_require__("UYkW"),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = __webpack_require__("6RdS");

var adtMethods = __webpack_require__("d1Y1");

var extend = __webpack_require__("F7L5");

var warnDeprecation = __webpack_require__("GfB1");

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;
/*~ stability: stable */

var Validation = union('folktale:Validation', {
  /*~
   * type: |
   *   forall a, b: (a) => Validation a b
   */
  Failure: function Failure(value) {
    return {
      value: value
    };
  },

  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  Success: function Success(value) {
    return {
      value: value
    };
  }
}).derive(equality, debugRepresentation, serialization);
var Success = Validation.Success,
    Failure = Validation.Failure;
var assertValidation = assertType(Validation);
extend(Failure.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Failure');
  }

});
extend(Success.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a, b: get (Validation a b) => b
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Validation.Success');
  }

});
/*~~belongsTo: Validation */

adtMethods(Validation, {
  /*~
   * type: |
   *   forall a, b, c: (Validation a b).((b) => c) => Validation a c
   */
  map: {
    /*~*/
    Failure: function map(transformation) {
      assertFunction('Validation.Failure#map', transformation);
      return this;
    },

    /*~*/
    Success: function map(transformation) {
      assertFunction('Validation.Success#map', transformation);
      return Success(transformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c: (Validation (b) => c).(Validation a b) => Validation a c
   */
  apply: {
    /*~*/
    Failure: function apply(aValidation) {
      assertValidation('Failure#apply', aValidation);
      return Failure.hasInstance(aValidation) ? Failure(this.value.concat(aValidation.value)) :
      /* otherwise */
      this;
    },

    /*~*/
    Success: function apply(aValidation) {
      assertValidation('Success#apply', aValidation);
      return Failure.hasInstance(aValidation) ? aValidation :
      /* otherwise */
      aValidation.map(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  unsafeGet: {
    /*~*/
    Failure: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Failure.\n\n    Failure does not contain a normal value - it contains an error.\n    You might consider switching from Validation#get to Validation#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Success: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).(b) => b
   */
  getOrElse: {
    /*~*/
    Failure: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Success: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => Validation c b) => Validation c b
   */
  orElse: {
    /*~*/
    Failure: function orElse(handler) {
      assertFunction('Validation.Failure#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Success: function orElse(handler) {
      assertFunction('Validation.Success#orElse', handler);
      return this;
    }
  },

  /*~
   * type: |
   *   forall a, b:
   *     (Validation a b).(Validation a b) => Validation a b
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Failure: function concat(aValidation) {
      assertValidation('Validation.Failure#concat', aValidation);

      if (Failure.hasInstance(aValidation)) {
        return Failure(this.value.concat(aValidation.value));
      } else {
        return this;
      }
    },

    /*~*/
    Success: function concat(aValidation) {
      assertValidation('Validation.Success#concat', aValidation);
      return aValidation;
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c, (b) => c) => c
   */
  fold: {
    /*~*/
    Failure: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return failureTransformation(this.value);
    },

    /*~*/
    Success: function fold(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return successTransformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Validation b a
   */
  swap: {
    /*~*/
    Failure: function swap() {
      return Success(this.value);
    },

    /*~*/
    Success: function swap() {
      return Failure(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b, c, d:
   *     (Validation a b).((a) => c, (b) => d) => Validation c d
   */
  bimap: {
    /*~*/
    Failure: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Failure#fold', failureTransformation);
      assertFunction('Validation.Failure#fold', successTransformation);
      return Failure(failureTransformation(this.value));
    },

    /*~*/
    Success: function bimap(failureTransformation, successTransformation) {
      assertFunction('Validation.Success#fold', failureTransformation);
      assertFunction('Validation.Success#fold', successTransformation);
      return Success(successTransformation(this.value));
    }
  },

  /*~
   * type: |
   *   forall a, b, c:
   *     (Validation a b).((a) => c) Validation c b
   */
  mapFailure: {
    /*~*/
    Failure: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return Failure(transformation(this.value));
    },

    /*~*/
    Success: function mapFailure(transformation) {
      assertFunction('Validation.Failure#mapFailure', transformation);
      return this;
    }
  }
});
Object.assign(Validation, {
  /*~
   * type: |
   *   forall a, b: (b) => Validation a b
   */
  of: function of(value) {
    return Success(value);
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => b :: throws TypeError
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => a or b
   */
  merge: function merge() {
    return this.value;
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Result a b
   */
  toResult: function toResult() {
    return __webpack_require__("b2+F")(this);
  },

  /*~
   * type: |
   *   forall a, b: (Validation a b).() => Maybe b
   */
  toMaybe: function toMaybe() {
    return __webpack_require__("JYJV")(this);
  }
});
provideAliases(Success.prototype);
provideAliases(Failure.prototype);
provideAliases(Validation);
module.exports = Validation;

/***/ }),

/***/ "F0ff":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _dispatchable = __webpack_require__("9gHp");

var _xdrop = __webpack_require__("msMc");

var slice = __webpack_require__("b/Vg");
/**
 * Returns all but the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `drop` method).
 *
 * Dispatches to the `drop` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*} A copy of list without the first `n` elements
 * @see R.take, R.transduce, R.dropLast, R.dropWhile
 * @example
 *
 *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
 *      R.drop(3, 'ramda');               //=> 'da'
 */


module.exports = _curry2(_dispatchable(['drop'], _xdrop, function drop(n, xs) {
  return slice(Math.max(0, n), Infinity, xs);
}));

/***/ }),

/***/ "F3Iy":
/***/ (function(module, exports) {

module.exports = function _isString(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};

/***/ }),

/***/ "F7L5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var keys = Object.keys;
var symbols = Object.getOwnPropertySymbols;
var defineProperty = Object.defineProperty;
var property = Object.getOwnPropertyDescriptor;
/*
 * Extends an objects with own enumerable key/value pairs from other sources.
 *
 * This is used to define objects for the ADTs througout this file, and there
 * are some important differences from Object.assign:
 *
 *   - This code is only concerned with own enumerable property *names*.
 *   - Additionally this code copies all own symbols (important for tags).
 *
 * When copying, this function copies **whole property descriptors**, which
 * means getters/setters are not executed during the copying. The only
 * exception is when the property name is `prototype`, which is not
 * configurable in functions by default.
 *
 * This code only special cases `prototype` because any other non-configurable
 * property is considered an error, and should crash the program so it can be
 * fixed.
 */

function extend(target) {
  for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    keys(source).forEach(function (key) {
      if (key === 'prototype') {
        target[key] = source[key];
      } else {
        defineProperty(target, key, property(source, key));
      }
    });
    symbols(source).forEach(function (symbol) {
      defineProperty(target, symbol, property(source, symbol));
    });
  });
  return target;
}

module.exports = extend;

/***/ }),

/***/ "F9wR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _curry = __webpack_require__("V7Sg");

var _curry2 = _interopRequireDefault(_curry);

var _getValidLangKey = __webpack_require__("X53C");

var _getValidLangKey2 = _interopRequireDefault(_getValidLangKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Get current language key from url.
 * @func
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @param {String} url browser url
 * @returns {String} current langKey
 */


var getCurrentLangKey = (0, _curry2.default)(function (langs, defaultLangKey, url) {
  var langKey = url.split('/')[1];
  return (0, _getValidLangKey2.default)(langs, defaultLangKey, langKey);
});
exports.default = getCurrentLangKey;

/***/ }),

/***/ "FQBR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _module$exports;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


var Result = __webpack_require__("5tHe");

var _require = __webpack_require__("6B8Y"),
    typeSymbol = _require.typeSymbol;
/*~
 * stability: stable
 * name: module folktale/result
 */


module.exports = (_module$exports = {
  Error: Result.Error,
  Ok: Result.Ok,
  hasInstance: Result.hasInstance,
  of: Result.of,
  fromJSON: Result.fromJSON
}, _defineProperty(_module$exports, typeSymbol, Result[typeSymbol]), _defineProperty(_module$exports, 'try', __webpack_require__("3DaA")), _defineProperty(_module$exports, 'fromNullable', function fromNullable(aNullable, fallbackValue) {
  var nullableToResult = __webpack_require__("LQ/9");

  if (arguments.length > 1) {
    // eslint-disable-line prefer-rest-params 
    return nullableToResult(aNullable, fallbackValue);
  } else {
    return nullableToResult(aNullable);
  }
}), _defineProperty(_module$exports, 'fromValidation', function fromValidation(aValidation) {
  return __webpack_require__("b2+F")(aValidation);
}), _defineProperty(_module$exports, 'fromMaybe', function fromMaybe(aMaybe, failureValue) {
  return __webpack_require__("dtAR")(aMaybe, failureValue);
}), _module$exports);

/***/ }),

/***/ "FoZm":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Expose `IntlPolyfill` as global to add locale data into runtime later on.
global.IntlPolyfill = __webpack_require__("fL0r"); // Require all locale data for `Intl`. This module will be
// ignored when bundling for the browser with Browserify/Webpack.

__webpack_require__(3); // hack to export the polyfill as global Intl if needed


if (!global.Intl) {
  global.Intl = global.IntlPolyfill;

  global.IntlPolyfill.__applyLocaleSensitivePrototypes();
} // providing an idiomatic api for the nodejs version of this module


module.exports = global.IntlPolyfill;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "GfB1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var BLAME_FUNCTION_INDEX = 3; // [current, parent, *error*, caller to blame, …]

function warnDeprecation(reason) {
  // eslint-disable-line max-statements
  if (({}).FOLKTALE_ASSERTIONS !== 'none') {
    var stack = new Error('').stack;
    var offender = void 0;

    if (stack) {
      var lines = stack.split('\n');
      offender = lines[BLAME_FUNCTION_INDEX];
    }

    if (offender) {
      console.warn(reason + '\n    Blame: ' + offender.trim());
    } else {
      console.warn(reason);
    }
  }
}

module.exports = warnDeprecation;

/***/ }),

/***/ "HKjm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* jslint esnext: true */

var intl_messageformat_1 = __webpack_require__("2UD4");

var diff_1 = __webpack_require__("jBYB");

var es5_1 = __webpack_require__("obDU");

exports.default = RelativeFormat; // -----------------------------------------------------------------------------

var FIELDS = ['second', 'second-short', 'minute', 'minute-short', 'hour', 'hour-short', 'day', 'day-short', 'month', 'month-short', 'year', 'year-short'];
var STYLES = ['best fit', 'numeric']; // -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
  options = options || {}; // Make a copy of `locales` if it's an array, so that it doesn't change
  // since it's used lazily.

  if (es5_1.isArray(locales)) {
    locales = locales.concat();
  }

  es5_1.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  });
  es5_1.defineProperty(this, '_options', {
    value: {
      style: this._resolveStyle(options.style),
      units: this._isValidUnits(options.units) && options.units
    }
  });
  es5_1.defineProperty(this, '_locales', {
    value: locales
  });
  es5_1.defineProperty(this, '_fields', {
    value: this._findFields(this._locale)
  });
  es5_1.defineProperty(this, '_messages', {
    value: es5_1.objCreate(null)
  }); // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.

  var relativeFormat = this;

  this.format = function format(date, options) {
    return relativeFormat._format(date, options);
  };
} // Define internal private properties for dealing with locale data.


es5_1.defineProperty(RelativeFormat, '__localeData__', {
  value: es5_1.objCreate(null)
});
es5_1.defineProperty(RelativeFormat, '__addLocaleData', {
  value: function value() {
    for (var i = 0; i < arguments.length; i++) {
      var datum = arguments[i];

      if (!(datum && datum.locale)) {
        throw new Error('Locale data provided to IntlRelativeFormat is missing a ' + '`locale` property value');
      }

      RelativeFormat.__localeData__[datum.locale.toLowerCase()] = datum; // Add data to IntlMessageFormat.

      intl_messageformat_1.default.__addLocaleData(datum);
    }
  }
}); // Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.

es5_1.defineProperty(RelativeFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
}); // Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.

es5_1.defineProperty(RelativeFormat, 'thresholds', {
  enumerable: true,
  value: {
    second: 45,
    'second-short': 45,
    minute: 45,
    'minute-short': 45,
    hour: 22,
    'hour-short': 22,
    day: 26,
    'day-short': 26,
    month: 11,
    'month-short': 11 // months to year

  }
});

RelativeFormat.prototype.resolvedOptions = function () {
  return {
    locale: this._locale,
    style: this._options.style,
    units: this._options.units
  };
};

RelativeFormat.prototype._compileMessage = function (units) {
  // `this._locales` is the original set of locales the user specified to the
  // constructor, while `this._locale` is the resolved root locale.
  var locales = this._locales;
  var resolvedLocale = this._locale;
  var field = this._fields[units];
  var relativeTime = field.relativeTime;
  var future = '';
  var past = '';
  var i;

  for (i in relativeTime.future) {
    if (relativeTime.future.hasOwnProperty(i)) {
      future += ' ' + i + ' {' + relativeTime.future[i].replace('{0}', '#') + '}';
    }
  }

  for (i in relativeTime.past) {
    if (relativeTime.past.hasOwnProperty(i)) {
      past += ' ' + i + ' {' + relativeTime.past[i].replace('{0}', '#') + '}';
    }
  }

  var message = '{when, select, future {{0, plural, ' + future + '}}' + 'past {{0, plural, ' + past + '}}}'; // Create the synthetic IntlMessageFormat instance using the original
  // locales value specified by the user when constructing the the parent
  // IntlRelativeFormat instance.

  return new intl_messageformat_1.default(message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
  var messages = this._messages; // Create a new synthetic message based on the locale data from CLDR.

  if (!messages[units]) {
    messages[units] = this._compileMessage(units);
  }

  return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
  var field = this._fields[units];

  if (field.relative) {
    return field.relative[diff];
  }
};

RelativeFormat.prototype._findFields = function (locale) {
  var localeData = RelativeFormat.__localeData__;
  var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find `fields` to return.

  while (data) {
    if (data.fields) {
      return data.fields;
    }

    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }

  throw new Error('Locale data added to IntlRelativeFormat is missing `fields` for :' + locale);
};

RelativeFormat.prototype._format = function (date, options) {
  var now = options && options.now !== undefined ? options.now : es5_1.dateNow();

  if (date === undefined) {
    date = now;
  } // Determine if the `date` and optional `now` values are valid, and throw a
  // similar error to what `Intl.DateTimeFormat#format()` would throw.


  if (!isFinite(now)) {
    throw new RangeError('The `now` option provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  if (!isFinite(date)) {
    throw new RangeError('The date value provided to IntlRelativeFormat#format() is not ' + 'in valid range.');
  }

  var diffReport = diff_1.default(now, date);

  var units = this._options.units || this._selectUnits(diffReport);

  var diffInUnits = diffReport[units];

  if (this._options.style !== 'numeric') {
    var relativeUnits = this._getRelativeUnits(diffInUnits, units);

    if (relativeUnits) {
      return relativeUnits;
    }
  }

  return this._getMessage(units).format({
    '0': Math.abs(diffInUnits),
    when: diffInUnits < 0 ? 'past' : 'future'
  });
};

RelativeFormat.prototype._isValidUnits = function (units) {
  if (!units || es5_1.arrIndexOf.call(FIELDS, units) >= 0) {
    return true;
  }

  if (typeof units === 'string') {
    var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);

    if (suggestion && es5_1.arrIndexOf.call(FIELDS, suggestion) >= 0) {
      throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` ' + 'value, did you mean: ' + suggestion);
    }
  }

  throw new Error('"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' + 'must be one of: "' + FIELDS.join('", "') + '"');
};

RelativeFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  } // Create a copy of the array so we can push on the default locale.


  locales = (locales || []).concat(RelativeFormat.defaultLocale);
  var localeData = RelativeFormat.__localeData__;
  var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.

  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];

      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlRelativeFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};

RelativeFormat.prototype._resolveStyle = function (style) {
  // Default to "best fit" style.
  if (!style) {
    return STYLES[0];
  }

  if (es5_1.arrIndexOf.call(STYLES, style) >= 0) {
    return style;
  }

  throw new Error('"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' + 'must be one of: "' + STYLES.join('", "') + '"');
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
  var i, l, units;
  var fields = FIELDS.filter(function (field) {
    return field.indexOf('-short') < 1;
  });

  for (i = 0, l = fields.length; i < l; i += 1) {
    units = fields[i];

    if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
      break;
    }
  }

  return units;
};

/***/ }),

/***/ "HzlJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* @generated */

exports.default = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split('.'),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? 'one' : n10 == 2 && n100 != 12 ? 'two' : n10 == 3 && n100 != 13 ? 'few' : 'other';
    return n == 1 && v0 ? 'one' : 'other';
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "week": {
      "displayName": "week",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this week",
        "1": "next week",
        "-1": "last week"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} week",
          "other": "in {0} weeks"
        },
        "past": {
          "one": "{0} week ago",
          "other": "{0} weeks ago"
        }
      }
    },
    "week-short": {
      "displayName": "wk.",
      "relativePeriod": "the week of {0}",
      "relative": {
        "0": "this wk.",
        "1": "next wk.",
        "-1": "last wk."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} wk.",
          "other": "in {0} wk."
        },
        "past": {
          "one": "{0} wk. ago",
          "other": "{0} wk. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};

/***/ }),

/***/ "IS96":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var empty = __webpack_require__("a2QF");

var equals = __webpack_require__("1s4d");
/**
 * Returns `true` if the given value is its type's empty value; `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> Boolean
 * @param {*} x
 * @return {Boolean}
 * @see R.empty
 * @example
 *
 *      R.isEmpty([1, 2, 3]);   //=> false
 *      R.isEmpty([]);          //=> true
 *      R.isEmpty('');          //=> true
 *      R.isEmpty(null);        //=> false
 *      R.isEmpty({});          //=> true
 *      R.isEmpty({length: 0}); //=> false
 */


module.exports = _curry1(function isEmpty(x) {
  return x != null && equals(x, empty(x));
});

/***/ }),

/***/ "JRPe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ addLocaleData; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ index_es_IntlProvider; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ index_es_FormattedMessage; });

// UNUSED EXPORTS: intlShape, injectIntl, defineMessages, FormattedDate, FormattedTime, FormattedRelative, FormattedNumber, FormattedPlural, FormattedHTMLMessage

// EXTERNAL MODULE: ../locale-data/index.js (ignored)
var locale_data_ignored_ = __webpack_require__(0);
var locale_data_ignored_default = /*#__PURE__*/__webpack_require__.n(locale_data_ignored_);

// EXTERNAL MODULE: ./node_modules/intl-messageformat/index.js
var intl_messageformat = __webpack_require__("2UD4");
var intl_messageformat_default = /*#__PURE__*/__webpack_require__.n(intl_messageformat);

// EXTERNAL MODULE: ./node_modules/intl-relativeformat/index.js
var intl_relativeformat = __webpack_require__("7Inb");
var intl_relativeformat_default = /*#__PURE__*/__webpack_require__.n(intl_relativeformat);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__("17x9");
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-intl/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__("57TA");
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__("QLaP");
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// CONCATENATED MODULE: ./node_modules/intl-format-cache/lib/index.js
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/
var RelativeTimeFormat; // -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
  return JSON.stringify(inputs.map(function (input) {
    return input && typeof input === 'object' ? orderedProps(input) : input;
  }));
}

function orderedProps(obj) {
  return Object.keys(obj).sort().map(function (k) {
    var _a;

    return _a = {}, _a[k] = obj[k], _a;
  });
}

var memoizeFormatConstructor = function memoizeFormatConstructor(FormatConstructor, cache) {
  if (cache === void 0) {
    cache = {};
  }

  return function () {
    var _a;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var cacheId = getCacheId(args);
    var format = cacheId && cache[cacheId];

    if (!format) {
      format = new ((_a = FormatConstructor).bind.apply(_a, [void 0].concat(args)))();

      if (cacheId) {
        cache[cacheId] = format;
      }
    }

    return format;
  };
};

/* harmony default export */ var lib = (memoizeFormatConstructor);
// CONCATENATED MODULE: ./node_modules/react-intl/lib/index.es.js
/*
 * Copyright 2019, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */







 // GENERATED FILE

var defaultLocaleData = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  },
  "fields": {
    "year": {
      "displayName": "year",
      "relative": {
        "0": "this year",
        "1": "next year",
        "-1": "last year"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} year",
          "other": "in {0} years"
        },
        "past": {
          "one": "{0} year ago",
          "other": "{0} years ago"
        }
      }
    },
    "year-short": {
      "displayName": "yr.",
      "relative": {
        "0": "this yr.",
        "1": "next yr.",
        "-1": "last yr."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} yr.",
          "other": "in {0} yr."
        },
        "past": {
          "one": "{0} yr. ago",
          "other": "{0} yr. ago"
        }
      }
    },
    "month": {
      "displayName": "month",
      "relative": {
        "0": "this month",
        "1": "next month",
        "-1": "last month"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} month",
          "other": "in {0} months"
        },
        "past": {
          "one": "{0} month ago",
          "other": "{0} months ago"
        }
      }
    },
    "month-short": {
      "displayName": "mo.",
      "relative": {
        "0": "this mo.",
        "1": "next mo.",
        "-1": "last mo."
      },
      "relativeTime": {
        "future": {
          "one": "in {0} mo.",
          "other": "in {0} mo."
        },
        "past": {
          "one": "{0} mo. ago",
          "other": "{0} mo. ago"
        }
      }
    },
    "day": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "day-short": {
      "displayName": "day",
      "relative": {
        "0": "today",
        "1": "tomorrow",
        "-1": "yesterday"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} day",
          "other": "in {0} days"
        },
        "past": {
          "one": "{0} day ago",
          "other": "{0} days ago"
        }
      }
    },
    "hour": {
      "displayName": "hour",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hour",
          "other": "in {0} hours"
        },
        "past": {
          "one": "{0} hour ago",
          "other": "{0} hours ago"
        }
      }
    },
    "hour-short": {
      "displayName": "hr.",
      "relative": {
        "0": "this hour"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} hr.",
          "other": "in {0} hr."
        },
        "past": {
          "one": "{0} hr. ago",
          "other": "{0} hr. ago"
        }
      }
    },
    "minute": {
      "displayName": "minute",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} minute",
          "other": "in {0} minutes"
        },
        "past": {
          "one": "{0} minute ago",
          "other": "{0} minutes ago"
        }
      }
    },
    "minute-short": {
      "displayName": "min.",
      "relative": {
        "0": "this minute"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} min.",
          "other": "in {0} min."
        },
        "past": {
          "one": "{0} min. ago",
          "other": "{0} min. ago"
        }
      }
    },
    "second": {
      "displayName": "second",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} second",
          "other": "in {0} seconds"
        },
        "past": {
          "one": "{0} second ago",
          "other": "{0} seconds ago"
        }
      }
    },
    "second-short": {
      "displayName": "sec.",
      "relative": {
        "0": "now"
      },
      "relativeTime": {
        "future": {
          "one": "in {0} sec.",
          "other": "in {0} sec."
        },
        "past": {
          "one": "{0} sec. ago",
          "other": "{0} sec. ago"
        }
      }
    }
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var locales = Array.isArray(data) ? data : [data];
  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      intl_messageformat_default.a.__addLocaleData(localeData);

      intl_relativeformat_default.a.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();
  return !!(intl_messageformat_default.a.__localeData__[normalizedLocale] && intl_relativeformat_default.a.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function wrap(fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function _await(value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var toConsumableArray = function toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var bool = prop_types_default.a.bool;
var number = prop_types_default.a.number;
var string = prop_types_default.a.string;
var func = prop_types_default.a.func;
var object = prop_types_default.a.object;
var oneOf = prop_types_default.a.oneOf;
var shape = prop_types_default.a.shape;
var any = prop_types_default.a.any;
var oneOfType = prop_types_default.a.oneOfType;
var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;
var intlConfigPropTypes = {
  locale: string,
  timeZone: string,
  formats: object,
  messages: object,
  textComponent: any,
  defaultLocale: string,
  defaultFormats: object,
  onError: func
};
var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};
var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));
var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};
var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),
  timeZone: string,
  hour12: bool,
  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};
var numberFormatPropTypes = {
  localeMatcher: localeMatcher,
  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,
  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};
var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year', 'second-short', 'minute-short', 'hour-short', 'day-short', 'month-short', 'year-short'])
};
var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};
/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);
var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};
var UNSAFE_CHARS_REGEX = /[&><"']/g;

function index_es_escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  browser_default()(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;
  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

function createError(message, exception) {
  var eMsg = exception ? '\n' + exception : '';
  return '[React Intl] ' + message + eMsg;
}

function defaultErrorHandler(error) {
  if (false) {}
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// Inspired by react-redux's `connect()` HOC factory function implementation:
// https://github.com/rackt/react-redux


function getDisplayName(Component$$1) {
  return Component$$1.displayName || Component$$1.name || 'Component';
}

function injectIntl(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$intlPropName = options.intlPropName,
      intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var InjectIntl = function (_Component) {
    inherits(InjectIntl, _Component);

    function InjectIntl(props, context) {
      classCallCheck(this, InjectIntl);

      var _this = possibleConstructorReturn(this, (InjectIntl.__proto__ || Object.getPrototypeOf(InjectIntl)).call(this, props, context));

      invariantIntlContext(context);
      return _this;
    }

    createClass(InjectIntl, [{
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        browser_default()(withRef, '[React Intl] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`injectIntl()`');
        return this._wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return react_default.a.createElement(WrappedComponent, _extends({}, this.props, defineProperty({}, intlPropName, this.context.intl), {
          ref: withRef ?
          /* istanbul ignore next */
          function (ref) {
            return _this2._wrappedInstance = ref;
          } : null
        }));
      }
    }]);
    return InjectIntl;
  }(react["Component"]);

  InjectIntl.displayName = 'InjectIntl(' + getDisplayName(WrappedComponent) + ')';
  InjectIntl.contextTypes = {
    intl: intlShape
  };
  InjectIntl.WrappedComponent = WrappedComponent;
  return hoist_non_react_statics_cjs_default()(InjectIntl, WrappedComponent);
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


function defineMessages(messageDescriptors) {
  // This simply returns what's passed-in because it's meant to be a hook for
  // babel-plugin-react-intl.
  return messageDescriptors;
}
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
// This is a "hack" until a proper `intl-pluralformat` package is created.


function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return intl_messageformat_default.a.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return intl_messageformat_default.a.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);
  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);
var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60,
  // seconds to minute
  minute: 60,
  // minutes to hour
  hour: 24,
  // hours to day
  day: 30,
  // days to month
  month: 12
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = intl_relativeformat_default.a.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
  thresholds['second-short'] = newThresholds['second-short'];
  thresholds['minute-short'] = newThresholds['minute-short'];
  thresholds['hour-short'] = newThresholds['hour-short'];
  thresholds['day-short'] = newThresholds['day-short'];
  thresholds['month-short'] = newThresholds['month-short'];
}

function getNamedFormat(formats, type, name, onError) {
  var format = formats && formats[type] && formats[type][name];

  if (format) {
    return format;
  }

  onError(createError('No ' + type + ' format named: ' + name));
}

function index_es_formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'date', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting date.', e));
  }

  return String(date);
}

function index_es_formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      timeZone = config.timeZone;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);

  var defaults$$1 = _extends({}, timeZone && {
    timeZone: timeZone
  }, format && getNamedFormat(formats, 'time', format, onError));

  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, {
      hour: 'numeric',
      minute: 'numeric'
    });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    onError(createError('Error formatting time.', e));
  }

  return String(date);
}

function index_es_formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format, onError);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1); // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.

  var oldThresholds = _extends({}, intl_relativeformat_default.a.thresholds);

  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    onError(createError('Error formatting relative time.', e));
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function index_es_formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;
  var onError = config.onError || defaultErrorHandler;
  var defaults$$1 = format && getNamedFormat(formats, 'number', format, onError);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting number.', e));
  }

  return String(value);
}

function index_es_formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;
  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);
  var onError = config.onError || defaultErrorHandler;

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    onError(createError('Error formatting plural.', e));
  }

  return 'other';
}

function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage; // Produce a better error if the user calls `intl.formatMessage(element)`

  if (false) {} // `id` is a required field of a Message Descriptor.


  browser_default()(id, '[React Intl] An `id` must be provided to format a message.');
  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0; // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.

  if (!hasValues && "production" === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;
  var onError = config.onError || defaultErrorHandler;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);
      formattedMessage = formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''), e));
    }
  } else {
    // This prevents warnings from littering the console in development
    // when no `messages` are passed into the <IntlProvider> for the
    // default locale, and a default message is in the source.
    if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
      onError(createError('Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '')));
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      onError(createError('Error formatting the default message for: "' + id + '"', e));
    }
  }

  if (!formattedMessage) {
    onError(createError('Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.')));
  }

  return formattedMessage || message || defaultMessage || id;
}

function index_es_formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {}; // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.

  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? index_es_escape(value) : value;
    return escaped;
  }, {});
  return formatMessage(config, state, messageDescriptor, escapedValues);
}

var index_es_format = Object.freeze({
  formatDate: index_es_formatDate,
  formatTime: index_es_formatTime,
  formatRelative: index_es_formatRelative,
  formatNumber: index_es_formatNumber,
  formatPlural: index_es_formatPlural,
  formatMessage: formatMessage,
  formatHTMLMessage: index_es_formatHTMLMessage
});
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes); // These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.

var defaultProps = {
  formats: {},
  messages: {},
  timeZone: null,
  textComponent: 'span',
  defaultLocale: 'en',
  defaultFormats: {},
  onError: defaultErrorHandler
};

var index_es_IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    browser_default()(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');
    var intlContext = context.intl; // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;

    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    } // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.


    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: lib(Intl.DateTimeFormat),
      getNumberFormat: lib(Intl.NumberFormat),
      getMessageFormat: lib(intl_messageformat_default.a),
      getRelativeFormat: lib(intl_relativeformat_default.a),
      getPluralFormat: lib(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {
      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl; // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext); // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.

      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats,
            onError = _config.onError;
        onError(createError('Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'))); // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.

        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = index_es_format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig(); // Bind intl factories and current config to the format functions.

      var boundFormatFns = this.getBoundFormatFns(config, this.state);
      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);
      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return react["Children"].only(this.props.children);
    }
  }]);
  return IntlProvider;
}(react["Component"]);

index_es_IntlProvider.displayName = 'IntlProvider';
index_es_IntlProvider.contextTypes = {
  intl: intlShape
};
index_es_IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return react_default.a.createElement(Text, null, formattedDate);
    }
  }]);
  return FormattedDate;
}(react["Component"]);

index_es_FormattedDate.displayName = 'FormattedDate';
index_es_FormattedDate.contextTypes = {
  intl: intlShape
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return react_default.a.createElement(Text, null, formattedTime);
    }
  }]);
  return FormattedTime;
}(react["Component"]);

index_es_FormattedTime.displayName = 'FormattedTime';
index_es_FormattedTime.contextTypes = {
  intl: intlShape
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24; // The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout

var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  } // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.


  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;

    case 'minute':
      return MINUTE;

    case 'hour':
      return HOUR;

    case 'day':
      return DAY;

    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();
  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var index_es_FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);
    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now(); // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.

    _this.state = {
      now: now
    };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this; // Cancel and pending update because we're scheduling a new update.


      clearTimeout(this._timer);
      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;
      var time = new Date(value).getTime(); // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.

      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay); // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.

      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);
      this._timer = setTimeout(function () {
        _this2.setState({
          now: _this2.context.intl.now()
        });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value; // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.

      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({
          now: this.context.intl.now()
        });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return react_default.a.createElement(Text, null, formattedRelative);
    }
  }]);
  return FormattedRelative;
}(react["Component"]);

index_es_FormattedRelative.displayName = 'FormattedRelative';
index_es_FormattedRelative.contextTypes = {
  intl: intlShape
};
index_es_FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;
      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return react_default.a.createElement(Text, null, formattedNumber);
    }
  }]);
  return FormattedNumber;
}(react["Component"]);

index_es_FormattedNumber.displayName = 'FormattedNumber';
index_es_FormattedNumber.contextTypes = {
  intl: intlShape
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;
      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return react_default.a.createElement(Text, null, formattedPlural);
    }
  }]);
  return FormattedPlural;
}(react["Component"]);

index_es_FormattedPlural.displayName = 'FormattedPlural';
index_es_FormattedPlural.contextTypes = {
  intl: intlShape
};
index_es_FormattedPlural.defaultProps = {
  style: 'cardinal'
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_defaultFormatMessage = function defaultFormatMessage(descriptor, values) {
  if (false) {}

  return formatMessage({}, {
    getMessageFormat: lib(intl_messageformat_default.a)
  }, descriptor, values);
};

var index_es_FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    if (!props.defaultMessage) {
      invariantIntlContext(context);
    }

    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _ref = this.context.intl || {},
          _ref$formatMessage = _ref.formatMessage,
          formatMessage$$1 = _ref$formatMessage === undefined ? index_es_defaultFormatMessage : _ref$formatMessage,
          _ref$textComponent = _ref.textComponent,
          Text = _ref$textComponent === undefined ? 'span' : _ref$textComponent;

      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;
      var hasValues = values && Object.keys(values).length > 0;

      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }(); // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.


        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {}; // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.

        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if (Object(react["isValidElement"])(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedMessage = formatMessage$$1(descriptor, tokenizedValues || values);
      var nodes = void 0;
      var hasElements = elements && Object.keys(elements).length > 0;

      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      } // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.


      return react["createElement"].apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(react["Component"]);

index_es_FormattedMessage.displayName = 'FormattedMessage';
index_es_FormattedMessage.contextTypes = {
  intl: intlShape
};
index_es_FormattedMessage.defaultProps = {
  values: {}
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var index_es_FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;

      if (!shallowEquals(nextValues, values)) {
        return true;
      } // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.


      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;
      var descriptor = {
        id: id,
        description: description,
        defaultMessage: defaultMessage
      };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      } // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.


      var html = {
        __html: formattedHTMLMessage
      };
      return react_default.a.createElement(Component$$1, {
        dangerouslySetInnerHTML: html
      });
    }
  }]);
  return FormattedHTMLMessage;
}(react["Component"]);

index_es_FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
index_es_FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
index_es_FormattedHTMLMessage.defaultProps = {
  values: {}
};
 false ? undefined : void 0;
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);
/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(locale_data_ignored_default.a);


/***/ }),

/***/ "JYJV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("rfz3"),
    Just = _require.Just,
    Nothing = _require.Nothing;
/*~
 * stability: stable
 * authors: 
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Validation a b) => Maybe b
 */


var validationToMaybe = function validationToMaybe(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure() {
      return Nothing();
    },
    Success: function Success(_ref) {
      var value = _ref.value;
      return Just(value);
    }
  });
};

module.exports = validationToMaybe;

/***/ }),

/***/ "JbWX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports.extend = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
  var sources = Array.prototype.slice.call(arguments, 1),
      i,
      len,
      source,
      key;

  for (i = 0, len = sources.length; i < len; i += 1) {
    source = sources[i];

    if (!source) {
      continue;
    }

    for (key in source) {
      if (hop.call(source, key)) {
        obj[key] = source[key];
      }
    }
  }

  return obj;
}

exports.hop = hop;

/***/ }),

/***/ "LPBM":
/***/ (function(module, exports) {

module.exports = function () {
  function XWrap(fn) {
    this.f = fn;
  }

  XWrap.prototype['@@transducer/init'] = function () {
    throw new Error('init not implemented on XWrap');
  };

  XWrap.prototype['@@transducer/result'] = function (acc) {
    return acc;
  };

  XWrap.prototype['@@transducer/step'] = function (acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap(fn) {
    return new XWrap(fn);
  };
}();

/***/ }),

/***/ "LQ/9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("5tHe"),
    Error = _require.Error,
    Ok = _require.Ok;

var deprecated = __webpack_require__("GfB1");
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (a or None, b) => Result b a
 *   & (a or None) => Result None a
 */


var nullableToResult = function nullableToResult(a, givenFallback) {
  var oldBehaviour = arguments.length < 2; // eslint-disable-line prefer-rest-params

  if (oldBehaviour) {
    deprecated('nullableToResult(value) is being deprecated in favour of providing an explicit fallback value.\nnullableToResult(value, fallback) is the new preferred form of this function.\n');
  }

  var fallback = oldBehaviour ? a : givenFallback;
  return a != null ? Ok(a) :
  /* else */
  Error(fallback);
};

module.exports = nullableToResult;

/***/ }),

/***/ "OzU1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("rfz3"),
    Just = _require.Just,
    Nothing = _require.Nothing;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *
 * type: |
 *   forall a, b:
 *     (Result a b) => Maybe b
 */


var resultToMaybe = function resultToMaybe(aResult) {
  return aResult.matchWith({
    Error: function Error(_ref) {
      var _ = _ref.value;
      return Nothing();
    },
    Ok: function Ok(_ref2) {
      var value = _ref2.value;
      return Just(value);
    }
  });
};

module.exports = resultToMaybe;

/***/ }),

/***/ "P1/7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------
// --[ Dependencies ]---------------------------------------------------

var assertType = __webpack_require__("gnJF");

var flEquals = __webpack_require__("xiFT");

var fl = __webpack_require__("mGu+");

var provideAliases = __webpack_require__("6RdS");

var copyDocs = __webpack_require__("UhbJ");

var _require = __webpack_require__("6B8Y"),
    tagSymbol = _require.tagSymbol,
    typeSymbol = _require.typeSymbol;

var toString = Object.prototype.toString;
var prototypeOf = Object.getPrototypeOf; // --[ Helpers ]--------------------------------------------------------

/*~
 * type: (Any) => Boolean
 */

var isSetoid = function isSetoid(value) {
  return value != null && (typeof value[fl.equals] === 'function' || typeof value.equals === 'function');
};
/*~
 * type: (Variant, Variant) => Boolean
 */


var sameType = function sameType(a, b) {
  return a[typeSymbol] === b[typeSymbol] && a[tagSymbol] === b[tagSymbol];
};

var isPlainObject = function isPlainObject(object) {
  if (Object(object) !== object) return false;
  return !prototypeOf(object) || !object.toString || toString.call(object) === object.toString();
};

var deepEquals = function deepEquals(a, b) {
  if (a === b) return true;
  var leftSetoid = isSetoid(a);
  var rightSetoid = isSetoid(b);

  if (leftSetoid) {
    if (rightSetoid) return flEquals(a, b);else return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every(function (x, i) {
      return deepEquals(x, b[i]);
    });
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    var setB = new Set(keysB);
    return keysA.length === keysB.length && prototypeOf(a) === prototypeOf(b) && keysA.every(function (k) {
      return setB.has(k) && a[k] === b[k];
    });
  }

  return false;
}; // --[ Implementation ]------------------------------------------------

/*~
 * stability: experimental
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   (('a, 'a) => Boolean) => (Variant, Union) => Void
 */


var createDerivation = function createDerivation(valuesEqual) {
  /*~
   * type: ('a, 'a) => Boolean
   */
  var equals = function equals(a, b) {
    // identical objects must be equal
    if (a === b) return true; // we require both values to be setoids if one of them is

    var leftSetoid = isSetoid(a);
    var rightSetoid = isSetoid(b);

    if (leftSetoid) {
      if (rightSetoid) return flEquals(a, b);else return false;
    } // fall back to the provided equality


    return valuesEqual(a, b);
  };
  /*~
   * type: (Object Any, Object Any, Array String) => Boolean
   */


  var compositesEqual = function compositesEqual(a, b, keys) {
    for (var i = 0; i < keys.length; ++i) {
      var keyA = a[keys[i]];
      var keyB = b[keys[i]];

      if (!equals(keyA, keyB)) {
        return false;
      }
    }

    return true;
  };

  var derivation = function derivation(variant, adt) {
    /*~
     * stability: experimental
     * module: null
     * authors:
     *   - "@boris-marinov"
     *   - Quildreen Motta
     * 
     * type: |
     *   forall S, a:
     *     (S a).(S a) => Boolean
     *   where S is Setoid
     */
    variant.prototype.equals = function (value) {
      assertType(adt)(this[tagSymbol] + '#equals', value);
      return sameType(this, value) && compositesEqual(this, value, Object.keys(this));
    };

    provideAliases(variant.prototype);
    return variant;
  };

  copyDocs(createDerivation, derivation, {
    type: '(Variant, Union) => Void'
  });
  return derivation;
}; // --[ Exports ]-------------------------------------------------------

/*~~inheritsMeta: createDerivation */


module.exports = createDerivation(deepEquals);
module.exports.withCustomComparison = createDerivation;

/***/ }),

/***/ "P9nH":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");
/**
 * Gives a single-word string description of the (native) type of a value,
 * returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not
 * attempt to distinguish user Object types any further, reporting them all as
 * 'Object'.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Type
 * @sig (* -> {*}) -> String
 * @param {*} val The value to test
 * @return {String}
 * @example
 *
 *      R.type({}); //=> "Object"
 *      R.type(1); //=> "Number"
 *      R.type(false); //=> "Boolean"
 *      R.type('s'); //=> "String"
 *      R.type(null); //=> "Null"
 *      R.type([]); //=> "Array"
 *      R.type(/[A-z]/); //=> "RegExp"
 *      R.type(() => {}); //=> "Function"
 */


module.exports = _curry1(function type(val) {
  return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
});

/***/ }),

/***/ "PhQ1":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _dispatchable = __webpack_require__("9gHp");

var _xtake = __webpack_require__("TGFc");

var slice = __webpack_require__("b/Vg");
/**
 * Returns the first `n` elements of the given list, string, or
 * transducer/transformer (or object with a `take` method).
 *
 * Dispatches to the `take` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n
 * @param {*} list
 * @return {*}
 * @see R.drop
 * @example
 *
 *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
 *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
 *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.take(3, 'ramda');               //=> 'ram'
 *
 *      var personnel = [
 *        'Dave Brubeck',
 *        'Paul Desmond',
 *        'Eugene Wright',
 *        'Joe Morello',
 *        'Gerry Mulligan',
 *        'Bob Bates',
 *        'Joe Dodge',
 *        'Ron Crotty'
 *      ];
 *
 *      var takeFive = R.take(5);
 *      takeFive(personnel);
 *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
 * @symb R.take(-1, [a, b]) = [a, b]
 * @symb R.take(0, [a, b]) = []
 * @symb R.take(1, [a, b]) = [a]
 * @symb R.take(2, [a, b]) = [a, b]
 */


module.exports = _curry2(_dispatchable(['take'], _xtake, function take(n, xs) {
  return slice(0, n < 0 ? Infinity : n, xs);
}));

/***/ }),

/***/ "QT9C":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _isString = __webpack_require__("F3Iy");
/**
 * Returns the nth element of the given list or string. If n is negative the
 * element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Number -> [a] -> a | Undefined
 * @sig Number -> String -> String
 * @param {Number} offset
 * @param {*} list
 * @return {*}
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 *
 *      R.nth(2, 'abc'); //=> 'c'
 *      R.nth(3, 'abc'); //=> ''
 * @symb R.nth(-1, [a, b, c]) = c
 * @symb R.nth(0, [a, b, c]) = a
 * @symb R.nth(1, [a, b, c]) = b
 */


module.exports = _curry2(function nth(offset, list) {
  var idx = offset < 0 ? list.length + offset : offset;
  return _isString(list) ? list.charAt(idx) : list[idx];
});

/***/ }),

/***/ "QXSC":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _isString = __webpack_require__("F3Iy");
/**
 * Returns a new list or string with the elements or characters in reverse
 * order.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {Array|String} list
 * @return {Array|String}
 * @example
 *
 *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
 *      R.reverse([1, 2]);     //=> [2, 1]
 *      R.reverse([1]);        //=> [1]
 *      R.reverse([]);         //=> []
 *
 *      R.reverse('abc');      //=> 'cba'
 *      R.reverse('ab');       //=> 'ba'
 *      R.reverse('a');        //=> 'a'
 *      R.reverse('');         //=> ''
 */


module.exports = _curry1(function reverse(list) {
  return _isString(list) ? list.split('').reverse().join('') : Array.prototype.slice.call(list, 0).reverse();
});

/***/ }),

/***/ "R5jr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE


exports["default"] = {
  "locale": "en",
  "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);
    if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";
    return n == 1 && v0 ? "one" : "other";
  }
};

/***/ }),

/***/ "Ripx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pipe = __webpack_require__("1DYX");

var _pipe2 = _interopRequireDefault(_pipe);

var _getBrowserLanguage = __webpack_require__("BuAq");

var _getBrowserLanguage2 = _interopRequireDefault(_getBrowserLanguage);

var _getValidLangKey = __webpack_require__("X53C");

var _getValidLangKey2 = _interopRequireDefault(_getValidLangKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Get user browser valid langKey
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @return {string} valid langKey
 */


var getUserLangKey = function getUserLangKey(langs, defaultLangKey) {
  return (0, _pipe2.default)(_getBrowserLanguage2.default, (0, _getValidLangKey2.default)(langs, defaultLangKey))();
};

exports.default = getUserLangKey;

/***/ }),

/***/ "RjsT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _not = __webpack_require__("yBOd");

var _not2 = _interopRequireDefault(_not);

var _head = __webpack_require__("RvjR");

var _head2 = _interopRequireDefault(_head);

var _isNil = __webpack_require__("4Q1U");

var _isNil2 = _interopRequireDefault(_isNil);

var _curry = __webpack_require__("V7Sg");

var _curry2 = _interopRequireDefault(_curry);

var _compose = __webpack_require__("SaX8");

var _compose2 = _interopRequireDefault(_compose);

var _endsWith = __webpack_require__("i8Zq");

var _endsWith2 = _interopRequireDefault(_endsWith);

var _startsWith = __webpack_require__("6nwk");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _index = __webpack_require__("x0lo");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

var defaultPagesPaths = ['/src/pages/'];

var getPagesPaths = function getPagesPaths(options) {
  return options && options.pagesPaths || defaultPagesPaths;
};

var getLangKeyDefault = function getLangKeyDefault(options) {
  return options && options.langKeyDefault || options;
};

var addSlashStart = function addSlashStart(fileName) {
  return (0, _startsWith2.default)('/', fileName) ? fileName : '/' + fileName;
};

var addSlashEnd = function addSlashEnd(fileName) {
  return (0, _endsWith2.default)('/', fileName) ? fileName : fileName + '/';
};

var addSlash = (0, _compose2.default)(addSlashStart, addSlashEnd);
/**
 * Get slug (path) and langKey for a given file path.
 *
 * Used by gatsby-plugin-i18n and gatsby-plugin-i18n-tags
 *
 * @param {{langKeyDefault: string, pagesPaths: string[], prefixDefault: boolean }} options plugin options
 * @param {String} fileAbsolutePath local file absolute path
 * @return {{slug: string, langKey: string, redirectTo: string}} slug and langKey
 */

var getSlugAndLang = (0, _curry2.default)(function (options, fileAbsolutePath) {
  var slugsAndLangs = getPagesPaths(options).map(function (pagesPath) {
    var filePath = ('safeStartToSplit-' + fileAbsolutePath).split(pagesPath)[1];

    if ((0, _isNil2.default)(filePath)) {
      return null;
    }

    var langKeyDefault = getLangKeyDefault(options);
    var fileName = filePath.split('.');
    var langKey = fileName.length === 3 ? fileName[1] : langKeyDefault;
    var title = addSlash(fileName[0].replace('index', ''));
    var slug = fileName.length === 3 ? (0, _index.addLangKeyToSlug)(title, langKey, options) : title;
    return {
      slug: slug,
      langKey: langKey,
      redirectTo: slug === '/' ? addSlash(langKeyDefault) : null
    };
  });
  return (0, _head2.default)(slugsAndLangs.filter((0, _compose2.default)(_not2.default, _isNil2.default)));
});
exports.default = getSlugAndLang;

/***/ }),

/***/ "RvjR":
/***/ (function(module, exports, __webpack_require__) {

var nth = __webpack_require__("QT9C");
/**
 * Returns the first element of the given list or string. In some libraries
 * this function is named `first`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> a | Undefined
 * @sig String -> String
 * @param {Array|String} list
 * @return {*}
 * @see R.tail, R.init, R.last
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 *
 *      R.head('abc'); //=> 'a'
 *      R.head(''); //=> ''
 */


module.exports = nth(0);

/***/ }),

/***/ "SK8o":
/***/ (function(module, exports, __webpack_require__) {

var _curry3 = __webpack_require__("DjAY");

var _reduce = __webpack_require__("wQFJ");
/**
 * Returns a single item by iterating through the list, successively calling
 * the iterator function and passing it an accumulator value and the current
 * value from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It may use
 * [`R.reduced`](#reduced) to shortcut the iteration.
 *
 * The arguments' order of [`reduceRight`](#reduceRight)'s iterator function
 * is *(value, acc)*.
 *
 * Note: `R.reduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * Dispatches to the `reduce` method of the third argument, if present. When
 * doing so, it is up to the user to handle the [`R.reduced`](#reduced)
 * shortcuting, as this is not implemented by `reduce`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array.
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      R.reduce(R.subtract, 0, [1, 2, 3, 4]) // => ((((0 - 1) - 2) - 3) - 4) = -10
 *                -               -10
 *               / \              / \
 *              -   4           -6   4
 *             / \              / \
 *            -   3   ==>     -3   3
 *           / \              / \
 *          -   2           -1   2
 *         / \              / \
 *        0   1            0   1
 *
 * @symb R.reduce(f, a, [b, c, d]) = f(f(f(a, b), c), d)
 */


module.exports = _curry3(_reduce);

/***/ }),

/***/ "SaX8":
/***/ (function(module, exports, __webpack_require__) {

var pipe = __webpack_require__("1DYX");

var reverse = __webpack_require__("QXSC");
/**
 * Performs right-to-left function composition. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.pipe
 * @example
 *
 *      var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
 *      var yellGreeting = R.compose(R.toUpper, classyGreeting);
 *      yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
 *
 *      R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
 *
 * @symb R.compose(f, g, h)(a, b) = f(g(h(a, b)))
 */


module.exports = function compose() {
  if (arguments.length === 0) {
    throw new Error('compose requires at least one argument');
  }

  return pipe.apply(this, reverse(arguments));
};

/***/ }),

/***/ "TD0+":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _dispatchable = __webpack_require__("9gHp");

var _filter = __webpack_require__("b91Z");

var _isObject = __webpack_require__("7BTi");

var _reduce = __webpack_require__("wQFJ");

var _xfilter = __webpack_require__("7ZZO");

var keys = __webpack_require__("7e6P");
/**
 * Takes a predicate and a `Filterable`, and returns a new filterable of the
 * same type containing the members of the given filterable which satisfy the
 * given predicate. Filterable objects include plain objects or any object
 * that has a filter method such as `Array`.
 *
 * Dispatches to the `filter` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Filterable f => (a -> Boolean) -> f a -> f a
 * @param {Function} pred
 * @param {Array} filterable
 * @return {Array} Filterable
 * @see R.reject, R.transduce, R.addIndex
 * @example
 *
 *      var isEven = n => n % 2 === 0;
 *
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 *
 *      R.filter(isEven, {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, d: 4}
 */


module.exports = _curry2(_dispatchable(['filter'], _xfilter, function (pred, filterable) {
  return _isObject(filterable) ? _reduce(function (acc, key) {
    if (pred(filterable[key])) {
      acc[key] = filterable[key];
    }

    return acc;
  }, {}, keys(filterable)) : // else
  _filter(pred, filterable);
}));

/***/ }),

/***/ "TGFc":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _reduced = __webpack_require__("Vj6a");

var _xfBase = __webpack_require__("rJtk");

module.exports = function () {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
    this.i = 0;
  }

  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;

  XTake.prototype['@@transducer/step'] = function (result, input) {
    this.i += 1;
    var ret = this.n === 0 ? result : this.xf['@@transducer/step'](result, input);
    return this.n >= 0 && this.i >= this.n ? _reduced(ret) : ret;
  };

  return _curry2(function _xtake(n, xf) {
    return new XTake(n, xf);
  });
}();

/***/ }),

/***/ "TVCR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
}; //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


module.exports = function (method, maybeObject) {
  if ((typeof maybeObject === 'undefined' ? 'undefined' : _typeof(maybeObject)) !== 'object') {
    throw new TypeError(method + ' expects an Object, but was given ' + maybeObject + '.');
  }
};

/***/ }),

/***/ "Tgsh":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var drop = __webpack_require__("F0ff");
/**
 * Returns a new list containing the last `n` elements of the given list.
 * If `n > list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [a]
 * @sig Number -> String -> String
 * @param {Number} n The number of elements to return.
 * @param {Array} xs The collection to consider.
 * @return {Array}
 * @see R.dropLast
 * @example
 *
 *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
 *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
 *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
 *      R.takeLast(3, 'ramda');               //=> 'mda'
 */


module.exports = _curry2(function takeLast(n, xs) {
  return drop(n >= 0 ? xs.length - n : 0, xs);
});

/***/ }),

/***/ "UYkW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: experimental
 * name: module folktale/adt/union
 */

module.exports = {
  union: __webpack_require__("6B8Y"),
  derivations: __webpack_require__("B5EB")
};

/***/ }),

/***/ "UhbJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var mm = Symbol.for('@@meta:magical');

var copyDocumentation = function copyDocumentation(source, target) {
  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (({}).FOLKTALE_DOCS !== 'false') {
    target[mm] = Object.assign({}, source[mm] || {}, extensions);
  }
};

module.exports = copyDocumentation;

/***/ }),

/***/ "V7Sg":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var curryN = __webpack_require__("ZOtD");
/**
 * Returns a curried equivalent of the provided function. The curried function
 * has two unusual capabilities. First, its arguments needn't be provided one
 * at a time. If `f` is a ternary function and `g` is `R.curry(f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curryN
 * @example
 *
 *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
 *
 *      var curriedAddFourNumbers = R.curry(addFourNumbers);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


module.exports = _curry1(function curry(fn) {
  return curryN(fn.length, fn);
});

/***/ }),

/***/ "Vj6a":
/***/ (function(module, exports) {

module.exports = function _reduced(x) {
  return x && x['@@transducer/reduced'] ? x : {
    '@@transducer/value': x,
    '@@transducer/reduced': true
  };
};

/***/ }),

/***/ "W6Rk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* jslint esnext: true */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var core_1 = __webpack_require__("HKjm");

var en_1 = __webpack_require__("HzlJ");

core_1.default.__addLocaleData(en_1.default);

core_1.default.defaultLocale = 'en';
exports.default = core_1.default;

/***/ }),

/***/ "Wnyi":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _isPlaceholder = __webpack_require__("ABxe");
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


module.exports = function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
};

/***/ }),

/***/ "X53C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _startsWith = __webpack_require__("6nwk");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _filter = __webpack_require__("TD0+");

var _filter2 = _interopRequireDefault(_filter);

var _isNil = __webpack_require__("4Q1U");

var _isNil2 = _interopRequireDefault(_isNil);

var _curry = __webpack_require__("V7Sg");

var _curry2 = _interopRequireDefault(_curry);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Get valid langKey in langs or return defaultLangKey
 * @func
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @returns {String} valid langKey
 */


var getValidLangKey = (0, _curry2.default)(function (langs, defaultLangKey, langKey) {
  if ((0, _isNil2.default)(langKey)) {
    return defaultLangKey;
  }

  var currentLangKey = (0, _filter2.default)(function (l) {
    return (0, _startsWith2.default)(l, langKey);
  }, langs);
  return currentLangKey[0] || defaultLangKey;
});
exports.default = getValidLangKey;

/***/ }),

/***/ "XImm":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("E1XU"),
    Success = _require.Success,
    Failure = _require.Failure;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Validation b a
 */


var maybeToValidation = function maybeToValidation(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Failure(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Success(value);
    }
  });
};

module.exports = maybeToValidation;

/***/ }),

/***/ "XUei":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
  this.locales = locales;
  this.formats = formats;
  this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
  this.pluralStack = [];
  this.currentPlural = null;
  this.pluralNumberFormat = null;
  return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
  if (!(ast && ast.type === 'messageFormatPattern')) {
    throw new Error('Message AST is not of type: "messageFormatPattern"');
  }

  var elements = ast.elements,
      pattern = [];
  var i, len, element;

  for (i = 0, len = elements.length; i < len; i += 1) {
    element = elements[i];

    switch (element.type) {
      case 'messageTextElement':
        pattern.push(this.compileMessageText(element));
        break;

      case 'argumentElement':
        pattern.push(this.compileArgument(element));
        break;

      default:
        throw new Error('Message element does not have a valid type');
    }
  }

  return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
  // When this `element` is part of plural sub-pattern and its value contains
  // an unescaped '#', use a `PluralOffsetString` helper to properly output
  // the number with the correct offset in the string.
  if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
    // Create a cache a NumberFormat instance that can be reused for any
    // PluralOffsetString instance in this message.
    if (!this.pluralNumberFormat) {
      this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
    }

    return new PluralOffsetString(this.currentPlural.id, this.currentPlural.format.offset, this.pluralNumberFormat, element.value);
  } // Unescape the escaped '#'s in the message text.


  return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
  var format = element.format;

  if (!format) {
    return new StringFormat(element.id);
  }

  var formats = this.formats,
      locales = this.locales,
      pluralFn = this.pluralFn,
      options;

  switch (format.type) {
    case 'numberFormat':
      options = formats.number[format.style];
      return {
        id: element.id,
        format: new Intl.NumberFormat(locales, options).format
      };

    case 'dateFormat':
      options = formats.date[format.style];
      return {
        id: element.id,
        format: new Intl.DateTimeFormat(locales, options).format
      };

    case 'timeFormat':
      options = formats.time[format.style];
      return {
        id: element.id,
        format: new Intl.DateTimeFormat(locales, options).format
      };

    case 'pluralFormat':
      options = this.compileOptions(element);
      return new PluralFormat(element.id, format.ordinal, format.offset, options, pluralFn);

    case 'selectFormat':
      options = this.compileOptions(element);
      return new SelectFormat(element.id, options);

    default:
      throw new Error('Message element does not have a valid format type');
  }
};

Compiler.prototype.compileOptions = function (element) {
  var format = element.format,
      options = format.options,
      optionsHash = {}; // Save the current plural element, if any, then set it to a new value when
  // compiling the options sub-patterns. This conforms the spec's algorithm
  // for handling `"#"` syntax in message text.

  this.pluralStack.push(this.currentPlural);
  this.currentPlural = format.type === 'pluralFormat' ? element : null;
  var i, len, option;

  for (i = 0, len = options.length; i < len; i += 1) {
    option = options[i]; // Compile the sub-pattern and save it under the options's selector.

    optionsHash[option.selector] = this.compileMessage(option.value);
  } // Pop the plural stack to put back the original current plural value.


  this.currentPlural = this.pluralStack.pop();
  return optionsHash;
}; // -- Compiler Helper Classes --------------------------------------------------


function StringFormat(id) {
  this.id = id;
}

StringFormat.prototype.format = function (value) {
  if (!value && typeof value !== 'number') {
    return '';
  }

  return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
  this.id = id;
  this.useOrdinal = useOrdinal;
  this.offset = offset;
  this.options = options;
  this.pluralFn = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
  var options = this.options;
  var option = options['=' + value] || options[this.pluralFn(value - this.offset, this.useOrdinal)];
  return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
  this.id = id;
  this.offset = offset;
  this.numberFormat = numberFormat;
  this.string = string;
}

PluralOffsetString.prototype.format = function (value) {
  var number = this.numberFormat.format(value - this.offset);
  return this.string.replace(/(^|[^\\])#/g, '$1' + number).replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
  this.id = id;
  this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
  var options = this.options;
  return options[value] || options.other;
};

/***/ }),

/***/ "ZOtD":
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__("ALMR");

var _curry1 = __webpack_require__("cOqj");

var _curry2 = __webpack_require__("Wnyi");

var _curryN = __webpack_require__("r8KN");
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */


module.exports = _curry2(function curryN(length, fn) {
  if (length === 1) {
    return _curry1(fn);
  }

  return _arity(length, _curryN(length, [], fn));
});

/***/ }),

/***/ "ZhWT":
/***/ (function(module, exports) {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */
var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView; // Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.1
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;
    var length, i, keys;

    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (!equal(a[i], b[i])) return false;
      }

      return true;
    } // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.


    var it;

    if (hasMap && a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      it = a.entries();

      while (!(i = it.next()).done) {
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      }

      return true;
    }

    if (hasSet && a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) return false;
      it = a.entries();

      while (!(i = it.next()).done) {
        if (!b.has(i.value[0])) return false;
      }

      return true;
    } // END: Modifications


    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;

      for (i = length; i-- !== 0;) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    } // END: fast-deep-equal
    // START: react-fast-compare
    // custom handling for DOM elements


    if (hasElementType && a instanceof Element) return false; // custom handling for React/Preact

    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements
        continue;
      } // all other properties should be traversed as usual


      if (!equal(a[keys[i]], b[keys[i]])) return false;
    } // END: react-fast-compare
    // START: fast-deep-equal


    return true;
  }

  return a !== a && b !== b;
} // end fast-deep-equal


module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if ((error.message || '').match(/stack|recursion/i)) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    } // some other error. we should definitely know about these


    throw error;
  }
};

/***/ }),

/***/ "Zy53":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__("oOsv")['default'];
exports['default'] = exports;

/***/ }),

/***/ "a2QF":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _isArguments = __webpack_require__("l7rt");

var _isArray = __webpack_require__("hOtR");

var _isObject = __webpack_require__("7BTi");

var _isString = __webpack_require__("F3Iy");
/**
 * Returns the empty value of its argument's type. Ramda defines the empty
 * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments. Other
 * types are supported if they define `<Type>.empty` and/or
 * `<Type>.prototype.empty`.
 *
 * Dispatches to the `empty` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category Function
 * @sig a -> a
 * @param {*} x
 * @return {*}
 * @example
 *
 *      R.empty(Just(42));      //=> Nothing()
 *      R.empty([1, 2, 3]);     //=> []
 *      R.empty('unicorns');    //=> ''
 *      R.empty({x: 1, y: 2});  //=> {}
 */


module.exports = _curry1(function empty(x) {
  return x != null && typeof x['fantasy-land/empty'] === 'function' ? x['fantasy-land/empty']() : x != null && x.constructor != null && typeof x.constructor['fantasy-land/empty'] === 'function' ? x.constructor['fantasy-land/empty']() : x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
    return arguments;
  }() : // else
  void 0;
});

/***/ }),

/***/ "aGJD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__("JbWX"); // Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License


var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};

var objCreate = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (src$utils$$.hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }

  return obj;
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate;

/***/ }),

/***/ "b/Vg":
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__("/Ubj");

var _curry3 = __webpack_require__("DjAY");
/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */


module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  return Array.prototype.slice.call(list, fromIndex, toIndex);
}));

/***/ }),

/***/ "b2+F":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("5tHe"),
    Error = _require.Error,
    Ok = _require.Ok;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *      (Validation a b) => Result a b
 */


var validationToResult = function validationToResult(aValidation) {
  return aValidation.matchWith({
    Failure: function Failure(_ref) {
      var value = _ref.value;
      return Error(value);
    },
    Success: function Success(_ref2) {
      var value = _ref2.value;
      return Ok(value);
    }
  });
};

module.exports = validationToResult;

/***/ }),

/***/ "b91Z":
/***/ (function(module, exports) {

module.exports = function _filter(fn, list) {
  var idx = 0;
  var len = list.length;
  var result = [];

  while (idx < len) {
    if (fn(list[idx])) {
      result[result.length] = list[idx];
    }

    idx += 1;
  }

  return result;
};

/***/ }),

/***/ "cOqj":
/***/ (function(module, exports, __webpack_require__) {

var _isPlaceholder = __webpack_require__("ABxe");
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


module.exports = function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

/***/ }),

/***/ "cnAB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability : stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity : O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) => Array 'a
 */

var values = function values(object) {
  return Object.keys(object).map(function (k) {
    return object[k];
  });
}; // --[ Exports ]-------------------------------------------------------


module.exports = values;

/***/ }),

/***/ "d1Y1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var copyDocs = __webpack_require__("UhbJ");

var defineAdtMethod = function defineAdtMethod(adt, definitions) {
  Object.keys(definitions).forEach(function (name) {
    var methods = definitions[name];
    adt.variants.forEach(function (variant) {
      var method = methods[variant.tag];

      if (!method) {
        throw new TypeError('Method ' + name + ' not defined for ' + variant.tag);
      }

      copyDocs(methods, method);
      variant.prototype[name] = method;
    });
  });
};

module.exports = defineAdtMethod;

/***/ }),

/***/ "dtAR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("5tHe"),
    Error = _require.Error,
    Ok = _require.Ok;
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 * 
 * type: |
 *   forall a, b:
 *     (Maybe a, b) => Result b a
 */


var maybeToResult = function maybeToResult(aMaybe, failureValue) {
  return aMaybe.matchWith({
    Nothing: function Nothing() {
      return Error(failureValue);
    },
    Just: function Just(_ref) {
      var value = _ref.value;
      return Ok(value);
    }
  });
};

module.exports = maybeToResult;

/***/ }),

/***/ "etOE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isEmpty = __webpack_require__("IS96");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _not = __webpack_require__("yBOd");

var _not2 = _interopRequireDefault(_not);

var _compose = __webpack_require__("SaX8");

var _compose2 = _interopRequireDefault(_compose);

var _contains = __webpack_require__("rOAg");

var _contains2 = _interopRequireDefault(_contains);

var _filter = __webpack_require__("TD0+");

var _filter2 = _interopRequireDefault(_filter);

var _getPagesPaths = __webpack_require__("BPn/");

var _getPagesPaths2 = _interopRequireDefault(_getPagesPaths);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/*
 * Checks if a path is in options.pagesPaths
 * @sig Options -> String -> Boolean
 * @param {{pagesPaths: string[]}} options plugin options
 * @param {String} path path to check
 * @return {Result<Boolean>} is in
 */


var isInPagesPaths = function isInPagesPaths(options, path) {
  return (0, _getPagesPaths2.default)(options).map((0, _filter2.default)(function (pagePath) {
    return (0, _contains2.default)(pagePath, path);
  })).map((0, _compose2.default)(_not2.default, _isEmpty2.default));
};

exports.default = isInPagesPaths;

/***/ }),

/***/ "fNJh":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__("JbWX"),
    src$es5$$ = __webpack_require__("aGJD"),
    src$compiler$$ = __webpack_require__("XUei"),
    intl$messageformat$parser$$ = __webpack_require__("Zy53");

exports["default"] = MessageFormat; // -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
  // Parse string messages into an AST.
  var ast = typeof message === 'string' ? MessageFormat.__parse(message) : message;

  if (!(ast && ast.type === 'messageFormatPattern')) {
    throw new TypeError('A message must be provided as a String or AST.');
  } // Creates a new object with the specified `formats` merged with the default
  // formats.


  formats = this._mergeFormats(MessageFormat.formats, formats); // Defined first because it's used to build the format pattern.

  src$es5$$.defineProperty(this, '_locale', {
    value: this._resolveLocale(locales)
  }); // Compile the `ast` to a pattern that is highly optimized for repeated
  // `format()` invocations. **Note:** This passes the `locales` set provided
  // to the constructor instead of just the resolved locale.

  var pluralFn = this._findPluralRuleFunction(this._locale);

  var pattern = this._compilePattern(ast, locales, formats, pluralFn); // "Bind" `format()` method to `this` so it can be passed by reference like
  // the other `Intl` APIs.


  var messageFormat = this;

  this.format = function (values) {
    try {
      return messageFormat._format(pattern, values);
    } catch (e) {
      if (e.variableId) {
        throw new Error('The intl string context variable \'' + e.variableId + '\'' + ' was not provided to the string \'' + message + '\'');
      } else {
        throw e;
      }
    }
  };
} // Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.


src$es5$$.defineProperty(MessageFormat, 'formats', {
  enumerable: true,
  value: {
    number: {
      'currency': {
        style: 'currency'
      },
      'percent': {
        style: 'percent'
      }
    },
    date: {
      'short': {
        month: 'numeric',
        day: 'numeric',
        year: '2-digit'
      },
      'medium': {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      },
      'long': {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      'full': {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    },
    time: {
      'short': {
        hour: 'numeric',
        minute: 'numeric'
      },
      'medium': {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      },
      'long': {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      },
      'full': {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      }
    }
  }
}); // Define internal private properties for dealing with locale data.

src$es5$$.defineProperty(MessageFormat, '__localeData__', {
  value: src$es5$$.objCreate(null)
});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {
  value: function value(data) {
    if (!(data && data.locale)) {
      throw new Error('Locale data provided to IntlMessageFormat is missing a ' + '`locale` property');
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
  }
}); // Defines `__parse()` static method as an exposed private.

src$es5$$.defineProperty(MessageFormat, '__parse', {
  value: intl$messageformat$parser$$["default"].parse
}); // Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.

src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
  enumerable: true,
  writable: true,
  value: undefined
});

MessageFormat.prototype.resolvedOptions = function () {
  // TODO: Provide anything else?
  return {
    locale: this._locale
  };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
  var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
  return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
  var localeData = MessageFormat.__localeData__;
  var data = localeData[locale.toLowerCase()]; // The locale data is de-duplicated, so we have to traverse the locale's
  // hierarchy until we find a `pluralRuleFunction` to return.

  while (data) {
    if (data.pluralRuleFunction) {
      return data.pluralRuleFunction;
    }

    data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
  }

  throw new Error('Locale data added to IntlMessageFormat is missing a ' + '`pluralRuleFunction` for :' + locale);
};

MessageFormat.prototype._format = function (pattern, values) {
  var result = '',
      i,
      len,
      part,
      id,
      value,
      err;

  for (i = 0, len = pattern.length; i < len; i += 1) {
    part = pattern[i]; // Exist early for string parts.

    if (typeof part === 'string') {
      result += part;
      continue;
    }

    id = part.id; // Enforce that all required values are provided by the caller.

    if (!(values && src$utils$$.hop.call(values, id))) {
      err = new Error('A value must be provided for: ' + id);
      err.variableId = id;
      throw err;
    }

    value = values[id]; // Recursively format plural and select parts' option — which can be a
    // nested pattern structure. The choosing of the option to use is
    // abstracted-by and delegated-to the part helper object.

    if (part.options) {
      result += this._format(part.getOption(value), values);
    } else {
      result += part.format(value);
    }
  }

  return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
  var mergedFormats = {},
      type,
      mergedType;

  for (type in defaults) {
    if (!src$utils$$.hop.call(defaults, type)) {
      continue;
    }

    mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

    if (formats && src$utils$$.hop.call(formats, type)) {
      src$utils$$.extend(mergedType, formats[type]);
    }
  }

  return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
  if (typeof locales === 'string') {
    locales = [locales];
  } // Create a copy of the array so we can push on the default locale.


  locales = (locales || []).concat(MessageFormat.defaultLocale);
  var localeData = MessageFormat.__localeData__;
  var i, len, localeParts, data; // Using the set of locales + the default locale, we look for the first one
  // which that has been registered. When data does not exist for a locale, we
  // traverse its ancestors to find something that's been registered within
  // its hierarchy of locales. Since we lack the proper `parentLocale` data
  // here, we must take a naive approach to traversal.

  for (i = 0, len = locales.length; i < len; i += 1) {
    localeParts = locales[i].toLowerCase().split('-');

    while (localeParts.length) {
      data = localeData[localeParts.join('-')];

      if (data) {
        // Return the normalized locale string; e.g., we return "en-US",
        // instead of "en-us".
        return data.locale;
      }

      localeParts.pop();
    }
  }

  var defaultLocale = locales.pop();
  throw new Error('No locale data has been added to IntlMessageFormat for: ' + locales.join(', ') + ', or the default locale: ' + defaultLocale);
};

/***/ }),

/***/ "gnJF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("6B8Y"),
    typeSymbol = _require.typeSymbol;

module.exports = function (type) {
  return function (method, value) {
    var typeName = type[typeSymbol];

    if (({}).FOLKTALE_ASSERTIONS !== 'none' && !type.isPrototypeOf(value)) {
      console.warn(typeName + '.' + method + ' expects a value of the same type, but was given ' + value + '.');

      if (({}).FOLKTALE_ASSERTIONS !== 'minimal') {
        console.warn('\nThis could mean that you\'ve provided the wrong value to the method, in\nwhich case this is a bug in your program, and you should try to track\ndown why the wrong value is getting here.\n\nBut this could also mean that you have more than one ' + typeName + ' library\ninstantiated in your program. This is not **necessarily** a bug, it\ncould happen for several reasons:\n\n 1) You\'re loading the library in Node, and Node\'s cache didn\'t give\n    you back the same instance you had previously requested.\n\n 2) You have more than one Code Realm in your program, and objects\n    created from the same library, in different realms, are interacting.\n\n 3) You have a version conflict of folktale libraries, and objects\n    created from different versions of the library are interacting.\n\nIf your situation fits the cases (1) or (2), you are okay, as long as\nthe objects originate from the same version of the library. Folktale\ndoes not rely on reference checking, only structural checking. However\nyou\'ll want to watch out if you\'re modifying the ' + typeName + "'s prototype,\nbecause you'll have more than one of them, and you'll want to make\nsure you do the same change in all of them \u2014 ideally you shouldn't\nbe modifying the object, though.\n\nIf your situation fits the case (3), you are *probably* okay if the\nversion difference isn't a major one. However, at this point the\nbehaviour of your program using " + typeName + ' is undefined, and you should\ntry looking into why the version conflict is happening.\n\nParametric modules can help ensuring your program only has a single\ninstance of the folktale library. Check out the Folktale Architecture\ndocumentation for more information.\n      ');
      }
    }
  };
};

/***/ }),

/***/ "hOtR":
/***/ (function(module, exports) {

/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
module.exports = Array.isArray || function _isArray(val) {
  return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
};

/***/ }),

/***/ "hTlr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/gatsby-link/index.js
var gatsby_link = __webpack_require__("+ZDr");
var gatsby_link_default = /*#__PURE__*/__webpack_require__.n(gatsby_link);

// EXTERNAL MODULE: ./node_modules/react-intl/lib/index.es.js + 1 modules
var index_es = __webpack_require__("JRPe");

// CONCATENATED MODULE: ./src/components/SelectLanguage.js
// let languages = ["English", "Português"];
// for (let language of languages) { document.write(language);}
var SelectLanguage_SelectLanguage=function SelectLanguage(props){var links=props.langs.map(function(lang){return/*#__PURE__*/react_default.a.createElement("li",{selected:lang.selected},/*#__PURE__*/react_default.a.createElement(gatsby_link_default.a,{to:lang.link,key:lang.langKey},lang.langKey));});return/*#__PURE__*/react_default.a.createElement("li",null,/*#__PURE__*/react_default.a.createElement("input",{id:"check01",type:"checkbox",name:"menu"}),/*#__PURE__*/react_default.a.createElement("label",{for:"check01"},/*#__PURE__*/react_default.a.createElement(index_es["a" /* FormattedMessage */],{id:"selectLanguage"})),/*#__PURE__*/react_default.a.createElement("ul",{class:"submenu"},links));};/* harmony default export */ var components_SelectLanguage = (SelectLanguage_SelectLanguage);
// CONCATENATED MODULE: ./src/components/Header.js
// import Link from 'gatsby-link'
var Header_Header=function Header(props){return/*#__PURE__*/react_default.a.createElement("ul",{id:"menu"},/*#__PURE__*/react_default.a.createElement(components_SelectLanguage,{langs:props.langs}));};/* harmony default export */ var components_Header = (Header_Header);
// EXTERNAL MODULE: ./node_modules/react-helmet/es/Helmet.js
var Helmet = __webpack_require__("qhky");

// EXTERNAL MODULE: ./node_modules/ptz-i18n/dist/index.js
var dist = __webpack_require__("x0lo");

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./node_modules/intl/index.js
var intl = __webpack_require__("FoZm");

// CONCATENATED MODULE: ./src/layouts/layout.js
var layout_Layout=function Layout(_ref){var children=_ref.children,location=_ref.location,i18nMessages=_ref.i18nMessages;return/*#__PURE__*/react_default.a.createElement(gatsby_browser_entry["a" /* StaticQuery */],{query:"3721576578",render:function render(data){var url=location.pathname;var _data$site$siteMetada=data.site.siteMetadata.languages,langs=_data$site$siteMetada.langs,defaultLangKey=_data$site$siteMetada.defaultLangKey;var langKey=Object(dist["getCurrentLangKey"])(langs,defaultLangKey,url);var homeLink=("/"+langKey+"/").replace("/"+defaultLangKey+"/",'/');var langsMenu=Object(dist["getLangs"])(langs,langKey,Object(dist["getUrlForLang"])(homeLink,url)).map(function(item){return Object.assign({},item,{link:item.link.replace("/"+defaultLangKey+"/",'/')});});return/*#__PURE__*/react_default.a.createElement(index_es["b" /* IntlProvider */],{locale:langKey,messages:i18nMessages},/*#__PURE__*/react_default.a.createElement("div",null,/*#__PURE__*/react_default.a.createElement(Helmet["a" /* default */],{title:"Suru++ Folders",meta:[{name:'description',content:'Sample'},{name:'keywords',content:'sample, something'}]}),/*#__PURE__*/react_default.a.createElement(components_Header,{langs:langsMenu}),/*#__PURE__*/react_default.a.createElement("div",{style:{margin:'0 auto',maxWidth:960,padding:'0px 1.0875rem 1.45rem',paddingTop:0}},children)));}});};/* harmony default export */ var layout = __webpack_exports__["a"] = (layout_Layout);

/***/ }),

/***/ "i8Zq":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var equals = __webpack_require__("1s4d");

var takeLast = __webpack_require__("Tgsh");
/**
 * Checks if a list ends with the provided values
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category List
 * @sig [a] -> Boolean
 * @sig String -> Boolean
 * @param {*} suffix
 * @param {*} list
 * @return {Boolean}
 * @example
 *
 *      R.endsWith('c', 'abc')                //=> true
 *      R.endsWith('b', 'abc')                //=> false
 *      R.endsWith(['c'], ['a', 'b', 'c'])    //=> true
 *      R.endsWith(['b'], ['a', 'b', 'c'])    //=> false
 */


module.exports = _curry2(function (suffix, list) {
  return equals(takeLast(suffix.length, list), suffix);
});

/***/ }),

/***/ "iJhd":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");
/**
 * Returns true if its arguments are identical, false otherwise. Values are
 * identical if they reference the same memory. `NaN` is identical to `NaN`;
 * `0` and `-0` are not identical.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> a -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      var o = {};
 *      R.identical(o, o); //=> true
 *      R.identical(1, 1); //=> true
 *      R.identical(1, '1'); //=> false
 *      R.identical([], []); //=> false
 *      R.identical(0, -0); //=> false
 *      R.identical(NaN, NaN); //=> true
 */


module.exports = _curry2(function identical(a, b) {
  // SameValue algorithm
  if (a === b) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return a !== 0 || 1 / a === 1 / b;
  } else {
    // Step 6.a: NaN == NaN
    return a !== a && b !== b;
  }
});

/***/ }),

/***/ "jBYB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* jslint esnext: true */

var round = Math.round;

function daysToYears(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  return days * 400 / 146097;
} // Thanks to date-fns
// https://github.com/date-fns/date-fns
// MIT © Sasha Koss


var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;

function startOfDay(dirtyDate) {
  var date = new Date(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE; // Round the number of days to the nearest integer
  // because the number of milliseconds in a day is not constant
  // (e.g. it's different in the day of the daylight saving time clock shift)

  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}

function default_1(from, to) {
  // Convert to ms timestamps.
  from = +from;
  to = +to;
  var millisecond = round(to - from),
      second = round(millisecond / 1000),
      minute = round(second / 60),
      hour = round(minute / 60); // We expect a more precision in rounding when dealing with
  // days as it feels wrong when something happended 13 hours ago and
  // is regarded as "yesterday" even if the time was this morning.

  var day = differenceInCalendarDays(to, from);
  var week = round(day / 7);
  var rawYears = daysToYears(day),
      month = round(rawYears * 12),
      year = round(rawYears);
  return {
    millisecond: millisecond,
    second: second,
    'second-short': second,
    minute: minute,
    'minute-short': minute,
    hour: hour,
    'hour-short': hour,
    day: day,
    'day-short': day,
    week: week,
    'week-short': week,
    month: month,
    'month-short': month,
    year: year,
    'year-short': year
  };
}

exports.default = default_1;

/***/ }),

/***/ "l7q6":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");

var _isArray = __webpack_require__("hOtR");

var _isString = __webpack_require__("F3Iy");
/**
 * Tests whether or not an object is similar to an array.
 *
 * @private
 * @category Type
 * @category List
 * @sig * -> Boolean
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      _isArrayLike([]); //=> true
 *      _isArrayLike(true); //=> false
 *      _isArrayLike({}); //=> false
 *      _isArrayLike({length: 10}); //=> false
 *      _isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */


module.exports = _curry1(function isArrayLike(x) {
  if (_isArray(x)) {
    return true;
  }

  if (!x) {
    return false;
  }

  if (typeof x !== 'object') {
    return false;
  }

  if (_isString(x)) {
    return false;
  }

  if (x.nodeType === 1) {
    return !!x.length;
  }

  if (x.length === 0) {
    return true;
  }

  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }

  return false;
});

/***/ }),

/***/ "l7rt":
/***/ (function(module, exports, __webpack_require__) {

var _has = __webpack_require__("Av+g");

module.exports = function () {
  var toString = Object.prototype.toString;
  return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
    return toString.call(x) === '[object Arguments]';
  } : function _isArguments(x) {
    return _has('callee', x);
  };
}();

/***/ }),

/***/ "lVBX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__("fNJh"),
    src$en$$ = __webpack_require__("R5jr");

src$core$$["default"].__addLocaleData(src$en$$["default"]);

src$core$$["default"].defaultLocale = 'en';
exports["default"] = src$core$$["default"];

/***/ }),

/***/ "mGu+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = {
  equals: 'fantasy-land/equals',
  concat: 'fantasy-land/concat',
  empty: 'fantasy-land/empty',
  map: 'fantasy-land/map',
  ap: 'fantasy-land/ap',
  of: 'fantasy-land/of',
  alt: 'fantasy-land/alt',
  reduce: 'fantasy-land/reduce',
  traverse: 'fantasy-land/traverse',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  extend: 'fantasy-land/extend',
  extract: 'fantasy-land/extract',
  bimap: 'fantasy-land/bimap',
  promap: 'fantasy-land/promap'
};

/***/ }),

/***/ "msMc":
/***/ (function(module, exports, __webpack_require__) {

var _curry2 = __webpack_require__("Wnyi");

var _xfBase = __webpack_require__("rJtk");

module.exports = function () {
  function XDrop(n, xf) {
    this.xf = xf;
    this.n = n;
  }

  XDrop.prototype['@@transducer/init'] = _xfBase.init;
  XDrop.prototype['@@transducer/result'] = _xfBase.result;

  XDrop.prototype['@@transducer/step'] = function (result, input) {
    if (this.n > 0) {
      this.n -= 1;
      return result;
    }

    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xdrop(n, xf) {
    return new XDrop(n, xf);
  });
}();

/***/ }),

/***/ "oOsv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = function () {
  "use strict";
  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }

    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser = this,
        peg$FAILED = {},
        peg$startRuleFunctions = {
      start: peg$parsestart
    },
        peg$startRuleFunction = peg$parsestart,
        peg$c0 = function peg$c0(elements) {
      return {
        type: 'messageFormatPattern',
        elements: elements,
        location: location()
      };
    },
        peg$c1 = function peg$c1(text) {
      var string = '',
          i,
          j,
          outerLen,
          inner,
          innerLen;

      for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
        inner = text[i];

        for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
          string += inner[j];
        }
      }

      return string;
    },
        peg$c2 = function peg$c2(messageText) {
      return {
        type: 'messageTextElement',
        value: messageText,
        location: location()
      };
    },
        peg$c3 = /^[^ \t\n\r,.+={}#]/,
        peg$c4 = {
      type: "class",
      value: "[^ \\t\\n\\r,.+={}#]",
      description: "[^ \\t\\n\\r,.+={}#]"
    },
        peg$c5 = "{",
        peg$c6 = {
      type: "literal",
      value: "{",
      description: "\"{\""
    },
        peg$c7 = ",",
        peg$c8 = {
      type: "literal",
      value: ",",
      description: "\",\""
    },
        peg$c9 = "}",
        peg$c10 = {
      type: "literal",
      value: "}",
      description: "\"}\""
    },
        peg$c11 = function peg$c11(id, format) {
      return {
        type: 'argumentElement',
        id: id,
        format: format && format[2],
        location: location()
      };
    },
        peg$c12 = "number",
        peg$c13 = {
      type: "literal",
      value: "number",
      description: "\"number\""
    },
        peg$c14 = "date",
        peg$c15 = {
      type: "literal",
      value: "date",
      description: "\"date\""
    },
        peg$c16 = "time",
        peg$c17 = {
      type: "literal",
      value: "time",
      description: "\"time\""
    },
        peg$c18 = function peg$c18(type, style) {
      return {
        type: type + 'Format',
        style: style && style[2],
        location: location()
      };
    },
        peg$c19 = "plural",
        peg$c20 = {
      type: "literal",
      value: "plural",
      description: "\"plural\""
    },
        peg$c21 = function peg$c21(pluralStyle) {
      return {
        type: pluralStyle.type,
        ordinal: false,
        offset: pluralStyle.offset || 0,
        options: pluralStyle.options,
        location: location()
      };
    },
        peg$c22 = "selectordinal",
        peg$c23 = {
      type: "literal",
      value: "selectordinal",
      description: "\"selectordinal\""
    },
        peg$c24 = function peg$c24(pluralStyle) {
      return {
        type: pluralStyle.type,
        ordinal: true,
        offset: pluralStyle.offset || 0,
        options: pluralStyle.options,
        location: location()
      };
    },
        peg$c25 = "select",
        peg$c26 = {
      type: "literal",
      value: "select",
      description: "\"select\""
    },
        peg$c27 = function peg$c27(options) {
      return {
        type: 'selectFormat',
        options: options,
        location: location()
      };
    },
        peg$c28 = "=",
        peg$c29 = {
      type: "literal",
      value: "=",
      description: "\"=\""
    },
        peg$c30 = function peg$c30(selector, pattern) {
      return {
        type: 'optionalFormatPattern',
        selector: selector,
        value: pattern,
        location: location()
      };
    },
        peg$c31 = "offset:",
        peg$c32 = {
      type: "literal",
      value: "offset:",
      description: "\"offset:\""
    },
        peg$c33 = function peg$c33(number) {
      return number;
    },
        peg$c34 = function peg$c34(offset, options) {
      return {
        type: 'pluralFormat',
        offset: offset,
        options: options,
        location: location()
      };
    },
        peg$c35 = {
      type: "other",
      description: "whitespace"
    },
        peg$c36 = /^[ \t\n\r]/,
        peg$c37 = {
      type: "class",
      value: "[ \\t\\n\\r]",
      description: "[ \\t\\n\\r]"
    },
        peg$c38 = {
      type: "other",
      description: "optionalWhitespace"
    },
        peg$c39 = /^[0-9]/,
        peg$c40 = {
      type: "class",
      value: "[0-9]",
      description: "[0-9]"
    },
        peg$c41 = /^[0-9a-f]/i,
        peg$c42 = {
      type: "class",
      value: "[0-9a-f]i",
      description: "[0-9a-f]i"
    },
        peg$c43 = "0",
        peg$c44 = {
      type: "literal",
      value: "0",
      description: "\"0\""
    },
        peg$c45 = /^[1-9]/,
        peg$c46 = {
      type: "class",
      value: "[1-9]",
      description: "[1-9]"
    },
        peg$c47 = function peg$c47(digits) {
      return parseInt(digits, 10);
    },
        peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c49 = {
      type: "class",
      value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]",
      description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]"
    },
        peg$c50 = "\\\\",
        peg$c51 = {
      type: "literal",
      value: "\\\\",
      description: "\"\\\\\\\\\""
    },
        peg$c52 = function peg$c52() {
      return '\\';
    },
        peg$c53 = "\\#",
        peg$c54 = {
      type: "literal",
      value: "\\#",
      description: "\"\\\\#\""
    },
        peg$c55 = function peg$c55() {
      return '\\#';
    },
        peg$c56 = "\\{",
        peg$c57 = {
      type: "literal",
      value: "\\{",
      description: "\"\\\\{\""
    },
        peg$c58 = function peg$c58() {
      return "{";
    },
        peg$c59 = "\\}",
        peg$c60 = {
      type: "literal",
      value: "\\}",
      description: "\"\\\\}\""
    },
        peg$c61 = function peg$c61() {
      return "}";
    },
        peg$c62 = "\\u",
        peg$c63 = {
      type: "literal",
      value: "\\u",
      description: "\"\\\\u\""
    },
        peg$c64 = function peg$c64(digits) {
      return String.fromCharCode(parseInt(digits, 16));
    },
        peg$c65 = function peg$c65(chars) {
      return chars.join('');
    },
        peg$currPos = 0,
        peg$savedPos = 0,
        peg$posDetailsCache = [{
      line: 1,
      column: 1,
      seenCR: false
    }],
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(null, [{
        type: "other",
        description: description
      }], input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
    }

    function error(message) {
      throw peg$buildException(message, null, input.substring(peg$savedPos, peg$currPos), peg$computeLocation(peg$savedPos, peg$currPos));
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p,
          ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;

        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line: details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);

          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }

            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails = peg$computePosDetails(endPos);
      return {
        start: {
          offset: startPos,
          line: startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line: endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;
        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\f/g, '\\f').replace(/\r/g, '\\r').replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return '\\x0' + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return '\\x' + hex(ch);
          }).replace(/[\u0100-\u0FFF]/g, function (ch) {
            return "\\u0" + hex(ch);
          }).replace(/[\u1000-\uFFFF]/g, function (ch) {
            return "\\u" + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];
        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";
        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, location);
    }

    function peg$parsestart() {
      var s0;
      s0 = peg$parsemessageFormatPattern();
      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();

      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;
      s0 = peg$parsemessageTextElement();

      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();

      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();

        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();

          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();

          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
      }

      s0 = s1;

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;
      s0 = peg$currPos;
      s1 = peg$parsemessageText();

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c2(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;
      s0 = peg$parsenumber();

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];

        if (peg$c3.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c4);
          }
        }

        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);

            if (peg$c3.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c4);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }

        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c6);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;

              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c7;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c8);
                }
              }

              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();

                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();

                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }

              if (s5 === peg$FAILED) {
                s5 = null;
              }

              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();

                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c9;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;

                    if (peg$silentFails === 0) {
                      peg$fail(peg$c10);
                    }
                  }

                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;
      s0 = peg$parsesimpleFormat();

      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();

        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();

          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 6) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c13);
        }
      }

      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s1 = peg$c14;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c15);
          }
        }

        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;

          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }

          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();

            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();

              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }

          if (s3 === peg$FAILED) {
            s3 = null;
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 6) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c20);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 13) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c23);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 6) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c26);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c8);
            }
          }

          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();

            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();

              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$FAILED;
              }

              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;
      s1 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c29);
        }
      }

      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();

        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;
      s0 = peg$currPos;
      s1 = peg$parse_();

      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();

        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();

          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c6);
              }
            }

            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();

              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();

                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();

                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c9;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;

                      if (peg$silentFails === 0) {
                        peg$fail(peg$c10);
                      }
                    }

                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c30(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;
      s0 = peg$currPos;

      if (input.substr(peg$currPos, 7) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c32);
        }
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;
      s0 = peg$currPos;
      s1 = peg$parseoffset();

      if (s1 === peg$FAILED) {
        s1 = null;
      }

      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();

        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();

          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$FAILED;
          }

          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;
      peg$silentFails++;
      s0 = [];

      if (peg$c36.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c37);
        }
      }

      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);

          if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c37);
            }
          }
        }
      } else {
        s0 = peg$FAILED;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;
      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();

      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }

      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }

      peg$silentFails--;

      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c38);
        }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c39.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c40);
        }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c41.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
        }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;
      s0 = peg$currPos;

      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c44);
        }
      }

      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;

        if (peg$c45.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c46);
          }
        }

        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();

          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }

          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }

        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1);
      }

      s0 = s1;
      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;

        if (peg$silentFails === 0) {
          peg$fail(peg$c49);
        }
      }

      if (s0 === peg$FAILED) {
        s0 = peg$currPos;

        if (input.substr(peg$currPos, 2) === peg$c50) {
          s1 = peg$c50;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;

          if (peg$silentFails === 0) {
            peg$fail(peg$c51);
          }
        }

        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c52();
        }

        s0 = s1;

        if (s0 === peg$FAILED) {
          s0 = peg$currPos;

          if (input.substr(peg$currPos, 2) === peg$c53) {
            s1 = peg$c53;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;

            if (peg$silentFails === 0) {
              peg$fail(peg$c54);
            }
          }

          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55();
          }

          s0 = s1;

          if (s0 === peg$FAILED) {
            s0 = peg$currPos;

            if (input.substr(peg$currPos, 2) === peg$c56) {
              s1 = peg$c56;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;

              if (peg$silentFails === 0) {
                peg$fail(peg$c57);
              }
            }

            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c58();
            }

            s0 = s1;

            if (s0 === peg$FAILED) {
              s0 = peg$currPos;

              if (input.substr(peg$currPos, 2) === peg$c59) {
                s1 = peg$c59;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;

                if (peg$silentFails === 0) {
                  peg$fail(peg$c60);
                }
              }

              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c61();
              }

              s0 = s1;

              if (s0 === peg$FAILED) {
                s0 = peg$currPos;

                if (input.substr(peg$currPos, 2) === peg$c62) {
                  s1 = peg$c62;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;

                  if (peg$silentFails === 0) {
                    peg$fail(peg$c63);
                  }
                }

                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();

                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();

                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();

                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();

                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }

                  if (s3 !== peg$FAILED) {
                    s2 = input.substring(s2, peg$currPos);
                  } else {
                    s2 = s3;
                  }

                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c64(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();

      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$FAILED;
      }

      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c65(s1);
      }

      s0 = s1;
      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({
          type: "end",
          description: "end of input"
        });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse: peg$parse
  };
}();

/***/ }),

/***/ "obDU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* jslint esnext: true */
// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = function () {
  try {
    return !!Object.defineProperty({}, 'a', {});
  } catch (e) {
    return false;
  }
}();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;
var defineProperty = realDefineProp ? Object.defineProperty : function (obj, name, desc) {
  if ('get' in desc && obj.__defineGetter__) {
    obj.__defineGetter__(name, desc.get);
  } else if (!hop.call(obj, name) || 'value' in desc) {
    obj[name] = desc.value;
  }
};
exports.defineProperty = defineProperty;

var objCreate = Object.create || function (proto, props) {
  var obj, k;

  function F() {}

  F.prototype = proto;
  obj = new F();

  for (k in props) {
    if (hop.call(props, k)) {
      defineProperty(obj, k, props[k]);
    }
  }

  return obj;
};

exports.objCreate = objCreate;

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
  /*jshint validthis:true */
  var arr = this;

  if (!arr.length) {
    return -1;
  }

  for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
    if (arr[i] === search) {
      return i;
    }
  }

  return -1;
};

exports.arrIndexOf = arrIndexOf;

var isArray = Array.isArray || function (obj) {
  return toString.call(obj) === '[object Array]';
};

exports.isArray = isArray;

var dateNow = Date.now || function () {
  return new Date().getTime();
};

exports.dateNow = dateNow;

/***/ }),

/***/ "qhky":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export Helmet */
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("8+s/");
/* harmony import */ var react_side_effect__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_side_effect__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZhWT");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("6qGY");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_4__);





var ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
var VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src",
  TARGET: "target"
};
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = "data-react-helmet";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (encode === false) {
    return String(str);
  }

  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
  var innermostTitle = getInnermostProperty(propsList, TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);

  if (innermostTemplate && innermostTitle) {
    // use function arg to avoid need to escape $ characters
    return innermostTemplate.replace(/%s/g, function () {
      return Array.isArray(innermostTitle) ? innermostTitle.join("") : innermostTitle;
    });
  }

  var innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || undefined;
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
  return getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
  return propsList.filter(function (props) {
    return typeof props[tagType] !== "undefined";
  }).map(function (props) {
    return props[tagType];
  }).reduce(function (tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
  return propsList.filter(function (props) {
    return typeof props[TAG_NAMES.BASE] !== "undefined";
  }).map(function (props) {
    return props[TAG_NAMES.BASE];
  }).reverse().reduce(function (innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }

    return innermostBaseTag;
  }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
  // Calculate list of tags, giving priority innermost component (end of the propslist)
  var approvedSeenTags = {};
  return propsList.filter(function (props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }

    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
    }

    return false;
  }).map(function (props) {
    return props[tagName];
  }).reverse().reduce(function (approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function (tag) {
      var primaryAttributeKey = void 0;
      var keys = Object.keys(tag);

      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase(); // Special rule with link tags, since rel and href are both primary tags, rel takes priority

        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        } // Special case for innerHTML which doesn't work lowercased


        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === TAG_PROPERTIES.INNER_HTML || attributeKey === TAG_PROPERTIES.CSS_TEXT || attributeKey === TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey;
        }
      }

      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }

      var value = tag[primaryAttributeKey].toLowerCase();

      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }

      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }

      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }

      return false;
    }).reverse().forEach(function (tag) {
      return approvedTags.push(tag);
    }); // Update seen tags with tags from this instance

    var keys = Object.keys(instanceSeenTags);

    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = object_assign__WEBPACK_IMPORTED_MODULE_4___default()({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }

    return approvedTags;
  }, []).reverse();
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];

    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }

  return null;
};

var reducePropsToState = function reducePropsToState(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([TAG_PROPERTIES.HREF, TAG_PROPERTIES.TARGET], propsList),
    bodyAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(TAG_NAMES.LINK, [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(TAG_NAMES.META, [TAG_PROPERTIES.NAME, TAG_PROPERTIES.CHARSET, TAG_PROPERTIES.HTTPEQUIV, TAG_PROPERTIES.PROPERTY, TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(TAG_NAMES.NOSCRIPT, [TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(TAG_NAMES.SCRIPT, [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(TAG_NAMES.STYLE, [TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(ATTRIBUTE_NAMES.TITLE, propsList)
  };
};

var rafPolyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();

    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();

var cafPolyfill = function cafPolyfill(id) {
  return clearTimeout(id);
};

var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;

var warn = function warn(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};

var _helmetCallback = null;

var handleClientStateChange = function handleClientStateChange(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }

  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function () {
      commitTagChanges(newState, function () {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};

var commitTagChanges = function commitTagChanges(newState, cb) {
  var baseTag = newState.baseTag,
      bodyAttributes = newState.bodyAttributes,
      htmlAttributes = newState.htmlAttributes,
      linkTags = newState.linkTags,
      metaTags = newState.metaTags,
      noscriptTags = newState.noscriptTags,
      onChangeClientState = newState.onChangeClientState,
      scriptTags = newState.scriptTags,
      styleTags = newState.styleTags,
      title = newState.title,
      titleAttributes = newState.titleAttributes;
  updateAttributes(TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function (tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType],
        newTags = _tagUpdates$tagType.newTags,
        oldTags = _tagUpdates$tagType.oldTags;

    if (newTags.length) {
      addedTags[tagType] = newTags;
    }

    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb && cb();
  onChangeClientState(newState, addedTags, removedTags);
};

var flattenArray = function flattenArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};

var updateTitle = function updateTitle(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }

  updateAttributes(TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];

  if (!elementTag) {
    return;
  }

  var helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);

  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";

    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }

    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }

    var indexToSave = attributesToRemove.indexOf(attribute);

    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }

  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }

  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};

var updateTags = function updateTags(type, tags) {
  var headElement = document.head || document.querySelector(TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;

  if (tags && tags.length) {
    tags.forEach(function (tag) {
      var newElement = document.createElement(type);

      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }

      newElement.setAttribute(HELMET_ATTRIBUTE, "true"); // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.

      if (oldTags.some(function (existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }

  oldTags.forEach(function (tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function (tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags: oldTags,
    newTags: newTags
  };
};

var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
  return Object.keys(attributes).reduce(function (str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
  return tags.reduce(function (str, tag) {
    var attributeHtml = Object.keys(tag).filter(function (attribute) {
      return !(attribute === TAG_PROPERTIES.INNER_HTML || attribute === TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function (string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};

var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(attributes).reduce(function (obj, key) {
    obj[REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};

var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(props).reduce(function (obj, key) {
    obj[HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};

var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
  var _initProps; // assigning into an array to define toString function on it


  var initProps = (_initProps = {
    key: title
  }, _initProps[HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
  return tags.map(function (tag, i) {
    var _mappedTag;

    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function (attribute) {
      var mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

      if (mappedAttribute === TAG_PROPERTIES.INNER_HTML || mappedAttribute === TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = {
          __html: content
        };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(type, mappedTag);
  });
};

var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
  switch (type) {
    case TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };

    case ATTRIBUTE_NAMES.BODY:
    case ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };

    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
  var baseTag = _ref.baseTag,
      bodyAttributes = _ref.bodyAttributes,
      encode = _ref.encode,
      htmlAttributes = _ref.htmlAttributes,
      linkTags = _ref.linkTags,
      metaTags = _ref.metaTags,
      noscriptTags = _ref.noscriptTags,
      scriptTags = _ref.scriptTags,
      styleTags = _ref.styleTags,
      _ref$title = _ref.title,
      title = _ref$title === undefined ? "" : _ref$title,
      titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(TAG_NAMES.TITLE, {
      title: title,
      titleAttributes: titleAttributes
    }, encode)
  };
};

var Helmet = function Helmet(Component) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    inherits(HelmetWrapper, _React$Component);

    function HelmetWrapper() {
      classCallCheck(this, HelmetWrapper);
      return possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !react_fast_compare__WEBPACK_IMPORTED_MODULE_2___default()(this.props, nextProps);
    };

    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }

      switch (child.type) {
        case TAG_NAMES.SCRIPT:
        case TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };

        case TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }

      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };

    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _babelHelpers$extends;

      var child = _ref.child,
          arrayTypeChildren = _ref.arrayTypeChildren,
          newChildProps = _ref.newChildProps,
          nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_babelHelpers$extends = {}, _babelHelpers$extends[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _babelHelpers$extends));
    };

    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _babelHelpers$extends2, _babelHelpers$extends3;

      var child = _ref2.child,
          newProps = _ref2.newProps,
          newChildProps = _ref2.newChildProps,
          nestedChildren = _ref2.nestedChildren;

      switch (child.type) {
        case TAG_NAMES.TITLE:
          return _extends({}, newProps, (_babelHelpers$extends2 = {}, _babelHelpers$extends2[child.type] = nestedChildren, _babelHelpers$extends2.titleAttributes = _extends({}, newChildProps), _babelHelpers$extends2));

        case TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });

        case TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }

      return _extends({}, newProps, (_babelHelpers$extends3 = {}, _babelHelpers$extends3[child.type] = _extends({}, newChildProps), _babelHelpers$extends3));
    };

    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);

      Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
        var _babelHelpers$extends4;

        newFlattenedProps = _extends({}, newFlattenedProps, (_babelHelpers$extends4 = {}, _babelHelpers$extends4[arrayChildName] = arrayTypeChildren[arrayChildName], _babelHelpers$extends4));
      });
      return newFlattenedProps;
    };

    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      if (false) {}

      return true;
    };

    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;

      var arrayTypeChildren = {};
      react__WEBPACK_IMPORTED_MODULE_3___default.a.Children.forEach(children, function (child) {
        if (!child || !child.props) {
          return;
        }

        var _child$props = child.props,
            nestedChildren = _child$props.children,
            childProps = objectWithoutProperties(_child$props, ["children"]);
        var newChildProps = convertReactPropstoHtmlAttributes(childProps);

        _this2.warnOnInvalidChildren(child, nestedChildren);

        switch (child.type) {
          case TAG_NAMES.LINK:
          case TAG_NAMES.META:
          case TAG_NAMES.NOSCRIPT:
          case TAG_NAMES.SCRIPT:
          case TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child: child,
              arrayTypeChildren: arrayTypeChildren,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;

          default:
            newProps = _this2.mapObjectTypeChildren({
              child: child,
              newProps: newProps,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;
        }
      });
      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };

    HelmetWrapper.prototype.render = function render() {
      var _props = this.props,
          children = _props.children,
          props = objectWithoutProperties(_props, ["children"]);

      var newProps = _extends({}, props);

      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }

      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, newProps);
    };

    createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.

      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function set$$1(canUseDOM) {
        Component.canUseDOM = canUseDOM;
      }
    }]);
    return HelmetWrapper;
  }(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component), _class.propTypes = {
    base: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    bodyAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    children: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node), prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node]),
    defaultTitle: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    defer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    encodeSpecialCharacters: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    htmlAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    link: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
    meta: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
    noscript: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
    onChangeClientState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
    script: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
    style: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object),
    title: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    titleAttributes: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    titleTemplate: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function () {
    var mappedState = Component.rewind();

    if (!mappedState) {
      // provide fallback if mappedState is undefined
      mappedState = mapStateOnServer({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }

    return mappedState;
  }, _temp;
};

var NullComponent = function NullComponent() {
  return null;
};

var HelmetSideEffects = react_side_effect__WEBPACK_IMPORTED_MODULE_1___default()(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
/* harmony default export */ __webpack_exports__["a"] = (HelmetExport);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "qo/p":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a, ('a) => 'b) => Object 'b
 */

var mapValues = function mapValues(object, transformation) {
  var keys = Object.keys(object);
  var result = {};

  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    result[key] = transformation(object[key]);
  }

  return result;
}; // --[ Convenience ]---------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 * 
 * complexity: O(n), n is the number of own enumerable properties.
 * type: |
 *   (Object 'a) . (('a) => 'b) => Object 'b
 */


mapValues.infix = function (transformation) {
  return mapValues(this, transformation);
}; // --[ Exports ]-------------------------------------------------------


module.exports = mapValues;

/***/ }),

/***/ "qxG/":
/***/ (function(module, exports, __webpack_require__) {

var _indexOf = __webpack_require__("0BRo");

module.exports = function _contains(a, list) {
  return _indexOf(list, a, 0) >= 0;
};

/***/ }),

/***/ "r8KN":
/***/ (function(module, exports, __webpack_require__) {

var _arity = __webpack_require__("ALMR");

var _isPlaceholder = __webpack_require__("ABxe");
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


module.exports = function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
  };
};

/***/ }),

/***/ "rJtk":
/***/ (function(module, exports) {

module.exports = {
  init: function init() {
    return this.xf['@@transducer/init']();
  },
  result: function result(_result) {
    return this.xf['@@transducer/result'](_result);
  }
};

/***/ }),

/***/ "rOAg":
/***/ (function(module, exports, __webpack_require__) {

var _contains = __webpack_require__("qxG/");

var _curry2 = __webpack_require__("Wnyi");
/**
 * Returns `true` if the specified value is equal, in [`R.equals`](#equals)
 * terms, to at least one element of the given list; `false` otherwise.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if an equivalent item is in the list, `false` otherwise.
 * @see R.any
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains({ name: 'Fred' }, [{ name: 'Fred' }]); //=> true
 *      R.contains([42], [[42]]); //=> true
 */


module.exports = _curry2(_contains);

/***/ }),

/***/ "rfz3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var assertType = __webpack_require__("gnJF");

var assertFunction = __webpack_require__("rnYU");

var _require = __webpack_require__("UYkW"),
    union = _require.union,
    derivations = _require.derivations;

var provideAliases = __webpack_require__("6RdS");

var warnDeprecation = __webpack_require__("GfB1");

var adtMethods = __webpack_require__("d1Y1");

var extend = __webpack_require__("F7L5");

var equality = derivations.equality,
    debugRepresentation = derivations.debugRepresentation,
    serialization = derivations.serialization;
/*~ stability: stable */

var Maybe = union('folktale:Maybe', {
  /*~
   * type: |
   *   forall a: () => Maybe a
   */
  Nothing: function Nothing() {},

  /*~
   * type: |
   *   forall a: (a) => Maybe a
   */
  Just: function Just(value) {
    return {
      value: value
    };
  }
}).derive(equality, debugRepresentation, serialization);
var Nothing = Maybe.Nothing,
    _Just = Maybe.Just;
var assertMaybe = assertType(Maybe);
extend(_Just.prototype, {
  /*~
   * isRequired: true
   * type: |
   *   forall a: get (Maybe a) => a
   */
  get value() {
    throw new TypeError('`value` can’t be accessed in an abstract instance of Maybe.Just');
  }

});
/*~~belongsTo: Maybe */

adtMethods(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => b) => Maybe b
   */
  map: {
    /*~*/
    Nothing: function map(transformation) {
      assertFunction('Maybe.Nothing#map', transformation);
      return this;
    },

    /*~*/
    Just: function map(transformation) {
      assertFunction('Maybe.Just#map', transformation);
      return _Just(transformation(this.value));
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe (a) => b).(Maybe a) => Maybe b
   */
  apply: {
    /*~*/
    Nothing: function apply(aMaybe) {
      assertMaybe('Maybe.Nothing#apply', aMaybe);
      return this;
    },

    /*~*/
    Just: function apply(aMaybe) {
      assertMaybe('Maybe.Just#apply', aMaybe);
      return aMaybe.map(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).((a) => Maybe b) => Maybe b
   */
  chain: {
    /*~*/
    Nothing: function chain(transformation) {
      assertFunction('Maybe.Nothing#chain', transformation);
      return this;
    },

    /*~*/
    Just: function chain(transformation) {
      assertFunction('Maybe.Just#chain', transformation);
      return transformation(this.value);
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  unsafeGet: {
    /*~*/
    Nothing: function unsafeGet() {
      throw new TypeError('Can\'t extract the value of a Nothing.\n\n    Since Nothing holds no values, it\'s not possible to extract one from them.\n    You might consider switching from Maybe#get to Maybe#getOrElse, or some other method\n    that is not partial.\n      ');
    },

    /*~*/
    Just: function unsafeGet() {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).(a) => a
   */
  getOrElse: {
    /*~*/
    Nothing: function getOrElse(_default) {
      return _default;
    },

    /*~*/
    Just: function getOrElse(_default) {
      return this.value;
    }
  },

  /*~
   * type: |
   *   forall a: (Maybe a).((a) => Maybe a) => Maybe a
   */
  orElse: {
    /*~*/
    Nothing: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return handler(this.value);
    },

    /*~*/
    Just: function orElse(handler) {
      assertFunction('Maybe.Nothing#orElse', handler);
      return this;
    }
  },

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: (Maybe a).(Maybe a) => Maybe a
   *   where a is Semigroup
   */
  concat: {
    /*~*/
    Nothing: function concat(aMaybe) {
      assertMaybe('Maybe.Nothing#concat', aMaybe);
      return aMaybe;
    },

    /*~*/
    Just: function concat(aMaybe) {
      var _this = this;

      assertMaybe('Maybe.Just#concat', aMaybe);
      return aMaybe.matchWith({
        Nothing: function Nothing() {
          return _Just(_this.value);
        },
        Just: function Just(a) {
          return _Just(_this.value.concat(a.value));
        }
      });
    }
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .matchWith(pattern)
   *
   * type: |
   *   forall a, b:
   *     (Maybe a).({
   *       Nothing: () => b,
   *       Just: (a) => b
   *     }) => b
   */
  cata: {
    /*~*/
    Nothing: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Nothing();
    },

    /*~*/
    Just: function cata(pattern) {
      warnDeprecation('`.cata(pattern)` is deprecated. Use `.matchWith(pattern)` instead.');
      return pattern.Just(this.value);
    }
  },

  /*~
   * type: |
   *   forall a, b: (Maybe a).(() => b, (a) => b) => b
   */
  fold: {
    /*~*/
    Nothing: function Nothing(transformNothing, transformJust) {
      assertFunction('Maybe.Nothing#fold', transformNothing);
      assertFunction('Maybe.Nothing#fold', transformJust);
      return transformNothing();
    },

    /*~*/
    Just: function Just(transformNothing, transformJust) {
      assertFunction('Maybe.Just#fold', transformNothing);
      assertFunction('Maybe.Just#fold', transformJust);
      return transformJust(this.value);
    }
  },

  /*~
   * stability: stable
   * type: |
   *   forall a: (Maybe a).((a) => Boolean) => Maybe a
   */
  filter: {
    /*~*/
    Nothing: function filter(predicate) {
      assertFunction('Maybe.Nothing#filter', predicate);
      return this;
    },

    /*~*/
    Just: function filter(predicate) {
      assertFunction('Maybe.Just#filter', predicate);
      return predicate(this.value) ? this : Nothing();
    }
  },

  /*~
   * authors:
   *   - "@joshmili"
   * type: |
   *   forall a: (Maybe a).(Maybe a) => Maybe a
   */
  or: {
    /*~*/
    Nothing: function alt(aMaybe) {
      assertMaybe('Maybe.Nothing#or', aMaybe);
      return aMaybe;
    },

    /*~*/
    Just: function alt(aMaybe) {
      assertMaybe('Maybe.Just#or', aMaybe);
      return this;
    }
  }
});
Object.assign(Maybe, {
  /*~
   * stability: stable
   * type: |
   *   forall a: (a) => Maybe a
   */
  of: function of(value) {
    return _Just(value);
  },

  /*~
   * authors:
   *   - "@diasbruno"
   * type: |
   *   forall a: () => Maybe a
   */
  empty: function empty() {
    return Nothing();
  },

  /*~
   * deprecated:
   *   since: 2.0.0
   *   replacedBy: .unsafeGet()
   * type: |
   *   forall a: (Maybe a).() => a :: (throws TypeError)
   */
  'get': function get() {
    warnDeprecation('`.get()` is deprecated, and has been renamed to `.unsafeGet()`.');
    return this.unsafeGet();
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toResult: function toResult(fallbackValue) {
    return __webpack_require__("dtAR")(this, fallbackValue);
  },

  /*~
   * stability: stable
   * type: |
   *   forall a, b: (Maybe a).(b) => Result b a
   */
  toValidation: function toValidation(fallbackValue) {
    return __webpack_require__("XImm")(this, fallbackValue);
  }
});
provideAliases(_Just.prototype);
provideAliases(Nothing.prototype);
provideAliases(Maybe);
module.exports = Maybe;

/***/ }),

/***/ "rhzI":
/***/ (function(module, exports, __webpack_require__) {

var _checkForMethod = __webpack_require__("/Ubj");

var _curry1 = __webpack_require__("cOqj");

var slice = __webpack_require__("b/Vg");
/**
 * Returns all but the first element of the given list or string (or object
 * with a `tail` method).
 *
 * Dispatches to the `slice` method of the first argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.head, R.init, R.last
 * @example
 *
 *      R.tail([1, 2, 3]);  //=> [2, 3]
 *      R.tail([1, 2]);     //=> [2]
 *      R.tail([1]);        //=> []
 *      R.tail([]);         //=> []
 *
 *      R.tail('abc');  //=> 'bc'
 *      R.tail('ab');   //=> 'b'
 *      R.tail('a');    //=> ''
 *      R.tail('');     //=> ''
 */


module.exports = _curry1(_checkForMethod('tail', slice(1, Infinity)));

/***/ }),

/***/ "rnYU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = function (method, transformation) {
  if (typeof transformation !== 'function') {
    throw new TypeError(method + ' expects a function, but was given ' + transformation + '.');
  }
};

/***/ }),

/***/ "s9Da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

module.exports = function (methodName) {
  return function (object) {
    throw new TypeError(object + " does not have a method '" + methodName + "'.");
  };
};

/***/ }),

/***/ "ssKB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserLangKey = __webpack_require__("Ripx");

var _getUserLangKey2 = _interopRequireDefault(_getUserLangKey);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Redirect to user language home page, from: / to: /langKey/
 * @param {[String]} langs allowed lang keys ['en', 'fr', 'pt']
 * @param {String} defaultLangKey default browser language key
 * @return {void}
 */


var redirectToHome = function redirectToHome(langs, defaultLangKey) {
  if (typeof window === 'undefined') {
    return;
  }

  var langKey = (0, _getUserLangKey2.default)(langs, defaultLangKey);
  var newUrl = '/' + langKey + '/';
  window.location.replace(newUrl);
};

exports.default = redirectToHome;

/***/ }),

/***/ "wQFJ":
/***/ (function(module, exports, __webpack_require__) {

var _isArrayLike = __webpack_require__("l7q6");

var _xwrap = __webpack_require__("LPBM");

var bind = __webpack_require__("8/j2");

module.exports = function () {
  function _arrayReduce(xf, acc, list) {
    var idx = 0;
    var len = list.length;

    while (idx < len) {
      acc = xf['@@transducer/step'](acc, list[idx]);

      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }

      idx += 1;
    }

    return xf['@@transducer/result'](acc);
  }

  function _iterableReduce(xf, acc, iter) {
    var step = iter.next();

    while (!step.done) {
      acc = xf['@@transducer/step'](acc, step.value);

      if (acc && acc['@@transducer/reduced']) {
        acc = acc['@@transducer/value'];
        break;
      }

      step = iter.next();
    }

    return xf['@@transducer/result'](acc);
  }

  function _methodReduce(xf, acc, obj, methodName) {
    return xf['@@transducer/result'](obj[methodName](bind(xf['@@transducer/step'], xf), acc));
  }

  var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
  return function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
      fn = _xwrap(fn);
    }

    if (_isArrayLike(list)) {
      return _arrayReduce(fn, acc, list);
    }

    if (typeof list['fantasy-land/reduce'] === 'function') {
      return _methodReduce(fn, acc, list, 'fantasy-land/reduce');
    }

    if (list[symIterator] != null) {
      return _iterableReduce(fn, acc, list[symIterator]());
    }

    if (typeof list.next === 'function') {
      return _iterableReduce(fn, acc, list);
    }

    if (typeof list.reduce === 'function') {
      return _methodReduce(fn, acc, list, 'reduce');
    }

    throw new TypeError('reduce: list must be array or iterable');
  };
}();

/***/ }),

/***/ "x0lo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redirectToHome = exports.nPaths = exports.getUrlForLang = exports.getSlugAndLang = exports.getLangs = exports.getI18nBase = exports.getValidLangKey = exports.getUserLangKey = exports.getPagesPaths = exports.getCurrentLangKey = exports.getBrowserLanguage = exports.isInPagesPaths = exports.isHomePage = exports.addLangKeyToSlug = undefined;

var _startsWith = __webpack_require__("6nwk");

var _startsWith2 = _interopRequireDefault(_startsWith);

var _curry = __webpack_require__("V7Sg");

var _curry2 = _interopRequireDefault(_curry);

var _getCurrentLangKey = __webpack_require__("F9wR");

var _getCurrentLangKey2 = _interopRequireDefault(_getCurrentLangKey);

var _getValidLangKey = __webpack_require__("X53C");

var _getValidLangKey2 = _interopRequireDefault(_getValidLangKey);

var _getBrowserLanguage = __webpack_require__("BuAq");

var _getBrowserLanguage2 = _interopRequireDefault(_getBrowserLanguage);

var _redirectToHome = __webpack_require__("ssKB");

var _redirectToHome2 = _interopRequireDefault(_redirectToHome);

var _getUserLangKey = __webpack_require__("Ripx");

var _getUserLangKey2 = _interopRequireDefault(_getUserLangKey);

var _getSlugAndLang = __webpack_require__("RjsT");

var _getSlugAndLang2 = _interopRequireDefault(_getSlugAndLang);

var _getPagesPaths = __webpack_require__("BPn/");

var _getPagesPaths2 = _interopRequireDefault(_getPagesPaths);

var _isInPagesPaths = __webpack_require__("etOE");

var _isInPagesPaths2 = _interopRequireDefault(_isInPagesPaths);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
/**
 * Gets the number of paths in a url
 * @param {*} url pathName
 * @returns {Number} number of paths
 */


var nPaths = function nPaths(url) {
  return (url.match(/\//g) || []).length - 1;
};
/**
 * Checks if the url is /, /en/ or /pt/
 * @param {*} url this.props.location
 * @returns {Boolean} is home or not
 */


var isHomePage = function isHomePage(url) {
  return nPaths(url) <= 1;
};
/**
 * Add lang to slug
 * @param {String} slug  Slug to add lang
 * @param {String} langKey langKey to add
 * @param {{langKeyDefault: string, prefixDefault: boolean }} options prefixDefault: boolean indicating whether the the urls for the default land should be prefix or not
 * @returns {String} new slug
 */


var addLangKeyToSlug = (0, _curry2.default)(function (slug, langKey, options) {
  return langKey !== options.langKeyDefault || options.prefixDefault ? '/' + langKey + slug : '' + slug;
});
/**
 * Get url to the language
 * @param {String} homeLink  link for the home page
 * @param {String} url  browser url
 * @param {String} langKey default browser language key
 * @returns {String} new url
 */

var getUrlForLang = (0, _curry2.default)(function (homeLink, url, langKey) {
  return url === '/' || !(0, _startsWith2.default)(homeLink, url) ? '/' + langKey + '/' : url.replace(homeLink, '/' + langKey + '/');
});
/**
 * Get langs to create Menu
 * @param {[String]} langs lang keys ['en', 'fr', 'pt']
 * @param {String} currentLangKey current Lang Key
 * @param {func} getUrlForLang getUrlForLang curried, waiting for langKey
 * @returns {Array} langs menu data
 */

var getLangs = (0, _curry2.default)(function (langs, currentLangKey, getUrlForLang) {
  return langs.map(function (langKey) {
    return {
      langKey: langKey,
      selected: currentLangKey === langKey,
      link: getUrlForLang(langKey)
    };
  });
});
/**
 * Get i18n obj for the given langKey or first when not found
 * @param {*} i18n Translations object
 * @param {*} langKey langKey
 * @returns {*} i18n[langKey] or i18n[defaultLangKey]
 */

var getI18nBase = (0, _curry2.default)(function (i18n, langKey) {
  return i18n[langKey] || Object.values(i18n)[0];
});
exports.addLangKeyToSlug = addLangKeyToSlug;
exports.isHomePage = isHomePage;
exports.isInPagesPaths = _isInPagesPaths2.default;
exports.getBrowserLanguage = _getBrowserLanguage2.default;
exports.getCurrentLangKey = _getCurrentLangKey2.default;
exports.getPagesPaths = _getPagesPaths2.default;
exports.getUserLangKey = _getUserLangKey2.default;
exports.getValidLangKey = _getValidLangKey2.default;
exports.getI18nBase = getI18nBase;
exports.getLangs = getLangs;
exports.getSlugAndLang = _getSlugAndLang2.default;
exports.getUrlForLang = getUrlForLang;
exports.nPaths = nPaths;
exports.redirectToHome = _redirectToHome2.default;

/***/ }),

/***/ "xiFT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

var _require = __webpack_require__("mGu+"),
    flEquals = _require.equals;

var curry = __webpack_require__("z305");

var warn = __webpack_require__("2w5D")('equals');

var unsupported = __webpack_require__("s9Da")('equals');

var isNew = function isNew(a) {
  return typeof a[flEquals] === 'function';
};

var isOld = function isOld(a) {
  return typeof a.equals === 'function';
};
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a, S a) => Boolean
 *   where S is Setoid
 */


var equals = function equals(setoidLeft, setoidRight) {
  return isNew(setoidLeft) ? setoidLeft[flEquals](setoidRight) : isOld(setoidLeft) ? warn(setoidLeft.equals(setoidRight)) :
  /*otherwise*/
  unsupported(setoidLeft);
};
/*~
 * stability: stable
 * authors:
 *   - "@boris-marinov"
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a) => (S a) => Boolean
 *   where S is Setoid
 */


equals.curried = curry(2, function (setoidRight, setoidLeft) {
  return (// eslint-disable-line no-magic-numbers
    equals(setoidLeft, setoidRight)
  );
});
/*~
 * stability: experimental
 * authors:
 *   - Quildreen Motta
 * 
 * type: |
 *   forall S, a:
 *     (S a).(S a) => Boolean
 *   where S is Setoid
 */

equals.infix = function (aSetoid) {
  return equals(this, aSetoid);
};

module.exports = equals;

/***/ }),

/***/ "yBOd":
/***/ (function(module, exports, __webpack_require__) {

var _curry1 = __webpack_require__("cOqj");
/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @see R.complement
 * @example
 *
 *      R.not(true); //=> false
 *      R.not(false); //=> true
 *      R.not(0); //=> true
 *      R.not(1); //=> false
 */


module.exports = _curry1(function not(a) {
  return !a;
});

/***/ }),

/***/ "yLpj":
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

/***/ "z305":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return Array.from(arr);
  }
} //----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// Licensed under MIT. See LICENCE for full licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------

/*~
 * stability: stable
 * authors:
 *   - Quildreen Motta
 *
 * type: |
 *   (Number, (Any...) => 'a) => Any... => 'a or ((Any...) => 'a)
 */


var curry = function curry(arity, fn) {
  var curried = function curried(oldArgs) {
    return function () {
      for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }

      var allArgs = oldArgs.concat(newArgs);
      var argCount = allArgs.length;
      return argCount < arity ? curried(allArgs) :
      /* otherwise */
      fn.apply(undefined, _toConsumableArray(allArgs));
    };
  };

  return curried([]);
}; // --[ Exports ]-------------------------------------------------------


module.exports = curry;

/***/ }),

/***/ "zgIM":
/***/ (function(module, exports, __webpack_require__) {

var _arrayFromIterator = __webpack_require__("zm7I");

var _functionName = __webpack_require__("+gcA");

var _has = __webpack_require__("Av+g");

var identical = __webpack_require__("iJhd");

var keys = __webpack_require__("7e6P");

var type = __webpack_require__("P9nH");

module.exports = function _equals(a, b, stackA, stackB) {
  if (identical(a, b)) {
    return true;
  }

  if (type(a) !== type(b)) {
    return false;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a['fantasy-land/equals'] === 'function' || typeof b['fantasy-land/equals'] === 'function') {
    return typeof a['fantasy-land/equals'] === 'function' && a['fantasy-land/equals'](b) && typeof b['fantasy-land/equals'] === 'function' && b['fantasy-land/equals'](a);
  }

  if (typeof a.equals === 'function' || typeof b.equals === 'function') {
    return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
  }

  switch (type(a)) {
    case 'Arguments':
    case 'Array':
    case 'Object':
      if (typeof a.constructor === 'function' && _functionName(a.constructor) === 'Promise') {
        return a === b;
      }

      break;

    case 'Boolean':
    case 'Number':
    case 'String':
      if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
        return false;
      }

      break;

    case 'Date':
      if (!identical(a.valueOf(), b.valueOf())) {
        return false;
      }

      break;

    case 'Error':
      return a.name === b.name && a.message === b.message;

    case 'RegExp':
      if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
        return false;
      }

      break;

    case 'Map':
    case 'Set':
      if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
        return false;
      }

      break;

    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      break;

    case 'ArrayBuffer':
      break;

    default:
      // Values of other types are only equal if identical.
      return false;
  }

  var keysA = keys(a);

  if (keysA.length !== keys(b).length) {
    return false;
  }

  var idx = stackA.length - 1;

  while (idx >= 0) {
    if (stackA[idx] === a) {
      return stackB[idx] === b;
    }

    idx -= 1;
  }

  stackA.push(a);
  stackB.push(b);
  idx = keysA.length - 1;

  while (idx >= 0) {
    var key = keysA[idx];

    if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
      return false;
    }

    idx -= 1;
  }

  stackA.pop();
  stackB.pop();
  return true;
};

/***/ }),

/***/ "zm7I":
/***/ (function(module, exports) {

module.exports = function _arrayFromIterator(iter) {
  var list = [];
  var next;

  while (!(next = iter.next()).done) {
    list.push(next.value);
  }

  return list;
};

/***/ })

}]);
//# sourceMappingURL=a17f5f22cb74fbbea262efa4c333a19012378af9-df101cfefb61a566891e.js.map