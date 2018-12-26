import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import App from './App';

export const renderReact = url => {
  const context = {};

  const content = renderToString(
    <App context={context} location={url} routerComponent={StaticRouter} />
  );

  return { content, context };
};
