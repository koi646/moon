const validator = require('validator')
/**
 * 判断是否登录 
 * 登陆返回true 未登录返回false
 * 
 */
exports.checkLogin = function(context) {
  if (context.session && context.session.user) {
    return true
  }
  return false
}
exports.validate = function(context) {
  return {
    username: function(str) {
      return str.match(/^([u4e00-u9fa5]|[ufe30-uffa0]|[a-za-z0-9_]){3,12}$/)
    },
    job: function(str) {
      return str.match(/^([u4e00-u9fa5]|[ufe30-uffa0]|[a-za-z0-9_]){0,15}$/)
    },
    company: function(str) {
      return str.match(/^([u4e00-u9fa5]|[ufe30-uffa0]|[a-za-z0-9_]){0,15}$/)
    },
    gender: function(str) {
      return str.test(/^male|famele$/)
    },
    password: function(str) {
      return str.length > 6 && str.length < 12
    },
    email: function(str) {
      return validator.isNull(str) || validator.isEmail(str)
    },
    tel: function(str) {
      return validator.isMobilePhone(str)
    },
    height: function(str) {
      return validator.isNull(str) || validator.isInt(str, { min: 0, max: 250 })
    }
  }
}