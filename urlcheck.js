var exports = module.exports = {}

var mongodb = require('mongodb')
var MongoClient = mongodb.MongoClient
var url = process.env.MONGOLAB_URI


exports.checkValidity = function(myInput) {
  return myInput
}

exports.checkDb = function() {
  
  // Use connect method to connect to the Server
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err)
      console.log(url)
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url)
  
      // do some work here with the database.
      //Close connection
      db.close()
    }
  })
}