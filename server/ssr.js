const { renderReact } = require('../dist/server');
const { meta, scripts, styles } = require('./templateContext');

module.exports = {
  renderWithLayout (ctx) {
    const url = ctx.url;
    const { content } = renderReact(url);

    return ctx.render('app', { content, meta, scripts, styles });
  },
};
