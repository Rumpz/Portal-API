module.exports = function (permissions) {
  return function checkPermission (req, res, next) {
    if (process.env.NODE_ENV === 'test') return next();
    if (req.user.required === 'true') return res.redirect('/mainpage');
    permissions.indexOf(req.user.group_permission) !== -1
      ? next()
      : res.redirect('/mainpage');
  };
};
