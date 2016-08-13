import React, { Component } from 'react';

class DummyWrapperComponent extends Component {
  render () {
    var tag = {
      name: this.props.type || 'div'
    }
    return <tag.name> {this.props.children} </tag.name>
  }
}

export default DummyWrapperComponent;