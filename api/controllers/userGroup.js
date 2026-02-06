const express = require('express');
const UserGroup = require('../models/userGroup')
const User = require('../models/user')
const Song = require('../models/song')

const createUserGroup = async (req, res) => {
    try {
        const { name, description, isDisabled } = req.body;

        const existingGroup = await UserGroup.findOne({ name });
        if (existingGroup) {
            throw new Error('User group with same name already exists');
        }

        const userGroupToCreate = new UserGroup({
            name,
            description: description || '',
            isDisabled: isDisabled ?? false,
        });

        await userGroupToCreate.save();

        res.status(200).json(userGroupToCreate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllUserGroups = async (req, res) => {
    try {
        const userGroups = await UserGroup.find().sort({ name: 1 });
        res.status(200).json(userGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUserGroupById = async (req, res) => {
    try {
        const id = req.params.id;
        const userGroup = await UserGroup.findById(id);
        res.status(200).json(userGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateUserGroup = async (req, res) => {
    try {
        const { name, description, isDisabled } = req.body;
        const id = req.params.id;

        const existingGroup = await UserGroup.findOne({ name, _id: { $ne: id } });
        if (existingGroup) {
            throw new Error('User group with same name already exists');
        }

        const userGroupToUpdate = await UserGroup.findByIdAndUpdate(
            id,
            { name, description, isDisabled },
            { new: true }
        );

        res.status(200).json(userGroupToUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeUserGroup = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Remove this group from all users who have it
        await User.updateMany(
            { userGroups: id },
            { $pull: { userGroups: id } }
        );

        // Remove this group from all songs who have it
        await Song.updateMany(
            { userGroups: id },
            { $pull: { userGroups: id } }
        );

        await UserGroup.findByIdAndDelete(id);
        res.status(200).json({ message: 'removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addUserToGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const userGroup = await UserGroup.findById(groupId);
        if (!userGroup) {
            throw new Error('User group not found');
        }

        // Check if user already in group
        if (user.userGroups.includes(groupId)) {
            throw new Error('User already in this group');
        }

        user.userGroups.push(groupId);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeUserFromGroup = async (req, res) => {
    try {
        const { userId, groupId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        user.userGroups = user.userGroups.filter(g => g.toString() !== groupId);
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsersByGroup = async (req, res) => {
    try {
        const groupId = req.params.id;
        
        const users = await User.find({ userGroups: groupId }).populate('userGroups');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUserGroup,
    getAllUserGroups,
    getUserGroupById,
    updateUserGroup,
    removeUserGroup,
    addUserToGroup,
    removeUserFromGroup,
    getUsersByGroup
}
