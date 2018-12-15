import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-22', () => {
  it('Correctly parses CSS declaration bodies with no semi-colon on last property-value declaration', () => {
    const wrapper = TestUtils.renderIntoDocument(Style.it(`.ant-table-tbody tr td { color: red}`,
      <div />
    ));

    const wrapperNode = findDOMNode(wrapper);
    const wrapperStyleNode = wrapperNode.children[0];
    const wrapperNodeScopedClass = wrapperNode.className.split(' ').slice(-1)[0];

    expect(wrapperNode.className).toEqual(`${wrapperNodeScopedClass}`);
    expect(removeNewlines(wrapperStyleNode.textContent)).toEqual(`.${wrapperNodeScopedClass} .ant-table-tbody tr td { color: red}`);
  });
});