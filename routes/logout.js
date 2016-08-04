const User = require('../model').User
const validator = require('validator')
const debug = require('debug')('http')
const checkLogin = require('../lib/util').checkLogin
exports.get = function *() {
  yield this.render('index')
}
exports.post = function *() {
  if (checkLogin(this)) {
    this.session = null
    this.redirect('back')
  }
  else {
    this.flash = { error: '未登录!' }
    this.redirect('/signin')
  }
}