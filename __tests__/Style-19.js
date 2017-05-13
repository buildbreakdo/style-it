import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''));

const __DEV__ = (process.env.NODE_ENV !== 'production');

import Style from '../src/index.js';

describe('Style-19', () => {
  it('', () => {

    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            .foo {
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
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    if (__DEV__) {
      expect(/\_scope\-[\-0-9]+/.test(scopedClass)).toBeTruthy();
    } else {
      expect(/_[\-0-9]+/.test(scopedClass)).toBeTruthy();
    }

    expect(removeNewlines(styleNode.textContent)).toEqual(` .foo.${scopedClass} , .${scopedClass}  .foo { color: red; }`);
    expect(rootNode.className).toEqual(`foo ${scopedClass}`);
  });
});

