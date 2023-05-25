// Setting up the router file for the user portion
// of the api using express router

// import modules

const express = require('express');
const userController = require('../../controllers/userController');
const {auth, refresh} = require('../../middleware/authMiddleware');


const router = express.Router();

// Get users
router.get('/', userController.getAllUsers);

// Get current user
router.get('/user', auth, userController.currentUser);

// create user
router.post('/', userController.createUser);

// update user
router.patch('/:userId', userController.updateUser);

// delete user
router.delete('/:userId', userController.deleteUser);

// Login
router.post('/login', userController.login);

// refresh token
router.get('/refresh', refresh, userController.refresh);

// logout
router.get('/logout', userController.logout);

module.exports = router;