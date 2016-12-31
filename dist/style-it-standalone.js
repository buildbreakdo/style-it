(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Style"] = factory(require("react"), require("react-dom"));
	else
		root["Style"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(8);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _util = __webpack_require__(6);

	var _util2 = _interopRequireDefault(_util);

	var _reactLibAdler = __webpack_require__(3);

	var _reactLibAdler2 = _interopRequireDefault(_reactLibAdler);

	var _reactLibEscapeTextContentForBrowser = __webpack_require__(4);

	var _reactLibEscapeTextContentForBrowser2 = _interopRequireDefault(_reactLibEscapeTextContentForBrowser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2016-present, Joshua Robinson
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * All rights reserved.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var __DEV__ = ("production") !== 'production';

	var Style = function (_Component) {
	  _inherits(Style, _Component);

	  function Style() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Style);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Style)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getStyleString = function () {
	      if (_this.props.children instanceof Array) {
	        var styleString = _this.props.children.filter(function (child) {
	          return !(0, _react.isValidElement)(child);
	        });

	        if (styleString.length > 1) {
	          throw new Error('Multiple style objects as direct descedents of a ' + 'Style component are not supported (' + styleString.length + ' style objects detected): \n\n' + styleString[0]);
	        }

	        return styleString[0];
	      } else if (typeof _this.props.children === 'string' && !(0, _react.isValidElement)(_this.props.children)) {
	        return _this.props.children;
	      } else {
	        return null;
	      }
	    }, _this.getRootElement = function () {
	      if (_this.props.children instanceof Array) {
	        var rootElement = _this.props.children.filter(function (child) {
	          return (0, _react.isValidElement)(child);
	        });

	        if (__DEV__) {
	          if (rootElement.length > 1) {
	            console.log(rootElement);
	            throw new Error('Adjacent JSX elements must be wrapped in an enclosing tag (' + rootElement.length + ' root elements detected).');
	          }

	          if (typeof rootElement[0] !== 'undefined' && _this.isVoidElement(rootElement[0].type)) {
	            throw new Error('Self-closing void elements like ' + rootElement.type + ' must be wrapped ' + 'in an enclosing tag. Reactive Style must be able to nest a style element ' + 'inside of the root element and void element content models never allow' + 'it to have contents under any circumstances.');
	          }
	        }

	        return rootElement[0];
	      } else if ((0, _react.isValidElement)(_this.props.children)) {
	        return _this.props.children;
	      } else {
	        return null;
	      }
	    }, _this.getRootSelectors = function (rootElement) {
	      var rootSelectors = [];

	      // Handle id
	      if (rootElement.props.id) {
	        rootSelectors.push('#' + rootElement.props.id);
	      }

	      // Handle classes
	      if (rootElement.props.className) {
	        rootElement.props.className.trim().split(/\s+/g).forEach(function (className) {
	          return rootSelectors.push(className);
	        });
	      }

	      // Handle no root selector by using type
	      if (!rootSelectors.length) {
	        rootSelectors.push(rootElement.type);
	      }

	      return rootSelectors;
	    }, _this.processCSSText = function (styleString, scopedClassName, rootSelectors) {
	      // TODO: Look into using memoizeStringOnly from fbjs/lib for escaped strings;
	      // can avoid much of the computation as long as scoped doesn't come into play
	      // which would be unique

	      // TODO: If dev lint and provide feedback
	      // if linting fails we need to error out because
	      // the style string will not be parsed correctly
	      return styleString.replace(/\s*\/\/(?![^\(]*\)).*/g, '') // Strip javascript style comments
	      .replace(/\s\s+/g, ' ') // Convert multiple to single whitespace
	      .split('}') // Start breaking down statements
	      .map(function (fragment) {
	        var isDeclarationBodyPattern = /.*:.*;/g;
	        var isAtRulePattern = /\s*@/g;
	        var isKeyframeOffsetPattern = /\s*(([0-9][0-9]?|100)\s*%)|\s*(to|from)\s*$/g;
	        // const isContent
	        // Split fragment into selector and declarationBody; escape declaration body
	        return fragment.split('{').map(function (statement) {
	          // Avoid processing whitespace
	          if (!statement.trim().length) {
	            return;
	          }

	          // Skip escaping selectors statements since that would break them;
	          // note in docs that selector statements are not escaped and should
	          // not be generated from user provided strings
	          if (statement.match(isDeclarationBodyPattern)) {
	            return (0, _reactLibEscapeTextContentForBrowser2.default)(statement // Have to deal with special case of CSS property "content", breaks without quotes
	            .replace(/lsquo|rsquo/g, '') // Prevent manipulation
	            .replace(/content\s*:\s*['"](.*)['"]\s*;/, 'content: lsquo;$1rsquo;;') // "Entify" content property
	            .replace(/['"]/g, '') // Remove single and double quotes
	            ).replace(/lsquo;|rsquo;/g, "'") // De-"entify" content property
	            .replace(/;/g, ';\n'); // Add formatting;
	          } else {
	              // Statement is a selector
	              var selector = statement;

	              if (scopedClassName) {
	                // Prefix the scope to the selector if it is not an at-rule
	                if (!selector.match(isAtRulePattern) && !selector.match(isKeyframeOffsetPattern)) {
	                  return _this.scopeSelector(scopedClassName, selector, rootSelectors);
	                } else {
	                  // Is at-rule or keyframe offset and should not be scoped
	                  return selector;
	                }
	              } else {
	                // No scope; do nothing to the selector
	                return selector;
	              }
	            }

	          // Pretty print in dev
	        }).join('{\n');
	      }).join('}\n');
	    }, _this.scopeSelector = function (scopedClassName, selector, rootSelectors) {
	      var scopedSelector = [];

	      // Matches comma-delimiters in multi-selectors (".fooClass, .barClass {...}" => "," );
	      // ignores commas-delimiters inside of brackets and parenthesis ([attr=value], :not()..)
	      var groupOfSelectorsPattern = /,(?![^\(|\[]*\)|\])/g;

	      var selectors = selector.split(groupOfSelectorsPattern);

	      for (var i = 0; i < selectors.length; i++) {
	        var containsSelector = void 0; // [data-scoped="54321"] .someClass
	        var unionSelector = void 0; // [data-scoped="54321"].someClass (account for root)

	        if (rootSelectors.length && rootSelectors.some(function (rootSelector) {
	          return selector.match(rootSelector);
	        })) {
	          unionSelector = selectors[i];

	          // Can't just add them together because of selector combinator complexity
	          // like '.rootClassName.someClass.otherClass > *' or :not('.rootClassName'),
	          // replace must be used

	          // Escape valid CSS special characters that are also RegExp special characters
	          var escapedRootSelectors = rootSelectors.map(function (rootSelector) {
	            return rootSelector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	          });

	          unionSelector = unionSelector.replace(new RegExp('(' + // Start capture group
	          escapedRootSelectors.join('|') + // Match any one root selector
	          ')' // End capture group
	          ), '$1' + scopedClassName // Replace any one root selector match with a union
	          ); // of the root selector and scoping class (e.g., .rootSelector._scoped-1). Order matters here because of type-class union support like div._scoped-1

	          // Do both union and contains selectors because of case <div><div></div></div>
	          // or <div className="foo"><div className="foo"></div></div>
	          containsSelector = scopedClassName + ' ' + selectors[i];
	          scopedSelector.push(unionSelector, containsSelector);
	        } else {
	          containsSelector = scopedClassName + ' ' + selectors[i];
	          scopedSelector.push(containsSelector);
	        }
	      }

	      return scopedSelector.join(', ');
	    }, _this.getScopeClassName = function (styleString) {
	      var childInspect = void 0;
	      if (_this.props.children[1].props.children instanceof Array) {
	        childInspect = _this.props.children[1].props.children.map(function (child) {
	          return (0, _util.inspect)(child.props.children, { depth: 0 });
	        });
	      } else {
	        childInspect = (0, _util.inspect)(_this.props.children[1], { depth: 0 });
	      }
	      return '_scoped-' + (0, _reactLibAdler2.default)(styleString + childInspect);
	    }, _this.isVoidElement = function (type) {
	      return ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'].some(function (voidType) {
	        return type === voidType;
	      });
	    }, _this.addCSSTextToHead = function (cssText) {
	      if (!cssText.length) {
	        return;
	      } else {
	        (function () {
	          var cssTextHash = (0, _reactLibAdler2.default)(cssText);

	          if (!window._reactiveStyle.cssTextHashesAddedToHead.some(function (hash) {
	            return hash === cssTextHash;
	          })) {
	            window._reactiveStyle.el.innerHTML += cssText;
	            window._reactiveStyle.cssTextHashesAddedToHead.push(cssTextHash);
	          }
	        })();
	      }
	    }, _this.createStyleElement = function (cssText) {
	      return _react2.default.createElement('style', { className: 'style-it', type: 'text/css', key: '-0', ref: function ref(c) {
	          return _this._style = c;
	        },
	        dangerouslySetInnerHTML: {
	          __html: cssText || ''
	        } });
	    }, _this.getNewChildrenForCloneElement = function (cssText, rootElement) {
	      return [_this.createStyleElement(cssText)].concat(rootElement.props.children);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Style, [{
	    key: 'render',
	    value: function render() {
	      if (!this.props.children) {
	        return this.createStyleElement();
	      }

	      var styleString = this.getStyleString();
	      var rootElement = this.getRootElement();

	      if (!styleString && rootElement) {
	        // Passthrough; no style actions
	        return rootElement.props.children;
	      } else if (styleString && !rootElement) {
	        // Global styling with no scoping
	        return this.createStyleElement(this.processCSSText(styleString));
	      } else {
	        // Style tree of elements
	        var scopeClassName = this.getScopeClassName(styleString);

	        return (0, _react.cloneElement)(rootElement, _extends({}, rootElement.props, {
	          className: '' + (rootElement.props.className ? rootElement.props.className + ' ' : '') + scopeClassName
	        }), this.getNewChildrenForCloneElement(this.processCSSText(styleString, '.' + scopeClassName, this.getRootSelectors(rootElement)), rootElement));
	      }
	    }

	    /**
	     * Filters out the style string from this.props.children
	     *
	     *    > getStyleString()
	     *    ".foo { color: red; }"
	     *
	     * @return {?string} string Style string
	     */


	    /**
	    * Filters out the root element from this.props.children
	    *
	    *    > getRootElement()
	    *    "<MyRootElement />"
	    *
	    * @return {?ReactDOMComponent} component Root element component
	    */


	    /**
	    * Creates an array of selectors which target the root element
	    *
	    *    > getRootSelectors( <div id="foo" className="bar" /> )
	    *    "['#foo', '.bar']"
	    *
	    * @param {ReactDOMComponent} component
	    * @return {!array} array Array of selectors that target the root element
	    */


	    /**
	    * Scopes CSS statement with a given scoping class name as a union or contains selector;
	    * also escapes CSS declaration bodies
	    *
	    *    > proccessStyleString( '.foo { color: red; } .bar { color: green; }', '_scoped-1234, ['.root', '.foo']  )
	    *    ".scoped-1234.foo { color: red; } .scoped-1234 .bar { color: green; }"
	    *
	    * @param {string} styleString String of style rules
	    * @param {string} scopedClassName Class name used to create a unique scope
	    * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
	    * @return {!string} Scoped style rule string
	    */


	    /**
	     * Scopes a selector with a given scoping className as a union or contains selector
	     *
	     *    > scopeSelector( '_scoped-1827481', '.root', ['.root', '.foo']  )
	     *    ".scoped-1827481.root"
	     *
	     * @param {string} scopedClassName Class name used to scope selectors
	     * @param {string} selector Selector to scope
	     * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
	     * @return {!string} Union or contains selector scoped with the scoping className
	     */


	    /**
	     * Creates a className used as a CSS scope by generating a checksum from a styleString
	     *
	     *    > scoped( 'footer { color: red; }' )
	     *    "_scoped-182938591"
	     *
	     * @param {string} String of style rules
	     * @return {!string} A scoping class name
	     */


	    /**
	     * Checks if a tag type is a self-closing void element
	     *
	     *    > isVoidElement( "img" )
	     *    "true"
	     *
	     * @param {*} string Element type to check
	     * @return {!bool} bool True or false
	     */


	    /**
	     * Add CSS text to the style element in the head of document unless it has
	     * already been added.
	     *
	     *    > addCSSTextToHead( ".foo { color: red; }" )
	     *
	     * @param {string} string CSS text to add to head
	     */


	    /**
	    * Creates the style element used for server side rendering
	    *    > createStyleElement( ".foo._scoped-1 { color: red; }" )
	    *
	    *
	    * @param {string} string CSS string
	    * @return {ReactDOMComponent} component
	    */


	    /**
	    * Returns new children for a root element being cloned. If mounted the CSS text
	    * is added to the style element in head, otherwise we are doing server side rendering
	    * and to avoid flash of unstyled content (FOUC) a style element is added to children
	    * to avoid FOUC on first render.
	    *
	    *    > getNewChildrenForCloneElement( ".foo._scoped-1 { color: red; }" )
	    *     "<NewChildren />"
	    *
	    * @param {string} string CSS string
	    * @return {ReactDOMComponent} component
	    */


	    /**
	    * Syntactic sugar for functional usage of Reactive Style
	    *
	    *    > Style.it( ".foo { color: red; }", <div /> )
	    *     "<div class="_scoped-1">
	    *        <style type="text/css">
	    *          .foo._scoped-1 { color: red; }
	    *        </style>
	    *      </div>"
	    *
	    * @param {string} string CSS string
	    * @param {ReactDOMComponent} component
	    */

	  }]);

	  return Style;
	}(_react.Component);

	Style.it = function (cssText, rootElement) {
	  return _react2.default.createElement(
	    Style,
	    null,
	    cssText,
	    rootElement
	  );
	};

	module.exports = Style;

/***/ },
/* 1 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
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
	    var timeout = cachedSetTimeout(cleanUpNextTick);
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
	    cachedClearTimeout(timeout);
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
	        cachedSetTimeout(drainQueue, 0);
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

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule adler32
	 */

	'use strict';

	var MOD = 65521;

	// adler32 is not cryptographically strong, and is only used to sanity check that
	// markup generated on the server matches the markup generated on the client.
	// This implementation (a modified version of the SheetJS version) has been optimized
	// for our use case, at the expense of conforming to the adler32 specification
	// for non-ascii inputs.
	function adler32(data) {
	  var a = 1;
	  var b = 0;
	  var i = 0;
	  var l = data.length;
	  var m = l & ~0x3;
	  while (i < m) {
	    var n = Math.min(i + 4096, m);
	    for (; i < n; i += 4) {
	      b += (a += data.charCodeAt(i)) + (a += data.charCodeAt(i + 1)) + (a += data.charCodeAt(i + 2)) + (a += data.charCodeAt(i + 3));
	    }
	    a %= MOD;
	    b %= MOD;
	  }
	  for (; i < l; i++) {
	    b += a += data.charCodeAt(i);
	  }
	  a %= MOD;
	  b %= MOD;
	  return a | b << 16;
	}

	module.exports = adler32;

/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule escapeTextContentForBrowser
	 */

	'use strict';

	var ESCAPE_LOOKUP = {
	  '&': '&amp;',
	  '>': '&gt;',
	  '<': '&lt;',
	  '"': '&quot;',
	  '\'': '&#x27;'
	};

	var ESCAPE_REGEX = /[&><"']/g;

	function escaper(match) {
	  return ESCAPE_LOOKUP[match];
	}

	/**
	 * Escapes text to prevent scripting attacks.
	 *
	 * @param {*} text Text value to escape.
	 * @return {string} An escaped string.
	 */
	function escapeTextContentForBrowser(text) {
	  return ('' + text).replace(ESCAPE_REGEX, escaper);
	}

	module.exports = escapeTextContentForBrowser;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = ({"NODE_ENV":"production"}).NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(5);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(1);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});
;