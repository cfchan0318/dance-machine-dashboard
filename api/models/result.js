const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
    json: {
        type: [mongoose.Schema.Types.Mixed],
        required: false
    },
});

module.exports = mongoose.model('result', ResultSchema)