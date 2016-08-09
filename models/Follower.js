const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  FollowerSchema = new Schema({
    //userId
    id: { type: Schema.ObjectId, required: true },
    followers: [
      { id: { type: Schema.ObjectId },
        followTime: { type: Date, default: Date.now }
      }
    ],
    weekIncrease: { type: Number, default: 0 } //一周增加的粉丝数  周排行有用
  })
module.exports = mongoose.model('Follower', FollowerSchema)
  