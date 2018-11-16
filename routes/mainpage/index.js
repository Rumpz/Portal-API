const express = require('express');
const router = express.Router();
const { getGraphic, options } = require('controllers').mainpage;

router.get('/', (req, res, next) => {
  res.render('pages/mainpage');
});
router.get('/options', options);
router.get('/graphic', getGraphic);

module.exports = router;
