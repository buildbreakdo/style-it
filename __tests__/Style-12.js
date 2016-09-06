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
    const styleNode = document.head.querySelector('.reactive-style');

    expect(rootNode.className).toEqual('_scoped--2064762854');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` @media all and (orientation: portrait) { #box._scoped--2064762854 , ._scoped--2064762854  #box { background-image: url(http:\/\/google.com/); font-family: Helvetica, Arial; }}`);
  });
});