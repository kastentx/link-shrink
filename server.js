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

app.get('/:code(/\w{6}/)', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(urlcheck.checkValidity(req.params.code)))
})

app.get('/^https?:\/\/\w+\.\w+\.\w+/(url)', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(urlcheck.checkValidity(req.params.url)))
})

app.listen(portNum)