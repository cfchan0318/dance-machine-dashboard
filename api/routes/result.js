const express = require('express');
const router = express.Router();
const {createResult, getAllResults,getResultById,updateResult,removeResult} = require("../controllers/result")


router.get('/', getAllResults);
router.get('/:id', getResultById);
router.post('/', createResult);
router.put('/:id', updateResult);
router.delete('/:id', removeResult);

module.exports = router;