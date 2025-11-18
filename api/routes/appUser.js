const router = require('express').Router();
const appUser = require('../models/appUser');

router.get('/',async (req,res) => {
    try {
        const result = await appUser.find().select('_id username');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({message:err})
    }
})


module.exports = router;
