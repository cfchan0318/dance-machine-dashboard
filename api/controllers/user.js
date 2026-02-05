const express = require('express');
const User = require('../models/user')

const createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const code = req.body.code;
        const userGroups = req.body.userGroups || [];

        const sameCodeUser = await User.findOne({code:code})

        if (sameCodeUser) {
            throw new Error('user with same code exist')
        }

        const UserToCreate = new User({
            name: name,
            code: code,
            userGroups: userGroups
        });

        await UserToCreate.save();

        res.status(200).json(UserToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find().populate('userGroups')

        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate('userGroups');
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserIdByCode = async (req, res) => {
    try {
        const code = String(req.body.code);
        const user = await User.findOne({ code: code });
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateUser = async (req, res) => {
    try {
        const { name, code, userGroups } = req.body;

        const sameCodeUser = await User.findOne({code:code, _id: { $ne: req.params.id }})

        if (sameCodeUser) {
            throw new Error('user with same code exist')
        }
        
        const id = req.params.id;
        const updateData = {
            name: name,
            code: code,
        };
        
        if (userGroups !== undefined) {
            updateData.userGroups = userGroups;
        }
        
        const UserToUpdate = await User.findByIdAndUpdate(id, updateData, { new: true })

        res.status(200).json(UserToUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const removeUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: 'removed' });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { createUser, getAllUsers, getUserById, updateUser, removeUser,getUserIdByCode }