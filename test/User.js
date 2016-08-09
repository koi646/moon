/*eslint-env node, mocha */
const app = require('../app')
const request = require('co-supertest').agent(app.listen())
const mocha = require('mocha')
const coMocha = require('co-mocha')
const mongoose = require('mongoose')
coMocha(mocha)
require('chai').should()
let cookie = {}
describe('路由测试', function() {
  /*初始化数据库*/
  before(function() {
    mongoose.connection.db.dropCollection('users')
  })
  it('GET /test ', function *() {
    let res = yield request.get('/test')
              .expect(200)
              .end()
  })
  it('POST /signUp', function *() {
    const data = {
      username: '柒染',
      password: '123456',
      tel: '1398889988',
      gender: 'male',
      email: '472617147@qq.com',
      height: 178
    }
    let res = yield request.post('/signUp')
              .send(data)
              .expect(200)
              .end()
    res.text.should.equal('注册成功')
    cookie = res.header['set-cookie']
    /*保存cookie进行下一个测试*/
    // request.saveCookies(res)
  })
  it('POST /signOut', function *() {
    cookie.should.be.an('array')
    let res = yield request.post('/signOut')
                 .set('Cookie', cookie)
                 .send()
                 .expect(200)
                 .end()
    res.text.should.equal('已退出')
  })   
})