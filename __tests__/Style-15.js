import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-15', () => {
  it('properly prefixes selectors with comma delimited :before and :after pseudos', () => {
    const wrapper = TestUtils.renderIntoDocument(
        <div>
          <Style>
            {`
              #heart:before,
              #heart:after {
                position: absolute;
                content: "";
              }
            `}

            <div id="heart" />
          </Style>
        </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.id).toEqual('heart');
    expect(rootNode.className).toEqual(`${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` #heart.${scopedClass}:before, .${scopedClass}  #heart:before,  #heart.${scopedClass}:after , .${scopedClass}  #heart:after { position: absolute; content: ""; }`);
  });
});