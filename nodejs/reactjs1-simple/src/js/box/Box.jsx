import React, { Component } from 'react';

require( './Box.css' );

class Box extends Component {
  static defaultProps = {
    text: 'No Text',
    color: '#444'
  };

  render() {
    const style = {
      backgroundColor: this.props.color
    };

    return (
      <div style={style}
           className='Box'>{this.props.text}</div>
    )
  }
}

export default Box;