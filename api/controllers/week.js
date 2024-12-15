const express = require('express');
const Week = require('../models/week')

const createWeeek = async (req, res) => {
    try {
        const week = req.body.week;
        const name = req.body.name;
        const weekToCreate = new Week({
            week: week,
            name: name,
            videos:[]
        });

        await weekToCreate.save();

        res.status(200).json(weekToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllWeeks = async (req, res) => {
    try {
        const weeks = await Week.find()

        res.status(200).json(weeks);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getWeekById = async (req, res) => {
    try {
        const id = req.params.id;
        const week = await Week.findById(id);
        res.status(200).json(week);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateWeeek = async (req, res) => {
    try {
        const id = req.params.id;
        const weekToUpdate = await Week.findByIdAndUpdate(id, {
            videos: req.body.videos
        })

        console.log(weekToUpdate)

        res.status(200).json(weekToUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const removeWeek = async (req, res) => {
    try {
        const id = req.params.id;
        await Week.findByIdAndDelete(id)
        res.status(200).json({ message: 'removed' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { createWeeek, getAllWeeks, getWeekById, updateWeeek, removeWeek }