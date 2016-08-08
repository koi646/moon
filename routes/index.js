const User = require('../models').User,
  tool = require('../comment/tool'),
  debug = require('debug')
exports.get = function *() {
  if (this.isUnauthenticated()) return this.render('index')

}
exports.post = function *() {
  debug(this.req.user, '<= passport封装的user routes/index.js')
}