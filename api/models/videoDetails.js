const mongoose = require('mongoose')
const PoseChallengeSchema = require('./poseChallenge');
const VoiceChallengeSchema = require('./voiceChallenge')

const VideoDetailsSchema = new mongoose.Schema({
    video_src: {
      type: String,
      required: true
    },
    showCamera: {
      type: Boolean,
      default: false
    },
    poseChallenges: [PoseChallengeSchema],
    voiceChallenges: [VoiceChallengeSchema]
  });
  

module.exports = mongoose.model('videoDetails', VideoDetailsSchema)