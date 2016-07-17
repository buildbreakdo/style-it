'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLibAdler = require('react-lib-adler32');

var _reactLibAdler2 = _interopRequireDefault(_reactLibAdler);

var _reactLibEscapeTextContentForBrowser = require('react-lib-escape-text-content-for-browser');

var _reactLibEscapeTextContentForBrowser2 = _interopRequireDefault(_reactLibEscapeTextContentForBrowser);

var _cssbeautify = require('cssbeautify');

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

var __DEV__ = process.env.NODE_ENV !== 'production';

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