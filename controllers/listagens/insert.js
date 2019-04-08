// const listagemFindModel = require('models').listagens.find;
const listagemInsertModel = require('models').listagens.insert;
const async = require('async');

function addList (data, user, callback) {
  const batchLimit = 10000;
  let insertedRows = 0;
  let batchRows = [];
  let fullBatch = [];
  let counter = 0;
  let end = 1;

  for (let i = 0; i < data.values.length; i++) {
    if (counter >= batchLimit) {
      fullBatch.push(batchRows);
      batchRows = [];
      counter = 0;
    }
    if (end >= data.values.length) {
      fullBatch.push(batchRows);
    }
    counter++;
    end++;
    batchRows.push([data.values[i], user]);
  }

  async.eachLimit(fullBatch, 1, loop, last);
  function loop (fullBatch, callback) {
    listagemInsertModel.addList(data.dbConnection, fullBatch, user, (err, rows) => {
      if (err) return callback(err);
      insertedRows += rows.affectedRows;
      console.log('affectedRows', rows.affectedRows);
      callback();
    });
  }
  function last (err) {
    if (err) return callback(err);
    return callback(null, insertedRows);
  }
}

module.exports = {
  addList: addList
};
