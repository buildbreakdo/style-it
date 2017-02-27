import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-16', () => {
  it('does not produce an error when root element children are strings and components', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            .foo {
              color: red;
            }
          `}

          <div className="foo">
            Time to talk
            <div className="foo">
              Football <span>yay</span>
            </div>
            <ul>
              <li>test</li>
            </ul>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`foo ${scopedClass}`);
    expect(removeNewlines(styleNode.textContent)).toEqual(` .foo.${scopedClass} , .${scopedClass}  .foo { color: red; }`);
  });
});