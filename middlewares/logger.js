module.exports = (req, res, next) => {
  console.log('logggger MIDDLEWARE');
  console.log(req.client['_peername']['address']);
  console.log('req.headers.host', req.headers.host);
// IP ADDRESS FOR NO LOGGERS
  // const user = req.user.username; // USERNAME INSERT FOR LOGGERS
  // TODO INSERT FUNCTION INTO TABLE WITH THE ACTION DETAIL
  next();
};
