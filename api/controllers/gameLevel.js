const Song = require('../models/song');

// Create a new game level within a song
const createGameLevel = async (req, res) => {
    try {
        const songId = req.params.songId;
        const { name, videos, isLocked, order } = req.body;

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const newLevel = {
            name,
            videos: videos || [],
            isLocked: isLocked ?? false,
            order: order ?? 0,
            isDeleted: false,
        };

        song.gameLevels.push(newLevel);
        await song.save();

        // Return the newly created level (last in the array)
        const createdLevel = song.gameLevels[song.gameLevels.length - 1];
        res.status(200).json(createdLevel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all game levels for a song
const getAllGameLevels = async (req, res) => {
    try {
        const songId = req.params.songId;

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        // Filter out deleted levels and sort by order
        const levels = song.gameLevels
            .filter((level) => !level.isDeleted)
            .sort((a, b) => a.order - b.order);

        res.status(200).json(levels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific game level by id
const getGameLevelById = async (req, res) => {
    try {
        const { songId, levelId } = req.params;

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const level = song.gameLevels.id(levelId);
        if (!level || level.isDeleted) {
            return res.status(404).json({ error: 'Game level not found' });
        }

        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a game level
const updateGameLevel = async (req, res) => {
    try {
        const { songId, levelId } = req.params;
        const { name, videos, isLocked, order } = req.body;

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const level = song.gameLevels.id(levelId);
        if (!level || level.isDeleted) {
            return res.status(404).json({ error: 'Game level not found' });
        }

        // Update fields if provided
        if (name !== undefined) level.name = name;
        if (videos !== undefined) level.videos = videos;
        if (isLocked !== undefined) level.isLocked = isLocked;
        if (order !== undefined) level.order = order;

        await song.save();

        res.status(200).json(level);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a game level
const removeGameLevel = async (req, res) => {
    try {
        const { songId, levelId } = req.params;

        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const level = song.gameLevels.id(levelId);
        if (!level) {
            return res.status(404).json({ error: 'Game level not found' });
        }

        level.isDeleted = true;
        await song.save();

        res.status(200).json({ message: 'Game level removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createGameLevel,
    getAllGameLevels,
    getGameLevelById,
    updateGameLevel,
    removeGameLevel,
};
