import React, { Component } from 'react';
import Counter from './Counter';

class Main extends Component {
  render() {
    return (
      <div>
        <Counter/>
        <Counter/>
      </div>
    )
  }
}

export default Main;