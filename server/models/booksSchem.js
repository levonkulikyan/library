const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const BookSchema = mongoose.Schema({
    id: {
        type: String,
        default: uuidv4
    },
    title: {
        type: String,
        required: true
    },
    authors: [String],
    isbn: {
        type: String,
        required: true
    },
    published_year: {
        type: Number,
        required: true
    },
    category: [String],
    availability: {
        type: Boolean,
        default: true
    },
    location: {
        shelf: String,
        row: Number
    },
    additional_info: {
        publisher: String,
        language: String,
        page_count: Number
    },
    cover_url: String,
    online_version_url: String

});

module.exports = mongoose.model('Book', BookSchema);