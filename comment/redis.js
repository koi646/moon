const Redis = require('ioredis'),
  redis = new Redis({ db: 1 })
exports.followers = function *(userId, newfollows) {
  redis.zadd(userId, )
}