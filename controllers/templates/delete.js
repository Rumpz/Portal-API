const templateModels = require('models').templates;

module.exports = (id, callback) => {
  templateModels.delete(id, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};
