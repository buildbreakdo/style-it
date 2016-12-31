import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-11', () => {
  it('strips JavasSript style comments', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            // Required to use short syntax for Safarri in order to have
            // flex property work. See https://css-tricks.com/almanac/properties/f/flex-wrap/
            // comment section
            @media all and (orientation: portrait) {
              #box {
                flex: 1 0 50%;
              }
            }
          `}

          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` @media all and (orientation: portrait) { #box.${scopedClass} , .${scopedClass}  #box { flex: 1 0 50%; }}`);
  });
});