const XLSX = require('xlsx');

module.exports = (fileName) => {
  const wb = XLSX.readFile(`/Users/sfemartins/Desktop/demo-api/public/excelFiles/${fileName}.xlsx`);
  const data = [];
  const headers = [];
  for (let i in wb.SheetNames) {
    headers.push(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]]));
    data.push(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[i]], {range: 1, header: 'A'}));
  }
  const keys = Object.keys(headers[0][0]);
  // const columns = Object.keys(data[0][0]);
  const adjustedData = data[0].map((el) => { return el; });

  return { headers: keys, data: adjustedData };
};
