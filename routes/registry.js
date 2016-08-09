const tool = require('../comment/tool'),
  checkLogin = tool.checkLogin,
  User = require('../models').User,
  Redis = require('ioredis'),
  debug = require('debug')('http'),
  redis = new Redis({
    dropBufferSupport: true, 
    port: 6379,
    host: '127.0.0.1',
    db: 1
  })
/**
 * 注册用户
 */
exports.get = function *() {
  yield this.render('index')
}
exports.post = function *() {

  let flash, newUser, user = {}, follow
  
  // try {
  //   follow = yield redis.zadd('zass', [10, 'aaa', 20, 'cccc', 30, 'sss', 40, 'bbb'])
  // }
  // catch (e) {
  //   console.log(e)
  // }
  var a = yield redis.zcard('zass')
  console.log(a)
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
    return
  }
  user.password = yield tool.bhash(body.password)
  user.tel = body.tel
  user.email = body.email
  user.username = body.username
  user.height = body.height
  user.gender = body.gender
  newUser = new User(user)
  try {
    user = yield newUser.save()
  } 
  catch (e) {
    console.log(e, '存储新用户出错')
    return this.body = '出错'
  }
  try {
    follow = yield redis.zadd('zass', [1, 2, 3, 4])
  }
  catch (e) {
    console.log(e)
  }
  console.log(follow)
  yield this.login(user)
  this.body = '用户' + user.username + '注册成功'
}