const express = require("express");
const poseRouter = require("./pose");
const videdoDetailsRouter = require('./videoDetails');
const weekRouter = require('./week')

const router = express.Router();

router.use('/week', weekRouter);
router.use('/pose', poseRouter);
router.use('/videoDetails', videdoDetailsRouter);

module.exports = router;