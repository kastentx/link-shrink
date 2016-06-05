//
// # URL Shortener
//

require('dotenv').config()

var urlcheck = require('./urlcheck.js')
var express = require('express')
var app = express()
var portNum = process.env.PORT


app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.get('/:url', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(urlcheck.checkValidity(req.params.url)))
  //res.send(JSON.stringify(urlcheck.checkValidity(urlcheck.checkDb())))
})

app.listen(portNum)