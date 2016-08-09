const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  FollowingSchema = new Schema({
    //userId
    id: { type: Schema.ObjectId, required: true },
    following: [
      { id: { type: Schema.ObjectId },
        followTime: { type: Date, default: Date.now }
      }
    ]
  })
module.exports = mongoose.model('Following', FollowingSchema)