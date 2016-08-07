const User = require('../models').User,
  tool = require('../comment/tool'),
  checkLogin = tool.checkLogin,
  debug = require('debug')
exports.get = function *() {
  if (!checkLogin(this)) {
    return this.redirect('/signin')
  }
}
exports.post = function *() {
  debug(this.req.user, '<= passport封装的user routes/index.js')
}