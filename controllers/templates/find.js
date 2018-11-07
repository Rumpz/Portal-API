const templateModels = require('models').templates;
const {adjustDataToSend} = require('./auxiliaryFunctions.js');

module.exports = {
  all: all,
  byID: byID
};

function all (data, callback) {
  let { templateFK, page } = data;
  templateModels.find.all([page, templateFK], (err, results) => {
    if (err) return callback(err);
    callback(null, adjustDataToSend(results));
  });
}

function byID (page, id, callback) {
  templateModels.find.byID([id, page], (err, results) => {
    if (err) return callback(err);
    callback(null, adjustDataToSend(results));
  });
}
