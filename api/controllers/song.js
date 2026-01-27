const Song = require('../models/song');

const createSong = async (req, res) => {
    try {
        const photo = req.file ? `/uploads/songs/${req.file.filename}` : undefined;

        const songToCreate = new Song({
            songId: req.body.songId,
            name: req.body.name,
            author: req.body.author,
            publish: req.body.publish ?? false,
            order: req.body.order,
            isLocked: req.body.isLocked ?? false,
            isDeleted: req.body.isDeleted ?? false,
            photo,
            // Do not allow creating gameLevels from this endpoint
            gameLevels: [],
        });

        await songToCreate.save();

        res.status(200).json(songToCreate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().sort('order');
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSongById = async (req, res) => {
    try {
        const id = req.params.id;
        const song = await Song.findById(id);
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSong = async (req, res) => {
    try {
        const id = req.params.id;
        const photo = req.file ? `/uploads/songs/${req.file.filename}` : undefined;

        // Explicitly ignore updates to gameLevels from this CRUD
        const update = {
            songId: req.body.songId,
            name: req.body.name,
            author: req.body.author,
            publish: req.body.publish,
            order: req.body.order,
            isLocked: req.body.isLocked,
            isDeleted: req.body.isDeleted,
        };

        if (photo) {
            update.photo = photo;
        }

        const songToUpdate = await Song.findByIdAndUpdate(id, update, { new: true });

        res.status(200).json(songToUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeSong = async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await Song.findByIdAndUpdate(
            id,
            { isDeleted: true },
            { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSongs = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            orderBy = 'order',
            order = 'asc',
        } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const skip = (pageNumber - 1) * limitNumber;

        // allow-list sortable fields
        const sortableFields = new Set([
            'order',
            'name',
            'author',
            'publish',
            'songId',
            'createdAt',
            'updatedAt',
        ]);
        const sortField = sortableFields.has(orderBy) ? orderBy : 'order';
        const sortDir = String(order).toLowerCase() === 'desc' ? -1 : 1;

        const query = {};

        const total = await Song.countDocuments(query);
        const data = await Song.find(query)
            .sort({ [sortField]: sortDir })
            .skip(skip)
            .limit(limitNumber);

        res.status(200).json({
            total,
            data,
            page: pageNumber,
            limit: limitNumber,
            orderBy: sortField,
            order: sortDir === -1 ? 'desc' : 'asc',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createSong, getAllSongs, getSongs, getSongById, updateSong, removeSong };
