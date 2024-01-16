const {Schema, model} = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const UserSchema = Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true
    },
    surename: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student", "teacher", "admin"],
        default: 'student'
    },
    mobile: {
        type: Number,
        // required: true
    },
    wave: {
        type: String,
        required: true
    },
});

module.exports = model('User', UserSchema);