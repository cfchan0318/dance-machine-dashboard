const express = require('express');
const router = express.Router();
const {createWeeek, getAllWeeks,getWeekById,updateWeeek,removeWeek} = require("../controllers/week")
const { authenticateToken } = require('../middleware/auth')

router.get('/', getAllWeeks);
router.get('/:id', getWeekById);
router.post('/',authenticateToken, createWeeek);
router.put('/:id',authenticateToken, updateWeeek);
router.delete('/:id',authenticateToken, removeWeek);

module.exports = router;