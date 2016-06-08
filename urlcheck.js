var exports = module.exports = {}
var mongoose = require('mongoose')
var hash = require('mongoose-hash')
var myCode = ''
var insertedID = ''

// Create a schema for URL
var URLSchema = mongoose.Schema({
  code: String,
  original: String,
  short: { type: String, default: 'https://url-shortener-kastentx.c9.io/' }
})

URLSchema.plugin(hash, {
  field: 'code',
  size: 3
})

URLSchema.pre('save', function(next) {
  console.log('Middleware activated for ' + this.code)
  this.short += this.code
  next()
})

// Create a Model by using the schema defined above
var URL = mongoose.model('URL', URLSchema)

// function exports
exports.newUrl = function(myInput) {
  var myUrl = new URL({original: myInput})
  return insertUrl(myUrl, myCallback)
}

var insertUrl = function(urlDoc, success) {
  console.log("insertURL called")
  
  urlDoc.save(function (err, product) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully saved:\n' + product)
      
      insertedID = product._id
    }
    console.log('inserted doc with an ID of ' + insertedID)
  }).then(function(product) {
    console.log('at the end of then')
    success() 
  })
  console.log('here is the last line')

}

var myCallback = function() {
  console.log('all up in the callback')
}