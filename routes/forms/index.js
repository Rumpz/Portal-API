const express = require('express');
const router = express.Router();

const {
  init
} = require('controllers').forms;

router.get('/admin', init);
router.get('/noLog', init);
router.get('/outsiders', init);

module.exports = router;
