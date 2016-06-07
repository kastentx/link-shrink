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
  this.short += 'updated'
  next()
})


// Create a Model by using the schema defined above
var URL = mongoose.model('URL', URLSchema)



// function exports
exports.checkValidity = function(myInput) {
  return myInput
}

exports.newUrl = function(myInput, callback) {
  var myUrl = new URL({original: myInput})
  return callback(myUrl)
}

exports.insertUrl = function(urlDoc) {
  
  console.log("insertURL called")
  urlDoc.save(function (err, product, numAffected) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully saved:\n' + product)
      
      insertedID = product._id
    }
    console.log('inserted doc with an ID of ' + insertedID)
  })
  return urlDoc
}
