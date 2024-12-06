const express = require('express')
const router = express.Router()

const index = require('../controllers/index.controller')

const loginChk = async function (req, res, next) {
  if (req.user) {
    next()
  } else {
    return res.status(401).send({
      result: 'Fail',
      reason: 'login check fail'
    })
  }
}

module.exports = function (app) {
  // router.post('/user/signin', userController.login)

  app.get('/*', index)
}