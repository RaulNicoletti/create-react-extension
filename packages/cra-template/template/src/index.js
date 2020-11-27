import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './views/Popup';
import Options from './views/Options';

const popup = document.getElementById('popup');
const options = document.getElementById('options');

if (popup) {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    popup
  );
} else if (options) {
  ReactDOM.render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>,
    options
  );
}
