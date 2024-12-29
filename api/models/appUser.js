const mongoose = require('mongoose');

const appUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true });
module.exports = mongoose.model('appUser', appUserSchema);