import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import DummyPassthroughComponent from './components/DummyPassthroughComponent';
import DummyWrapperComponent from './components/DummyWrapperComponent';

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

  it('creates a union and contains selector scope for root selectors', () => {
    const style = TestUtils.renderIntoDocument(
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
    );

    const styleNode = ReactDOM.findDOMNode(style);

    expect(styleNode.textContent).toEqual(`.foo._scoped-1591558118 , ._scoped-1591558118 .foo { color: red; }`);
  });

  it('creates a contains selector scope when no root selector is present', () => {
    const style = TestUtils.renderIntoDocument(
      <Style>
        {`
          .foo {
            color: red;
          }
        `}

        <div>
          <div className="foo"></div>
        </div>
      </Style>
    );

    const styleNode = ReactDOM.findDOMNode(style);

    expect(styleNode.textContent).toEqual(`._scoped-1468021321 .foo { color: red; }`);
  });

  it('creates a contains selector scope when selector targets nothing and no root selector is present', () => {
    const style = TestUtils.renderIntoDocument(
      <Style>
        {`
          .foo {
            color: red;
          }
        `}

        <div>
          <div></div>
        </div>
      </Style>
    );

    const styleNode = ReactDOM.findDOMNode(style);

    expect(styleNode.textContent).toEqual(`._scoped--1473432404 .foo { color: red; }`);
  });

  it('creates a contains and union selector when selecting an element type', () => {
    const style = TestUtils.renderIntoDocument(
      <Style>
        {`
          div {
            color: red;
          }
        `}

        <div>
          <div></div>
        </div>
      </Style>
    );

    const styleNode = ReactDOM.findDOMNode(style);
    expect(styleNode.textContent).toEqual(`div._scoped--2025376643 , ._scoped--2025376643 div { color: red; }`);
  });

  it('errors out when the root element is a void element type', () => {
    let style;
    let errorMessage = null;
    try {
      style = TestUtils.renderIntoDocument(
        <Style>
          {`
            img {
              width: 200px;
            }
          `}

          <img src="#" />
        </Style>
      );
    } catch (e) {
        // Errored out as expected
        // Pass
        return undefined;
    }

    // Fail
    throw new Error('Void element type cannot be allowed to be root');
  });

});