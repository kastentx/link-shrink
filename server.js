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

app.get('/*', function (req, res) {
  var myInput = req.params[0]
  
  res.setHeader('Content-Type', 'application/json')
  
  if (/\w{6}$/.test(myInput)) {
    res.send(JSON.stringify(urlcheck.checkValidity(myInput)))
  } else if (/^https?:\/\/\w+\.?\w+\.\w+/.test(myInput)) {
    res.send(JSON.stringify(urlcheck.checkValidity(myInput + ' - URL')))
  } else {
    res.send(JSON.stringify(urlcheck.checkValidity('ERROR - INVALID INPUT')))
  }
})

app.listen(portNum)