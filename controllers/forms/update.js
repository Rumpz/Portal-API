const formsFindModel = require('models').forms.find;
const formsUpdateModel = require('models').forms.update;

function updateForm (values, user, ip, callback) {
  const headers = values.header;
  delete values.header;
  const dataToUpdate = [headers, Object.assign(values, {updatedBy: `${user}|${ip}`})];
  formsUpdateModel.tableByID(dataToUpdate, (err, rows) => {
    if (err) return callback(err);
    console.log('aaaaaaaaa', headers.proc_depois);
    const { dbConnection, proc_depois } = headers;
    values.proc_depois
      ? formsFindModel.byProcedure(dbConnection, proc_depois, (err, procResults) => {
        if (err) return callback(err);
        callback(null, procResults);
      })
      : callback(null, rows);
  });
}

module.exports = {
  updateForm: updateForm
};
