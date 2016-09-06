import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-08', () => {
  it('should not scope @media while #button selector should be contains and union scoped', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {'@media (max-width: 480px) { #button { width: 160px; } }'}
          <div className="container" id="button">
            <button className="button">Click me!</button>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = document.head.querySelector('.reactive-style');

    expect(rootNode.className).toEqual('container _scoped--113176122');
    expect( removeNewlines( styleNode.textContent) )
      .toEqual('@media (max-width: 480px) { #button._scoped--113176122 , ._scoped--113176122  #button { width: 160px; }}');
  });
});