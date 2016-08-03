const router = require('koa-router')()

router.get('/api', function *(next) {
  this.body = 'this a users response!'
})
router.put('/user/:userId', function *() {
  //判断是否本人
})
module.exports = router
