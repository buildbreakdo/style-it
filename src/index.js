/**
 * Copyright 2016-present, Joshua Robinson
 * All rights reserved.
 *
 * This source code is licensed under the MIT license.
 *
 */

import React, { Component, cloneElement } from 'react';

import adler32 from 'react-lib-adler32';
import escapeTextContentForBrowser from 'react-lib-escape-text-content-for-browser';
const __DEV__ = (process.env.NODE_ENV !== 'production');

class Style extends Component {

  render() {
    // If nothing to operate on, is empty; exit
    if (!this.props.children) return <style type="text/css" />;

    let styleString; // Filter styleString out
    let rootChild; // Filter rootChild out
    if (this.props.children instanceof Array) {
    styleString = this.props.children.filter((child) => (
      !this.isComponent(child))
    );
    rootChild = this.props.children.filter((child) => (
      this.isComponent(child))
    );

    if (__DEV__) {
      if(rootChild.length > 1) {
        throw new Error(
          'Adjacent JSX elements must be wrapped in an enclosing tag (' +
          rootChild.length + ' root elements detected): ' +
          JSON.stringify(this.makeNonCircularReferencing(rootChild))
        );
      }

      if (styleString.length > 1) {
        throw new Error(
          'Multiple style objects as direct descedents of a ' +
          'Style component are not supported (' + styleString.length +
          ' style objects detected): \n\n' +
          JSON.stringify(styleString)
        );
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
  if (!styleString && rootChild) { // Passthrough; no style actions
    return cloneElement(rootChild, {...rootChild.props}, [<style type="text/css" key="_scoped-" />].concat(rootChild.props.children));
  } else if (styleString && !rootChild) { // Global styling with no scoping
    let processedStyleString = this.processStyleString(styleString);

    return (
      <style type="text/css" dangerouslySetInnerHTML={{
        __html: processedStyleString
      }} />
    );

  } else { //if (styleString && rootChild) Typical scenario style tree of elements

    // Add uniqueness to component scoping hash by aggregating the component tree
    // into an array and JSON.stringify'ing it; most components are unique at the
    // leaf level where unique data specific to that branch exists (like the
    // text in a list). To generate as much uniqueness as possible, prop/values
    // are collected from the entire tree; self-references are excluded (these
    // would break JSON stringify). Additionally users can add a "salt" to an
    // object to add additional uniqueness.
    const styleStringPepper = this.stringifyComponent(rootChild);

    const scopedClassName = this.scoped(styleString + styleStringPepper);

    // Collect all root selectors so we can transform any root selector
    // in the styleString to a union selector (.e.g., .root => ._scoped-123.root)
    let rootSelectors = [];
    if (rootChild.id) rootSelectors.push('#' + rootChild.id);
    if (rootChild.props.className) {
      const classNames = (
        rootChild.props.className
        .trim()
        .replace(/  +/g, ' ') // Replace multiple whitespaces with single
        .split(' ')
        .map((thisClassName) => ('.' + thisClassName))
      );
      rootSelectors = rootSelectors.concat(classNames);
    }
    if (!rootSelectors.length) {
      rootSelectors.push(rootChild.type);
    }

    let processedStyleString = this.processStyleString(
      styleString, '.' + scopedClassName, rootSelectors
    );

    const styleEl = (
      <style type="text/css" key={scopedClassName}
        dangerouslySetInnerHTML={{__html: processedStyleString }} />
    );

    const newClassName =  (rootChild.props.className || '') + ' ' + scopedClassName;

    // To avoid destructuring add className second time; will override the
    // className declared through ...rootChild.props;
    return cloneElement(
      rootChild,
      {...rootChild.props, className: newClassName },
      [styleEl].concat(rootChild.props.children)
    );
  }
}

/**
 * Scopes a selector with a given scoping class name as a union or contains selector
 *
 *    > proccessStyleString( '.foo { color: red; } .bar { color: green; }', '_scoped-1234, ['.root', '.foo']  )
 *    ".scoped-1234.foo { color: red; } .scoped-1234 .bar { color: green; }"
 *
 * @param {string} styleString String of style rules
 * @param {string} scopedClassName Class name used to create a unique scope
 * @param {array} rootSelectors Array of selectors on the root element; ids and classNames
 * @return {!string} Scoped style rule string
 */
processStyleString = (styleString, scopedClassName, rootSelectors) => {
  // TODO: Look into using memoizeStringOnly from fbjs/lib for escaped strings;
  // can avoid much of the computation as long as scoped doesn't come into play
  // which would be unique
  // TODO: If dev lint and provide feedback
  // if linting fails we need to error out because
  // the style string will not be parsed correctly


  return styleString.trim().replace(/\s\s+/g, ' ').split('}').map((fragment) => {
    const isDeclarationBodyPattern = /;/g;
    const isAtRulePattern = /@/g;
    // Split fragment into selector and declarationBody; escape declaration body
    return fragment.split('{').map((statement) => {
        // Avoid processing whitespace
        if (!statement.trim().length) {
          return;
        }

        // Skip escaping selectors statements since that would break them;
        // note in docs that selector statements are not escaped and should
        // not be generated from user provided strings
        if (statement.match(isDeclarationBodyPattern)) {
          return escapeTextContentForBrowser(statement);
        } else { // Statement is a selector
          const selector = statement;

          if (scopedClassName) {
            // Prefix the scope to the selector if it is not an at-rule
            if (!selector.match(isAtRulePattern)) {
              return this.scopeSelector(scopedClassName, selector, rootSelectors);
            } else {
              // Is at-rule and should not be scoped
              return selector;
            }

          } else {
            // No scope; do nothing to the selector
            return selector;
          }
        }

      // Pretty print in dev
      }).join('{')
  }).join('}');
}

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
scopeSelector = (scopedClassName, selector, rootSelectors) => {
  let scopedSelector = '';

  // Matches comma-delimiters in multi-selectors (".fooClass, .barClass {...}" => "," );
  // ignores commas-delimiters inside of brackets and parenthesis ([attr=value], :not()..)
  const groupOfSelectorsPattern = /,(?![^\(|\[]*\)|\])/g;

  const selectors = selector.split(groupOfSelectorsPattern);

  let containsSelector; // [data-scoped="54321"] .someClass
  let unionSelector; // [data-scoped="54321"].someClass (account for root)
  for (let i = 0; i < selectors.length; i++) {
    if (rootSelectors.length && rootSelectors.some((rootSelector)=>(selector.match(rootSelector)))) {
      unionSelector = selectors[i];

      // Can't just add them together because of selector combinator complexity
      // like '.rootClassName.someClass.otherClass > *' or :not('.rootClassName'),
      // replace must be used
      rootSelectors.forEach((rootSelector) => {
        const escapedRootSelector = rootSelector.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        unionSelector = unionSelector.replace(new RegExp(escapedRootSelector, 'g'), rootSelector +  scopedClassName);
      });

      scopedSelector += unionSelector;
    } else {
      containsSelector = scopedClassName + ' ' + selectors[i];
      scopedSelector += containsSelector;
    }
  }

  return scopedSelector;
}

/**
 * Flattens a component tree into an array; removes all circular references and
 * JSON stringifies. Adds uniqueness to checksums using data from
 * the component tree
 *
 *    > stringifyComponent( ReactDOMComponent )
 *    "[{...ReactDOMComponent}, {...ReactDOMComponent}, ...]"
 *
 * @param {ReactDOMComponent} component
 * @return {!string} Flattened JSON stringified component tree with no circular references
 */

stringifyComponent = (component) => {
  let toFlatten = [component];
  const toDereference = [];

  while (toFlatten.length) {
    const thisComponent = toFlatten.splice(0,1)[0];
    if (thisComponent.props && thisComponent.props.children) {
      toFlatten = toFlatten.concat(thisComponent.props.children);
    }

    toDereference.push(thisComponent);
  }

  return JSON.stringify(toDereference.map((item) => {
    if (this.isComponent(item)) {
      const newComponent = {props:{}};
      const blacklistedKeys = ['_owner', 'props', 'children'];

      for (let key in item) {
        if (!item.hasOwnProperty(key) || blacklistedKeys.some((blacklistedKey) => (
          blacklistedKey === key)
        )) {
          continue;
        }

        newComponent[key] = item[key];
      }

      for (let key in item['props']) {
        if (!item['props'].hasOwnProperty(key) || blacklistedKeys.some((blacklistedKey) => (
          blacklistedKey === key)
        )) {
          continue;
        }
        newComponent['props'][key] = item['props'][key];
      }

      return newComponent;
    } else {
      return item;
    }
  }));
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
scoped = (styleString) => (
  '_scoped-' + adler32(styleString)
);

/**
 * Checks if object is a React component
 *
 *    > isComponent( "this is a string not a component" )
 *    "false"
 *
 * @param {*} object Object to inspect for ReactDOMComponent properties
 * @return {!bool} bool True or false
 */
isComponent = (object) => {
    let bool;
    if (object instanceof Array && object.length) {
      bool = object.some((item) => {
        return item.hasOwnProperty('_owner')
      });
    } else {
      bool = object.hasOwnProperty('_owner');
    }
    return bool;
  };
}

export default Style;