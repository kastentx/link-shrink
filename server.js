//
// # URL Shortener
//

require('dotenv').config()

var urlcheck = require('./urlcheck.js')
var mongoose = require('mongoose')
var express = require('express')
var app = express()
var portNum = process.env.PORT
var dbUrl = process.env.MONGOLAB_URI

// connect to the database when app starts
mongoose.connect(dbUrl)
var db = mongoose.connection

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.get('/*', function (req, res) {
  
  var myInput = req.params[0]
  
  res.setHeader('Content-Type', 'application/json')
  
  if (/\w{6}$/.test(myInput)) {
    res.send(JSON.stringify(urlcheck.checkValidity(myInput)))
  } else if (/^https?:\/\/\w+\.?\w+\.\w+/.test(myInput)) {
    res.send(JSON.stringify(urlcheck.checkValidity(urlcheck.newUrl(myInput, urlcheck.insertUrl))))
  } else {
    res.send(JSON.stringify(urlcheck.checkValidity('ERROR - INVALID INPUT')))
  }
})

app.listen(portNum)