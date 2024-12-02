//models/Book.js: Define the data model for the library's books.
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    isAvailable: { type: Boolean, default: true },
});

let Book = mongoose.model('Book', bookSchema);


module.exports = Book;

