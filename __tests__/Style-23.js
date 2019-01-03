import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-23', () => {
  test('Correctly parses CSS declaration bodies with single property-value and no semi-colon', () => {
    const wrapper = TestUtils.renderIntoDocument(Style.it(`.canvasPage {
      color: red
    }`,
      <div />
    ));

    const wrapperNode = findDOMNode(wrapper);
    const wrapperStyleNode = wrapperNode.children[0];
    const wrapperNodeScopedClass = wrapperNode.className.split(' ').slice(-1)[0];

    expect(wrapperNode.className).toEqual(`${wrapperNodeScopedClass}`);
    expect(removeNewlines(wrapperStyleNode.textContent)).toEqual(`.${wrapperNodeScopedClass} .canvasPage { color: red }`);
  });
});