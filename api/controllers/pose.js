const express = require('express');
const Pose = require('../models/pose')
const fs = require('fs/promises')

const { poseDetect } = require('../utils/poseDetect');
const path = require('path');

const createPose = async (req, res) => {
    try {
        const pose = req.body.pose;

        const imagePath = req.file.path;
        const imageUrl = imagePath.replace(/\\/g, '/');

        console.log(imageUrl)
        const json = await poseDetect(`./${imageUrl}`)

        const poseToCreate = new Pose({
            pose: pose,
            image: imageUrl,
            json: json
        });

        await poseToCreate.save();

        res.status(200).json(poseToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllPose = async (req, res) => {
    try {
        const poses = await Pose.find()

        res.status(200).json(poses);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getPoseById = async (req, res) => {
    try {
        const id = req.params.id;
        const pose = await Pose.findById(id);
        res.status(200).json(pose);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deletePose = async (req, res) => {
    try {
        const id = req.params.id;
        const pose = await Pose.findById(id);
        
        const imgPath = path.join(process.cwd(),pose.image)
        //console.log(imgPath)
        await fs.rm(imgPath)

        await Pose.findByIdAndDelete(id);
        res.status(200).json({message: 'deleted'});

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { createPose, getAllPose, getPoseById, deletePose };