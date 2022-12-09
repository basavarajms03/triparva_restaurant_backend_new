const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false,
    },
    userType: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;