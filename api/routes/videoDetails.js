const express = require('express');
const router = express.Router();
const { getVideoDetailsList,
    getVideoDetailsById,
    createVideoDetails,
    updateVideoDetails,
    removeVideoDetails } = require('../controllers/videoDetails')

router.get('/', getVideoDetailsList);
router.get('/:id', getVideoDetailsById);
router.post('/', createVideoDetails);
router.put('/:id', updateVideoDetails);
router.delete('/:id', removeVideoDetails);

module.exports = router;