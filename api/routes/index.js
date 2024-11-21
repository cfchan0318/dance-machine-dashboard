const express = require("express");
const poseRouter = require("./pose");


const router = express.Router();


router.use('/pose', poseRouter);

module.exports = router;