const express = require('express');
const router = express.Router();

const {
  homeUsers,
  noLoggers,
  outsideUsers
} = require('controllers').forms;

router.get('/homeUsers', homeUsers);
router.get('/noLoggers', noLoggers);
router.get('/outsideUsers', outsideUsers);

module.exports = router;
