const mongoose = require('mongoose')

const WeekSchema = new mongoose.Schema({
    week: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    videos: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
});

module.exports = mongoose.model('week', WeekSchema)