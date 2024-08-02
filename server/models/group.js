const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    content: { type: String, required: true },
    dateTime: { type: Date, default: Date.now },
});

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true }, 
    notes: [noteSchema]
});

module.exports = mongoose.model('Group', groupSchema);
