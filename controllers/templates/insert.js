const templateModels = require('models').templates;

module.exports = (data, callback) => {
  let toInsert = {
    name: data.name,
    template: data.template,
    inputs: data.inputs ? data.inputs.join(',') : null,
    page: data.page,
    fonte_FK: data.fonte_FK,
    user: data.user
  };
  templateModels.insert(toInsert, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};
