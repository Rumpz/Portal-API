// options imports and Constants
const connection = require('db').connection;
const portalDB = 'portal_reporting';
const dumperTable = 'portal_reporting.dumper';

// Dumper connection
const dumperConn = require('db').dumperConnection;

function exportData (data, callback) {
  const sql = `CALL ${data.searchTable}(?)`;
  let values = getValues(data);
  dumperConn(data.dbConnection, sql, values, callback);
}

function getValues (vals) {
  let datesArr = vals.startDate
    ? [vals.startDate, vals.endDate]
    : null;

  let valsData = vals.startDate
    ? new Array(+vals.procedureArgs - datesArr.length).fill(null)
    : new Array(+vals.procedureArgs).fill(null);
  // parse selected inputs
  vals.selectedInputs = JSON.parse(vals.selectedInputs);
  console.log('datesArr', datesArr)
  console.log('valsData', valsData)
  // get Keys of inputs
  const keys = vals.selectedInputs
    ? Object.keys(vals.selectedInputs)
    : null;

  if (vals.startDate) {
    datesArr[0] = vals.startDate;
  }

  if (vals.endDate) {
    datesArr[1] = vals.endDate;
  }
  console.log(keys)
  console.log(vals.unselectedInputs);
  for (let i = 0; i < vals.procedureArgs; i++) {
    // process args index
    const argsIndex = vals.unselectedInputs.indexOf(keys[i]);
    console.log('argsIndex', vals.procedureArgs)
    if (Array.isArray(vals.selectedInputs[keys[i]])) {
      valsData[argsIndex] = vals.selectedInputs[keys[i]].toString();
    } else if (!Array.isArray(vals.selectedInputs[keys[i]])) {
      valsData[argsIndex] = vals.selectedInputs[keys[i]];
    } else {
      valsData[i] = null;
    }

    /* if (Array.isArray(vals.selectedInputs[keys[i]])) {
      valsData[i] = vals.selectedInputs[keys[i]] ? vals.selectedInputs[keys[i]].toString() : null;
    } else if (!Array.isArray(vals.selectedInputs[keys[i]])) {
      valsData[i] = vals.selectedInputs[keys[i]] ? vals.selectedInputs[keys[i]] : null;
    } */
  }
  for (let i in valsData) {
    if (valsData[i] === '') {
      valsData[i] = null;
    }
  }
  return vals.startDate ? [datesArr.concat(valsData)] : [valsData];
}

module.exports = {
  exportData: exportData
};
