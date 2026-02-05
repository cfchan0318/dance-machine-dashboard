const express = require('express');
const router = express.Router();
const {
    createUserGroup,
    getAllUserGroups,
    getUserGroupById,
    updateUserGroup,
    removeUserGroup,
    addUserToGroup,
    removeUserFromGroup,
    getUsersByGroup
} = require("../controllers/userGroup");
const { authenticateToken } = require('../middleware/auth');

// User group CRUD operations
router.get('/', getAllUserGroups);
router.get('/:id', getUserGroupById);
router.post('/', authenticateToken, createUserGroup);
router.put('/:id', authenticateToken, updateUserGroup);
router.delete('/:id', authenticateToken, removeUserGroup);

// User-to-group relationship operations
router.post('/add-user', authenticateToken, addUserToGroup);
router.post('/remove-user', authenticateToken, removeUserFromGroup);
router.get('/:id/users', getUsersByGroup);

module.exports = router;
