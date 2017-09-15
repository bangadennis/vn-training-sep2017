import React, { Component } from 'react';

const style = {
  root: {
    border: '1px solid black',
    padding: 40,
    margin: 5,
    'font-size': '5em',
    'text-align': 'center',
    display: 'inline-block',
    width: 100,
    height: 100
  }
};

class Counter extends Component {
  static defaultProps = {
    number: 0
  };

  render() {
    return <div style={style.root}> {this.props.number}</div>;
  };
}

export default Counter;