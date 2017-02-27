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
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` @keyframes NAME-YOUR-ANIMATION { from { opacity: 0; } to { opacity: 1; }} #box.${scopedClass} , .${scopedClass}  #box { animation: NAME-YOUR-ANIMATION 5s infinite; }`);
  });
});