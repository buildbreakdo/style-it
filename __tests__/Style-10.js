import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-10', () => {
  it('does not scope keyframe "from" and "to" syntax', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @keyframes NAME-YOUR-ANIMATION {
              from   { opacity: 0; }
              to { opacity: 1; }
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

    expect(rootNode.className).toEqual('_scoped--926008811');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @keyframes NAME-YOUR-ANIMATION { from { opacity: 0; } to { opacity: 1; }} #box._scoped--926008811 , ._scoped--926008811  #box { animation: NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */ }');
  });
});