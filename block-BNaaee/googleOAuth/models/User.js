var mongoose = require("mongoose");

var Schema = mongoose.Schema

var userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    github: {
      name: String,
      username: String,
      image: String
    },
    google: {
      name: String,
      image: String
    },
    providers: [String] 
  })
  var User = mongoose.model('User', userSchema);

  module.exports = User;