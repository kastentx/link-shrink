//
// # URL Shortener
//

require('dotenv').config()

var mongoose = require('mongoose')
var hash = require('mongoose-hash')
var express = require('express')
var app = express()
var portNum = PORT
var dbUrl = MONGOLAB_URI

// connect to the database when app starts
mongoose.connect(dbUrl)
var db = mongoose.connection

// display landing page if no input given
app.get('/', function (req, res) {
  res.sendfile('index.html')
})

// take action based on the type of input
app.get('/*', function (req, res) {
  var myInput = req.params[0]
  res.setHeader('Content-Type', 'application/json')
  
  // RETRIEVE A SHORTENED URL
  if (/\w{6}$/.test(myInput)) {
    
    URL.findOne({ code: myInput}, function (err, doc){
      if (err) {
        console.log(err)
      }
      if (doc) {
        res.redirect(doc.original)
      } else {
        res.send(JSON.stringify('No shortened URL with this address.'))  
      }
      
    });
    
  // CREATE A NEW URL ENTRY
  } else if (/^https?:\/\/\w+(?:[\/\-\.]?\w+)*\.\w+$/.test(myInput)) {
    var myUrl = new URL({original: myInput, short: req.protocol + '://' + req.host + '/'})
    
    myUrl.save(function (err, product) {
      if (err) {
        console.log(err)
      } else {
        res.send(JSON.stringify(product.short))
      }
    })  
    
  // DISPLAY ERROR MESSAGE WITH UNRECOGNIZED INPUT  
  } else {
    res.send(JSON.stringify('ERROR - INVALID INPUT'))
  }
})
.listen(portNum)



// Create a schema for URL
var URLSchema = mongoose.Schema({
  code: String,
  original: String,
  short: String
})

// mongoose-hash plugin generates a 6-digit code for each new url
URLSchema.plugin(hash, {
  field: 'code',
  size: 3
})

// after code is assigned to a new url, add it to the shortened url (output)
URLSchema.pre('save', function(next) {
  //console.log('Middleware activated for ' + this.code)
  this.short += this.code
  next()
})

/*
// only show desired fields when JSON is displayed
URLSchema.methods.toJSON = function() {
  var obj = this.toObject()
  return obj.short
}
*/

// Model based on the schema defined above
var URL = mongoose.model('URL', URLSchema)