const carrInsertModel = require('models').carregamentos.insert;

function insertXLSX (user, options, xlsx, callback) {
  const data = parseData(xlsx); // parse xlsx data to object
  const columns = options.colunas.split('|'); // get columns to filter
  let insertValues = adjustInsertData(columns, data); // filter values by insert columns data
  insertValues.forEach((el) => { el.push(user); }); // add User for updatedBy column
  insertValues = insertValues.filter(() => { return true; });
  carrInsertModel.xlsxToTable(options, insertValues, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
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
