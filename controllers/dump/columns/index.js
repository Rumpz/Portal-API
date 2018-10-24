const FINDCONTROLLER = require('./find');
const XLSX = require('xlsx');

function getOptions (req, res, next) {
  FINDCONTROLLER.options((err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function columnsByID (req, res, next) {
  FINDCONTROLLER.columnsByID(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!Object.keys(rows)) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function exportXLS (req, res, next) {
  FINDCONTROLLER.exportXLS(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

module.exports = {
  exportXLS: exportXLS,
  getOptions: getOptions,
  columnsByID: columnsByID
};
