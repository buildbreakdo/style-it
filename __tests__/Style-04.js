import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-04', () => {
  it('creates a contains selector scope when selector targets nothing and no root selector is present', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            .foo {
              color: red;
            }
          `}

          <div>
            <div></div>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`${scopedClass}`);
    expect(removeNewlines(styleNode.textContent)).toEqual(`.${scopedClass}  .foo { color: red; }`);
  });
});