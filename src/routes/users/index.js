const express = require('express');
const { createUser, getUser, getUsers, updateUser, deleteUser } = require('../../resolvers/users');
const { route } = require('../../..');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
