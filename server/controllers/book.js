const express = require('express');
const BookService = require('../services/BookService');
const router = express.Router();


router.get('/allbooks', async function (req, res, next) {
    const books = await BookService.getAllBooks();
    res.status(200).json(books);
})

router.post('/isbn', async function (req, res, next) {
    
    const books = await BookService.findByIsbn(req.body.isbn);
    res.status(200).json(books);
})

module.exports = router;