
// models/Renter.js
const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, // Ensure unique
    password: {
        type: String,
        required: true
    },
    storageNeeded: {
        type: Number,
        required: true
    },
    rentalDuration: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Renter', renterSchema);
