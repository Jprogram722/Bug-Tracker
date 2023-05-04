// Setting up the router file for bugs portion 
// of the api using express router

// import modules
const express = require('express');
const bugsController = require('../../controllers/bugsController');


const router = express.Router();

// Get bugs (read)
router.get('/', bugsController.getAllBugs);

// Get one bug (read)
router.get('/:bugName', bugsController.getOneBug);

// Add bug (create)
router.post('/', bugsController.saveBug);

// update status (update)
router.patch('/:bugId', bugsController.updateBug)

// Delete bug (delete)
router.delete('/:bugId', bugsController.deleteBug);

module.exports = router;