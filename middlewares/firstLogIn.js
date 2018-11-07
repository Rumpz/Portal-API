module.exports = (req, res, next) => {
  return req.user.firstLogIn !== 'True'
    ? next()
    : res.render('./pages/newPassword', {message: req.flash('signupMessage'), username: req.user.username});
};
