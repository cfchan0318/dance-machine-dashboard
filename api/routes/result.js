const express = require('express');
const router = express.Router();
const { createResult,
    getResultListing,
    getAllResults,
    getResultById,
    updateResult, removeResult,exportResultCsv } = require("../controllers/result")
const { authenticateToken } = require('../middleware/auth')

router.get('/listing', getResultListing);
router.get('/', getAllResults);

router.get('/:id', getResultById);
router.post('/', createResult);

router.post('/export-csv', exportResultCsv);
router.put('/:id', authenticateToken, updateResult);
router.delete('/:id', authenticateToken, removeResult);

module.exports = router;