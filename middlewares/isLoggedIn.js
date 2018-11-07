module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return req.isAuthenticated();
  return req.isAuthenticated()
    ? next()
    : res.redirect('/login');
};
