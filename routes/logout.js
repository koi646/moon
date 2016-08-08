const tool = require('../comment/tool'),
  User = require('../models').User,
  validator = require('validator'),
  debug = require('debug')('http'),
  checkLogin = tool.checkLogin
exports.get = function *() {
  // yield this.render('index')
}
exports.post = function *() {
  if (this.isUnauthenticated()) {
    this.body = '请先登录'
  }
  else {
    console.log(this.session)
    this.logout()
    console.log(this.session)
    this.body = '退出成功'
  }

}