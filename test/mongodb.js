/*eslint-env node, mocha */
const mocha = require('mocha')
const should = require('chai').should()
const config = require('../config.json')
const mongoose = require('mongoose')
var argument = process.argv.splice(2)
describe('db.js', () => {
  it('生产数据库连接', (done) => {
    mongoose.createConnection(config.mongoURL, (err) => done(err))
  })
  it('开发数据库连接', (done) => {
    mongoose.createConnection(config.devMongoURL, (err) => done(err))
  })
})

