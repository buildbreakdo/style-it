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
    const styleNode = document.head.querySelector('.reactive-style');


    expect(rootNode.id).toEqual('heart');
    expect(rootNode.className).toEqual('_scoped-1061101797');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` #heart._scoped-1061101797:before, ._scoped-1061101797  #heart:before,  #heart._scoped-1061101797:after , ._scoped-1061101797  #heart:after { position: absolute; content: ''; }`);
  });
});