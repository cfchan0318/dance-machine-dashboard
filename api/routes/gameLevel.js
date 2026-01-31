const express = require('express');
const router = express.Router({ mergeParams: true }); // mergeParams to access :songId from parent router

const {
    createGameLevel,
    getAllGameLevels,
    getGameLevelById,
    updateGameLevel,
    removeGameLevel,
} = require('../controllers/gameLevel');

const { authenticateToken } = require('../middleware/auth');

// All routes are nested under /song/:songId/level
router.get('/', getAllGameLevels);
router.get('/:levelId', getGameLevelById);
router.post('/', authenticateToken, createGameLevel);
router.put('/:levelId', authenticateToken, updateGameLevel);
router.delete('/:levelId', authenticateToken, removeGameLevel);

module.exports = router;
