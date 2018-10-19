const fs = require('fs');

module.exports = (fileName) => {
  const excelFilesPath = '/Users/sfemartins/Desktop/demo-api/public/excelFiles/';
  return fs.readFileSync(`${excelFilesPath}${fileName}.xlsx`);
};
