const express = require("express");
const poseRouter = require("./pose");
const videdoDetailsRouter = require('./videoDetails');
const weekRouter = require('./week')
const userRouter = require('./user');
const resultRouter = require('./result');

const router = express.Router();

router.use('/week', weekRouter);
router.use('/pose', poseRouter);
router.use('/videoDetails', videdoDetailsRouter);
router.use('/user', userRouter);
router.use('/result', resultRouter);


module.exports = router;