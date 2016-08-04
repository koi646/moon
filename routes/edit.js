const checkLogin = require('../lib/util').checkLogin
const User = require('../model').User
exports.get = function *() {
  if (!checkLogin(this)) {
    return this.body = {
      error: '请先登录',
      code: '400'
    }
  }
  const _id = this.body._id
  const user = yield User.findOne({ _id: _id })
  if (!user) {
    return this.body = {
      error: '服务器错误',
      code: '500'
    }
  }
  this.body = {
    username: user.username,

  }
}
