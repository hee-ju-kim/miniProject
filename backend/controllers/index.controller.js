'use strict'
const express = require('express')
const path = require('path')

const router = new express.Router()

router.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../public/", "index.html"));
})

module.exports = router;