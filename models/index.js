// require('./User')
const mongoose = require('mongoose')
const config = require('../config')
const args = process.argv.splice(2)
const User = require('./User')
require('./Follower')
require('./Follower')
let mongoURL = ('-dev' in args) ? config.devMongoURL : config.mongoURL
mongoose.connect(mongoURL)
//默认返回的是mPromise 这里把mPromise都换为Promise
mongoose.Promise = Promise
// let user = new User({
//   username: 'xysdfsdf',
//   password: 'hhhhhh',
//   intro: '这是两个自我介绍',
//   hahah: '123',
//   tel: '13983338118'
// })
// user.save().then(function(e) {
//   console.log(123, e)
// }, function(err) {
//   console.log(err)
// })
exports.User = User