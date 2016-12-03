import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-09', () => {
  it('does not scope keyframe selectors or keyframe offset % syntax', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }

            #box {
              animation: NAME-YOUR-ANIMATION 5s infinite;
            }
          `}
          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped--1609485443');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} #box._scoped--1609485443 , ._scoped--1609485443  #box { animation: NAME-YOUR-ANIMATION 5s infinite; }');
  });
});