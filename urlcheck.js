var exports = module.exports = {}

var url = process.env.MONGOLAB_URI
var mongoose = require('mongoose')
var URL = mongoose.model('URL', {original: String, shortened: String})


exports.checkValidity = function(myInput) {
  insertTest()
  return myInput
}

var insertTest = function(callback) {
  mongoose.connect(url)
  
  var test1 = new URL({original: 'www.google.com', shortened: 'www.goog.com'})
  
  test1.save(function (err, testObj) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully saved ' + testObj)
    }
  })
  
}
