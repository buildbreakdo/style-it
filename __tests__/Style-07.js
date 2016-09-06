import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-07', () => {
  it('@media should be unscoped while .button selector should be contains scoped', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {'@media (max-width: 480px) { .button { width: 160px; } }'}
          <div className="container">
            <button className="button">Click me!</button>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = document.head.querySelector('.reactive-style');

    expect(rootNode.className).toEqual('container _scoped--93711919');
    expect(styleNode.textContent).toEqual(`@media (max-width: 480px) {\n._scoped--93711919  .button {\n width: 160px;\n }\n}\n`);
  });
});