const User = require('../models').User,
  tool = require('../comment/tool'),
  passport = require('koa-passport'),
  checkLogin = tool.checkLogin,
  debug = require('debug')('http')
exports.get = function *() {
  if (checkLogin(this)) {
    this.redirect('/')
  }
  else {
    yield this.render('index')
  }
}
//注册逻辑使用passport中间件 方便以后wechat登陆的扩展性
exports.post = function *(next) { 
  const context = this
  yield passport.authenticate('local', function *(err, user, info) {
    if (err) {
      console.log(err)
    }
    if (user === false) {
      context.flash = { error: '用户名或密码错误' }
      context.body = '用户名或密码错误'
    }
    else {
      yield context.login(user)
      context.body = '用户 ' + user.username + ' 登录成功'
    }
  })
}