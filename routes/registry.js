const tool = require('../comment/tool'),
  checkLogin = tool.checkLogin,
  User = require('../model').User,
  debug = require('debug')('http')
/**
 * 注册用户
 */
exports.get = function *() {
  yield this.render('index')
}
exports.post = function *() {
  let flash, newUser, user = {}, session = this.session
  const body = this.request.body
  if (checkLogin(this)) {
    flash = { error: '已登录' }
  } 
  if (!body.username) {
    flash = { error: '请输入用户名' }
  }  
  else if (!body.tel && !flash) {
    flash = { error: '请输入手机号' }
  }
  else if (!body.password && !flash) {
    flash = { error: '请输入密码' }
  }
  else if (!body.gender && !flash) {
    flash = { error: '请选择性别' }
  }
  else if ((yield User.findOne({ tel: body.tel })) && !flash) {
    flash = { error: '手机号已注册' }
  }
  if (flash) {
    console.log(flash)
    this.flash = flash
    this.redirect('back')
    return
  }
  user.password = yield tool.bhash(body.password)
  user.tel = body.tel
  user.username = body.username
  user.height = body.height
  user.gender = body.gender,
  newUser = new User(user)
  try {
    user = yield newUser.save()
  } 
  catch (e) {
    console.log(e, '存储新用户出错')
    this.body = '出错'
    this.redirect('back')
    return 
  }
  session.user = {
    username: user.username,
    tel: user.tel,
    _id: user._id,
    gender: user.gender
  }
  debug(session)
  this.body = '注册成功'
}