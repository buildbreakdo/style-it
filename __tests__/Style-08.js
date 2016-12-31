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
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`container ${scopedClass}`);
    expect( removeNewlines( styleNode.textContent) )
      .toEqual(`@media (max-width: 480px) { #button.${scopedClass} , .${scopedClass}  #button { width: 160px; }}`);
  });
});