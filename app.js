const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const views = require('koa-views');

const app = new Koa();
const PORT = process.env.PORT;

app.use(serve(path.join(__dirname, '/static')));
app.use(
  views(path.join(__dirname, '/views'), {
    extension: 'hbs',
    map: {
      hbs: 'handlebars',
    },
  })
);

app.use(async ctx => {
  await ctx.render('app', {});
});

app.listen(PORT);
