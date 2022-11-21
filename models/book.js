const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    }
})
let BookDATA = mongoose.model('book', BookSchema);

module.exports = BookDATA;