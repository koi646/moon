const router = require('koa-router')()
const controller = require('../controller/index')
router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello Koa!'
  })
})
router.get('test/', function *(next) {
  console.log(this.session)
  yield this.render('index', {
    title: '哈利路亚!'
  })
})
router.post('test', controller.user.signUp)


module.exports = router
