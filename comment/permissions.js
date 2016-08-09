const User = require('../models').User
const redis = require('redis')
/**
 * 获取别人信息 
 * 若互相关注 则可获取私密评论,若单方关注,只能获取公开信息
 * @parma {String} id 自己Id
 * @parma {String} otherId 别人Id
 * @returns {Object} 
 */
exports.getUserInfo = function *(id, otherId) {
  let info, user
  if (id === otherId) {
    //自己
    user = this.req.user.toJSON()
  }
  else {
    user = yield User.findById(otherId)
  }

}