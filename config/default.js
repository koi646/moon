const validator = require('validator')
const crypto = require('crypto')
module.exports = {
  '(POST|PUT) /registry': {
    'request': {
      'body': {
        'username': /^.{}$/,
        'password': /^.{6,12}$/,
        'email': 
        'male': 
      }
    }
  }
}