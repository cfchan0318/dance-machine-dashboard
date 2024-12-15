const express = require("express");
const poseRouter = require("./pose");
const videdoDetailsRouter = require('./videoDetails');
const weekRouter = require('./week')
const userRouter = require('./user');

const router = express.Router();

router.use('/week', weekRouter);
router.use('/pose', poseRouter);
router.use('/videoDetails', videdoDetailsRouter);
router.use('/user',userRouter)

module.exports = router;