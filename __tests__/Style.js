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
    expect(removeNewlines(styleNode.textContent)).toEqual(` .foo._scoped-1300250854 , ._scoped-1300250854  .foo { color: red; }`);
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
    expect(removeNewlines(styleNode.textContent)).toEqual(`._scoped-891501385  .foo { color: red; }`);
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
    expect(removeNewlines(styleNode.textContent)).toEqual(`._scoped-1959802284  .foo { color: red; }`);
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
    expect(removeNewlines(styleNode.textContent)).toEqual(` div._scoped-1385182589 , ._scoped-1385182589  div { color: red; }`);
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

  it('does not scope keyframe selectors or keyframe offset % syntax', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @keyframes NAME-YOUR-ANIMATION {
              0%   { opacity: 0; }
              100% { opacity: 1; }
            }

            #box {
              animation:         NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */
            }
          `}
          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped--1705750484');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @keyframes NAME-YOUR-ANIMATION { 0% { opacity: 0; } 100% { opacity: 1; }} #box._scoped--1705750484 , ._scoped--1705750484  #box { animation: NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */ }');
  });

  it('does not scope keyframe "from" and "to" syntax', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            @keyframes NAME-YOUR-ANIMATION {
              from   { opacity: 0; }
              to { opacity: 1; }
            }

            #box {
              animation:         NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */
            }
          `}
          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-656626104');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @keyframes NAME-YOUR-ANIMATION { from { opacity: 0; } to { opacity: 1; }} #box._scoped-656626104 , ._scoped-656626104  #box { animation: NAME-YOUR-ANIMATION 5s infinite; /* IE 10+, Fx 29+ */ }');
  });

  it('strips JavasSript style comments', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            // Required to use short syntax for Safarri in order to have
            // flex property work. See https://css-tricks.com/almanac/properties/f/flex-wrap/
            // comment section
            @media all and (orientation: portrait) {
              #box {
                flex: 1 0 50%;
              }
            }
          `}

          <div id="box"></div>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const styleNode = rootNode.children[0];

    expect(rootNode.className).toEqual('_scoped-456357045');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(' @media all and (orientation: portrait) { #box._scoped-456357045 , ._scoped-456357045  #box { flex: 1 0 50%; }}');
  });

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

    expect(rootNode.className).toEqual('_scoped-1452756925');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` @media all and (orientation: portrait) { #box._scoped-1452756925 , ._scoped-1452756925  #box { background-image: url(http:\/\/google.com/); font-family: Helvetica, Arial; }}`);
  });

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

    expect(rootNode.className).toEqual('rootClass _scoped-1356475730');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` #box._scoped-1356475730.rootClass , ._scoped-1356475730  #box.rootClass { color: red; }`);
  });

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

    expect(rootNode.className).toEqual('Slide _scoped-1502704505');
    expect( removeNewlines(styleNode.textContent) )
      .toEqual(` .Slide._scoped-1502704505:before , ._scoped-1502704505  .Slide:before { content: ' test ' } .Slide._scoped-1502704505:after , ._scoped-1502704505  .Slide:after { content: ' ' }._scoped-1502704505  .Foo:after { position: absolute; content: '' width: 100%; height: 100%; backgroud-color: rgba( 0, 0, 0, .7); top: 0; left: 0; z-index: 1; }`);
  });

});