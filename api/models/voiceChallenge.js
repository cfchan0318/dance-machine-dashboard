const mongoose = require('mongoose')

const VoiceChallengeSchema = new mongoose.Schema({
    timestamp: {
      type: String,
      required: true
    },
    answer: {
      type: [String],
      required: true
    }
});
  
module.exports = mongoose.model('voiceChallenge', VoiceChallengeSchema)