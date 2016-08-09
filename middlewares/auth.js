const passport = require('koa-passport'),
  User = require('../models').User,
  tool = require('../comment/tool'),
  LocalStrategy = require('passport-local').Strategy,
  debug = require('debug')('http')
//将user中的id存在session中
passport.serializeUser(function(user, done) {
  done(null, user._id)
})
/**
 * 从session中的user.id去数据库中取出user
 * 这不能用yield  好烦
 */
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})
//策略验证身份 email登陆
passport.use(new LocalStrategy({
  usernameField: 'email' 
}, function(email, password, done) {
  debug(email, password, '<= email, password, auth.js')
  User.findOne({ email: email }).then(function(user) {
    debug(user, '<=  find user in mongo auth.js')
    if (user && tool.bcompare(password, user.passport)) {
      done(null, user)
    } 
    else {
      done(null, false)
    }
  })
}))
/**
 * 判断用户是否登录
 */
// exports.userRequired = function *(next) {
//   const publicUrl = ['/', '/registry', '/signin']
//   console.log(this.url, this.method)
//   if (!(this.url in publicUrl)) {
//     if (this.isAuthenticated()) {
//       return next
//     } 
//     else {
//       this.body = { code: 400, error: '请先登陆' }
//     }
//   }
//   else {
//     yield next
//   }
// }


// exports.adminRequired = function
