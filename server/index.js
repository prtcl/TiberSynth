const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const logger = require('koa-logger');
const mount = require('koa-mount');
const serve = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const PORT = process.env.PORT;
const DEV = process.env.NODE_ENV !== 'production';
const DIST = path.join(__dirname, '..', '/dist');
const { renderWithLayout } = require('./lib/ssr');

app.use(logger());
app.use(mount('/assets', serve(DIST)));

if (!DEV) {
  app.use(compress());
}

app.use(
  views(path.join(__dirname, '/templates'), {
    extension: 'hbs',
    map: {
      hbs: 'handlebars',
    },
  })
);

app.use(async ctx => {
  await renderWithLayout(ctx);
});

app.on('error', console.error);

app.listen(PORT);
