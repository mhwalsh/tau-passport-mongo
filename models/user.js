var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
  var user = this; // represent the user that we are save

  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

    bcrypt.hash(user.password, salt, function(err, hash) {

      user.password = hash;
      next();
    });
  });
});

var User = mongoose.model('users', UserSchema);
module.exports = User;
