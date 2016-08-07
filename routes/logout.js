const tool = require('../comment/tool'),
  User = require('../model').User,
  validator = require('validator'),
  debug = require('debug')('http'),
  checkLogin = tool.checkLogin
exports.get = function *() {
  yield this.render('index')
}
exports.post = function *() {
  debug('session: ' + this.session)
  if (checkLogin(this)) {
    debug('用户' + this.session.user.username + '已退出')
    this.session.user = null
    this.redirect('/signin')
  }
  else {
    debug('未登录')
    this.flash = { error: '未登录!' }
    this.redirect('/signin')
  }
}