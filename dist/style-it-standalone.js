(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["Style"] = factory(require("react"), require("react-dom"));
	else
		root["Style"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(4);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactLibAdler = __webpack_require__(1);

	var _reactLibAdler2 = _interopRequireDefault(_reactLibAdler);

	var _reactLibEscapeTextContentForBrowser = __webpack_require__(2);

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

	var __MOUNTED__ = void 0;

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
	      return '_scoped-' + (0, _reactLibAdler2.default)(styleString);
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
	      return _react2.default.createElement('style', { type: 'text/css', key: '-0', ref: function ref(c) {
	          return _this._style = c;
	        },
	        dangerouslySetInnerHTML: {
	          __html: cssText || ''
	        } });
	    }, _this.getNewChildrenForCloneElement = function (cssText, rootElement) {
	      if (__MOUNTED__) {
	        return rootElement.props.children;
	      } else {
	        return [_this.createStyleElement(cssText)].concat(rootElement.props.children);
	      }
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
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // Trip mounted flag, future style renderings are added to head instead of
	      // being injected as an embedded style element
	      __MOUNTED__ = true;

	      if (!window._reactiveStyle) {
	        var styleEl = document.createElement('style');
	        styleEl.className = 'reactive-style';
	        styleEl.type = 'text/css';
	        styleEl.innerHTML = this._style.innerHTML;
	        document.head.appendChild(styleEl);
	        window._reactiveStyle = {
	          el: styleEl,
	          cssTextHashesAddedToHead: [(0, _reactLibAdler2.default)(this._style.innerHTML)]
	        };
	        this.forceUpdate();
	      } else if (this._style) {
	        this.addCSSTextToHead(this._style.innerHTML);
	        this.forceUpdate();
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
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;