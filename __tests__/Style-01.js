import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-01', () => {
  it('renders unscoped global CSS when <Style> does not wrap an element', () => {
    // Render a styles in the document
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>{`body { font-size: 13px; }`}</Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper)
    const styleNode = rootNode.children[0];

    // Verify that stylecontent
    expect(styleNode.textContent).toEqual(`body {\n font-size: 13px; }\n`);
  });
});