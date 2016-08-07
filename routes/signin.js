const User = require('../model').User,
  tool = require('../comment/tool'),
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
exports.post = function *() {
  if (checkLogin(this)) {
    debug(this.session.user.username + ' 已登陆')
    this.flash = { error: '已登陆' }
    this.body = '已登陆'
  }
  else {
    let body = this.request.body
    let user = yield User.findOne({ tel: body.tel })
    console.log(body, user, '什么鬼')
    if (user && (yield tool.bcompare(body.password, user.password))) {
      this.session = {
        username: user.username,
        tel: user.tel,
        _id: user._id,
        gender: user.gender
      }
      debug('用户' + user.username + '登陆成功')
      this.body = '登陆成功'
    }
    else {
      debug('用户名 密码错误')
      this.flash = { error: '用户名或密码错误' }
      this.body = '用户名或密码错误'
    }  
  }
}