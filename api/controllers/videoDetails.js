const express = require('express');
const VideoDetails = require('../models/videoDetails');

const createVideoDetails = async (req, res) => {
    try {
        const title = req.body.title;
        const video_src = req.body.video_src;
        const showCamera = req.body.showCamera;
        const poseChallenges = req.body.poseChallenges || [];
        const voiceChallenges = req.body.voiceChallenges || [];

        const videoDetailsToCreate = new VideoDetails({
            title:title,
            video_src: video_src,
            showCamera: showCamera,
            poseChallenges: poseChallenges,
            voiceChallenges: voiceChallenges,
        })

        await videoDetailsToCreate.save();

        res.status(200).json(videoDetailsToCreate)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getVideoDetailsById = async (req, res) => {
    try {
        const id = req.params.id;

        const videoDetails = await VideoDetails.findById(id);

        res.status.json(videoDetails)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateVideoDetails = async (req, res) => {
    try {
        const id = req.body._id;
        const video_src = req.body.video_src;
        const showCamera = req.body.showCamera;
        const poseChallenges = req.body.poseChallenges;
        const voiceChallenges = req.body.voiceChallenges;


        const videoDetailsToUpdate = VideoDetails.findByIdAndUpdate(id, {
            video_src: video_src,
            showCamera: showCamera,
            poseChallenges: poseChallenges,
            voiceChallenges: voiceChallenges,
        })

        await videoDetailsToUpdate.save();

        res.status(200).json(videoDetailsToUpdate)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getVideoDetailsList = async (req, res) => {
    try {
        const videoDDetailsList = await VideoDetails.find();
        res.status(200).json(videoDDetailsList)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const removeVideoDetails = async (req, res) => {
    try {
        const id = req.params.id;
        await VideoDetails.findByIdAndDelete(id)
        res.status(200).json({ message: 'removed' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    getVideoDetailsList,
    getVideoDetailsById,
    createVideoDetails,
    updateVideoDetails,
    removeVideoDetails
}