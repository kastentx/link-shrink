//
// # URL Shortener
//

var express = require('express')
var app = express()
var portNum = 8080

app.get('/', function (req, res) {
  res.sendfile('index.html')
})

app.get('/:url', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(req.params.url))
})

app.listen(portNum)