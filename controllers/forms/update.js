const formsFindModel = require('models').forms.find;
const formsUpdateModel = require('models').forms.update;

function updateForm (values, user, ip, callback) {
  const headers = values.header;
  delete values.header;
  const dataToUpdate = [headers, Object.assign(values, {updatedBy: `${user}|${ip}`})];
  formsUpdateModel.tableByID(dataToUpdate, (err, rows) => {
    if (err) return callback(err);
    const { dbConnection, proc_depois } = headers;
    if (proc_depois) {
      let proc = proc_depois.replace('RequestedBy', user);
      formsFindModel.byProcedure(dbConnection, proc, (err, procResults) => {
        if (err) return callback(err);
        callback(null, procResults);
      });
    } else {
      callback(null, rows);
    }
  });
}

module.exports = {
  updateForm: updateForm
};
