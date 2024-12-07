const mongoose = require('mongoose')

const PoseSchema = new mongoose.Schema({
    pose: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    json: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
    
});

module.exports = mongoose.model('pose', PoseSchema)