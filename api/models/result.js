const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
    json: {
        type: mongoose.Schema.Types.Mixed,
        required: false
    },
    avgUpperScore: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    avgLowerScore: {
        type: mongoose.Schema.Types.Number,
        required: false
    },
    avgVoiceScore: {
        type: mongoose.Schema.Types.Number,
        default:0,
        required: false
    }
});

module.exports = mongoose.model('result', ResultSchema)