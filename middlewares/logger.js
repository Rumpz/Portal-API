const loggerInsertModel = require('../models').logger.insert;

module.exports = (req, res, next) => {
  let table = {};
  let user = '';

  if (req.method === 'GET') {
    table = req.query;
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    table = req.body;
  }

  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    user = `devOps|${req.ip}`;
  } else {
    user = !req.user
      ? `NoLog|${req.ip}`
      : `${req.user.username}|${req.ip}`;
  }

  const insertObject = {
    user: user,
    link: req.originalUrl.split('?')[0],
    action: req.method,
    requestQuery: JSON.stringify(table)
  };

  loggerInsertModel.logAction(insertObject, (err, rows) => {
    if (err) return next(err);
    console.log('Logged');
    return next();
  });
};
