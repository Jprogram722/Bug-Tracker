// Creating the Bugs model for mongoose

const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    bug: {
        type: String,
        required: [true, "Please enter a bug"]
    },
    desc: {
        type: String,
        required: [true, "Please enter a description of the bug"]
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    prog: {
        type: String,
        default: "New"
    }
}, {timestamps: true});

const Bugs = mongoose.model('Bugs', bugSchema);

module.exports = Bugs;