module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') return next();
  return req.user.firstLogIn !== 'True'
    ? next()
    : res.render('./pages/newPassword', {message: req.flash('signupMessage'), username: req.user.username});
};
