const FINDCONTROLLER = require('./find');
const XLSX = require('xlsx');

function getOptions (req, res, next) {
  FINDCONTROLLER.options((err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function columnsByID (req, res, next) {
  FINDCONTROLLER.columnsByID(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!Object.keys(rows)) return res.status(404).json('Not Found');
    res.status(200).json(rows);
  });
}

function exportXLS (req, res, next) {
  FINDCONTROLLER.exportXLS(req.query, (err, rows) => {
    if (err) return res.status(500).json(err);
    if (!rows.length) return res.status(404).json('Not Found');
    const Excel = require('exceljs');

    const options = {
      filename: 'myfile.xlsx',
      useStyles: true,
      useSharedStrings: true
    };

    const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('my sheet');
    const keys = Object.keys(rows[0]);
    const col = [];
    for (let i in keys) {
      col.push({ header: keys[i], key: keys[i] });
      worksheet.columns = col;
    }
    // var data = {};
    for (let i = 0; i <= rows.length; i++) {
      worksheet.addRow(rows[i]).commit();
    }

    workbook.commit().then(function () {
      console.log('excel file cretaed');
      /* const fs = require('fs');
      fs.writeFileSync('./public/cenas.xls', workbook);
      res.download('./public/cenas.xls'); */
    });
    const fileSystem = require('fs');
    var readStream = fileSystem.createReadStream('./myfile.xlsx');
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
      readStream.pipe(res);
    });
    // res.download('./myfile.xlsx');
    // deleteFile();
  });
}

function deleteFile () {
  const fs = require('fs');
  fs.unlink('./myfile.xlsx', (err) => {
    if (err) throw err;
    console.log('successfully deleted /myfile.xlsx');
  });
}

module.exports = {
  exportXLS: exportXLS,
  getOptions: getOptions,
  columnsByID: columnsByID
};
