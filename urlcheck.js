var exports = module.exports = {}
var mongoose = require('mongoose')
var hash = require('mongoose-hash')
var myCode = ''
var insertedID = ''

// Create a schema for URL
var URLSchema = mongoose.Schema({
  code: String,
  original: String,
  short: String
})

URLSchema.plugin(hash, {
  field: 'code',
  size: 3
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
      myCode = 'https://url-shortener-kastentx.c9.io/' + product.code
      insertedID = product._id
    }
    console.log('inserted doc with an ID of ' + insertedID)
    updateShortURL(urlDoc)
  })
  return urlDoc
}

var updateShortURL = function(urlDoc) {
  URL.update({_id: insertedID}, { $set: {
    short: myCode
  }}, { upsert: true }, function(err, numAffected) {
    if (err) {
      console.log('updateShortURL Error: ' + err)
    } else {
      console.log(urlDoc)
    }
  })
  return urlDoc
}
