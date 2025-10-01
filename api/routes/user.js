const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserById, updateUser, removeUser, getUserIdByCode } = require("../controllers/user")
const { authenticateToken } = require('../middleware/auth')


router.post('/user-by-code',getUserIdByCode)
router.get('/', getAllUsers);
router.get('/:id', getUserById);


router.post('/', authenticateToken, createUser);

router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, removeUser);


module.exports = router;