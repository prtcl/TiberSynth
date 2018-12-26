const path = require('path');
const Koa = require('koa');
const compress = require('koa-compress');
const mount = require('koa-mount');
const serve = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const PORT = process.env.PORT;
const DEV = process.env.NODE_ENV !== 'production';
const { renderWithLayout } = require('./ssr');

if (!DEV) {
  app.use(compress());
}

app.use(mount('/assets', serve(path.join(__dirname, '..', '/dist'))));

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
