const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, removeUser } = require("../controllers/user")
const { authenticateToken } = require('../middleware/auth')

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, removeUser);

module.exports = router;