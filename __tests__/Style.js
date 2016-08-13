import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Style from '../src/index.js';

describe('Style', () => {
  it('renders unscoped global CSS when <Style> does not wrap an element', () => {
    // Render a styles in the document
    const style = TestUtils.renderIntoDocument(
      <Style>{`body { font-size: 13px; }`}</Style>
    );

    const styleNode = ReactDOM.findDOMNode(style);

    // Verify that stylecontent
    expect(styleNode.textContent).toEqual(`body { font-size: 13px; }`);
  });

  it('creates a union selector scope when <Style> wraps a single element', () => {
    const style = TestUtils.renderIntoDocument(
      <Style>
        {`
          div {
            color: red;
          }
        `}

        <div></div>
      </Style>
    );

    const styleNode = ReactDOM.findDOMNode(style);

    expect(styleNode.textContent).toEqual(`div._scoped--1652744130 { color: red; }`);

  });
});