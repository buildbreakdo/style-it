import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

class Item extends React.Component {
  render() {
    return Style.it(`
        li {
          color: blue;
        }
      `, (
        <li className="item">
          {this.props.text}
        </li>
      )
    );
  }
}

describe('Style-17', () => {
  it('creates a unique scope hash for each item based on props within that component tree', () => {
    const wrapper = TestUtils.renderIntoDocument(
      <div>
        <Style>
          {`
            ul {
              color: red;
            }
          `}

          <ul>
            <Item text="item1" />
            <Item text="item2" />
          </ul>
        </Style>
      </div>
    );

    const rootNode = findDOMNode(wrapper).children[0];
    const rootStyleNode = rootNode.children[0];
    const rootScopedClass = rootNode.className.split(' ').slice(-1)[0];
    expect(removeNewlines(rootStyleNode.textContent)).toEqual(` ul.${rootScopedClass} , .${rootScopedClass}  ul { color: red; }`);

    const item1Node = rootNode.children[1];
    const item1StyleNode = item1Node.children[0];
    const item1ScopedClass = item1Node.className.split(' ').slice(-1)[0];
    expect(removeNewlines(item1StyleNode.textContent)).toEqual(`.${item1ScopedClass}  li { color: blue; }`);

    const item2Node = rootNode.children[2];
    const item2StyleNode = item2Node.children[0];
    const item2ScopedClass = item2Node.className.split(' ').slice(-1)[0];
    expect(removeNewlines(item2StyleNode.textContent)).toEqual(`.${item2ScopedClass}  li { color: blue; }`);

    expect(item1ScopedClass).not.toEqual(item2ScopedClass);
  });
});