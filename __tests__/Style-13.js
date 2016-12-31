import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-13', () => {
  it('scopes only one root selector if a selector is union root selector', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            #box.rootClass { color: red; }
          `}

          <div id="box" className="rootClass" />
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`rootClass ${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` #box.${scopedClass}.rootClass , .${scopedClass}  #box.rootClass { color: red; }`);
  });
});