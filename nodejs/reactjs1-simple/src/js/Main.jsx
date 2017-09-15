import React, { Component } from 'react';
import Box from './box/Box';
import BoxFn from './box-fn/Box';

class Main extends Component {
  render() {
    return (
      <div>
        <h2>Simple ReactJS App</h2>
        <Box text="Hello1" color="red"/>
        <Box text="Hello2" color="green"/>
        <BoxFn text="Hello3" color=" blue"/>
        <BoxFn text="Hello4" color=" goldenrod"/>
      </div>
    )
  }
}

export default Main;