'use strict'

const config = require('./config')
const mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = global.Promise
  const db = mongoose.connect(config.dbURL)

  // Load models
  require('../models/user.model')
 
  return db
}
