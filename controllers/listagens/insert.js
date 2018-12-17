// const listagemFindModel = require('models').listagens.find;
const listagemInsertModel = require('models').listagens.insert;

function addList (data, user, callback) {
  const batchLimit = 10000;
  let insertedRows = 0;
  let batchRows = [];
  let counter = 0;
  let end = 1;
  data.values.forEach((el, index) => {
    if (counter >= batchLimit) {
      console.log('insert batch');
      listagemInsertModel.addList(data.dbConnection, batchRows, user, (err, rows) => {
        if (err) return callback(err);
        console.log('affectedRows', rows.affectedRows);
        insertedRows += rows.affectedRows;
        console.log('insertedRows', insertedRows);
      });
      batchRows = [];
      counter = 0;
    }
    if (end >= data.values.length) {
      setTimeout(() => {
        listagemInsertModel.addList(data.dbConnection, batchRows, user, (err, rows) => {
          if (err) return callback(err);
          console.log('last call affectedRows', rows.affectedRows);
          insertedRows += rows.affectedRows;
          console.log('last call insertedRows', insertedRows);
          callback(null, insertedRows);
        });
      }, 5000);
    }
    counter++;
    end++;
    batchRows.push([el, user]);
  });
}

module.exports = {
  addList: addList
};
