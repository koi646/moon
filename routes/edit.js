const tool = require('../comment/tool'),
  checkLogin = tool.checkLogin,
  User = require('../models').User,
  validate = tool.validate,
  debug = require('debug')('http')
exports.get = function *() {
  const _id = this.session.user._id
  const user = yield User.findOne({ _id: _id })
  if (!user) {
    return this.body = {
      code: '500',
      error: '服务器错误'
    }
  }
  for (let i in user) {
    this.body[i] = user[i]
  }
}
/* 更新个人资料 */
exports.post = function *() {
  const body = this.request.body
  const _id = this.session.user._id
  const newdata = {}
  for (let i in body) {
    if (typeof validate[i] === 'function') {
      if (validate[i](body[i])) {
        newdata[i] = body[i]
      }
      else {
        return this.body = {
          code: 401,
          error: i + '参数类型错误'
        }
      }
    }
  }
  
  try {
    yield User.findOneAndUpdate({ _id: _id }, newdata)
  }
  catch (e) {
    console.log(e)
    return this.body = {
      code: 500,
      error: '服务器内部错误'
    }
  }
  return this.body = {
    code: 0,
    success: '更新成功'
  }
}
