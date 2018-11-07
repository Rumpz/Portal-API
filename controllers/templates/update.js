const templateModels = require('models').templates;

module.exports = (id, data, callback) => {
  let toUpdate = {
    user: data.user,
    name: data.name,
    template: data.template,
    fonte_FK: data.templateFK
  };
  if (data.inputs) toUpdate.inputs = data.inputs.length ? data.inputs.join(',') : null;
  templateModels.update(id, toUpdate, (err, res) => {
    if (err) return callback(err);
    callback(null, res);
  });
};
