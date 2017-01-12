var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

passport.use('local', new LocalStrategy({
  passReqToCallback: true
} , function(req, username, attemptedPassword, done) {
  console.log('hit local strategy');
  // look up our user
  User.findOne({username: username}, function(err, foundUser){
    if(!foundUser){ // username doesn't exist in db
      console.log('no user');
      done(null, false, {message:'Incorrect credentials'});
    }else{
      //compare givenPassword to the hashed/salted in the db
      console.log('found user');

      foundUser.comparePassword(attemptedPassword, function(isMatch) {

        if(isMatch){
          console.log('matched password');
          // password matched
          done(null, foundUser, {message:'Login Successed!'});
        }else{
          console.log('did not match password');
          done(null, false, {message:'Incorrect credentials'});
        }
      });
    }
  });

  //
  passport.serializeUser(function(user, done) {
    console.log('serialize user', user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log('deserialize user');
    User.findById(id, function(err, foundUser) {
      done(null, foundUser);
    });
  });
}));

module.exports = passport;
