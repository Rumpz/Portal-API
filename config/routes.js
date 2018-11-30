const routes = require('../routes');
const async = require('async');
const controllers = require('../controllers');

module.exports = (app, passport) => {
  // Reporting Route
  app.use('/reporting', isLoggedIn, routes.reporting);
  // Dump Route
  app.use('/dump', isLoggedIn, routes.dump);
  // Navbar Route
  app.use('/navbar', isLoggedIn, routes.navbar);
  // Templates
  app.use('/templates', isLoggedIn, routes.templates);
  // GET mainpage
  app.use('/mainpage', isLoggedIn, firstLogIn, routes.mainpage);
  // GET FAQ's page
  app.use('/demopage', isLoggedIn, routes.demopage);

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/', (req, res, next) => { res.redirect('/login'); });
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/mainpage', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }),
  function (req, res) {
    console.log('hello');

    if (req.body.remember) {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 4;
    } else {
      req.session.cookie.expires = false;
    }
    res.redirect('/');
  });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/newPassword', {message: req.flash('signupMessage')});
  });

  // process the signup form
  app.post('/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/mainpage', // redirect to the secure profile section
      failureRedirect: '/login', // redirect back to the signup page if there is an error
      failureFlash: true // allow flash messages
    }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('./pages/profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // Change Password
  app.post('/changePassword', controllers.users.changePassword);
};

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function hasPermission (permissions) {
  return function checkPermission (req, res, next) {
    var hasP = false;

    async.each(permissions, function (permission, callback) {
      if (req.user.group_permission === permission) hasP = true;

      callback();
    }, function (err, data) {
      if (err) next(err);
      console.log(req.user.username);

      if (req.user.required === 'true') hasP = false;
      if (hasP) next();
      else res.redirect('/mainpage');
    });
  };
}

function firstLogIn (req, res, next) {
  if ((req.user.firstLogIn !== 'True')) return next();

  res.render('./pages/newPassword', {message: req.flash('signupMessage'), username: req.user.username});
}
