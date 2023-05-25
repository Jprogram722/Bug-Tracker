// This file will handle the controller functions for bug request

const mongoose = require('mongoose');
const Bugs = require('../models/bugModel')

// fetch all bugs controller
const getAllBugs = async (req, res) => {
    try{
        console.log(req.params.id);
        const result = await Bugs.find({postedBy: req.params.id}).populate('postedBy').exec();
        res.status(200).json(result);
        console.log("Fetch Data");
    }
    catch(err){
        console.log(err.message);
    }
}

// fetch one bug controller
const getOneBug = async (req, res) => {
    // search query for the bug
    const query = req.params.bugName;
    try{
        const result = await Bugs.findOne({bug: query});
        res.status(200).json(result);
        console.log("Fetching one bug");
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// Save bug controller
const saveBug = async (req, res) => {
    const bug = new Bugs(req.body);
    try{
        const result = await bug.save();
        res.status(201).send(result);
        console.log("Bug has been reported");
    }
    catch(err){
        console.log(err.message);
    }
}

const updateBug = async (req, res) => {
    const updates = req.body;
    if(mongoose.Types.ObjectId.isValid(req.params.bugId)){
        try{
            const result = await Bugs.findByIdAndUpdate(req.params.bugId, {$set: updates});
            res.status(200).send(result);
            console.log("bug report has been updated");
        }
        catch(err){
            console.log(err.message);
        }
    }
    else{
        res.status(500).json({error: 'Could not update document'});
    }
}

// delete bug controller
const deleteBug = async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.bugId)){
        try{
            const result = await Bugs.findByIdAndDelete(req.params.bugId);
            res.status(200).send(result);
            console.log("Bug Resolved");
        }
        catch(err){
            console.log(err.message);
        }
    }
    else {
        res.status(500).json({error: 'Could not update document'});
    }
}

module.exports = {
    getAllBugs,
    getOneBug,
    saveBug,
    deleteBug,
    updateBug,
}