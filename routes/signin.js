const User = require('../model').User
const checkLogin = require('../lib/util').checkLogin
const debug = require('debug')('http')
exports.get = function *() {
  if (checkLogin(this)) {
    this.redirect('/')
  }
  else {
    yield this.render('index')
  }
}
exports.post = function *() {
  if (checkLogin(this)) {
    debug(this.session.user.username + ' 已登陆')
    this.flash = { error: '已登陆' }
    this.redirect('back')
  }
  else {
    let form = this.request.body
    let user = yield User.findOne({ tel: form.tel, password: form.password })
    console.log(form, user, '什么鬼')
    if (!user) {
      debug('用户名 密码错误')
      this.flash = { error: '用户名或密码错误' }
    }
    else {
      this.session = {
        username: user.username,
        tel: user.tel,
        _id: user._id,
        gender: user.gender
      }
      debug('用户' + user.username + '登陆成功')
      this.redirect('back')
    }  
  }
}