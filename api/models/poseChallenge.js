const mongoose = require('mongoose')

const PoseChallengeSchema = new mongoose.Schema({
    timestamp: {
      type: String,
      required: true
    },
    answer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Posture',
      required: true
    },
    type: {
      type: String,
      enum: ['clock-3', 'clock-9', 'clock-12', 'posture'],
      required: true
    }
});
  
module.exports = mongoose.model('poseChallenge', PoseChallengeSchema)