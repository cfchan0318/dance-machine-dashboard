const express = require('express');
const router = express.Router();
const {createWeeek, getAllWeeks,getWeekById,updateWeeek,removeWeek} = require("../controllers/week")


router.get('/', getAllWeeks);
router.get('/:id', getWeekById);
router.post('/', createWeeek);
router.put('/:id', updateWeeek);
router.delete('/:id', removeWeek);

module.exports = router;