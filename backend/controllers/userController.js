// controllers for user data

// import modules
const mongoose = require('mongoose');
const User = require('../models/userModel');

// fetch all users controller
const getAllUsers = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
        console.log("Fetch Users");
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// fetch one user controller
const getOneUser = async (req, res) => {
    // search query for the bug
    const query = req.params.userName;
    try{
        const result = await User.findOne({name: query});
        res.status(200).json(result);
        console.log("Fetching one user");
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// create user controller
const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const result = await user.save();
        res.status(201).send(result);
        console.log("User Created");

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}

// update user controller
const updateUser = async (req, res) => {
    const updates = req.body;
    if(mongoose.Types.ObjectId.isValid(req.params.userId)){
        try{
            await User.findByIdAndUpdate(req.params.userId, {$set: updates});
            res.status(200).json({msg: "Success"});
            console.log("Account Updated");
        }
        catch(err){
            console.log(err.message);
        }
    }
    else{
        res.status(500).json({error: 'Could not update document'});
    }
}

// delete user controller
const deleteUser = async (req, res) => {
    if(mongoose.Types.ObjectId.isValid(req.params.userId)){
        try{
            const result = await User.findByIdAndDelete(req.params.userId);
            res.status(200).send(result);
            console.log("User Deleted");
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
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
}

