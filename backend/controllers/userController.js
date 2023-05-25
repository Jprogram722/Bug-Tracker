// controllers for user data

// import modules
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// one day
const maxAge = 24 * 60 * 60 * 1000;

// handle errors
function handleError(err) {
    console.log(err.message, err.code);
    let errors = {email: '', name: '', password: ''};

    // duplicate error code
    // only sends duplication error for one element at a time so no need for for-loop
    if (err.code === 11000) {
        errors[Object.keys(err.keyValue)[0]] = "This "+Object.keys(err.keyValue)[0]+" has already been taken"
    }

    // validation errors
    if(err.message.includes('Users validation failed')) {
        // gets the values inside of an object
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    // incorrect email
    if (err.message === 'Incorrect email'){
        errors['email'] = "No account with this email"
    }

    // incorrect password
    if (err.message === 'Incorrect password'){
        errors['password'] = "Incorrect password"
    }

    return errors;
}

function createToken(id){
    return {
        accessToken: jwt.sign({ id }, 'big secret', { expiresIn: "2m" }),
        refreshToken: jwt.sign({ id }, 'test secret', { expiresIn: "1d" }),
    }
}

// fetch all users controller
const getAllUsers = async (req, res) => {
    try {
        const result = await User.find();
        res.status(200).json(result);
        console.log("Fetch Users");
    }
    catch(err){
        console.log(err.message);
    }
}

// fetch currently logged in user controller
const currentUser = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        res.status(200).json(user);
        console.log("Fetching one user");
    }
    catch(err){
        res.status(401).json({Error: err.message});
    }
}

// create user controller (Sign Up)
const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const result = await user.save();
        res.status(201).send("User Signed Up Successfully");
    }
    catch(err){
        const errors = handleError(err);
        res.status(400).json({errors})
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
            const errors = handleError(err);
            res.status(400).json({errors});
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
            console.log(err.message)
        }
    }
    else {
        res.status(500).json({error: 'Could not delete user'});
    }
}

// Login controller

const login = async (req, res) => {
    const {email, password} = req.body; // gets email and password from form
    try{
        const user = await User.login(email, password); // authenicates the user
        const {accessToken, refreshToken} = createToken(user._id);
        res.cookie('jwt', accessToken, {httpOnly: true, maxAge: maxAge});
        res.cookie('RFtoken', refreshToken, {httpOnly: true, maxAge: maxAge*2})
        res.status(200).json({user: user});
    }
    catch(err){
        errors = handleError(err);
        res.status(400).json({errors});
    }
}

// refresh controller
const refresh = async (req, res) => {
    // req.valid is a boolian value gotten from authMiddleware.js
    if(req.valid){
        const {accessToken} = createToken(req.userId);
        res.cookie('jwt', accessToken, {httpOnly: true, maxAge: maxAge});
        res.status(200).json({msg: "refreshed"});
    }
    else {
        res.status(401).json({status: 401, error: "Ivalid token, try loging in again"});
    }
}

const logout = async (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('RFtoken');
    console.log("Logged out");
    res.end();
}

module.exports = {
    getAllUsers,
    currentUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    refresh,
    logout
}

