(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Root"] = factory(require("React"));
	else
		root["Root"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _reactLibAdler = __webpack_require__(2);

	var _reactLibAdler2 = _interopRequireDefault(_reactLibAdler);

	var _reactLibEscapeTextContentForBrowser = __webpack_require__(3);

	var _reactLibEscapeTextContentForBrowser2 = _interopRequireDefault(_reactLibEscapeTextContentForBrowser);

	var _cssbeautify = __webpack_require__(1);

	var _cssbeautify2 = _interopRequireDefault(_cssbeautify);

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

			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Style)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.processStyleString = function (styleString, scopedClassName, rootSelectors) {
				// TODO: Look into using memoizeStringOnly from fbjs/lib for escaped strings;
				// can avoid much of the computation as long as scoped doesn't come into play
				// which would be unique
				// TODO: If dev lint and provide feedback
				// if linting fails we need to error out because
				// the style string will not be parsed correctly

				return styleString.trim().replace(/\s\s+/g, ' ').split('}').map(function (fragment) {
					var isDeclarationBodyPattern = /;/g;
					var isAtRulePattern = /@/g;
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
							return (0, _reactLibEscapeTextContentForBrowser2.default)(statement);
						} else {
							// Statement is a selector
							var selector = statement;

							if (scopedClassName) {
								// Prefix the scope to the selector if it is not an at-rule
								if (!selector.match(isAtRulePattern)) {
									return _this.scopeSelector(scopedClassName, selector, rootSelectors);
								} else {
									// Is at-rule and should not be scoped
									return selector;
								}
							} else {
								// No scope; do nothing to the selector
								return selector;
							}
						}
					}).join('{');
				}).join('}');
			}, _this.scopeSelector = function (scopedClassName, selector, rootSelectors) {
				var scopedSelector = '';

				// Matches comma-delimiters in multi-selectors (".fooClass, .barClass {...}" => "," );
				// ignores commas-delimiters inside of brackets and parenthesis ([attr=value], :not()..)
				var groupOfSelectorsPattern = /,(?![^\(|\[]*\)|\])/g;

				var selectors = selector.split(groupOfSelectorsPattern);

				var containsSelector = void 0; // [data-scoped="54321"] .someClass
				var unionSelector = void 0; // [data-scoped="54321"].someClass (account for root)
				for (var i = 0; i < selectors.length; i++) {
					if (rootSelectors.length && rootSelectors.some(function (rootSelector) {
						return selector.match(rootSelector);
					})) {
						(function () {
							var unionSelector = selectors[i];

							// Can't just add them together because of selector combinator complexity
							// like '.rootClassName.someClass.otherClass > *' or :not('.rootClassName'),
							// replace must be used
							rootSelectors.forEach(function (rootSelector) {
								var escapedRootSelector = rootSelector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
								unionSelector = unionSelector.replace(new RegExp(escapedRootSelector, 'g'), scopedClassName + rootSelector);
							});

							scopedSelector += unionSelector;
						})();
					} else {
						containsSelector = scopedClassName + ' ' + selectors[i];
						scopedSelector += containsSelector;
					}
				}

				return scopedSelector;
			}, _this.stringifyComponent = function (component) {
				var toFlatten = [component];
				var toDereference = [];

				while (toFlatten.length) {
					var thisComponent = toFlatten.splice(0, 1)[0];
					if (thisComponent.props && thisComponent.props.children) {
						toFlatten = toFlatten.concat(thisComponent.props.children);
					}

					toDereference.push(thisComponent);
				}

				return JSON.stringify(toDereference.map(function (item) {
					if (_this.isComponent(item)) {
						var newComponent = { props: {} };
						var blacklistedKeys = ['_owner', 'props', 'children'];

						var _loop = function _loop(key) {
							if (!item.hasOwnProperty(key) || blacklistedKeys.some(function (blacklistedKey) {
								return blacklistedKey === key;
							})) {
								return 'continue';
							}

							newComponent[key] = item[key];
						};

						for (var key in item) {
							var _ret3 = _loop(key);

							if (_ret3 === 'continue') continue;
						}

						var _loop2 = function _loop2(_key2) {
							if (!item['props'].hasOwnProperty(_key2) || blacklistedKeys.some(function (blacklistedKey) {
								return blacklistedKey === _key2;
							})) {
								return 'continue';
							}
							newComponent['props'][_key2] = item['props'][_key2];
						};

						for (var _key2 in item['props']) {
							var _ret4 = _loop2(_key2);

							if (_ret4 === 'continue') continue;
						}

						return newComponent;
					} else {
						return item;
					}
				}));
			}, _this.scoped = function (styleString) {
				return '_scoped-' + (0, _reactLibAdler2.default)(styleString);
			}, _this.isComponent = function (object) {
				var bool = void 0;
				if (object instanceof Array && object.length) {
					bool = object.some(function (item) {
						return item.hasOwnProperty('_owner');
					});
				} else {
					bool = object.hasOwnProperty('_owner');
				}
				return bool;
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}

		_createClass(Style, [{
			key: 'render',
			value: function render() {
				var _this2 = this;

				// If nothing to operate on, is empty; exit
				if (!this.props.children) return _react2.default.createElement('style', { type: 'text/css' });

				var styleString = void 0; // Filter styleString out
				var rootChild = void 0; // Filter rootChild out
				if (this.props.children instanceof Array) {
					styleString = this.props.children.filter(function (child) {
						return !_this2.isComponent(child);
					});
					rootChild = this.props.children.filter(function (child) {
						return _this2.isComponent(child);
					});

					if (__DEV__) {
						if (rootChild.length > 1) {
							throw new Error('Adjacent JSX elements must be wrapped in an enclosing tag (' + rootChild.length + ' root elements detected): ' + JSON.stringify(this.makeNonCircularReferencing(rootChild)));
						}

						if (styleString.length > 1) {
							throw new Error('Multiple style objects as direct descedents of a ' + 'Style component are not supported (' + styleString.length + ' style objects detected): \n\n' + JSON.stringify(styleString));
						}
					}

					// Remove from array; there should be only 1 of each
					rootChild = rootChild[0];
					styleString = styleString[0];

					// Must be only child; determine if only child a style object
				} else if (!this.isComponent(this.props.children)) {
						styleString = this.props.children;
						rootChild = null; // Implies no scoping and global styling
					} else {
							rootChild = this.props.children;
						}

				// Based on filter results do something
				if (!styleString && rootChild) {
					// Passthrough; no style actions
					return (0, _react.cloneElement)(rootChild, _extends({}, rootChild.props), [_react2.default.createElement('style', { type: 'text/css', key: '_scoped-' })].concat(rootChild.props.children));
				} else if (styleString && !rootChild) {
					// Global styling with no scoping
					var processedStyleString = this.processStyleString(styleString, '.' + scopedClassName, rootSelectors);

					if (__DEV__) {
						processedStyleString = (0, _cssbeautify2.default)(processedStyleString);
					}

					return _react2.default.createElement('style', { type: 'text/css', dangerouslySetInnerHTML: {
							__html: processedStyleString
						} });
				} else {
					//if (styleString && rootChild) Typical scenario style tree of elements

					// Add uniqueness to component scoping hash by aggregating the component tree
					// into an array and JSON.stringify'ing it; most components are unique at the
					// leaf level where unique data specific to that branch exists (like the
					// text in a list). To be generate as much uniqueness as possible, prop/values
					// are collected from the entire tree; self-references are excluded (these
					// would break JSON stringify). Additionally users can add a "salt" to an
					// object to add additional uniqueness.
					var styleStringPepper = this.stringifyComponent(rootChild);

					var _scopedClassName = this.scoped(styleString + styleStringPepper);

					// Collect all root selectors so we can transform any root selector
					// in the styleString to a union selector (.e.g., .root => ._scoped-123.root)
					var _rootSelectors = [];
					if (rootChild.id) _rootSelectors.push('#' + rootChild.id);
					if (rootChild.props.className) {
						var classNames = rootChild.props.className.trim().replace(/  +/g, ' ') // Replace multiple whitespaces with single
						.split(' ').map(function (thisClassName) {
							return '.' + thisClassName;
						});
						_rootSelectors = _rootSelectors.concat(classNames);
					}

					var _processedStyleString = this.processStyleString(styleString, '.' + _scopedClassName, _rootSelectors);
					if (__DEV__) {
						_processedStyleString = (0, _cssbeautify2.default)(_processedStyleString);
					}

					var styleEl = _react2.default.createElement('style', { type: 'text/css', key: _scopedClassName,
						dangerouslySetInnerHTML: { __html: _processedStyleString } });

					var newClassName = (rootChild.props.className || '') + ' ' + _scopedClassName;

					// To avoid destructuring add className as second time; will override the
					// className declared through ...rootChild.props;
					return (0, _react.cloneElement)(rootChild, _extends({}, rootChild.props, { className: newClassName }), [styleEl].concat(rootChild.props.children));
				}
			}

			/**
	   * Scopes a selector with a given scoping class name as a union or contains selector
	   *
	   *    > proccessStyleString( '.foo { color: red; } .bar { color: green; }', '_scoped-1234, ['.root', '.foo']  )
	   *		".scoped-1234.foo { color: red; } .scoped-1234 .bar { color: green; }"
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
	   *		".scoped-1827481.root"
	   * 
	   * @param {string} scopedClassName Class name used to scope selectors
	   * @param {string} selector Selector to scope
	   * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
	   * @return {!string} Union or contains selector scoped with the scoping className
	   */


			/**
	   * Flattens a component tree into an array; removes all circular references; and
	   * calls JSON stringify. Used to help generate unique checksums using data throughout
	   * the component tree
	   *
	   *    > stringifyComponent( ReactDOMComponent )
	   *		"[{...ReactDOMComponent}, {...ReactDOMComponent}, ...]"
	   *
	   * @param {ReactDOMComponent} component
	   * @return {!string} Flattened JSON stringified component tree with no circular references
	   */

			/**
	   * Creates a scoping className by generating a checksum from a styleString
	   *
	   *    > scoped( 'footer { color: red; }' )
	   *		"_scoped-182938591"
	   *
	   * @param {string} String of style rules
	   * @return {!string} A scoping class name
	   */


			/**
	   * Checks if an object is a React component
	   *
	   *    > isComponent( "this is a string not a component" )
	   *		"false"
	   *
	   * @param {*} object Object to inspect for ReactDOMComponent properties 
	   * @return {!bool} bool True or false
	   */

		}]);

		return Style;
	}(_react.Component);

	exports.default = Style;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 Copyright (C) 2013 Sencha Inc.
	 Copyright (C) 2012 Sencha Inc.
	 Copyright (C) 2011 Sencha Inc.

	 Author: Ariya Hidayat.

	 Permission is hereby granted, free of charge, to any person obtaining a copy
	 of this software and associated documentation files (the "Software"), to deal
	 in the Software without restriction, including without limitation the rights
	 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 copies of the Software, and to permit persons to whom the Software is
	 furnished to do so, subject to the following conditions:

	 The above copyright notice and this permission notice shall be included in
	 all copies or substantial portions of the Software.

	 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 THE SOFTWARE.
	*/

	/*jslint continue: true, indent: 4 */
	/*global exports:true, module:true, window:true */

	(function () {

	    'use strict';

	    function cssbeautify(style, opt) {

	        var options, index = 0, length = style.length, blocks, formatted = '',
	            ch, ch2, str, state, State, depth, quote, comment,
	            openbracesuffix = true,
	            autosemicolon = false,
	            trimRight;

	        options = arguments.length > 1 ? opt : {};
	        if (typeof options.indent === 'undefined') {
	            options.indent = '    ';
	        }
	        if (typeof options.openbrace === 'string') {
	            openbracesuffix = (options.openbrace === 'end-of-line');
	        }
	        if (typeof options.autosemicolon === 'boolean') {
	            autosemicolon = options.autosemicolon;
	        }

	        function isWhitespace(c) {
	            return (c === ' ') || (c === '\n') || (c === '\t') || (c === '\r') || (c === '\f');
	        }

	        function isQuote(c) {
	            return (c === '\'') || (c === '"');
	        }

	        // FIXME: handle Unicode characters
	        function isName(c) {
	            return (ch >= 'a' && ch <= 'z') ||
	                (ch >= 'A' && ch <= 'Z') ||
	                (ch >= '0' && ch <= '9') ||
	                '-_*.:#[]'.indexOf(c) >= 0;
	        }

	        function appendIndent() {
	            var i;
	            for (i = depth; i > 0; i -= 1) {
	                formatted += options.indent;
	            }
	        }

	        function openBlock() {
	            formatted = trimRight(formatted);
	            if (openbracesuffix) {
	                formatted += ' {';
	            } else {
	                formatted += '\n';
	                appendIndent();
	                formatted += '{';
	            }
	            if (ch2 !== '\n') {
	                formatted += '\n';
	            }
	            depth += 1;
	        }

	        function closeBlock() {
	            var last;
	            depth -= 1;
	            formatted = trimRight(formatted);

	            if (formatted.length > 0 && autosemicolon) {
	                last = formatted.charAt(formatted.length - 1);
	                if (last !== ';' && last !== '{') {
	                    formatted += ';';
	                }
	            }

	            formatted += '\n';
	            appendIndent();
	            formatted += '}';
	            blocks.push(formatted);
	            formatted = '';
	        }

	        if (String.prototype.trimRight) {
	            trimRight = function (s) {
	                return s.trimRight();
	            };
	        } else {
	            // old Internet Explorer
	            trimRight = function (s) {
	                return s.replace(/\s+$/, '');
	            };
	        }

	        State = {
	            Start: 0,
	            AtRule: 1,
	            Block: 2,
	            Selector: 3,
	            Ruleset: 4,
	            Property: 5,
	            Separator: 6,
	            Expression: 7,
	            URL: 8
	        };

	        depth = 0;
	        state = State.Start;
	        comment = false;
	        blocks = [];

	        // We want to deal with LF (\n) only
	        style = style.replace(/\r\n/g, '\n');

	        while (index < length) {
	            ch = style.charAt(index);
	            ch2 = style.charAt(index + 1);
	            index += 1;

	            // Inside a string literal?
	            if (isQuote(quote)) {
	                formatted += ch;
	                if (ch === quote) {
	                    quote = null;
	                }
	                if (ch === '\\' && ch2 === quote) {
	                    // Don't treat escaped character as the closing quote
	                    formatted += ch2;
	                    index += 1;
	                }
	                continue;
	            }

	            // Starting a string literal?
	            if (isQuote(ch)) {
	                formatted += ch;
	                quote = ch;
	                continue;
	            }

	            // Comment
	            if (comment) {
	                formatted += ch;
	                if (ch === '*' && ch2 === '/') {
	                    comment = false;
	                    formatted += ch2;
	                    index += 1;
	                }
	                continue;
	            }
	            if (ch === '/' && ch2 === '*') {
	                comment = true;
	                formatted += ch;
	                formatted += ch2;
	                index += 1;
	                continue;
	            }

	            if (state === State.Start) {

	                if (blocks.length === 0) {
	                    if (isWhitespace(ch) && formatted.length === 0) {
	                        continue;
	                    }
	                }

	                // Copy white spaces and control characters
	                if (ch <= ' ' || ch.charCodeAt(0) >= 128) {
	                    state = State.Start;
	                    formatted += ch;
	                    continue;
	                }

	                // Selector or at-rule
	                if (isName(ch) || (ch === '@')) {

	                    // Clear trailing whitespaces and linefeeds.
	                    str = trimRight(formatted);

	                    if (str.length === 0) {
	                        // If we have empty string after removing all the trailing
	                        // spaces, that means we are right after a block.
	                        // Ensure a blank line as the separator.
	                        if (blocks.length > 0) {
	                            formatted = '\n\n';
	                        }
	                    } else {
	                        // After finishing a ruleset or directive statement,
	                        // there should be one blank line.
	                        if (str.charAt(str.length - 1) === '}' ||
	                                str.charAt(str.length - 1) === ';') {

	                            formatted = str + '\n\n';
	                        } else {
	                            // After block comment, keep all the linefeeds but
	                            // start from the first column (remove whitespaces prefix).
	                            while (true) {
	                                ch2 = formatted.charAt(formatted.length - 1);
	                                if (ch2 !== ' ' && ch2.charCodeAt(0) !== 9) {
	                                    break;
	                                }
	                                formatted = formatted.substr(0, formatted.length - 1);
	                            }
	                        }
	                    }
	                    formatted += ch;
	                    state = (ch === '@') ? State.AtRule : State.Selector;
	                    continue;
	                }
	            }

	            if (state === State.AtRule) {

	                // ';' terminates a statement.
	                if (ch === ';') {
	                    formatted += ch;
	                    state = State.Start;
	                    continue;
	                }

	                // '{' starts a block
	                if (ch === '{') {
	                    str = trimRight(formatted);
	                    openBlock();
	                    state = (str === '@font-face') ? State.Ruleset : State.Block;
	                    continue;
	                }

	                formatted += ch;
	                continue;
	            }

	            if (state === State.Block) {

	                // Selector
	                if (isName(ch)) {

	                    // Clear trailing whitespaces and linefeeds.
	                    str = trimRight(formatted);

	                    if (str.length === 0) {
	                        // If we have empty string after removing all the trailing
	                        // spaces, that means we are right after a block.
	                        // Ensure a blank line as the separator.
	                        if (blocks.length > 0) {
	                            formatted = '\n\n';
	                        }
	                    } else {
	                        // Insert blank line if necessary.
	                        if (str.charAt(str.length - 1) === '}') {
	                            formatted = str + '\n\n';
	                        } else {
	                            // After block comment, keep all the linefeeds but
	                            // start from the first column (remove whitespaces prefix).
	                            while (true) {
	                                ch2 = formatted.charAt(formatted.length - 1);
	                                if (ch2 !== ' ' && ch2.charCodeAt(0) !== 9) {
	                                    break;
	                                }
	                                formatted = formatted.substr(0, formatted.length - 1);
	                            }
	                        }
	                    }

	                    appendIndent();
	                    formatted += ch;
	                    state = State.Selector;
	                    continue;
	                }

	                // '}' resets the state.
	                if (ch === '}') {
	                    closeBlock();
	                    state = State.Start;
	                    continue;
	                }

	                formatted += ch;
	                continue;
	            }

	            if (state === State.Selector) {

	                // '{' starts the ruleset.
	                if (ch === '{') {
	                    openBlock();
	                    state = State.Ruleset;
	                    continue;
	                }

	                // '}' resets the state.
	                if (ch === '}') {
	                    closeBlock();
	                    state = State.Start;
	                    continue;
	                }

	                formatted += ch;
	                continue;
	            }

	            if (state === State.Ruleset) {

	                // '}' finishes the ruleset.
	                if (ch === '}') {
	                    closeBlock();
	                    state = State.Start;
	                    if (depth > 0) {
	                        state = State.Block;
	                    }
	                    continue;
	                }

	                // Make sure there is no blank line or trailing spaces inbetween
	                if (ch === '\n') {
	                    formatted = trimRight(formatted);
	                    formatted += '\n';
	                    continue;
	                }

	                // property name
	                if (!isWhitespace(ch)) {
	                    formatted = trimRight(formatted);
	                    formatted += '\n';
	                    appendIndent();
	                    formatted += ch;
	                    state = State.Property;
	                    continue;
	                }
	                formatted += ch;
	                continue;
	            }

	            if (state === State.Property) {

	                // ':' concludes the property.
	                if (ch === ':') {
	                    formatted = trimRight(formatted);
	                    formatted += ': ';
	                    state = State.Expression;
	                    if (isWhitespace(ch2)) {
	                        state = State.Separator;
	                    }
	                    continue;
	                }

	                // '}' finishes the ruleset.
	                if (ch === '}') {
	                    closeBlock();
	                    state = State.Start;
	                    if (depth > 0) {
	                        state = State.Block;
	                    }
	                    continue;
	                }

	                formatted += ch;
	                continue;
	            }

	            if (state === State.Separator) {

	                // Non-whitespace starts the expression.
	                if (!isWhitespace(ch)) {
	                    formatted += ch;
	                    state = State.Expression;
	                    continue;
	                }

	                // Anticipate string literal.
	                if (isQuote(ch2)) {
	                    state = State.Expression;
	                }

	                continue;
	            }

	            if (state === State.Expression) {

	                // '}' finishes the ruleset.
	                if (ch === '}') {
	                    closeBlock();
	                    state = State.Start;
	                    if (depth > 0) {
	                        state = State.Block;
	                    }
	                    continue;
	                }

	                // ';' completes the declaration.
	                if (ch === ';') {
	                    formatted = trimRight(formatted);
	                    formatted += ';\n';
	                    state = State.Ruleset;
	                    continue;
	                }

	                formatted += ch;

	                if (ch === '(') {
	                    if (formatted.charAt(formatted.length - 2) === 'l' &&
	                            formatted.charAt(formatted.length - 3) === 'r' &&
	                            formatted.charAt(formatted.length - 4) === 'u') {

	                        // URL starts with '(' and closes with ')'.
	                        state = State.URL;
	                        continue;
	                    }
	                }

	                continue;
	            }

	            if (state === State.URL) {


	                // ')' finishes the URL (only if it is not escaped).
	                if (ch === ')' && formatted.charAt(formatted.length - 1 !== '\\')) {
	                    formatted += ch;
	                    state = State.Expression;
	                    continue;
	                }
	            }

	            // The default action is to copy the character (to prevent
	            // infinite loop).
	            formatted += ch;
	        }

	        formatted = blocks.join('') + formatted;

	        return formatted;
	    }

	    if (true) {
	        // Node.js module.
	        module.exports = exports = cssbeautify;
	    } else if (typeof window === 'object') {
	        // Browser loading.
	        window.cssbeautify = cssbeautify;
	    }

	}());


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
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }
/******/ ])
});
;