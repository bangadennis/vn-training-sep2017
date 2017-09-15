import React from 'react';

require( './Box.css' );

const Box = ({text = 'No Text', color = '#444'}) => {
  const style = {backgroundColor: color};
  return <div style={style} className='Box'>{text}</div>;
};

export default Box;