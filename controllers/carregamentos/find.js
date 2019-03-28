const carrFindModel = require('models').carregamentos.find;

function getTableOptions (permissions, callback) {
  carrFindModel.tableOptions(permissions, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

function getOptionsByID (id, callback) {
  carrFindModel.optionsByID(id, (err, options) => {
    if (err) return callback(err);
    callback(null, options);
  });
}

function byProcedure (database, sql, callback) {
  carrFindModel.byProcedure(database, sql, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  getTableOptions: getTableOptions,
  getOptionsByID: getOptionsByID,
  byProcedure: byProcedure
};
