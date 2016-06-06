var exports = module.exports = {}

var dbUrl = process.env.MONGOLAB_URI
var mongoose = require('mongoose')
var hash = require('mongoose-hash')

// Create a schema for URL
var URLSchema = mongoose.Schema({
  code: {type: String, index: true},
  original: String,
  short: String
})

URLSchema.plugin(hash, {
  field: 'code',
  size: 3
})

// Create a Model by using the schema defined above
var URL = mongoose.model('URL', URLSchema)


exports.checkValidity = function(myInput) {
  return myInput
}

var createLink = function() {
  
}

var insertTest = function() {
  mongoose.connect(dbUrl)
  var test1 = new URL({original: 'http://www.google.com', short: 'http://url-shortener-kastentx.c9users.io/'})
  
  test1.save(function (err, testObj) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully saved ' + testObj)
    }
  })
  /*
  var db = mongoose.connection
  
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log("Connected to DB")
  //do operations which involve interacting with DB.
  })
  */
}
