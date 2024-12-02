// POST /api/books: Create a new book.
// GET /api/books: Retrieve all books.
// GET /api/books/:id: Retrieve a book by its ID.
// PUT /api/books/:id: Update a book's details.
// DELETE /api/books/:id: Delete a book by its ID.



//routes/bookRoutes.js: Create an Express router. This file is empty except for the structure:

const express = require('express');
const router = express.Router();

const Book = require("../models/Book");

// Define routes here


router.post("/", async (req, res) => {
    try {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear
        };

        // Create the book using your Book model
        const newBook = await Book.create(book);

        // Respond with the newly created book and status 201
        res.status(201).send(newBook);
    } catch (error) {
        // Log the error and respond with a 500 status
        console.error(error);
        res.status(500).send({ error: "Error creating book" });
    }
});



// router.
// route("/").post((req, res, next) => {
//     if (req.body.bookId && req.body.title && req.body.author) {
//         const book = {
//             id: books[books.length -1].id +1,
//             title: req.body.title,
//             author: req.body.author,
//             genre: req.body.genre,
//             publishedYear: req.body.publishedYear,
//             isAvailable: req.body.isAvailable,
//         };
//         books.push(book);
//         res.join(books[books.length - 1]);
//     }
//     else next(error(400, "Insufficient Data"));
// });



// router.
// route("/").get(async(req, res, next) => {
//     let books = await Book.find();
//     console.log(books);
//     next();

// })

// GET /api/books: Retrieve all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving books" });
    }
});


// GET /api/books/:id: Retrieve a book by its ID
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error retrieving book" });
    }
});


// PUT /api/books/:id: Update a book's details
router.put("/:id", async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Returns the updated book and validates the update
        );

        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating book" });
    }
});

// DELETE /api/books/:id: Delete a book by its ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting book" });
    }
});

module.exports = router;
