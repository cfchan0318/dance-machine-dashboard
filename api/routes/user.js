const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, removeUser, getUserIdByCode } = require("../controllers/user")
const { authenticateToken } = require('../middleware/auth')


router.post('/user-by-code',getUserIdByCode)
router.get('/', getAllUsers);
router.get('/:id', getUserById);


router.post('/', authenticateToken, createUser);
router.delete('/:id', authenticateToken, removeUser);
router.put('/:id', authenticateToken, updateUser);



module.exports = router;