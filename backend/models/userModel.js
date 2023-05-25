// This will be the model for each user on the platform

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter an username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        minlength: [6, "password must be longer than 6 characters"],
        required: [true, "Please enter a password"]
    },
    picture: {
        type: String,
        required: false,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}, {timestamps: true});

// fire a function before doc saved to db
userSchema.pre('save', async function(next){
    // generates some characters infront of the password then it encripts it
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// method for logging in users (User.login in the controller file)
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email }); // fetchs the user object based on the email
    if(user){
        const auth = await bcrypt.compare(password, user.password); // compares the inputed password to the hashed one
        if(auth){
            return user; // returns that user object
        }
        throw Error('Incorrect password');
    }
    throw Error('incorrect email')
}

const User = mongoose.model('Users', userSchema);

module.exports = User;