import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-14', () => {
  it('preserves quotes for the CSS property "content"', () => {
    const wrapper = TestUtils.renderIntoDocument(
        <div>
          <Style>
            {`
                .Slide:before { content: " test "; }
                .Slide:after { content: " "; }

                .Foo:after {
                  position: absolute;
                  content: "";
                  width: 100%;
                  height: 100%;
                  backgroud-color: rgba( 0, 0, 0, .7);
                  top: 0;
                  left: 0;
                  z-index: 1;
                }
              `}

            <div className="Slide" />
          </Style>
        </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`Slide ${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` .Slide.${scopedClass}:before , .${scopedClass}  .Slide:before { content: " test "; } .Slide.${scopedClass}:after , .${scopedClass}  .Slide:after { content: " "; }.${scopedClass}  .Foo:after { position: absolute; content: ""; width: 100%; height: 100%; backgroud-color: rgba( 0, 0, 0, .7); top: 0; left: 0; z-index: 1; }`);
  });

});