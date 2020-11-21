import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Devtools from './Devtools';

ReactDOM.render(
  <React.StrictMode>
    <Devtools />
  </React.StrictMode>,
  document.getElementById('devtools')
);
