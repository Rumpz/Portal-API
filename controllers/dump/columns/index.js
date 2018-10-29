const FINDCONTROLLER = require('./find');
const XLSX = require('xlsx');
const moment = require('moment');

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
    const filename = `./public/excelFiles/Extração_${req.query.searchTable}_${moment(req.query.startDate).format('YYYY-MM-DD')}_a_${req.query.endDate}.xlsx`;

    const options = {
      filename: filename,
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
      console.log('excel file created');
      /* const fs = require('fs');
      fs.writeFileSync('./public/cenas.xls', workbook);
      res.download('./public/cenas.xls'); */
      res.download(filename, (err) => {
        if (err) {
          res.status(500).json(err);
        } else {
          deleteFile(filename);
        }
      }); // Set disposition and send it.
    });
   /*  const fileSystem = require('fs');
    var readStream = fileSystem.createReadStream(`${filename}`);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      readStream.pipe(res);
    }); */
    /* res.download('./myfile.xlsx');
    deleteFile(); */
  });
}

function deleteFile (file) {
  const fs = require('fs');
  fs.unlink(`${file}`, (err) => {
    if (err) {
      throw err;
    } else {
      return console.log(`Successfully deleted ${file}`);
    }
  });
}

module.exports = {
  exportXLS: exportXLS,
  getOptions: getOptions,
  columnsByID: columnsByID
};
