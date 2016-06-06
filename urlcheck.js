var exports = module.exports = {}

var dbUrl = process.env.MONGOLAB_URI
var mongoose = require('mongoose')
var URL = mongoose.model('URL', {original: String, shortened: String})


exports.checkValidity = function(myInput) {
  insertTest()
  return myInput
}

var insertTest = function(callback) {
  mongoose.connect(dbUrl)
  /*
  var test1 = new URL({original: 'www.google.com', shortened: 'www.goog.com'})
  
  test1.save(function (err, testObj) {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully saved ' + testObj)
    }
  })
  */
  var db = mongoose.connection
  
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function() {
    console.log("Connected to DB")
  //do operations which involve interacting with DB.
  })
}
