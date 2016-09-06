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
              animation:         NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */
            }
          `}
          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = document.head.querySelector('.reactive-style');

    expect(rootNode.className).toEqual('_scoped--1444792183');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} #box._scoped--1444792183 , ._scoped--1444792183  #box { animation: NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */ }');
  });
});