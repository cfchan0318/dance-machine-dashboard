const mongoose = require('mongoose')
const PoseChallengeSchema = require('./poseChallenge').schema;
const VoiceChallengeSchema = require('./voiceChallenge').schema;

const VideoDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  video_src: {
    type: String,
    required: true
  },
  showCamera: {
    type: Boolean,
    default: false
  },
  poseChallenges: [mongoose.Schema.Types.Mixed],
  voiceChallenges: [mongoose.Schema.Types.Mixed]
});


module.exports = mongoose.model('videoDetails', VideoDetailsSchema)