// Creating the Bugs model for mongoose

const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    bug: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdOn: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    updatedAt: {
        type: Date,
        default: () => Date.now(),
    }
});

const Bugs = mongoose.model('Bugs', bugSchema);

module.exports = Bugs;