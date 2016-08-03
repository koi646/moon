const mongoose = require('mongoose')
const validator = require('mongoose-validators')
const Buffer = require('buffer').Buffer
const crypto = require('crypto')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: [validateName, '用户名格式不对']
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'femal']
  },
  email: {
    type: String,
    require: true,
    // validate: [
    //   { validate: validateUniqueEmail,
    //     msg: '邮箱已被注册'
    //   },
    //   { validate: validator.isEmail(),
    //     msg: '邮箱格式不对'
    //   }
    // ]
  },
  tel: {
    type: String,
    // required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    validate: [validatePresenceOf, '密码不可以为空']
  },
  hometown: {
    type: String,
    default: ''
  },
  company: {
    type: String
  },
  job: {
    type: String
  },
  height: {
    type: Number,
    required: true,
    max: 250
  },
  avatar: {
    type: String
  },
  verifyToken: {
    type: String,
    default: 0
  },
  provider: {
    type: String,
    default: 'local'
  },  
  createTime: {
    type: Date,
    default: Date.now
  },
  latest: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  privacy: {
    type: Schema.Types.Mixed,
    default: {
      contact: '',
      prinfo: ''     
    }
  },
  intro: {
    type: String,
    default: ''
  },
  salt: String
})
//查询的时候可获取virtual属性
// UserSchema.set('toObject', {virtuals: true })
// UserSchema.set('toJSON', {virtuals: true })
UserSchema.virtual('password').set(function(password) {
  this._password = password
  this.salt = this.makeSalt()
  this.hashed_password = this.hashPassword(password)
}).get(() => this._password)
//pre save hook 除了第三方登陆,存储的密码不能为空
UserSchema.pre('save', (next) => {
  if (this.isNew && this.provider === 'local' && this.password && !this.password.length) {
    return next(new Error('password'))
  }
  next()
})
/**
 * 验证用户名 6-16个英文字母或 2-8个中文
 * @param {String} value
 * @returns {Boolean} 
 */
function validateName(value) {
  return /(^[A-Za-z0-9]{6,16}$)|(^[\u4E00-\u9FA5]{2,8}$)/.test(value)  
}
/**
 * 验证邮箱是否已经注册
 * @param {String} value
 * @param {Function} callback
 * @returns {Boolean}
 */
function validateUniqueEmail(value, callback) {
  let User = mongoose.model('User')
  User.find({
    $and: [{
      email: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, user) {
    callback(err || user.length === 0)
  })
}

//其他方式登录的时候不
function validatePresenceOf(value) {
  // If you are authenticating by any of the oauth strategies, don't validate.
  return (this.provider && this.provider !== 'local') || (value && value.length)
}
/**
 * 增强在UserSchema上的函数
 */
UserSchema.methods = {
  /**
   * HasRole - 判断用户是否有指定权限
   *
   * @param {String} role
   * @return {Boolean}
   * @api public
   */
  hasRole: function(role) {
    var roles = this.roles
    return roles.indexOf('admin') !== -1 || roles.indexOf(role) !== -1
  },

  /**
   * IsAdmin - 判断是否管理员
   *
   * @return {Boolean}
   * @api public
   */
  isAdmin: function() {
    return this.roles.indexOf('admin') !== -1
  },

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(password) {
    return this.hashPassword(password) === this.hashed_password
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64')
  },

  /**
   * Hash password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  hashPassword: function(password) {
    if (!password || !this.salt) return ''
    var salt = new Buffer(this.salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64')
  }
}
module.exports = mongoose.model('User', UserSchema)

