import React from 'react';
import ReactDom from 'react-dom';
import { Application } from './Application';

function render() {
  const mount = document.getElementById('root');
  ReactDom.render(<Application />, mount);
}

render();

if (module.hot) {
  module.hot.accept('./Application', render);
}
