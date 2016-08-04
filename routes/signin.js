const User = require('../model').User
const checkLogin = require('../lib/util').checkLogin

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
    this.flash = { error: '已登陆' }
    this.redirect('back')
  }
  else {
    let form = this.request.body
    let user = yield User.find({ tel: form.tel, password: form.password })
    if (!user) {
      this.flash = { error: '用户名或密码错误' }
    }
    else {
      this.session = {
        username: user.username,
        tel: user.tel,
        _id: user._id,
        gender: user.gender
      }
      this.redirect('back')
    }  
  }
}