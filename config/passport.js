const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const user = require('../models').admin.user;

// Exporting passport function for login
// Examples used from passport Documentation
module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    user.selectID(id, function (err, rows) {
      if (err) return console.log(err);
      done(err, rows[0]);
    });
  });
  // Using passport local strategy
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      // select user settings from DB
      user.selectName(username, function (err, rows) {
        if (err) return done(err);
        if (!rows.length) return done(null, false, req.flash('loginMessage', 'No user found.'));
        if (!bcrypt.compareSync(password, rows[0].password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, rows[0]);
      });
    })
  );
};
