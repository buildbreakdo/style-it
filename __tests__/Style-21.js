import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-21', () => {
  it('creates a contains and union selector when selecting an element type', () => {
    const wrapper = TestUtils.renderIntoDocument(Style.it(
      `
        div {
          color: red;
        }
      `,
      <div>
        <Style>
          {`
            div {
              color: red;
            }
          `}

          <div>
            <div></div>
          </div>
        </Style>
      </div>
    ));

    const wrapperNode = findDOMNode(wrapper);
    const wrapperStyleNode = wrapperNode.children[0];
    const wrapperNodeScopedClass = wrapperNode.className.split(' ').slice(-1)[0];

    expect(wrapperNode.className).toEqual(`${wrapperNodeScopedClass}`);
    expect(removeNewlines(wrapperStyleNode.textContent)).toEqual(` div.${wrapperNodeScopedClass} , .${wrapperNodeScopedClass}  div { color: red; }`);
  });
});