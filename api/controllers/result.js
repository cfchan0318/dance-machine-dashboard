const express = require('express');
const Result = require('../models/result')

const createResult = async (req, res) => {
    try {
        const json = req.body.json;
        const ResultToCreate = new Result({
            json:json
        });

        await ResultToCreate.save();

        res.status(200).json(ResultToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllResults = async (req, res) => {
    try {
        const Results = await Result.find()

        res.status(200).json(Results);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

} 

const getResultById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Result.findById(id);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateResult = async (req, res) => {
    try {
        const id = req.params.id;
        const ResultToUpdate = await Result.findByIdAndUpdate(id, {
            json: req.body.json
        })

        console.log(ResultToUpdate)

        res.status(200).json(ResultToUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const removeResult = async (req, res) => {
    try {
        const id = req.params.id;
        await Result.findByIdAndDelete(id)
        res.status(200).json({ message: 'removed' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { createResult, getAllResults, getResultById, updateResult, removeResult }