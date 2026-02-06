const mongoose = require('mongoose')

const UserGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('userGroup', UserGroupSchema)
