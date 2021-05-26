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

userSchema.pre('save', function (next) {
    const adminEmail = ["arti@gmail.com"];
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) next(err);
      this.password = hashed;
      if(adminEmail.includes(this.email)) {
          this.isAdmin = true;
      }
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};
var User = mongoose.model('User', userSchema);

module.exports = User;