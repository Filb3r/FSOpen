const DataLoader = require('dataloader')
const Book = require('../models/book')


const bookCountLoader = () => {
    return new DataLoader( async (authorIds) => {
        const books = await Book.find({ author: { $in: authorIds } })
        
        const booksByAuthorId = authorIds.map( authorId => {
            return books.filter(book => book.author._id.toString() === authorId.toString())
        })

        return booksByAuthorId
    })
}


module.exports = bookCountLoader