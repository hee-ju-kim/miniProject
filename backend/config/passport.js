'use strict'

const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
  init: function () {
    passport.serializeUser(function (user, done) {
      done(null, user.id)
    })
  
    passport.deserializeUser(function (id, done) {
      User.findOne({ _id: id }, '-password -salt', function (err, user) {
        done(err, user)
      })
    })
  
    require('./passportStrategies/local.js')()
  },

  isAuthenticated: (req, res, next) => {
    const result = req.isAuthenticated()
    if(result) {
      return next()
    } else if (req.url.indexOf('/api/') !== -1) {
      console.log(`Request api, isAuthenticated: ${result}`)
      console.log(`RemoteIP: ${req.connection.remoteAddress}`)
      if (req.method === 'POST') {
        console.log(JSON.stringify(req.body, null, 2))
      }
      return res.status(401).send('expired') // unathorized
    } else {
      console.log(`Request non-api, isAuthenticated: ${result}`)
      console.log(`RemoteIP: ${req.connection.remoteAddress}`)
      if (req.method === 'POST') {
        console.log(JSON.stringify(req.body, null, 2))
      }
      return res.redirect("/");
    }
    
  }
}
