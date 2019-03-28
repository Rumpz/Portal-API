const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const {
  getTableOptions,
  getOptions,
  importXLXS
} = require('controllers').carregamentos;

router.get('/', (req, res, next) => { res.render('pages/carregamentos'); });
router.get('/tableOptions', getTableOptions);
router.get('/insertOptions', getOptions);
router.post('/importXLSX', upload.single('file'), importXLXS);

module.exports = router;
