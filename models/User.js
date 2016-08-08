const mongoose = require('mongoose')
// const validator = require('mongoose-validators')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  email: { type: String, require: true },
  tel: { type: String, unique: true },
  password: { type: String },
  hometown: { type: String },
  company: { type: String },
  job: { type: String },
  height: { type: Number, required: true, max: 250 },
  avatar: { type: String },
  verifyToken: {
    type: String,
    default: 0
  },
  provider: { type: String, default: 'local' },  
  createTime: { type: Date, default: Date.now },
  latest: { type: Date, default: Date.now },
  birthday: { type: Date },
  privacy: {
    type: Schema.Types.Mixed,
    default: {
      contact: '',
      prinfo: ''     
    }
  },
  intro: { type: String }
})
//查询的时候可获取virtual属性
// UserSchema.set('toObject', {virtuals: true })
// UserSchema.set('toJSON', {virtuals: true })
//pre save hook 除了第三方登陆,存储的密码不能为空
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
  }
}
module.exports = mongoose.model('User', UserSchema)

