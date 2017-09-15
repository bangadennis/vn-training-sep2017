import React from 'react';
import { render } from 'react-dom';
import Main from './Main';

const renderApp = Component => {
  render( <Component/>, document.getElementById( 'root' ) )
};

renderApp( Main );