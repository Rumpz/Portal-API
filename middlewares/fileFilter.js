const path = require('path');

module.exports = function (req, file, callback) {
  let filetypes = /jpeg|jpg|png|tiff|tif|gif|jiff|pdf|doc|docx|txt|xls|xlsx|csv|ppt|pptx|msg/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype || extname) return callback(null, true);

  let err = `Error: File upload only supports the following filetypes - ${filetypes}`;
  callback(err);
};
