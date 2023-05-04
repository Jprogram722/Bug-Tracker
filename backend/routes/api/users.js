// Setting up the router file for the user portion
// of the api using express router

// import modules

const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

// Get users
router.get('/', userController.getAllUsers);

// Get one user
router.get('/:userName', userController.getOneUser);

// create user
router.post('/', userController.createUser);

// update user
router.patch('/:userId', userController.updateUser);

// delete user
router.delete('/:userId', userController.deleteUser);

module.exports = router;