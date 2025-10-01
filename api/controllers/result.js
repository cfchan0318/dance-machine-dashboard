const express = require('express');
const Result = require('../models/result')
const User = require('../models/user')
const archiver = require('archiver');
const { convertToCSV } = require('../utils/csv');
const { format, addHours, parseISO } = require('date-fns')

const createResult = async (req, res) => {
    try {
        const json = req.body.json;
        const ResultToCreate = new Result({
            json: json
        });

        await ResultToCreate.save();

        res.status(200).json(ResultToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const roundObjectValues = arr => {
    return arr.map(obj => {
        const newObj = {};
        for (let key in obj) {
            newObj[key] = typeof obj[key] === 'number'
                ? Number(obj[key].toFixed(2))
                : obj[key];
        }
        return newObj;
    });
};


const getAllResults = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        var query = {};

        if (userId) {
            query['json.userId'] = userId
        }

        // Calculate the number of documents to skip
        const skip = (pageNumber - 1) * limitNumber;


        console.log('query', query)

        const docCount = await Result.countDocuments(query);

        let results = await Result.find(query).skip(skip).limit(limitNumber)
        results = results.map(row => {
            row.json.result = roundObjectValues(row.json.result)
            row.json.date = convertToHKTime(row.json.date)
            return row
        })

        if (userId) {
            results = results.filter(row => row.json.userId == userId);
        }

        res.status(200).json({
            total: docCount,
            data: results,
            page: pageNumber,
            limit: limitNumber,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getResultById = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Result.findById(id);
        result.json.result = roundObjectValues(result.json.result);

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

const convertToHKTime = (utcDate) => {
    try {
        const date = parseISO(utcDate);
        const hkDate = addHours(date, 8);
        return format(hkDate, 'yyyy-MM-dd_HHmmss');
    } catch (error) {
        return '';
    }

};

const exportResultCsv = async (req, res) => {
    // Set headers
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=results.zip');

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    archive.pipe(res);


    const result_ids = req.body.resultIds;
    if (!result_ids || result_ids.length == 0) {
        throw new Error('no ids provided');
    }

    const results = await Result.find({ '_id': { $in: result_ids } });

    const csvData = results.map(row => {
        const date = convertToHKTime(row.json.date)
        const filename = `${date}_${row.json.name}_${row.json.title}.csv`
        let result = row.json.result;
        result = roundObjectValues(result);
        result = result.map(row => {
            if (row['type'] == 'posture') {
                row.answer = null
                row.userAnswer = null;
                row.score = null;
                return row;
            } else {
                return row;
            }
        })
        return { filename: filename, result: result }
    })

    csvData.forEach(row => {
        const csvContent = convertToCSV(row.result);
        archive.append(csvContent, { name: row.filename });
    })

    archive.finalize();
}


module.exports = { createResult, getAllResults, getResultById, updateResult, removeResult, exportResultCsv }