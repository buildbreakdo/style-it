import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// import DummyPassthroughComponent from './components/DummyPassthroughComponent';
// import DummyWrapperComponent from './components/DummyWrapperComponent';

import Style from '../src/index.js';

describe('Style', () => {
  it('renders unscoped global CSS when <Style> does not wrap an element', () => {
    // Render a styles in the document
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>{`body { font-size: 13px; }`}</Style>
      </div>
    );

    const styleNode = findDOMNode(wrapper).children[0];

    // Verify that stylecontent
    expect(styleNode.textContent).toEqual(`body { font-size: 13px; }`);
  });

  it('creates a union and contains selector scope for root selectors', () => {
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

    expect(rootNode.className).toEqual('foo _scoped-1300250854');
    expect(styleNode.textContent).toEqual(`.foo._scoped-1300250854 , ._scoped-1300250854 .foo { color: red; }`);
  });

  it('creates a contains selector scope when no root selector is present', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
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
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-891501385');
    expect(styleNode.textContent).toEqual(`._scoped-891501385 .foo { color: red; }`);
  });

  it('creates a contains selector scope when selector targets nothing and no root selector is present', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
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
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-1959802284');
    expect(styleNode.textContent).toEqual(`._scoped-1959802284 .foo { color: red; }`);
  });

  it('creates a contains and union selector when selecting an element type', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
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
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-1385182589');
    expect(styleNode.textContent).toEqual(`div._scoped-1385182589 , ._scoped-1385182589 div { color: red; }`);
  });

  it('errors out when the root element is a void element type', () => {
    try {
      const wrapper = TestUtils.renderIntoDocument(
        <div>
          <Style>
            {`
              img {
                width: 200px;
              }
            `}

            <img src="#" />
          </Style>
        </div>
      );
    } catch (e) {
        // Errored out as expected
        // Pass
        return undefined;
    }

    // Fail
    throw new Error('Void element type cannot be allowed to be root');
  });

    it('@media should be unscoped while .button selector should be scoped', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @media (max-width: 480px) {
              .button {
                width: 160px;
              }
            }
          `}

          <div className="container">
            <button className="button">Click me!</button>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('container _scoped--1820239830');
    expect(styleNode.textContent).toEqual(`@media (max-width: 480px) {._scoped--1820239830  .button { width: 160px; }}`);
  });

});