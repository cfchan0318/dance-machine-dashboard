const express = require("express");
const poseRouter = require("./pose");
const videdoDetailsRouter = require('./videoDetails');
const weekRouter = require('./week')
const songRouter = require('./song')
const userRouter = require('./user');
const resultRouter = require('./result');
const authRouter = require('./auth');
const appUserRouter = require('./appUser')
const songRouter = require('./song');

const router = express.Router();

router.use('/song', songRouter);
router.use('/app-user',appUserRouter);
router.use('/week', weekRouter);
router.use('/pose', poseRouter);
router.use('/videoDetails', videdoDetailsRouter);
router.use('/user', userRouter);
router.use('/result', resultRouter);
router.use('/auth', authRouter)
router.use('/song', songRouter)

module.exports = router;