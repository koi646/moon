let app = require('koa')(),
  route = require('koa-frouter'),
  bodyparser = require('koa-bodyparser'),
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
app.keys = ['secret', 'secret2']
// global middlewares
app.use(bodyparser())
app.use(function *() {
  this.body = this.request.body
})
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

// mount root routes  
app.use(route(app, './routes'))

app.on('error', function(err, ctx) {
  console.error('server error', err, ctx)
})
module.exports = app
