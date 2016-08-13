import React, { Component } from 'react';

class DummyPassthroughComponent extends Component {
  render() {
    return this.props.children;
  }
}

export default DummyPassthroughComponent;