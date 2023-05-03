// Setting up the router file for express

const express = require('express');
const bugsController = require('../../controllers/bugsController');


const router = express.Router();

// Get bug
router.get('/', bugsController.getAllBugs);

// Add bug
router.post('/', bugsController.saveBug);

// Delete bug
router.delete('/:id', bugsController.deleteBug);

module.exports = router;