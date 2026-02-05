const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Six-digit numeric code, optional, unique when present
    code: {
        type: String, // store as string to preserve leading zeros (e.g., "000123")
        match: [/^\d{6}$/, 'Code must be exactly six digits'],
        index: true,
        unique: true,
        sparse: true,
    },
    // Array of user groups this user belongs to
    userGroups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userGroup'
    }]


});

module.exports = mongoose.model('user', UserSchema)