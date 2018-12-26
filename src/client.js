import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

window.addEventListener('load', () => {
  ReactDOM.hydrate(
    <App routerComponent={BrowserRouter} />,
    document.querySelector('#app')
  );
});
