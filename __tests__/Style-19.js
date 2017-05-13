import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''));

const __DEV__ = (process.env.NODE_ENV !== 'production');

import Style from '../src/index.js';

describe('Style-19', () => {
  it(':target should not be scoped', () => {

    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            :target {
              color: red;
            }
          `}

          <div className="foo">
            <div className="foo"></div>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(/\_(scope)?[\-0-9]+/g.test(styleNode.textContent)).toBeFalsy();
  });
});

