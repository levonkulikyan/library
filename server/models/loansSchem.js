const mongoose = require('mongoose');

const LoanSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    loanDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    returnDate: {
        type: Date
    }
});

module.exports = mongoose.model('Loan', LoanSchema)