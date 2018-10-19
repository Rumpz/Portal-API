const express = require('express');
const router = express.Router();
const {
  findAll,
  findByID,
  insert,
  update,
  deleteTemplate
} = require('controllers').dump.templates;

router.get('/all', findAll);
router.get('/byID/:id', findByID);
router.post('/', insert);
router.put('/:id', update);
router.delete('/:id', deleteTemplate);

module.exports = router;
