import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

window.addEventListener('load', () => {
  ReactDOM.hydrate(
    <ErrorBoundary>
      <App routerComponent={BrowserRouter} />
    </ErrorBoundary>,
    document.querySelector('#app')
  );
});
