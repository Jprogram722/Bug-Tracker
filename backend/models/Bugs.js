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
    createdOn: {
        type: Date,
        required: true,
    }
});

const Bugs = mongoose.model('Bugs', bugSchema);

module.exports = Bugs;