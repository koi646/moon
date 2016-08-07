let app = require('koa')(),
  route = require('koa-frouter'),
  bodyparser = require('koa-bodyparser'),
  logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror'),
  session = require('koa-generic-session'),
  passport = require('koa-passport'),
  redisStore = require('koa-redis'),
  flash = require('koa-flash'),
  gzip = require('koa-gzip'),
  config = require('./config.json'),
  auth = require('./middlewares/auth')

app.use(function *(next) {
  var start = new Date
  yield next
  var ms = new Date - start
  console.log('响应时间%s %s - %s', this.method, this.url, ms)
})

require('./models')
app.keys = ['secret', 'secret2']
// global middlewares
app.use(bodyparser())
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
//静态文件
app.use(require('koa-static')(__dirname + '/public'))
//passport auth 必须放在路由的前面 passport封装的user在context.req.user里面
app.use(passport.initialize())
app.use(passport.session())
// 路由 
app.use(route(app, './routes'))
app.use(auth.userRequired)

app.on('error', function(err, ctx) {
  console.error('server error', err, ctx)
})
module.exports = app
