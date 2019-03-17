import BookModel from "../models/bookModel";

/**
 * Book DAO function to handle DB related operations
 */
var bookDao = function() {
  /**
   * Save a new book to DB
   */
  function saveNewBook(bookRequest) {
    const book = new BookModel(bookRequest);
    return book.save();
  }

  function getBooks(bookRequest) {
    if (bookRequest.query.genre) {
      return getBooksByGenre(bookRequest.query.genre);
    } else {
      return getAllBooks();
    }
  }

  function getAllBooks() {
    const query = {};
    return BookModel.find(query);
  }

  function getBooksByGenre(bookGenre) {
    const query = { genre: bookGenre };
    return BookModel.find(query);
  }

  return {
    saveNewBook,
    getBooks
  };
};

module.exports = bookDao;
