const validator = require('validator')
const User = require('../../models').User
exports.get = function *(id, next) {
  let user, info
  if (this.isUnauthenticated()) {
    return this.body = {
      error: 400,
      code: '请先登录'
    }
  }
  if (!validator.isMongoId(id)) {
    return 
  }
  try {
    user = yield User.findById(id)
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
      code: 404,
      error: '未找到此用户'
    }
  }
  info = {
    
  }

}