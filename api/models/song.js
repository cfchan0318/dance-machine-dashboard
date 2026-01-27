const mongoose = require('mongoose');

const GameLevelSubSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        videos: { type: [mongoose.Schema.Types.Mixed], default: [] },
        isLocked: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { _id: true } // keep level ids so you can update one level easily
);

const SongSchema = new mongoose.Schema(
    {
        // can be used as an external/system identifier
        songId: { type: String, required: false },

        // dashboard fields
        photo: { type: String, required: false }, // stored as relative path e.g. /uploads/songs/<filename>
        name: { type: String, required: true },
        author: { type: String, required: true },
        publish: { type: Boolean, default: false },

        // levels owned by this song
        gameLevels: { type: [GameLevelSubSchema], default: [] },

        isLocked: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('song', SongSchema);