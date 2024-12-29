const express = require('express');
const router = express.Router();
const { getVideoDetailsList,
    getVideoDetailsById,
    createVideoDetails,
    updateVideoDetails,
    removeVideoDetails } = require('../controllers/videoDetails')
const { authenticateToken } = require('../middleware/auth')


router.get('/', getVideoDetailsList);
router.get('/:id', getVideoDetailsById);
router.post('/',authenticateToken, createVideoDetails);
router.put('/:id',authenticateToken, updateVideoDetails);
router.delete('/:id',authenticateToken, removeVideoDetails);

module.exports = router;