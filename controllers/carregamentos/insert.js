const carrInsertModel = require('models').carregamentos.insert;
const async = require('async');

function insertXLSX (user, options, xlsx, callback) {
  const data = parseData(xlsx); // parse xlsx data to object
  const columns = options.colunas.split('|'); // get columns to filter
  let insertValues = adjustInsertData(columns, data); // filter values by insert columns data
  insertValues.forEach((el) => { el.push(user); }); // add User for updatedBy column
  insertValues = insertValues.filter(() => { return true; });

  if (options.TRUNCATE) {
    carrInsertModel.truncateTable(options, (err, rows) => {
      if (err) return callback(err);
    });
  }

  const batchLimit = 10000;
  let insertedRows = 0;
  let batchRows = [];
  let fullBatch = [];
  let counter = 0;
  let end = 1;
  console.log('length', insertValues.length)
  for (let i = 0; i < insertValues.length; i++) {
    if (counter >= batchLimit) {
      fullBatch.push(batchRows);
      batchRows = [];
      counter = 0;
    }
    if (end >= insertValues.length) {
      fullBatch.push(batchRows);
    }
    counter++;
    end++;
    batchRows.push(insertValues[i]);
  }

  async.eachLimit(fullBatch, 1, loop, last);

  function loop (fullBatch, callback) {
    carrInsertModel.xlsxToTable(options, fullBatch, (err, rows) => {
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

function adjustInsertData (columns, data) {
  const filteredValues = data.map((vals) => {
    const values = columns.map((col) => {
      return vals[col];
    });
    return values;
  });
  return filteredValues;
}

// get data from file
function parseData (file) {
  const XLSX = require('xlsx');
  const workbook = XLSX.read(file);
  var sheetsList = workbook.SheetNames;
  let data = [];
  let tt;
  sheetsList.forEach(function (y) {
    let worksheet = workbook.Sheets[y];
    let headers = {};
    for (let z in worksheet) {
      for (var i = 0; i < z.length; i++) {
        if (!isNaN(z[i])) {
          tt = i;
          break;
        }
      }
      var col = z.substring(0, tt);
      var row = parseInt(z.substring(tt));
      var value = worksheet[z].v;

      // store header names
      if (row === 1 && value) {
        headers[col] = value;
        continue;
      }

      if (!data[row]) data[row] = {};
      data[row][headers[col]] = value;
    }
    // drop those first two rows which are empty
    data.shift();
    data.shift();
  });
  return data;
}

module.exports = {
  insertXLSX: insertXLSX
};
