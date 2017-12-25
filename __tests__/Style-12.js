import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-12', () => {
  it('removes single and double quotes from CSS declaration bodies', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @media all and (orientation: portrait) {
              #box {
                background-image: url('http://google.com/');
                font-family: 'Helvetica', "Arial";
              }
            }
          `}

          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];
    const scopedClass = rootNode.className.split(' ').slice(-1)[0];

    expect(rootNode.className).toEqual(`${scopedClass}`);
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` @media all and (orientation: portrait) { #box.${scopedClass} , .${scopedClass}  #box { background-image: url('http:\/\/google.com/'); font-family: 'Helvetica', "Arial"; }}`);
  });
});