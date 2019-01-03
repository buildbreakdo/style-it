/**
 * Copyright 2016-present, Joshua Robinson
 * All rights reserved.
 *
 * This source code is licensed under the MIT license.
 *
 */

import React, { Component, cloneElement, isValidElement } from 'react';

import adler32 from 'react-lib-adler32';
const __DEV__ = (process.env.NODE_ENV !== 'production');

class Style extends Component {
  constructor(props) {
    super(props);

    this.scopeClassNameCache = {};
    this.scopedCSSTextCache = {};
  }

  render() {
    if (!this.props.children) {
      return this.createStyleElement();
    }

    const styleString = this.getStyleString();
    const rootElement = this.getRootElement();

    if (!styleString && rootElement) {
      // Passthrough; no style actions
      return rootElement.props.children;
    } else if (styleString && !rootElement) {
      // Global styling with no scoping
      return this.createStyleElement(this.processCSSText(styleString), this.getScopeClassName(styleString, rootElement));
    } else {
      // Style tree of elements
      const rootElementClassNames = rootElement.props.className ? rootElement.props.className + ' ' : '';
      const rootElementId = rootElement.props.id ? rootElement.props.id : '';

      // If styleString has already been calculated before and CSS text is unchanged;
      // use the cached version. No need to recalculate.
      let scopeClassName;
      let scopedCSSText;
      // Include rootElementClassName and rootElementId as part of cache address
      // to ensure upon state/prop change resulting in new id/class on root element
      // will properly generate a union selector.
      // WARNING: May be a preoptimization; cost of adding union selector to all selectors
      // could be so low that its worth doing so to avoid surface space for bugs
      const scopeClassNameAddress = rootElementClassNames + rootElementId + styleString;
      if (this.scopeClassNameCache[scopeClassNameAddress]) {
        // Use cached scope and scoped CSS Text
        scopeClassName = this.scopeClassNameCache[scopeClassNameAddress];
        scopedCSSText = this.scopedCSSTextCache[scopeClassName];
      } else {
        // Calculate scope and scoped CSS Text
        scopeClassName = this.getScopeClassName(styleString, rootElement);
        scopedCSSText = this.processCSSText(styleString, `.${scopeClassName}`, this.getRootSelectors(rootElement));

        // Cache for future use
        this.scopeClassNameCache[scopeClassNameAddress] = scopeClassName;
        this.scopedCSSTextCache[scopeClassName] = scopedCSSText;
      }

      return cloneElement(
        rootElement,
        {
          ...rootElement.props,
          className: `${rootElementClassNames}${scopeClassName}`
        },
        this.getNewChildrenForCloneElement(
          scopedCSSText,
          rootElement,
          scopeClassName
        )
      );
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
  getStyleString = () => {
    if (this.props.children instanceof Array) {
      const styleString = this.props.children.filter((child) => (
        !isValidElement(child) && typeof child === 'string'
      ));

      if (styleString.length > 1) {
        throw new Error(
          'Multiple style objects as direct descedents of a ' +
          'Style component are not supported (' + styleString.length +
          ' style objects detected): \n\n' + styleString[0]
        );
      }

      return styleString[0];
    } else if (typeof this.props.children === 'string' && !isValidElement(this.props.children)) {
      return this.props.children;
    } else {
      return null;
    }
  }

  /**
  * Filters out the root element from this.props.children
  *
  *    > getRootElement()
  *    "<MyRootElement />"
  *
  * @return {?ReactDOMComponent} component Root element component
  */
  getRootElement = () => {
    if (this.props.children instanceof Array) {
      const rootElement = this.props.children.filter((child) => (
        isValidElement(child)
      ));

      if (__DEV__) {
        if(rootElement.length > 1) {
          console.log(rootElement);
          throw new Error(
            'Adjacent JSX elements must be wrapped in an enclosing tag (' +
            rootElement.length + ' root elements detected).'
          );
        }

        if (typeof rootElement[0] !== 'undefined' && this.isVoidElement(rootElement[0].type)) {
          throw new Error(
            'Self-closing void elements like ' + rootElement.type + ' must be wrapped ' +
            'in an enclosing tag. Reactive Style must be able to nest a style element ' +
            'inside of the root element and void element content models never allow' +
            'it to have contents under any circumstances.'
          );
        }
      }

      return rootElement[0];
    } else if (isValidElement(this.props.children)) {
      return this.props.children;
    } else {
      return null;
    }
  }

  /**
  * Creates an array of selectors which target the root element
  *
  *    > getRootSelectors( <div id="foo" className="bar" /> )
  *    "['#foo', '.bar']"
  *
  * @param {ReactDOMComponent} component
  * @return {!array} array Array of selectors that target the root element
  */
  getRootSelectors = (rootElement) => {
    const rootSelectors = [];

    // Handle id
    if (rootElement.props.id) {
      rootSelectors.push('#' + rootElement.props.id);
    }

    // Handle classes
    if (rootElement.props.className) {
      rootElement.props.className.trim().split(/\s+/g).forEach((className) =>
        (rootSelectors.push(className))
      );
    }

    // Handle no root selector by using type
    if (!rootSelectors.length && typeof rootElement.type !== 'function') {
      rootSelectors.push(rootElement.type);
    }

    return rootSelectors;
  }

  /**
  * Scopes CSS statement with a given scoping class name as a union or contains selector;
  * also escapes CSS declaration bodies
  *
  *    > proccessStyleString( '.foo { color: red; } .bar { color: green; }', '_scoped-1234, ['.root', '.foo']  )
  *    ".scoped-1234.foo { color: red; } .scoped-1234 .bar { color: green; }"
  *
  * @param {string} styleString String of style rules
  * @param {string} scopeClassName Class name used to create a unique scope
  * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
  * @return {!string} Scoped style rule string
  */
  processCSSText = (styleString, scopeClassName, rootSelectors) => {
    // TODO: Look into using memoizeStringOnly from fbjs/lib for escaped strings;
    // can avoid much of the computation as long as scoped doesn't come into play
    // which would be unique

    // TODO: If dev lint and provide feedback
    // if linting fails we need to error out because
    // the style string will not be parsed correctly

    return styleString
      .replace(/\s*\/\/(?![^(]*\)).*|\s*\/\*.*\*\//g, '') // Strip javascript style comments
      .replace(/\s\s+/g, ' ') // Convert multiple to single whitespace
      .split('}') // Start breaking down statements
      .map((fragment) => {
        const isDeclarationBodyPattern = /.*:.*;/g;
        const isLastItemDeclarationBodyPattern = /.*:.*(;|$|\s+)/g;
        const isAtRulePattern = /\s*@/g;
        const isKeyframeOffsetPattern = /\s*(([0-9][0-9]?|100)\s*%)|\s*(to|from)\s*$/g;

        // Split fragment into selector and declarationBody; escape declaration body
        return fragment.split('{').map((statement, i, arr) => {
          // Avoid processing whitespace
          if (!statement.trim().length) {
            return '';
          }

          const isDeclarationBodyItemWithOptionalSemicolon = (
            // Only for the last property-value in a
            // CSS declaration body is a semicolon optional
            (arr.length - 1) === i &&
            statement.match(isLastItemDeclarationBodyPattern)
          );
          // Skip escaping selectors statements since that would break them;
          // note in docs that selector statements are not escaped and should
          // not be generated from user provided strings
          if (statement.match(isDeclarationBodyPattern) || isDeclarationBodyItemWithOptionalSemicolon) {
            return this.escapeTextContentForBrowser(statement);
          } else { // Statement is a selector
            const selector = statement;

            if (scopeClassName && !/:target/gi.test(selector)) {
              // Prefix the scope to the selector if it is not an at-rule
              if (!selector.match(isAtRulePattern) && !selector.match(isKeyframeOffsetPattern)) {
                return this.scopeSelector(scopeClassName, selector, rootSelectors);
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
        }).join('{\n')
    }).join('}\n');
  }

  /**
   * Escaper used in escapeTextContentForBrowser
   *
   */
  escaper = (match) => {
    const ESCAPE_LOOKUP = {
      '>': '&gt;',
      '<': '&lt;'
    };

    return ESCAPE_LOOKUP[match];
  }

  /**
   * Escapes text to prevent scripting attacks.
   *
   * @param {*} text Text value to escape.
   * @return {string} An escaped string.
   */
  escapeTextContentForBrowser = (text) => {
    const ESCAPE_REGEX = /[><]/g;
    return ('' + text).replace(ESCAPE_REGEX, this.escaper);
  }

  /**
   * Scopes a selector with a given scoping className as a union or contains selector
   *
   *    > scopeSelector( '_scoped-1827481', '.root', ['.root', '.foo']  )
   *    ".scoped-1827481.root"
   *
   * @param {string} scopeClassName Class name used to scope selectors
   * @param {string} selector Selector to scope
   * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
   * @return {!string} Union or contains selector scoped with the scoping className
   */
  scopeSelector = (scopeClassName, selector, rootSelectors) => {
    let scopedSelector = [];

    // Matches comma-delimiters in multi-selectors (".fooClass, .barClass {...}" => "," );
    // ignores commas-delimiters inside of brackets and parenthesis ([attr=value], :not()..)
    const groupOfSelectorsPattern = /,(?![^(|[]*\)|\])/g;

    const selectors = selector.split(groupOfSelectorsPattern);

    for (let i = 0; i < selectors.length; i++) {
      let containsSelector; // [data-scoped="54321"] .someClass
      let unionSelector; // [data-scoped="54321"].someClass (account for root)

      if (rootSelectors.length && rootSelectors.some((rootSelector)=>(selector.match(rootSelector)))) {
        unionSelector = selectors[i];

        // Can't just add them together because of selector combinator complexity
        // like '.rootClassName.someClass.otherClass > *' or :not('.rootClassName'),
        // replace must be used

        // Escape valid CSS special characters that are also RegExp special characters
        const escapedRootSelectors = rootSelectors.map(rootSelector => (
          rootSelector.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
        ));

        unionSelector = unionSelector.replace(new RegExp(
            '(' +                             // Start capture group
            escapedRootSelectors.join('|') +  // Match any one root selector
            ')'                               // End capture group
          )
        ,
          '$1' + scopeClassName              // Replace any one root selector match with a union
        );                                    // of the root selector and scoping class (e.g., .rootSelector._scoped-1). Order matters here because of type-class union support like div._scoped-1

        // Do both union and contains selectors because of case <div><div></div></div>
        // or <div className="foo"><div className="foo"></div></div>
        containsSelector = scopeClassName + ' ' + selectors[i];
        scopedSelector.push(unionSelector, containsSelector);
      } else {
        containsSelector = scopeClassName + ' ' + selectors[i];
        scopedSelector.push(containsSelector);
      }
    }

    return scopedSelector.join(', ');
  }

  /**
   * Creates a className used as a CSS scope by generating a checksum from a styleString
   *
   *    > scoped( 'footer { color: red; }' )
   *    "_scoped-182938591"
   *
   * @param {string} String of style rules
   * @return {!string} A scoping class name
   */
  getScopeClassName = (styleString, rootElement) => {
    let hash = styleString;

    if (rootElement) {
      this.pepper = '';
      this.traverseObjectToGeneratePepper(rootElement);
      hash += this.pepper;
    }

    return (__DEV__ ? 'scope-' : 's') + adler32(hash);
  };

  /**
   * Traverses an object tree looking for anything that is not internal or a circular
   * reference. Accumulates values on this.pepper
   *
   *    > traverseObjectToGeneratePepper(obj)
   *    void
   * @param {object} object Object to traverse
   */
  traverseObjectToGeneratePepper = (obj, depth = 0) => {
    // Max depth is equal to max depth of JSON.stringify
    // Max length of 10,000 is arbitrary
    if (depth > 32 || this.pepper.length > 10000) return;

    for (let prop in obj) {
      // Avoid internal props that are unreliable
      const isPropReactInternal = /^[_$]|type|ref|^value$/.test(prop);
      if (!!obj[prop] && typeof(obj[prop]) === 'object' && !isPropReactInternal) {
        this.traverseObjectToGeneratePepper(obj[prop], depth+1);
      } else if (!!obj[prop] && !isPropReactInternal && typeof(obj[prop]) !== 'function') {
        this.pepper += obj[prop];
      }
    }
  }

  /**
   * Checks if a tag type is a self-closing void element
   *
   *    > isVoidElement( "img" )
   *    "true"
   *
   * @param {*} string Element type to check
   * @return {!bool} bool True or false
   */
  isVoidElement = (type) => (
    [
      'area',
      'base',
      'br',
      'col',
      'command',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'meta',
      'param',
      'source',
      'track',
      'wbr'
    ].some((voidType) => (type === voidType))
  )

  /**
   * Add CSS text to the style element in the head of document unless it has
   * already been added.
   *
   *    > addCSSTextToHead( ".foo { color: red; }" )
   *
   * @param {string} string CSS text to add to head
   */
  addCSSTextToHead = (cssText) => {
    if (!cssText.length) {
      return;
    } else {
      const cssTextHash = adler32(cssText);

      if (!window._reactiveStyle.cssTextHashesAddedToHead.some((hash) => (hash === cssTextHash))) {
        window._reactiveStyle.el.innerHTML += cssText
        window._reactiveStyle.cssTextHashesAddedToHead.push(cssTextHash);
      }
    }
  }

  /**
  * Creates the style element used for server side rendering
  *    > createStyleElement( ".foo._scoped-1 { color: red; }" )
  *
  *
  * @param {string} string CSS string
  * @return {ReactDOMComponent} component
  */
  createStyleElement = (cssText, scopeClassName) => {
      return <style type="text/css" key={scopeClassName} ref={(c) => (this._style = c)}
        dangerouslySetInnerHTML={{
          __html: cssText || ''
      }}/>
  }

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
  getNewChildrenForCloneElement = (cssText, rootElement, scopeClassName) => {
    return [this.createStyleElement(cssText, scopeClassName)].concat(rootElement.props.children)
  }

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
  static it = (cssText, rootElement) => {
    return (
      <Style>
        {cssText}
        {rootElement}
      </Style>
    )
  }
}

export default Style;