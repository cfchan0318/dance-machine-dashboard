const express = require('express');
const router = express.Router();
const { createResult, getAllResults, getResultById, updateResult, removeResult } = require("../controllers/result")
const { authenticateToken } = require('../middleware/auth')

router.get('/', getAllResults);
router.get('/:id', getResultById);
router.post('/', authenticateToken, createResult);
router.put('/:id', authenticateToken, updateResult);
router.delete('/:id', authenticateToken, removeResult);

module.exports = router;