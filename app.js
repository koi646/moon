let app = require('koa')(),
  koa = require('koa-router')(),
  logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror'),
  session = require('koa-generic-session'),
  redisStore = require('koa-redis'),
  flash = require('koa-flash'),
  gzip = require('koa-gzip'),
  config = require('./config.json')
require('./model')

var index = require('./routes/index')
var api = require('./routes/api')
app.keys = ['secret', 'secret2']
// global middlewares
onerror(app)
app.use(logger())
app.use(views('views', {
  root: __dirname + '/views',
  default: 'hbs',
  map: { hbs: 'handlebars' }
}))
app.use(require('koa-bodyparser')())
app.use(session({
  store: redisStore()
}))
app.use(flash())
// app.use(gzip())
app.use(json())

app.use(function *(next) {
  var start = new Date
  yield next
  var ms = new Date - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

app.use(require('koa-static')(__dirname + '/public'))

// routes definition
koa.use('/', index.routes(), index.allowedMethods())
koa.use('/api', api.routes(), api.allowedMethods())
// mount root routes  
app.use(koa.routes())

app.on('error', function(err, ctx) {
  console.error('server error', err, ctx)
})
// var session = require('koa-generic-session');
// var redisStore = require('koa-redis');
// var koa = require('koa');

// var app = koa();
// app.keys = ['keys', 'keykeys'];
// app.use(session({
//   store: redisStore()
// }));

// app.use(function *() {
//   switch (this.path) {
//   case '/get':
//     get.call(this);
//     break;
//   case '/remove':
//     remove.call(this);
//     break;
//   case '/regenerate':
//     yield regenerate.call(this);
//     break;
//   }
// });

// function get() {
//   var session = this.session;
//   session.count = session.count || 0;
//   session.count++;
//   this.body = session.count;
// }

// function remove() {
//   this.session = null;
//   this.body = 0;
// }

// function *regenerate() {
//   get.call(this);
//   yield this.regenerateSession();
//   get.call(this);
// }

// app.listen(8080);


module.exports = app
