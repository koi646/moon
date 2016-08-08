const tool = require('../comment/tool'),
  User = require('../models').User,
  validate = tool.validate,
  debug = require('debug')('http')
exports.get = function *() {
  let body = {}
  // const user = JSON.parse(JSON.stringify(this.req.user))
  const user = this.req.user.toJSON()
  if (this.isUnauthenticated() || !user) {
    return this.body = {
      code: 400,
      error: '请先登录'
    }
  }
  debug(user)
  for (let i in user) {
    console.log('========', i)
    body[i] = user[i]
    
  }
  this.body = body
}
/* 更新个人资料 */
exports.post = function *() {
  const body = this.request.body
  const _id = this.req.user._id
  const newdata = {}
  let user
  for (let i in body) {
    debug(i, '==========')
    debug(validate, i) 
    if (typeof validate[i] === 'function') {
      debug(validate[i](body[i]), body[i], '<<<<<')
      if (validate[i](body[i])) {
        newdata[i] = body[i]
        debug(i, newdata[i], '<<<newdata')
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
    user = yield User.findOneAndUpdate({ _id: _id }, newdata)
    debug(user, '更新用户')
  }
  catch (e) {
    console.log(e)
    return this.body = {
      code: 500,
      error: '服务器内部错误'
    }
  }
  if (!user) {
    return this.body = {
      code: 402,
      error: '未找到该用户'
    }
  }
  for (let i in user) {
    this.req.user[i] = user[i]
  }
  return this.body = {
    code: 0,
    success: '更新成功'
  }
}
