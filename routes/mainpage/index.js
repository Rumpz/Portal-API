const express = require('express');
const router = express.Router();
const { getGraphic, options } = require('controllers').mainpage;

router.get('/', (req, res, next) => {
  res.render('pages/mainpage');
});
const { logger } = require('middlewares');

router.get('/options', options);
router.get('/graphic', logger, getGraphic);

module.exports = router;
