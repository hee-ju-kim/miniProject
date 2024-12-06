'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const path = require('path')
const config = require('./config')
const app = express()

module.exports = function () {
  app.use(express.json({
    limit: '50mb',
  }))
  
  app.use(express.urlencoded({
    limit: '50mb',
    extended: false,
  }))

  app.use(cookieParser(config.sessionSecret))
  app.use(express.static(path.join(__dirname, '../public')))
  
  try {
    app.use(session({
      saveUninitialized: true,
      resave: false,
      secret: config.sessionSecret,
      cookie: {
        maxAge: 1000 * 60 * 30,
      },
      rolling: true,
      store: new fileStore({
        reapInterval: 60,
      }),
    }))
  } catch (e) {
    console.log(e)
  }
 
  require('../routes/routes.js')(app)

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
 
    console.log(`error::: ${JSON.stringify(err, null, 2)}`)
  })

  return app
}
