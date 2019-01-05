const path = require('path');
const getManifests = require('./getManifests');
const {
  meta,
  styles: contextStyles,
  sentry,
} = require('../data/templateContext');

const { client, server } = getManifests();

const SERVER_PATH = path.join(__dirname, '..', '..', server['server.js']);
const { renderReact } = require(SERVER_PATH);

const getClientScripts = () =>
  ['vendor.js', 'client.js'].map(name => client[name]);

const getClientStyles = () => [
  ...contextStyles,
  ['client.css'].map(name => client[name]),
];

module.exports = {
  renderWithLayout (ctx) {
    const scripts = getClientScripts();
    const styles = getClientStyles();
    const { content } = renderReact(ctx.url);

    return ctx.render('app', { content, meta, scripts, styles, sentry });
  },
};
