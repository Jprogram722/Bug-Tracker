// This file will handle the controller functions for bug request

const Bugs = require('../models/Bugs')

// ftech all bugs controller
const getAllBugs = async (req, res) => {
    try{
        const result = await Bugs.find();
        res.send(result);
        console.log("Fetch Data")
    }
    catch(err){
        console.log(err.message);
    }
}

// Save bug controller
const saveBug = async (req, res) => {
    const bug = new Bugs({
        bug: req.body.bug,
        desc: req.body.desc,
        createdOn: new Date(),
    });
    try{
        const result = await bug.save();
        res.status(201).send(result);
        console.log("Bug has been reported");
    }
    catch(err){
        console.log(err.message);
    }
}

// delete bug controller
const deleteBug = async (req, res) => {
    try{
        const result = await Bugs.findByIdAndDelete(req.params.id);
        res.status(200).send(result);
        console.log("Bug Resolved");
    }
    catch(err){
        console.log(err.message);
    }
}

module.exports = {
    getAllBugs,
    saveBug,
    deleteBug,
}