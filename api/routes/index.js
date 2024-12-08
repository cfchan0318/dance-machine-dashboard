const express = require("express");
const poseRouter = require("./pose");
const videdoDetailsRouter = require('./videoDetails');

const router = express.Router();


router.use('/pose', poseRouter);
router.use('/videoDetails', videdoDetailsRouter);

module.exports = router;