const express = require('express');
const router = express.Router();
const {createUser, getAllUsers,getUserById,updateUser,removeUser} = require("../controllers/user")


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);

module.exports = router;