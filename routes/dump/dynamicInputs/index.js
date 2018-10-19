const express = require('express');
const router = express.Router();

const {
  findAll,
  findByID,
  insert,
  update,
  deleteInput,
  renderInputs
} = require('controllers').dump.dynamicInputs;

router.get('/all', findAll);
router.get('/byID/:id', findByID);
router.get('/renderInputs/:ids', renderInputs);
router.post('/', insert);
router.put('/:id', update);
router.delete('/:id', deleteInput);

module.exports = router;
