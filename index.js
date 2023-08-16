import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import backgroundImage from './background.jpeg';

document.body.style.background = `url(${backgroundImage}) center/cover no-repeat fixed`;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
