const express = require('express');
const router = express.Router();
const {
  getOptions,
  formByGroupID,
  getForm,
  updateFormsTable,
  refreshTable
} = require('controllers').forms;

const { logger } = require('middlewares');

router.get('/', (req, res, next) => { res.render('pages/forms'); });
router.get('/options', getOptions);
router.get('/formByGroupID', formByGroupID);
router.get('/getForm', getForm);
router.get('/tableRefresh', refreshTable);
router.put('/update', logger, updateFormsTable);

/** ****TODO*******************************************************
 Acess forms without a login but somehow keep user info on post
 --------> router.get('/outsideUsers', outsideUsers); <-----------
*************************************************************** **/

module.exports = router;
