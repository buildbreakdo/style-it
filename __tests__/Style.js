import React from 'react';
import { findDOMNode } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

// import DummyPassthroughComponent from './components/DummyPassthroughComponent';
// import DummyWrapperComponent from './components/DummyWrapperComponent';
const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

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
    expect(styleNode.textContent).toEqual(`body {\n font-size: 13px;\n }\n`);
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
    expect(styleNode.textContent).toEqual(`.foo._scoped-1300250854 , ._scoped-1300250854 .foo {\n color: red;\n }\n`);
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
    expect(styleNode.textContent).toEqual(`._scoped-891501385 .foo {\n color: red;\n }\n`);
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
    expect(styleNode.textContent).toEqual(`._scoped-1959802284 .foo {\n color: red;\n }\n`);
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
    expect(styleNode.textContent).toEqual(`div._scoped-1385182589 , ._scoped-1385182589 div {\n color: red;\n }\n`);
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


  it('@media should be unscoped while .button selector should be contains scoped', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {'@media (max-width: 480px) { .button { width: 160px; } }'}
          <div className="container">
            <button className="button">Click me!</button>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('container _scoped-182931118');
    expect(styleNode.textContent).toEqual(`@media (max-width: 480px) {\n._scoped-182931118  .button {\n width: 160px;\n }\n}\n`);
  });

  it('should not scope @media while #button selector should be contains and union scoped', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {'@media (max-width: 480px) { #button { width: 160px; } }'}
          <div className="container" id="button">
            <button className="button">Click me!</button>
          </div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('container _scoped-933843706');
    expect( removeNewlines( styleNode.textContent) )
      .toEqual('@media (max-width: 480px) { #button._scoped-933843706 , ._scoped-933843706  #button { width: 160px; }}');
  });

  it('does not scope keyframes or keyframe offsets', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @-webkit-keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }
            @-moz-keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }
            @-o-keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }
            @keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }

            #box {
              -webkit-animation: NAME-YOUR-ANIMATION 5s infinite; /* Safari 4+ */
              -moz-animation:    NAME-YOUR-ANIMATION 5s infinite; /* Fx 5+ */
              -o-animation:      NAME-YOUR-ANIMATION 5s infinite; /* Opera 12+ */
              animation:         NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */
            }
          `}
          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-704047996');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual('@-webkit-keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} @-moz-keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} @-o-keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} @keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} #box._scoped-704047996 , ._scoped-704047996  #box { -webkit-animation: NAME-YOUR-ANIMATION 5s infinite; /* Safari 4+ */ -moz-animation: NAME-YOUR-ANIMATION 5s infinite; /* Fx 5+ */ -o-animation: NAME-YOUR-ANIMATION 5s infinite; /* Opera 12+ */ animation: NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */ }');
  });

});