module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') return next();
  return req.isAuthenticated()
    ? next()
    : res.redirect('/login');
};
