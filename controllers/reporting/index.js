const FINDCONTROLLER = require('./find');

module.exports = {
  init: init,
  byCategory: byCategory,
  getReport: getReport,
  byFilter: byFilter
};

function init (req, res, next) {
  const permission = process.env.NODE_ENV === 'Production'
    ? req.user.group_permission
    : 'GERAL';
  FINDCONTROLLER.fetchReports(permission, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function byCategory (req, res, next) {
  FINDCONTROLLER.byCategory(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function getReport (req, res, next) {
  FINDCONTROLLER.byReportFK(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    // if (!rows) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function byFilter (req, res, next) {
  FINDCONTROLLER.byFilter(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}
