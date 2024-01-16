const Book = require('../models/booksSchem')
const { v4: uuidv4 } = require('uuid')



const BookService = {

    async getAllBooks() {
        return Book.find({}).lean()
    },
    async findByIsbn(isbn) {
        // return Book.findOne({ isbn }).lean();
        const book = await Book.findOne({ "isbn": isbn }).exec();
       
        return book;
    },
    // async addBook(data){ 

    // },
    async addBook(data) {
        try {
            data.id = uuidv4(); // Assuming id is a unique identifier
            const book = new Book(data);
            await book.save();
            return book.toObject();
        } catch (err) {
            console.error('Unexpected book add error:', err.message);
            throw err;
        }
    },
    
    // async deleteBook(isbn){

    // }
    async deleteBook(isbn) {
        try {
            const result = await Book.deleteOne({ isbn: isbn });
            if (result.deletedCount === 0) {
                throw new Error('Book not found');
            }
            return { success: true, message: 'Book deleted successfully' };
        } catch (err) {
            console.error('Error deleting book:', err.message);
            throw err;
        }
    },


}
module.exports = BookService