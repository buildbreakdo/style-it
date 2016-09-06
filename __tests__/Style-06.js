import React from 'react';
import { findDOMNode, render } from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const removeNewlines = (string) => (string.replace(/(\r\n|\n|\r)/gm, ''))

import Style from '../src/index.js';

describe('Style-06', () => {
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
});