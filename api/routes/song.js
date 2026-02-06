const express = require('express');
const router = express.Router();

const {
    createSong,
    getAllSongs,
    getSongs,
    getSongById,
    updateSong,
    removeSong,
    getSongsByGroup,
} = require('../controllers/song');

const { authenticateToken } = require('../middleware/auth');
const { uploadSongImageToStorage } = require('../utils/songFileStorage');

router.get('/', getAllSongs);
router.get('/dashboard', getSongs);
router.get('/group/:id', getSongsByGroup);
router.get('/:id', getSongById);
router.post('/', authenticateToken, uploadSongImageToStorage, createSong);
router.put('/:id', authenticateToken, uploadSongImageToStorage, updateSong);
router.delete('/:id', authenticateToken, removeSong);

module.exports = router;
