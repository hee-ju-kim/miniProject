'use strict'

const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = function () {
  passport.use('local', new LocalStrategy({
      usernameField: 'userName',
      passwordField: 'userPassword',
    },
    function(userName, password, done) {
      User.findOne({
        userName : userName
      }, 
      function (err, user) {
        if (err) {
          return done(err);
        } else if (!user) {
          return done(null, false, {
            message: 'UnknownUser'
          })
        } else if (!user.authenticate(password)) {
          return done(null, false, {
            message: 'InvalidPassword'
          })
        } else {
          return done(null, user)
        }
      })
    }
  ))
}