const User = require('../model').User
const validator = require('validator')
const co = require('co')

/**
 * 更新用户资料
 * @param {String} id
 * @param {Object} info 
 */
function updateUserInfo(info) {
  // checkLogion
  // const self = this
  // User.update({ _id: self. }, info).then(function(newDoc) {
  //   console.log(newDoc)
  // }, function(err) {
  //   console.log(err)
  // })
}

/**
 * 判断是否登录 
 * 登陆返回true 未登录返回false
 * 
 */
function checkLogin() {
  if (this.seesion && this.session.user) {
    return true
  }
  return false
}
/**
 * 注册用户
 */
exports.signUp = function *() {
  let flash, newUser, oldUser, context = this
  let user = {}, session = this.session
  const body = this.request.body
  if (!body.username) {
    flash = { error: '请输入用户名' }
  }  
  else if (!body || !body.tel && !flash) {
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
    this.flash = flash
    console.log(flash)
    this.redirect('back')
    return
  }
  user.password = body.password
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
  console.log(session)
  this.body = '注册成功'
}
/**
 * 登录
 * 
 */
exports.signIn = function *() {
  if (checkLogin()) {
    this.flash = { error: '已登录' }
    this.redirect('back')
  } 
  else {
    const body = this.body
    validator.isEmail(body.tel, 'zh-CN')

  }
}
/**
 * 登出
 * @param {function} next
 * returns {void}
 */
exports.signOut = function *(next) {
  if (checkLogin()) {
    this.session = null
    this.redirect('back')
  }
  else {
    this.flash = { error: '未登录!' }
    this.redirect('/signin')
  }
}
