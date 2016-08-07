const User = require('../model').User,
  tool = require('../comment/tool'),
  checkLogin = tool.checkLogin
exports.get = function *() {
  if (!checkLogin(this)) {
    return this.redirect('/signin')
  }
  let user = 
}