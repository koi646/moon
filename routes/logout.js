const User = require('../model').User
const validator = require('validator')
const debug = require('debug')('http')
const checkLogin = require('../lib/util').checkLogin
exports.get = function *() {
  yield this.render('index')
}
exports.post = function *() {
  debug('session: ' + this.session)
  if (checkLogin(this)) {
    debug('用户' + this.session.user.username + '已退出')
    this.session = null
    this.redirect('back')
  }
  else {
    debug('未登录')
    this.flash = { error: '未登录!' }
    this.redirect('/signin')
  }
}