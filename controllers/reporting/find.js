const reportFindModel = require('models').reporting.find;
const SERVICES = require('services');

module.exports = {
  fetchReports: fetchReports,
  byCategory: byCategory,
  byReportFK: byReportFK,
  byFilter: byFilter
};

function fetchReports (callback) {
  reportFindModel.fetchReports((err, rows) => {
    if (err) return callback(err);
    const toSend = SERVICES.tableAdjuster(rows);
    callback(null, toSend);
  });
}

function byCategory (data, callback) {
  if (!data) return;
  // Get the category
  reportFindModel.byCategory(data.category, (err, rows) => {
    if (err) return callback(err);
    if (!rows.length) return callback(null, rows);
    const adjustedValues = SERVICES.tableAdjuster(rows[0]);

    // Get Subcategories from main Category
    const subKeys = Object.keys(rows[1][0]);
    const subCategories = subKeys.map((key) => {
      const vals = rows[1].map((el) => { return el[key]; });
      return vals;
    });
    // Fiter subCat's and remove null vals
    const filteredSubCat = subCategories[0].filter(ele => ele !== null);
    // Assign Object with subCategories
    const toSend = Object.assign(adjustedValues, { subCat: filteredSubCat });
    callback(null, toSend);
  });
}

function byReportFK (data, callback) {
  if (!data) return;
  reportFindModel.byReportFK(data.id, (err, rows) => {
    if (err) return callback(err);
    if (!rows.length) return callback(null, 'Not Found');
    rows = rows[0].link;
    callback(null, rows);
  });
}

function byFilter (data, callback) {
  const { filters } = data;
  reportFindModel.byFilter(filters, (err, rows) => {
    if (err) return callback(err);
    if (!rows.length) return callback(null, 'Not Found');
    const adjustedValues = SERVICES.tableAdjuster(rows);
    callback(null, adjustedValues);
  });
}
