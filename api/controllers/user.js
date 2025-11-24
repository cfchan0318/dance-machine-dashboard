const express = require('express');
const User = require('../models/user')

const createUser = async (req, res) => {
    try {
        const name = req.body.name;
        const code = req.body.code;

        const sameCodeUser = await User.findOne({code:code})

        if (sameCodeUser) {
            throw new Error('user with same code exist')
        }

        const UserToCreate = new User({
            name: name,
            code: code,
        });

        await UserToCreate.save();

        res.status(200).json(UserToCreate)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const Users = await User.find()

        res.status(200).json(Users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
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
        const { name, code } = req.body;

        const sameCodeUser = await User.findOne({code:code})

        if (sameCodeUser) {
            throw new Error('user with same code exist')
        }
        
        const id = req.params.id;
        const UserToUpdate = await User.findByIdAndUpdate(id, {
            name: name,
            code: code,
        })

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